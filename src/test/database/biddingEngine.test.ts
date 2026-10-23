// Алгоритм торгов на настоящем PostgreSQL: ставка, шаг, продление, резерв, закрытие, журнал, параллельные ставки.
import { randomUUID } from 'crypto';
import { describeDb, createHarness, rub, Harness } from './biddingHarness';

describeDb('торговый движок (PostgreSQL)', () => {
  let h: Harness;
  let alice: number, bob: number, carol: number, seller: number, outsider: number, unapproved: number;

  beforeAll(async () => {
    h = await createHarness();
    await h.reset();
    [alice, bob, carol, seller, outsider, unapproved] = [await h.user('alice'), await h.user('bob'), await h.user('carol'),
      await h.user('seller'), await h.user('outsider'), await h.user('unapproved')];
    for (const id of [alice, bob, carol, seller]) await h.participant(id);
    await h.participant(unapproved, 'pending');
  });
  afterAll(async () => { await h.close(); });

  /** Аукцион с одним лотом (старт 10 000 ₽), в котором допущены alice, bob, carol. */
  async function market(opts: Parameters<Harness['openAuction']>[0] = {}) {
    const { auctionId, lotIds } = await h.openAuction(opts);
    for (const id of [alice, bob, carol]) await h.admit(auctionId, id);
    return { auctionId, lotId: lotIds[0], lotIds };
  }

  describe('шаг ставки', () => {
    it('шкала по умолчанию: границы ступеней включительно', async () => {
      const step = async (price: number) => Number((await h.q(`SELECT bidding_increment((SELECT table_id FROM bidding_increment_tables WHERE name='default'), $1) AS s`, [rub(price)]))[0].s) / 100;
      expect(await step(5000)).toBe(500);
      expect(await step(10000)).toBe(1000);
      expect(await step(19999)).toBe(1000);
      expect(await step(20000)).toBe(2000);
      expect(await step(50000)).toBe(5000);
      expect(await step(100000)).toBe(10000);
      expect(await step(200000)).toBe(20000);
      expect(await step(500000)).toBe(50000);
      expect(await step(1_000_000)).toBe(100000);
      expect(await step(25_000_000)).toBe(100000);
    });

    it('таблица без подходящей ступени — ошибка, а не молчаливый NULL', async () => {
      await h.q(`INSERT INTO bidding_increment_tables (name) VALUES ('пустая')`);
      await expect(h.q(`SELECT bidding_increment((SELECT table_id FROM bidding_increment_tables WHERE name='пустая'), 100)`)).rejects.toThrow(/no step/);
    });
  });

  describe('ставки и максимумы', () => {
    it('первая ставка: цена — стартовая, лидер запомнен, торги продлеваются не должны', async () => {
      const { lotId } = await market();
      const opened = (await h.lot(lotId)).version;                                    // открытие торгов тоже меняет версию лота
      const r = await h.bid(lotId, alice, 30000);
      expect(r).toMatchObject({ status: 'accepted', leader: true, price_kop: rub(10000), extended: false, version: opened + 1 });
      const lot = await h.lot(lotId);
      expect(lot).toMatchObject({ leader_user_id: alice, bid_count: 1, version: opened + 1 });
      expect(Number(lot.leader_max_kop)).toBe(rub(30000));
    });

    it('новый максимум выше: новый лидер, цена = прежний максимум + шаг', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 20000);
      const r = await h.bid(lotId, bob, 50000);
      expect(r).toMatchObject({ status: 'accepted', leader: true, price_kop: rub(22000) });      // 20 000 + шаг 2 000
      expect((await h.lot(lotId)).leader_user_id).toBe(bob);
    });

    it('ниже максимума лидера: лидер прежний, цена = новый максимум + шаг', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 50000);
      const r = await h.bid(lotId, bob, 20000);
      expect(r).toMatchObject({ status: 'accepted', leader: false, price_kop: rub(22000) });
      expect((await h.lot(lotId)).leader_user_id).toBe(alice);
    });

    it('равные максимумы: побеждает более ранний, цена равна максимуму', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 30000);
      const r = await h.bid(lotId, bob, 30000);
      expect(r).toMatchObject({ status: 'accepted', leader: false, price_kop: rub(30000) });
      expect((await h.lot(lotId)).leader_user_id).toBe(alice);
    });

    it('лидер поднимает свой максимум: цена не меняется; не выше прежнего — отказ', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 20000);
      await h.bid(lotId, bob, 15000);                                                // цена 16 500? 15000 + 1000 = 16000
      const before = Number((await h.lot(lotId)).current_price_kop);
      const r = await h.bid(lotId, alice, 90000);
      expect(r).toMatchObject({ status: 'accepted', leader: true });
      expect(Number((await h.lot(lotId)).current_price_kop)).toBe(before);
      expect(await h.bid(lotId, alice, 90000)).toMatchObject({ status: 'rejected', reason: 'not_higher_than_own_max' });
    });

    it('цена никогда не превышает максимум лидера и не убывает', async () => {
      const { lotId } = await market();
      const prices: number[] = [];
      for (const [who, amount] of [[alice, 15000], [bob, 12000], [carol, 40000], [alice, 38000], [bob, 100000], [carol, 90000]] as const) {
        const r = await h.bid(lotId, who, amount);
        if (r.status === 'accepted') prices.push(r.price_kop);
        const lot = await h.lot(lotId);
        expect(Number(lot.current_price_kop)).toBeLessThanOrEqual(Number(lot.leader_max_kop));
      }
      expect([...prices].sort((a, b) => a - b)).toEqual(prices);
    });

    it('отказы: ниже стартовой, ниже следующей ставки, повтор максимума лидером', async () => {
      const { lotId } = await market();
      expect(await h.bid(lotId, alice, 9000)).toMatchObject({ status: 'rejected', reason: 'below_minimum', min_bid_kop: rub(10000) });
      await h.bid(lotId, alice, 10000);
      const r = await h.bid(lotId, bob, 10500);
      expect(r).toMatchObject({ status: 'rejected', reason: 'below_minimum', min_bid_kop: rub(11000) });   // цена 10 000 + шаг 1 000
    });

    it('отказ с причиной тоже попадает в журнал ставок', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 5000);
      const rows = await h.q('SELECT accepted, reject_reason FROM bidding_bids WHERE lot_id = $1', [lotId]);
      expect(rows).toEqual([{ accepted: false, reject_reason: 'below_minimum' }]);
      expect((await h.lot(lotId)).bid_count).toBe(0);
    });

    it('нельзя: без допуска, без проверки личности, продавцу, на сумму сверх лимита и абсурдную', async () => {
      const { auctionId, lotId } = await market({ lots: [{ startRub: 10000, sellerUserId: seller, estimateHighRub: 50000 }] });
      await h.admit(auctionId, seller);
      await h.participant(outsider, 'approved');                                     // участник есть, заявки на аукцион нет
      expect(await h.bid(lotId, outsider, 20000)).toMatchObject({ status: 'rejected', reason: 'not_admitted' });
      const nobody = await h.user('nobody');
      expect(await h.bid(lotId, nobody, 20000)).toMatchObject({ status: 'rejected', reason: 'not_allowed' });
      expect(await h.bid(lotId, seller, 20000)).toMatchObject({ status: 'rejected', reason: 'seller_cannot_bid' });
      await h.q(`UPDATE bidding_registrations SET limit_kop = $3 WHERE auction_id = $1 AND user_id = $2`, [auctionId, alice, rub(30000)]);
      expect(await h.bid(lotId, alice, 40000)).toMatchObject({ status: 'rejected', reason: 'over_limit' });
      expect(await h.bid(lotId, alice, 30000)).toMatchObject({ status: 'accepted' });
      expect(await h.bid(lotId, bob, 600000)).toMatchObject({ status: 'rejected', reason: 'suspiciously_high' });   // > 10 × верхней оценки
      expect(await h.bid(lotId, bob, 0)).toMatchObject({ status: 'rejected', reason: 'invalid_amount' });
    });

    it('лимит считается по сумме максимумов в лидирующих лотах аукциона', async () => {
      const { auctionId, lotIds } = await market({ lots: [{ startRub: 10000 }, { startRub: 10000 }] });
      await h.q(`UPDATE bidding_registrations SET limit_kop = $3 WHERE auction_id = $1 AND user_id = $2`, [auctionId, alice, rub(50000)]);
      expect(await h.bid(lotIds[0], alice, 30000)).toMatchObject({ status: 'accepted' });
      expect(await h.bid(lotIds[1], alice, 30000)).toMatchObject({ status: 'rejected', reason: 'over_limit' });   // 30 000 + 30 000 > 50 000
      expect(await h.bid(lotIds[1], alice, 20000)).toMatchObject({ status: 'accepted' });
    });

    it('участник, не прошедший проверку личности или приостановленный, ставить не может', async () => {
      const { auctionId, lotId } = await market();
      await h.q(`INSERT INTO bidding_registrations (auction_id, user_id, status, limit_kop) VALUES ($1, $2, 'active', $3)`, [auctionId, unapproved, rub(100000)]);
      expect(await h.bid(lotId, unapproved, 20000)).toMatchObject({ status: 'rejected', reason: 'not_allowed' });
      await h.q(`UPDATE bidding_participants SET standing = 'suspended' WHERE user_id = $1`, [bob]);
      expect(await h.bid(lotId, bob, 20000)).toMatchObject({ status: 'rejected', reason: 'not_allowed' });
      await h.q(`UPDATE bidding_participants SET standing = 'active' WHERE user_id = $1`, [bob]);
    });

    it('повтор запроса с тем же request_id не создаёт вторую ставку', async () => {
      const { lotId } = await market();
      const req = randomUUID();
      const first = await h.bid(lotId, alice, 20000, { req });
      const again = await h.bid(lotId, alice, 20000, { req });
      expect(first.status).toBe('accepted');
      expect(again).toMatchObject({ status: 'duplicate', bid_id: first.bid_id, accepted: true });
      expect((await h.lot(lotId)).bid_count).toBe(1);
    });

    it('устаревшая версия лота — отказ «stale», актуальная проходит', async () => {
      const { lotId } = await market();
      const seen = (await h.lot(lotId)).version;
      await h.bid(lotId, alice, 20000);
      expect(await h.bid(lotId, bob, 40000, { version: seen })).toMatchObject({ status: 'rejected', reason: 'stale' });
      expect(await h.bid(lotId, bob, 40000, { version: seen + 1 })).toMatchObject({ status: 'accepted' });
    });
  });

  describe('резерв', () => {
    it('максимум лидера дотягивает до резерва — цена поднимается до резерва', async () => {
      const { lotId } = await market({ lots: [{ startRub: 10000, reserveRub: 30000 }] });
      const r = await h.bid(lotId, alice, 50000);
      expect(r.price_kop).toBe(rub(30000));
    });

    it('максимум ниже резерва — цена остаётся стартовой; резерв в публичные поля не входит', async () => {
      const { lotId } = await market({ lots: [{ startRub: 10000, reserveRub: 30000 }] });
      expect((await h.bid(lotId, alice, 20000)).price_kop).toBe(rub(10000));
    });
  });

  describe('мягкое закрытие', () => {
    it('ставка в последние минуты продлевает лот на окно от момента ставки', async () => {
      const { auctionId, lotId } = await market();
      await h.setLotEnd(lotId, '60 seconds');
      const r = await h.bid(lotId, alice, 20000);
      expect(r.extended).toBe(true);
      const [{ secs }] = await h.q(`SELECT extract(epoch FROM ends_at - now()) AS secs FROM bidding_lots WHERE lot_id = $1`, [lotId]);
      expect(Number(secs)).toBeGreaterThan(170);
      expect(Number(secs)).toBeLessThanOrEqual(180);
      const events = await h.q(`SELECT event_type FROM bidding_events WHERE chain_key = $1 ORDER BY event_id`, [lotId]);
      expect(events.map((e: any) => e.event_type)).toEqual(['bid_accepted', 'lot_extended']);
      expect(auctionId).toBeGreaterThan(0);
    });

    it('ставка раньше окна конец не двигает', async () => {
      const { lotId } = await market();
      await h.setLotEnd(lotId, '10 minutes');
      expect((await h.bid(lotId, alice, 20000)).extended).toBe(false);
    });

    it('продление не выходит за hard_close_at', async () => {
      const { auctionId, lotId } = await market();
      await h.q(`UPDATE bidding_auctions SET hard_close_at = now() + interval '100 seconds' WHERE auction_id = $1`, [auctionId]);
      await h.setLotEnd(lotId, '30 seconds');
      await h.bid(lotId, alice, 20000);
      const [{ secs }] = await h.q(`SELECT extract(epoch FROM ends_at - now()) AS secs FROM bidding_lots WHERE lot_id = $1`, [lotId]);
      expect(Number(secs)).toBeLessThanOrEqual(100);
      expect(Number(secs)).toBeGreaterThan(90);
    });

    it('после окончания времени ставка отклоняется', async () => {
      const { lotId } = await market();
      await h.setLotEnd(lotId, '-1 second');
      expect(await h.bid(lotId, alice, 20000)).toMatchObject({ status: 'rejected', reason: 'closed' });
    });
  });

  describe('закрытие лотов', () => {
    const closeAll = async () => (await h.q('SELECT * FROM bidding_close_due_lots(100)')) as Array<{ lot_id: string; outcome: string }>;

    it('продан: два участника, цена не ниже резерва; победитель и молоток записаны', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 30000);
      await h.bid(lotId, bob, 20000);
      await h.setLotEnd(lotId, '-1 second');
      expect((await closeAll()).find(r => Number(r.lot_id) === lotId)?.outcome).toBe('sold');
      const lot = await h.lot(lotId);
      expect(lot).toMatchObject({ state: 'sold_awaiting_payment', close_outcome: 'sold', winner_user_id: alice });
      expect(Number(lot.hammer_kop)).toBe(rub(22000));
    });

    it('без ставок: лот не продан', async () => {
      const { lotId } = await market();
      await h.setLotEnd(lotId, '-1 second');
      expect((await closeAll()).find(r => Number(r.lot_id) === lotId)?.outcome).toBe('no_bids');
      expect((await h.lot(lotId)).state).toBe('unsold');
    });

    it('один участник: торги по лоту не состоялись (ст. 447 п. 5 ГК)', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 20000);
      await h.bid(lotId, alice, 30000);
      await h.setLotEnd(lotId, '-1 second');
      expect((await closeAll()).find(r => Number(r.lot_id) === lotId)?.outcome).toBe('single_bidder');
      expect((await h.lot(lotId)).winner_user_id).toBeNull();
    });

    it('min_bidders = 1 разрешает продажу единственному участнику', async () => {
      const { lotId } = await market({ minBidders: 1 });
      await h.bid(lotId, alice, 20000);
      await h.setLotEnd(lotId, '-1 second');
      expect((await closeAll()).find(r => Number(r.lot_id) === lotId)?.outcome).toBe('sold');
    });

    it('резерв не достигнут: лот не продан', async () => {
      const { lotId } = await market({ lots: [{ startRub: 10000, reserveRub: 90000 }] });
      await h.bid(lotId, alice, 30000);
      await h.bid(lotId, bob, 20000);
      await h.setLotEnd(lotId, '-1 second');
      expect((await closeAll()).find(r => Number(r.lot_id) === lotId)?.outcome).toBe('reserve_not_met');
    });

    it('лоты закрываются по очереди, а аукцион — когда закрыт последний', async () => {
      const { auctionId, lotIds } = await market({ lots: [{}, {}] });
      const ends = (await h.q('SELECT lot_no, ends_at FROM bidding_lots WHERE auction_id = $1 ORDER BY lot_no', [auctionId])).map((r: any) => +new Date(r.ends_at));
      expect(ends[1] - ends[0]).toBe(60_000);                                         // lot_close_stagger_s
      await h.setLotEnd(lotIds[0], '-1 second');
      await closeAll();
      expect((await h.q('SELECT status FROM bidding_auctions WHERE auction_id = $1', [auctionId]))[0].status).toBe('bidding');
      await h.setLotEnd(lotIds[1], '-1 second');
      await closeAll();
      expect((await h.q('SELECT status FROM bidding_auctions WHERE auction_id = $1', [auctionId]))[0].status).toBe('closed');
      const chain = (await h.q('SELECT * FROM bidding_verify_chain($1)', [-auctionId]))[0];
      expect(chain).toMatchObject({ ok: true });
      expect((await h.q('SELECT event_type FROM bidding_events WHERE chain_key = $1 ORDER BY event_id', [-auctionId])).map((e: any) => e.event_type))
        .toEqual(['auction_announced', 'bidding_opened', 'registration_approved', 'registration_approved', 'registration_approved', 'auction_closed']);
    });

    it('закрытый лот не принимает ставок; повторное закрытие ничего не меняет', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 30000);
      await h.bid(lotId, bob, 20000);
      await h.setLotEnd(lotId, '-1 second');
      await closeAll();
      const before = await h.lot(lotId);
      expect((await closeAll()).filter(r => Number(r.lot_id) === lotId)).toEqual([]);
      expect(await h.bid(lotId, carol, 90000)).toMatchObject({ status: 'rejected', reason: 'closed' });
      expect((await h.lot(lotId)).version).toBe(before.version);
    });
  });

  describe('журнал', () => {
    it('цепочка хешей сходится; изменение или удаление записи ставки и события запрещено', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 30000);
      await h.bid(lotId, bob, 20000);
      await h.bid(lotId, carol, 5000);                                                // отказ
      expect((await h.q('SELECT * FROM bidding_verify_chain($1)', [lotId]))[0]).toMatchObject({ ok: true, checked: 3 });
      await expect(h.q(`UPDATE bidding_bids SET max_kop = 1 WHERE lot_id = $1`, [lotId])).rejects.toThrow(/append-only/);
      await expect(h.q(`DELETE FROM bidding_events WHERE chain_key = $1`, [lotId])).rejects.toThrow(/append-only/);
    });

    it('подмена записи в обход триггера обнаруживается проверкой цепочки', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 30000);
      await h.bid(lotId, bob, 40000);
      await h.q('ALTER TABLE bidding_events DISABLE TRIGGER bidding_events_ro');
      try {
        await h.q(`UPDATE bidding_events SET payload = jsonb_set(payload, '{price_kop}', '1') WHERE chain_key = $1 AND event_id = (SELECT min(event_id) FROM bidding_events WHERE chain_key = $1)`, [lotId]);
      } finally {
        await h.q('ALTER TABLE bidding_events ENABLE TRIGGER bidding_events_ro');
      }
      const check = (await h.q('SELECT * FROM bidding_verify_chain($1)', [lotId]))[0];
      expect(check.ok).toBe(false);
      expect(check.checked).toBe(1);
    });

    it('проверка цепочки не зависит от часового пояса сессии', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 30000);
      const client = await h.pool.connect();
      try {
        await client.query(`SET TIME ZONE 'Asia/Vladivostok'`);
        expect((await client.query('SELECT * FROM bidding_verify_chain($1)', [lotId])).rows[0].ok).toBe(true);
        await client.query(`SET TIME ZONE 'America/Los_Angeles'`);
        expect((await client.query('SELECT * FROM bidding_verify_chain($1)', [lotId])).rows[0].ok).toBe(true);
      } finally { client.release(); }
    });
  });

  describe('параллельные ставки', () => {
    it('8 сессий × 25 попыток на один лот: счётчики согласованы, журнал цел, взаимоблокировок нет', async () => {
      const { lotId } = await market({ minBidders: 1 });
      const opened = (await h.lot(lotId)).version;
      const users = [alice, bob, carol];
      const attempts = Array.from({ length: 8 * 25 }, (_, i) => {
        const who = users[i % users.length];
        const amount = 10000 + ((i * 7919) % 90000);                                  // разные суммы, часть заведомо ниже минимума
        return h.bid(lotId, who, amount);
      });
      const results = await Promise.all(attempts);
      const accepted = results.filter(r => r.status === 'accepted');
      const lot = await h.lot(lotId);
      expect(lot.bid_count).toBe(accepted.length);
      expect(lot.version).toBe(opened + accepted.length);
      expect(Number((await h.q('SELECT count(*) AS n FROM bidding_bids WHERE lot_id = $1 AND accepted', [lotId]))[0].n)).toBe(accepted.length);
      const maxSent = Math.max(...(await h.q('SELECT max_kop FROM bidding_bids WHERE lot_id = $1 AND accepted AND became_leader', [lotId])).map((r: any) => Number(r.max_kop)));
      expect(Number(lot.leader_max_kop)).toBe(maxSent);                                // максимум лидера — наибольший из принятых лидерских
      expect(Number(lot.current_price_kop)).toBeLessThanOrEqual(Number(lot.leader_max_kop));
      expect((await h.q('SELECT * FROM bidding_verify_chain($1)', [lotId]))[0].ok).toBe(true);
      // цены в порядке принятия не убывают
      const prices = (await h.q('SELECT price_after_kop FROM bidding_bids WHERE lot_id = $1 AND accepted ORDER BY bid_id', [lotId])).map((r: any) => Number(r.price_after_kop));
      expect([...prices].sort((a, b) => a - b)).toEqual(prices);
    }, 60_000);
  });
});
