"""
Выбор модели по задачам, сделанный администратором (таблица ai_model_settings).

Переопределяет значения MODEL_* из окружения. Хранится в памяти (resolve() вызывается синхронно на каждый
запрос к модели) и обновляется из БД при старте, при изменении и раз в REFRESH_SECONDS — так несколько
экземпляров ядра приходят к одному выбору без перезапуска. Если БД недоступна, остаётся последнее известное
состояние, а при его отсутствии действуют значения из окружения.
"""

import asyncio
import logging
from typing import Any, Dict, List, Optional, Tuple

from .database import db_service

logger = logging.getLogger(__name__)

REFRESH_SECONDS = 30


class ModelSettings:
    def __init__(self) -> None:
        self._overrides: Dict[Tuple[str, str], Dict[str, Any]] = {}
        self._refresh_task: Optional[asyncio.Task] = None

    def get(self, task: str, mode: str) -> Optional[str]:
        entry = self._overrides.get((task, mode))
        return entry["model"] if entry else None

    def entry(self, task: str, mode: str) -> Optional[Dict[str, Any]]:
        return self._overrides.get((task, mode))

    def reset_memory(self) -> None:
        self._overrides = {}

    async def load(self) -> bool:
        """Прочитать выбор из БД. При ошибке состояние не меняется."""
        try:
            rows = await db_service.fetch_all("SELECT task, mode, model, updated_by, updated_at FROM ai_model_settings")
        except Exception as error:
            logger.warning("model settings not loaded: %s", type(error).__name__)
            return False
        self._overrides = {(r["task"], r["mode"]): {"model": r["model"], "updated_by": r["updated_by"], "updated_at": r["updated_at"]} for r in rows}
        return True

    async def set(self, task: str, mode: str, model: str, actor: Optional[str]) -> None:
        async with db_service.pool.acquire() as conn:
            async with conn.transaction():
                old = await conn.fetchval("SELECT model FROM ai_model_settings WHERE task = $1 AND mode = $2 FOR UPDATE", task, mode)
                await conn.execute(
                    """INSERT INTO ai_model_settings (task, mode, model, updated_by, updated_at) VALUES ($1, $2, $3, $4, now())
                       ON CONFLICT (task, mode) DO UPDATE SET model = EXCLUDED.model, updated_by = EXCLUDED.updated_by, updated_at = now()""",
                    task, mode, model, actor)
                await conn.execute(
                    "INSERT INTO ai_model_settings_log (task, mode, old_model, new_model, actor) VALUES ($1, $2, $3, $4, $5)",
                    task, mode, old, model, actor)
        await self.load()

    async def clear(self, task: str, mode: str, actor: Optional[str]) -> bool:
        async with db_service.pool.acquire() as conn:
            async with conn.transaction():
                old = await conn.fetchval("DELETE FROM ai_model_settings WHERE task = $1 AND mode = $2 RETURNING model", task, mode)
                if old is not None:
                    await conn.execute(
                        "INSERT INTO ai_model_settings_log (task, mode, old_model, new_model, actor) VALUES ($1, $2, $3, NULL, $4)",
                        task, mode, old, actor)
        await self.load()
        return old is not None

    async def history(self, limit: int = 50) -> List[Dict[str, Any]]:
        limit = max(1, min(int(limit), 200))
        return await db_service.fetch_all(
            "SELECT task, mode, old_model, new_model, actor, changed_at FROM ai_model_settings_log ORDER BY changed_at DESC, id DESC LIMIT $1",
            limit)

    def start_refresh(self, interval: float = REFRESH_SECONDS) -> None:
        if self._refresh_task is None or self._refresh_task.done():
            self._refresh_task = asyncio.create_task(self._refresh_loop(interval))

    async def stop_refresh(self) -> None:
        task, self._refresh_task = self._refresh_task, None
        if task:
            task.cancel()
            try:
                await task
            except asyncio.CancelledError:
                pass

    async def _refresh_loop(self, interval: float) -> None:
        while True:
            await asyncio.sleep(interval)
            await self.load()


model_settings = ModelSettings()
