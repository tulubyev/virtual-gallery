-- Аннулирование ставки куратором (docs/AUCTION-DESIGN.md, 4.1.5: «любое снятие лота или аннулирование ставки — в журнал с причиной»).
--
-- bidding_bids остаётся неизменяемой: аннулирование — отдельная запись в bidding_bid_annulments (тоже только вставки), а состояние лота
-- (цена, лидер, его максимум, число ставок) пересчитывается заново по оставшимся принятым ставкам тем же алгоритмом, что у bidding_place_bid.
-- Время закрытия лота не возвращается назад: продление, вызванное аннулированной ставкой, остаётся (участники ставили, видя этот срок).
-- Аннулировать можно только ставку в лоте, где идут торги; после закрытия — вопрос исхода торгов, он решается отдельно (см. PR).

CREATE TABLE bidding_bid_annulments (
  bid_id        BIGINT PRIMARY KEY REFERENCES bidding_bids(bid_id),
  lot_id        BIGINT NOT NULL REFERENCES bidding_lots(lot_id),
  actor_user_id INTEGER NOT NULL REFERENCES users(user_id),
  reason        TEXT NOT NULL CHECK (btrim(reason) <> ''),
  before_state  JSONB NOT NULL,                  -- цена, лидер, максимум лидера, число ставок до аннулирования
  after_state   JSONB NOT NULL,                  -- то же после пересчёта
  created_at    TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);
CREATE INDEX bidding_bid_annulments_lot_idx ON bidding_bid_annulments (lot_id);
CREATE TRIGGER bidding_bid_annulments_ro BEFORE UPDATE OR DELETE ON bidding_bid_annulments FOR EACH ROW EXECUTE FUNCTION bidding_forbid_mutation();

-- Состояние лота по принятым неаннулированным ставкам (кроме p_exclude). Повторяет ветки bidding_place_bid; тест сверяет оба пути.
CREATE FUNCTION bidding_replay_lot(p_lot BIGINT, p_exclude BIGINT DEFAULT NULL)
RETURNS TABLE(price_kop BIGINT, leader_user_id INTEGER, leader_max_kop BIGINT, bid_count INTEGER) LANGUAGE plpgsql STABLE AS $$
DECLARE
  l bidding_lots%ROWTYPE; a bidding_auctions%ROWTYPE; b RECORD; v_table BIGINT;
  v_price BIGINT := 0; v_leader INTEGER; v_lmax BIGINT; v_count INTEGER := 0; v_is_leader BOOLEAN;
BEGIN
  SELECT * INTO l FROM bidding_lots WHERE lot_id = p_lot;
  SELECT * INTO a FROM bidding_auctions WHERE auction_id = l.auction_id;
  v_table := coalesce(l.increments_id, a.increments_id);
  FOR b IN SELECT x.user_id, x.max_kop FROM bidding_bids x
            WHERE x.lot_id = p_lot AND x.accepted AND x.bid_id IS DISTINCT FROM p_exclude
              AND NOT EXISTS (SELECT 1 FROM bidding_bid_annulments n WHERE n.bid_id = x.bid_id)
            ORDER BY x.bid_id LOOP
    IF v_count = 0 THEN
      v_price := l.start_price_kop; v_is_leader := true;
    ELSIF v_leader = b.user_id THEN
      v_is_leader := true;                                                  -- лидер поднимает максимум: цена не меняется
    ELSIF b.max_kop <= v_lmax THEN
      v_is_leader := false; v_price := least(v_lmax, b.max_kop + bidding_increment(v_table, b.max_kop));
    ELSE
      v_is_leader := true; v_price := least(b.max_kop, v_lmax + bidding_increment(v_table, v_lmax));
    END IF;
    IF l.reserve_kop IS NOT NULL AND v_price < l.reserve_kop
       AND (CASE WHEN v_is_leader THEN b.max_kop ELSE v_lmax END) >= l.reserve_kop THEN
      v_price := l.reserve_kop;
    END IF;
    IF v_is_leader THEN v_leader := b.user_id; v_lmax := b.max_kop; END IF;
    v_count := v_count + 1;
  END LOOP;
  price_kop := CASE WHEN v_count = 0 THEN 0 ELSE v_price END;
  leader_user_id := v_leader; leader_max_kop := v_lmax; bid_count := v_count;
  RETURN NEXT;
END $$;

-- Аннулировать принятую ставку (причина обязательна): пересчитать лот, записать в журнал, оповестить подписчиков.
CREATE FUNCTION bidding_annul_bid(p_bid BIGINT, p_actor INTEGER, p_reason TEXT) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE b bidding_bids%ROWTYPE; l bidding_lots%ROWTYPE; r RECORD; v_before JSONB; v_after JSONB;
BEGIN
  IF p_reason IS NULL OR btrim(p_reason) = '' THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'reason_required'); END IF;
  SELECT * INTO b FROM bidding_bids WHERE bid_id = p_bid;
  IF NOT FOUND THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'no_such_bid'); END IF;
  SELECT * INTO l FROM bidding_lots WHERE lot_id = b.lot_id FOR UPDATE;                  -- сериализация с новыми ставками и закрытием
  IF EXISTS (SELECT 1 FROM bidding_bid_annulments WHERE bid_id = p_bid) THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'already_annulled'); END IF;
  IF NOT b.accepted THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'bid_not_accepted'); END IF;
  IF l.state <> 'open' OR clock_timestamp() >= l.ends_at THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'lot_not_open'); END IF;

  SELECT * INTO r FROM bidding_replay_lot(b.lot_id, p_bid);
  v_before := jsonb_build_object('price_kop', l.current_price_kop, 'leader_user_id', l.leader_user_id, 'leader_max_kop', l.leader_max_kop, 'bid_count', l.bid_count);
  v_after  := jsonb_build_object('price_kop', r.price_kop, 'leader_user_id', r.leader_user_id, 'leader_max_kop', r.leader_max_kop, 'bid_count', r.bid_count);

  INSERT INTO bidding_bid_annulments (bid_id, lot_id, actor_user_id, reason, before_state, after_state)
  VALUES (p_bid, b.lot_id, p_actor, btrim(p_reason), v_before, v_after);
  UPDATE bidding_lots SET current_price_kop = r.price_kop, leader_user_id = r.leader_user_id, leader_max_kop = r.leader_max_kop,
         bid_count = r.bid_count, version = version + 1, updated_at = now()
   WHERE lot_id = b.lot_id;
  PERFORM bidding_log_event(b.lot_id, l.auction_id, p_actor, 'bid_annulled',
          jsonb_build_object('bid_id', p_bid, 'bid_user_id', b.user_id, 'reason', btrim(p_reason), 'before', v_before, 'after', v_after));
  PERFORM pg_notify('bidding_events', jsonb_build_object('lot_id', b.lot_id, 'version', l.version + 1, 'price_kop', r.price_kop,
                    'bid_count', r.bid_count, 'ends_at', l.ends_at)::text);
  RETURN jsonb_build_object('status', 'annulled', 'version', l.version + 1, 'price_kop', r.price_kop,
                            'leader_user_id', r.leader_user_id, 'bid_count', r.bid_count);
END $$;

-- Закрытие лотов: «число участников» (ст. 447 п. 5 ГК) считается без аннулированных ставок. Остальное — как в 001.
CREATE OR REPLACE FUNCTION bidding_close_due_lots(p_limit INTEGER DEFAULT 50) RETURNS TABLE(lot_id BIGINT, outcome TEXT)
LANGUAGE plpgsql AS $$
DECLARE l bidding_lots%ROWTYPE; v_out TEXT; v_min SMALLINT; v_bidders INTEGER; a_id BIGINT;
BEGIN
  FOR l IN SELECT * FROM bidding_lots x WHERE x.state = 'open' AND x.ends_at <= clock_timestamp()
           ORDER BY x.ends_at FOR UPDATE SKIP LOCKED LIMIT p_limit LOOP
    SELECT a.min_bidders INTO v_min FROM bidding_auctions a WHERE a.auction_id = l.auction_id;
    SELECT count(DISTINCT b.user_id) INTO v_bidders FROM bidding_bids b
     WHERE b.lot_id = l.lot_id AND b.accepted AND NOT EXISTS (SELECT 1 FROM bidding_bid_annulments n WHERE n.bid_id = b.bid_id);
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
