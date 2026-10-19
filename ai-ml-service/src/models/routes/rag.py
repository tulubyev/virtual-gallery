"""
RAG (Retrieval-Augmented Generation) routes
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
import logging
import json
from datetime import datetime

from ..services.ai_service import ai_service
from ..services.qdrant_client import qdrant_service
from ..services.database import db_service

router = APIRouter()
logger = logging.getLogger(__name__)

# Поиск и статистика — только по известным коллекциям (имя из URL не идёт в Qdrant как есть)
ALLOWED_COLLECTIONS = {"pdf_chunks", "artworks", "external_artworks"}

class RAGQueryRequest(BaseModel):
    query: str
    context_limit: Optional[int] = 5
    filters: Optional[Dict[str, Any]] = None
    generation_options: Optional[Dict[str, Any]] = None

class RAGQueryResponse(BaseModel):
    query: str
    answer: str
    sources: List[Dict[str, Any]]
    confidence: float
    processing_time: float

@router.post("/query", response_model=RAGQueryResponse)
async def process_rag_query(request: RAGQueryRequest):
    """Process RAG query with retrieval and generation"""
    try:
        import time
        start_time = time.time()

        logger.info(f"Processing RAG query: {request.query[:50]}...")

        # Generate embedding for the query
        query_embedding = await ai_service.generate_embeddings([request.query])
        query_vector = query_embedding[0]

        # Search for relevant chunks in Qdrant
        collection_name = "pdf_chunks"
        if not qdrant_service.collection_exists(collection_name):
            # If no collection exists, return a helpful message
            return RAGQueryResponse(
                query=request.query,
                answer="No documents have been processed yet. Please upload and process some PDF documents first.",
                sources=[],
                confidence=0.0,
                processing_time=time.time() - start_time
            )

        # Perform vector search
        search_results = qdrant_service.search_points(
            collection_name=collection_name,
            query_vector=query_vector,
            limit=request.context_limit or 5,
            score_threshold=0.7
        )

        if not search_results:
            return RAGQueryResponse(
                query=request.query,
                answer="I couldn't find relevant information in the processed documents. Try rephrasing your question or upload more documents.",
                sources=[],
                confidence=0.0,
                processing_time=time.time() - start_time
            )

        # Extract context from search results
        context_chunks = []
        sources = []

        for result in search_results:
            payload = result["payload"]
            context_chunks.append(payload["content"])
            sources.append({
                "document_id": payload["document_id"],
                "chunk_index": payload["chunk_index"],
                "score": result["score"],
                "content_preview": payload["content"][:200] + "..." if len(payload["content"]) > 200 else payload["content"]
            })

        # Combine context
        context = "\n\n".join(context_chunks)

        # Generate answer using LLM
        prompt = f"""
        Based on the following context, please answer the question accurately and concisely.
        If the context doesn't contain enough information to fully answer the question, say so.

        Context:
        {context}

        Question: {request.query}

        Answer:"""

        generation_result = await ai_service.generate_text(prompt)

        # Средняя косинусная близость найденных фрагментов (0..1). Это мера близости поиска,
        # а не вероятность правильности ответа.
        avg_score = sum(result["score"] for result in search_results) / len(search_results)
        confidence = round(min(max(avg_score, 0.0), 1.0), 2)

        processing_time = time.time() - start_time

        # Аналитика запросов не должна ронять ответ пользователю
        try:
            await db_service.execute("""
                INSERT INTO rag_queries (query_text, response_text, response_sources, processing_time, relevance_score)
                VALUES ($1, $2, $3, $4, $5)
            """, request.query, generation_result["response"], json.dumps(sources),
                 round(processing_time, 2), confidence)
        except Exception as db_error:
            logger.warning(f"Failed to store RAG query analytics: {db_error}")

        return RAGQueryResponse(
            query=request.query,
            answer=generation_result["response"],
            sources=sources,
            confidence=confidence,
            processing_time=processing_time
        )

    except Exception as e:
        logger.error(f"RAG query failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

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
        raise HTTPException(status_code=500, detail=str(e))

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
        raise HTTPException(status_code=500, detail=str(e))


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
                    "error": str(e)
                }
        
        return stats
        
    except Exception as e:
        logger.error(f"Failed to get RAG stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))