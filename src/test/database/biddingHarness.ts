// Общая обвязка для тестов на настоящем PostgreSQL (TEST_DATABASE_URL). Без переменной тесты пропускаются.
// Каждый набор тестов работает в собственной схеме PostgreSQL (search_path соединения), поэтому наборы идут параллельно
// и не задевают друг друга; схема создаётся заново при reset(). Имя базы обязано содержать «test».
import { randomUUID } from 'crypto';
import { Pool } from 'pg';
import { applyMigrations } from '../../database/migrator';

export const TEST_DSN = process.env.TEST_DATABASE_URL;
export const describeDb = TEST_DSN ? describe : describe.skip;

export const rub = (n: number) => n * 100;          // рубли → копейки

/** Пул с отдельной схемой (создаётся пустой) для набора тестов. */
export async function isolatedPool(max = 12): Promise<{ pool: Pool; schema: string }> {
  const schema = `t_${process.pid}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  const admin = new Pool({ connectionString: TEST_DSN, max: 1 });
  try {
    const { rows } = await admin.query('SELECT current_database() AS db');
    if (!/test/i.test(rows[0].db)) throw new Error(`Отказ: база «${rows[0].db}» не похожа на тестовую`);
    await admin.query(`CREATE SCHEMA "${schema}"`);
  } finally {
    await admin.end();
  }
  return { pool: new Pool({ connectionString: TEST_DSN, max, options: `-c search_path=${schema}` }), schema };
}

export interface Harness {
  pool: Pool;
  q: (sql: string, params?: any[]) => Promise<any[]>;
  user: (name?: string) => Promise<number>;
  participant: (userId: number, kyc?: 'pending' | 'approved' | 'rejected') => Promise<void>;
  /** Аукцион с лотами, объявленный и открытый; возвращает идентификаторы. */
  openAuction: (opts?: AuctionOpts) => Promise<{ auctionId: number; lotIds: number[] }>;
  admit: (auctionId: number, userId: number, limitRub?: number) => Promise<any>;
  bid: (lotId: number, userId: number, maxRub: number, extra?: { req?: string; version?: number | null }) => Promise<any>;
  lot: (lotId: number) => Promise<any>;
  setLotEnd: (lotId: number, interval: string) => Promise<void>;
  reset: () => Promise<void>;
  close: () => Promise<void>;
}

export interface AuctionOpts {
  lots?: Array<{ startRub?: number; reserveRub?: number; estimateHighRub?: number; sellerUserId?: number; artworkId?: number }>;
  minBidders?: number;
  softWindowS?: number;
  softExtendS?: number;
  staggerS?: number;
}

let counter = 0;

export async function createHarness(): Promise<Harness> {
  const { pool, schema } = await isolatedPool(12);
  const q = async (sql: string, params: any[] = []) => (await pool.query(sql, params)).rows;

  const reset = async () => {
    await pool.query(`DROP SCHEMA "${schema}" CASCADE; CREATE SCHEMA "${schema}";`);
    await pool.query(`
      CREATE TABLE users (user_id SERIAL PRIMARY KEY, username TEXT, role TEXT DEFAULT 'user');
      CREATE TABLE artworks (artwork_id SERIAL PRIMARY KEY, title TEXT);`);
    await applyMigrations(pool as any, undefined, () => undefined);
  };

  const user = async (name = 'u') => (await q('INSERT INTO users (username) VALUES ($1) RETURNING user_id', [`${name}${++counter}`]))[0].user_id;

  const participant = async (userId: number, kyc: 'pending' | 'approved' | 'rejected' = 'approved') => {
    await q(`INSERT INTO bidding_participants (user_id, kind, full_name, phone, kyc_status) VALUES ($1, 'person', 'Тест Тестов', '+70000000000', $2)`, [userId, kyc]);
  };

  const openAuction = async (opts: AuctionOpts = {}) => {
    const lots = opts.lots ?? [{ startRub: 10000 }];
    const slug = `test-${++counter}-${randomUUID().slice(0, 6)}`;
    const [{ auction_id: auctionId }] = await q(
      `INSERT INTO bidding_auctions (slug, title, increments_id, notice_days, bidding_opens_at, first_close_at, hard_close_at,
                                     min_bidders, soft_close_window_s, soft_close_extend_s, lot_close_stagger_s)
       VALUES ($1, 'Тестовый аукцион', (SELECT table_id FROM bidding_increment_tables WHERE name = 'default'), 0,
               now() + interval '1 hour', now() + interval '2 hours', now() + interval '1 day', $2, $3, $4, $5)
       RETURNING auction_id`,
      [slug, opts.minBidders ?? 2, opts.softWindowS ?? 180, opts.softExtendS ?? 180, opts.staggerS ?? 60]);
    const lotIds: number[] = [];
    for (const [i, lot] of lots.entries()) {
      const [{ lot_id }] = await q(
        `INSERT INTO bidding_lots (auction_id, lot_no, artwork_id, seller_user_id, snapshot, start_price_kop, reserve_kop, estimate_high_kop)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING lot_id`,
        [auctionId, i + 1, lot.artworkId ?? null, lot.sellerUserId ?? null, JSON.stringify({ title: `Лот ${i + 1}` }),
         rub(lot.startRub ?? 10000), lot.reserveRub ? rub(lot.reserveRub) : null, lot.estimateHighRub ? rub(lot.estimateHighRub) : null]);
      lotIds.push(Number(lot_id));
    }
    const announced = (await q('SELECT bidding_announce($1, NULL) AS r', [auctionId]))[0].r;
    if (announced.status !== 'announced') throw new Error(`announce: ${JSON.stringify(announced)}`);
    // «Наступило» время открытия торгов: двигаем его назад, закрытие первого лота остаётся в будущем
    await q(`UPDATE bidding_auctions SET bidding_opens_at = now() - interval '1 minute' WHERE auction_id = $1`, [auctionId]);
    await q('SELECT * FROM bidding_open_due_auctions()');
    return { auctionId: Number(auctionId), lotIds };
  };

  const admit = async (auctionId: number, userId: number, limitRub = 1_000_000) => {
    await q(`INSERT INTO bidding_registrations (auction_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [auctionId, userId]);
    return (await q('SELECT bidding_decide_registration($1, $2, true, $3, NULL) AS r', [auctionId, userId, rub(limitRub)]))[0].r;
  };

  const bid = async (lotId: number, userId: number, maxRub: number, extra: { req?: string; version?: number | null } = {}) =>
    (await q('SELECT bidding_place_bid($1, $2, $3, $4::uuid, $5) AS r', [lotId, userId, rub(maxRub), extra.req ?? randomUUID(), extra.version ?? null]))[0].r;

  const lot = async (lotId: number) => (await q('SELECT * FROM bidding_lots WHERE lot_id = $1', [lotId]))[0];
  const setLotEnd = async (lotId: number, interval: string) => {
    await q(`UPDATE bidding_lots SET ends_at = now() + $2::interval WHERE lot_id = $1`, [lotId, interval]);
  };

  return { pool, q, user, participant, openAuction, admit, bid, lot, setLotEnd, reset, close: async () => { await pool.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`).catch(() => undefined); await pool.end(); } };
}
