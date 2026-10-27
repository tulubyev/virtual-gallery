-- Карточка произведения (docs/ARTWORK-CARD.md): паспортные поля, текстовые фрагменты с источниками и статусами, история правок.
-- Предполагается, что users(user_id) и artworks(artwork_id) уже существуют. Существующие колонки artworks (status, country, epoch,
-- collection и др.) не трогаются: жизненный цикл карточки хранится отдельно в card_status, поэтому показ уже опубликованных
-- произведений не меняется. Миграция безопасна для повторного применения (IF NOT EXISTS).

-- ---------------------------------------------------------------------------------------------------------------------
-- Паспортные поля (блоки A, B, E, F шаблона)
-- ---------------------------------------------------------------------------------------------------------------------
ALTER TABLE artworks
  ADD COLUMN IF NOT EXISTS title_en            TEXT,
  ADD COLUMN IF NOT EXISTS medium_en           TEXT,
  ADD COLUMN IF NOT EXISTS attribution_note    TEXT,
  ADD COLUMN IF NOT EXISTS attribution_note_en TEXT,
  ADD COLUMN IF NOT EXISTS inventory_number    TEXT,
  ADD COLUMN IF NOT EXISTS dating_text         TEXT,
  ADD COLUMN IF NOT EXISTS year_from           INTEGER,
  ADD COLUMN IF NOT EXISTS year_to             INTEGER,
  ADD COLUMN IF NOT EXISTS dating_certainty    TEXT CHECK (dating_certainty IN ('exact', 'approx', 'unknown')),
  ADD COLUMN IF NOT EXISTS provenance          TEXT,
  ADD COLUMN IF NOT EXISTS inscriptions        TEXT,
  ADD COLUMN IF NOT EXISTS image_rights_holder TEXT,
  ADD COLUMN IF NOT EXISTS image_rights_note   TEXT,
  ADD COLUMN IF NOT EXISTS card_status         TEXT NOT NULL DEFAULT 'draft'
                                               CHECK (card_status IN ('draft', 'needs_review', 'approved', 'published', 'archived')),
  ADD COLUMN IF NOT EXISTS card_reviewed_by    INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS card_reviewed_at    TIMESTAMPTZ;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'artworks_card_year_range' AND conrelid = 'artworks'::regclass) THEN
    ALTER TABLE artworks ADD CONSTRAINT artworks_card_year_range
      CHECK (year_from IS NULL OR year_to IS NULL OR year_from <= year_to);
  END IF;
END $$;

-- ---------------------------------------------------------------------------------------------------------------------
-- Проверки источников (используются в CHECK и в представлении публичных фрагментов)
-- ---------------------------------------------------------------------------------------------------------------------
-- У каждого документного источника есть непустая цитата.
CREATE OR REPLACE FUNCTION artwork_card_sources_have_quotes(src JSONB) RETURNS BOOLEAN
LANGUAGE sql IMMUTABLE AS $$
  SELECT EXISTS (SELECT 1 FROM jsonb_array_elements(src) e WHERE e->>'kind' = 'document')
     AND NOT EXISTS (SELECT 1 FROM jsonb_array_elements(src) e
                      WHERE e->>'kind' = 'document' AND COALESCE(btrim(e->>'quote'), '') = '');
$$;

-- Все документные источники публичные: поле access равно 'public' (документ с access=staff или без отметки не подходит).
CREATE OR REPLACE FUNCTION artwork_card_sources_public(src JSONB) RETURNS BOOLEAN
LANGUAGE sql IMMUTABLE AS $$
  SELECT NOT EXISTS (SELECT 1 FROM jsonb_array_elements(src) e
                      WHERE e->>'kind' = 'document' AND COALESCE(e->>'access', '') <> 'public');
$$;

-- ---------------------------------------------------------------------------------------------------------------------
-- Фрагменты текста (блоки B, C, D, E)
-- ---------------------------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS artwork_card_fragments (
  fragment_id     BIGSERIAL PRIMARY KEY,
  artwork_id      INTEGER NOT NULL REFERENCES artworks(artwork_id) ON DELETE CASCADE,
  block           TEXT NOT NULL CHECK (block IN ('about_work', 'about_artist', 'provenance', 'exhibitions', 'acquisition', 'inscriptions')),
  position        INTEGER NOT NULL DEFAULT 0,
  language        TEXT NOT NULL CHECK (language IN ('ru', 'en')),
  text            TEXT NOT NULL CHECK (btrim(text) <> ''),
  -- catalogued — внесено куратором; from_document — из документа, цитата проверена; visible — описание видимого на изображении;
  -- ai_inferred — вывод ИИ без источника (не публикуется и не утверждается)
  status          TEXT NOT NULL CHECK (status IN ('catalogued', 'from_document', 'visible', 'ai_inferred')),
  confidence      TEXT NOT NULL DEFAULT 'established' CHECK (confidence IN ('established', 'uncertain')),
  -- [{kind: 'db'|'document'|'curator'|'external', id, quote, page, access, license}]
  sources         JSONB NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(sources) = 'array'),
  translated_from BIGINT REFERENCES artwork_card_fragments(fragment_id) ON DELETE SET NULL,
  model           TEXT,
  prompt_version  TEXT,
  created_by      INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
  approved_by     INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
  approved_at     TIMESTAMPTZ,
  version         INTEGER NOT NULL DEFAULT 1,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT artwork_card_fragments_document_quote
    CHECK (status <> 'from_document' OR artwork_card_sources_have_quotes(sources)),
  CONSTRAINT artwork_card_fragments_inferred_not_approved
    CHECK (status <> 'ai_inferred' OR (approved_by IS NULL AND approved_at IS NULL)),
  -- утвердивший указан только вместе со временем (пользователя можно удалить: approved_by станет NULL, approved_at останется)
  CONSTRAINT artwork_card_fragments_approval_pair
    CHECK (approved_by IS NULL OR approved_at IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS artwork_card_fragments_lookup
  ON artwork_card_fragments (artwork_id, block, language, position);

-- История: прежняя версия фрагмента записывается при изменении текста, статуса, уверенности или источников.
CREATE TABLE IF NOT EXISTS artwork_card_fragment_history (
  history_id  BIGSERIAL PRIMARY KEY,
  fragment_id BIGINT NOT NULL,
  artwork_id  INTEGER NOT NULL,
  version     INTEGER NOT NULL,
  snapshot    JSONB NOT NULL,
  changed_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS artwork_card_fragment_history_fragment ON artwork_card_fragment_history (fragment_id, version);

-- Содержательная правка без явного повторного утверждения снимает утверждение и возвращает опубликованную/утверждённую
-- карточку на проверку (docs/ARTWORK-CARD.md, «Жизненный цикл»).
CREATE OR REPLACE FUNCTION artwork_card_fragment_before_update() RETURNS TRIGGER
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  IF (NEW.text, NEW.status, NEW.confidence, NEW.sources, NEW.block, NEW.language)
     IS DISTINCT FROM (OLD.text, OLD.status, OLD.confidence, OLD.sources, OLD.block, OLD.language) THEN
    INSERT INTO artwork_card_fragment_history (fragment_id, artwork_id, version, snapshot)
    VALUES (OLD.fragment_id, OLD.artwork_id, OLD.version, to_jsonb(OLD));
    NEW.version := OLD.version + 1;
    IF NEW.approved_by IS NOT DISTINCT FROM OLD.approved_by AND NEW.approved_at IS NOT DISTINCT FROM OLD.approved_at THEN
      NEW.approved_by := NULL;
      NEW.approved_at := NULL;
    END IF;
    UPDATE artworks SET card_status = 'needs_review'
     WHERE artwork_id = NEW.artwork_id AND card_status IN ('approved', 'published');
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS artwork_card_fragments_before_update ON artwork_card_fragments;
CREATE TRIGGER artwork_card_fragments_before_update
  BEFORE UPDATE ON artwork_card_fragments
  FOR EACH ROW EXECUTE FUNCTION artwork_card_fragment_before_update();

-- Новый фрагмент в утверждённой или опубликованной карточке тоже требует проверки.
CREATE OR REPLACE FUNCTION artwork_card_fragment_after_insert() RETURNS TRIGGER
LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.approved_at IS NULL THEN
    UPDATE artworks SET card_status = 'needs_review'
     WHERE artwork_id = NEW.artwork_id AND card_status IN ('approved', 'published');
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS artwork_card_fragments_after_insert ON artwork_card_fragments;
CREATE TRIGGER artwork_card_fragments_after_insert
  AFTER INSERT ON artwork_card_fragments
  FOR EACH ROW EXECUTE FUNCTION artwork_card_fragment_after_insert();

-- ---------------------------------------------------------------------------------------------------------------------
-- Что можно показывать посетителям: фрагменты опубликованной карточки, утверждённые куратором, не ai_inferred,
-- а документные источники — только публичные (решение владельца: блок «Литература» публичный, документы staff не раскрываются).
-- ---------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE VIEW artwork_card_public_fragments AS
SELECT f.*
  FROM artwork_card_fragments f
  JOIN artworks a ON a.artwork_id = f.artwork_id
 WHERE a.card_status = 'published'
   AND f.approved_at IS NOT NULL
   AND f.status <> 'ai_inferred'
   AND artwork_card_sources_public(f.sources);
