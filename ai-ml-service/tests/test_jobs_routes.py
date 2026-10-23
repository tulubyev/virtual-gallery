"""Постановка задач в очередь через HTTP и обработчики очереди (без PostgreSQL: очередь подменена)."""

import datetime
import json
import uuid
from unittest.mock import AsyncMock, MagicMock, patch

import jsonschema
import pytest
from fastapi.testclient import TestClient

from src.models.services import job_queue

AUTH = {"X-Internal-Token": "test-internal-token-0123456789"}


@pytest.fixture()
def client():
    from src.models import main

    with patch.object(main, "init_db", AsyncMock()), patch.object(main, "init_qdrant", MagicMock()), \
         patch.object(main, "init_redis", AsyncMock()), patch.object(main, "close_db", AsyncMock()), \
         patch.object(main, "close_redis", AsyncMock()), \
         patch.object(main.worker, "start", AsyncMock()), patch.object(main.worker, "stop", AsyncMock()):
        with TestClient(main.app) as test_client:
            yield test_client


def job_row(kind, status="running", **extra):
    now = datetime.datetime(2026, 10, 19, 12, 0, 0)
    row = {"job_id": uuid.uuid4(), "kind": kind, "status": status, "payload": {}, "result": None, "error": None,
           "progress": 40, "current_step": "шаг", "created_at": now, "updated_at": now, "attempts": 1}
    row.update(extra)
    return row


# ---------- постановка ----------

@pytest.mark.parametrize("path,body,kind,prefix", [
    ("/api/v1/images/analyze", {"image_url": "https://example.org/a.jpg", "artwork_id": 3, "user_id": 9}, "image_analysis", "img_"),
    ("/api/v1/pdfs/process", {"pdf_url": "https://example.org/a.pdf", "document_id": "d1"}, "pdf_processing", "pdf_"),
    ("/api/v1/digitize", {"front_image_url": "https://example.org/f.jpg"}, "digitization", "dig_"),
])
def test_requests_are_enqueued_with_payload_and_prefixed_task_id(client, path, body, kind, prefix):
    job_id = uuid.uuid4()
    with patch.object(job_queue, "enqueue", AsyncMock(return_value=job_id)) as enqueue:
        response = client.post(path, json=body, headers=AUTH)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "queued" and data["task_id"] == f"{prefix}{job_id.hex}"
    assert enqueue.call_args.args[0] == kind
    assert enqueue.call_args.args[1]["user_id"] == body.get("user_id")


def test_disallowed_url_is_rejected_before_queueing(client):
    with patch.object(job_queue, "enqueue", AsyncMock()) as enqueue:
        response = client.post("/api/v1/images/analyze", json={"image_url": "http://127.0.0.1:6333/"}, headers=AUTH)
    assert response.status_code == 422
    enqueue.assert_not_called()


def test_full_queue_answers_429(client):
    with patch.object(job_queue, "enqueue", AsyncMock(side_effect=job_queue.QueueFull())):
        response = client.post("/api/v1/pdfs/process", json={"pdf_url": "https://example.org/a.pdf", "document_id": "d"}, headers=AUTH)
    assert response.status_code == 429


# ---------- статусы ----------

def test_status_views_for_all_kinds(client):
    cases = [("images/analysis", "image_analysis", "img_"), ("pdfs/processing", "pdf_processing", "pdf_"),
             ("digitize", "digitization", "dig_")]
    for path, kind, prefix in cases:
        done = job_row(kind, "completed", result={"x": 1}, progress=100, current_step=None)
        task_id = f"{prefix}{done['job_id'].hex}"
        with patch.object(job_queue, "get", AsyncMock(return_value=done)):
            body = client.get(f"/api/v1/{path}/{task_id}", headers=AUTH).json()
        assert body["status"] == "completed" and body["result"] == {"x": 1} and body["task_id"] == task_id

    running = job_row("digitization", "running")
    with patch.object(job_queue, "get", AsyncMock(return_value=running)):
        body = client.get(f"/api/v1/digitize/dig_{running['job_id'].hex}", headers=AUTH).json()
    assert body["status"] == "processing" and body["progress"] == 40 and body["current_step"] == "шаг" and "result" not in body

    failed = job_row("image_analysis", "failed", error="Файл слишком большой")
    with patch.object(job_queue, "get", AsyncMock(return_value=failed)):
        body = client.get(f"/api/v1/images/analysis/img_{failed['job_id'].hex}", headers=AUTH).json()
    assert body["status"] == "failed" and body["error"] == "Файл слишком большой"

    retry = job_row("image_analysis", "queued", error="Internal error", attempts=1)
    assert job_queue.public_view(retry, "img_x")["error"] == "Internal error"   # видно, что был сбой и будет повтор


# ---------- обработчики ----------

class Ctx:
    def __init__(self):
        self.task_id = "pdf_test"
        self.steps = []

    async def progress(self, percent, step):
        self.steps.append((percent, step))


@pytest.mark.asyncio
async def test_pdf_handler_indexes_and_returns_summary_without_chunks():
    from src.models.routes import pdfs

    chunks = [{"content": "Первый фрагмент", "char_count": 15, "chunk_index": 0, "page_number": 1},
              {"content": "Второй фрагмент", "char_count": 15, "chunk_index": 1, "page_number": 2}]
    processed = {"chunks": chunks, "processing_stats": {"total_pages": 2, "ocr_performed": False, "total_chars": 30, "chunks_created": 2}}
    categories = {"category": "art_history", "styles": ["реализм"], "artists": [], "techniques": [], "regions": [],
                  "periods": ["XIX век"], "keywords": ["пейзаж"], "summary": "Кратко."}
    ctx = Ctx()
    with patch.object(pdfs.pdf_service, "process_pdf", AsyncMock(return_value=processed)), \
         patch.object(pdfs, "categorize_pdf_content", AsyncMock(return_value=categories)), \
         patch.object(pdfs.ai_service, "generate_embeddings", AsyncMock(return_value=[[0.1], [0.2]])), \
         patch.object(pdfs.knowledge_base, "replace_document", AsyncMock()) as replace, \
         patch.object(pdfs.qdrant_service, "ensure_collection") as ensure, \
         patch.object(pdfs.qdrant_service, "delete_document_points") as cleanup, \
         patch.object(pdfs.qdrant_service, "upsert_points") as upsert, \
         patch.object(pdfs.db_service, "execute", AsyncMock()) as execute:
        result = await pdfs.run_pdf_processing({"pdf_url": "https://example.org/a.pdf", "document_id": "doc1"}, ctx)

    ensure.assert_called_once_with("pdf_chunks")
    cleanup.assert_called_once_with("pdf_chunks", "doc1")
    # без явного решения документ виден только сотрудникам, а текст попадает в PostgreSQL
    assert replace.call_args.kwargs["access"] == "staff" and replace.call_args.kwargs["chunks"] == chunks
    assert all(p["payload"]["access"] == "staff" for p in upsert.call_args.args[1])
    assert [p["id"] for p in upsert.call_args.args[1]] == ["doc1_chunk_0", "doc1_chunk_1"]
    assert "pdf_documents" in execute.call_args.args[0]
    assert result["document_id"] == "doc1" and result["categories"]["category"] == "art_history"
    assert "chunks" not in result and len(json.dumps(result)) < 2000
    assert [percent for percent, _ in ctx.steps] == sorted(percent for percent, _ in ctx.steps)


@pytest.mark.asyncio
async def test_pdf_handler_errors_propagate_for_retry_logic():
    from src.models.exceptions import FetchError
    from src.models.routes import pdfs

    with patch.object(pdfs.pdf_service, "process_pdf", AsyncMock(side_effect=FetchError("Файл слишком большой"))):
        with pytest.raises(FetchError):
            await pdfs.run_pdf_processing({"pdf_url": "https://example.org/a.pdf", "document_id": "d"}, Ctx())


@pytest.mark.asyncio
async def test_categorization_uses_schema_task_and_survives_failure():
    from src.models.routes import pdfs
    from src.models.services.llm_client import LLMResult

    parsed = {"category": "other", "styles": [], "artists": [], "techniques": [], "regions": [], "periods": [],
              "keywords": [], "summary": None}
    jsonschema.validate(parsed, pdfs.PDF_CATEGORY_SCHEMA)
    with patch.object(pdfs.ai_service.llm, "complete", AsyncMock(return_value=LLMResult("{}", parsed, "m", {}, 1))) as complete:
        assert await pdfs.categorize_pdf_content("текст") == parsed
    assert complete.call_args.args[0] == "bulk" and complete.call_args.kwargs["background"] is True
    user_message = complete.call_args.args[1][1]["content"]
    assert "<document>" in user_message
    with patch.object(pdfs.ai_service.llm, "complete", AsyncMock(side_effect=RuntimeError("x"))):
        assert await pdfs.categorize_pdf_content("текст") == {}


@pytest.mark.asyncio
async def test_digitization_handler_is_idempotent_and_does_not_swallow_errors():
    from src.models.routes import digitization

    front = {"suggested_title": "Т", "suggested_artist": None, "style": "реализм", "period": None, "technique": None,
             "genre": None, "description": "Д", "color_palette": [], "uncertainties": []}
    ctx = Ctx()
    ctx.task_id = "dig_abc"
    payload = {"front_image_url": "https://example.org/f.jpg", "visible_watermark": False, "invisible_watermark": False}
    fetchrow = AsyncMock(return_value={"id": 11})
    with patch.object(digitization.ai_service, "analyze_artwork_front", AsyncMock(return_value=front)), \
         patch.object(digitization.db_service, "fetchrow", fetchrow):
        result = await digitization.run_digitization(payload, ctx)
    assert result["artwork_id"] == 11 and result["status"] == "pending_review"
    assert "ON CONFLICT (task_id)" in fetchrow.call_args.args[0]
    assert fetchrow.call_args.args[1] == "dig_abc"

    with patch.object(digitization.ai_service, "analyze_artwork_front", AsyncMock(side_effect=RuntimeError("boom"))):
        with pytest.raises(RuntimeError):
            await digitization.run_digitization(payload, ctx)
