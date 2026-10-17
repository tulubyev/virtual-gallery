import express from 'express';
import request from 'supertest';

jest.mock('../../config/database', () => ({ __esModule: true, default: { query: jest.fn(), connect: jest.fn() } }));
import pool from '../../config/database';
import auctionsRouter from '../../routes/auctions';

const mockPool = pool as unknown as { query: jest.Mock; connect: jest.Mock };

function app(user: { user_id: number; role: string } | null = { user_id: 7, role: 'auction_participant' }) {
  const a = express();
  a.use(express.json());
  a.use((req, _res, next) => { if (user) (req as any).user = user; next(); });
  a.use('/api/auctions', auctionsRouter);
  return a;
}

/** Подставное соединение: журнал запросов и ответ на выбор лота. */
function fakeClient(lot: Record<string, unknown> | null, opts: { failOn?: RegExp } = {}) {
  const log: Array<{ sql: string; params: unknown[] }> = [];
  const client = {
    release: jest.fn(),
    query: jest.fn(async (sql: string, params: unknown[] = []) => {
      log.push({ sql: sql.replace(/\s+/g, ' ').trim(), params });
      if (opts.failOn && opts.failOn.test(sql)) throw new Error('boom: secret db detail');
      if (/FROM auction_lots al JOIN auctions/.test(sql)) return { rows: lot ? [lot] : [] };
      if (/INSERT INTO bids/.test(sql)) return { rows: [{ bid_id: 1, lot_id: 5, amount: params[2], timestamp: 'now', is_winning: true }] };
      return { rows: [] };
    }),
  };
  mockPool.connect.mockResolvedValue(client);
  return { client, log, sqlOf: (re: RegExp) => log.filter(l => re.test(l.sql)) };
}

const openLot = (o: Record<string, unknown> = {}) => ({ lot_id: 5, starting_price: '1000.00', current_bid: '0', status: 'available', is_open: true, ...o });

beforeEach(() => {
  jest.clearAllMocks();
  mockPool.query.mockResolvedValue({ rows: [] }); // ensureTables
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('ставка на лот', () => {
  it('принимается в одной транзакции с блокировкой лота; ставит тот, кто вошёл, а не user_id из тела', async () => {
    const f = fakeClient(openLot());
    const res = await request(app()).post('/api/auctions/lots/5/bid').send({ amount: 1500, user_id: 999 });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ success: true, current_bid: 1500 });
    expect(res.body.bid).not.toHaveProperty('user_id');
    const order = f.log.map(l => l.sql.split(' ').slice(0, 3).join(' '));
    expect(order[0]).toBe('BEGIN');
    expect(f.sqlOf(/FOR UPDATE OF al/)).toHaveLength(1);
    expect(order[order.length - 1]).toBe('COMMIT');
    expect(f.sqlOf(/INSERT INTO bids/)[0].params).toEqual([5, 7, 1500]);
    expect(f.client.release).toHaveBeenCalledTimes(1);
  });

  it('тот же результат на старом адресе /bids', async () => {
    fakeClient(openLot());
    const res = await request(app()).post('/api/auctions/bids').send({ lot_id: 5, amount: '2000.5' });
    expect(res.status).toBe(200);
    expect(res.body.current_bid).toBe(2000.5);
  });

  it('без входа — 401, соединение с БД не берётся', async () => {
    const res = await request(app(null)).post('/api/auctions/lots/5/bid').send({ amount: 1500 });
    expect(res.status).toBe(401);
    expect(mockPool.connect).not.toHaveBeenCalled();
  });

  it.each([['abc'], [-5], [0], [''], [null], [1e12], [Infinity.toString()]])('некорректная сумма %p отклоняется до обращения к БД', async (amount) => {
    const res = await request(app()).post('/api/auctions/lots/5/bid').send({ amount });
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('invalid_bid');
    expect(mockPool.connect).not.toHaveBeenCalled();
  });

  it('некорректный номер лота — 400', async () => {
    const res = await request(app()).post('/api/auctions/lots/abc/bid').send({ amount: 1500 });
    expect(res.status).toBe(400);
  });

  it('ниже стартовой цены на лоте без ставок — отказ, запись не создаётся', async () => {
    const f = fakeClient(openLot());
    const res = await request(app()).post('/api/auctions/lots/5/bid').send({ amount: 1 });
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ code: 'bid_too_low', min_bid: 1000 });
    expect(f.sqlOf(/INSERT INTO bids/)).toHaveLength(0);
    expect(f.sqlOf(/^ROLLBACK/)).toHaveLength(1);
    expect(f.client.release).toHaveBeenCalledTimes(1);
  });

  it('равна стартовой — принимается (первая ставка), равна текущей — нет', async () => {
    fakeClient(openLot());
    expect((await request(app()).post('/api/auctions/lots/5/bid').send({ amount: 1000 })).status).toBe(200);
    fakeClient(openLot({ current_bid: '1500.00' }));
    const res = await request(app()).post('/api/auctions/lots/5/bid').send({ amount: 1500 });
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('bid_too_low');
  });

  it('торги закрыты или лот недоступен — отказ', async () => {
    fakeClient(openLot({ is_open: false }));
    expect((await request(app()).post('/api/auctions/lots/5/bid').send({ amount: 5000 })).body.code).toBe('auction_closed');
    fakeClient(openLot({ status: 'sold' }));
    expect((await request(app()).post('/api/auctions/lots/5/bid').send({ amount: 5000 })).body.code).toBe('lot_unavailable');
  });

  it('лот не найден — 404', async () => {
    fakeClient(null);
    expect((await request(app()).post('/api/auctions/lots/5/bid').send({ amount: 5000 })).status).toBe(404);
  });

  it('сбой БД: откат, 500 без подробностей, соединение возвращено', async () => {
    const f = fakeClient(openLot(), { failOn: /INSERT INTO bids/ });
    const res = await request(app()).post('/api/auctions/lots/5/bid').send({ amount: 5000 });
    expect(res.status).toBe(500);
    expect(JSON.stringify(res.body)).not.toContain('secret');
    expect(f.sqlOf(/^ROLLBACK/)).toHaveLength(1);
    expect(f.client.release).toHaveBeenCalledTimes(1);
  });
});

describe('публичные ответы не раскрывают лишнего', () => {
  const sqlOfCalls = () => mockPool.query.mock.calls.map(c => String(c[0])).join('\n');

  it('списки лотов не выбирают резервную цену и id ставивших', async () => {
    mockPool.query.mockImplementation(async (sql: string) => (/SELECT \* FROM auctions/.test(sql) ? { rows: [{ auction_id: 3, end_datetime: null }] } : { rows: [] }));
    await request(app(null)).get('/api/auctions/3/lots');
    await request(app(null)).get('/api/auctions/3');
    const sql = sqlOfCalls();
    // CREATE TABLE ... reserve_price DECIMAL — это схема; интересуют только выборки
    // только список выбираемых полей (до первого FROM): id ставившего нужен в JOIN, но наружу не отдаётся
    const selects = mockPool.query.mock.calls.map(c => String(c[0])).filter(q => /^\s*SELECT\s+(al|b)\./i.test(q)).map(q => q.split(/\bFROM\b/)[0]).join('\n');
    expect(selects.length).toBeGreaterThan(0);
    expect(selects).not.toMatch(/al\.\*/);
    expect(selects).not.toMatch(/reserve_price/);
    expect(selects).not.toMatch(/highest_bidder_id/);
    expect(sql).toContain('LEFT(u.username, 1)');
  });

  it('список ставок аукциона без user_id и с маской имени', async () => {
    await request(app(null)).get('/api/auctions/3/bids');
    const q = mockPool.query.mock.calls.map(c => String(c[0])).find(x => /FROM bids b/.test(x))!;
    expect(q).not.toMatch(/b\.\*/);
    expect(q.split('FROM bids b')[0]).not.toMatch(/user_id/); // в списке выбираемых полей; в JOIN он нужен
    expect(q).toContain("LEFT(u.username, 1) || '***'");
  });
});

describe('создание лота', () => {
  beforeEach(() => { mockPool.query.mockImplementation(async (sql: string) => (/SELECT auction_id FROM auctions/.test(sql) ? { rows: [{ auction_id: 3 }] } : { rows: [{ lot_id: 9 }] })); });
  const post = (body: object) => request(app({ user_id: 1, role: 'curator' })).post('/api/auctions/3/lots').send(body);

  it('требует корректную стартовую цену', async () => {
    expect((await post({ artwork_id: 1, starting_price: 'x' })).status).toBe(400);
    expect((await post({ artwork_id: 1 })).status).toBe(400);
  });
  it('резерв не ниже старта, «купить сейчас» выше старта', async () => {
    expect((await post({ artwork_id: 1, starting_price: 1000, reserve_price: 500 })).status).toBe(400);
    expect((await post({ artwork_id: 1, starting_price: 1000, buy_now_price: 1000 })).status).toBe(400);
  });
  it('корректный лот создаётся', async () => {
    const res = await post({ artwork_id: 1, starting_price: 1000, reserve_price: 2000, buy_now_price: 5000 });
    expect(res.status).toBe(200);
    const insert = mockPool.query.mock.calls.find(c => /INSERT INTO auction_lots/.test(String(c[0])))!;
    expect(insert[1]).toEqual(['3', 1, 1000, 2000, 5000]);
  });
});
