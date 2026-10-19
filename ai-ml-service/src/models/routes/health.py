"""
Health check routes
"""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import psutil
import time
from datetime import datetime

from ..security import require_internal_token
from ..services.database import check_db_connection
from ..services.qdrant_client import check_qdrant_connection
from ..services.redis_client import check_redis_connection

router = APIRouter()

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str
    uptime: float
    services: Dict[str, Any]

class HealthDetailedResponse(BaseModel):
    status: str
    timestamp: str
    version: str
    uptime: float
    system: Dict[str, Any]
    services: Dict[str, Any]

@router.get("/", response_model=HealthResponse)
async def health_check():
    """Basic health check"""
    try:
        # Check services
        db_status = await check_db_connection()
        qdrant_status = await check_qdrant_connection()
        redis_status = await check_redis_connection()

        services_status = {
            "database": db_status,
            "qdrant": qdrant_status,
            "redis": redis_status
        }

        # Тексты ошибок (адреса, имена хостов) наружу не отдаём — они есть в логах
        for service in services_status.values():
            service.pop("error", None)

        # Determine overall status
        all_healthy = all(service.get("healthy", False) for service in services_status.values())
        status = "healthy" if all_healthy else "unhealthy"

        return HealthResponse(
            status=status,
            timestamp=datetime.utcnow().isoformat(),
            version="1.0.0",
            uptime=time.time() - psutil.Process().create_time(),
            services=services_status
        )

    except Exception as e:
        raise HTTPException(status_code=503, detail="Health check failed")

@router.get("/detailed", response_model=HealthDetailedResponse, dependencies=[Depends(require_internal_token)])
async def detailed_health_check():
    """Detailed health check with system information"""
    try:
        # Basic health check
        basic_health = await health_check()

        # System information
        system_info = {
            "cpu_percent": psutil.cpu_percent(interval=None),
            "memory": {
                "total": psutil.virtual_memory().total,
                "available": psutil.virtual_memory().available,
                "percent": psutil.virtual_memory().percent
            },
            "disk": {
                "total": psutil.disk_usage('/').total,
                "free": psutil.disk_usage('/').free,
                "percent": psutil.disk_usage('/').percent
            }
        }

        return HealthDetailedResponse(
            status=basic_health.status,
            timestamp=basic_health.timestamp,
            version=basic_health.version,
            uptime=basic_health.uptime,
            system=system_info,
            services=basic_health.services
        )

    except Exception as e:
        raise HTTPException(status_code=503, detail="Detailed health check failed")