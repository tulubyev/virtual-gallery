// Аннулирование ставки куратором на настоящем PostgreSQL: пересчёт лота, журнал, неизменяемость ставок, закрытие без аннулированных.
import { randomUUID } from 'crypto';
import { describeDb, createHarness, rub, Harness } from './biddingHarness';

describeDb('аннулирование ставки (PostgreSQL)', () => {
  let h: Harness;
  let alice: number, bob: number, carol: number, curator: number;

  beforeAll(async () => {
    h = await createHarness();
    await h.reset();
    [alice, bob, carol, curator] = [await h.user('alice'), await h.user('bob'), await h.user('carol'), await h.user('curator', 'curator')];
    for (const id of [alice, bob, carol]) await h.participant(id);
  });
  afterAll(async () => { await h.close(); });

  async function market(opts: Parameters<Harness['openAuction']>[0] = {}) {
    const { auctionId, lotIds } = await h.openAuction(opts);
    for (const id of [alice, bob, carol]) await h.admit(auctionId, id);
    return { auctionId, lotId: lotIds[0] };
  }
  const annul = async (bidId: number, reason: string | null = 'ошибочная ставка') =>
    (await h.q('SELECT bidding_annul_bid($1, $2, $3) AS r', [bidId, curator, reason]))[0].r;
  const replay = async (lotId: number, exclude: number | null = null) =>
    (await h.q('SELECT * FROM bidding_replay_lot($1, $2)', [lotId, exclude]))[0];

  it('аннулирование нового лидера возвращает цену и лидера прежней ставке; ставка и журнал остаются', async () => {
    const { lotId } = await market();
    await h.bid(lotId, alice, 30000);                                   // цена 10 000, лидер alice
    const high = await h.bid(lotId, bob, 50000);                        // 30 000 + шаг 2 000 = 32 000, лидер bob
    expect(Number((await h.lot(lotId)).current_price_kop)).toBe(rub(32000));

    const result = await annul(high.bid_id);
    expect(result).toMatchObject({ status: 'annulled', price_kop: rub(10000), leader_user_id: alice, bid_count: 1 });
    const lot = await h.lot(lotId);
    expect(lot).toMatchObject({ leader_user_id: alice, bid_count: 1 });
    expect(Number(lot.current_price_kop)).toBe(rub(10000));
    expect(Number(lot.leader_max_kop)).toBe(rub(30000));
    expect(lot.version).toBe(high.version + 1);

    expect(await h.q('SELECT 1 FROM bidding_bids WHERE bid_id = $1', [high.bid_id])).toHaveLength(1);        // ставка не удалена
    await expect(h.q('UPDATE bidding_bids SET accepted = false WHERE bid_id = $1', [high.bid_id])).rejects.toThrow(/append-only/);
    await expect(h.q('DELETE FROM bidding_bid_annulments WHERE bid_id = $1', [high.bid_id])).rejects.toThrow(/append-only/);
    const [row] = await h.q('SELECT * FROM bidding_bid_annulments WHERE bid_id = $1', [high.bid_id]);
    expect(row).toMatchObject({ actor_user_id: curator, reason: 'ошибочная ставка' });
    expect(row.before_state).toMatchObject({ leader_user_id: bob, bid_count: 2 });
    expect(row.after_state).toMatchObject({ leader_user_id: alice, bid_count: 1 });

    const [event] = await h.q(`SELECT * FROM bidding_events WHERE lot_id = $1 AND event_type = 'bid_annulled'`, [lotId]);
    expect(event.payload).toMatchObject({ bid_id: Number(high.bid_id), reason: 'ошибочная ставка', bid_user_id: bob });
    expect((await h.q('SELECT * FROM bidding_verify_chain($1)', [lotId]))[0]).toMatchObject({ ok: true });
  });

  it('аннулирование ставки не лидера, поднявшей цену, снижает цену; лидер остаётся', async () => {
    const { lotId } = await market();
    await h.bid(lotId, alice, 30000);
    const rival = await h.bid(lotId, bob, 25000);                       // не перебил: цена 25 000 + 2 000 = 27 000
    expect(Number((await h.lot(lotId)).current_price_kop)).toBe(rub(27000));
    await annul(rival.bid_id);
    const lot = await h.lot(lotId);
    expect(Number(lot.current_price_kop)).toBe(rub(10000));
    expect(lot.leader_user_id).toBe(alice);
  });

  it('аннулирование ставки, на которую отвечали: следующая ставка пересчитывается без неё', async () => {
    const { lotId } = await market();
    await h.bid(lotId, alice, 20000);
    const middle = await h.bid(lotId, bob, 40000);                      // лидер bob, цена 20 000 + 2 000 = 22 000
    await h.bid(lotId, carol, 45000);                                   // лидер carol: 40 000 + 2 000 = 42 000
    await annul(middle.bid_id);                                         // без bob: alice 20 000 → carol 45 000: цена 20 000 + 2 000
    const lot = await h.lot(lotId);
    expect(lot.leader_user_id).toBe(carol);
    expect(Number(lot.current_price_kop)).toBe(rub(22000));
    expect(lot.bid_count).toBe(2);
  });

  it('аннулированы все ставки: лот как без торгов, следующая ставка — первая по стартовой цене', async () => {
    const { lotId } = await market();
    const only = await h.bid(lotId, alice, 15000);
    await annul(only.bid_id);
    const lot = await h.lot(lotId);
    expect(lot).toMatchObject({ leader_user_id: null, leader_max_kop: null, bid_count: 0 });
    expect(Number(lot.current_price_kop)).toBe(0);
    const next = await h.bid(lotId, bob, 12000);
    expect(next).toMatchObject({ status: 'accepted', price_kop: rub(10000) });
  });

  it('резерв учитывается при пересчёте', async () => {
    const { lotId } = await market({ lots: [{ startRub: 10000, reserveRub: 30000 }] });
    await h.bid(lotId, alice, 35000);                                   // максимум выше резерва: цена поднимается до 30 000
    expect(Number((await h.lot(lotId)).current_price_kop)).toBe(rub(30000));
    const rival = await h.bid(lotId, bob, 20000);                       // слишком мало: отказ
    expect(rival.status).toBe('rejected');
    const bump = await h.bid(lotId, bob, 33000);                        // bob не перебил (33 000 < 35 000): цена 33 000 + 2 000 → не больше 35 000
    await annul(bump.bid_id);
    expect(Number((await h.lot(lotId)).current_price_kop)).toBe(rub(30000));
  });

  it('отказы: причина обязательна, чужие и отклонённые ставки, повторное аннулирование, закрытый лот', async () => {
    const { lotId } = await market();
    const good = await h.bid(lotId, alice, 20000);
    const refused = await h.bid(lotId, bob, 100);                       // below_minimum: запись об отказе, не ставка
    expect((await h.q('SELECT bid_id FROM bidding_bids WHERE accepted = false AND lot_id = $1', [lotId]))).toHaveLength(1);
    expect((await annul(good.bid_id, '  '))).toMatchObject({ status: 'rejected', reason: 'reason_required' });
    expect((await annul(good.bid_id, null))).toMatchObject({ reason: 'reason_required' });
    expect((await annul(999_999_999))).toMatchObject({ reason: 'no_such_bid' });
    const refusedId = (await h.q('SELECT bid_id FROM bidding_bids WHERE accepted = false AND lot_id = $1', [lotId]))[0].bid_id;
    expect(refused.status).toBe('rejected');
    expect((await annul(refusedId))).toMatchObject({ reason: 'bid_not_accepted' });
    expect((await annul(good.bid_id))).toMatchObject({ status: 'annulled' });
    expect((await annul(good.bid_id))).toMatchObject({ reason: 'already_annulled' });

    const { lotId: other } = await market();
    const late = await h.bid(other, alice, 20000);
    await h.q(`UPDATE bidding_lots SET ends_at = now() - interval '1 second' WHERE lot_id = $1`, [other]);
    expect((await annul(late.bid_id))).toMatchObject({ reason: 'lot_not_open' });                 // срок вышел, закрытие ещё не прошло
    await h.q('SELECT * FROM bidding_close_due_lots(10)');
    expect((await annul(late.bid_id))).toMatchObject({ reason: 'lot_not_open' });                 // лот закрыт
  });

  it('закрытие считает участников без аннулированных ставок (ст. 447 п. 5 ГК)', async () => {
    const { lotId } = await market();
    await h.bid(lotId, alice, 30000);
    const second = await h.bid(lotId, bob, 40000);
    await annul(second.bid_id);
    await h.q(`UPDATE bidding_lots SET ends_at = now() - interval '1 second' WHERE lot_id = $1`, [lotId]);
    const closed = await h.q('SELECT * FROM bidding_close_due_lots(10)');
    expect(closed).toEqual([{ lot_id: String(lotId), outcome: 'single_bidder' }]);
    expect((await h.lot(lotId)).close_outcome).toBe('single_bidder');
  });

  it('продление от аннулированной ставки не отменяется', async () => {
    const { lotId } = await market();
    await h.setLotEnd(lotId, '60 seconds');                             // внутри окна продления (180 с)
    const late = await h.bid(lotId, alice, 20000);
    expect(late.extended).toBe(true);
    const endsAt = (await h.lot(lotId)).ends_at;
    await annul(late.bid_id);
    expect((await h.lot(lotId)).ends_at).toEqual(endsAt);
  });

  // Пересчёт повторяет ветки bidding_place_bid: на случайных сериях ставок состояние «по ставкам» должно совпадать с живым.
  it('свойство: пересчёт по принятым ставкам совпадает с состоянием, которое вела функция ставки', async () => {
    let seed = 20261024;
    const random = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
    const users = [alice, bob, carol];
    for (const reserveRub of [null, 40000]) {
      for (let round = 0; round < 6; round++) {
        const { lotId } = await market({ lots: [{ startRub: 10000, ...(reserveRub ? { reserveRub } : {}) }] });
        for (let i = 0; i < 14; i++) {
          const who = users[Math.floor(random() * users.length)];
          const amount = Math.round((10000 + random() * 60000) / 500) * 500;
          await h.bid(lotId, who, amount, { req: randomUUID() });
          const live = await h.lot(lotId);
          const rebuilt = await replay(lotId);
          expect({ price: String(rebuilt.price_kop), leader: rebuilt.leader_user_id, max: rebuilt.leader_max_kop === null ? null : String(rebuilt.leader_max_kop), count: rebuilt.bid_count })
            .toEqual({ price: String(live.current_price_kop), leader: live.leader_user_id, max: live.leader_max_kop === null ? null : String(live.leader_max_kop), count: live.bid_count });
        }
      }
    }
  }, 60_000);
});
