"""
Configuration management using Pydantic settings
"""

from pydantic import field_validator
from pydantic_settings import BaseSettings
from typing import List, Literal, Optional

class Settings(BaseSettings):
    """Application settings"""

    # Environment
    environment: str = "development"
    log_level: str = "INFO"

    # Server
    host: str = "0.0.0.0"
    port: int = 8000

    # Внутренний токен: все ручки, кроме /health, принимают только вызовы с заголовком X-Internal-Token.
    # Обязательная переменная окружения INTERNAL_API_TOKEN (не короче 16 символов), запасного значения нет.
    internal_api_token: str

    # CORS
    cors_origins: List[str] = ["http://localhost:3000", "http://localhost:8000"]

    # Database
    database_url: str  # обязательная переменная окружения DATABASE_URL, запасного значения нет

    # Vector Database
    qdrant_url: str = "http://localhost:6333"
    qdrant_api_key: Optional[str] = None

    # Redis
    redis_url: str = "redis://localhost:6379"

    # LLM/VLM: любой OpenAI-совместимый API. По умолчанию — агрегатор routerai.ru (оплата в рублях,
    # каталог моделей GET /api/v1/models). Ключ задаётся только в .env (LLM_API_KEY).
    llm_base_url: str = "https://routerai.ru/api/v1"
    llm_api_key: str = ""

    # Политика отправки: global — любые модели каталога; ru-only — только модели с серверами в РФ
    # (provider.country=ru, без запасных провайдеров); для приватных коллекций и данных с ПДн.
    llm_mode: Literal["global", "ru-only"] = "global"
    # Жёстко закрепить провайдеров (через запятую, идентификаторы из /models/{id}/endpoints, поле tag),
    # иначе балансировщик «по цене» может сменить endpoint, страну и квантование.
    llm_provider_only: str = ""
    # Режим обработки для фоновых задач: flex примерно вдвое дешевле (если не задан — обычный)
    llm_background_tier: Optional[Literal["flex"]] = None

    # Модели по задачам (id из каталога routerai.ru). Значения по умолчанию — предварительные,
    # окончательный выбор делается на размеченном наборе (tools/model_bakeoff.py, docs/AI-ML-DESIGN.md).
    model_vision_front: str = "anthropic/claude-sonnet-5.5"   # описание лицевой стороны по фото
    model_vision_back: str = "anthropic/claude-sonnet-5.5"    # чтение оборота (OCR, подписи, штампы)
    model_rag_answer: str = "anthropic/claude-haiku-5.5"      # ответ по найденным фрагментам
    model_chat: str = "anthropic/claude-haiku-5.5"            # диалог с помощником
    model_judge: str = "anthropic/claude-haiku-5.5"           # проверка/реранк/классификация
    model_bulk: str = "anthropic/claude-haiku-5.5"            # массовые дешёвые операции
    # Модели для режима ru-only (есть endpoint в РФ)
    model_ru_only_text: str = "sber/gigachat-3-pro"
    model_ru_only_vision: str = "qwen/qwen3.6-35b-a3b"

    # Эмбеддинги текста (через тот же API). bge-m3: 1024 измерения, без префиксов запроса.
    default_embedding_model: str = "baai/bge-m3"
    max_tokens: int = 2000
    temperature: float = 0.7

    # Загрузка по URL из запросов (SSRF): через запятую домены, с которых можно скачивать (кроме хоста S3),
    # например FETCH_ALLOWED_HOSTS=virtgal.ru,cdn.virtgal.ru
    fetch_allowed_hosts: str = ""

    # Image Processing
    max_image_size: int = 10 * 1024 * 1024  # 10MB
    supported_image_formats: List[str] = [".jpg", ".jpeg", ".png", ".webp"]

    # PDF Processing
    max_pdf_size: int = 50 * 1024 * 1024  # 50MB
    chunk_size: int = 1000
    chunk_overlap: int = 200

    # RAG Settings
    vector_dimension: int = 1024  # bge-m3; при смене модели эмбеддингов — новая коллекция Qdrant
    similarity_threshold: float = 0.7
    max_context_chunks: int = 5

    # Task Processing
    max_concurrent_tasks: int = 3
    # Воркер очереди внутри процесса ядра (false — только приём задач, обработка в другом экземпляре)
    run_job_worker: bool = True
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

    @field_validator("internal_api_token")
    @classmethod
    def _token_not_weak(cls, value: str) -> str:
        if len(value) < 16:
            raise ValueError("INTERNAL_API_TOKEN должен быть не короче 16 символов")
        return value


# Create global settings instance
settings = Settings()