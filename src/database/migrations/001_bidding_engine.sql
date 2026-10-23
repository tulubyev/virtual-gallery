-- Торговый движок (docs/AUCTION-DESIGN.md, приложение А): английский аукцион с максимальными ставками,
-- шкалой шага, мягким закрытием, журналом с цепочкой хешей.
--
-- Новые таблицы с префиксом bidding_ рядом со старыми auctions/auction_lots/bids и никак с ними не связаны:
-- боевые данные не затрагиваются (нет ALTER и преобразования типов), старый раздел работает как раньше.
-- Деньги — в копейках (BIGINT), время — TIMESTAMPTZ. Логика ставки и закрытия — в функциях БД: транзакция
-- с блокировкой строки лота, единственный источник времени — clock_timestamp() базы.
-- Предполагается, что users(user_id) и artworks(artwork_id) уже существуют.

-- ── Шкала шага ставки ──────────────────────────────────────────────────────────────────────────
CREATE TABLE bidding_increment_tables (
  table_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name     TEXT NOT NULL UNIQUE
);
CREATE TABLE bidding_increment_steps (
  table_id BIGINT NOT NULL REFERENCES bidding_increment_tables(table_id) ON DELETE CASCADE,
  from_kop BIGINT NOT NULL CHECK (from_kop >= 0),   -- с какой текущей цены (включительно) действует шаг
  step_kop BIGINT NOT NULL CHECK (step_kop > 0),
  PRIMARY KEY (table_id, from_kop)
);

-- Шкала по умолчанию — предложение из раздела 4.3 проекта (согласовать с аукционистом)
WITH t AS (INSERT INTO bidding_increment_tables (name) VALUES ('default') RETURNING table_id)
INSERT INTO bidding_increment_steps (table_id, from_kop, step_kop)
SELECT t.table_id, v.from_kop, v.step_kop FROM t, (VALUES
  (0::bigint,           50000::bigint),     -- до 10 000 ₽ — 500 ₽
  (1000000,            100000),             -- 10 000–19 999 — 1 000
  (2000000,            200000),             -- 20 000–49 999 — 2 000
  (5000000,            500000),             -- 50 000–99 999 — 5 000
  (10000000,          1000000),             -- 100 000–199 999 — 10 000
  (20000000,          2000000),             -- 200 000–499 999 — 20 000
  (50000000,          5000000),             -- 500 000–999 999 — 50 000
  (100000000,        10000000)              -- от 1 000 000 — 100 000
) AS v(from_kop, step_kop);

-- ── Участники и допуск ─────────────────────────────────────────────────────────────────────────
CREATE TABLE bidding_participants (
  user_id           INTEGER PRIMARY KEY REFERENCES users(user_id),
  kind              TEXT NOT NULL CHECK (kind IN ('person', 'legal_entity', 'sole_proprietor')),
  full_name         TEXT NOT NULL,
  phone             TEXT NOT NULL,
  phone_verified_at TIMESTAMPTZ,
  email_verified_at TIMESTAMPTZ,
  kyc_status        TEXT NOT NULL DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'approved', 'rejected')),
  kyc_reviewed_by   INTEGER REFERENCES users(user_id),
  kyc_reviewed_at   TIMESTAMPTZ,
  kyc_note          TEXT,
  standing          TEXT NOT NULL DEFAULT 'active' CHECK (standing IN ('active', 'suspended', 'blacklisted')),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Аукцион и лоты ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE bidding_auctions (
  auction_id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug                   TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9][a-z0-9-]{1,78}$'),
  title                  TEXT NOT NULL,
  description            TEXT,
  status                 TEXT NOT NULL DEFAULT 'draft' CHECK (status IN
                           ('draft', 'announced', 'registration', 'preview', 'bidding', 'closing', 'closed', 'settled', 'archived', 'cancelled')),
  notice_days            INTEGER NOT NULL DEFAULT 30 CHECK (notice_days >= 0),   -- ст. 448 п. 2 ГК: извещение за 30 дней; иное — решение юриста
  notice_published_at    TIMESTAMPTZ,
  registration_closes_at TIMESTAMPTZ,
  bidding_opens_at       TIMESTAMPTZ,
  first_close_at         TIMESTAMPTZ,                         -- закрытие первого лота
  hard_close_at          TIMESTAMPTZ,                         -- после этого момента продлений нет
  soft_close_window_s    INTEGER NOT NULL DEFAULT 180 CHECK (soft_close_window_s >= 0),
  soft_close_extend_s    INTEGER NOT NULL DEFAULT 180 CHECK (soft_close_extend_s >= 0),
  lot_close_stagger_s    INTEGER NOT NULL DEFAULT 60 CHECK (lot_close_stagger_s >= 0),
  min_bidders            SMALLINT NOT NULL DEFAULT 2 CHECK (min_bidders >= 1),   -- ст. 447 п. 5 ГК: с одним участником торги не состоялись
  increments_id          BIGINT NOT NULL REFERENCES bidding_increment_tables(table_id),
  deposit_kop            BIGINT NOT NULL DEFAULT 0 CHECK (deposit_kop >= 0),
  exposure_multiplier    INTEGER NOT NULL DEFAULT 10 CHECK (exposure_multiplier >= 1),
  created_by             INTEGER REFERENCES users(user_id),
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE bidding_lots (
  lot_id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  auction_id         BIGINT NOT NULL REFERENCES bidding_auctions(auction_id),
  lot_no             INTEGER NOT NULL CHECK (lot_no >= 1),
  artwork_id         INTEGER REFERENCES artworks(artwork_id),
  seller_user_id     INTEGER REFERENCES users(user_id),         -- консигнатор, если он пользователь: ставить запрещено
  snapshot           JSONB NOT NULL,                            -- описание лота на момент создания (название, автор, …)
  content_sha256     BYTEA,                                     -- хеш snapshot, ставит триггер (генерируемая колонка из jsonb::text не immutable)
  start_price_kop    BIGINT NOT NULL CHECK (start_price_kop > 0),
  reserve_kop        BIGINT CHECK (reserve_kop IS NULL OR reserve_kop >= start_price_kop),   -- NULL — без резерва; наружу не отдаётся
  estimate_low_kop   BIGINT CHECK (estimate_low_kop IS NULL OR estimate_low_kop > 0),
  estimate_high_kop  BIGINT CHECK (estimate_high_kop IS NULL OR estimate_high_kop >= COALESCE(estimate_low_kop, 1)),
  increments_id      BIGINT REFERENCES bidding_increment_tables(table_id),   -- NULL — шкала аукциона
  state              TEXT NOT NULL DEFAULT 'draft' CHECK (state IN
                       ('draft', 'approved', 'open', 'unsold', 'sold_awaiting_payment', 'paid', 'handed_over', 'settled', 'defaulted', 'withdrawn')),
  ends_at            TIMESTAMPTZ,
  current_price_kop  BIGINT NOT NULL DEFAULT 0,
  leader_user_id     INTEGER REFERENCES users(user_id),
  leader_max_kop     BIGINT,
  bid_count          INTEGER NOT NULL DEFAULT 0,
  version            INTEGER NOT NULL DEFAULT 0,               -- растёт при каждом изменении (проверка «устарело», синхронизация клиентов)
  hammer_kop         BIGINT,
  winner_user_id     INTEGER REFERENCES users(user_id),
  closed_at          TIMESTAMPTZ,
  close_outcome      TEXT CHECK (close_outcome IN ('sold', 'no_bids', 'single_bidder', 'reserve_not_met')),
  resale_right_applies BOOLEAN,                                -- ст. 1293 ГК: решает куратор по лоту
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (auction_id, lot_no),
  CONSTRAINT bidding_lots_open_has_end CHECK (state <> 'open' OR ends_at IS NOT NULL)
);
CREATE INDEX bidding_lots_due_idx ON bidding_lots (ends_at) WHERE state = 'open';          -- выборка воркера закрытия
CREATE UNIQUE INDEX bidding_lots_artwork_active_uq ON bidding_lots (artwork_id)
  WHERE artwork_id IS NOT NULL AND state IN ('approved', 'open', 'sold_awaiting_payment');  -- работа не в двух активных лотах

CREATE TABLE bidding_registrations (
  auction_id        BIGINT NOT NULL REFERENCES bidding_auctions(auction_id),
  user_id           INTEGER NOT NULL REFERENCES bidding_participants(user_id),
  status            TEXT NOT NULL DEFAULT 'applied' CHECK (status IN
                      ('applied', 'docs_pending', 'under_review', 'approved', 'deposit_pending', 'active', 'rejected', 'suspended', 'closed')),
  pseudonym_no      INTEGER,                                   -- «участник № N» в рамках аукциона
  limit_kop         BIGINT NOT NULL DEFAULT 0 CHECK (limit_kop >= 0),    -- максимум суммарных «ведущих» максимумов
  deposit_kop       BIGINT NOT NULL DEFAULT 0 CHECK (deposit_kop >= 0),  -- внесено (отмечает куратор)
  rules_accepted_at TIMESTAMPTZ,
  rules_version     TEXT,
  decided_by        INTEGER REFERENCES users(user_id),
  decided_at        TIMESTAMPTZ,
  reason            TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (auction_id, user_id)
);
CREATE UNIQUE INDEX bidding_registrations_pseudonym_uq ON bidding_registrations (auction_id, pseudonym_no) WHERE pseudonym_no IS NOT NULL;

-- ── Ставки и журнал (только вставки) ───────────────────────────────────────────────────────────
CREATE TABLE bidding_bids (
  bid_id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lot_id             BIGINT NOT NULL REFERENCES bidding_lots(lot_id),
  user_id            INTEGER NOT NULL REFERENCES users(user_id),
  request_id         UUID NOT NULL,                            -- повтор запроса не создаёт вторую ставку
  kind               TEXT NOT NULL CHECK (kind IN ('first', 'manual', 'raise_max')),
  max_kop            BIGINT NOT NULL CHECK (max_kop > 0),
  price_after_kop    BIGINT,
  accepted           BOOLEAN NOT NULL,
  reject_reason      TEXT,
  became_leader      BOOLEAN,
  extended_to        TIMESTAMPTZ,
  lot_version        INTEGER,
  lot_content_sha256 BYTEA,                                    -- какое описание лота видел участник
  created_at         TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
  ip                 INET,
  ua_hash            BYTEA,
  UNIQUE (user_id, request_id)
);
CREATE INDEX bidding_bids_lot_idx ON bidding_bids (lot_id, bid_id DESC);

CREATE TABLE bidding_events (
  event_id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  chain_key     BIGINT NOT NULL,                               -- лот (положительный) или -auction_id для событий аукциона: у каждого своя цепочка
  lot_id        BIGINT REFERENCES bidding_lots(lot_id),
  auction_id    BIGINT NOT NULL REFERENCES bidding_auctions(auction_id),
  actor_user_id INTEGER,
  event_type    TEXT NOT NULL,
  payload       JSONB NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp(),
  prev_hash     BYTEA,
  hash          BYTEA NOT NULL
);
CREATE INDEX bidding_events_chain_idx ON bidding_events (chain_key, event_id DESC);

CREATE FUNCTION bidding_forbid_mutation() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'table % is append-only', TG_TABLE_NAME; END $$;
CREATE TRIGGER bidding_bids_ro   BEFORE UPDATE OR DELETE ON bidding_bids   FOR EACH ROW EXECUTE FUNCTION bidding_forbid_mutation();
CREATE TRIGGER bidding_events_ro BEFORE UPDATE OR DELETE ON bidding_events FOR EACH ROW EXECUTE FUNCTION bidding_forbid_mutation();

-- Хеш описания лота; описание нельзя менять, когда лот уже объявлен: участники ставят, видя именно его
CREATE FUNCTION bidding_lot_snapshot_guard() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND NEW.snapshot IS DISTINCT FROM OLD.snapshot AND OLD.state <> 'draft' THEN
    RAISE EXCEPTION 'lot % description cannot be changed after announcement', OLD.lot_id;
  END IF;
  NEW.content_sha256 := sha256(convert_to(NEW.snapshot::text, 'UTF8'));
  RETURN NEW;
END $$;
CREATE TRIGGER bidding_lots_snapshot BEFORE INSERT OR UPDATE ON bidding_lots FOR EACH ROW EXECUTE FUNCTION bidding_lot_snapshot_guard();

-- ── Функции ────────────────────────────────────────────────────────────────────────────────────

-- Шаг ставки при текущей цене
CREATE FUNCTION bidding_increment(p_table BIGINT, p_price BIGINT) RETURNS BIGINT LANGUAGE plpgsql STABLE AS $$
DECLARE v_step BIGINT;
BEGIN
  SELECT step_kop INTO v_step FROM bidding_increment_steps WHERE table_id = p_table AND from_kop <= p_price ORDER BY from_kop DESC LIMIT 1;
  IF v_step IS NULL THEN RAISE EXCEPTION 'increment table % has no step for price %', p_table, p_price; END IF;
  RETURN v_step;
END $$;

-- Запись в журнал с цепочкой хешей. Вызывается под блокировкой строки лота (или аукциона для событий аукциона).
-- Время в хеше — микросекунды Unix, а не text: результат не зависит от часового пояса сессии.
CREATE FUNCTION bidding_event_hash(p_prev BYTEA, p_type TEXT, p_payload JSONB, p_ts TIMESTAMPTZ) RETURNS BYTEA
LANGUAGE sql IMMUTABLE AS $$
  SELECT sha256(coalesce(p_prev, ''::bytea) ||
                convert_to(p_type || '|' || p_payload::text || '|' || (extract(epoch FROM p_ts) * 1000000)::bigint::text, 'UTF8'))
$$;

CREATE FUNCTION bidding_log_event(p_lot BIGINT, p_auction BIGINT, p_actor INTEGER, p_type TEXT, p_payload JSONB) RETURNS void
LANGUAGE plpgsql AS $$
DECLARE v_key BIGINT := coalesce(p_lot, -p_auction); v_prev BYTEA; v_ts TIMESTAMPTZ := clock_timestamp();
BEGIN
  SELECT hash INTO v_prev FROM bidding_events WHERE chain_key = v_key ORDER BY event_id DESC LIMIT 1;
  INSERT INTO bidding_events (chain_key, lot_id, auction_id, actor_user_id, event_type, payload, created_at, prev_hash, hash)
  VALUES (v_key, p_lot, p_auction, p_actor, p_type, p_payload, v_ts, v_prev, bidding_event_hash(v_prev, p_type, p_payload, v_ts));
END $$;

-- Проверка цепочки: первое событие, у которого хеш не сходится, либо ok = true
CREATE FUNCTION bidding_verify_chain(p_chain BIGINT) RETURNS TABLE(ok BOOLEAN, checked INTEGER, first_bad_event BIGINT)
LANGUAGE plpgsql STABLE AS $$
DECLARE e bidding_events%ROWTYPE; v_prev BYTEA := NULL; v_n INTEGER := 0;
BEGIN
  FOR e IN SELECT * FROM bidding_events WHERE chain_key = p_chain ORDER BY event_id LOOP
    v_n := v_n + 1;
    IF e.prev_hash IS DISTINCT FROM v_prev OR e.hash <> bidding_event_hash(v_prev, e.event_type, e.payload, e.created_at) THEN
      ok := false; checked := v_n; first_bad_event := e.event_id; RETURN NEXT; RETURN;
    END IF;
    v_prev := e.hash;
  END LOOP;
  ok := true; checked := v_n; first_bad_event := NULL; RETURN NEXT;
END $$;

-- Объявить аукцион: проверить готовность, срок извещения и перевести лоты в «утверждён»
CREATE FUNCTION bidding_announce(p_auction BIGINT, p_actor INTEGER) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE a bidding_auctions%ROWTYPE; v_lots INTEGER; v_now TIMESTAMPTZ := clock_timestamp(); v_last_end TIMESTAMPTZ;
BEGIN
  SELECT * INTO a FROM bidding_auctions WHERE auction_id = p_auction FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'no_such_auction'); END IF;
  IF a.status <> 'draft' THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'not_draft'); END IF;
  IF a.bidding_opens_at IS NULL OR a.first_close_at IS NULL OR a.hard_close_at IS NULL THEN
    RETURN jsonb_build_object('status', 'rejected', 'reason', 'dates_missing');
  END IF;
  IF a.bidding_opens_at < v_now + make_interval(days => a.notice_days) THEN
    RETURN jsonb_build_object('status', 'rejected', 'reason', 'notice_too_short', 'notice_days', a.notice_days);
  END IF;
  IF a.first_close_at <= a.bidding_opens_at THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'close_before_open'); END IF;
  IF a.registration_closes_at IS NOT NULL AND a.registration_closes_at > a.bidding_opens_at THEN
    RETURN jsonb_build_object('status', 'rejected', 'reason', 'registration_after_open');
  END IF;
  SELECT count(*) INTO v_lots FROM bidding_lots WHERE auction_id = p_auction AND state = 'draft';
  IF v_lots = 0 THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'no_lots'); END IF;
  v_last_end := a.first_close_at + make_interval(secs => a.lot_close_stagger_s * (v_lots - 1));
  IF a.hard_close_at < v_last_end THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'hard_close_too_early'); END IF;

  UPDATE bidding_lots SET state = 'approved', updated_at = now() WHERE auction_id = p_auction AND state = 'draft';
  UPDATE bidding_auctions SET status = 'announced', notice_published_at = v_now, updated_at = now() WHERE auction_id = p_auction;
  PERFORM bidding_log_event(NULL, p_auction, p_actor, 'auction_announced',
          jsonb_build_object('lots', v_lots, 'notice_days', a.notice_days, 'bidding_opens_at', a.bidding_opens_at,
                             'first_close_at', a.first_close_at, 'hard_close_at', a.hard_close_at));
  RETURN jsonb_build_object('status', 'announced', 'lots', v_lots, 'notice_published_at', v_now);
END $$;

-- Открыть торги по аукционам, у которых наступило bidding_opens_at: лоты «утверждён» → «идут торги».
-- Лоты закрываются по очереди: first_close_at + (lot_no − 1) × lot_close_stagger_s.
CREATE FUNCTION bidding_open_due_auctions() RETURNS SETOF BIGINT LANGUAGE plpgsql AS $$
DECLARE a bidding_auctions%ROWTYPE; v_opened INTEGER;
BEGIN
  FOR a IN SELECT * FROM bidding_auctions WHERE status = 'announced' AND bidding_opens_at <= clock_timestamp()
           ORDER BY bidding_opens_at FOR UPDATE SKIP LOCKED LOOP
    UPDATE bidding_lots l SET state = 'open', version = version + 1, updated_at = now(),
           ends_at = a.first_close_at + make_interval(secs => a.lot_close_stagger_s * (
             SELECT count(*) FROM bidding_lots p WHERE p.auction_id = l.auction_id AND p.state = 'approved' AND p.lot_no < l.lot_no))
     WHERE l.auction_id = a.auction_id AND l.state = 'approved';
    GET DIAGNOSTICS v_opened = ROW_COUNT;
    UPDATE bidding_auctions SET status = 'bidding', updated_at = now() WHERE auction_id = a.auction_id;
    PERFORM bidding_log_event(NULL, a.auction_id, NULL, 'bidding_opened', jsonb_build_object('lots', v_opened));
    RETURN NEXT a.auction_id;
  END LOOP;
END $$;

-- Решение по заявке участника: допустить с лимитом или отклонить
CREATE FUNCTION bidding_decide_registration(p_auction BIGINT, p_user INTEGER, p_approve BOOLEAN, p_limit_kop BIGINT,
                                            p_actor INTEGER, p_reason TEXT DEFAULT NULL) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE a bidding_auctions%ROWTYPE; r bidding_registrations%ROWTYPE; p bidding_participants%ROWTYPE; v_no INTEGER;
BEGIN
  SELECT * INTO a FROM bidding_auctions WHERE auction_id = p_auction FOR UPDATE;       -- сериализует нумерацию участников
  IF NOT FOUND THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'no_such_auction'); END IF;
  SELECT * INTO r FROM bidding_registrations WHERE auction_id = p_auction AND user_id = p_user FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'no_application'); END IF;
  IF a.status IN ('closed', 'settled', 'archived', 'cancelled') THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'auction_over'); END IF;

  IF NOT p_approve THEN
    UPDATE bidding_registrations SET status = 'rejected', decided_by = p_actor, decided_at = now(), reason = p_reason, limit_kop = 0
     WHERE auction_id = p_auction AND user_id = p_user;
    PERFORM bidding_log_event(NULL, p_auction, p_actor, 'registration_rejected', jsonb_build_object('user_id', p_user, 'reason', p_reason));
    RETURN jsonb_build_object('status', 'rejected_registration');
  END IF;

  SELECT * INTO p FROM bidding_participants WHERE user_id = p_user;
  IF NOT FOUND OR p.kyc_status <> 'approved' OR p.standing <> 'active' THEN
    RETURN jsonb_build_object('status', 'rejected', 'reason', 'kyc_not_approved');
  END IF;
  IF p_limit_kop IS NULL OR p_limit_kop <= 0 THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'limit_required'); END IF;
  v_no := coalesce(r.pseudonym_no, (SELECT coalesce(max(pseudonym_no), 0) + 1 FROM bidding_registrations WHERE auction_id = p_auction));
  UPDATE bidding_registrations SET status = 'active', pseudonym_no = v_no, limit_kop = p_limit_kop,
         decided_by = p_actor, decided_at = now(), reason = p_reason
   WHERE auction_id = p_auction AND user_id = p_user;
  PERFORM bidding_log_event(NULL, p_auction, p_actor, 'registration_approved',
          jsonb_build_object('user_id', p_user, 'pseudonym_no', v_no, 'limit_kop', p_limit_kop));
  RETURN jsonb_build_object('status', 'approved', 'pseudonym_no', v_no, 'limit_kop', p_limit_kop);
END $$;

-- Ставка. Вся логика — в одной транзакции под FOR UPDATE по строке лота; p_max — максимум участника.
CREATE FUNCTION bidding_place_bid(p_lot BIGINT, p_user INTEGER, p_max BIGINT, p_req UUID, p_expected_version INTEGER DEFAULT NULL,
                                  p_ip INET DEFAULT NULL, p_ua_hash BYTEA DEFAULT NULL) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE
  l bidding_lots%ROWTYPE; a bidding_auctions%ROWTYPE; r bidding_registrations%ROWTYPE; d bidding_bids%ROWTYPE; p bidding_participants%ROWTYPE;
  v_now TIMESTAMPTZ; v_min BIGINT; v_price BIGINT; v_kind TEXT; v_leader BOOLEAN; v_new_end TIMESTAMPTZ;
  v_exposure BIGINT; v_reject TEXT; v_bid BIGINT; v_table BIGINT; v_next BIGINT;
BEGIN
  SELECT * INTO d FROM bidding_bids WHERE user_id = p_user AND request_id = p_req;
  IF FOUND THEN
    RETURN jsonb_build_object('status', 'duplicate', 'bid_id', d.bid_id, 'accepted', d.accepted, 'reason', d.reject_reason);
  END IF;

  SELECT * INTO l FROM bidding_lots WHERE lot_id = p_lot FOR UPDATE;                 -- сериализация ставок по лоту
  IF NOT FOUND THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'no_such_lot'); END IF;
  SELECT * INTO a FROM bidding_auctions WHERE auction_id = l.auction_id;
  SELECT * INTO r FROM bidding_registrations WHERE auction_id = l.auction_id AND user_id = p_user;
  SELECT * INTO p FROM bidding_participants WHERE user_id = p_user;
  v_now := clock_timestamp();                                                         -- единственный источник времени — БД
  v_table := coalesce(l.increments_id, a.increments_id);

  v_min := CASE WHEN l.bid_count = 0 THEN l.start_price_kop ELSE l.current_price_kop + bidding_increment(v_table, l.current_price_kop) END;
  SELECT coalesce(sum(x.leader_max_kop), 0) INTO v_exposure FROM bidding_lots x
   WHERE x.auction_id = l.auction_id AND x.leader_user_id = p_user AND x.state = 'open' AND x.lot_id <> p_lot;

  v_reject := CASE
    WHEN p_max IS NULL OR p_max <= 0                                           THEN 'invalid_amount'
    WHEN a.status NOT IN ('bidding', 'closing') OR l.state <> 'open' OR v_now >= l.ends_at THEN 'closed'
    WHEN p.user_id IS NULL OR p.standing <> 'active' OR p.kyc_status <> 'approved' THEN 'not_allowed'
    WHEN r.status IS DISTINCT FROM 'active'                                    THEN 'not_admitted'
    WHEN l.seller_user_id = p_user                                             THEN 'seller_cannot_bid'
    WHEN p_expected_version IS NOT NULL AND p_expected_version <> l.version    THEN 'stale'
    WHEN l.leader_user_id = p_user AND p_max <= l.leader_max_kop               THEN 'not_higher_than_own_max'
    WHEN l.leader_user_id IS DISTINCT FROM p_user AND p_max < v_min            THEN 'below_minimum'
    WHEN v_exposure + p_max > r.limit_kop                                      THEN 'over_limit'
    WHEN l.estimate_high_kop IS NOT NULL AND p_max > 10 * l.estimate_high_kop  THEN 'suspiciously_high'
    ELSE NULL END;

  IF v_reject IS NOT NULL THEN                                                        -- отказ тоже пишем: для разбора споров
    INSERT INTO bidding_bids (lot_id, user_id, request_id, kind, max_kop, accepted, reject_reason, lot_version, lot_content_sha256, ip, ua_hash)
    VALUES (p_lot, p_user, p_req, 'manual', greatest(coalesce(p_max, 1), 1), false, v_reject, l.version, l.content_sha256, p_ip, p_ua_hash)
    RETURNING bid_id INTO v_bid;
    PERFORM bidding_log_event(p_lot, l.auction_id, p_user, 'bid_rejected', jsonb_build_object('bid_id', v_bid, 'reason', v_reject, 'max_kop', p_max));
    RETURN jsonb_build_object('status', 'rejected', 'reason', v_reject, 'min_bid_kop', v_min, 'version', l.version);
  END IF;

  IF l.bid_count = 0 THEN                                  -- первая ставка: цена = стартовая
    v_kind := 'first'; v_price := l.start_price_kop; v_leader := true;
  ELSIF l.leader_user_id = p_user THEN                     -- лидер поднимает свой максимум: цена не меняется
    v_kind := 'raise_max'; v_price := l.current_price_kop; v_leader := true;
  ELSIF p_max <= l.leader_max_kop THEN                     -- не перебил (при равенстве выигрывает более ранняя)
    v_kind := 'manual'; v_leader := false;
    v_price := least(l.leader_max_kop, p_max + bidding_increment(v_table, p_max));
  ELSE                                                     -- новый лидер
    v_kind := 'manual'; v_leader := true;
    v_price := least(p_max, l.leader_max_kop + bidding_increment(v_table, l.leader_max_kop));
  END IF;
  -- резерв: если максимум лидера дотягивает до резерва, цена поднимается до резерва
  IF l.reserve_kop IS NOT NULL AND v_price < l.reserve_kop
     AND (CASE WHEN v_leader THEN p_max ELSE l.leader_max_kop END) >= l.reserve_kop THEN
    v_price := l.reserve_kop;
  END IF;

  -- мягкое закрытие: ставка в последние soft_close_window_s секунд продлевает лот, но не позже hard_close_at
  v_new_end := l.ends_at;
  IF v_now >= l.ends_at - make_interval(secs => a.soft_close_window_s) THEN
    v_new_end := greatest(l.ends_at, least(coalesce(a.hard_close_at, 'infinity'), v_now + make_interval(secs => a.soft_close_extend_s)));
  END IF;

  UPDATE bidding_lots SET
      current_price_kop = v_price,
      leader_user_id = CASE WHEN v_leader THEN p_user ELSE l.leader_user_id END,
      leader_max_kop = CASE WHEN v_leader THEN p_max ELSE l.leader_max_kop END,
      bid_count = bid_count + 1, version = version + 1, ends_at = v_new_end, updated_at = now()
   WHERE lot_id = p_lot;

  INSERT INTO bidding_bids (lot_id, user_id, request_id, kind, max_kop, price_after_kop, accepted, became_leader, extended_to,
                            lot_version, lot_content_sha256, ip, ua_hash, created_at)
  VALUES (p_lot, p_user, p_req, v_kind, p_max, v_price, true, v_leader, nullif(v_new_end, l.ends_at),
          l.version + 1, l.content_sha256, p_ip, p_ua_hash, v_now)
  RETURNING bid_id INTO v_bid;

  PERFORM bidding_log_event(p_lot, l.auction_id, p_user, 'bid_accepted',
          jsonb_build_object('bid_id', v_bid, 'kind', v_kind, 'max_kop', p_max, 'price_kop', v_price, 'leader', v_leader, 'ends_at', v_new_end));
  IF v_new_end <> l.ends_at THEN
    PERFORM bidding_log_event(p_lot, l.auction_id, NULL, 'lot_extended', jsonb_build_object('from', l.ends_at, 'to', v_new_end));
  END IF;
  PERFORM pg_notify('bidding_events', jsonb_build_object('lot_id', p_lot, 'version', l.version + 1, 'price_kop', v_price,
                    'bid_count', l.bid_count + 1, 'ends_at', v_new_end)::text);       -- уйдёт подписчикам после COMMIT

  v_next := v_price + bidding_increment(v_table, v_price);
  RETURN jsonb_build_object('status', 'accepted', 'bid_id', v_bid, 'leader', v_leader, 'price_kop', v_price,
                            'ends_at', v_new_end, 'extended', v_new_end <> l.ends_at, 'version', l.version + 1, 'min_next_bid_kop', v_next);
END $$;

-- Снять лот с торгов (причина обязательна). Ставки остаются в журнале.
CREATE FUNCTION bidding_withdraw_lot(p_lot BIGINT, p_actor INTEGER, p_reason TEXT) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE l bidding_lots%ROWTYPE;
BEGIN
  IF p_reason IS NULL OR btrim(p_reason) = '' THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'reason_required'); END IF;
  SELECT * INTO l FROM bidding_lots WHERE lot_id = p_lot FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'no_such_lot'); END IF;
  IF l.state NOT IN ('draft', 'approved', 'open') THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'wrong_state'); END IF;
  UPDATE bidding_lots SET state = 'withdrawn', version = version + 1, closed_at = clock_timestamp(), updated_at = now() WHERE lot_id = p_lot;
  PERFORM bidding_log_event(p_lot, l.auction_id, p_actor, 'lot_withdrawn', jsonb_build_object('reason', p_reason, 'bids', l.bid_count));
  RETURN jsonb_build_object('status', 'withdrawn', 'version', l.version + 1);
END $$;

-- Воркер закрытия: вызывается раз в секунду; SKIP LOCKED — не ждёт лоты, на которых сейчас идёт ставка.
-- Когда не остаётся ни одного лота «утверждён» или «идут торги», аукцион становится «closed».
CREATE FUNCTION bidding_close_due_lots(p_limit INTEGER DEFAULT 50) RETURNS TABLE(lot_id BIGINT, outcome TEXT)
LANGUAGE plpgsql AS $$
DECLARE l bidding_lots%ROWTYPE; v_out TEXT; v_min SMALLINT; v_bidders INTEGER; a_id BIGINT;
BEGIN
  FOR l IN SELECT * FROM bidding_lots x WHERE x.state = 'open' AND x.ends_at <= clock_timestamp()
           ORDER BY x.ends_at FOR UPDATE SKIP LOCKED LIMIT p_limit LOOP
    SELECT a.min_bidders INTO v_min FROM bidding_auctions a WHERE a.auction_id = l.auction_id;
    SELECT count(DISTINCT b.user_id) INTO v_bidders FROM bidding_bids b WHERE b.lot_id = l.lot_id AND b.accepted;
    IF l.bid_count = 0 OR l.leader_user_id IS NULL THEN v_out := 'no_bids';
    ELSIF v_bidders < v_min THEN v_out := 'single_bidder';
    ELSIF l.reserve_kop IS NOT NULL AND l.current_price_kop < l.reserve_kop THEN v_out := 'reserve_not_met';
    ELSE v_out := 'sold'; END IF;
    UPDATE bidding_lots SET state = CASE v_out WHEN 'sold' THEN 'sold_awaiting_payment' ELSE 'unsold' END,
           hammer_kop = CASE v_out WHEN 'sold' THEN l.current_price_kop END,
           winner_user_id = CASE v_out WHEN 'sold' THEN l.leader_user_id END,
           close_outcome = v_out, closed_at = clock_timestamp(), version = version + 1, updated_at = now()
     WHERE bidding_lots.lot_id = l.lot_id;
    PERFORM bidding_log_event(l.lot_id, l.auction_id, NULL, 'lot_closed',
            jsonb_build_object('outcome', v_out, 'hammer_kop', l.current_price_kop, 'winner', l.leader_user_id,
                               'bids', l.bid_count, 'bidders', v_bidders));
    PERFORM pg_notify('bidding_events', jsonb_build_object('lot_id', l.lot_id, 'version', l.version + 1, 'closed', true, 'outcome', v_out)::text);
    lot_id := l.lot_id; outcome := v_out; RETURN NEXT;
  END LOOP;

  FOR a_id IN SELECT x.auction_id FROM bidding_auctions x WHERE x.status IN ('bidding', 'closing')
              AND NOT EXISTS (SELECT 1 FROM bidding_lots y WHERE y.auction_id = x.auction_id AND y.state IN ('approved', 'open'))
              FOR UPDATE SKIP LOCKED LOOP
    UPDATE bidding_auctions SET status = 'closed', updated_at = now() WHERE auction_id = a_id;
    PERFORM bidding_log_event(NULL, a_id, NULL, 'auction_closed', jsonb_build_object('closed_at', clock_timestamp()));
  END LOOP;
END $$;
