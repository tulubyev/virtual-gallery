"""
AI service: LLM/VLM и эмбеддинги через OpenAI-совместимый API
"""

import openai
import logging
from typing import Dict, Any, List, Optional, Tuple
import base64
from ..config import settings
from ..exceptions import ConfigurationError, ExternalAPIError
from .artwork_schemas import (
    BACK_SCHEMA, BACK_SYSTEM_PROMPT, BACK_USER_TEXT, FRONT_SCHEMA, FRONT_SYSTEM_PROMPT, FRONT_USER_TEXT
)
from .llm_client import LLMClient
from .safe_fetch import fetch_image

logger = logging.getLogger(__name__)

class AIService:
    """Обёртка над OpenAI-совместимым API (по умолчанию routerai.ru): диалог, зрение, эмбеддинги."""

    def __init__(self):
        # Ключ задаётся LLM_API_KEY; без него вызовы моделей завершаются понятной ошибкой конфигурации
        self.client = openai.AsyncOpenAI(
            api_key=settings.llm_api_key or "not-configured",
            base_url=settings.llm_base_url
        )
        # Клиент берётся через функцию, чтобы подмена self.client в тестах работала
        self.llm = LLMClient(lambda: self.client)

    @staticmethod
    def _vision_messages(system_prompt: str, user_text: str, images: List[Tuple[bytes, str]]) -> List[Dict[str, Any]]:
        content: List[Dict[str, Any]] = [{"type": "text", "text": user_text}]
        for data, mime in images:
            encoded = base64.b64encode(data).decode("utf-8")
            content.append({"type": "image_url", "image_url": {"url": f"data:{mime};base64,{encoded}"}})
        return [{"role": "system", "content": system_prompt}, {"role": "user", "content": content}]

    async def analyze_image(self, image_url: str, prompt: Optional[str] = None) -> Dict[str, Any]:
        """Свободный разбор изображения (без схемы); для структурного разбора — analyze_artwork_*."""
        prompt = prompt or (
            "Опиши произведение на изображении: стиль и период, сюжет и композицию, цвета и технику, "
            "заметные художественные приёмы. Пиши только то, что видно; если не уверен — так и скажи. "
            "Не делай выводов о подлинности и не называй проценты уверенности."
        )
        # Скачиваем безопасно (белый список хостов, лимит размера), тип определяем по содержимому
        image = await fetch_image(image_url)
        messages = self._vision_messages("Ты — помощник искусствоведа. Отвечай на русском.", prompt, [image])
        result = await self.llm.complete("vision_front", messages)
        return {"analysis": result.text, "model": result.model, "usage": result.usage}

    async def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Эмбеддинги текста через API.

        Запасных («хеш-») векторов нет: при ошибке вызова или несовпадении размерности
        бросается исключение, чтобы в Qdrant не попали векторы без смысла.
        В режиме ru-only внешний API эмбеддингов недоступен (в РФ их у агрегатора нет).
        """
        if settings.llm_mode == "ru-only":
            raise ConfigurationError("embeddings are local-only in ru-only mode")
        if not settings.llm_api_key:
            raise ExternalAPIError("embeddings", "api_key_not_configured")
        try:
            response = await self.client.embeddings.create(
                input=texts,
                model=settings.default_embedding_model
            )
        except Exception as e:
            logger.error(f"Embedding generation failed: {e}")
            raise ExternalAPIError("embeddings", "create", {"model": settings.default_embedding_model}) from e

        vectors = [item.embedding for item in response.data]
        if len(vectors) != len(texts):
            raise ExternalAPIError("embeddings", "count_mismatch", {"expected": len(texts), "got": len(vectors)})
        for vector in vectors:
            if len(vector) != settings.vector_dimension:
                raise ExternalAPIError(
                    "embeddings", "dimension_mismatch",
                    {"expected": settings.vector_dimension, "got": len(vector), "model": settings.default_embedding_model}
                )
        return vectors

    async def generate_text(self, prompt: str, context: Optional[str] = None,
                            max_tokens: Optional[int] = None, task: str = "rag_answer") -> Dict[str, Any]:
        """Текстовый ответ модели задачи `task` (по умолчанию — ответ RAG)."""
        messages = [{"role": "system", "content": "Ты — помощник по искусству. Отвечай по существу и не выдумывай факты."}]
        if context:
            messages.append({"role": "system", "content": f"Контекст: {context}"})
        messages.append({"role": "user", "content": prompt})
        result = await self.llm.complete(task, messages, max_tokens=max_tokens)
        return {"response": result.text, "model": result.model, "usage": result.usage}

    async def analyze_artwork_front(self, image_url: str) -> Dict[str, Any]:
        """Лицевая сторона: структурный разбор по FRONT_SCHEMA (поля обязательны, пусто = null/[])."""
        image = await fetch_image(image_url)
        messages = self._vision_messages(FRONT_SYSTEM_PROMPT, FRONT_USER_TEXT, [image])
        result = await self.llm.complete("vision_front", messages, schema=FRONT_SCHEMA, schema_name="artwork_front", max_tokens=2000)
        return result.parsed

    async def analyze_artwork_back(self, image_url: str) -> Dict[str, Any]:
        """Оборот: дословное чтение надписей по BACK_SCHEMA."""
        image = await fetch_image(image_url)
        messages = self._vision_messages(BACK_SYSTEM_PROMPT, BACK_USER_TEXT, [image])
        result = await self.llm.complete("vision_back", messages, schema=BACK_SCHEMA, schema_name="artwork_back", max_tokens=3000)
        return result.parsed


# Global AI service instance
ai_service = AIService()
