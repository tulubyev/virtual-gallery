// src/services/bidding.ts — запросы к торговому движку (таблицы и функции bidding_*, миграция 001).
// Публичные представления никогда не содержат резерв, максимум лидера, идентификаторы пользователей и продавца:
// участники известны под номерами («участник № N»).
import { createHash } from 'crypto';
import pool from '../config/database';

const n = (v: unknown): number | null => (v === null || v === undefined ? null : Number(v));

export interface PublicLot {
  lot_id: number;
  auction_id: number;
  lot_no: number;
  snapshot: Record<string, unknown>;
  start_price_kop: number;
  estimate_low_kop: number | null;
  estimate_high_kop: number | null;
  state: string;
  ends_at: string | null;
  current_price_kop: number;
  bid_count: number;
  version: number;
  min_next_bid_kop: number;
  leader_pseudonym: number | null;
  close_outcome: string | null;
  hammer_kop: number | null;
  winner_pseudonym: number | null;
}

const LOT_SELECT = `
  SELECT l.lot_id, l.auction_id, l.lot_no, l.snapshot, l.start_price_kop, l.estimate_low_kop, l.estimate_high_kop,
         l.state, l.ends_at, l.current_price_kop, l.bid_count, l.version, l.close_outcome,
         CASE WHEN l.close_outcome = 'sold' THEN l.hammer_kop END AS hammer_kop,
         CASE WHEN l.bid_count = 0 THEN l.start_price_kop
              ELSE l.current_price_kop + bidding_increment(coalesce(l.increments_id, a.increments_id), l.current_price_kop) END AS min_next_bid_kop,
         lr.pseudonym_no AS leader_pseudonym,
         CASE WHEN l.close_outcome = 'sold' THEN wr.pseudonym_no END AS winner_pseudonym
  FROM bidding_lots l
  JOIN bidding_auctions a ON a.auction_id = l.auction_id
  LEFT JOIN bidding_registrations lr ON lr.auction_id = l.auction_id AND lr.user_id = l.leader_user_id
  LEFT JOIN bidding_registrations wr ON wr.auction_id = l.auction_id AND wr.user_id = l.winner_user_id`;
const PUBLIC_FILTER = `a.status NOT IN ('draft', 'cancelled') AND l.state <> 'draft'`;

export function publicLot(row: any): PublicLot {
  return {
    lot_id: Number(row.lot_id), auction_id: Number(row.auction_id), lot_no: row.lot_no, snapshot: row.snapshot,
    start_price_kop: Number(row.start_price_kop), estimate_low_kop: n(row.estimate_low_kop), estimate_high_kop: n(row.estimate_high_kop),
    state: row.state, ends_at: row.ends_at ? new Date(row.ends_at).toISOString() : null,
    current_price_kop: Number(row.current_price_kop), bid_count: row.bid_count, version: row.version,
    min_next_bid_kop: Number(row.min_next_bid_kop), leader_pseudonym: row.leader_pseudonym,
    close_outcome: row.close_outcome, hammer_kop: n(row.hammer_kop), winner_pseudonym: row.winner_pseudonym,
  };
}

export async function serverTime(): Promise<string> {
  return new Date((await pool.query('SELECT clock_timestamp() AS t')).rows[0].t).toISOString();
}

export async function listAuctions() {
  const { rows } = await pool.query(`
    SELECT a.slug, a.title, a.description, a.status, a.notice_published_at, a.registration_closes_at, a.bidding_opens_at,
           a.first_close_at, a.hard_close_at,
           (SELECT count(*)::int FROM bidding_lots l WHERE l.auction_id = a.auction_id AND l.state <> 'draft') AS lots
    FROM bidding_auctions a WHERE a.status NOT IN ('draft', 'cancelled')
    ORDER BY a.bidding_opens_at DESC NULLS LAST, a.auction_id DESC`);
  return rows;
}

export async function getAuction(slug: string) {
  const { rows } = await pool.query(`
    SELECT a.auction_id, a.slug, a.title, a.description, a.status, a.notice_published_at, a.registration_closes_at,
           a.bidding_opens_at, a.first_close_at, a.hard_close_at, a.soft_close_window_s, a.soft_close_extend_s, a.min_bidders
    FROM bidding_auctions a WHERE a.slug = $1 AND a.status NOT IN ('draft', 'cancelled')`, [slug]);
  if (!rows[0]) return null;
  const lots = (await pool.query(`${LOT_SELECT} WHERE l.auction_id = $1 AND ${PUBLIC_FILTER} ORDER BY l.lot_no`, [rows[0].auction_id])).rows;
  return { auction: { ...rows[0], auction_id: Number(rows[0].auction_id) }, lots: lots.map(publicLot) };
}

/** Лот для показа; для вошедшего пользователя добавляет его собственное положение (лидер ли он и какой у него максимум). */
export async function getLot(lotId: number, userId?: number) {
  const { rows } = await pool.query(`${LOT_SELECT} WHERE l.lot_id = $1 AND ${PUBLIC_FILTER}`, [lotId]);
  if (!rows[0]) return null;
  const lot: PublicLot & { mine?: { leading: boolean; my_max_kop: number | null } } = publicLot(rows[0]);
  if (userId) {
    const mine = (await pool.query(`
      SELECT (SELECT leader_user_id = $2 FROM bidding_lots WHERE lot_id = $1) AS leading,
             (SELECT max(max_kop) FROM bidding_bids b WHERE b.lot_id = $1 AND b.user_id = $2 AND b.accepted
                AND NOT EXISTS (SELECT 1 FROM bidding_bid_annulments n WHERE n.bid_id = b.bid_id)) AS my_max`, [lotId, userId])).rows[0];
    lot.mine = { leading: !!mine.leading, my_max_kop: n(mine.my_max) };
  }
  return lot;
}

/** Принятые ставки лота по номерам участников. Повышения собственного максимума и аннулированные ставки не показываются. */
export async function getLotHistory(lotId: number, limit = 100) {
  const { rows } = await pool.query(`
    SELECT b.bid_id, b.created_at, b.price_after_kop, b.became_leader, r.pseudonym_no
    FROM bidding_bids b
    JOIN bidding_lots l ON l.lot_id = b.lot_id
    JOIN bidding_registrations r ON r.auction_id = l.auction_id AND r.user_id = b.user_id
    WHERE b.lot_id = $1 AND b.accepted AND b.kind <> 'raise_max'
      AND NOT EXISTS (SELECT 1 FROM bidding_bid_annulments n WHERE n.bid_id = b.bid_id)
    ORDER BY b.bid_id DESC LIMIT $2`, [lotId, limit]);
  return rows.map((r: any) => ({
    bid_id: Number(r.bid_id), at: new Date(r.created_at).toISOString(), price_kop: Number(r.price_after_kop),
    pseudonym: r.pseudonym_no, leader: r.became_leader,
  }));
}

export async function placeBid(input: {
  lotId: number; userId: number; maxKop: number; requestId: string; expectedVersion: number | null; ip?: string; userAgent?: string;
}): Promise<any> {
  const uaHash = input.userAgent ? createHash('sha256').update(input.userAgent).digest() : null;
  const { rows } = await pool.query(
    'SELECT bidding_place_bid($1, $2, $3, $4::uuid, $5, $6::inet, $7) AS r',
    [input.lotId, input.userId, input.maxKop, input.requestId, input.expectedVersion, input.ip ?? null, uaHash]);
  return rows[0].r;
}

// ── Заявки участников ──────────────────────────────────────────────────────────────────────────

export type ApplyResult =
  | { ok: true; registration: { status: string; pseudonym_no: number | null } }
  | { ok: false; code: 'no_such_auction' | 'registration_closed' | 'kyc_rejected' | 'rules_required' | 'pd_consent_required' | 'standing' };

export async function applyForAuction(slug: string, userId: number, profile: { kind: string; full_name: string; phone: string },
                                      rulesAccepted: boolean, rulesVersion: string, pdConsentVersion: string | null): Promise<ApplyResult> {
  if (!rulesAccepted) return { ok: false, code: 'rules_required' };
  if (!pdConsentVersion) return { ok: false, code: 'pd_consent_required' };
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const auction = (await client.query(
      `SELECT auction_id, status, registration_closes_at, (registration_closes_at IS NULL OR registration_closes_at > clock_timestamp()) AS open
       FROM bidding_auctions WHERE slug = $1 AND status NOT IN ('draft', 'cancelled') FOR SHARE`, [slug])).rows[0];
    if (!auction) { await client.query('ROLLBACK'); return { ok: false, code: 'no_such_auction' }; }
    if (!auction.open || !['announced', 'registration', 'preview', 'bidding'].includes(auction.status)) {
      await client.query('ROLLBACK'); return { ok: false, code: 'registration_closed' };
    }
    const existing = (await client.query('SELECT kyc_status, standing FROM bidding_participants WHERE user_id = $1', [userId])).rows[0];
    if (existing?.kyc_status === 'rejected') { await client.query('ROLLBACK'); return { ok: false, code: 'kyc_rejected' }; }
    if (existing && existing.standing !== 'active') { await client.query('ROLLBACK'); return { ok: false, code: 'standing' }; }
    // Профиль можно обновить, пока проверка не пройдена; после одобрения ФИО и телефон меняет только куратор
    await client.query(`
      INSERT INTO bidding_participants (user_id, kind, full_name, phone) VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id) DO UPDATE SET kind = EXCLUDED.kind, full_name = EXCLUDED.full_name, phone = EXCLUDED.phone
      WHERE bidding_participants.kyc_status = 'pending'`, [userId, profile.kind, profile.full_name, profile.phone]);
    await client.query(`
      INSERT INTO bidding_registrations (auction_id, user_id, rules_accepted_at, rules_version, pd_consent_at, pd_consent_version)
      VALUES ($1, $2, now(), $3, now(), $4)
      ON CONFLICT (auction_id, user_id) DO NOTHING`, [auction.auction_id, userId, rulesVersion, pdConsentVersion]);
    const registration = (await client.query(
      'SELECT status, pseudonym_no FROM bidding_registrations WHERE auction_id = $1 AND user_id = $2', [auction.auction_id, userId])).rows[0];
    await client.query('COMMIT');
    return { ok: true, registration };
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

export async function myRegistrations(userId: number) {
  const { rows } = await pool.query(`
    SELECT a.slug, a.title, a.status AS auction_status, r.status, r.pseudonym_no, r.limit_kop, r.deposit_kop, r.reason,
           p.kyc_status, p.standing
    FROM bidding_registrations r
    JOIN bidding_auctions a ON a.auction_id = r.auction_id
    JOIN bidding_participants p ON p.user_id = r.user_id
    WHERE r.user_id = $1 ORDER BY r.created_at DESC`, [userId]);
  return rows.map((r: any) => ({ ...r, limit_kop: Number(r.limit_kop), deposit_kop: Number(r.deposit_kop) }));
}

// ── Кураторская часть ──────────────────────────────────────────────────────────────────────────

const AUCTION_COLUMNS = ['slug', 'title', 'description', 'notice_days', 'registration_closes_at', 'bidding_opens_at', 'first_close_at',
  'hard_close_at', 'soft_close_window_s', 'soft_close_extend_s', 'lot_close_stagger_s', 'min_bidders', 'deposit_kop', 'exposure_multiplier'];
export type AuctionFields = Partial<Record<(typeof AUCTION_COLUMNS)[number], unknown>>;

export async function adminListAuctions() {
  return (await pool.query(`
    SELECT a.*, (SELECT count(*)::int FROM bidding_lots l WHERE l.auction_id = a.auction_id) AS lots,
           (SELECT count(*)::int FROM bidding_registrations r WHERE r.auction_id = a.auction_id AND r.status IN ('applied','docs_pending','under_review')) AS pending_applications
    FROM bidding_auctions a ORDER BY a.auction_id DESC`)).rows.map((a: any) => ({ ...a, auction_id: Number(a.auction_id), deposit_kop: Number(a.deposit_kop) }));
}

export async function adminGetAuction(id: number) {
  const a = (await pool.query('SELECT * FROM bidding_auctions WHERE auction_id = $1', [id])).rows[0];
  if (!a) return null;
  const lots = (await pool.query(`
    SELECT l.lot_id, l.lot_no, l.artwork_id, l.seller_user_id, l.snapshot, l.start_price_kop, l.reserve_kop, l.estimate_low_kop, l.estimate_high_kop,
           l.state, l.ends_at, l.current_price_kop, l.bid_count, l.version, l.close_outcome, l.hammer_kop, l.leader_user_id, l.winner_user_id,
           wp.full_name AS winner_name, wp.phone AS winner_phone, wr.pseudonym_no AS winner_pseudonym
    FROM bidding_lots l
    LEFT JOIN bidding_participants wp ON wp.user_id = l.winner_user_id
    LEFT JOIN bidding_registrations wr ON wr.auction_id = l.auction_id AND wr.user_id = l.winner_user_id
    WHERE l.auction_id = $1 ORDER BY l.lot_no`, [id])).rows;
  const num = (v: unknown) => n(v);
  return {
    auction: { ...a, auction_id: Number(a.auction_id), deposit_kop: Number(a.deposit_kop) },
    lots: lots.map((l: any) => ({
      ...l, lot_id: Number(l.lot_id), start_price_kop: Number(l.start_price_kop), reserve_kop: num(l.reserve_kop),
      estimate_low_kop: num(l.estimate_low_kop), estimate_high_kop: num(l.estimate_high_kop), current_price_kop: Number(l.current_price_kop),
      hammer_kop: num(l.hammer_kop),
    })),
  };
}

export async function createAuction(fields: AuctionFields, createdBy: number): Promise<number> {
  const cols = Object.keys(fields).filter(k => AUCTION_COLUMNS.includes(k) && k !== 'title');   // название — отдельным столбцом
  const placeholders = cols.map((_, i) => `$${i + 3}`);
  const { rows } = await pool.query(
    `INSERT INTO bidding_auctions (title, created_by${cols.length ? ', ' + cols.join(', ') : ''}, increments_id)
     VALUES ($1, $2${cols.length ? ', ' + placeholders.join(', ') : ''}, (SELECT table_id FROM bidding_increment_tables WHERE name = 'default'))
     RETURNING auction_id`,
    [fields.title ?? 'Без названия', createdBy, ...cols.map(c => fields[c])]);
  return Number(rows[0].auction_id);
}

/** Изменить поля черновика; false — аукцион не найден или уже объявлен. */
export async function updateDraftAuction(id: number, fields: AuctionFields): Promise<boolean> {
  const cols = Object.keys(fields).filter(k => AUCTION_COLUMNS.includes(k));
  if (cols.length === 0) return true;
  const sets = cols.map((c, i) => `${c} = $${i + 2}`).join(', ');
  const result = await pool.query(`UPDATE bidding_auctions SET ${sets}, updated_at = now() WHERE auction_id = $1 AND status = 'draft'`,
    [id, ...cols.map(c => fields[c])]);
  return result.rowCount === 1;
}

const ARTWORK_KEYS = ['title', 'artist_name', 'year_created', 'medium', 'dimensions', 'description', 'image_url', 'thumbnail_url'];

export async function artworkSnapshot(artworkId: number): Promise<Record<string, unknown> | null> {
  const { rows } = await pool.query('SELECT to_jsonb(a) AS row FROM artworks a WHERE a.artwork_id = $1', [artworkId]);
  if (!rows[0]) return null;
  return Object.fromEntries(ARTWORK_KEYS.filter(k => rows[0].row[k] != null).map(k => [k, rows[0].row[k]]));
}

export interface NewLot {
  auctionId: number; artworkId: number | null; sellerUserId: number | null; snapshot: Record<string, unknown>;
  startKop: number; reserveKop: number | null; estimateLowKop: number | null; estimateHighKop: number | null; lotNo?: number;
}

/** Добавить лот в черновик. null — аукцион не найден или не черновик. */
export async function addLot(lot: NewLot): Promise<number | null> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const auction = (await client.query(`SELECT status FROM bidding_auctions WHERE auction_id = $1 FOR UPDATE`, [lot.auctionId])).rows[0];
    if (!auction || auction.status !== 'draft') { await client.query('ROLLBACK'); return null; }
    const no = lot.lotNo ?? (await client.query('SELECT coalesce(max(lot_no), 0) + 1 AS n FROM bidding_lots WHERE auction_id = $1', [lot.auctionId])).rows[0].n;
    const { rows } = await client.query(`
      INSERT INTO bidding_lots (auction_id, lot_no, artwork_id, seller_user_id, snapshot, start_price_kop, reserve_kop, estimate_low_kop, estimate_high_kop)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING lot_id`,
      [lot.auctionId, no, lot.artworkId, lot.sellerUserId, JSON.stringify(lot.snapshot), lot.startKop, lot.reserveKop, lot.estimateLowKop, lot.estimateHighKop]);
    await client.query('COMMIT');
    return Number(rows[0].lot_id);
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

export async function announce(auctionId: number, actorId: number) {
  return (await pool.query('SELECT bidding_announce($1, $2) AS r', [auctionId, actorId])).rows[0].r;
}

export async function withdrawLot(lotId: number, actorId: number, reason: string) {
  return (await pool.query('SELECT bidding_withdraw_lot($1, $2, $3) AS r', [lotId, actorId, reason])).rows[0].r;
}

/** Аннулировать принятую ставку в лоте, где идут торги: состояние лота пересчитывается, запись остаётся в журнале с причиной. */
export async function annulBid(bidId: number, actorId: number, reason: string) {
  return (await pool.query('SELECT bidding_annul_bid($1, $2, $3) AS r', [bidId, actorId, reason])).rows[0].r;
}

/** Отметка куратора о расчётах по проданному лоту: paid, defaulted (нужна причина), handed_over, settled. */
export async function setLotSettlement(lotId: number, actorId: number, to: string, note: string | null) {
  return (await pool.query('SELECT bidding_set_lot_settlement($1, $2, $3, $4) AS r', [lotId, actorId, to, note])).rows[0].r;
}

/** Завершение аукциона вручную: closed → settled → archived. */
export async function setAuctionStatus(auctionId: number, actorId: number, to: string, note: string | null) {
  return (await pool.query('SELECT bidding_set_auction_status($1, $2, $3, $4) AS r', [auctionId, actorId, to, note])).rows[0].r;
}

export async function listRegistrations(auctionId: number) {
  const { rows } = await pool.query(`
    SELECT r.user_id, u.username, u.email, p.full_name, p.phone, p.kind, p.kyc_status, p.standing,
           r.status, r.pseudonym_no, r.limit_kop, r.deposit_kop, r.rules_accepted_at, r.rules_version, r.pd_consent_at, r.pd_consent_version, r.decided_at, r.reason
    FROM bidding_registrations r
    JOIN bidding_participants p ON p.user_id = r.user_id
    JOIN users u ON u.user_id = r.user_id
    WHERE r.auction_id = $1 ORDER BY r.created_at`, [auctionId]);
  return rows.map((r: any) => ({ ...r, limit_kop: Number(r.limit_kop), deposit_kop: Number(r.deposit_kop) }));
}

export async function decideRegistration(auctionId: number, userId: number, approve: boolean, limitKop: number | null, actorId: number, reason: string | null) {
  return (await pool.query('SELECT bidding_decide_registration($1, $2, $3, $4, $5, $6) AS r',
    [auctionId, userId, approve, limitKop, actorId, reason])).rows[0].r;
}

export async function setKyc(userId: number, status: 'approved' | 'rejected', actorId: number, note: string | null): Promise<boolean> {
  const result = await pool.query(
    `UPDATE bidding_participants SET kyc_status = $2, kyc_reviewed_by = $3, kyc_reviewed_at = now(), kyc_note = $4 WHERE user_id = $1`,
    [userId, status, actorId, note]);
  return result.rowCount === 1;
}

export async function pendingParticipants() {
  return (await pool.query(`
    SELECT p.user_id, u.username, u.email, p.full_name, p.phone, p.kind, p.created_at
    FROM bidding_participants p JOIN users u ON u.user_id = p.user_id
    WHERE p.kyc_status = 'pending' ORDER BY p.created_at`)).rows;
}

export async function verifyChain(chainKey: number) {
  const r = (await pool.query('SELECT * FROM bidding_verify_chain($1)', [chainKey])).rows[0];
  return { ok: r.ok, checked: r.checked, first_bad_event: r.first_bad_event ? Number(r.first_bad_event) : null };
}

/** Все ставки лота, включая отказанные, с пользователями и максимумами — для разбора споров. */
export async function adminLotBids(lotId: number) {
  const { rows } = await pool.query(`
    SELECT b.bid_id, b.created_at, b.user_id, u.username, b.kind, b.max_kop, b.price_after_kop, b.accepted, b.reject_reason,
           b.became_leader, b.extended_to, host(b.ip) AS ip,
           (n.bid_id IS NOT NULL) AS annulled, n.reason AS annul_reason, n.created_at AS annulled_at
    FROM bidding_bids b JOIN users u ON u.user_id = b.user_id
    LEFT JOIN bidding_bid_annulments n ON n.bid_id = b.bid_id
    WHERE b.lot_id = $1 ORDER BY b.bid_id`, [lotId]);
  return rows.map((r: any) => ({ ...r, bid_id: Number(r.bid_id), max_kop: Number(r.max_kop), price_after_kop: n(r.price_after_kop) }));
}

// ── Воркер ─────────────────────────────────────────────────────────────────────────────────────

/** Один проход воркера: открыть наступившие торги, закрыть истёкшие лоты. */
export async function tick(): Promise<{ opened: number[]; closed: Array<{ lot_id: number; outcome: string }> }> {
  const opened = (await pool.query('SELECT * FROM bidding_open_due_auctions()')).rows.map((r: any) => Number(r.bidding_open_due_auctions));
  const closed = (await pool.query('SELECT * FROM bidding_close_due_lots(50)')).rows.map((r: any) => ({ lot_id: Number(r.lot_id), outcome: r.outcome }));
  return { opened, closed };
}
