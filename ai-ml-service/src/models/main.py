"""
AI/ML Core Service - FastAPI Application
Main entry point for the AI/ML processing service
"""

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import time
from contextlib import asynccontextmanager

from .config import settings
from .routes import health, images, pdfs, rag, digitization, external_sources
from .services.database import init_db
from .services.qdrant_client import init_qdrant
from .services.redis_client import init_redis

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL.upper()),
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
        await init_qdrant()
        await init_redis()
        logger.info("All services initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize services: {e}")
        raise

    yield

    # Shutdown
    logger.info("Shutting down AI/ML Core Service...")

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
    allow_origins=settings.CORS_ORIGINS,
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
        content={"error": "Internal server error", "detail": str(exc)}
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
    logger.info(".2f")

    return response

# Include routers
app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(images.router, prefix="/api/v1/images", tags=["images"])
app.include_router(pdfs.router, prefix="/api/v1/pdfs", tags=["pdfs"])
app.include_router(rag.router, prefix="/api/v1/rag", tags=["rag"])
app.include_router(digitization.router, prefix="/api/v1/artworks", tags=["digitization"])
app.include_router(external_sources.router, prefix="/api/v1/external", tags=["external-sources"])

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
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.ENVIRONMENT == "development",
        log_level=settings.LOG_LEVEL.lower()
    )