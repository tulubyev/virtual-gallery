"""Очередь задач на настоящем PostgreSQL (пропускается, если TEST_DATABASE_URL не задан).

Пример: TEST_DATABASE_URL=postgresql://aiml_test:aiml_test_pw@127.0.0.1:5432/aiml_test pytest tests/test_job_queue.py
"""

import asyncio
import os
import uuid
from pathlib import Path

import asyncpg
import pytest
import pytest_asyncio

from src.models.exceptions import ExternalAPIError, FetchError
from src.models.services import job_queue
from src.models.services.database import db_service
from src.models.services.worker import JobWorker, is_retryable

DSN = os.environ.get("TEST_DATABASE_URL")
pytestmark = pytest.mark.skipif(not DSN, reason="TEST_DATABASE_URL не задан")
MIGRATION = Path(__file__).resolve().parent.parent / "migrations" / "004_create_ai_jobs.sql"


@pytest_asyncio.fixture
async def pg():
    pool = await asyncpg.create_pool(DSN, min_size=2, max_size=10)
    async with pool.acquire() as connection:
        await connection.execute("DROP TABLE IF EXISTS ai_jobs")
        await connection.execute(MIGRATION.read_text(encoding="utf-8"))
    previous = db_service.pool
    db_service.pool = pool
    yield pool
    db_service.pool = previous
    await pool.close()


@pytest.mark.asyncio
async def test_migration_is_idempotent(pg):
    async with pg.acquire() as connection:
        await connection.execute(MIGRATION.read_text(encoding="utf-8"))


@pytest.mark.asyncio
async def test_enqueue_claim_complete_roundtrip(pg):
    job_id = await job_queue.enqueue("image_analysis", {"image_url": "https://example.org/a.jpg"}, created_by=7)
    job = await job_queue.claim_next("w1")
    assert job["job_id"] == job_id and job["status"] == "running" and job["attempts"] == 1
    assert job["payload"] == {"image_url": "https://example.org/a.jpg"} and job["created_by"] == 7
    assert await job_queue.claim_next("w2") is None            # очередь пуста
    await job_queue.set_progress(job_id, 40, "шаг")
    await job_queue.complete(job_id, {"answer": 42})
    done = await job_queue.get(job_id)
    assert done["status"] == "completed" and done["result"] == {"answer": 42} and done["progress"] == 100
    view = job_queue.public_view(done, job_queue.task_id_for("image_analysis", job_id))
    assert view["status"] == "completed" and view["result"] == {"answer": 42} and view["task_id"].startswith("img_")


@pytest.mark.asyncio
async def test_priority_and_fifo_order(pg):
    low = await job_queue.enqueue("pdf_processing", {"n": 1}, priority=9)
    first = await job_queue.enqueue("pdf_processing", {"n": 2}, priority=1)
    second = await job_queue.enqueue("pdf_processing", {"n": 3}, priority=1)
    order = [(await job_queue.claim_next("w"))["job_id"] for _ in range(3)]
    assert order == [first, second, low]


@pytest.mark.asyncio
async def test_parallel_workers_never_take_the_same_job(pg):
    ids = [await job_queue.enqueue("image_analysis", {"i": i}) for i in range(30)]
    claimed = await asyncio.gather(*[job_queue.claim_next(f"w{i % 10}") for i in range(60)])
    taken = [job["job_id"] for job in claimed if job]
    assert len(taken) == 30 and set(taken) == set(ids) and len(set(taken)) == 30


@pytest.mark.asyncio
async def test_retry_with_backoff_then_final_failure(pg):
    job_id = await job_queue.enqueue("image_analysis", {}, max_attempts=2)
    await job_queue.claim_next("w")
    assert await job_queue.fail(job_id, "временный сбой", retryable=True) == "queued"
    waiting = await job_queue.get(job_id)
    assert waiting["status"] == "queued" and waiting["error"] == "временный сбой"
    assert await job_queue.claim_next("w") is None              # run_after в будущем
    await db_pool_execute(pg, "UPDATE ai_jobs SET run_after = now() WHERE job_id = $1", job_id)
    second = await job_queue.claim_next("w")
    assert second["attempts"] == 2
    assert await job_queue.fail(job_id, "ещё сбой", retryable=True) == "failed"   # попытки исчерпаны
    assert (await job_queue.get(job_id))["status"] == "failed"
    view = job_queue.public_view(await job_queue.get(job_id), "img_x")
    assert view["status"] == "failed" and view["error"] == "ещё сбой"


@pytest.mark.asyncio
async def test_non_retryable_failure_is_final(pg):
    job_id = await job_queue.enqueue("image_analysis", {})
    await job_queue.claim_next("w")
    assert await job_queue.fail(job_id, "Файл слишком большой", retryable=False) == "failed"


@pytest.mark.asyncio
async def test_stale_running_jobs_are_requeued_or_failed(pg):
    stale = await job_queue.enqueue("image_analysis", {})
    exhausted = await job_queue.enqueue("image_analysis", {}, max_attempts=1)
    await job_queue.claim_next("dead")
    await job_queue.claim_next("dead")
    await db_pool_execute(pg, "UPDATE ai_jobs SET heartbeat_at = now() - interval '1 hour'")
    assert await job_queue.requeue_stale(600) == 1
    assert (await job_queue.get(stale))["status"] == "queued"
    assert (await job_queue.get(exhausted))["status"] == "failed"
    taken = await job_queue.claim_next("alive")                  # возвращённая задача взята заново
    assert taken["job_id"] == stale and taken["attempts"] == 2
    assert await job_queue.requeue_stale(600) == 0               # свежее сердцебиение не трогаем
    assert (await job_queue.get(stale))["status"] == "running"


@pytest.mark.asyncio
async def test_queue_limit(pg, monkeypatch):
    monkeypatch.setattr(job_queue, "MAX_QUEUED", 2)
    await job_queue.enqueue("image_analysis", {})
    await job_queue.enqueue("image_analysis", {})
    with pytest.raises(job_queue.QueueFull):
        await job_queue.enqueue("image_analysis", {})


def test_task_id_roundtrip_and_validation():
    job_id = uuid.uuid4()
    task_id = job_queue.task_id_for("digitization", job_id)
    assert task_id.startswith("dig_") and job_queue.parse_task_id(task_id, "digitization") == job_id
    assert job_queue.parse_task_id(task_id, "image_analysis") is None
    assert job_queue.parse_task_id("dig_not-a-uuid", "digitization") is None


def test_retryability_rules():
    assert is_retryable(ExternalAPIError("llm", "request")) and is_retryable(RuntimeError("boom"))
    assert not is_retryable(FetchError("Файл слишком большой"))


# ---------- воркер ----------

async def db_pool_execute(pool, sql, *args):
    async with pool.acquire() as connection:
        await connection.execute(sql, *args)


async def wait_status(job_id, wanted, timeout=10):
    for _ in range(int(timeout / 0.05)):
        job = await job_queue.get(job_id)
        if job["status"] in wanted:
            return job
        await asyncio.sleep(0.05)
    raise AssertionError(f"timeout, status={job['status']}")


@pytest.mark.asyncio
async def test_worker_runs_handlers_reports_progress_and_hides_internal_errors(pg, monkeypatch):
    monkeypatch.setattr("src.models.services.worker.POLL_SECONDS", 0.05)
    worker = JobWorker(concurrency=2)

    async def ok(payload, ctx):
        await ctx.progress(50, "половина")
        return {"echo": payload["value"], "task_id": ctx.task_id}

    async def bad_request(payload, ctx):
        raise FetchError("Файл слишком большой")

    async def crash(payload, ctx):
        raise RuntimeError("connect to 10.0.0.5:5432 refused")

    worker.register("image_analysis", ok)
    worker.register("pdf_processing", bad_request)
    worker.register("digitization", crash)
    await worker.start()
    try:
        good = await job_queue.enqueue("image_analysis", {"value": 5})
        client_error = await job_queue.enqueue("pdf_processing", {})
        internal = await job_queue.enqueue("digitization", {}, max_attempts=1)
        done = await wait_status(good, {"completed"})
        assert done["result"]["echo"] == 5 and done["result"]["task_id"].startswith("img_")
        failed = await wait_status(client_error, {"failed"})
        assert failed["error"] == "Файл слишком большой" and failed["attempts"] == 1        # не повторяется
        crashed = await wait_status(internal, {"failed"})
        assert crashed["error"] == "Internal error" and "10.0.0.5" not in crashed["error"]
    finally:
        await worker.stop()


@pytest.mark.asyncio
async def test_worker_retries_transient_error_then_succeeds(pg, monkeypatch):
    monkeypatch.setattr("src.models.services.worker.POLL_SECONDS", 0.05)
    monkeypatch.setattr(job_queue, "RETRY_BASE_SECONDS", 0.1)
    worker = JobWorker(concurrency=1)
    calls = {"n": 0}

    async def flaky(payload, ctx):
        calls["n"] += 1
        if calls["n"] == 1:
            raise ExternalAPIError("llm", "request")
        return {"calls": calls["n"]}

    worker.register("image_analysis", flaky)
    await worker.start()
    try:
        job_id = await job_queue.enqueue("image_analysis", {})
        done = await wait_status(job_id, {"completed"})
        assert done["result"] == {"calls": 2} and done["attempts"] == 2
    finally:
        await worker.stop()


@pytest.mark.asyncio
async def test_worker_stop_returns_running_job_to_queue(pg, monkeypatch):
    monkeypatch.setattr("src.models.services.worker.POLL_SECONDS", 0.05)
    worker = JobWorker(concurrency=1)
    started = asyncio.Event()

    async def slow(payload, ctx):
        started.set()
        await asyncio.sleep(30)

    worker.register("image_analysis", slow)
    await worker.start()
    job_id = await job_queue.enqueue("image_analysis", {})
    await asyncio.wait_for(started.wait(), 5)
    await worker.stop()
    job = await job_queue.get(job_id)
    assert job["status"] == "queued" and job["attempts"] == 0      # попытка не потрачена


@pytest.mark.asyncio
async def test_unknown_kind_without_handler_fails_cleanly(pg, monkeypatch):
    monkeypatch.setattr("src.models.services.worker.POLL_SECONDS", 0.05)
    worker = JobWorker(concurrency=1)
    await worker.start()
    try:
        job_id = await job_queue.enqueue("image_analysis", {})
        failed = await wait_status(job_id, {"failed"})
        assert failed["error"] == "No handler for this job kind"
    finally:
        await worker.stop()


@pytest.mark.asyncio
async def test_http_to_worker_to_status_end_to_end(pg, monkeypatch):
    """Настоящий путь: POST → строка в ai_jobs → воркер → обработчик → GET со статусом и результатом."""
    from unittest.mock import AsyncMock, patch

    import httpx

    from src.models import main
    from src.models.routes import images

    monkeypatch.setattr("src.models.services.worker.POLL_SECONDS", 0.05)
    headers = {"X-Internal-Token": "test-internal-token-0123456789"}
    worker = JobWorker(concurrency=2)
    worker.register("image_analysis", images.run_image_analysis)
    analysis = {"analysis": "Пейзаж", "model": "m", "usage": {"total_tokens": 5}}
    await worker.start()
    try:
        with patch.object(images.ai_service, "analyze_image", AsyncMock(return_value=analysis)):
            transport = httpx.ASGITransport(app=main.app)
            async with httpx.AsyncClient(transport=transport, base_url="http://core") as http:
                created = await http.post("/api/v1/images/analyze", headers=headers, json={"image_url": "https://example.org/a.jpg"})
                assert created.status_code == 200
                task_id = created.json()["task_id"]
                body = None
                for _ in range(100):
                    body = (await http.get(f"/api/v1/images/analysis/{task_id}", headers=headers)).json()
                    if body["status"] == "completed":
                        break
                    await asyncio.sleep(0.05)
        assert body["status"] == "completed" and body["result"]["analysis"] == "Пейзаж" and body["result"]["persisted"] is False
    finally:
        await worker.stop()
