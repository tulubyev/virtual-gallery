// lib/bidding.ts — интерфейс торгов (/api/bidding): запросы, разбор ответов, часы и подписи.
// Суммы на сервере — в копейках; здесь они форматируются в рубли. Время — серверное: клиентские часы могут врать,
// поэтому оставшееся время считается со сдвигом, измеренным по `server_time` ответа.
import { fetchWithAuth } from '../services/api';

export interface AuctionSummary {
  slug: string;
  title: string;
  description: string | null;
  status: string;
  notice_published_at: string | null;
  registration_closes_at: string | null;
  bidding_opens_at: string | null;
  first_close_at: string | null;
  hard_close_at: string | null;
  lots: number;
}

export interface PublicLot {
  lot_id: number;
  auction_id: number;
  lot_no: number;
  snapshot: { title?: string; artist_name?: string; description?: string; year_created?: number; medium?: string; dimensions?: string; image_url?: string; thumbnail_url?: string };
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
  mine?: { leading: boolean; my_max_kop: number | null };
}

export interface HistoryItem { bid_id: number; at: string; price_kop: number; pseudonym: number; leader: boolean }

export interface AuctionView {
  server_time: string;
  auction: AuctionSummary & { auction_id: number; soft_close_window_s: number; soft_close_extend_s: number; min_bidders: number };
  lots: PublicLot[];
}

export interface Registration {
  slug: string; title: string; auction_status: string; status: string; pseudonym_no: number | null;
  limit_kop: number; deposit_kop: number; reason: string | null; kyc_status: string; standing: string;
}

export class ApiProblem extends Error {
  constructor(message: string, readonly status: number, readonly code?: string, readonly minBidKop?: number) { super(message); }
}

async function problem(res: Response, fallback: string): Promise<ApiProblem> {
  let body: any = null;
  try { body = await res.json(); } catch { /* тела нет */ }
  if (res.status === 401) return new ApiProblem('Войдите в аккаунт, чтобы продолжить.', 401, body?.code);
  if (res.status === 403 && !body?.error) return new ApiProblem('Недостаточно прав.', 403);
  if (res.status >= 500) return new ApiProblem(fallback, res.status);
  return new ApiProblem(typeof body?.error === 'string' ? body.error : fallback, res.status, body?.code, body?.min_bid_kop);
}

async function getJson<T>(url: string, fallback: string): Promise<T> {
  const res = await fetchWithAuth(url);
  if (!res.ok) throw await problem(res, fallback);
  return res.json();
}

async function send<T>(url: string, method: string, body: unknown, fallback: string): Promise<T> {
  const res = await fetchWithAuth(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body ?? {}) });
  if (!res.ok) throw await problem(res, fallback);
  return res.json();
}

// ── Чтение ─────────────────────────────────────────────────────────────────────────────────────

let enabledCache: Promise<boolean> | null = null;
/** Включён ли торговый движок на сервере (флаг приходит из /api/public-config). */
export function loadBiddingEnabled(): Promise<boolean> {
  if (!enabledCache) {
    enabledCache = fetch('/api/public-config').then(r => (r.ok ? r.json() : null)).then(d => !!d?.bidding?.enabled).catch(() => false);
  }
  return enabledCache;
}

export const listAuctions = () => getJson<{ server_time: string; auctions: AuctionSummary[] }>('/api/bidding/auctions', 'Не удалось загрузить аукционы.');
export const getAuction = (slug: string) => getJson<AuctionView>(`/api/bidding/auctions/${encodeURIComponent(slug)}`, 'Не удалось загрузить аукцион.');
export const getLot = (id: number) => getJson<{ server_time: string; lot: PublicLot; history: HistoryItem[] }>(`/api/bidding/lots/${id}`, 'Не удалось загрузить лот.');
export const pollLot = (id: number, since: number) =>
  getJson<{ changed: boolean; version?: number; server_time: string; lot?: PublicLot }>(`/api/bidding/lots/${id}/state?since=${since}`, 'Не удалось обновить лот.');
export const myRegistrations = () => getJson<{ registrations: Registration[] }>('/api/bidding/me/registrations', 'Не удалось загрузить ваши заявки.');

// ── Ставка и заявка ────────────────────────────────────────────────────────────────────────────

export interface BidAccepted { status: 'accepted' | 'duplicate'; leader?: boolean; price_kop?: number; ends_at?: string; extended?: boolean; version?: number; min_next_bid_kop?: number }

/** Идентификатор попытки: один и тот же при повторной отправке, чтобы сервер не создал вторую ставку. */
export function newRequestId(): string {
  const c: any = (globalThis as any).crypto;
  if (c?.randomUUID) return c.randomUUID();
  const hex = (n: number) => Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  return `${hex(8)}-${hex(4)}-4${hex(3)}-${'89ab'[Math.floor(Math.random() * 4)]}${hex(3)}-${hex(12)}`;
}

export const placeBid = (lotId: number, maxRub: number, requestId: string, expectedVersion?: number) =>
  send<BidAccepted>(`/api/bidding/lots/${lotId}/bids`, 'POST',
    { max_rub: maxRub, request_id: requestId, ...(expectedVersion === undefined ? {} : { expected_version: expectedVersion }) }, 'Не удалось отправить ставку.');

export interface ApplyInput { kind: 'person' | 'legal_entity' | 'sole_proprietor'; full_name: string; phone: string; rules_accepted: boolean; rules_version?: string }
export const applyForAuction = (slug: string, input: ApplyInput) =>
  send<{ status: string; pseudonym_no: number | null }>(`/api/bidding/auctions/${encodeURIComponent(slug)}/apply`, 'POST', input, 'Не удалось отправить заявку.');

// ── Деньги, время, подписи ─────────────────────────────────────────────────────────────────────

/** 1 234 500 копеек → «12 345 ₽»; копейки показываются, только если они есть. */
export function formatKop(kop: number | null | undefined): string {
  if (kop === null || kop === undefined || !Number.isFinite(kop)) return '—';
  const rub = kop / 100;
  const text = Number.isInteger(rub) ? rub.toLocaleString('ru-RU') : rub.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${text.replace(/[\s  ]/g, ' ')} ₽`;
}

/** Ввод суммы: «20 000», «20000,50», «20000.5» → рубли (≤ 2 знаков), иначе null. */
export function parseAmount(input: string): number | null {
  const text = input.replace(/[\s  ]/g, '').replace(',', '.');
  if (!/^\d{1,10}(\.\d{1,2})?$/.test(text)) return null;
  const value = Number(text);
  return value > 0 && value <= 1_000_000_000 ? value : null;
}

/** Сдвиг серверных часов относительно клиентских: прибавьте к Date.now(), чтобы получить время сервера. */
export function clockOffset(serverTime: string, clientNow: number = Date.now()): number {
  const server = Date.parse(serverTime);
  return Number.isNaN(server) ? 0 : server - clientNow;
}

export function remainingMs(endsAt: string | null, offsetMs: number, clientNow: number = Date.now()): number | null {
  if (!endsAt) return null;
  const end = Date.parse(endsAt);
  return Number.isNaN(end) ? null : Math.max(0, end - (clientNow + offsetMs));
}

/** 93 784 000 мс → «1 д 02:03:04»; меньше суток — «02:03:04»; конец — «завершён». */
export function formatRemaining(ms: number | null): string {
  if (ms === null) return '—';
  if (ms <= 0) return 'завершён';
  const total = Math.ceil(ms / 1000);
  const days = Math.floor(total / 86400);
  const hh = String(Math.floor((total % 86400) / 3600)).padStart(2, '0');
  const mm = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const ss = String(total % 60).padStart(2, '0');
  return `${days > 0 ? `${days} д ` : ''}${hh}:${mm}:${ss}`;
}

/** Время показывается по Москве: аукцион российский, и участники должны читать одни и те же часы. */
export function formatMoment(iso: string | null | undefined): string {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return `${date.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} МСК`;
}

export const AUCTION_STATUS: Record<string, string> = {
  announced: 'Объявлен', registration: 'Приём заявок', preview: 'Предпросмотр', bidding: 'Идут торги', closing: 'Завершение',
  closed: 'Торги завершены', settled: 'Расчёты завершены', archived: 'В архиве', cancelled: 'Отменён', draft: 'Черновик',
};

export const LOT_STATE: Record<string, string> = {
  approved: 'Ожидает начала торгов', open: 'Идут торги', unsold: 'Не продан', sold_awaiting_payment: 'Продан', paid: 'Продан', handed_over: 'Продан',
  settled: 'Продан', defaulted: 'Не оплачен', withdrawn: 'Снят с торгов',
};

export const OUTCOME_TEXT: Record<string, string> = {
  sold: 'Продан', no_bids: 'Ставок не было', single_bidder: 'Торги не состоялись: участвовал один участник', reserve_not_met: 'Не продан: цена ниже минимальной',
};

export type MyStatus = 'leading' | 'outbid' | null;
/** Положение вошедшего участника на лоте: лидирует, перебит или ставок не делал. */
export function myStatus(lot: Pick<PublicLot, 'mine'>): MyStatus {
  if (!lot.mine || lot.mine.my_max_kop === null) return null;
  return lot.mine.leading ? 'leading' : 'outbid';
}

/** Итог принятой ставки словами. */
export function describeBid(result: BidAccepted): { tone: 'good' | 'info'; text: string } {
  const price = formatKop(result.price_kop);
  if (result.status === 'duplicate') return { tone: 'info', text: 'Эта ставка уже была принята.' };
  const extra = result.extended ? ' Торги продлены.' : '';
  return result.leader
    ? { tone: 'good', text: `Вы лидируете. Текущая цена — ${price}.${extra}` }
    : { tone: 'info', text: `Ставка принята, но вас опередил участник с большим максимумом. Текущая цена — ${price}.${extra}` };
}

/** «1 ставка», «2 ставки», «5 ставок». */
export function bidsCount(n: number): string {
  const tail = n % 100, last = n % 10;
  const word = tail >= 11 && tail <= 14 ? 'ставок' : last === 1 ? 'ставка' : last >= 2 && last <= 4 ? 'ставки' : 'ставок';
  return `${n} ${word}`;
}

export function lotTitle(lot: Pick<PublicLot, 'snapshot' | 'lot_no'>): string {
  return lot.snapshot?.title || `Лот ${lot.lot_no}`;
}
export const lotImage = (lot: Pick<PublicLot, 'snapshot'>): string | null => lot.snapshot?.thumbnail_url || lot.snapshot?.image_url || null;
