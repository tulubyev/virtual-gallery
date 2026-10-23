"""
Qdrant vector database client service
"""

import logging
import uuid
from typing import List, Dict, Any, Optional, Union
from qdrant_client import QdrantClient
from qdrant_client.http.models import (
    Distance, FieldCondition, Filter, FilterSelector, MatchAny, MatchValue, PointStruct, VectorParams
)
from ..config import settings

logger = logging.getLogger(__name__)

# Пространство имён для детерминированных UUID из текстовых ключей
_POINT_NAMESPACE = uuid.UUID("6f1d6a1e-6b9f-4d3b-9a43-5a0b8a7d2c11")


def normalize_point_id(raw_id: Union[int, str]) -> Union[int, str]:
    """Qdrant принимает в качестве ID только беззнаковое целое или UUID.

    Целые и UUID остаются как есть; любой другой текстовый ключ (например,
    "doc1_chunk_0") превращается в детерминированный UUID5 — повторная индексация
    даёт тот же ID и обновляет точку, а не создаёт дубль.
    """
    if isinstance(raw_id, bool):
        raise ValueError("Недопустимый идентификатор точки")
    if isinstance(raw_id, int):
        if raw_id < 0:
            raise ValueError("Идентификатор точки не может быть отрицательным")
        return raw_id
    text = str(raw_id)
    try:
        return str(uuid.UUID(text))
    except ValueError:
        return str(uuid.uuid5(_POINT_NAMESPACE, text))


class QdrantService:
    """Qdrant vector database service"""

    def __init__(self):
        self.client: Optional[QdrantClient] = None

    def connect(self):
        """Initialize Qdrant client"""
        try:
            if settings.qdrant_api_key:
                # Cloud Qdrant
                self.client = QdrantClient(
                    url=settings.qdrant_url,
                    api_key=settings.qdrant_api_key
                )
            else:
                # Local Qdrant
                self.client = QdrantClient(url=settings.qdrant_url)

            logger.info("Qdrant client initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Qdrant client: {e}")
            raise

    def create_collection(self, collection_name: str, vector_size: int = None):
        """Create a vector collection"""
        if vector_size is None:
            vector_size = settings.vector_dimension

        try:
            self.client.create_collection(
                collection_name=collection_name,
                vectors_config=VectorParams(
                    size=vector_size,
                    distance=Distance.COSINE
                )
            )
            logger.info(f"Created collection: {collection_name}")
        except Exception as e:
            logger.error(f"Failed to create collection {collection_name}: {e}")
            raise

    def ensure_collection(self, collection_name: str, vector_size: int = None):
        """Создать коллекцию, если её ещё нет"""
        if not self.collection_exists(collection_name):
            self.create_collection(collection_name, vector_size)

    def delete_collection(self, collection_name: str):
        """Delete a vector collection"""
        try:
            self.client.delete_collection(collection_name=collection_name)
            logger.info(f"Deleted collection: {collection_name}")
        except Exception as e:
            logger.error(f"Failed to delete collection {collection_name}: {e}")
            raise

    def upsert_points(self, collection_name: str, points: List[Union[PointStruct, Dict[str, Any]]]):
        """Upsert points to collection.

        Принимает PointStruct или словари {"id", "vector", "payload"}. Исходный ключ
        сохраняется в payload["point_key"], ID приводится к допустимому виду.
        """
        try:
            prepared = []
            for point in points:
                if isinstance(point, PointStruct):
                    prepared.append(point)
                    continue
                raw_id = point["id"]
                payload = dict(point.get("payload") or {})
                payload.setdefault("point_key", str(raw_id))
                prepared.append(PointStruct(
                    id=normalize_point_id(raw_id),
                    vector=point["vector"],
                    payload=payload
                ))
            points = prepared
            self.client.upsert(
                collection_name=collection_name,
                points=points
            )
            logger.info(f"Upserted {len(points)} points to {collection_name}")
        except Exception as e:
            logger.error(f"Failed to upsert points to {collection_name}: {e}")
            raise

    def delete_document_points(self, collection_name: str, document_id: str):
        """Удалить все точки документа (перед повторной индексацией, чтобы не оставались лишние фрагменты)"""
        if not self.collection_exists(collection_name):
            return
        self.client.delete(
            collection_name=collection_name,
            points_selector=FilterSelector(filter=Filter(
                must=[FieldCondition(key="document_id", match=MatchValue(value=document_id))]))
        )

    def search_points(self, collection_name: str, query_vector: List[float],
                     limit: int = 10, score_threshold: float = None, query_filter: Any = None) -> List[Dict[str, Any]]:
        """Search for similar vectors"""
        try:
            search_params = {
                "collection_name": collection_name,
                "query_vector": query_vector,
                "limit": limit
            }

            if score_threshold is not None:
                search_params["score_threshold"] = score_threshold
            if query_filter is not None:
                search_params["query_filter"] = query_filter

            results = self.client.search(**search_params)

            # Convert to dict format
            return [
                {
                    "id": hit.id,
                    "score": hit.score,
                    "payload": hit.payload
                }
                for hit in results
            ]
        except Exception as e:
            logger.error(f"Failed to search in {collection_name}: {e}")
            raise

    def collection_exists(self, collection_name: str) -> bool:
        """Check if collection exists"""
        try:
            collections = self.client.get_collections()
            return collection_name in [col.name for col in collections.collections]
        except Exception as e:
            logger.error(f"Failed to check collection existence: {e}")
            return False

# Global Qdrant service instance
qdrant_service = QdrantService()

def init_qdrant():
    """Initialize Qdrant service"""
    qdrant_service.connect()

async def check_qdrant_connection() -> Dict[str, Any]:
    """Check Qdrant connection health"""
    try:
        # Try to get collections
        collections = qdrant_service.client.get_collections()
        return {
            "healthy": True,
            "response_time": "ok",
            "details": f"Connected to Qdrant, {len(collections.collections)} collections found"
        }
    except Exception as e:
        logger.error(f"Qdrant health check failed: {e}")
        return {
            "healthy": False,
            "error": str(e),
            "details": "Qdrant connection failed"
        }