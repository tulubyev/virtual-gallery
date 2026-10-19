"""
Воркер очереди: несколько параллельных исполнителей внутри процесса ядра.

Обработчики регистрируются по виду задачи и получают (payload, ctx); ctx.progress(процент, шаг)
обновляет статус. Исключение из обработчика — сбой: временные (ExternalAPIError, неизвестные) повторяются
с задержкой, ошибки запроса (FetchError, ValidationError и др. наши исключения кроме ExternalAPIError) — нет.
"""

import asyncio
import logging
import os
import socket
import uuid
from typing import Any, Awaitable, Callable, Dict, List, Optional

from ..config import settings
from ..exceptions import AIMLException, ExternalAPIError, public_error
from . import job_queue

logger = logging.getLogger(__name__)

POLL_SECONDS = 2.0
HEARTBEAT_SECONDS = 30
STALE_CHECK_SECONDS = 60


class JobContext:
    def __init__(self, job_id: uuid.UUID, task_id: str):
        self.job_id = job_id
        self.task_id = task_id

    async def progress(self, percent: int, step: str) -> None:
        await job_queue.set_progress(self.job_id, percent, step)


Handler = Callable[[Dict[str, Any], JobContext], Awaitable[Dict[str, Any]]]


def is_retryable(error: Exception) -> bool:
    if isinstance(error, AIMLException):
        return isinstance(error, ExternalAPIError)
    return True


class JobWorker:
    def __init__(self, concurrency: Optional[int] = None):
        self.concurrency = concurrency or settings.max_concurrent_tasks
        self.worker_id = f"{socket.gethostname()}-{os.getpid()}-{uuid.uuid4().hex[:6]}"
        self.handlers: Dict[str, Handler] = {}
        self._tasks: List[asyncio.Task] = []
        self._stopping = False

    def register(self, kind: str, handler: Handler) -> None:
        self.handlers[kind] = handler

    async def start(self) -> None:
        self._stopping = False
        self._tasks = [asyncio.create_task(self._loop(index)) for index in range(self.concurrency)]
        self._tasks.append(asyncio.create_task(self._stale_loop()))
        logger.info("Job worker %s started (%s executors)", self.worker_id, self.concurrency)

    async def stop(self) -> None:
        self._stopping = True
        for task in self._tasks:
            task.cancel()
        await asyncio.gather(*self._tasks, return_exceptions=True)
        released = await job_queue.release_worker_jobs(self.worker_id)
        logger.info("Job worker %s stopped, %s job(s) returned to the queue", self.worker_id, released)

    async def _stale_loop(self) -> None:
        stale_after = max(settings.task_timeout * 2, 120)
        while not self._stopping:
            try:
                requeued = await job_queue.requeue_stale(stale_after)
                if requeued:
                    logger.warning("Returned %s stale job(s) to the queue", requeued)
            except Exception as error:
                logger.error("Stale job check failed: %s", error)
            await asyncio.sleep(STALE_CHECK_SECONDS)

    async def _loop(self, index: int) -> None:
        while not self._stopping:
            try:
                job = await job_queue.claim_next(self.worker_id)
            except Exception as error:
                logger.error("Claiming a job failed: %s", error)
                await asyncio.sleep(POLL_SECONDS * 2)
                continue
            if job is None:
                await asyncio.sleep(POLL_SECONDS)
                continue
            await self.run_job(job)

    async def run_job(self, job: Dict[str, Any]) -> None:
        job_id = job["job_id"]
        kind = job["kind"]
        handler = self.handlers.get(kind)
        if handler is None:
            await job_queue.fail(job_id, "No handler for this job kind", retryable=False)
            return
        context = JobContext(job_id, job_queue.task_id_for(kind, job_id))
        beat = asyncio.create_task(self._beat(job_id))
        try:
            result = await asyncio.wait_for(handler(job["payload"], context), timeout=settings.task_timeout * 4)
            await job_queue.complete(job_id, result)
        except asyncio.CancelledError:
            raise
        except asyncio.TimeoutError:
            logger.error("Job %s (%s) timed out", context.task_id, kind)
            await job_queue.fail(job_id, "Job timed out", retryable=True)
        except Exception as error:
            logger.error("Job %s (%s) failed on attempt %s: %s", context.task_id, kind, job["attempts"], error, exc_info=True)
            status = await job_queue.fail(job_id, public_error(error), retryable=is_retryable(error))
            if status == "queued":
                logger.info("Job %s will be retried", context.task_id)
        finally:
            beat.cancel()
            await asyncio.gather(beat, return_exceptions=True)

    async def _beat(self, job_id: uuid.UUID) -> None:
        while True:
            await asyncio.sleep(HEARTBEAT_SECONDS)
            try:
                await job_queue.heartbeat(job_id, self.worker_id)
            except Exception as error:
                logger.warning("Heartbeat failed: %s", error)


worker = JobWorker()
