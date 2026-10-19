"""
Выбор модели по задачам из админ-панели.

Ручки закрыты внутренним токеном (main.py); вход и роль администратора проверяет Express (accessPolicy.ts).
Имя того, кто меняет выбор, приходит в заголовке X-Actor и попадает в журнал изменений.
"""

import logging
from typing import Any, Dict, Optional

from fastapi import APIRouter, Header, HTTPException, Query
from pydantic import BaseModel, Field

from ..config import settings
from ..services import model_catalog, model_registry
from ..services.model_settings import model_settings

router = APIRouter()
logger = logging.getLogger(__name__)

MODES = ("global", "ru-only")


class ChoiceRequest(BaseModel):
    model: str = Field(min_length=3, max_length=160)
    mode: str = "global"


def _actor(value: Optional[str]) -> Optional[str]:
    if not value:
        return None
    return "".join(ch for ch in value if ch.isprintable())[:100] or None


def _mode(value: Optional[str]) -> str:
    mode = value or settings.llm_mode
    if mode not in MODES:
        raise HTTPException(status_code=422, detail="Неизвестный режим")
    return mode


def _task(value: str) -> str:
    if value not in model_registry.TASKS:
        raise HTTPException(status_code=404, detail="Неизвестная задача")
    return value


def _iso(value: Any) -> Optional[str]:
    return value.isoformat() if hasattr(value, "isoformat") else None


def _task_row(task: str, mode: str, catalog: Dict[str, Dict[str, Any]]) -> Dict[str, Any]:
    info = model_catalog.TASK_INFO[task]
    entry = model_settings.entry(task, mode)
    default = model_registry.default_model(task, mode)
    current = entry["model"] if entry else default
    current_row = catalog.get(current)
    return {
        "task": task, "title": info["title"], "description": info["description"], "unit": info["unit"],
        "tokens": {"input": info["tokens"][0], "output": info["tokens"][1]}, "needs_vision": info["needs_vision"],
        "default_volume": info["default_volume"],
        "default_model": default, "current_model": current, "source": "admin" if entry else "env",
        "updated_by": entry["updated_by"] if entry else None, "updated_at": _iso(entry["updated_at"]) if entry else None,
        "current_unit_cost": current_row["cost"][task] if current_row else None,
        "current_known": current_row is not None,
    }


async def _snapshot(mode: str) -> Dict[str, Any]:
    live = await model_catalog.live_catalog()
    models = model_catalog.catalog_view(live, mode)
    by_id = {m["id"]: m for m in models}
    return {
        "llm_mode": settings.llm_mode, "mode": mode,
        "tasks": [_task_row(task, mode, by_id) for task in model_registry.TASKS],
        "catalog": models, "catalog_meta": model_catalog.catalog_meta(),
        "provider_only": settings.llm_provider_only or None,
        "background_tier": settings.llm_background_tier,
    }


@router.get("")
async def get_settings(mode: Optional[str] = Query(default=None)):
    """Задачи с действующими моделями и каталог кандидатов с ценами."""
    mode = _mode(mode)
    await model_settings.load()  # подхватить изменения, сделанные другим экземпляром
    return await _snapshot(mode)


@router.put("/{task}")
async def set_choice(task: str, request: ChoiceRequest, x_actor: Optional[str] = Header(default=None)):
    task, mode = _task(task), _mode(request.mode)
    verdict = await model_catalog.validate_choice(task, mode, request.model)
    if not verdict.ok:
        raise HTTPException(status_code=422, detail=verdict.error)
    try:
        await model_settings.set(task, mode, request.model, _actor(x_actor))
    except Exception as error:
        logger.error("model choice not saved: %s", type(error).__name__)
        raise HTTPException(status_code=500, detail="Не удалось сохранить выбор")
    logger.info("model choice task=%s mode=%s model=%s", task, mode, request.model)
    return {"warnings": verdict.warnings, **await _snapshot(mode)}


@router.delete("/{task}")
async def reset_choice(task: str, mode: Optional[str] = Query(default=None), x_actor: Optional[str] = Header(default=None)):
    """Вернуть модель из окружения (MODEL_*)."""
    task, mode = _task(task), _mode(mode)
    try:
        await model_settings.clear(task, mode, _actor(x_actor))
    except Exception as error:
        logger.error("model choice not reset: %s", type(error).__name__)
        raise HTTPException(status_code=500, detail="Не удалось сбросить выбор")
    return await _snapshot(mode)


@router.get("/history")
async def get_history(limit: int = Query(default=50, ge=1, le=200)):
    rows = await model_settings.history(limit)
    return {"items": [{**row, "changed_at": _iso(row["changed_at"])} for row in rows]}


@router.post("/refresh-catalog")
async def refresh_catalog(mode: Optional[str] = Query(default=None)):
    """Перечитать цены и возможности моделей из каталога routerai."""
    mode = _mode(mode)
    await model_catalog.live_catalog(force=True)
    return await _snapshot(mode)
