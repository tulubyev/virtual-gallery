"""
Image analysis routes
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator
from typing import Optional
import logging

from ..exceptions import AIMLException, public_error
from ..services.ai_service import ai_service
from ..services.safe_fetch import check_request_url
from ..services.database import db_service
from ..services import job_queue

router = APIRouter()
logger = logging.getLogger(__name__)

class ImageAnalysisRequest(BaseModel):
    image_url: str
    artwork_id: Optional[int] = None
    user_id: Optional[int] = None

    @field_validator("image_url")
    @classmethod
    def _image_url_allowed(cls, value):
        return check_request_url(value)

class ImageAnalysisResponse(BaseModel):
    task_id: str
    status: str
    message: str

@router.post("/analyze", response_model=ImageAnalysisResponse)
async def analyze_image(request: ImageAnalysisRequest):
    """Поставить анализ изображения в очередь (результат — GET /analysis/{task_id})"""
    try:
        job_id = await job_queue.enqueue("image_analysis", request.model_dump(), created_by=request.user_id)
        return ImageAnalysisResponse(
            task_id=job_queue.task_id_for("image_analysis", job_id),
            status="queued",
            message="Image analysis started"
        )
    except AIMLException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
    except Exception as e:
        logger.error(f"Image analysis request failed: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))

@router.get("/analysis/{task_id}")
async def get_analysis_status(task_id: str):
    """Статус и результат анализа изображения"""
    job_id = job_queue.parse_task_id(task_id, "image_analysis")
    job = await job_queue.get(job_id) if job_id else None
    if job is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return job_queue.public_view(job, task_id)

async def run_image_analysis(payload: dict, ctx) -> dict:
    """Обработчик очереди: анализ изображения и запись результата в artwork_analysis."""
    request = ImageAnalysisRequest(**payload)
    logger.info(f"Processing image analysis {ctx.task_id}")
    analysis_result = await ai_service.analyze_image(request.image_url)

    # Результат пишем в artwork_analysis (схема: src/database/ai_ml_schema.sql), только если указана работа.
    # Повторный разбор той же работы обновляет запись (UNIQUE(artwork_id, analysis_version)).
    persisted = False
    if request.artwork_id is not None:
        try:
            await db_service.execute("""
                INSERT INTO artwork_analysis (artwork_id, model_used, processing_time, technical_notes)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (artwork_id, analysis_version) DO UPDATE SET
                    model_used = EXCLUDED.model_used,
                    processing_time = EXCLUDED.processing_time,
                    technical_notes = EXCLUDED.technical_notes
            """, request.artwork_id, analysis_result.get("model", "unknown"),
                 0.0, analysis_result.get("analysis", ""))
            persisted = True
        except Exception as db_error:
            logger.error(f"Failed to store image analysis for artwork {request.artwork_id}: {db_error}")
    return {**analysis_result, "persisted": persisted}
