// lib/biddingAdmin.ts — кабинет куратора торгов (/api/bidding/admin/*).
import { fetchWithAuth } from '../services/api';
import { ApiProblem } from './bidding';

export interface AdminAuction {
  auction_id: number; slug: string; title: string; description: string | null; status: string; notice_days: number;
  notice_published_at: string | null; registration_closes_at: string | null; bidding_opens_at: string | null;
  first_close_at: string | null; hard_close_at: string | null; soft_close_window_s: number; soft_close_extend_s: number;
  lot_close_stagger_s: number; min_bidders: number; deposit_kop: number; exposure_multiplier: number;
  lots?: number; pending_applications?: number;
}

export interface AdminLot {
  lot_id: number; lot_no: number; artwork_id: number | null; seller_user_id: number | null; snapshot: { title?: string; artist_name?: string };
  start_price_kop: number; reserve_kop: number | null; estimate_low_kop: number | null; estimate_high_kop: number | null; state: string;
  ends_at: string | null; current_price_kop: number; bid_count: number; version: number; close_outcome: string | null; hammer_kop: number | null;
  leader_user_id: number | null; winner_user_id: number | null;
}

export interface AdminRegistration {
  user_id: number; username: string; email: string; full_name: string; phone: string; kind: string; kyc_status: string; standing: string;
  status: string; pseudonym_no: number | null; limit_kop: number; deposit_kop: number; rules_accepted_at: string | null; rules_version: string | null;
  decided_at: string | null; reason: string | null;
}

export interface PendingParticipant { user_id: number; username: string; email: string; full_name: string; phone: string; kind: string; created_at: string }

export interface AdminBid {
  bid_id: number; created_at: string; user_id: number; username: string; kind: string; max_kop: number; price_after_kop: number | null;
  accepted: boolean; reject_reason: string | null; became_leader: boolean | null; extended_to: string | null; ip: string | null;
  annulled: boolean; annul_reason: string | null; annulled_at: string | null;
}

async function call<T>(url: string, method = 'GET', body?: unknown): Promise<T> {
  const res = await fetchWithAuth(url, body === undefined ? { method } : { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) {
    let data: any = null;
    try { data = await res.json(); } catch { /* тела нет */ }
    const message = res.status === 403 ? 'Недостаточно прав.' : res.status === 401 ? 'Войдите в аккаунт.' : res.status >= 500 ? 'Не удалось выполнить действие.' : (data?.error || 'Не удалось выполнить действие.');
    throw new ApiProblem(message, res.status, data?.code);
  }
  return res.json();
}

const base = '/api/bidding/admin';
export const adminAuctions = () => call<{ auctions: AdminAuction[] }>(`${base}/auctions`);
export const adminAuction = (id: number) => call<{ auction: AdminAuction; lots: AdminLot[] }>(`${base}/auctions/${id}`);
export const createAuction = (fields: Record<string, unknown>) => call<{ auction_id: number }>(`${base}/auctions`, 'POST', fields);
export const updateAuction = (id: number, fields: Record<string, unknown>) => call<{ ok: boolean }>(`${base}/auctions/${id}`, 'PATCH', fields);
export const addLot = (auctionId: number, fields: Record<string, unknown>) => call<{ lot_id: number }>(`${base}/auctions/${auctionId}/lots`, 'POST', fields);
export const announceAuction = (id: number) => call<{ status: string; lots: number }>(`${base}/auctions/${id}/announce`, 'POST', {});
export const withdrawLot = (lotId: number, reason: string) => call<{ status: string }>(`${base}/lots/${lotId}/withdraw`, 'POST', { reason });
export const registrations = (auctionId: number) => call<{ registrations: AdminRegistration[] }>(`${base}/auctions/${auctionId}/registrations`);
export const pendingParticipants = () => call<{ participants: PendingParticipant[] }>(`${base}/participants/pending`);
export const setKyc = (userId: number, status: 'approved' | 'rejected', note?: string) => call<{ ok: boolean }>(`${base}/participants/${userId}/kyc`, 'POST', { status, note });
export const decideRegistration = (auctionId: number, userId: number, approve: boolean, limitRub?: number, reason?: string) =>
  call<{ status: string }>(`${base}/auctions/${auctionId}/registrations/${userId}/decision`, 'POST', { approve, limit_rub: limitRub, reason });
export const annulBid = (bidId: number, reason: string) => call<{ status: string }>(`${base}/bids/${bidId}/annul`, 'POST', { reason });
export const lotBids = (lotId: number) => call<{ bids: AdminBid[] }>(`${base}/lots/${lotId}/bids`);
export const verifyChain = (key: number) => call<{ ok: boolean; checked: number; first_bad_event: number | null }>(`${base}/chains/${key}/verify`);

/** Значение поля datetime-local («2026-12-01T18:00», время по Москве) → ISO со смещением +03:00, которого требует сервер. */
export function moscowToIso(local: string): string | null {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(local) ? `${local}:00+03:00` : null;
}

export const KIND_LABEL: Record<string, string> = { person: 'Физическое лицо', legal_entity: 'Юридическое лицо', sole_proprietor: 'ИП' };
export const REGISTRATION_STATUS: Record<string, string> = {
  applied: 'Заявка подана', docs_pending: 'Ждём документы', under_review: 'На рассмотрении', approved: 'Одобрена', deposit_pending: 'Ждём задаток',
  active: 'Допущен', rejected: 'Отклонена', suspended: 'Приостановлен', closed: 'Закрыта',
};
export const REJECT_REASON: Record<string, string> = {
  below_minimum: 'ниже минимума', over_limit: 'сверх лимита', not_admitted: 'нет допуска', not_allowed: 'не разрешено', closed: 'торги закрыты',
  stale: 'устаревшая цена', seller_cannot_bid: 'продавец', not_higher_than_own_max: 'не выше своего максимума', suspiciously_high: 'слишком велика', invalid_amount: 'неверная сумма',
};
