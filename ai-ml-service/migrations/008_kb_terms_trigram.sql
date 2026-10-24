-- Поиск по написанию: слова базы (леммы) и триграммный индекс, чтобы «Занабазар» находил «Дзанабадзар».
--
-- pg_trgm входит в состав PostgreSQL (contrib) и с версии 13 помечено как доверенное расширение: его может создать
-- владелец базы. Если прав не хватает, миграция всё равно проходит, но без индекса и поиска по написанию — тогда
-- расширение создаёт суперпользователь (`CREATE EXTENSION pg_trgm;` в базе ядра), а индекс — повторный запуск
-- этого же блока (см. docs/AI-RAG.md, «Поиск по написанию»). Запросы без расширения работают как раньше.

DO $$
BEGIN
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
EXCEPTION WHEN insufficient_privilege OR undefined_file THEN
    RAISE NOTICE 'pg_trgm не создано (%): поиск по написанию отключён', SQLERRM;
END $$;

CREATE TABLE IF NOT EXISTS kb_terms (
    term TEXT PRIMARY KEY
);

-- Леммы всех уже загруженных фрагментов; дальше их пополняет knowledge_base.replace_document
INSERT INTO kb_terms (term)
SELECT DISTINCT u.lexeme
FROM kb_chunks c, LATERAL unnest(c.search_text) AS u
WHERE length(u.lexeme) BETWEEN 1 AND 40
ON CONFLICT (term) DO NOTHING;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_trgm') THEN
        CREATE INDEX IF NOT EXISTS idx_kb_terms_trgm ON kb_terms USING GIN (term gin_trgm_ops);
    END IF;
END $$;
