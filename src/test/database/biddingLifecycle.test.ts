// Жизненный цикл аукциона на настоящем PostgreSQL: объявление, допуск участников, снятие лота, ограничения схемы.
import { describeDb, createHarness, rub, Harness } from './biddingHarness';

describeDb('аукцион: объявление, допуск, снятие лота (PostgreSQL)', () => {
  let h: Harness;
  let admin: number, alice: number, bob: number, pending: number;

  beforeAll(async () => {
    h = await createHarness();
    await h.reset();
    [admin, alice, bob, pending] = [await h.user('admin'), await h.user('alice'), await h.user('bob'), await h.user('pending')];
    await h.participant(alice);
    await h.participant(bob);
    await h.participant(pending, 'pending');
  });
  afterAll(async () => { await h.close(); });

  const newAuction = async (patch: Record<string, string> = {}) => {
    const fields: Record<string, string> = {
      notice_days: '30', bidding_opens_at: "now() + interval '31 days'", first_close_at: "now() + interval '45 days'",
      hard_close_at: "now() + interval '46 days'", ...patch,
    };
    const cols = Object.keys(fields);
    const slug = `lc-${Math.random().toString(36).slice(2, 10)}`;
    const [{ auction_id }] = await h.q(
      `INSERT INTO bidding_auctions (slug, title, increments_id, ${cols.join(', ')})
       VALUES ($1, 'Аукцион', (SELECT table_id FROM bidding_increment_tables WHERE name='default'), ${cols.map(c => fields[c]).join(', ')})
       RETURNING auction_id`, [slug]);
    return Number(auction_id);
  };
  const addLot = async (auctionId: number, no: number, extra: { artworkId?: number } = {}) =>
    Number((await h.q(
      `INSERT INTO bidding_lots (auction_id, lot_no, artwork_id, snapshot, start_price_kop) VALUES ($1, $2, $3, '{"title":"x"}', $4) RETURNING lot_id`,
      [auctionId, no, extra.artworkId ?? null, rub(5000)]))[0].lot_id);
  const announce = async (auctionId: number) => (await h.q('SELECT bidding_announce($1, $2) AS r', [auctionId, admin]))[0].r;

  describe('объявление аукциона', () => {
    it('с лотами и датами за 30+ дней — принимается; лоты становятся «approved», событие в журнале', async () => {
      const a = await newAuction();
      await addLot(a, 1); await addLot(a, 2);
      expect(await announce(a)).toMatchObject({ status: 'announced', lots: 2 });
      expect((await h.q('SELECT state FROM bidding_lots WHERE auction_id = $1', [a])).map((r: any) => r.state)).toEqual(['approved', 'approved']);
      const [event] = await h.q(`SELECT event_type, actor_user_id FROM bidding_events WHERE chain_key = $1`, [-a]);
      expect(event).toEqual({ event_type: 'auction_announced', actor_user_id: admin });
      expect((await h.q('SELECT notice_published_at FROM bidding_auctions WHERE auction_id = $1', [a]))[0].notice_published_at).not.toBeNull();
    });

    it('срок извещения короче notice_days — отказ (ст. 448 п. 2 ГК); notice_days = 0 разрешает', async () => {
      const a = await newAuction({ bidding_opens_at: "now() + interval '10 days'", first_close_at: "now() + interval '20 days'", hard_close_at: "now() + interval '21 days'" });
      await addLot(a, 1);
      expect(await announce(a)).toMatchObject({ status: 'rejected', reason: 'notice_too_short', notice_days: 30 });
      await h.q('UPDATE bidding_auctions SET notice_days = 0 WHERE auction_id = $1', [a]);
      expect(await announce(a)).toMatchObject({ status: 'announced' });
    });

    it('отказы: нет дат, нет лотов, закрытие раньше открытия, регистрация после открытия, hard_close раньше последнего лота, не черновик', async () => {
      const noDates = await newAuction({ hard_close_at: 'NULL' });
      await addLot(noDates, 1);
      expect(await announce(noDates)).toMatchObject({ reason: 'dates_missing' });

      const noLots = await newAuction();
      expect(await announce(noLots)).toMatchObject({ reason: 'no_lots' });

      const backwards = await newAuction({ first_close_at: "now() + interval '31 days'" });
      await addLot(backwards, 1);
      expect(await announce(backwards)).toMatchObject({ reason: 'close_before_open' });

      const lateReg = await newAuction({ registration_closes_at: "now() + interval '40 days'" });
      await addLot(lateReg, 1);
      expect(await announce(lateReg)).toMatchObject({ reason: 'registration_after_open' });

      const shortHard = await newAuction({ hard_close_at: "now() + interval '45 days' + interval '30 seconds'" });
      await addLot(shortHard, 1); await addLot(shortHard, 2); await addLot(shortHard, 3);            // 3 лота × шаг 60 с > 30 с запаса
      expect(await announce(shortHard)).toMatchObject({ reason: 'hard_close_too_early' });

      const ok = await newAuction();
      await addLot(ok, 1);
      await announce(ok);
      expect(await announce(ok)).toMatchObject({ reason: 'not_draft' });
      expect(await h.q('SELECT bidding_announce(999999, NULL) AS r')).toEqual([{ r: { status: 'rejected', reason: 'no_such_auction' } }]);
    });

    it('открытие торгов только когда наступило время; лоты закрываются со сдвигом', async () => {
      const a = await newAuction();
      const l1 = await addLot(a, 1); const l2 = await addLot(a, 2);
      await announce(a);
      expect(await h.q('SELECT * FROM bidding_open_due_auctions()')).toEqual([]);                  // ещё рано
      await h.q(`UPDATE bidding_auctions SET bidding_opens_at = now() - interval '1 second' WHERE auction_id = $1`, [a]);
      expect((await h.q('SELECT * FROM bidding_open_due_auctions()')).map((r: any) => Number(r.bidding_open_due_auctions))).toContain(a);
      const lots = await h.q('SELECT lot_id, state, ends_at FROM bidding_lots WHERE auction_id = $1 ORDER BY lot_no', [a]);
      expect(lots.map((l: any) => l.state)).toEqual(['open', 'open']);
      expect(+new Date(lots[1].ends_at) - +new Date(lots[0].ends_at)).toBe(60_000);
      expect([Number(lots[0].lot_id), Number(lots[1].lot_id)]).toEqual([l1, l2]);
      expect(await h.q('SELECT * FROM bidding_open_due_auctions()')).toEqual([]);                  // повторно ничего не открывает
    });

    it('описание лота нельзя менять после объявления, хеш пересчитывается только у черновика', async () => {
      const a = await newAuction();
      const lot = await addLot(a, 1);
      const [{ content_sha256: before }] = await h.q('SELECT content_sha256 FROM bidding_lots WHERE lot_id = $1', [lot]);
      await h.q(`UPDATE bidding_lots SET snapshot = '{"title":"другое"}' WHERE lot_id = $1`, [lot]);
      const [{ content_sha256: after }] = await h.q('SELECT content_sha256 FROM bidding_lots WHERE lot_id = $1', [lot]);
      expect(Buffer.compare(before, after)).not.toBe(0);
      await announce(a);
      await expect(h.q(`UPDATE bidding_lots SET snapshot = '{"title":"подмена"}' WHERE lot_id = $1`, [lot])).rejects.toThrow(/cannot be changed/);
    });

    it('одна работа не может быть в двух активных лотах', async () => {
      const [{ artwork_id }] = await h.q(`INSERT INTO artworks (title) VALUES ('Картина') RETURNING artwork_id`);
      const a1 = await newAuction(); const a2 = await newAuction();
      await addLot(a1, 1, { artworkId: artwork_id }); await addLot(a2, 1, { artworkId: artwork_id });
      await announce(a1);
      await expect(announce(a2)).rejects.toThrow(/bidding_lots_artwork_active_uq/);
    });
  });

  describe('допуск участников', () => {
    const application = async (auctionId: number, userId: number) =>
      h.q(`INSERT INTO bidding_registrations (auction_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [auctionId, userId]);
    const decide = async (auctionId: number, userId: number, approve: boolean, limitRub: number | null = 100000, reason: string | null = null) =>
      (await h.q('SELECT bidding_decide_registration($1, $2, $3, $4, $5, $6) AS r', [auctionId, userId, approve, limitRub === null ? null : rub(limitRub), admin, reason]))[0].r;

    it('допуск даёт номер участника по порядку и лимит; повторное решение номер сохраняет', async () => {
      const a = await newAuction();
      await application(a, alice); await application(a, bob);
      expect(await decide(a, alice, true, 50000)).toMatchObject({ status: 'approved', pseudonym_no: 1, limit_kop: rub(50000) });
      expect(await decide(a, bob, true)).toMatchObject({ pseudonym_no: 2 });
      expect(await decide(a, alice, true, 70000)).toMatchObject({ pseudonym_no: 1, limit_kop: rub(70000) });
      const events = await h.q(`SELECT event_type FROM bidding_events WHERE chain_key = $1 ORDER BY event_id`, [-a]);
      expect(events.map((e: any) => e.event_type)).toEqual(['registration_approved', 'registration_approved', 'registration_approved']);
    });

    it('без одобренной проверки личности допуск невозможен; без лимита — тоже; нет заявки — отказ', async () => {
      const a = await newAuction();
      await application(a, pending);
      expect(await decide(a, pending, true)).toMatchObject({ status: 'rejected', reason: 'kyc_not_approved' });
      await application(a, alice);
      expect(await decide(a, alice, true, null)).toMatchObject({ reason: 'limit_required' });
      expect(await decide(a, alice, true, 0)).toMatchObject({ reason: 'limit_required' });
      expect(await decide(a, bob, true)).toMatchObject({ reason: 'no_application' });
    });

    it('отклонение обнуляет лимит и пишет причину в журнал; допущенный потом отклонённый ставить не может', async () => {
      const a = await newAuction();
      await application(a, alice);
      await decide(a, alice, true);
      expect(await decide(a, alice, false, null, 'не прошёл проверку')).toMatchObject({ status: 'rejected_registration' });
      expect((await h.q(`SELECT status, limit_kop, reason FROM bidding_registrations WHERE auction_id = $1`, [a]))[0])
        .toEqual({ status: 'rejected', limit_kop: '0', reason: 'не прошёл проверку' });
      const [last] = await h.q(`SELECT event_type, payload FROM bidding_events WHERE chain_key = $1 ORDER BY event_id DESC LIMIT 1`, [-a]);
      expect(last).toMatchObject({ event_type: 'registration_rejected', payload: { user_id: alice, reason: 'не прошёл проверку' } });
    });

    it('после окончания аукциона решения не принимаются', async () => {
      const a = await newAuction();
      await application(a, alice);
      await h.q(`UPDATE bidding_auctions SET status = 'closed' WHERE auction_id = $1`, [a]);
      expect(await decide(a, alice, true)).toMatchObject({ reason: 'auction_over' });
    });
  });

  describe('снятие лота', () => {
    it('причина обязательна; лот снимается, ставки остаются в журнале', async () => {
      const { auctionId, lotIds } = await h.openAuction({ lots: [{}, {}] });
      await h.admit(auctionId, alice);
      await h.bid(lotIds[0], alice, 20000);
      const withdraw = async (lot: number, reason: string | null) => (await h.q('SELECT bidding_withdraw_lot($1, $2, $3) AS r', [lot, admin, reason]))[0].r;
      expect(await withdraw(lotIds[0], '  ')).toMatchObject({ reason: 'reason_required' });
      expect(await withdraw(lotIds[0], 'по просьбе владельца')).toMatchObject({ status: 'withdrawn' });
      expect((await h.lot(lotIds[0])).state).toBe('withdrawn');
      expect(await h.bid(lotIds[0], alice, 90000)).toMatchObject({ reason: 'closed' });
      expect(Number((await h.q('SELECT count(*) AS n FROM bidding_bids WHERE lot_id = $1 AND accepted', [lotIds[0]]))[0].n)).toBe(1);
      expect(await withdraw(lotIds[0], 'ещё раз')).toMatchObject({ reason: 'wrong_state' });
      expect(await withdraw(999999, 'x')).toMatchObject({ reason: 'no_such_lot' });
      // снятый лот не мешает закрытию аукциона
      await h.setLotEnd(lotIds[1], '-1 second');
      await h.q('SELECT * FROM bidding_close_due_lots(10)');
      expect((await h.q('SELECT status FROM bidding_auctions WHERE auction_id = $1', [auctionId]))[0].status).toBe('closed');
    });
  });

  describe('ограничения схемы', () => {
    it('деньги положительны, резерв не ниже старта, slug — латиница, ставка в записи не может быть нулевой', async () => {
      const a = await newAuction();
      await expect(h.q(`INSERT INTO bidding_lots (auction_id, lot_no, snapshot, start_price_kop) VALUES ($1, 9, '{}', 0)`, [a])).rejects.toThrow(/start_price_kop/);
      await expect(h.q(`INSERT INTO bidding_lots (auction_id, lot_no, snapshot, start_price_kop, reserve_kop) VALUES ($1, 9, '{}', 1000, 500)`, [a])).rejects.toThrow(/check constraint/);
      await expect(h.q(`INSERT INTO bidding_auctions (slug, title, increments_id) VALUES ('Плохой Slug', 't', 1)`)).rejects.toThrow(/slug/);
      await expect(h.q(`INSERT INTO bidding_lots (auction_id, lot_no, snapshot, start_price_kop, state) VALUES ($1, 8, '{}', 1000, 'open')`, [a])).rejects.toThrow(/open_has_end/);
    });
  });
});
