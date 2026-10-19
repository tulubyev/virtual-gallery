"""
PDF processing routes
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Dict, Any, Optional
import logging
import uuid
import json
from datetime import datetime

from ..services.pdf_service import pdf_service
from ..services.ai_service import ai_service
from ..services.qdrant_client import qdrant_service
from ..services.database import db_service
from ..services.redis_client import redis_service

router = APIRouter()
logger = logging.getLogger(__name__)

class PDFProcessingRequest(BaseModel):
    pdf_url: str
    document_id: str
    user_id: Optional[int] = None
    category: Optional[str] = None
    styles: Optional[list] = None
    artists: Optional[list] = None
    techniques: Optional[list] = None
    regions: Optional[list] = None
    auto_categorize: bool = True

class PDFProcessingResponse(BaseModel):
    task_id: str
    status: str
    message: str

@router.post("/process", response_model=PDFProcessingResponse)
async def process_pdf(
    request: PDFProcessingRequest,
    background_tasks: BackgroundTasks
):
    """Process PDF document with OCR and chunking"""
    try:
        # Generate unique task ID
        task_id = f"pdf_{uuid.uuid4().hex}"

        # Store initial task status in Redis
        task_data = {
            "task_id": task_id,
            "status": "queued",
            "pdf_url": request.pdf_url,
            "document_id": request.document_id,
            "user_id": request.user_id,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }

        await redis_service.set(f"task:{task_id}", json.dumps(task_data), expire=3600)  # 1 hour

        # Add to background tasks
        background_tasks.add_task(process_pdf_task, request, task_id)

        return PDFProcessingResponse(
            task_id=task_id,
            status="queued",
            message="PDF processing started"
        )

    except Exception as e:
        logger.error(f"PDF processing request failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/processing/{task_id}")
async def get_processing_status(task_id: str):
    """Get PDF processing status and results"""
    try:
        # Check Redis cache first
        task_data_str = await redis_service.get(f"task:{task_id}")
        if task_data_str:
            task_data = json.loads(task_data_str)
            if task_data.get("status") == "completed":
                return {
                    "task_id": task_id,
                    "status": "completed",
                    "result": task_data.get("result"),
                    "created_at": task_data.get("created_at"),
                    "updated_at": task_data.get("updated_at")
                }
            elif task_data.get("status") == "failed":
                return {
                    "task_id": task_id,
                    "status": "failed",
                    "error": task_data.get("error"),
                    "created_at": task_data.get("created_at"),
                    "updated_at": task_data.get("updated_at")
                }
            else:
                return {
                    "task_id": task_id,
                    "status": task_data.get("status", "unknown"),
                    "created_at": task_data.get("created_at"),
                    "updated_at": task_data.get("updated_at")
                }

        # Check database for completed tasks
        db_result = await db_service.fetchrow("""
            SELECT * FROM pdf_documents WHERE document_id = $1
        """, task_id.split('_')[-1] if '_' in task_id else task_id)

        if db_result:
            def parse_jsonb(val):
                if val is None:
                    return None
                if isinstance(val, str):
                    try:
                        return json.loads(val)
                    except:
                        return None
                return val
            
            return {
                "task_id": task_id,
                "status": db_result["processing_status"],
                "document_info": {
                    "document_id": db_result["document_id"],
                    "filename": db_result["filename"],
                    "pages_count": db_result["pages_count"],
                    "ocr_performed": db_result["ocr_performed"],
                    "processing_completed_at": db_result["processing_completed_at"].isoformat() if db_result["processing_completed_at"] else None
                },
                "categories": {
                    "category": db_result.get("category"),
                    "styles": parse_jsonb(db_result.get("styles")),
                    "artists": parse_jsonb(db_result.get("artists")),
                    "techniques": parse_jsonb(db_result.get("techniques")),
                    "regions": parse_jsonb(db_result.get("regions")),
                    "periods": parse_jsonb(db_result.get("periods")),
                    "keywords": parse_jsonb(db_result.get("keywords")),
                    "summary": db_result.get("summary")
                },
                "created_at": db_result["created_at"].isoformat() if db_result["created_at"] else None,
                "updated_at": db_result["updated_at"].isoformat() if db_result["updated_at"] else None
            }

        # Task not found
        raise HTTPException(status_code=404, detail="Task not found")

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get processing status: {e}")
        raise HTTPException(status_code=500, detail=str(e))

def extract_json_from_response(response: str) -> Dict[str, Any]:
    """Robust JSON extraction using balanced bracket counting"""
    if "```json" in response:
        response = response.split("```json")[1].split("```")[0]
    elif "```" in response:
        parts = response.split("```")
        for part in parts:
            if "{" in part:
                response = part
                break
    
    try:
        return json.loads(response.strip())
    except json.JSONDecodeError:
        pass
    
    start = response.find("{")
    if start == -1:
        return {}
    
    bracket_count = 0
    in_string = False
    escape_next = False
    end = start
    
    for i, char in enumerate(response[start:], start):
        if escape_next:
            escape_next = False
            continue
        if char == "\\":
            escape_next = True
            continue
        if char == '"' and not escape_next:
            in_string = not in_string
            continue
        if in_string:
            continue
        if char == "{":
            bracket_count += 1
        elif char == "}":
            bracket_count -= 1
            if bracket_count == 0:
                end = i + 1
                break
    
    try:
        return json.loads(response[start:end])
    except json.JSONDecodeError:
        return {}


async def categorize_pdf_content(full_text: str) -> Dict[str, Any]:
    """Use AI to categorize PDF content by art-related categories"""
    try:
        prompt = f"""Analyze this art-related document text and extract categorization metadata.

TEXT (first 5000 chars):
{full_text[:5000]}

Return a JSON object with these fields (use null if not applicable):
{{
    "category": "one of: art_history, technique, artist_biography, museum_catalog, exhibition_catalog, art_theory, restoration, auction_catalog, other",
    "styles": ["list of art styles mentioned, e.g. Impressionism, Baroque, Cubism"],
    "artists": ["list of artist names mentioned"],
    "techniques": ["list of techniques mentioned, e.g. oil painting, watercolor, fresco"],
    "regions": ["list of geographical regions/countries mentioned"],
    "periods": ["list of time periods mentioned, e.g. Renaissance, 19th century"],
    "keywords": ["5-10 key topic keywords"],
    "summary": "brief 2-3 sentence summary of the document content"
}}

Return ONLY valid JSON, no other text."""

        response = await ai_service.analyze_with_llm(prompt)
        result = extract_json_from_response(response)
        
        if not result:
            logger.warning("Failed to parse AI categorization response")
        
        return result
            
    except Exception as e:
        logger.warning(f"PDF categorization failed: {e}")
        return {}


async def process_pdf_task(request: PDFProcessingRequest, task_id: str):
    """Background task for PDF processing with categorization"""
    try:
        logger.info(f"Processing PDF: {request.pdf_url}")

        task_data = json.loads(await redis_service.get(f"task:{task_id}") or "{}")
        task_data.update({
            "status": "processing",
            "updated_at": datetime.utcnow().isoformat()
        })
        await redis_service.set(f"task:{task_id}", json.dumps(task_data), expire=3600)

        processing_result = await pdf_service.process_pdf(request.pdf_url, request.document_id)

        categories = {
            "category": request.category,
            "styles": request.styles or [],
            "artists": request.artists or [],
            "techniques": request.techniques or [],
            "regions": request.regions or [],
            "periods": [],
            "keywords": [],
            "summary": None
        }

        if request.auto_categorize and processing_result.get("chunks"):
            full_text = " ".join([c["content"] for c in processing_result["chunks"]])
            ai_categories = await categorize_pdf_content(full_text)
            
            if ai_categories:
                if not categories["category"]:
                    categories["category"] = ai_categories.get("category")
                categories["styles"] = list(set(categories["styles"] + (ai_categories.get("styles") or [])))
                categories["artists"] = list(set(categories["artists"] + (ai_categories.get("artists") or [])))
                categories["techniques"] = list(set(categories["techniques"] + (ai_categories.get("techniques") or [])))
                categories["regions"] = list(set(categories["regions"] + (ai_categories.get("regions") or [])))
                categories["periods"] = ai_categories.get("periods") or []
                categories["keywords"] = ai_categories.get("keywords") or []
                categories["summary"] = ai_categories.get("summary")

        chunk_texts = [chunk["content"] for chunk in processing_result["chunks"]]
        if chunk_texts:
            embeddings = await ai_service.generate_embeddings(chunk_texts)

            points = []
            for i, (chunk, embedding) in enumerate(zip(processing_result["chunks"], embeddings)):
                points.append({
                    "id": f"{request.document_id}_chunk_{i}",
                    "vector": embedding,
                    "payload": {
                        "document_id": request.document_id,
                        "chunk_index": i,
                        "content": chunk["content"],
                        "char_count": chunk["char_count"],
                        "page_number": chunk.get("page_number"),
                        "type": "pdf_chunk",
                        "category": categories["category"],
                        "styles": categories["styles"],
                        "artists": categories["artists"],
                        "techniques": categories["techniques"],
                        "regions": categories["regions"],
                        "periods": categories["periods"],
                        "keywords": categories["keywords"]
                    }
                })

            collection_name = "pdf_chunks"
            if not qdrant_service.collection_exists(collection_name):
                qdrant_service.create_collection(collection_name)

            qdrant_service.upsert_points(collection_name, points)

        await db_service.execute("""
            INSERT INTO pdf_documents (
                document_id, filename, s3_url, pages_count, ocr_performed, 
                processing_status, processing_completed_at,
                category, styles, artists, techniques, regions, periods, summary, keywords
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            ON CONFLICT (document_id) DO UPDATE SET
                processing_status = EXCLUDED.processing_status,
                processing_completed_at = EXCLUDED.processing_completed_at,
                category = EXCLUDED.category,
                styles = EXCLUDED.styles,
                artists = EXCLUDED.artists,
                techniques = EXCLUDED.techniques,
                regions = EXCLUDED.regions,
                periods = EXCLUDED.periods,
                summary = EXCLUDED.summary,
                keywords = EXCLUDED.keywords
        """, 
            request.document_id, 
            f"document_{request.document_id}.pdf", 
            request.pdf_url,
            processing_result["processing_stats"]["total_pages"],
            processing_result["processing_stats"]["ocr_performed"],
            "completed", 
            datetime.utcnow(),
            categories["category"],
            json.dumps(categories["styles"]) if categories["styles"] else None,
            json.dumps(categories["artists"]) if categories["artists"] else None,
            json.dumps(categories["techniques"]) if categories["techniques"] else None,
            json.dumps(categories["regions"]) if categories["regions"] else None,
            json.dumps(categories["periods"]) if categories["periods"] else None,
            categories["summary"],
            json.dumps(categories["keywords"]) if categories["keywords"] else None
        )

        processing_result["categories"] = categories

        task_data.update({
            "status": "completed",
            "result": processing_result,
            "categories": categories,
            "updated_at": datetime.utcnow().isoformat()
        })
        await redis_service.set(f"task:{task_id}", json.dumps(task_data), expire=3600)

        logger.info(f"PDF processing completed for {request.pdf_url}")

    except Exception as e:
        logger.error(f"PDF processing failed: {e}")

        # Update task status to failed
        task_data = json.loads(await redis_service.get(f"task:{task_id}") or "{}")
        task_data.update({
            "status": "failed",
            "error": str(e),
            "updated_at": datetime.utcnow().isoformat()
        })
        await redis_service.set(f"task:{task_id}", json.dumps(task_data), expire=3600)
