"""
Реестр моделей по задачам и политика отправки данных.

Каждая задача (описание лица работы, чтение оборота, ответ RAG, диалог, проверка, массовые операции)
использует свою модель из каталога API; идентификаторы задаются в окружении (MODEL_*) или выбираются
администратором в панели (services/model_settings.py), поэтому смена модели не требует правки кода. Режим `ru-only` подменяет модель на размещённую в РФ и
запрещает запасных провайдеров.
"""

from typing import Any, Dict, NamedTuple, Optional

from ..config import settings
from ..exceptions import ConfigurationError
from .model_settings import model_settings

TASKS = ("vision_front", "vision_back", "rag_answer", "chat", "judge", "bulk")
VISION_TASKS = ("vision_front", "vision_back")

# Температура зависит от задачи: извлечение фактов и OCR — детерминированно, диалог — свободнее
TEMPERATURE = {
    "vision_front": 0.3,
    "vision_back": 0.0,
    "rag_answer": 0.2,
    "chat": 0.5,
    "judge": 0.0,
    "bulk": 0.3,
}


class ModelChoice(NamedTuple):
    task: str
    model: str
    mode: str
    temperature: float
    provider: Optional[Dict[str, Any]]  # объект `provider` для запроса (маршрутизация routerai.ru)


def _provider_policy(mode: str) -> Optional[Dict[str, Any]]:
    provider: Dict[str, Any] = {}
    only = [tag.strip() for tag in settings.llm_provider_only.split(",") if tag.strip()]
    if only:
        provider["only"] = only
        provider["allow_fallbacks"] = False
    if mode == "ru-only":
        # Только серверы в РФ и никаких запасных провайдеров: иначе при сбое запрос уйдёт за границу
        provider["country"] = "ru"
        provider["allow_fallbacks"] = False
    return provider or None


def default_model(task: str, mode: str) -> str:
    """Модель из окружения (MODEL_*) — действует, пока администратор не выбрал другую."""
    if mode == "ru-only":
        return settings.model_ru_only_vision if task in VISION_TASKS else settings.model_ru_only_text
    return getattr(settings, f"model_{task}")


def resolve(task: str, mode: Optional[str] = None) -> ModelChoice:
    """Выбрать модель и политику маршрутизации для задачи (выбор администратора важнее окружения)."""
    if task not in TASKS:
        raise ConfigurationError(f"unknown task {task}")
    mode = mode or settings.llm_mode
    if mode not in ("global", "ru-only"):
        raise ConfigurationError(f"unknown mode {mode}")

    model = model_settings.get(task, mode) or default_model(task, mode)
    return ModelChoice(task, model, mode, TEMPERATURE[task], _provider_policy(mode))
