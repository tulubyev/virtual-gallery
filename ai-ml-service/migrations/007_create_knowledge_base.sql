-- База знаний для RAG: документы и их фрагменты (текст нужен для лексического поиска и цитат;
-- векторы живут только в Qdrant, коллекция pdf_chunks).
--
-- access: public — виден гостям и посетителям, staff — только сотрудникам, кураторам и администраторам.
-- Документ без явного решения получает staff: опубликовать можно только сознательно.

CREATE TABLE IF NOT EXISTS kb_documents (
    document_id    VARCHAR(100) PRIMARY KEY,
    title          TEXT,
    access         VARCHAR(10) NOT NULL DEFAULT 'staff' CHECK (access IN ('public', 'staff')),
    license        TEXT,
    source_url     TEXT,
    content_sha256 CHAR(64),
    pages_count    INTEGER,
    chunks_count   INTEGER NOT NULL DEFAULT 0,
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kb_chunks (
    document_id  VARCHAR(100) NOT NULL REFERENCES kb_documents(document_id) ON DELETE CASCADE,
    chunk_index  INTEGER NOT NULL,
    page_number  INTEGER,
    content      TEXT NOT NULL,
    -- доступ дублируется в чанке: фильтр по нему идёт без соединения таблиц
    access       VARCHAR(10) NOT NULL DEFAULT 'staff' CHECK (access IN ('public', 'staff')),
    search_text  TSVECTOR GENERATED ALWAYS AS (to_tsvector('russian', content)) STORED,
    PRIMARY KEY (document_id, chunk_index)
);

CREATE INDEX IF NOT EXISTS idx_kb_chunks_search ON kb_chunks USING GIN (search_text);
CREATE INDEX IF NOT EXISTS idx_kb_chunks_access ON kb_chunks (access);
CREATE INDEX IF NOT EXISTS idx_kb_documents_sha ON kb_documents (content_sha256);

-- Журнал запросов: что ответили и почему (отказ, нарушение цитат), без персональных данных
ALTER TABLE rag_queries ADD COLUMN IF NOT EXISTS outcome VARCHAR(30);
ALTER TABLE rag_queries ADD COLUMN IF NOT EXISTS access VARCHAR(10);
