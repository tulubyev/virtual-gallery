-- Migration: выбор модели по задачам из админ-панели (поверх значений MODEL_* из окружения)
-- Строка (task, mode) переопределяет модель из окружения; удалить строку — вернуть значение по умолчанию.

CREATE TABLE IF NOT EXISTS ai_model_settings (
    task        VARCHAR(32)  NOT NULL,                     -- vision_front | vision_back | rag_answer | chat | judge | bulk
    mode        VARCHAR(16)  NOT NULL DEFAULT 'global',    -- global | ru-only
    model       VARCHAR(160) NOT NULL,
    updated_by  TEXT,
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    PRIMARY KEY (task, mode),
    CONSTRAINT ai_model_settings_mode_chk CHECK (mode IN ('global', 'ru-only'))
);

-- Журнал изменений: кто, когда и с какой модели на какую
CREATE TABLE IF NOT EXISTS ai_model_settings_log (
    id         BIGSERIAL PRIMARY KEY,
    task       VARCHAR(32)  NOT NULL,
    mode       VARCHAR(16)  NOT NULL,
    old_model  VARCHAR(160),                               -- NULL — до этого действовало значение из окружения
    new_model  VARCHAR(160),                               -- NULL — сброс к значению из окружения
    actor      TEXT,
    changed_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_model_settings_log_changed ON ai_model_settings_log (changed_at DESC);
