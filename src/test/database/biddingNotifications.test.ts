// Уведомления участникам торгов на настоящем PostgreSQL: триггеры (в той же транзакции, что и событие), лента, очередь отправки.
import { randomUUID } from 'crypto';
import { describeDb, createHarness, Harness } from './biddingHarness';

const mockDb: { pool: any } = { pool: null };
jest.mock('../../config/database', () => ({
  __esModule: true,
  default: { query: (...args: any[]) => mockDb.pool.query(...args), connect: () => mockDb.pool.connect() },
}));

import { MAX_ATTEMPTS, NOTIFICATION_KINDS, dispatchOnce, listMine, markRead, renderNotification } from '../../services/biddingNotifications';
import { transportFromEnv, type OutgoingMessage, type Transport } from '../../services/notificationTransports';

describeDb('уведомления участникам торгов (PostgreSQL)', () => {
  let h: Harness;
  let alice: number, bob: number, carol: number;

  beforeAll(async () => {
    h = await createHarness();
    mockDb.pool = h.pool;
    await h.reset();
    [alice, bob, carol] = [await h.user('alice'), await h.user('bob'), await h.user('carol')];
    for (const id of [alice, bob, carol]) await h.participant(id);
  });
  afterAll(async () => { await h.close(); });

  async function market(opts: Parameters<Harness['openAuction']>[0] = {}) {
    const { auctionId, lotIds } = await h.openAuction(opts);
    for (const id of [alice, bob, carol]) await h.admit(auctionId, id);
    return { auctionId, lotId: lotIds[0] };
  }
  const notices = (userId: number, lotId?: number) =>
    h.q(`SELECT kind, data, lot_id FROM bidding_notifications WHERE user_id = $1 ${lotId ? 'AND lot_id = $2' : ''} ORDER BY notification_id`, lotId ? [userId, lotId] : [userId]);
  const kinds = async (userId: number, lotId: number) => (await notices(userId, lotId)).map((r: any) => r.kind);
  const endLot = async (lotId: number) => {
    await h.q(`UPDATE bidding_lots SET ends_at = now() - interval '1 second' WHERE lot_id = $1`, [lotId]);
    await h.q('SELECT * FROM bidding_close_due_lots(10)');
  };

  describe('триггеры', () => {
    it('решение по заявке: допуск и отказ; в допуске — номер и лимит, причины отказа нет', async () => {
      const { auctionId } = await h.openAuction();
      await h.admit(auctionId, alice, 250_000);
      await h.q(`INSERT INTO bidding_registrations (auction_id, user_id) VALUES ($1, $2)`, [auctionId, bob]);
      await h.q(`SELECT bidding_decide_registration($1, $2, false, NULL, NULL, 'секретная причина организатора')`, [auctionId, bob]);
      const [approved] = (await notices(alice)).filter((n: any) => n.kind === 'registration_approved').slice(-1);
      expect(approved.data).toMatchObject({ pseudonym_no: 1, limit_kop: 25_000_000, auction_title: 'Тестовый аукцион' });
      const rejected = (await notices(bob)).filter((n: any) => n.kind === 'registration_rejected');
      expect(rejected).toHaveLength(1);
      expect(JSON.stringify(rejected[0].data)).not.toContain('секретная');
    });

    it('«перебили»: получает прежний лидер, и только когда лидер сменился новой ставкой', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 30000);
      expect(await kinds(alice, lotId)).toEqual([]);
      await h.bid(lotId, alice, 35000);                                      // лидер поднимает свой максимум
      await h.bid(lotId, carol, 20000);                                      // не перебил: лидер прежний
      expect(await kinds(alice, lotId)).toEqual([]);
      await h.bid(lotId, bob, 50000);                                        // новый лидер
      expect(await kinds(alice, lotId)).toEqual(['outbid']);
      expect(await kinds(bob, lotId)).toEqual([]);
      expect(await kinds(carol, lotId)).toEqual([]);
      await h.bid(lotId, alice, 60000);
      expect(await kinds(bob, lotId)).toEqual(['outbid']);
      const [note] = await notices(alice, lotId);
      expect(note.data).toMatchObject({ lot_no: 1, title: 'Лот 1' });
      expect(Number(note.data.price_kop)).toBe(note.data.price_kop);          // цена — число
      expect(Object.keys(note.data).sort()).toEqual(['auction_slug', 'ends_at', 'lot_no', 'price_kop', 'title']);   // ни максимумов, ни чужих номеров
    });

    it('ставка, откатившаяся вместе с транзакцией, уведомления не оставляет', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 30000);
      const client = await h.pool.connect();
      try {
        await client.query('BEGIN');
        await client.query('SELECT bidding_place_bid($1, $2, $3, $4::uuid)', [lotId, bob, 5_000_000, randomUUID()]);
        await client.query('ROLLBACK');
      } finally { client.release(); }
      expect(await kinds(alice, lotId)).toEqual([]);
    });

    it('закрытие лота: победителю — «выиграл» с ценой молотка, остальным — «достался другому»; без продажи — «без продажи»', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 30000);
      await h.bid(lotId, bob, 20000);
      await endLot(lotId);
      expect(await kinds(alice, lotId)).toEqual(['lot_won']);
      expect(await kinds(bob, lotId)).toEqual(['lot_lost']);
      expect(await kinds(carol, lotId)).toEqual([]);                          // не ставил
      const [won] = await notices(alice, lotId);
      expect(Number(won.data.hammer_kop)).toBe(2_200_000);

      const { lotId: single } = await market();                              // один участник: торги не состоялись
      await h.bid(single, carol, 20000);
      await endLot(single);
      expect(await kinds(carol, single)).toEqual(['lot_unsold']);
      const { lotId: empty } = await market();                                // ставок не было — никому
      await endLot(empty);
      expect((await h.q('SELECT 1 FROM bidding_notifications WHERE lot_id = $1', [empty]))).toHaveLength(0);
    });

    it('снятие лота: всем, кто ставил; причина снятия в уведомление не попадает', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 30000);
      await h.bid(lotId, bob, 40000);
      await h.q(`SELECT bidding_withdraw_lot($1, NULL, 'сомнения в подлинности')`, [lotId]);
      expect(await kinds(alice, lotId)).toEqual(['outbid', 'lot_withdrawn']);
      expect(await kinds(bob, lotId)).toEqual(['lot_withdrawn']);
      expect(JSON.stringify(await notices(bob, lotId))).not.toContain('подлинности');
    });

    it('повторная запись того же события не создаёт второго уведомления', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 30000);
      await h.bid(lotId, bob, 40000);
      const [row] = await h.q(`SELECT * FROM bidding_notifications WHERE user_id = $1 AND lot_id = $2`, [alice, lotId]);
      await expect(h.q(
        `INSERT INTO bidding_notifications (user_id, kind, lot_id, auction_id, dedupe_key, data) VALUES ($1, 'outbid', $2, $3, $4, '{}')`,
        [alice, lotId, row.auction_id, row.dedupe_key])).rejects.toThrow(/duplicate key/);
    });
  });

  describe('тексты', () => {
    it('на каждый вид есть текст; виды в коде и в ограничении таблицы совпадают', async () => {
      const [{ def }] = await h.q(`SELECT pg_get_constraintdef(oid) AS def FROM pg_constraint WHERE conname = 'bidding_notifications_kind_check'`);
      const inDb = [...def.matchAll(/'([a-z_]+)'::text/g)].map((m: RegExpMatchArray) => m[1]).sort();
      expect(inDb).toEqual([...NOTIFICATION_KINDS].sort());
      for (const kind of NOTIFICATION_KINDS) {
        const view = renderNotification(kind, { lot_no: 7, title: 'Пейзаж', price_kop: 1_250_000, hammer_kop: 1_250_000, ends_at: '2026-11-01T16:00:00Z',
          auction_slug: 'spring', auction_title: 'Весна', pseudonym_no: 3, limit_kop: 10_000_000 }, 42);
        expect(view.subject.length).toBeGreaterThan(10);
        expect(view.text).not.toMatch(/undefined|NaN|\[object/);
      }
      expect(renderNotification('outbid', { lot_no: 7, title: 'Пейзаж', price_kop: 1_250_000, ends_at: '2026-11-01T16:00:00Z' }, 42))
        .toMatchObject({ path: '/torgi/lot/42', text: expect.stringContaining('12') });
      expect(renderNotification('registration_approved', { auction_slug: 'spring', auction_title: 'Весна' }, null).path).toBe('/torgi/spring');
    });
  });

  describe('лента участника', () => {
    it('видит только свои, отмечает прочитанными перечисленные или все', async () => {
      const { lotId } = await market();
      await h.bid(lotId, alice, 30000);
      await h.bid(lotId, bob, 40000);
      await h.bid(lotId, alice, 50000);
      const before = await listMine(alice);
      const own = before.notifications.filter(n => n.kind === 'outbid');
      expect(before.unread).toBeGreaterThanOrEqual(own.length);
      expect(own[0]).toMatchObject({ read: false, path: expect.stringMatching(/^\/torgi\/lot\/\d+$/) });
      expect(before.notifications.every(n => !/участник\s*№?\s*\d/i.test(n.text.replace(/Ваш номер участника — \d+/, '')))).toBe(true);
      expect(await markRead(alice, [own[0].notification_id])).toBe(1);
      expect(await markRead(alice, [own[0].notification_id])).toBe(0);
      const bobNote = (await listMine(bob)).notifications.find(n => n.kind === 'outbid')!;
      expect(await markRead(alice, [bobNote.notification_id])).toBe(0);               // чужое не отмечается
      expect((await listMine(bob, { unreadOnly: true })).notifications.some(n => n.notification_id === bobNote.notification_id)).toBe(true);
      await markRead(alice, null);
      expect((await listMine(alice)).unread).toBe(0);
      expect((await listMine(alice, { limit: 1 })).notifications).toHaveLength(1);
    });
  });

  describe('очередь отправки', () => {
    const fake = (behaviour: (m: OutgoingMessage) => Promise<void> | void = () => undefined) => {
      const sent: OutgoingMessage[] = [];
      const transport: Transport = { name: 'fake', async send(m) { await behaviour(m); sent.push(m); } };
      return { transport, sent };
    };
    const clean = async () => { await h.q(`UPDATE bidding_notifications SET delivery_status = 'sent' WHERE delivery_status = 'pending'`); };
    const pend = async (userId: number, n = 1) => {
      const { auctionId } = await h.openAuction();
      const ids: number[] = [];
      for (let i = 0; i < n; i++) {
        ids.push(Number((await h.q(
          `INSERT INTO bidding_notifications (user_id, kind, auction_id, dedupe_key, data) VALUES ($1, 'registration_rejected', $2, $3, $4) RETURNING notification_id`,
          [userId, auctionId, `test:${randomUUID()}`, JSON.stringify({ auction_slug: 'x', auction_title: 'Тест' })]))[0].notification_id));
      }
      return ids;
    };

    it('отправляет, помечает отправленным; к тексту добавляет ссылку на сайт', async () => {
      await clean();
      const [id] = await pend(alice);
      const { transport, sent } = fake();
      expect(await dispatchOnce(transport, { baseUrl: 'https://virtgal.ru/' })).toMatchObject({ sent: 1, failed: 0, retried: 0 });
      expect(sent[0]).toMatchObject({ notificationId: id, userId: alice, subject: expect.stringContaining('Заявка отклонена') });
      expect(sent[0].to).toMatch(/^alice\d+@test\.io$/);
      expect(sent[0].text).toContain('https://virtgal.ru/torgi/x');
      expect((await h.q('SELECT delivery_status, attempts, sent_at FROM bidding_notifications WHERE notification_id = $1', [id]))[0])
        .toMatchObject({ delivery_status: 'sent', attempts: 1 });
      expect(await dispatchOnce(transport)).toMatchObject({ sent: 0 });                  // повторно не шлёт
    });

    it('сбой откладывает повтор с нарастающей паузой, адрес в тексте ошибки скрыт; после предела — failed', async () => {
      await clean();
      const [id] = await pend(bob);
      const { transport } = fake(m => { throw new Error(`SMTP отказал для ${m.to}`); });
      expect(await dispatchOnce(transport)).toMatchObject({ sent: 0, retried: 1 });
      let row = (await h.q('SELECT * FROM bidding_notifications WHERE notification_id = $1', [id]))[0];
      expect(row).toMatchObject({ delivery_status: 'pending', attempts: 1 });
      expect(row.last_error).toContain('[адрес]');
      expect(row.last_error).not.toContain('@test.io');
      expect(new Date(row.next_attempt_at).getTime()).toBeGreaterThan(Date.now() + 30_000);
      expect(await dispatchOnce(transport)).toMatchObject({ retried: 0, failed: 0 });   // срок повтора не пришёл
      for (let attempt = 2; attempt <= MAX_ATTEMPTS; attempt++) {
        await h.q(`UPDATE bidding_notifications SET next_attempt_at = now() WHERE notification_id = $1`, [id]);
        await dispatchOnce(transport);
      }
      row = (await h.q('SELECT * FROM bidding_notifications WHERE notification_id = $1', [id]))[0];
      expect(row).toMatchObject({ delivery_status: 'failed', attempts: MAX_ATTEMPTS });
    });

    it('после сбоя повтор удаётся', async () => {
      await clean();
      const [id] = await pend(alice);
      let fail = true;
      const { transport, sent } = fake(() => { if (fail) throw new Error('временный сбой'); });
      await dispatchOnce(transport);
      fail = false;
      await h.q(`UPDATE bidding_notifications SET next_attempt_at = now() WHERE notification_id = $1`, [id]);
      expect(await dispatchOnce(transport)).toMatchObject({ sent: 1 });
      expect(sent).toHaveLength(1);
    });

    it('без адреса почты — сразу failed без повторов; устаревшее не отправляется', async () => {
      await clean();
      const noMail = await h.user('nomail');
      await h.q(`UPDATE users SET email = '' WHERE user_id = $1`, [noMail]);
      const [a] = await pend(noMail);
      const [old] = await pend(alice);
      await h.q(`UPDATE bidding_notifications SET created_at = now() - interval '3 days' WHERE notification_id = $1`, [old]);
      const { transport, sent } = fake();
      expect(await dispatchOnce(transport)).toMatchObject({ sent: 0, failed: 1, expired: 1 });
      expect(sent).toHaveLength(0);
      expect((await h.q('SELECT delivery_status, attempts, last_error FROM bidding_notifications WHERE notification_id = $1', [a]))[0])
        .toMatchObject({ delivery_status: 'failed', attempts: 1, last_error: 'нет адреса электронной почты' });
      expect((await h.q('SELECT delivery_status FROM bidding_notifications WHERE notification_id = $1', [old]))[0].delivery_status).toBe('expired');
    });

    it('два отправщика одновременно не шлют одно и то же дважды', async () => {
      await clean();
      const ids = await pend(carol, 12);
      const { transport, sent } = fake(() => new Promise(resolve => setTimeout(resolve, 30)));
      const results = await Promise.all([dispatchOnce(transport, { batch: 6 }), dispatchOnce(transport, { batch: 6 })]);
      expect(results.reduce((sum, r) => sum + r.sent, 0)).toBe(12);
      expect(sent.map(m => m.notificationId).sort((x, y) => x - y)).toEqual(ids);
    });
  });

  describe('настройка канала', () => {
    it('по умолчанию внешняя отправка выключена; log — заглушка без адресов; неизвестное значение — ошибка', async () => {
      expect(transportFromEnv({} as NodeJS.ProcessEnv)).toBeNull();
      expect(transportFromEnv({ NOTIFY_TRANSPORT: 'none' } as NodeJS.ProcessEnv)).toBeNull();
      const t = transportFromEnv({ NOTIFY_TRANSPORT: 'log' } as NodeJS.ProcessEnv)!;
      const lines: string[] = [];
      const spy = jest.spyOn(console, 'log').mockImplementation((...a) => { lines.push(a.join(' ')); });
      await t.send({ notificationId: 5, userId: 9, to: 'secret@example.org', subject: 'Тема', text: 'Секретный текст' });
      spy.mockRestore();
      expect(lines.join('\n')).toContain('уведомление 5');
      expect(lines.join('\n')).not.toContain('secret@example.org');
      expect(lines.join('\n')).not.toContain('Секретный');
      expect(() => transportFromEnv({ NOTIFY_TRANSPORT: 'smtp' } as NodeJS.ProcessEnv)).toThrow(/нет/);
    });
  });
});
