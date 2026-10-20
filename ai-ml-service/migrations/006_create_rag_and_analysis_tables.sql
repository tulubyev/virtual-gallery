-- Migration: таблицы, в которые пишет ядро, но которых не было ни в одной миграции
-- (раньше их создавал ai_ml_schema.sql: со ссылками на artworks/users основного приложения, векторами vector(1536)
-- и секретом по умолчанию). Здесь — отдельная БД ядра: без внешних ключей на таблицы приложения, без pgvector
-- (векторы лежат в Qdrant), без секретов. pdf_documents создаёт 002.

-- Журнал запросов RAG (routes/rag.py): аналитика, не влияет на ответ пользователю
CREATE TABLE IF NOT EXISTS rag_queries (
    query_id         SERIAL PRIMARY KEY,
    user_id          INTEGER,                      -- id пользователя основного приложения (без внешнего ключа)
    query_text       TEXT NOT NULL,
    response_text    TEXT,
    response_sources JSONB,                        -- источники ответа с оценками близости
    processing_time  NUMERIC(8,2),                 -- секунды
    relevance_score  NUMERIC(3,2),                 -- средняя близость найденных фрагментов 0..1 (не оценка пользователя)
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_rag_queries_created_at ON rag_queries (created_at DESC);

-- Результат анализа изображения (routes/images.py); повторный разбор работы обновляет запись
CREATE TABLE IF NOT EXISTS artwork_analysis (
    analysis_id      SERIAL PRIMARY KEY,
    artwork_id       INTEGER NOT NULL,             -- id работы основного приложения (без внешнего ключа)
    analysis_version VARCHAR(20) NOT NULL DEFAULT '1.0',
    model_used       VARCHAR(160),
    processing_time  NUMERIC(8,2),                 -- секунды
    technical_notes  TEXT,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (artwork_id, analysis_version)
);
