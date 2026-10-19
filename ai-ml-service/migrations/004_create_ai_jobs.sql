-- Migration: очередь задач ИИ в PostgreSQL (вместо BackgroundTasks и Redis)
-- Задачи берутся воркером через FOR UPDATE SKIP LOCKED; статусы и результаты переживают перезапуск.
-- Требуется PostgreSQL 13+ (gen_random_uuid).

CREATE TABLE IF NOT EXISTS ai_jobs (
    job_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kind          VARCHAR(32)  NOT NULL,                      -- image_analysis | pdf_processing | digitization
    status        VARCHAR(16)  NOT NULL DEFAULT 'queued',     -- queued | running | completed | failed
    payload       JSONB        NOT NULL,
    result        JSONB,
    error         TEXT,                                       -- безопасное для показа сообщение
    progress      INTEGER      NOT NULL DEFAULT 0,
    current_step  TEXT,
    priority      INTEGER      NOT NULL DEFAULT 5,            -- меньше — раньше
    attempts      INTEGER      NOT NULL DEFAULT 0,
    max_attempts  INTEGER      NOT NULL DEFAULT 3,
    run_after     TIMESTAMPTZ  NOT NULL DEFAULT now(),        -- отложенный повтор
    locked_by     TEXT,
    heartbeat_at  TIMESTAMPTZ,
    created_by    INTEGER,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    started_at    TIMESTAMPTZ,
    finished_at   TIMESTAMPTZ,
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT ai_jobs_status_chk CHECK (status IN ('queued', 'running', 'completed', 'failed'))
);

-- Выборка следующей задачи: только из очереди, по приоритету и времени
CREATE INDEX IF NOT EXISTS idx_ai_jobs_queue ON ai_jobs (priority, created_at) WHERE status = 'queued';
-- Поиск зависших задач
CREATE INDEX IF NOT EXISTS idx_ai_jobs_running ON ai_jobs (heartbeat_at) WHERE status = 'running';
CREATE INDEX IF NOT EXISTS idx_ai_jobs_kind_created ON ai_jobs (kind, created_at DESC);

COMMENT ON TABLE ai_jobs IS 'Очередь задач ИИ-ядра: анализ изображений, обработка PDF, оцифровка';
