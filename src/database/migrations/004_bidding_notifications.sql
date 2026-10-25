-- Уведомления участникам торгов (docs/AUCTION-DESIGN.md, 4.1.1: «таблица notification_outbox, запись в той же транзакции, что и ставка;
-- отправщик берёт SKIP LOCKED, повторы с паузой»). Одна таблица служит и очередью отправки, и лентой в кабинете участника:
-- лента работает без внешних провайдеров, отправка по e-mail или SMS включается отдельно (канал и провайдера выбирает владелец).
--
-- Записи создаются триггерами в той же транзакции, что и событие (ставка, закрытие лота, решение по заявке), поэтому откат ставки
-- не оставляет уведомления, а функции торгов не меняются. В уведомлениях нет чужих максимумов, резерва и личных данных других участников.

CREATE TABLE bidding_notifications (
  notification_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id         INTEGER NOT NULL REFERENCES users(user_id),
  kind            TEXT NOT NULL CHECK (kind IN
                    ('outbid', 'lot_won', 'lot_lost', 'lot_unsold', 'lot_withdrawn', 'registration_approved', 'registration_rejected', 'bid_annulled')),
  lot_id          BIGINT REFERENCES bidding_lots(lot_id),
  auction_id      BIGINT NOT NULL REFERENCES bidding_auctions(auction_id),
  dedupe_key      TEXT NOT NULL UNIQUE,                        -- повторная запись того же события не создаёт второе уведомление
  data            JSONB NOT NULL,                              -- что показать: название лота, цена, адрес аукциона (на момент события)
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  read_at         TIMESTAMPTZ,
  delivery_status TEXT NOT NULL DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'sent', 'failed', 'expired')),
  attempts        INTEGER NOT NULL DEFAULT 0,
  next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_error      TEXT,
  sent_at         TIMESTAMPTZ
);
CREATE INDEX bidding_notifications_user_idx ON bidding_notifications (user_id, notification_id DESC);
CREATE INDEX bidding_notifications_due_idx ON bidding_notifications (next_attempt_at) WHERE delivery_status = 'pending';

-- Перебили ставку: лидер лота сменился при новой принятой ставке. Возврат лидерства после аннулирования ставки (число ставок
-- уменьшается) уведомлением «вас перебили» не считается.
CREATE FUNCTION bidding_notify_outbid() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO bidding_notifications (user_id, kind, lot_id, auction_id, dedupe_key, data)
  VALUES (OLD.leader_user_id, 'outbid', NEW.lot_id, NEW.auction_id, 'outbid:' || NEW.lot_id || ':' || NEW.version || ':' || OLD.leader_user_id,
          jsonb_build_object('lot_no', NEW.lot_no, 'title', NEW.snapshot->>'title', 'price_kop', NEW.current_price_kop, 'ends_at', NEW.ends_at,
                             'auction_slug', (SELECT slug FROM bidding_auctions WHERE auction_id = NEW.auction_id)))
  ON CONFLICT (dedupe_key) DO NOTHING;
  RETURN NULL;
END $$;
CREATE TRIGGER bidding_lots_outbid AFTER UPDATE ON bidding_lots FOR EACH ROW
  WHEN (NEW.bid_count > OLD.bid_count AND OLD.leader_user_id IS NOT NULL AND NEW.leader_user_id IS DISTINCT FROM OLD.leader_user_id)
  EXECUTE FUNCTION bidding_notify_outbid();

-- Остальные уведомления порождают события журнала: закрытие и снятие лота, решение по заявке, аннулирование ставки.
CREATE FUNCTION bidding_notify_from_event() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  l bidding_lots%ROWTYPE; a bidding_auctions%ROWTYPE; v_data JSONB; r RECORD; v_outcome TEXT; v_winner INTEGER; v_kind TEXT; v_user INTEGER;
BEGIN
  SELECT * INTO a FROM bidding_auctions WHERE auction_id = NEW.auction_id;
  IF NEW.lot_id IS NOT NULL THEN SELECT * INTO l FROM bidding_lots WHERE lot_id = NEW.lot_id; END IF;

  IF NEW.event_type IN ('lot_closed', 'lot_withdrawn') THEN
    v_outcome := CASE WHEN NEW.event_type = 'lot_closed' THEN NEW.payload->>'outcome' END;
    v_winner  := CASE WHEN v_outcome = 'sold' THEN (NEW.payload->>'winner')::integer END;
    v_data := jsonb_build_object('lot_no', l.lot_no, 'title', l.snapshot->>'title', 'auction_slug', a.slug, 'outcome', v_outcome,
                                 'hammer_kop', CASE WHEN v_outcome = 'sold' THEN (NEW.payload->>'hammer_kop')::bigint END);
    FOR r IN SELECT DISTINCT b.user_id FROM bidding_bids b WHERE b.lot_id = NEW.lot_id AND b.accepted LOOP
      v_kind := CASE WHEN NEW.event_type = 'lot_withdrawn' THEN 'lot_withdrawn'
                     WHEN v_outcome = 'sold' AND r.user_id = v_winner THEN 'lot_won'
                     WHEN v_outcome = 'sold' THEN 'lot_lost'
                     ELSE 'lot_unsold' END;
      INSERT INTO bidding_notifications (user_id, kind, lot_id, auction_id, dedupe_key, data)
      VALUES (r.user_id, v_kind, NEW.lot_id, NEW.auction_id, v_kind || ':e' || NEW.event_id || ':' || r.user_id, v_data)
      ON CONFLICT (dedupe_key) DO NOTHING;
    END LOOP;

  ELSIF NEW.event_type IN ('registration_approved', 'registration_rejected') THEN
    v_user := (NEW.payload->>'user_id')::integer;
    v_data := jsonb_build_object('auction_slug', a.slug, 'auction_title', a.title, 'pseudonym_no', NEW.payload->'pseudonym_no', 'limit_kop', NEW.payload->'limit_kop');
    INSERT INTO bidding_notifications (user_id, kind, lot_id, auction_id, dedupe_key, data)
    VALUES (v_user, NEW.event_type, NULL, NEW.auction_id, NEW.event_type || ':e' || NEW.event_id || ':' || v_user, v_data)
    ON CONFLICT (dedupe_key) DO NOTHING;

  ELSIF NEW.event_type = 'bid_annulled' THEN
    v_user := (NEW.payload->>'bid_user_id')::integer;
    v_data := jsonb_build_object('lot_no', l.lot_no, 'title', l.snapshot->>'title', 'auction_slug', a.slug);
    INSERT INTO bidding_notifications (user_id, kind, lot_id, auction_id, dedupe_key, data)
    VALUES (v_user, 'bid_annulled', NEW.lot_id, NEW.auction_id, 'bid_annulled:e' || NEW.event_id || ':' || v_user, v_data)
    ON CONFLICT (dedupe_key) DO NOTHING;
  END IF;
  RETURN NULL;
END $$;
CREATE TRIGGER bidding_events_notify AFTER INSERT ON bidding_events FOR EACH ROW
  WHEN (NEW.event_type IN ('lot_closed', 'lot_withdrawn', 'registration_approved', 'registration_rejected', 'bid_annulled'))
  EXECUTE FUNCTION bidding_notify_from_event();
