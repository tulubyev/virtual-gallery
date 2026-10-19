"""
External Art Sources Routes
API endpoints for fetching and indexing data from external art databases
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
import logging
import json
from datetime import datetime

from ..services.external_sources_service import external_sources_service
from ..services.ai_service import ai_service
from ..services.qdrant_client import qdrant_service
from ..services.database import db_service
from ..services.redis_client import redis_service

router = APIRouter()
logger = logging.getLogger(__name__)


class FetchRequest(BaseModel):
    source: str
    query: Optional[str] = None
    limit: int = 50
    api_key: Optional[str] = None
    index_to_qdrant: bool = True


class IndexExternalRequest(BaseModel):
    artworks: List[Dict[str, Any]]
    source: str


@router.post("/fetch/met")
async def fetch_from_met(request: FetchRequest, background_tasks: BackgroundTasks):
    """Fetch artworks from Metropolitan Museum of Art API"""
    try:
        object_ids = await external_sources_service.fetch_met_objects(
            search_query=request.query
        )
        
        if not object_ids:
            return {"status": "no_results", "message": "No artworks found", "count": 0}
        
        object_ids = object_ids[:request.limit]
        
        task_id = f"met_fetch_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
        
        await redis_service.set(f"task:{task_id}", json.dumps({
            "status": "processing",
            "source": "met",
            "total_objects": len(object_ids),
            "processed": 0,
            "indexed": 0,
            "started_at": datetime.utcnow().isoformat()
        }), expire=3600)
        
        background_tasks.add_task(
            process_met_batch, 
            object_ids, 
            task_id, 
            request.index_to_qdrant
        )
        
        return {
            "status": "started",
            "task_id": task_id,
            "total_objects": len(object_ids),
            "message": f"Fetching {len(object_ids)} artworks from MET"
        }
        
    except Exception as e:
        logger.error(f"Failed to fetch from MET: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/fetch/rijks")
async def fetch_from_rijks(request: FetchRequest):
    """Fetch artworks from Rijksmuseum API"""
    try:
        if not request.api_key:
            raise HTTPException(status_code=400, detail="Rijksmuseum API key required")
        
        artworks = await external_sources_service.fetch_rijks_collection(
            query=request.query,
            api_key=request.api_key
        )
        
        if request.index_to_qdrant and artworks:
            indexed = await index_external_artworks(artworks, "rijksmuseum")
            return {
                "status": "completed",
                "fetched": len(artworks),
                "indexed": indexed,
                "source": "rijksmuseum"
            }
        
        return {
            "status": "completed",
            "fetched": len(artworks),
            "artworks": artworks[:20],
            "source": "rijksmuseum"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to fetch from Rijksmuseum: {e}")
        raise HTTPException(status_code=500, detail=str(e))


class WikiArtRequest(BaseModel):
    artist_url: Optional[str] = None
    letter: Optional[str] = None
    page: int = 1
    fetch_artworks: bool = True
    index_to_qdrant: bool = True


@router.post("/fetch/wikiart")
async def fetch_from_wikiart(request: WikiArtRequest, background_tasks: BackgroundTasks):
    """Fetch artists and artworks from WikiArt"""
    try:
        if request.artist_url:
            artist_details = await external_sources_service.fetch_wikiart_artist_details(request.artist_url)
            
            artworks = []
            if request.fetch_artworks:
                raw_artworks = await external_sources_service.fetch_wikiart_artworks(request.artist_url)
                for artwork in raw_artworks:
                    artworks.append({
                        "source": "wikiart",
                        "external_id": artwork.get("contentId") or artwork.get("id"),
                        "title": artwork.get("title"),
                        "artist": artist_details.get("artistName") if artist_details else request.artist_url,
                        "date": artwork.get("completitionYear") or artwork.get("yearAsString"),
                        "period": artwork.get("period"),
                        "medium": artwork.get("technique"),
                        "style": artwork.get("style"),
                        "image_url": artwork.get("image"),
                        "gallery_url": f"https://www.wikiart.org{artwork.get('url', '')}"
                    })
            
            if request.index_to_qdrant and artworks:
                indexed = await index_external_artworks(artworks, "wikiart")
                return {
                    "status": "completed",
                    "artist": artist_details,
                    "fetched": len(artworks),
                    "indexed": indexed,
                    "source": "wikiart"
                }
            
            return {
                "status": "completed",
                "artist": artist_details,
                "artworks_count": len(artworks),
                "source": "wikiart"
            }
        else:
            artists = await external_sources_service.fetch_wikiart_artists(
                letter=request.letter,
                page=request.page
            )
            
            return {
                "status": "completed",
                "artists_count": len(artists),
                "artists": artists[:50],
                "source": "wikiart"
            }
        
    except Exception as e:
        logger.error(f"Failed to fetch from WikiArt: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/fetch/harvard")
async def fetch_from_harvard(request: FetchRequest):
    """Fetch artworks from Harvard Art Museums API"""
    try:
        if not request.api_key:
            raise HTTPException(status_code=400, detail="Harvard Art Museums API key required")
        
        artworks = await external_sources_service.fetch_harvard_objects(
            query=request.query,
            api_key=request.api_key
        )
        
        if request.index_to_qdrant and artworks:
            indexed = await index_external_artworks(artworks, "harvard")
            return {
                "status": "completed",
                "fetched": len(artworks),
                "indexed": indexed,
                "source": "harvard"
            }
        
        return {
            "status": "completed",
            "fetched": len(artworks),
            "artworks": artworks[:20],
            "source": "harvard"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to fetch from Harvard: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/fetch/status/{task_id}")
async def get_fetch_status(task_id: str):
    """Get status of external source fetch task"""
    try:
        task_data = await redis_service.get(f"task:{task_id}")
        if not task_data:
            raise HTTPException(status_code=404, detail="Task not found")
        
        return json.loads(task_data)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get fetch status: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/sources/stats")
async def get_sources_stats():
    """Get statistics about indexed external sources"""
    try:
        collection_name = "external_artworks"
        
        if not qdrant_service.collection_exists(collection_name):
            return {
                "total_indexed": 0,
                "sources": {},
                "message": "No external artworks indexed yet"
            }
        
        info = qdrant_service.get_collection_info(collection_name)
        
        db_stats = await db_service.fetch("""
            SELECT source, COUNT(*) as count 
            FROM external_artworks 
            GROUP BY source
        """)
        
        sources = {}
        for row in db_stats:
            sources[row["source"]] = row["count"]
        
        return {
            "total_indexed": info.get("points_count", 0) if info else 0,
            "sources": sources,
            "collection_info": info
        }
        
    except Exception as e:
        logger.error(f"Failed to get sources stats: {e}")
        return {
            "total_indexed": 0,
            "sources": {},
            "error": str(e)
        }


@router.post("/index/batch")
async def index_batch_artworks(request: IndexExternalRequest):
    """Index batch of artworks from external source"""
    try:
        indexed = await index_external_artworks(request.artworks, request.source)
        
        return {
            "status": "completed",
            "indexed": indexed,
            "total": len(request.artworks),
            "source": request.source
        }
        
    except Exception as e:
        logger.error(f"Failed to index batch: {e}")
        raise HTTPException(status_code=500, detail=str(e))


async def process_met_batch(object_ids: List[int], task_id: str, index_to_qdrant: bool):
    """Background task for batch processing MET objects"""
    try:
        artworks = await external_sources_service.batch_fetch_met_details(object_ids)
        
        task_data = json.loads(await redis_service.get(f"task:{task_id}") or "{}")
        task_data["processed"] = len(artworks)
        await redis_service.set(f"task:{task_id}", json.dumps(task_data), expire=3600)
        
        if index_to_qdrant and artworks:
            indexed = await index_external_artworks(artworks, "met")
            task_data["indexed"] = indexed
        
        task_data["status"] = "completed"
        task_data["completed_at"] = datetime.utcnow().isoformat()
        await redis_service.set(f"task:{task_id}", json.dumps(task_data), expire=3600)
        
        logger.info(f"MET batch completed: {len(artworks)} processed, {task_data.get('indexed', 0)} indexed")
        
    except Exception as e:
        logger.error(f"MET batch processing failed: {e}")
        task_data = json.loads(await redis_service.get(f"task:{task_id}") or "{}")
        task_data["status"] = "failed"
        task_data["error"] = str(e)
        await redis_service.set(f"task:{task_id}", json.dumps(task_data), expire=3600)


async def index_external_artworks(artworks: List[Dict[str, Any]], source: str) -> int:
    """Index external artworks to Qdrant and database"""
    try:
        collection_name = "external_artworks"
        
        if not qdrant_service.collection_exists(collection_name):
            qdrant_service.create_collection(collection_name)
        
        normalized = []
        for artwork in artworks:
            normalized_data = external_sources_service.normalize_artwork_data(artwork)
            normalized.append(normalized_data)
        
        texts = [n["searchable_text"] for n in normalized if n["searchable_text"]]
        if not texts:
            return 0
        
        embeddings = await ai_service.generate_embeddings(texts)
        
        points = []
        for i, (norm, embedding) in enumerate(zip(normalized, embeddings)):
            if not norm.get("external_id"):
                continue
            
            point_id = f"{source}_{norm['external_id']}"
            
            points.append({
                "id": point_id,
                "vector": embedding,
                "payload": {
                    "source": source,
                    "external_id": norm["external_id"],
                    "title": norm["title"],
                    "artist": norm["artist"],
                    "type": "external_artwork",
                    "metadata": norm["metadata"],
                    "image_url": norm.get("image_url"),
                    "gallery_url": norm.get("gallery_url"),
                    "indexed_at": norm["indexed_at"]
                }
            })
            
            await db_service.execute("""
                INSERT INTO external_artworks (
                    external_id, source, title, artist, metadata, 
                    image_url, gallery_url, searchable_text, indexed_at
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (source, external_id) DO UPDATE SET
                    title = EXCLUDED.title,
                    artist = EXCLUDED.artist,
                    metadata = EXCLUDED.metadata,
                    image_url = EXCLUDED.image_url,
                    indexed_at = EXCLUDED.indexed_at
            """,
                norm["external_id"],
                source,
                norm["title"],
                norm["artist"],
                json.dumps(norm["metadata"]),
                norm.get("image_url"),
                norm.get("gallery_url"),
                norm["searchable_text"],
                datetime.utcnow()
            )
        
        if points:
            qdrant_service.upsert_points(collection_name, points)
        
        return len(points)
        
    except Exception as e:
        logger.error(f"Failed to index external artworks: {e}")
        return 0


@router.post("/reindex")
async def reindex_external_artworks():
    """Reindex all external artworks from database to Qdrant"""
    try:
        rows = await db_service.fetch_all("""
            SELECT external_id, source, title, artist, metadata, 
                   image_url, gallery_url, searchable_text
            FROM external_artworks
        """)
        
        if not rows:
            return {"status": "completed", "message": "No external artworks to reindex", "count": 0}
        
        collection_name = "external_artworks"
        if not qdrant_service.collection_exists(collection_name):
            qdrant_service.create_collection(collection_name)
        
        texts = [row["searchable_text"] for row in rows if row.get("searchable_text")]
        if not texts:
            return {"status": "completed", "message": "No searchable text found", "count": 0}
        
        embeddings = await ai_service.generate_embeddings(texts)
        
        points = []
        text_idx = 0
        for row in rows:
            if not row.get("searchable_text"):
                continue
            
            point_id = f"{row['source']}_{row['external_id']}"
            metadata = row.get("metadata")
            if isinstance(metadata, str):
                metadata = json.loads(metadata)
            
            points.append({
                "id": point_id,
                "vector": embeddings[text_idx],
                "payload": {
                    "source": row["source"],
                    "external_id": row["external_id"],
                    "title": row["title"],
                    "artist": row["artist"],
                    "type": "external_artwork",
                    "metadata": metadata or {},
                    "image_url": row.get("image_url"),
                    "gallery_url": row.get("gallery_url"),
                    "reindexed_at": datetime.utcnow().isoformat()
                }
            })
            text_idx += 1
        
        if points:
            qdrant_service.upsert_points(collection_name, points)
        
        return {
            "status": "completed",
            "reindexed": len(points),
            "message": f"Successfully reindexed {len(points)} external artworks"
        }
        
    except Exception as e:
        logger.error(f"Reindex external artworks failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
