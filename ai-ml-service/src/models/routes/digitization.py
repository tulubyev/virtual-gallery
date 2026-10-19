"""
Artwork digitization routes
Handles front/back image upload, AI analysis, watermarking, and card generation
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator
from typing import Dict, Any, Optional, List
import logging
import json

from ..exceptions import AIMLException, public_error
from ..services.ai_service import ai_service
from ..services.safe_fetch import check_request_url
from ..services.database import db_service
from ..services import job_queue
from ..services.qdrant_client import qdrant_service
from ..services.watermark_service import watermark_service
from ..services.s3_service import s3_service
from ..services.nft_service import generate_nft_metadata

router = APIRouter()
logger = logging.getLogger(__name__)


class DigitizationRequest(BaseModel):
    front_image_url: str
    back_image_url: Optional[str] = None
    title: Optional[str] = None
    artist: Optional[str] = None
    visible_watermark: bool = True
    invisible_watermark: bool = True
    generate_nft: bool = False
    user_id: Optional[int] = None

    @field_validator("front_image_url", "back_image_url")
    @classmethod
    def _image_urls_allowed(cls, value):
        return check_request_url(value)


class DigitizationResponse(BaseModel):
    task_id: str
    status: str
    message: str


class DigitizedArtwork(BaseModel):
    id: int
    task_id: str
    title: str
    artist: Optional[str]
    style: Optional[str]
    period: Optional[str]
    technique: Optional[str]
    front_url: str
    back_url: Optional[str]
    ai_analysis: Dict[str, Any]
    provenance: Optional[str]
    status: str
    nft_metadata: Optional[Dict[str, Any]]
    created_at: str


@router.post("/digitize", response_model=DigitizationResponse)
async def digitize_artwork(request: DigitizationRequest):
    """Поставить оцифровку в очередь (статус и результат — GET /digitize/{task_id})"""
    try:
        job_id = await job_queue.enqueue("digitization", request.model_dump(), created_by=request.user_id)
        return DigitizationResponse(
            task_id=job_queue.task_id_for("digitization", job_id),
            status="queued",
            message="Digitization started"
        )
    except AIMLException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    except Exception as e:
        logger.error(f"Digitization request failed: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))


@router.get("/digitize/{task_id}")
async def get_digitization_status(task_id: str):
    """Статус, прогресс и результат оцифровки"""
    job_id = job_queue.parse_task_id(task_id, "digitization")
    job = await job_queue.get(job_id) if job_id else None
    if job is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return job_queue.public_view(job, task_id)


@router.get("/artworks", response_model=List[Dict[str, Any]])
async def list_digitized_artworks(
    status: Optional[str] = None,
    limit: int = 50,
    offset: int = 0
):
    """List digitized artworks with optional status filter"""
    try:
        query = """
            SELECT id, task_id, title, artist, style, period, technique, genre,
                   front_url, back_url, front_watermarked_url, back_watermarked_url,
                   ai_analysis, provenance, status, nft_metadata,
                   verification_hash, visible_watermark_applied, invisible_watermark_applied,
                   created_at, updated_at
            FROM digitized_artworks
        """
        params = []

        if status:
            query += " WHERE status = $1"
            params.append(status)
            query += " ORDER BY created_at DESC LIMIT $2 OFFSET $3"
            params.extend([limit, offset])
        else:
            query += " ORDER BY created_at DESC LIMIT $1 OFFSET $2"
            params.extend([limit, offset])

        rows = await db_service.fetch(query, *params)

        artworks = []
        for row in rows:
            artworks.append({
                "id": row["id"],
                "task_id": row["task_id"],
                "title": row["title"],
                "artist": row["artist"],
                "style": row["style"],
                "period": row["period"],
                "technique": row["technique"],
                "genre": row["genre"],
                "front_url": row["front_url"],
                "back_url": row["back_url"],
                "front_watermarked_url": row["front_watermarked_url"],
                "back_watermarked_url": s3_service.present_url(row["back_watermarked_url"]),
                "ai_analysis": json.loads(row["ai_analysis"]) if row["ai_analysis"] else {},
                "provenance": row["provenance"],
                "status": row["status"],
                "nft_metadata": json.loads(row["nft_metadata"]) if row["nft_metadata"] else None,
                "verification_hash": row["verification_hash"],
                "visible_watermark_applied": row["visible_watermark_applied"],
                "invisible_watermark_applied": row["invisible_watermark_applied"],
                "created_at": row["created_at"].isoformat() if row["created_at"] else None,
                "updated_at": row["updated_at"].isoformat() if row["updated_at"] else None
            })

        return artworks

    except Exception as e:
        logger.error(f"Failed to list digitized artworks: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))


@router.get("/artworks/{artwork_id}")
async def get_digitized_artwork(artwork_id: int):
    """Get specific digitized artwork"""
    try:
        row = await db_service.fetchrow("""
            SELECT id, task_id, title, artist, style, period, technique, genre,
                   front_url, back_url, front_watermarked_url, back_watermarked_url,
                   ai_analysis, provenance, status, nft_metadata,
                   verification_hash, visible_watermark_applied, invisible_watermark_applied,
                   curator_notes, curator_id, approved_at, rejected_at, rejection_reason,
                   owner_id, created_at, updated_at
            FROM digitized_artworks
            WHERE id = $1
        """, artwork_id)

        if not row:
            raise HTTPException(status_code=404, detail="Artwork not found")

        return {
            "id": row["id"],
            "task_id": row["task_id"],
            "title": row["title"],
            "artist": row["artist"],
            "style": row["style"],
            "period": row["period"],
            "technique": row["technique"],
            "genre": row["genre"],
            "front_url": row["front_url"],
            "back_url": row["back_url"],
            "front_watermarked_url": row["front_watermarked_url"],
            "back_watermarked_url": s3_service.present_url(row["back_watermarked_url"]),
            "ai_analysis": json.loads(row["ai_analysis"]) if row["ai_analysis"] else {},
            "provenance": row["provenance"],
            "status": row["status"],
            "nft_metadata": json.loads(row["nft_metadata"]) if row["nft_metadata"] else None,
            "verification_hash": row["verification_hash"],
            "visible_watermark_applied": row["visible_watermark_applied"],
            "invisible_watermark_applied": row["invisible_watermark_applied"],
            "curator_notes": row["curator_notes"],
            "curator_id": row["curator_id"],
            "owner_id": row["owner_id"],
            "approved_at": row["approved_at"].isoformat() if row["approved_at"] else None,
            "rejected_at": row["rejected_at"].isoformat() if row["rejected_at"] else None,
            "rejection_reason": row["rejection_reason"],
            "created_at": row["created_at"].isoformat() if row["created_at"] else None,
            "updated_at": row["updated_at"].isoformat() if row["updated_at"] else None
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get digitized artwork: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))


class ApproveRequest(BaseModel):
    curator_notes: Optional[str] = None
    curator_id: Optional[int] = None  # кто одобрил (передаёт основное приложение из сессии)

@router.patch("/artworks/{artwork_id}/approve")
async def approve_artwork(artwork_id: int, request: ApproveRequest = None):
    """Curator approves artwork and triggers RAG indexing"""
    try:
        curator_notes = request.curator_notes if request else None
        curator_id = request.curator_id if request else None
        updated = await db_service.fetchrow("""
            UPDATE digitized_artworks
            SET status = 'approved', curator_notes = $2, curator_id = $3, approved_at = NOW(), updated_at = NOW()
            WHERE id = $1
            RETURNING id
        """, artwork_id, curator_notes, curator_id)
        if not updated:
            raise HTTPException(status_code=404, detail="Artwork not found")

        row = await db_service.fetchrow("""
            SELECT id, title, artist, style, period, technique, genre, ai_analysis, provenance
            FROM digitized_artworks WHERE id = $1
        """, artwork_id)

        # Одобрение не откатываем, если индекс недоступен, но результат индексации возвращаем явно
        indexed = await index_artwork_in_qdrant(row) if row else False

        return {"status": "approved", "artwork_id": artwork_id, "indexed": indexed}

    except HTTPException:
        raise

    except Exception as e:
        logger.error(f"Failed to approve artwork: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))


async def index_artwork_in_qdrant(row: Dict[str, Any]) -> bool:
    """Index a digitized artwork in Qdrant for RAG search"""
    try:
        ai_analysis = json.loads(row["ai_analysis"]) if row["ai_analysis"] else {}
        front_analysis = ai_analysis.get("front", ai_analysis)
        back_analysis = ai_analysis.get("back") or {}
        # Если на обороте обнаружены персональные данные, текст оборота и провенанс в индекс не идут
        has_personal_data = bool(ai_analysis.get("contains_personal_data") or back_analysis.get("contains_personal_data"))
        if has_personal_data:
            back_analysis = {}

        description = front_analysis.get("description", "")
        provenance = None if has_personal_data else (back_analysis.get("provenance") or row.get("provenance") or "")
        
        full_text = f"""
        Название: {row['title']}
        Художник: {row['artist'] or 'Неизвестен'}
        Стиль: {row.get('style') or front_analysis.get('style') or 'Не определен'}
        Период: {row.get('period') or front_analysis.get('period') or 'Не указан'}
        Техника: {row.get('technique') or front_analysis.get('technique') or 'Не указана'}
        Жанр: {row.get('genre') or front_analysis.get('genre') or 'Не указан'}
        Описание: {description}
        """
        
        if provenance:
            full_text += f"\nПровенанс: {provenance}"
        
        embeddings = await ai_service.generate_embeddings([full_text])
        if not embeddings:
            logger.warning(f"No embeddings generated for artwork {row['id']}")
            return False
        
        payload = {
            "artwork_id": row["id"],
            "title": row["title"],
            "artist": row.get("artist"),
            "style": row.get("style") or front_analysis.get("style"),
            "period": row.get("period") or front_analysis.get("period"),
            "technique": row.get("technique") or front_analysis.get("technique"),
            "genre": row.get("genre") or front_analysis.get("genre"),
            "description": description,
            "provenance": provenance,
            "type": "digitized_artwork",
            "access": "internal",  # индекс «artworks» внутренний; публичный индекс — отдельная коллекция
            "contains_personal_data": has_personal_data,
            "front_analysis": front_analysis,
            "back_analysis": back_analysis if back_analysis else None,
            "uncertainties": front_analysis.get("uncertainties", [])
        }
        
        qdrant_service.ensure_collection("artworks")
        qdrant_service.upsert_points(
            collection_name="artworks",
            points=[{
                "id": int(row["id"]),
                "vector": embeddings[0],
                "payload": payload
            }]
        )
        logger.info(f"Indexed artwork {row['id']} in Qdrant")
        return True
        
    except Exception as e:
        logger.error(f"Failed to index artwork {row.get('id')} in Qdrant: {e}", exc_info=True)
        return False


@router.post("/artworks/reindex")
async def reindex_all_artworks():
    """Reindex all approved artworks in Qdrant"""
    try:
        rows = await db_service.fetch("""
            SELECT id, title, artist, style, period, technique, genre,
                   ai_analysis, provenance
            FROM digitized_artworks
            WHERE status IN ('approved', 'published')
        """)
        
        indexed = 0
        failed = 0
        
        for row in rows:
            if await index_artwork_in_qdrant(dict(row)):
                indexed += 1
            else:
                failed += 1
        
        return {
            "status": "completed",
            "indexed": indexed,
            "failed": failed,
            "total": len(rows)
        }
        
    except Exception as e:
        logger.error(f"Failed to reindex artworks: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))




class RejectRequest(BaseModel):
    rejection_reason: str
    curator_id: Optional[int] = None

@router.patch("/artworks/{artwork_id}/reject")
async def reject_artwork(artwork_id: int, request: RejectRequest):
    """Curator rejects artwork"""
    try:
        updated = await db_service.fetchrow("""
            UPDATE digitized_artworks
            SET status = 'rejected', rejection_reason = $2, curator_id = $3, rejected_at = NOW(), updated_at = NOW()
            WHERE id = $1
            RETURNING id
        """, artwork_id, request.rejection_reason, request.curator_id)
        if not updated:
            raise HTTPException(status_code=404, detail="Artwork not found")

        return {"status": "rejected", "artwork_id": artwork_id}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to reject artwork: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))


@router.patch("/artworks/{artwork_id}")
async def update_artwork(artwork_id: int, updates: Dict[str, Any]):
    """Curator updates artwork metadata"""
    try:
        allowed_fields = ["title", "artist", "style", "period", "technique", "provenance", "curator_notes"]
        update_parts = []
        params = [artwork_id]
        param_idx = 2

        for field in allowed_fields:
            if field in updates:
                update_parts.append(f"{field} = ${param_idx}")
                params.append(updates[field])
                param_idx += 1

        if not update_parts:
            raise HTTPException(status_code=400, detail="No valid fields to update")

        query = f"""
            UPDATE digitized_artworks
            SET {', '.join(update_parts)}, updated_at = NOW()
            WHERE id = $1
            RETURNING id
        """

        result = await db_service.fetchrow(query, *params)
        if not result:
            raise HTTPException(status_code=404, detail="Artwork not found")

        return {"status": "updated", "artwork_id": artwork_id}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to update artwork: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))


class GenerateNFTRequest(BaseModel):
    edition_number: int = 1
    edition_total: int = 1


@router.post("/artworks/{artwork_id}/generate-nft")
async def generate_artwork_nft(artwork_id: int, request: GenerateNFTRequest):
    """Generate NFT metadata for an existing approved artwork"""
    try:
        if request.edition_number < 1 or request.edition_total < 1:
            raise HTTPException(status_code=400, detail="Edition numbers must be positive")
        if request.edition_number > request.edition_total:
            raise HTTPException(status_code=400, detail="Edition number cannot exceed edition total")
        
        row = await db_service.fetchrow("""
            SELECT id, title, artist, style, period, technique, genre,
                   front_watermarked_url, ai_analysis, provenance, status,
                   verification_hash
            FROM digitized_artworks
            WHERE id = $1
        """, artwork_id)

        if not row:
            raise HTTPException(status_code=404, detail="Artwork not found")

        if row["status"] not in ["approved", "published"]:
            raise HTTPException(status_code=400, detail="Artwork must be approved before NFT generation")

        ai_analysis = json.loads(row["ai_analysis"]) if row["ai_analysis"] else {}
        front_analysis = ai_analysis.get("front", {})
        back_analysis = ai_analysis.get("back") or {}
        if ai_analysis.get("contains_personal_data"):
            back_analysis = {}   # публичные метаданные без текста оборота с ПДн
        
        front_analysis["style"] = front_analysis.get("style") or row["style"]
        front_analysis["period"] = front_analysis.get("period") or row["period"]
        front_analysis["technique"] = front_analysis.get("technique") or row["technique"]
        front_analysis["genre"] = front_analysis.get("genre") or row["genre"]
        
        if row["provenance"] and not back_analysis.get("provenance") and not ai_analysis.get("contains_personal_data"):
            back_analysis["provenance"] = row["provenance"]

        nft_metadata = generate_nft_metadata(
            title=row["title"],
            artist=row["artist"] or "Unknown Artist",
            front_analysis=front_analysis,
            back_analysis=back_analysis if back_analysis else None,
            image_url=row["front_watermarked_url"] or "",
            verification_hash=row["verification_hash"] or str(artwork_id),
            edition_number=request.edition_number,
            edition_total=request.edition_total
        )

        await db_service.execute("""
            UPDATE digitized_artworks
            SET nft_metadata = $2, updated_at = NOW()
            WHERE id = $1
        """, artwork_id, json.dumps(nft_metadata))

        return {
            "artwork_id": artwork_id,
            "nft_metadata": nft_metadata,
            "status": "generated"
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to generate NFT metadata: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))


@router.get("/artworks/{artwork_id}/nft-metadata")
async def get_nft_metadata(artwork_id: int):
    """Get NFT metadata for an artwork (for marketplace integration)"""
    try:
        row = await db_service.fetchrow("""
            SELECT nft_metadata, status, title, verification_hash
            FROM digitized_artworks
            WHERE id = $1
        """, artwork_id)

        if not row:
            raise HTTPException(status_code=404, detail="Artwork not found")

        if not row["nft_metadata"]:
            raise HTTPException(status_code=404, detail="NFT metadata not generated for this artwork")

        metadata = json.loads(row["nft_metadata"])
        return metadata

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get NFT metadata: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))


async def run_digitization(payload: dict, ctx) -> dict:
    """Обработчик очереди: разбор лица и оборота, водяные знаки, S3, запись в digitized_artworks.

    Ошибки не глотаются: очередь сама повторит временный сбой. Повтор безопасен — запись в БД
    ищется по task_id (UNIQUE), поэтому одна оцифровка не создаст двух работ.
    """
    request = DigitizationRequest(**payload)
    task_id = ctx.task_id
    update_progress = ctx.progress
    logger.info(f"Processing digitization {task_id}")

    await update_progress(10, "Загрузка изображений")

    await update_progress(30, "AI-анализ лицевой стороны")
    front_analysis = await ai_service.analyze_artwork_front(request.front_image_url)

    back_analysis = None
    if request.back_image_url:
        await update_progress(50, "OCR обратной стороны")
        back_analysis = await ai_service.analyze_artwork_back(request.back_image_url)

    await update_progress(70, "Нанесение водяных знаков")

    watermarked_front_url = request.front_image_url
    watermarked_back_url = request.back_image_url
    verification_hash = None
    visible_watermark_applied = False
    invisible_watermark_applied = False

    if request.visible_watermark or request.invisible_watermark:
        try:
            front_watermark_result = await watermark_service.apply_watermarks(
                image_url=request.front_image_url,
                artwork_id=task_id,
                owner_id=str(request.user_id) if request.user_id else None,
                visible_watermark=request.visible_watermark,
                invisible_watermark=request.invisible_watermark,
                watermark_text="Virtual Art Gallery"
            )
            verification_hash = front_watermark_result.get("verification_hash")
            visible_watermark_applied = front_watermark_result.get("visible_watermark_applied", False)
            invisible_watermark_applied = front_watermark_result.get("invisible_watermark_applied", False)

            if front_watermark_result.get("watermarked_image_base64"):
                s3_key = s3_service.generate_s3_key(
                    filename="front_watermarked.jpg",
                    prefix="digitized",
                    artwork_id=task_id
                )
                upload_result = await s3_service.upload_base64(
                    base64_data=front_watermark_result["watermarked_image_base64"],
                    key=s3_key,
                    content_type="image/jpeg",
                    metadata={"verification_hash": verification_hash, "task_id": task_id, "side": "front"},
                    public=True  # водяной экземпляр лица предназначен для показа в галерее
                )
                if upload_result.get("success"):
                    watermarked_front_url = upload_result["url"]
                    logger.info(f"Watermarked front image uploaded to S3: {watermarked_front_url}")
                else:
                    logger.warning(f"Front watermark S3 upload failed: {upload_result.get('error')}")

            if request.back_image_url:
                back_watermark_result = await watermark_service.apply_watermarks_with_hash(
                    image_url=request.back_image_url,
                    verification_hash=verification_hash,
                    visible_watermark=request.visible_watermark,
                    invisible_watermark=request.invisible_watermark,
                    watermark_text="Virtual Art Gallery"
                )
                
                if back_watermark_result.get("watermarked_image_base64"):
                    back_s3_key = s3_service.generate_s3_key(
                        filename="back_watermarked.jpg",
                        prefix="digitized",
                        artwork_id=task_id
                    )
                    back_upload_result = await s3_service.upload_base64(
                        base64_data=back_watermark_result["watermarked_image_base64"],
                        key=back_s3_key,
                        content_type="image/jpeg",
                        metadata={"verification_hash": verification_hash, "task_id": task_id, "side": "back"}
                        # оборот приватный: на нём бывают имена и адреса владельцев
                    )
                    if back_upload_result.get("success"):
                        watermarked_back_url = back_upload_result["uri"]  # s3://…, ссылку выдаёт present_url
                        logger.info("Watermarked back image uploaded to S3 (private)")
                    else:
                        logger.warning(f"Back watermark S3 upload failed: {back_upload_result.get('error')}")

        except Exception as e:
            logger.warning(f"Watermark failed, continuing without: {e}")

    title = request.title or front_analysis.get("suggested_title", "Без названия")
    artist = request.artist or front_analysis.get("suggested_artist", "Неизвестен")

    # Метаданные NFT и провенанс публичны: при ПДн на обороте текст оборота в них не попадает
    has_personal_data = bool(back_analysis and back_analysis.get("contains_personal_data"))
    public_back_analysis = None if has_personal_data else back_analysis

    nft_metadata = None
    if request.generate_nft:
        await update_progress(85, "Генерация NFT метаданных")
        nft_metadata = generate_nft_metadata(
            title=title,
            artist=artist,
            front_analysis=front_analysis,
            back_analysis=public_back_analysis,
            image_url=watermarked_front_url,
            verification_hash=verification_hash or task_id
        )

    await update_progress(95, "Сохранение в галерею")

    combined_analysis = {
        "front": front_analysis,
        "back": back_analysis,
        "contains_personal_data": has_personal_data
    }

    # task_id уникален: повтор после сбоя уже после записи вернёт ту же работу, а не создаст вторую
    result = await db_service.fetchrow("""
        INSERT INTO digitized_artworks (
            task_id, title, artist, style, period, technique, genre,
            front_url, back_url, front_watermarked_url, back_watermarked_url,
            ai_analysis, provenance, status, nft_metadata,
            verification_hash, visible_watermark_applied, invisible_watermark_applied,
            owner_id, created_at, updated_at
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, NOW(), NOW()
        ) ON CONFLICT (task_id) DO UPDATE SET updated_at = NOW()
        RETURNING id
    """,
        task_id,
        title,
        artist,
        front_analysis.get("style"),
        front_analysis.get("period"),
        front_analysis.get("technique"),
        front_analysis.get("genre"),
        request.front_image_url,
        request.back_image_url,
        watermarked_front_url,
        watermarked_back_url,
        json.dumps(combined_analysis),
        public_back_analysis.get("provenance") if public_back_analysis else None,
        "pending_review",
        json.dumps(nft_metadata) if nft_metadata else None,
        verification_hash,
        visible_watermark_applied,
        invisible_watermark_applied,
        request.user_id
    )

    artwork_id = result["id"]
    logger.info(f"Digitization completed for artwork {artwork_id}")

    return {
        "artwork_id": artwork_id,
        "title": title,
        "artist": artist,
        "style": front_analysis.get("style"),
        "period": front_analysis.get("period"),
        "technique": front_analysis.get("technique"),
        "status": "pending_review"
    }
