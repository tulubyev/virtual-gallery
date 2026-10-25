// Расчёты после торгов на настоящем PostgreSQL: переходы состояний лота и аукциона, журнал, запрещённые переходы.
import { describeDb, createHarness, Harness } from './biddingHarness';

describeDb('расчёты после торгов (PostgreSQL)', () => {
  let h: Harness;
  let alice: number, bob: number, curator: number;

  beforeAll(async () => {
    h = await createHarness();
    await h.reset();
    [alice, bob, curator] = [await h.user('alice'), await h.user('bob'), await h.user('curator', 'curator')];
    for (const id of [alice, bob]) await h.participant(id);
  });
  afterAll(async () => { await h.close(); });

  /** Аукцион с лотами, закрытый: у каждого лота своя судьба (продан или нет). */
  async function closedAuction(sold: boolean[]) {
    const { auctionId, lotIds } = await h.openAuction({ lots: sold.map(() => ({ startRub: 10000 })), staggerS: 0 });
    for (const id of [alice, bob]) await h.admit(auctionId, id);
    for (const [i, lotId] of lotIds.entries()) {
      if (sold[i]) { await h.bid(lotId, alice, 30000); await h.bid(lotId, bob, 20000); }
      await h.q(`UPDATE bidding_lots SET ends_at = now() - interval '1 second' WHERE lot_id = $1`, [lotId]);
    }
    await h.q('SELECT * FROM bidding_close_due_lots(50)');
    return { auctionId, lotIds };
  }
  const settle = async (lotId: number, to: string, note: string | null = null) =>
    (await h.q('SELECT bidding_set_lot_settlement($1, $2, $3, $4) AS r', [lotId, curator, to, note]))[0].r;
  const status = async (auctionId: number, to: string, note: string | null = null) =>
    (await h.q('SELECT bidding_set_auction_status($1, $2, $3, $4) AS r', [auctionId, curator, to, note]))[0].r;
  const auctionStatus = async (id: number) => (await h.q('SELECT status FROM bidding_auctions WHERE auction_id = $1', [id]))[0].status;

  describe('лот', () => {
    it('проданный лот проходит оплата → передача → расчёты завершены; каждая отметка в журнале с автором и примечанием', async () => {
      const { lotIds: [lotId] } = await closedAuction([true]);
      const start = await h.lot(lotId);
      expect(start.state).toBe('sold_awaiting_payment');
      expect(await settle(lotId, 'paid', 'платёж получен 12.11')).toMatchObject({ status: 'updated', state: 'paid', version: start.version + 1 });
      expect(await settle(lotId, 'handed_over')).toMatchObject({ state: 'handed_over' });
      expect(await settle(lotId, 'settled', '  ')).toMatchObject({ state: 'settled' });
      const events = await h.q(`SELECT actor_user_id, payload FROM bidding_events WHERE lot_id = $1 AND event_type = 'lot_settlement' ORDER BY event_id`, [lotId]);
      expect(events.map((e: any) => [e.payload.from, e.payload.to, e.payload.note])).toEqual([
        ['sold_awaiting_payment', 'paid', 'платёж получен 12.11'], ['paid', 'handed_over', null], ['handed_over', 'settled', null]]);
      expect(events.every((e: any) => e.actor_user_id === curator)).toBe(true);
      expect(events[0].payload).toMatchObject({ hammer_kop: 2_200_000, winner: alice });
      expect((await h.q('SELECT * FROM bidding_verify_chain($1)', [lotId]))[0]).toMatchObject({ ok: true });
      expect((await h.lot(lotId)).hammer_kop).toBe(start.hammer_kop);                  // итог торгов не меняется
    });

    it('неоплата: причина обязательна; дальше лот не движется', async () => {
      const { lotIds: [lotId] } = await closedAuction([true]);
      expect(await settle(lotId, 'defaulted')).toMatchObject({ status: 'rejected', reason: 'reason_required' });
      expect(await settle(lotId, 'defaulted', '   ')).toMatchObject({ reason: 'reason_required' });
      expect(await settle(lotId, 'defaulted', 'не оплатил в срок')).toMatchObject({ status: 'updated', state: 'defaulted' });
      for (const to of ['paid', 'handed_over', 'settled', 'defaulted']) expect(await settle(lotId, to, 'x')).toMatchObject({ reason: 'wrong_transition', from: 'defaulted' });
    });

    it('запрещённые переходы: пропуск шага, возврат назад, чужое состояние, неизвестная цель, несуществующий лот', async () => {
      const { lotIds: [sold] } = await closedAuction([true]);
      expect(await settle(sold, 'handed_over')).toMatchObject({ reason: 'wrong_transition', from: 'sold_awaiting_payment' });
      expect(await settle(sold, 'settled')).toMatchObject({ reason: 'wrong_transition' });
      expect(await settle(sold, 'sold_awaiting_payment')).toMatchObject({ reason: 'wrong_transition' });
      expect(await settle(sold, 'open')).toMatchObject({ reason: 'wrong_transition' });
      await settle(sold, 'paid');
      expect(await settle(sold, 'paid')).toMatchObject({ reason: 'wrong_transition', from: 'paid' });
      expect(await settle(sold, 'defaulted', 'поздно')).toMatchObject({ reason: 'wrong_transition' });
      expect(await settle(999_999_999, 'paid')).toMatchObject({ reason: 'no_such_lot' });

      const { lotIds: [unsold] } = await closedAuction([false]);                         // торги без ставок
      expect(await settle(unsold, 'paid')).toMatchObject({ reason: 'wrong_transition', from: 'unsold' });
      const { auctionId, lotIds: [open] } = await h.openAuction();                       // идут торги
      expect(await settle(open, 'paid')).toMatchObject({ reason: 'wrong_transition', from: 'open' });
      expect(await auctionStatus(auctionId)).toBe('bidding');
    });

    it('отметка поднимает версию лота: опрос клиентов видит изменение', async () => {
      const { lotIds: [lotId] } = await closedAuction([true]);
      const before = (await h.lot(lotId)).version;
      await settle(lotId, 'paid');
      expect((await h.lot(lotId)).version).toBe(before + 1);
    });
  });

  describe('аукцион', () => {
    it('расчёты завершаются только когда по всем проданным лотам они завершены (неоплаченный лот не мешает)', async () => {
      const { auctionId, lotIds: [a, b, c, none] } = await closedAuction([true, true, true, false]);
      expect(await auctionStatus(auctionId)).toBe('closed');
      expect(await status(auctionId, 'settled')).toMatchObject({ status: 'rejected', reason: 'lots_unsettled', lots: 3 });
      await settle(a, 'paid'); await settle(a, 'handed_over'); await settle(a, 'settled');
      await settle(b, 'paid'); await settle(b, 'handed_over');                               // передан, но расчёты не завершены
      await settle(c, 'defaulted', 'не оплатил в срок');                                      // конец пути для неоплаченного
      expect(await status(auctionId, 'settled')).toMatchObject({ status: 'rejected', reason: 'lots_unsettled', lots: 1 });
      expect(await auctionStatus(auctionId)).toBe('closed');
      await settle(b, 'settled');
      expect(await status(auctionId, 'settled')).toMatchObject({ status: 'updated' });
      expect((await h.lot(none)).state).toBe('unsold');
    });

    it('если все проданные лоты закончили расчёты (или не проданы), аукцион можно закрыть расчётами и убрать в архив', async () => {
      const { auctionId, lotIds: [sold, unsold] } = await closedAuction([true, false]);
      await settle(sold, 'paid'); await settle(sold, 'handed_over'); await settle(sold, 'settled');
      expect(await status(auctionId, 'archived')).toMatchObject({ reason: 'wrong_transition', from: 'closed' });
      expect(await status(auctionId, 'settled', 'возвраты задатков выполнены')).toMatchObject({ status: 'updated', auction_status: 'settled' });
      expect(await auctionStatus(auctionId)).toBe('settled');
      expect(await status(auctionId, 'settled')).toMatchObject({ reason: 'wrong_transition', from: 'settled' });
      expect(await status(auctionId, 'archived')).toMatchObject({ status: 'updated', auction_status: 'archived' });
      expect(await status(auctionId, 'closed')).toMatchObject({ reason: 'wrong_transition', from: 'archived' });
      const events = await h.q(`SELECT payload FROM bidding_events WHERE auction_id = $1 AND event_type = 'auction_status' ORDER BY event_id`, [auctionId]);
      expect(events.map((e: any) => [e.payload.from, e.payload.to, e.payload.note])).toEqual([['closed', 'settled', 'возвраты задатков выполнены'], ['settled', 'archived', null]]);
      expect((await h.q('SELECT * FROM bidding_verify_chain($1)', [-auctionId]))[0]).toMatchObject({ ok: true });
      expect(unsold).toBeDefined();
    });

    it('аукцион, где никто ничего не купил, закрывается расчётами сразу; идущие торги — нельзя', async () => {
      const { auctionId } = await closedAuction([false, false]);
      expect(await status(auctionId, 'settled')).toMatchObject({ status: 'updated' });
      const live = await h.openAuction();
      expect(await status(live.auctionId, 'settled')).toMatchObject({ reason: 'wrong_transition', from: 'bidding' });
      expect(await status(999_999_999, 'settled')).toMatchObject({ reason: 'no_such_auction' });
    });
  });
});
