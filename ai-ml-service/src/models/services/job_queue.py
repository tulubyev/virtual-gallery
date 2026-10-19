"""
Очередь задач в PostgreSQL (таблица ai_jobs, migrations/004_create_ai_jobs.sql).

* постановка: INSERT; защита от переполнения очереди;
* выбор: UPDATE ... WHERE job_id = (SELECT ... FOR UPDATE SKIP LOCKED LIMIT 1) — параллельные воркеры
  не берут одну задачу дважды;
* сердцебиение: работающая задача периодически отмечается; зависшие (воркер умер) возвращаются в очередь;
* повторы: временные сбои откладываются с нарастающей задержкой до max_attempts, ошибки запроса
  (FetchError и т. п.) повторять бессмысленно;
* в статус и результат попадают только безопасные сообщения (public_error), подробности — в логах.
"""

import json
import logging
import uuid
from typing import Any, Dict, Optional

from ..exceptions import AIMLException
from .database import db_service

logger = logging.getLogger(__name__)

KIND_PREFIX = {"image_analysis": "img_", "pdf_processing": "pdf_", "digitization": "dig_"}
PREFIX_KIND = {prefix: kind for kind, prefix in KIND_PREFIX.items()}
MAX_QUEUED = 500
RETRY_BASE_SECONDS = 30


class QueueFull(AIMLException):
    def __init__(self):
        super().__init__("Queue is full, try again later", "QUEUE_FULL", 429)


def task_id_for(kind: str, job_id: uuid.UUID) -> str:
    """Внешний идентификатор задачи: префикс вида + hex (формат прежних task_id сохранён)."""
    return f"{KIND_PREFIX[kind]}{job_id.hex}"


def parse_task_id(task_id: str, kind: str) -> Optional[uuid.UUID]:
    prefix = KIND_PREFIX[kind]
    if not task_id.startswith(prefix):
        return None
    try:
        return uuid.UUID(task_id[len(prefix):])
    except ValueError:
        return None


def _decode(row: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    if row is None:
        return None
    job = dict(row)
    for key in ("payload", "result"):
        if isinstance(job.get(key), str):
            job[key] = json.loads(job[key])
    return job


async def enqueue(kind: str, payload: Dict[str, Any], *, priority: int = 5, created_by: Optional[int] = None,
                  max_attempts: int = 3) -> uuid.UUID:
    if kind not in KIND_PREFIX:
        raise ValueError(f"unknown job kind {kind}")
    queued = await db_service.fetchval("SELECT count(*) FROM ai_jobs WHERE status = 'queued'")
    if queued >= MAX_QUEUED:
        raise QueueFull()
    job_id = await db_service.fetchval("""
        INSERT INTO ai_jobs (kind, payload, priority, created_by, max_attempts)
        VALUES ($1, $2::jsonb, $3, $4, $5)
        RETURNING job_id
    """, kind, json.dumps(payload), priority, created_by, max_attempts)
    return job_id


async def claim_next(worker_id: str) -> Optional[Dict[str, Any]]:
    row = await db_service.fetchrow("""
        UPDATE ai_jobs SET status = 'running', locked_by = $1, heartbeat_at = now(),
               started_at = COALESCE(started_at, now()), attempts = attempts + 1,
               progress = 0, current_step = NULL, error = NULL, updated_at = now()
        WHERE job_id = (
            SELECT job_id FROM ai_jobs
            WHERE status = 'queued' AND run_after <= now()
            ORDER BY priority, created_at
            FOR UPDATE SKIP LOCKED
            LIMIT 1
        )
        RETURNING *
    """, worker_id)
    return _decode(row)


async def heartbeat(job_id: uuid.UUID, worker_id: str) -> None:
    await db_service.execute(
        "UPDATE ai_jobs SET heartbeat_at = now(), updated_at = now() WHERE job_id = $1 AND locked_by = $2 AND status = 'running'",
        job_id, worker_id)


async def set_progress(job_id: uuid.UUID, progress: int, step: str) -> None:
    await db_service.execute(
        "UPDATE ai_jobs SET progress = $2, current_step = $3, heartbeat_at = now(), updated_at = now() WHERE job_id = $1 AND status = 'running'",
        job_id, progress, step)


async def complete(job_id: uuid.UUID, result: Dict[str, Any]) -> None:
    await db_service.execute("""
        UPDATE ai_jobs SET status = 'completed', result = $2::jsonb, progress = 100, current_step = NULL,
               error = NULL, locked_by = NULL, finished_at = now(), updated_at = now()
        WHERE job_id = $1
    """, job_id, json.dumps(result, default=str))


async def fail(job_id: uuid.UUID, public_message: str, *, retryable: bool) -> str:
    """Записать сбой. Возвращает итоговый статус: 'queued' (будет повтор) или 'failed'."""
    row = await db_service.fetchrow("SELECT attempts, max_attempts FROM ai_jobs WHERE job_id = $1", job_id)
    if row is None:
        return "failed"
    if retryable and row["attempts"] < row["max_attempts"]:
        delay = RETRY_BASE_SECONDS * (2 ** (row["attempts"] - 1))
        await db_service.execute("""
            UPDATE ai_jobs SET status = 'queued', run_after = now() + make_interval(secs => $2), error = $3,
                   locked_by = NULL, updated_at = now()
            WHERE job_id = $1
        """, job_id, float(delay), public_message)
        return "queued"
    await db_service.execute("""
        UPDATE ai_jobs SET status = 'failed', error = $2, locked_by = NULL, finished_at = now(), updated_at = now()
        WHERE job_id = $1
    """, job_id, public_message)
    return "failed"


async def release_worker_jobs(worker_id: str) -> int:
    """При остановке вернуть свои задачи в очередь (без расхода попытки)."""
    result = await db_service.execute("""
        UPDATE ai_jobs SET status = 'queued', locked_by = NULL, attempts = GREATEST(attempts - 1, 0), updated_at = now()
        WHERE locked_by = $1 AND status = 'running'
    """, worker_id)
    return int(result.split()[-1])


async def requeue_stale(stale_seconds: int) -> int:
    """Вернуть в очередь задачи, у которых давно нет сердцебиения; исчерпавшие попытки — в failed."""
    await db_service.execute("""
        UPDATE ai_jobs SET status = 'failed', error = 'Job timed out', locked_by = NULL, finished_at = now(), updated_at = now()
        WHERE status = 'running' AND heartbeat_at < now() - make_interval(secs => $1) AND attempts >= max_attempts
    """, float(stale_seconds))
    result = await db_service.execute("""
        UPDATE ai_jobs SET status = 'queued', locked_by = NULL, updated_at = now()
        WHERE status = 'running' AND heartbeat_at < now() - make_interval(secs => $1) AND attempts < max_attempts
    """, float(stale_seconds))
    return int(result.split()[-1])


async def get(job_id: uuid.UUID) -> Optional[Dict[str, Any]]:
    return _decode(await db_service.fetchrow("SELECT * FROM ai_jobs WHERE job_id = $1", job_id))


def public_view(job: Dict[str, Any], task_id: str) -> Dict[str, Any]:
    """Ответ клиенту: прежние названия статусов (running → processing) и поля."""
    status = "processing" if job["status"] == "running" else job["status"]
    view = {
        "task_id": task_id,
        "status": status,
        "progress": job["progress"],
        "current_step": job["current_step"],
        "created_at": job["created_at"].isoformat() if job["created_at"] else None,
        "updated_at": job["updated_at"].isoformat() if job["updated_at"] else None,
    }
    if job["status"] == "completed":
        view["result"] = job["result"]
    elif job["status"] == "failed" or (job["status"] == "queued" and job["error"]):
        view["error"] = job["error"]
    return view
