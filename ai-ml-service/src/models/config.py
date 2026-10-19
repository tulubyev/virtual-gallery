"""
Configuration management using Pydantic settings
"""

from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class Settings(BaseSettings):
    """Application settings"""

    # Environment
    environment: str = "development"
    log_level: str = "INFO"

    # Server
    host: str = "0.0.0.0"
    port: int = 8000

    # CORS
    cors_origins: List[str] = ["http://localhost:3000", "http://localhost:8000"]

    # Database
    database_url: str  # обязательная переменная окружения DATABASE_URL, запасного значения нет

    # Vector Database
    qdrant_url: str = "http://localhost:6333"
    qdrant_api_key: Optional[str] = None

    # Redis
    redis_url: str = "redis://localhost:6379"

    # External APIs
    openai_api_key: str = ""
    openai_base_url: Optional[str] = None  # For OpenRouter
    openrouter_api_key: Optional[str] = ""
    anthropic_api_key: Optional[str] = ""
    cohere_api_key: Optional[str] = ""

    # AI/ML Settings
    default_embedding_model: str = "text-embedding-3-small"
    default_generation_model: str = "anthropic/claude-3-haiku"  # Works well with OpenRouter
    vision_model: str = "openai/gpt-4-vision-preview"  # Via OpenRouter
    max_tokens: int = 2000
    temperature: float = 0.7

    # Image Processing
    max_image_size: int = 10 * 1024 * 1024  # 10MB
    supported_image_formats: List[str] = [".jpg", ".jpeg", ".png", ".webp"]

    # PDF Processing
    max_pdf_size: int = 50 * 1024 * 1024  # 50MB
    chunk_size: int = 1000
    chunk_overlap: int = 200

    # RAG Settings
    vector_dimension: int = 1536  # OpenAI text-embedding-3-small
    similarity_threshold: float = 0.7
    max_context_chunks: int = 5

    # Task Processing
    max_concurrent_tasks: int = 3
    task_timeout: int = 300  # 5 minutes

    # S3 Storage (beget.com compatible)
    s3_access_key_id: Optional[str] = None
    s3_secret_access_key: Optional[str] = None
    s3_endpoint: str = "https://s3.beget.com"
    s3_region: str = "ru-msk"
    s3_bucket: str = "virtual-gallery-images"

    class Config:
        env_file = ".env"
        case_sensitive = False

# Create global settings instance
settings = Settings()