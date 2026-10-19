"""
Image analysis routes
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Dict, Any, Optional
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

        # Check database for completed tasks
        db_result = await db_service.fetchrow("""
            SELECT aa.*, at.status, at.result, at.error_message, at.created_at, at.completed_at
            FROM artwork_analysis aa
            LEFT JOIN ai_tasks at ON aa.task_id = at.task_id
            WHERE aa.artwork_id = $1
            ORDER BY aa.created_at DESC
            LIMIT 1
        """, task_id.split('_')[-1] if '_' in task_id else task_id)  # Extract artwork_id from task_id

        if db_result:
            if db_result["status"] == "completed":
                return {
                    "task_id": task_id,
                    "status": "completed",
                    "result": json.loads(db_result["analysis_result"]) if db_result["analysis_result"] else None,
                    "created_at": db_result["created_at"].isoformat() if db_result["created_at"] else None,
                    "updated_at": db_result["updated_at"].isoformat() if db_result["updated_at"] else None
                }
            else:
                return {
                    "task_id": task_id,
                    "status": db_result["status"],
                    "error": db_result["error_message"],
                    "created_at": db_result["created_at"].isoformat() if db_result["created_at"] else None,
                    "updated_at": db_result["updated_at"].isoformat() if db_result["updated_at"] else None
                }

        # Task not found
        raise HTTPException(status_code=404, detail="Task not found")

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

        # Store results in database using existing schema
        # Store detailed analysis in artwork_analysis table
        await db_service.execute("""
            INSERT INTO artwork_analysis (artwork_id, model_used, processing_time, image_quality)
            VALUES ($1, $2, $3, $4)
        """, request.artwork_id, analysis_result.get("model", "gpt-4-vision"),
             0.0, json.dumps({"raw_analysis": analysis_result.get("analysis", "")}))

        # Update task status to completed
        task_data.update({
            "status": "completed",
            "result": analysis_result,
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

        # Store failure in database
        await db_service.execute("""
            INSERT INTO image_analyses (task_id, artwork_id, user_id, image_url, status, error_message, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        """, task_id, request.artwork_id, request.user_id, request.image_url,
             "failed", str(e), datetime.utcnow(), datetime.utcnow())