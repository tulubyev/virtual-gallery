"""
Проверки исправлений P0 для Python-ядра (docs/AI-ML-CORE-REVIEW.md).

Внешние сервисы (PostgreSQL, Redis, Qdrant, OpenAI-API) подменяются, сеть не нужна.
"""

import json
import uuid
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from fastapi.testclient import TestClient

TOKEN = "test-internal-token-0123456789"
AUTH = {"X-Internal-Token": TOKEN}


@pytest.fixture()
def client():
    from src.models import main

    with patch.object(main, "init_db", AsyncMock()), \
         patch.object(main, "init_qdrant", MagicMock()), \
         patch.object(main, "init_redis", AsyncMock()), \
         patch.object(main, "close_db", AsyncMock()), \
         patch.object(main, "close_redis", AsyncMock()):
        with TestClient(main.app) as test_client:
            yield test_client


# ---------- запуск и защита ----------

def test_app_starts_and_root_is_open(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "running"


def test_all_api_routes_require_internal_token(client):
    assert client.get("/api/v1/rag/stats").status_code == 401
    assert client.get("/api/v1/rag/stats", headers={"X-Internal-Token": "wrong"}).status_code == 401
    assert client.get("/api/v1/artworks").status_code == 401
    assert client.post("/api/v1/images/analyze", json={"image_url": "http://x/y.jpg"}).status_code == 401


def test_token_accepts_correct_value(client):
    from src.models.routes import rag

    with patch.object(rag.qdrant_service, "collection_exists", return_value=False):
        response = client.get("/api/v1/rag/stats", headers=AUTH)
    assert response.status_code == 200
    assert response.json()["total_vectors"] == 0


def test_health_basic_open_without_error_details_and_detailed_protected(client):
    from src.models.routes import health

    failing = {"healthy": False, "error": "connect to db.internal:5432 failed", "details": "Database connection failed"}
    ok = {"healthy": True, "details": "ok"}
    with patch.object(health, "check_db_connection", AsyncMock(return_value=failing)), \
         patch.object(health, "check_qdrant_connection", AsyncMock(return_value=ok)), \
         patch.object(health, "check_redis_connection", AsyncMock(return_value=ok)):
        response = client.get("/health/")
        assert response.status_code == 200
        assert response.json()["status"] == "unhealthy"
        assert "db.internal" not in response.text
        assert client.get("/health/detailed").status_code == 401
        assert client.get("/health/detailed", headers=AUTH).status_code == 200


def _paths(client):
    # через OpenAPI: не зависит от внутреннего устройства роутеров конкретной версии FastAPI
    return set(client.get("/openapi.json").json()["paths"])


def test_digitization_paths_have_no_duplicate_segment(client):
    paths = _paths(client)
    assert "/api/v1/digitize" in paths
    assert "/api/v1/artworks" in paths
    assert not any("/artworks/artworks" in path for path in paths)


def test_broken_reindex_routes_removed(client):
    paths = _paths(client)
    assert "/api/v1/pdfs/reindex" not in paths   # читал таблицу, в которую ничего не пишется
    assert "/api/v1/reindex" not in paths        # дубль с несуществующими колонками
    assert "/api/v1/artworks/reindex" in paths


def test_settings_require_strong_token(monkeypatch):
    from pydantic import ValidationError
    from src.models.config import Settings

    monkeypatch.setenv("INTERNAL_API_TOKEN", "short")
    with pytest.raises(ValidationError):
        Settings()


# ---------- эмбеддинги без запасных векторов ----------

@pytest.mark.asyncio
async def test_embeddings_error_is_not_masked_by_fake_vectors():
    from src.models.exceptions import ExternalAPIError
    from src.models.services.ai_service import ai_service

    with patch.object(ai_service, "client") as mock_client:
        mock_client.embeddings.create = AsyncMock(side_effect=RuntimeError("model not found"))
        with pytest.raises(ExternalAPIError):
            await ai_service.generate_embeddings(["текст"])


@pytest.mark.asyncio
async def test_embeddings_dimension_mismatch_raises():
    from src.models.config import settings
    from src.models.exceptions import ExternalAPIError
    from src.models.services.ai_service import ai_service

    item = MagicMock()
    item.embedding = [0.1] * (settings.vector_dimension - 1)
    response = MagicMock()
    response.data = [item]
    with patch.object(ai_service, "client") as mock_client:
        mock_client.embeddings.create = AsyncMock(return_value=response)
        with pytest.raises(ExternalAPIError):
            await ai_service.generate_embeddings(["текст"])


@pytest.mark.asyncio
async def test_embeddings_success_returns_vectors():
    from src.models.config import settings
    from src.models.services.ai_service import ai_service

    item = MagicMock()
    item.embedding = [0.1] * settings.vector_dimension
    response = MagicMock()
    response.data = [item]
    with patch.object(ai_service, "client") as mock_client:
        mock_client.embeddings.create = AsyncMock(return_value=response)
        vectors = await ai_service.generate_embeddings(["текст"])
    assert len(vectors) == 1 and len(vectors[0]) == settings.vector_dimension


def test_no_hash_embedding_helper_left():
    from src.models.services.ai_service import AIService

    assert not hasattr(AIService, "_generate_fallback_embeddings")


# ---------- идентификаторы точек Qdrant ----------

def test_normalize_point_id():
    from src.models.services.qdrant_client import normalize_point_id

    assert normalize_point_id(12) == 12
    existing = str(uuid.uuid4())
    assert normalize_point_id(existing) == existing
    key = normalize_point_id("doc1_chunk_0")
    assert key == normalize_point_id("doc1_chunk_0")          # детерминированно
    assert key != normalize_point_id("doc1_chunk_1")
    assert str(uuid.UUID(key)) == key                         # валидный UUID
    with pytest.raises(ValueError):
        normalize_point_id(-1)


def test_upsert_points_converts_dicts_and_keeps_original_key():
    from qdrant_client.http.models import PointStruct
    from src.models.services.qdrant_client import qdrant_service

    with patch.object(qdrant_service, "client", MagicMock()) as mock_client:
        qdrant_service.upsert_points("pdf_chunks", [
            {"id": "doc1_chunk_0", "vector": [0.1, 0.2], "payload": {"content": "x"}},
            {"id": 7, "vector": [0.3, 0.4], "payload": {}},
        ])
    sent = mock_client.upsert.call_args.kwargs["points"]
    assert all(isinstance(point, PointStruct) for point in sent)
    assert sent[0].payload["point_key"] == "doc1_chunk_0"
    assert str(uuid.UUID(sent[0].id)) == sent[0].id
    assert sent[1].id == 7


# ---------- NFT-метаданные без утверждений о подлинности ----------

def test_nft_metadata_makes_no_authenticity_claims():
    from src.models.services.nft_service import generate_nft_metadata

    metadata = generate_nft_metadata(
        title="Тест", artist="Автор",
        front_analysis={"style": "реализм", "confidence": 0.9},
        back_analysis={"provenance": "Коллекция X"},
        image_url="https://example.org/a.jpg", verification_hash="abc",
    )
    text = json.dumps(metadata, ensure_ascii=False)
    for forbidden in ('"Verified"', "Digitally Verified", "authenticated by", "authenticity_score", '"provenance_verified"'):
        assert forbidden not in text
    assert metadata["verification"]["expert_verified"] is False
    assert metadata["verification"]["provenance_documented"] is True
    assert metadata["properties"]["tae"]["provenance"]["verified"] is False


# ---------- RAG ----------

def test_rag_confidence_fits_numeric_column(client):
    from src.models.routes import rag

    executed = {}

    async def fake_execute(query, *args):
        executed["args"] = args

    search = [{"id": 1, "score": 0.93, "payload": {"content": "фрагмент", "document_id": "d1", "chunk_index": 0}}]
    with patch.object(rag.ai_service, "generate_embeddings", AsyncMock(return_value=[[0.1]])), \
         patch.object(rag.ai_service, "generate_text", AsyncMock(return_value={"response": "ответ"})), \
         patch.object(rag.qdrant_service, "collection_exists", return_value=True), \
         patch.object(rag.qdrant_service, "search_points", return_value=search), \
         patch.object(rag.db_service, "execute", side_effect=fake_execute):
        response = client.post("/api/v1/rag/query", json={"query": "что такое импрессионизм"}, headers=AUTH)

    assert response.status_code == 200
    assert response.json()["confidence"] == 0.93
    relevance = executed["args"][4]
    assert 0 <= relevance < 10  # DECIMAL(3,2)


def test_rag_analytics_failure_does_not_break_answer(client):
    from src.models.routes import rag

    search = [{"id": 1, "score": 0.8, "payload": {"content": "фрагмент", "document_id": "d1", "chunk_index": 0}}]
    with patch.object(rag.ai_service, "generate_embeddings", AsyncMock(return_value=[[0.1]])), \
         patch.object(rag.ai_service, "generate_text", AsyncMock(return_value={"response": "ответ"})), \
         patch.object(rag.qdrant_service, "collection_exists", return_value=True), \
         patch.object(rag.qdrant_service, "search_points", return_value=search), \
         patch.object(rag.db_service, "execute", AsyncMock(side_effect=RuntimeError("db down"))):
        response = client.post("/api/v1/rag/query", json={"query": "что такое импрессионизм"}, headers=AUTH)
    assert response.status_code == 200
    assert response.json()["answer"] == "ответ"


def test_rag_search_rejects_unknown_collection(client):
    response = client.post("/api/v1/rag/collections/secret_collection/search?query=x", headers=AUTH)
    assert response.status_code == 404


# ---------- анализ изображений ----------

def test_image_status_unknown_task_is_404(client):
    from src.models.routes import images

    with patch.object(images.redis_service, "get", AsyncMock(return_value=None)):
        response = client.get("/api/v1/images/analysis/img_unknown", headers=AUTH)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_image_analysis_upserts_into_existing_table_and_survives_db_error():
    from src.models.routes import images

    stored = {}

    async def fake_get(key):
        return json.dumps(stored.get(key, {}))

    async def fake_set(key, value, expire=None):
        stored[key] = json.loads(value)

    request = images.ImageAnalysisRequest(image_url="https://example.org/a.jpg", artwork_id=5)
    analysis = {"analysis": "текст", "model": "m", "usage": {}}
    with patch.object(images.ai_service, "analyze_image", AsyncMock(return_value=analysis)), \
         patch.object(images.redis_service, "get", side_effect=fake_get), \
         patch.object(images.redis_service, "set", side_effect=fake_set), \
         patch.object(images.db_service, "execute", AsyncMock(side_effect=RuntimeError("db down"))) as execute:
        await images.process_image_analysis(request, "img_1")

    sql = execute.call_args.args[0]
    assert "artwork_analysis" in sql and "ON CONFLICT (artwork_id, analysis_version)" in sql
    assert "image_analyses" not in sql
    assert stored["task:img_1"]["status"] == "completed"
    assert stored["task:img_1"]["persisted"] is False


# ---------- оцифровка ----------

def test_approve_unknown_artwork_is_404(client):
    from src.models.routes import digitization

    with patch.object(digitization.db_service, "fetchrow", AsyncMock(return_value=None)):
        response = client.patch("/api/v1/artworks/99/approve", headers=AUTH, json={})
    assert response.status_code == 404


def test_approve_reports_failed_indexing_but_keeps_approval(client):
    from src.models.routes import digitization

    row = {"id": 3, "title": "Т", "artist": "А", "style": None, "period": None, "technique": None,
           "genre": None, "ai_analysis": "{}", "provenance": None}
    fetchrow = AsyncMock(side_effect=[{"id": 3}, row])
    with patch.object(digitization.db_service, "fetchrow", fetchrow), \
         patch.object(digitization.ai_service, "generate_embeddings", AsyncMock(return_value=[[0.1]])), \
         patch.object(digitization.qdrant_service, "ensure_collection", side_effect=RuntimeError("qdrant down")):
        response = client.patch("/api/v1/artworks/3/approve", headers=AUTH, json={"curator_id": 12})
    body = response.json()
    assert response.status_code == 200
    assert body["status"] == "approved" and body["indexed"] is False
    assert fetchrow.call_args_list[0].args[-1] == 12  # curator_id записан


def test_approve_indexes_with_integer_point_id(client):
    from src.models.routes import digitization

    row = {"id": 3, "title": "Т", "artist": "А", "style": None, "period": None, "technique": None,
           "genre": None, "ai_analysis": "{}", "provenance": None}
    with patch.object(digitization.db_service, "fetchrow", AsyncMock(side_effect=[{"id": 3}, row])), \
         patch.object(digitization.ai_service, "generate_embeddings", AsyncMock(return_value=[[0.1]])), \
         patch.object(digitization.qdrant_service, "ensure_collection") as ensure, \
         patch.object(digitization.qdrant_service, "upsert_points") as upsert:
        response = client.patch("/api/v1/artworks/3/approve", headers=AUTH, json={})
    assert response.json()["indexed"] is True
    ensure.assert_called_once_with("artworks")
    assert upsert.call_args.kwargs["points"][0]["id"] == 3
