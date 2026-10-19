"""
AI/ML Core Service - FastAPI Application
Main entry point for the AI/ML processing service
"""

from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import time
from contextlib import asynccontextmanager

from .config import settings
from .routes import health, images, pdfs, rag, digitization, external_sources, chat
from .security import require_internal_token
from .services.database import close_db, init_db
from .services.qdrant_client import init_qdrant
from .services.redis_client import close_redis, init_redis
from .services.worker import worker

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.log_level.upper()),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan context manager"""
    # Startup
    logger.info("Starting AI/ML Core Service...")

    try:
        # Initialize services
        await init_db()
        init_qdrant()  # синхронная функция
        await init_redis()
        worker.register("image_analysis", images.run_image_analysis)
        worker.register("pdf_processing", pdfs.run_pdf_processing)
        worker.register("digitization", digitization.run_digitization)
        if settings.run_job_worker:
            await worker.start()
        logger.info("All services initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize services: {e}")
        raise

    yield

    # Shutdown
    logger.info("Shutting down AI/ML Core Service...")
    if settings.run_job_worker:
        await worker.stop()
    await close_redis()
    await close_db()

# Create FastAPI application
app = FastAPI(
    title="AI/ML Core Service",
    description="Core AI/ML processing service for Virtual Art Gallery",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error"}
    )

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()

    # Log request
    logger.info(f"{request.method} {request.url.path}")

    # Process request
    response = await call_next(request)

    # Log response
    process_time = time.time() - start_time
    logger.info("%s %s -> %s за %.2f с", request.method, request.url.path, response.status_code, process_time)

    return response

# Include routers
# /health без токена (проверка контейнера); подробности в нём тоже под токеном — см. routes/health.py
app.include_router(health.router, prefix="/health", tags=["health"])

# Все остальные ручки — только с внутренним токеном (заголовок X-Internal-Token)
protected = [Depends(require_internal_token)]
app.include_router(images.router, prefix="/api/v1/images", tags=["images"], dependencies=protected)
app.include_router(pdfs.router, prefix="/api/v1/pdfs", tags=["pdfs"], dependencies=protected)
app.include_router(rag.router, prefix="/api/v1/rag", tags=["rag"], dependencies=protected)
app.include_router(chat.router, prefix="/api/v1/chat", tags=["chat"], dependencies=protected)
# маршруты оцифровки сами содержат /digitize и /artworks, поэтому префикс общий
app.include_router(digitization.router, prefix="/api/v1", tags=["digitization"], dependencies=protected)
app.include_router(external_sources.router, prefix="/api/v1/external", tags=["external-sources"], dependencies=protected)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "AI/ML Core Service",
        "version": "1.0.0",
        "status": "running"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "src.models.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.environment == "development",
        log_level=settings.log_level.lower()
    )