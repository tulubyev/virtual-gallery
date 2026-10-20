"""Выбор модели по задачам из админ-панели: реестр, каталог, проверка выбора и ручки (БД подменена; хранилище — на настоящем PG)."""

import datetime
import os
from pathlib import Path
from unittest.mock import AsyncMock, MagicMock, patch

import asyncpg
import pytest
import pytest_asyncio
from fastapi.testclient import TestClient

from src.models.services import model_catalog, model_registry
from src.models.services.database import db_service
from src.models.services.model_settings import model_settings

AUTH = {"X-Internal-Token": "test-internal-token-0123456789"}
DSN = os.environ.get("TEST_DATABASE_URL")
MIGRATION = Path(__file__).resolve().parent.parent / "migrations" / "005_create_ai_model_settings.sql"


def live_item(model_id, prompt, completion, image=True, structured=True, context=262144, text_out=True):
    return {
        "id": model_id, "context_length": context,
        "architecture": {"input_modalities": ["text", "image"] if image else ["text"], "output_modalities": ["text"] if text_out else ["image"]},
        "pricing": {"prompt": prompt / 1e6, "completion": completion / 1e6},
        "supported_parameters": ["response_format"] + (["structured_outputs"] if structured else []),
    }


LIVE_PAYLOAD = {"data": [
    live_item("google/gemini-3.8-flash", 81.53, 407.64, context=1048576),
    live_item("anthropic/claude-haiku-5.5", 10.87, 54.35),
    live_item("openai/gpt-6-luna", 10.87, 54.35),
    live_item("sber/gigachat-3-pro", 87.64, 211.67, image=False),
    live_item("sber/gigachat-3.5-ultra", 115.47, 346.33, image=False),
    live_item("google/gemma-4-26b-a4b-it", 4.57, 23.91),
    live_item("qwen/qwen3.6-35b-a3b", 5.44, 76.09),
    live_item("acme/new-model-1", 3.0, 9.0),
    live_item("acme/text-only", 3.0, 9.0, image=False),
    live_item("acme/no-schema", 3.0, 9.0, structured=False),
    live_item("acme/image-maker", 3.0, 9.0, text_out=False),
]}


@pytest.fixture(autouse=True)
def clean_state(monkeypatch):
    model_settings.reset_memory()
    model_catalog.reset_live_cache()

    async def fake_fetch():
        return LIVE_PAYLOAD

    monkeypatch.setattr(model_catalog, "_fetch_models_json", fake_fetch)
    yield
    model_settings.reset_memory()
    model_catalog.reset_live_cache()


# ---------- реестр ----------

def test_registry_uses_env_default_without_override():
    choice = model_registry.resolve("vision_front", "global")
    assert choice.model == model_registry.default_model("vision_front", "global")


def test_registry_prefers_admin_choice_per_mode():
    model_settings._overrides[("vision_front", "global")] = {"model": "google/gemini-3.8-flash", "updated_by": "a", "updated_at": None}
    assert model_registry.resolve("vision_front", "global").model == "google/gemini-3.8-flash"
    # режим «только РФ» живёт отдельно: выбор для global его не меняет
    assert model_registry.resolve("vision_front", "ru-only").model == model_registry.default_model("vision_front", "ru-only")
    assert model_registry.resolve("chat", "global").model == model_registry.default_model("chat", "global")


# ---------- каталог ----------

@pytest.mark.asyncio
async def test_live_catalog_parsing_and_cache():
    live = await model_catalog.live_catalog()
    gem = live["google/gemini-3.8-flash"]
    assert gem["price"] == (81.53, 407.64) and gem["vision"] and gem["schema"] and gem["context"] == 1048576
    assert live["sber/gigachat-3-pro"]["vision"] is False
    assert model_catalog.catalog_meta()["price_source"] == "live"


@pytest.mark.asyncio
async def test_catalog_falls_back_to_snapshot_when_unavailable(monkeypatch):
    async def broken():
        raise OSError("no network")

    monkeypatch.setattr(model_catalog, "_fetch_models_json", broken)
    assert await model_catalog.live_catalog() is None
    rows = model_catalog.catalog_view(None, "global")
    gem = next(r for r in rows if r["id"] == "google/gemini-3.8-flash")
    assert gem["price_source"] == "snapshot" and gem["price_in"] == 81.53
    assert model_catalog.catalog_meta()["price_source"] == "snapshot"


def test_unit_cost_matches_token_profile():
    # Gemini 3.8 Flash, описание лица: 9000 вх. + 1500 вых. токенов ≈ 1,35 ₽
    assert model_catalog.unit_cost("vision_front", (81.53, 407.64)) == pytest.approx(1.345, abs=0.005)
    assert model_catalog.unit_cost("vision_front", None) is None


@pytest.mark.asyncio
async def test_ru_only_catalog_lists_only_ru_hosted_with_ru_prices():
    rows = model_catalog.catalog_view(await model_catalog.live_catalog(), "ru-only")
    assert rows and all(r["ru_hosted"] for r in rows)
    qwen = next(r for r in rows if r["id"] == "qwen/qwen3.6-35b-a3b")
    assert (qwen["price_in"], qwen["price_out"], qwen["price_source"]) == (260.0, 390.0, "ru")
    unknown = next(r for r in rows if r["id"] == "openai/gpt-oss-120b")
    assert unknown["price_in"] is None and unknown["cost"]["bulk"] is None


@pytest.mark.asyncio
async def test_global_catalog_uses_live_price_over_snapshot(monkeypatch):
    payload = {"data": [live_item("google/gemini-3.8-flash", 100.0, 500.0)]}

    async def fetch():
        return payload

    monkeypatch.setattr(model_catalog, "_fetch_models_json", fetch)
    rows = model_catalog.catalog_view(await model_catalog.live_catalog(), "global")
    gem = next(r for r in rows if r["id"] == "google/gemini-3.8-flash")
    assert (gem["price_in"], gem["price_source"]) == (100.0, "live")
    other = next(r for r in rows if r["id"] == "anthropic/claude-haiku-5.5")   # нет в живом каталоге → снимок
    assert other["price_source"] == "snapshot"


def test_recommendations_reference_known_models_and_tasks():
    assert set(model_catalog.RECOMMENDED) == set(model_catalog.TASK_INFO) == set(model_registry.TASKS)
    for rec in model_catalog.RECOMMENDED.values():
        for ids in rec.values():
            for model_id in ids:
                assert model_id in model_catalog.CURATED_BY_ID


# ---------- проверка выбора ----------

@pytest.mark.asyncio
@pytest.mark.parametrize("model", ["~google/gemini-flash-latest", "google/gemini-flash-latest"])
async def test_latest_aliases_rejected(model):
    verdict = await model_catalog.validate_choice("chat", "global", model)
    assert not verdict.ok and "latest" in verdict.error


@pytest.mark.asyncio
@pytest.mark.parametrize("model", ["", "a b", "x", "bad;rm -rf", "модель", "a" * 200])
async def test_malformed_ids_rejected(model):
    assert not (await model_catalog.validate_choice("chat", "global", model)).ok


@pytest.mark.asyncio
async def test_unknown_task_or_mode_rejected():
    assert not (await model_catalog.validate_choice("nope", "global", "google/gemini-3.8-flash")).ok
    assert not (await model_catalog.validate_choice("chat", "weird", "google/gemini-3.8-flash")).ok


@pytest.mark.asyncio
async def test_model_missing_from_live_catalog_rejected():
    verdict = await model_catalog.validate_choice("chat", "global", "acme/does-not-exist")
    assert not verdict.ok and "каталоге" in verdict.error


@pytest.mark.asyncio
async def test_vision_task_requires_image_input():
    for task in ("vision_front", "vision_back"):
        verdict = await model_catalog.validate_choice(task, "global", "sber/gigachat-3-pro")
        assert not verdict.ok and "изображен" in verdict.error
        assert not (await model_catalog.validate_choice(task, "global", "acme/text-only")).ok
    assert (await model_catalog.validate_choice("chat", "global", "sber/gigachat-3-pro")).ok


@pytest.mark.asyncio
async def test_model_that_outputs_no_text_rejected():
    assert not (await model_catalog.validate_choice("chat", "global", "acme/image-maker")).ok


@pytest.mark.asyncio
async def test_ru_only_requires_ru_hosted_model():
    verdict = await model_catalog.validate_choice("chat", "ru-only", "google/gemini-3.8-flash")
    assert not verdict.ok and "РФ" in verdict.error
    assert (await model_catalog.validate_choice("vision_front", "ru-only", "qwen/qwen3.6-35b-a3b")).ok
    # неизвестная модель в режиме «только РФ» не допускается, даже если она есть в каталоге
    assert not (await model_catalog.validate_choice("chat", "ru-only", "acme/new-model-1")).ok


@pytest.mark.asyncio
async def test_warnings_for_cautions_custom_and_no_schema():
    luna = await model_catalog.validate_choice("vision_front", "global", "openai/gpt-6-luna")
    assert luna.ok and any("воздержание" in w for w in luna.warnings)
    haiku = await model_catalog.validate_choice("vision_front", "global", "anthropic/claude-haiku-5.5")
    assert haiku.ok and any("LLM_PROVIDER_ONLY" in w for w in haiku.warnings)
    custom = await model_catalog.validate_choice("bulk", "global", "acme/new-model-1")
    assert custom.ok and any("нет в нашем списке" in w for w in custom.warnings)
    schemaless = await model_catalog.validate_choice("bulk", "global", "acme/no-schema")
    assert schemaless.ok and any("JSON-схем" in w for w in schemaless.warnings)
    clean = await model_catalog.validate_choice("chat", "global", "google/gemma-4-26b-a4b-it")
    assert clean.ok and clean.warnings == []


@pytest.mark.asyncio
async def test_catalog_unavailable_allows_only_curated(monkeypatch):
    async def broken():
        raise OSError("down")

    monkeypatch.setattr(model_catalog, "_fetch_models_json", broken)
    assert (await model_catalog.validate_choice("chat", "global", "google/gemini-3.8-flash")).ok
    assert not (await model_catalog.validate_choice("chat", "global", "acme/new-model-1")).ok


# ---------- ручки ----------

@pytest.fixture()
def client():
    from src.models import main

    with patch.object(main, "init_db", AsyncMock()), patch.object(main, "init_qdrant", MagicMock()), \
         patch.object(main, "init_redis", AsyncMock()), patch.object(main, "close_db", AsyncMock()), \
         patch.object(main, "close_redis", AsyncMock()), \
         patch.object(main.worker, "start", AsyncMock()), patch.object(main.worker, "stop", AsyncMock()):
        with TestClient(main.app) as test_client:
            yield test_client


@pytest.fixture()
def fake_store():
    """Хранилище в памяти вместо PostgreSQL: set/clear пишут в _overrides, как после load()."""
    log = []

    async def fake_set(task, mode, model, actor):
        model_settings._overrides[(task, mode)] = {"model": model, "updated_by": actor, "updated_at": datetime.datetime(2026, 10, 19, 12, 0)}
        log.append(("set", task, mode, model, actor))

    async def fake_clear(task, mode, actor):
        existed = model_settings._overrides.pop((task, mode), None) is not None
        log.append(("clear", task, mode, None, actor))
        return existed

    with patch.object(model_settings, "set", fake_set), patch.object(model_settings, "clear", fake_clear), \
         patch.object(model_settings, "load", AsyncMock(return_value=True)):
        yield log


def test_routes_require_internal_token(client):
    assert client.get("/api/v1/model-settings").status_code == 401
    assert client.put("/api/v1/model-settings/chat", json={"model": "google/gemini-3.8-flash"}).status_code == 401
    assert client.delete("/api/v1/model-settings/chat").status_code == 401
    assert client.get("/api/v1/model-settings/history").status_code == 401
    assert client.post("/api/v1/model-settings/refresh-catalog").status_code == 401


def test_get_lists_tasks_catalog_and_costs(client, fake_store):
    response = client.get("/api/v1/model-settings", headers=AUTH)
    assert response.status_code == 200
    body = response.json()
    assert [t["task"] for t in body["tasks"]] == list(model_registry.TASKS)
    first = body["tasks"][0]
    assert first["source"] == "env" and first["current_model"] == first["default_model"] and first["needs_vision"] is True
    ids = {m["id"] for m in body["catalog"]}
    assert "google/gemini-3.8-flash" in ids
    gem = next(m for m in body["catalog"] if m["id"] == "google/gemini-3.8-flash")
    assert gem["cost"]["vision_front"] == pytest.approx(1.345, abs=0.005) and gem["labels"]["vision_front"] == ["best"]
    assert body["catalog_meta"]["price_source"] == "live"
    assert "api_key" not in response.text.lower()


def test_put_saves_choice_and_returns_warnings(client, fake_store):
    response = client.put("/api/v1/model-settings/vision_front", headers={**AUTH, "X-Actor": "admin@example.org"},
                          json={"model": "openai/gpt-6-luna"})
    assert response.status_code == 200
    body = response.json()
    assert any("воздержание" in w for w in body["warnings"])
    row = next(t for t in body["tasks"] if t["task"] == "vision_front")
    assert row["current_model"] == "openai/gpt-6-luna" and row["source"] == "admin" and row["updated_by"] == "admin@example.org"
    assert fake_store == [("set", "vision_front", "global", "openai/gpt-6-luna", "admin@example.org")]
    assert model_registry.resolve("vision_front", "global").model == "openai/gpt-6-luna"   # действует сразу


def test_put_rejects_invalid_choices_without_saving(client, fake_store):
    for task, body, status in [
        ("vision_front", {"model": "sber/gigachat-3-pro"}, 422),             # без картинок
        ("chat", {"model": "~google/gemini-flash-latest"}, 422),             # алиас
        ("chat", {"model": "google/gemini-3.8-flash", "mode": "ru-only"}, 422),   # не из РФ
        ("chat", {"model": "google/gemini-3.8-flash", "mode": "bogus"}, 422),
        ("nope", {"model": "google/gemini-3.8-flash"}, 404),
        ("chat", {"model": "x"}, 422),
    ]:
        assert client.put(f"/api/v1/model-settings/{task}", headers=AUTH, json=body).status_code == status, (task, body)
    assert fake_store == []


def test_put_error_does_not_leak_details(client, fake_store):
    async def boom(*_):
        raise RuntimeError("connection to secret-host failed")

    with patch.object(model_settings, "set", boom):
        response = client.put("/api/v1/model-settings/chat", headers=AUTH, json={"model": "google/gemini-3.8-flash"})
    assert response.status_code == 500 and "secret-host" not in response.text


def test_delete_resets_to_env_default(client, fake_store):
    client.put("/api/v1/model-settings/chat", headers=AUTH, json={"model": "google/gemini-3.8-flash"})
    response = client.delete("/api/v1/model-settings/chat?mode=global", headers={**AUTH, "X-Actor": "root"})
    assert response.status_code == 200
    row = next(t for t in response.json()["tasks"] if t["task"] == "chat")
    assert row["source"] == "env" and row["current_model"] == row["default_model"]
    assert fake_store[-1] == ("clear", "chat", "global", None, "root")


def test_actor_header_is_sanitized(client, fake_store):
    client.put("/api/v1/model-settings/chat", headers={**AUTH, "X-Actor": "x" * 500}, json={"model": "google/gemini-3.8-flash"})
    assert len(fake_store[-1][4]) == 100


def test_ru_only_view_has_separate_choices(client, fake_store):
    client.put("/api/v1/model-settings/chat", headers=AUTH, json={"model": "sber/gigachat-3.5-ultra", "mode": "ru-only"})
    ru = client.get("/api/v1/model-settings?mode=ru-only", headers=AUTH).json()
    glob = client.get("/api/v1/model-settings?mode=global", headers=AUTH).json()
    assert next(t for t in ru["tasks"] if t["task"] == "chat")["current_model"] == "sber/gigachat-3.5-ultra"
    assert next(t for t in glob["tasks"] if t["task"] == "chat")["source"] == "env"
    assert all(m["ru_hosted"] for m in ru["catalog"])


def test_history_route_formats_dates(client):
    rows = [{"task": "chat", "mode": "global", "old_model": None, "new_model": "google/gemini-3.8-flash", "actor": "a",
             "changed_at": datetime.datetime(2026, 10, 19, 12, 0)}]
    with patch.object(model_settings, "history", AsyncMock(return_value=rows)):
        body = client.get("/api/v1/model-settings/history", headers=AUTH).json()
    assert body["items"][0]["changed_at"].startswith("2026-10-19T12:00") and body["items"][0]["new_model"] == "google/gemini-3.8-flash"


def test_refresh_catalog_forces_refetch(client, fake_store, monkeypatch):
    calls = []

    async def fetch():
        calls.append(1)
        return LIVE_PAYLOAD

    monkeypatch.setattr(model_catalog, "_fetch_models_json", fetch)
    client.get("/api/v1/model-settings", headers=AUTH)
    client.get("/api/v1/model-settings", headers=AUTH)
    assert len(calls) == 1                        # кэш
    assert client.post("/api/v1/model-settings/refresh-catalog", headers=AUTH).status_code == 200
    assert len(calls) == 2


# ---------- хранилище на настоящем PostgreSQL ----------

pg_only = pytest.mark.skipif(not DSN, reason="TEST_DATABASE_URL не задан")


@pytest_asyncio.fixture
async def pg():
    pool = await asyncpg.create_pool(DSN, min_size=1, max_size=5)
    async with pool.acquire() as connection:
        await connection.execute("DROP TABLE IF EXISTS ai_model_settings, ai_model_settings_log")
        await connection.execute(MIGRATION.read_text(encoding="utf-8"))
    previous = db_service.pool
    db_service.pool = pool
    yield pool
    db_service.pool = previous
    await pool.close()


@pg_only
@pytest.mark.asyncio
async def test_store_roundtrip_log_and_reset(pg):
    async with pg.acquire() as connection:
        await connection.execute(MIGRATION.read_text(encoding="utf-8"))   # повторный запуск безопасен
    await model_settings.set("chat", "global", "google/gemini-3.8-flash", "alice")
    assert model_settings.get("chat", "global") == "google/gemini-3.8-flash"
    await model_settings.set("chat", "global", "anthropic/claude-haiku-5.5", "bob")
    assert model_settings.entry("chat", "global")["updated_by"] == "bob"
    assert await model_settings.clear("chat", "global", "carol") is True
    assert model_settings.get("chat", "global") is None
    assert await model_settings.clear("chat", "global", "carol") is False   # уже сброшено — в журнал не пишем

    log = await model_settings.history(10)
    assert [(r["old_model"], r["new_model"], r["actor"]) for r in reversed(log)] == [
        (None, "google/gemini-3.8-flash", "alice"),
        ("google/gemini-3.8-flash", "anthropic/claude-haiku-5.5", "bob"),
        ("anthropic/claude-haiku-5.5", None, "carol"),
    ]


@pg_only
@pytest.mark.asyncio
async def test_other_instance_change_is_picked_up_and_db_failure_keeps_state(pg):
    async with pg.acquire() as connection:
        await connection.execute("INSERT INTO ai_model_settings (task, mode, model, updated_by) VALUES ('judge', 'global', 'z-ai/glm-5.3-flash', 'other')")
    assert await model_settings.load() is True
    assert model_registry.resolve("judge", "global").model == "z-ai/glm-5.3-flash"

    previous = db_service.pool
    db_service.pool = None            # БД недоступна: последнее известное состояние сохраняется
    try:
        assert await model_settings.load() is False
    finally:
        db_service.pool = previous
    assert model_registry.resolve("judge", "global").model == "z-ai/glm-5.3-flash"


@pg_only
@pytest.mark.asyncio
async def test_mode_constraint_enforced(pg):
    with pytest.raises(asyncpg.CheckViolationError):
        await db_service.execute("INSERT INTO ai_model_settings (task, mode, model) VALUES ('chat', 'weird', 'x/y-z')")
