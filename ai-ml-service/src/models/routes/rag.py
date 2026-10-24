"""
RAG (Retrieval-Augmented Generation) routes
"""

from fastapi import APIRouter, HTTPException, Path
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional, List, Literal
import asyncio
import logging
import json
import time

from ..exceptions import AIMLException, public_error
from ..services import knowledge_base, rag_answer
from ..services.ai_service import ai_service
from ..services.qdrant_client import qdrant_service
from ..services.database import db_service
from ..services.rerank import rerank
from ..services.retrieval import CONTEXT_HITS, expand_context, hybrid_search

router = APIRouter()
DOCUMENT_ID_PATTERN = r"^[A-Za-z0-9_.-]{1,100}$"
logger = logging.getLogger(__name__)

# Поиск и статистика — только по известным коллекциям (имя из URL не идёт в Qdrant как есть)
ALLOWED_COLLECTIONS = {"pdf_chunks", "artworks", "external_artworks"}

class RAGQueryRequest(BaseModel):
    query: str = Field(min_length=2, max_length=1000)
    context_limit: int = Field(default=CONTEXT_HITS, ge=1, le=12)  # сколько лучших находок брать; к первым добавляются соседние фрагменты
    mode: Literal["public", "curator"] = "public"                # форма ответа
    access: Literal["public", "staff"] = "public"                # какие документы видны спрашивающему
    document_ids: Optional[List[str]] = Field(default=None, max_length=50)
    user_id: Optional[int] = None


class RAGQueryResponse(BaseModel):
    query: str
    outcome: str                                                  # answered | insufficient_evidence | no_sources | citations_failed
    answer: str
    insufficient_evidence: bool
    blocks: List[Dict[str, Any]]
    sources: List[Dict[str, Any]]
    retrieval: Dict[str, Any]
    processing_time: float


def _public_source(number: int, passage: Dict[str, Any], cited: bool) -> Dict[str, Any]:
    content = passage["content"]
    return {
        "id": number,
        "document_id": passage["document_id"],
        "title": passage.get("title"),
        "page": passage.get("page_number"),
        "license": passage.get("license"),
        "cited": cited,
        "content": content if len(content) <= 600 else content[:600] + "…",
    }


@router.post("/query", response_model=RAGQueryResponse)
async def process_rag_query(request: RAGQueryRequest):
    """Гибридный поиск по базе знаний и ответ с проверяемыми цитатами; при нехватке данных — отказ."""
    try:
        started = time.monotonic()
        found = await hybrid_search(request.query, access=request.access, top=20, document_ids=request.document_ids)
        ranked = await rerank(request.query, found.passages)           # выключен (RAG_RERANK=off) или сбой — порядок поиска
        passages = await expand_context(ranked, access=request.access, hits=request.context_limit)

        result = await rag_answer.answer(request.query, passages, request.mode)
        blocks = result["blocks"]
        cited_ids = {i for block in blocks for i in block["source_ids"]}
        # Отказ и «не подтверждено» показывают найденные места, чтобы читатель мог посмотреть сам
        show_all = result["outcome"] in ("citations_failed", "insufficient_evidence")
        sources = [_public_source(n, p, n in cited_ids) for n, p in enumerate(passages, start=1)
                   if show_all or n in cited_ids]

        processing_time = round(time.monotonic() - started, 2)
        try:
            await db_service.execute(
                "INSERT INTO rag_queries (user_id, query_text, response_text, response_sources, processing_time, outcome, access) "
                "VALUES ($1, $2, $3, $4, $5, $6, $7)",
                request.user_id, request.query, result["answer"], json.dumps(sources, ensure_ascii=False),
                processing_time, result["outcome"], request.access)
        except Exception as db_error:                      # аналитика не должна ронять ответ
            logger.warning(f"Failed to store RAG query analytics: {db_error}")

        return RAGQueryResponse(
            query=request.query,
            outcome=result["outcome"],
            answer=result["answer"],
            insufficient_evidence=result["outcome"] != "answered",
            blocks=blocks,
            sources=sources,
            retrieval={"dense": found.dense_hits, "lexical": found.lexical_hits, "degraded": found.degraded},
            processing_time=processing_time,
        )
    except AIMLException as e:
        raise HTTPException(status_code=e.status_code, detail=public_error(e))
    except Exception as e:
        logger.error(f"RAG query failed: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))

@router.get("/documents")
async def list_documents():
    """Документы базы знаний (для сотрудников): название, доступ, объём, дата обновления"""
    try:
        rows = await db_service.fetch_all("""
            SELECT d.document_id, d.title, d.access, d.license, d.pages_count, d.chunks_count, d.updated_at,
                   p.category, p.summary
            FROM kb_documents d LEFT JOIN pdf_documents p ON p.document_id = d.document_id
            ORDER BY d.updated_at DESC LIMIT 500
        """)
        return {"documents": [{**r, "updated_at": r["updated_at"].isoformat() if r["updated_at"] else None} for r in rows]}
    except Exception as e:
        logger.error(f"Failed to list documents: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))


@router.delete("/documents/{document_id}")
async def delete_document(document_id: str = Path(pattern=DOCUMENT_ID_PATTERN)):
    """Убрать документ из базы знаний: фрагменты в PostgreSQL и векторы в Qdrant"""
    try:
        if not await knowledge_base.delete_document(document_id):
            raise HTTPException(status_code=404, detail="Document not found")
        await asyncio.to_thread(qdrant_service.delete_document_points, "pdf_chunks", document_id)
        await db_service.execute("DELETE FROM pdf_documents WHERE document_id = $1", document_id)
        return {"document_id": document_id, "deleted": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to delete document: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))


@router.get("/collections")
async def list_collections():
    """List available RAG collections"""
    try:
        # Get collections from Qdrant
        collections_response = qdrant_service.client.get_collections()
        collections = [col.name for col in collections_response.collections]

        # Get document counts for each collection
        collection_info = []
        for collection_name in collections:
            try:
                count = qdrant_service.client.count(collection_name)
                collection_info.append({
                    "name": collection_name,
                    "document_count": count.count
                })
            except Exception as e:
                logger.warning(f"Failed to get count for collection {collection_name}: {e}")
                collection_info.append({
                    "name": collection_name,
                    "document_count": 0
                })

        return {
            "collections": collection_info,
            "total_collections": len(collections)
        }

    except Exception as e:
        logger.error(f"Failed to list collections: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))

@router.post("/collections/{collection_name}/search")
async def search_collection(collection_name: str, query: str, limit: int = 10):
    """Search within a specific collection"""
    try:
        if collection_name not in ALLOWED_COLLECTIONS or not qdrant_service.collection_exists(collection_name):
            raise HTTPException(status_code=404, detail=f"Collection {collection_name} not found")

        # Generate embedding for query
        query_embedding = await ai_service.generate_embeddings([query])
        query_vector = query_embedding[0]

        # Search the collection
        search_results = qdrant_service.search_points(
            collection_name=collection_name,
            query_vector=query_vector,
            limit=limit
        )

        # Format results
        formatted_results = []
        for result in search_results:
            payload = result["payload"]
            formatted_results.append({
                "id": result["id"],
                "score": result["score"],
                "document_id": payload.get("document_id"),
                "chunk_index": payload.get("chunk_index"),
                "content": payload.get("content"),
                "metadata": {k: v for k, v in payload.items() if k not in ["content", "document_id", "chunk_index"]}
            })

        return {
            "collection": collection_name,
            "query": query,
            "results": formatted_results,
            "total_results": len(formatted_results)
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Collection search failed: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))


@router.get("/stats")
async def get_rag_stats():
    """Get RAG system statistics - vector counts across all collections"""
    try:
        stats = {
            "artworks_count": 0,
            "pdf_chunks_count": 0,
            "external_count": 0,
            "total_vectors": 0,
            "collections": {}
        }
        
        collections = ["artworks", "pdf_chunks", "external_artworks"]
        
        for collection_name in collections:
            try:
                if qdrant_service.collection_exists(collection_name):
                    collection_info = qdrant_service.client.get_collection(collection_name)
                    count = collection_info.points_count
                    stats["collections"][collection_name] = {
                        "count": count,
                        "status": "active"
                    }
                    stats["total_vectors"] += count
                    
                    if collection_name == "artworks":
                        stats["artworks_count"] = count
                    elif collection_name == "pdf_chunks":
                        stats["pdf_chunks_count"] = count
                    elif collection_name == "external_artworks":
                        stats["external_count"] = count
                else:
                    stats["collections"][collection_name] = {
                        "count": 0,
                        "status": "not_exists"
                    }
            except Exception as e:
                logger.warning(f"Error getting stats for {collection_name}: {e}")
                stats["collections"][collection_name] = {
                    "count": 0,
                    "status": "error",
                    "error": public_error(e)
                }
        
        return stats
        
    except Exception as e:
        logger.error(f"Failed to get RAG stats: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))