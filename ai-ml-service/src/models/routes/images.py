"""
Image analysis routes
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional
import logging
import uuid
import json
from datetime import datetime

from ..services.ai_service import ai_service
from ..services.database import db_service
from ..services.redis_client import redis_service

router = APIRouter()
logger = logging.getLogger(__name__)

class ImageAnalysisRequest(BaseModel):
    image_url: str
    artwork_id: Optional[int] = None
    user_id: Optional[int] = None

class ImageAnalysisResponse(BaseModel):
    task_id: str
    status: str
    message: str

@router.post("/analyze", response_model=ImageAnalysisResponse)
async def analyze_image(
    request: ImageAnalysisRequest,
    background_tasks: BackgroundTasks
):
    """Analyze artwork image using AI"""
    try:
        # Generate unique task ID
        task_id = f"img_{uuid.uuid4().hex}"

        # Store initial task status in Redis
        task_data = {
            "task_id": task_id,
            "status": "queued",
            "image_url": request.image_url,
            "artwork_id": request.artwork_id,
            "user_id": request.user_id,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }

        await redis_service.set(f"task:{task_id}", json.dumps(task_data), expire=3600)  # 1 hour

        # Add to background tasks
        background_tasks.add_task(process_image_analysis, request, task_id)

        return ImageAnalysisResponse(
            task_id=task_id,
            status="queued",
            message="Image analysis started"
        )

    except Exception as e:
        logger.error(f"Image analysis request failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/analysis/{task_id}")
async def get_analysis_status(task_id: str):
    """Get image analysis status and results"""
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

        # Task not found
        raise HTTPException(status_code=404, detail="Task not found or expired (results are kept for 1 hour)")

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get analysis status: {e}")
        raise HTTPException(status_code=500, detail=str(e))

async def process_image_analysis(request: ImageAnalysisRequest, task_id: str):
    """Background task for image analysis"""
    try:
        logger.info(f"Processing image analysis for {request.image_url}")

        # Update task status to processing
        task_data = json.loads(await redis_service.get(f"task:{task_id}") or "{}")
        task_data.update({
            "status": "processing",
            "updated_at": datetime.utcnow().isoformat()
        })
        await redis_service.set(f"task:{task_id}", json.dumps(task_data), expire=3600)

        # Perform image analysis
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

        # Update task status to completed
        task_data.update({
            "status": "completed",
            "result": analysis_result,
            "persisted": persisted,
            "updated_at": datetime.utcnow().isoformat()
        })
        await redis_service.set(f"task:{task_id}", json.dumps(task_data), expire=3600)

        logger.info(f"Image analysis completed for {request.image_url}")

    except Exception as e:
        logger.error(f"Image analysis failed: {e}")

        # Update task status to failed
        task_data = json.loads(await redis_service.get(f"task:{task_id}") or "{}")
        task_data.update({
            "status": "failed",
            "error": str(e),
            "updated_at": datetime.utcnow().isoformat()
        })
        await redis_service.set(f"task:{task_id}", json.dumps(task_data), expire=3600)
