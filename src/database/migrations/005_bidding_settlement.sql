-- Расчёты после торгов: отметки куратора (docs/AUCTION-DESIGN.md, 4.1.2 и 4.1.3).
--
-- Лот после продажи: sold_awaiting_payment → paid → handed_over → settled; не оплачен в срок — sold_awaiting_payment → defaulted.
-- Аукцион: closed → settled → archived. Сами деньги (приём платежа, возврат задатка, удержание, выплата продавцу) здесь не ведутся:
-- это отметки о том, что куратор их выполнил вручную, с записью в журнал. Срок оплаты, удержание задатка и повторные торги — решения
-- владельца и юриста (раздел 8 проекта), поэтому автоматических переходов по времени нет.

CREATE FUNCTION bidding_set_lot_settlement(p_lot BIGINT, p_actor INTEGER, p_to TEXT, p_note TEXT DEFAULT NULL) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE l bidding_lots%ROWTYPE;
BEGIN
  SELECT * INTO l FROM bidding_lots WHERE lot_id = p_lot FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'no_such_lot'); END IF;
  IF NOT ((l.state = 'sold_awaiting_payment' AND p_to IN ('paid', 'defaulted'))
       OR (l.state = 'paid' AND p_to = 'handed_over')
       OR (l.state = 'handed_over' AND p_to = 'settled')) THEN
    RETURN jsonb_build_object('status', 'rejected', 'reason', 'wrong_transition', 'from', l.state, 'to', p_to);
  END IF;
  IF p_to = 'defaulted' AND (p_note IS NULL OR btrim(p_note) = '') THEN
    RETURN jsonb_build_object('status', 'rejected', 'reason', 'reason_required');
  END IF;
  UPDATE bidding_lots SET state = p_to, version = version + 1, updated_at = now() WHERE lot_id = p_lot;
  PERFORM bidding_log_event(p_lot, l.auction_id, p_actor, 'lot_settlement',
          jsonb_build_object('from', l.state, 'to', p_to, 'note', nullif(btrim(coalesce(p_note, '')), ''), 'hammer_kop', l.hammer_kop, 'winner', l.winner_user_id));
  PERFORM pg_notify('bidding_events', jsonb_build_object('lot_id', p_lot, 'version', l.version + 1, 'settlement', p_to)::text);
  RETURN jsonb_build_object('status', 'updated', 'state', p_to, 'version', l.version + 1);
END $$;

CREATE FUNCTION bidding_set_auction_status(p_auction BIGINT, p_actor INTEGER, p_to TEXT, p_note TEXT DEFAULT NULL) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE a bidding_auctions%ROWTYPE; v_open INTEGER;
BEGIN
  SELECT * INTO a FROM bidding_auctions WHERE auction_id = p_auction FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'no_such_auction'); END IF;
  IF NOT ((a.status = 'closed' AND p_to = 'settled') OR (a.status = 'settled' AND p_to = 'archived')) THEN
    RETURN jsonb_build_object('status', 'rejected', 'reason', 'wrong_transition', 'from', a.status, 'to', p_to);
  END IF;
  IF p_to = 'settled' THEN       -- расчёты не завершены, пока есть проданные лоты без отметки «расчёты завершены»
    SELECT count(*) INTO v_open FROM bidding_lots WHERE auction_id = p_auction AND state IN ('sold_awaiting_payment', 'paid', 'handed_over');
    IF v_open > 0 THEN RETURN jsonb_build_object('status', 'rejected', 'reason', 'lots_unsettled', 'lots', v_open); END IF;
  END IF;
  UPDATE bidding_auctions SET status = p_to, updated_at = now() WHERE auction_id = p_auction;
  PERFORM bidding_log_event(NULL, p_auction, p_actor, 'auction_status',
          jsonb_build_object('from', a.status, 'to', p_to, 'note', nullif(btrim(coalesce(p_note, '')), '')));
  RETURN jsonb_build_object('status', 'updated', 'auction_status', p_to);
END $$;
