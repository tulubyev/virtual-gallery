"""Применение миграций на настоящем PostgreSQL (пропускается без TEST_DATABASE_URL) и запись в таблицы, которые создают миграции."""

import asyncio
import os
import shutil
from unittest.mock import AsyncMock, patch

import asyncpg
import pytest
import pytest_asyncio

from src.models import migrate
from src.models.services.database import db_service

DSN = os.environ.get("TEST_DATABASE_URL")
pytestmark = pytest.mark.skipif(not DSN, reason="TEST_DATABASE_URL не задан")

TABLES = ["schema_migrations", "digitized_artworks", "pdf_documents", "external_artworks", "ai_jobs",
          "ai_model_settings", "ai_model_settings_log", "rag_queries", "artwork_analysis"]


async def wipe(connection):
    await connection.execute("DROP TABLE IF EXISTS " + ", ".join(TABLES) + " CASCADE")
    await connection.execute("DROP FUNCTION IF EXISTS update_digitized_artworks_updated_at() CASCADE")


@pytest_asyncio.fixture
async def clean():
    connection = await asyncpg.connect(DSN)
    await wipe(connection)
    yield connection
    await wipe(connection)
    await connection.close()


async def tables(connection):
    rows = await connection.fetch("SELECT tablename FROM pg_tables WHERE schemaname = 'public'")
    return {r["tablename"] for r in rows}


@pytest.mark.asyncio
async def test_clean_database_gets_every_table_the_code_writes_to(clean):
    applied = await migrate.apply_migrations(DSN)
    assert applied == [p.name for p in migrate.migration_files(migrate.DEFAULT_DIR)]
    assert {"digitized_artworks", "pdf_documents", "external_artworks", "ai_jobs", "ai_model_settings",
            "ai_model_settings_log", "rag_queries", "artwork_analysis", "schema_migrations"} <= await tables(clean)
    # категории PDF (002) на месте: именно их пишет routes/pdfs.py
    columns = {r["column_name"] for r in await clean.fetch(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'pdf_documents'")}
    assert {"document_id", "category", "styles", "artists", "techniques", "regions", "periods", "summary", "keywords"} <= columns


@pytest.mark.asyncio
async def test_second_run_applies_nothing_and_keeps_data(clean):
    await migrate.apply_migrations(DSN)
    await clean.execute("INSERT INTO ai_model_settings (task, mode, model) VALUES ('chat', 'global', 'a/b-c')")
    assert await migrate.apply_migrations(DSN) == []
    assert await clean.fetchval("SELECT count(*) FROM ai_model_settings") == 1


@pytest.mark.asyncio
async def test_database_prepared_by_hand_is_adopted(clean):
    # часть таблиц уже создана вручную (как на старой БД): повторное применение не падает
    await clean.execute((migrate.DEFAULT_DIR / "004_create_ai_jobs.sql").read_text(encoding="utf-8"))
    await clean.execute((migrate.DEFAULT_DIR / "001_create_digitized_artworks.sql").read_text(encoding="utf-8"))
    assert "004_create_ai_jobs.sql" in await migrate.apply_migrations(DSN)


@pytest.mark.asyncio
async def test_concurrent_instances_apply_each_file_once(clean):
    results = await asyncio.gather(*[migrate.apply_migrations(DSN) for _ in range(4)])
    names = [p.name for p in migrate.migration_files(migrate.DEFAULT_DIR)]
    assert sorted(sum(results, [])) == sorted(names)            # каждый файл применил ровно один экземпляр
    assert await clean.fetchval("SELECT count(*) FROM schema_migrations") == len(names)


@pytest.mark.asyncio
async def test_failed_migration_is_rolled_back_and_not_recorded(clean, tmp_path):
    shutil.copy(migrate.DEFAULT_DIR / "004_create_ai_jobs.sql", tmp_path / "001_ok.sql")
    (tmp_path / "002_bad.sql").write_text("CREATE TABLE half_done (id int); SELECT nonexistent_function();", encoding="utf-8")
    with pytest.raises(asyncpg.PostgresError):
        await migrate.apply_migrations(DSN, tmp_path)
    assert "half_done" not in await tables(clean)
    recorded = {r["filename"] for r in await clean.fetch("SELECT filename FROM schema_migrations")}
    assert recorded == {"001_ok.sql"}                            # успешная осталась, сбойная — нет


@pytest.mark.asyncio
async def test_changed_applied_migration_is_not_reapplied(clean, tmp_path, caplog):
    (tmp_path / "001_t.sql").write_text("CREATE TABLE IF NOT EXISTS rag_queries (query_id serial primary key, query_text text);", encoding="utf-8")
    await migrate.apply_migrations(DSN, tmp_path)
    (tmp_path / "001_t.sql").write_text("DROP TABLE rag_queries;", encoding="utf-8")
    with caplog.at_level("WARNING", logger="migrate"):
        assert await migrate.apply_migrations(DSN, tmp_path) == []
    assert "rag_queries" in await tables(clean) and "изменилась" in caplog.text


@pytest.mark.asyncio
async def test_wait_option_reports_unreachable_database_after_deadline():
    with pytest.raises((OSError, asyncpg.PostgresError)):
        await migrate.apply_migrations("postgresql://x:y@127.0.0.1:1/none", wait_seconds=0)


def test_cli_requires_database_url_and_hides_password(monkeypatch, capsys, caplog):
    monkeypatch.delenv("DATABASE_URL", raising=False)
    assert migrate.main([]) == 2
    bad = "postgresql://user:SuperSecret123@127.0.0.1:1/none"
    monkeypatch.setenv("DATABASE_URL", bad)
    with caplog.at_level("ERROR"):
        assert migrate.main([]) == 1
    assert "SuperSecret123" not in caplog.text


# ---------- код ядра пишет в созданные таблицы (настоящий SQL обработчиков) ----------

@pytest_asyncio.fixture
async def migrated(clean):
    await migrate.apply_migrations(DSN)
    pool = await asyncpg.create_pool(DSN, min_size=1, max_size=3)
    previous = db_service.pool
    db_service.pool = pool
    yield clean
    db_service.pool = previous
    await pool.close()


class Ctx:
    task_id = "t"

    async def progress(self, percent, step):
        pass


@pytest.mark.asyncio
async def test_image_analysis_handler_upserts_into_artwork_analysis(migrated):
    from src.models.routes import images

    async def analyze(_url):
        return {"model": "m/one", "analysis": "первая заметка"}

    with patch.object(images.ai_service, "analyze_image", analyze):
        first = await images.run_image_analysis({"image_url": "https://example.org/a.jpg", "artwork_id": 7}, Ctx())
        second = await images.run_image_analysis({"image_url": "https://example.org/a.jpg", "artwork_id": 7}, Ctx())
    assert first["persisted"] and second["persisted"]
    rows = await migrated.fetch("SELECT model_used, technical_notes FROM artwork_analysis WHERE artwork_id = 7")
    assert len(rows) == 1 and rows[0]["technical_notes"] == "первая заметка"       # повтор обновляет, а не дублирует


@pytest.mark.asyncio
async def test_pdf_handler_upserts_into_pdf_documents(migrated):
    from src.models.routes import pdfs

    processed = {"chunks": [{"content": "Текст", "char_count": 5}], "processing_stats": {"total_pages": 1, "ocr_performed": False}}
    payload = {"pdf_url": "https://example.org/a.pdf", "document_id": "doc-1", "auto_categorize": True}
    with patch.object(pdfs.pdf_service, "process_pdf", AsyncMock(return_value=processed)), \
         patch.object(pdfs.ai_service, "generate_embeddings", AsyncMock(return_value=[[0.1, 0.2]])), \
         patch.object(pdfs, "categorize_pdf_content", AsyncMock(return_value={
             "category": "art_history", "styles": ["барокко"], "artists": [], "techniques": [], "regions": [],
             "periods": [], "keywords": ["ключ"], "summary": "кратко"})), \
         patch.object(pdfs.qdrant_service, "ensure_collection"), patch.object(pdfs.qdrant_service, "upsert_points"):
        await pdfs.run_pdf_processing(payload, Ctx())
        await pdfs.run_pdf_processing(payload, Ctx())                              # повтор — обновление
    rows = await migrated.fetch("SELECT category, summary, styles, keywords, processing_status FROM pdf_documents")
    assert len(rows) == 1 and rows[0]["category"] == "art_history" and rows[0]["processing_status"] == "completed"
    assert "барокко" in rows[0]["styles"] and "ключ" in rows[0]["keywords"]


@pytest.mark.asyncio
async def test_rag_query_log_insert_works(migrated):
    # тот же INSERT, что в routes/rag.py: если колонки разойдутся с кодом, этот тест упадёт
    import inspect
    from src.models.routes import rag

    source = inspect.getsource(rag)
    assert "INSERT INTO rag_queries (query_text, response_text, response_sources, processing_time, relevance_score)" in source
    await db_service.execute(
        "INSERT INTO rag_queries (query_text, response_text, response_sources, processing_time, relevance_score) VALUES ($1, $2, $3, $4, $5)",
        "вопрос", "ответ", "[]", 1234.56, 0.87)                                      # >999 с: прежний DECIMAL(5,2) переполнялся
    assert await migrated.fetchval("SELECT count(*) FROM rag_queries") == 1
