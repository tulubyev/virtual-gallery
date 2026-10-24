// src/services/biddingNotifications.ts — уведомления участникам торгов: тексты, лента в кабинете, очередь отправки.
// Записи создают триггеры БД (миграция 004) в той же транзакции, что и событие. Тексты — черновик: формулировки утверждает юрист.
import pool from '../config/database';
import type { Transport } from './notificationTransports';

export const NOTIFICATION_KINDS = [
  'outbid', 'lot_won', 'lot_lost', 'lot_unsold', 'lot_withdrawn', 'registration_approved', 'registration_rejected', 'bid_annulled',
] as const;
export type NotificationKind = (typeof NOTIFICATION_KINDS)[number];

export interface RenderedNotification { subject: string; text: string; path: string | null }

const rub = (kop: unknown): string => {
  const value = Number(kop);
  return Number.isFinite(value) ? `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(value / 100)} ₽` : '—';
};
const moscow = (iso: unknown): string => {
  const date = typeof iso === 'string' ? new Date(iso) : null;
  return date && !Number.isNaN(date.getTime())
    ? `${new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(date)} МСК`
    : '—';
};
const lotName = (data: any): string => `№${data.lot_no}${data.title ? ` «${data.title}»` : ''}`;

/** Текст уведомления по виду и данным записи. Адрес ссылки — путь на сайте (к нему добавляется PUBLIC_BASE_URL при отправке). */
export function renderNotification(kind: NotificationKind, data: any, lotId: number | null): RenderedNotification {
  const lotPath = lotId ? `/torgi/lot/${lotId}` : null;
  const auctionPath = data?.auction_slug ? `/torgi/${data.auction_slug}` : null;
  switch (kind) {
    case 'outbid':
      return { subject: `Вашу ставку перебили: лот ${lotName(data)}`, path: lotPath,
        text: `Вашу ставку на лот ${lotName(data)} перебили. Текущая цена — ${rub(data.price_kop)}. Торги по лоту идут до ${moscow(data.ends_at)}.` };
    case 'lot_won':
      return { subject: `Торги завершены: лот ${lotName(data)} за вами`, path: lotPath,
        text: `Торги по лоту ${lotName(data)} завершены, лот за вами. Цена молотка — ${rub(data.hammer_kop)}. Дальнейшие шаги описаны в правилах аукциона.` };
    case 'lot_lost':
      return { subject: `Торги завершены: лот ${lotName(data)}`, path: lotPath,
        text: `Торги по лоту ${lotName(data)} завершены, лот достался другому участнику.` };
    case 'lot_unsold':
      return { subject: `Торги завершены без продажи: лот ${lotName(data)}`, path: lotPath,
        text: `Торги по лоту ${lotName(data)} завершены без продажи.` };
    case 'lot_withdrawn':
      return { subject: `Лот ${lotName(data)} снят с торгов`, path: lotPath,
        text: `Организатор снял лот ${lotName(data)} с торгов. Ваши ставки по нему не учитываются.` };
    case 'registration_approved':
      return { subject: `Заявка одобрена: ${data.auction_title ?? 'аукцион'}`, path: auctionPath,
        text: `Ваша заявка на участие в аукционе «${data.auction_title ?? ''}» одобрена. Ваш номер участника — ${data.pseudonym_no ?? '—'}, лимит ставок — ${rub(data.limit_kop)}.` };
    case 'registration_rejected':
      return { subject: `Заявка отклонена: ${data.auction_title ?? 'аукцион'}`, path: auctionPath,
        text: `Ваша заявка на участие в аукционе «${data.auction_title ?? ''}» отклонена. Подробности — у организатора.` };
    case 'bid_annulled':
      return { subject: `Ставка аннулирована: лот ${lotName(data)}`, path: lotPath,
        text: `Организатор аннулировал вашу ставку на лот ${lotName(data)}. Подробности — у организатора.` };
  }
}

// ── Лента в кабинете ───────────────────────────────────────────────────────────────────────────

export async function listMine(userId: number, options: { unreadOnly?: boolean; limit?: number } = {}) {
  const limit = Math.min(Math.max(options.limit ?? 30, 1), 100);
  const { rows } = await pool.query(`
    SELECT notification_id, kind, lot_id, data, created_at, read_at
    FROM bidding_notifications
    WHERE user_id = $1 AND ($2::boolean IS NOT TRUE OR read_at IS NULL)
    ORDER BY notification_id DESC LIMIT $3`, [userId, options.unreadOnly ?? false, limit]);
  const unread = Number((await pool.query('SELECT count(*) AS n FROM bidding_notifications WHERE user_id = $1 AND read_at IS NULL', [userId])).rows[0].n);
  return {
    unread,
    notifications: rows.map((r: any) => {
      const view = renderNotification(r.kind, r.data, r.lot_id === null ? null : Number(r.lot_id));
      return {
        notification_id: Number(r.notification_id), kind: r.kind as NotificationKind, title: view.subject, text: view.text, path: view.path,
        created_at: new Date(r.created_at).toISOString(), read: r.read_at !== null,
      };
    }),
  };
}

/** Отметить прочитанными свои уведомления: перечисленные или (ids = null) все. Возвращает число отмеченных. */
export async function markRead(userId: number, ids: number[] | null): Promise<number> {
  const result = await pool.query(
    `UPDATE bidding_notifications SET read_at = now() WHERE user_id = $1 AND read_at IS NULL AND ($2::bigint[] IS NULL OR notification_id = ANY($2::bigint[]))`,
    [userId, ids]);
  return result.rowCount ?? 0;
}

// ── Отправка вовне ─────────────────────────────────────────────────────────────────────────────

export const MAX_ATTEMPTS = 5;
const BACKOFF_S = [60, 300, 1800, 7200, 21600];            // пауза после 1-й, 2-й, … неудачи
const SEND_TIMEOUT_MS = 15_000;
export const STALE_AFTER = '2 days';                       // неотправленное дольше не шлём: «перебили» двухдневной давности — не новость

export interface DispatchResult { sent: number; failed: number; retried: number; expired: number }

const withTimeout = <T>(work: Promise<T>, ms: number): Promise<T> =>
  Promise.race([work, new Promise<T>((_, reject) => { const t = setTimeout(() => reject(new Error('таймаут отправки')), ms); t.unref?.(); })]);

/**
 * Один проход: устаревшие помечает «expired», остальные отправляет пачкой под блокировкой SKIP LOCKED (несколько экземпляров не шлют дважды).
 * Ошибка отправки откладывает повтор по расписанию BACKOFF_S; после MAX_ATTEMPTS запись получает статус failed. Текст ошибки сохраняется без адреса.
 */
export async function dispatchOnce(transport: Transport, options: { batch?: number; baseUrl?: string } = {}): Promise<DispatchResult> {
  const result: DispatchResult = { sent: 0, failed: 0, retried: 0, expired: 0 };
  const baseUrl = (options.baseUrl ?? process.env.PUBLIC_BASE_URL ?? '').replace(/\/+$/, '');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    result.expired = (await client.query(
      `UPDATE bidding_notifications SET delivery_status = 'expired'
        WHERE delivery_status = 'pending' AND created_at < now() - $1::interval`, [STALE_AFTER])).rowCount ?? 0;
    const due = (await client.query(`
      SELECT n.notification_id, n.user_id, n.kind, n.lot_id, n.data, n.attempts, u.email
      FROM bidding_notifications n JOIN users u ON u.user_id = n.user_id
      WHERE n.delivery_status = 'pending' AND n.next_attempt_at <= now()
      ORDER BY n.notification_id LIMIT $1 FOR UPDATE OF n SKIP LOCKED`, [options.batch ?? 25])).rows;
    for (const row of due) {
      const attempts = row.attempts + 1;
      try {
        if (typeof row.email !== 'string' || !row.email.includes('@')) throw Object.assign(new Error('нет адреса электронной почты'), { permanent: true });
        const view = renderNotification(row.kind, row.data, row.lot_id === null ? null : Number(row.lot_id));
        const link = view.path ? `\n\n${baseUrl}${view.path}` : '';
        await withTimeout(transport.send({ notificationId: Number(row.notification_id), userId: row.user_id, to: row.email, subject: view.subject, text: `${view.text}${link}` }), SEND_TIMEOUT_MS);
        await client.query(`UPDATE bidding_notifications SET delivery_status = 'sent', attempts = $2, sent_at = now(), last_error = NULL WHERE notification_id = $1`,
          [row.notification_id, attempts]);
        result.sent++;
      } catch (error: any) {
        const final = error?.permanent === true || attempts >= MAX_ATTEMPTS;
        const message = String(error?.message ?? error).replace(/\S+@\S+/g, '[адрес]').slice(0, 200);
        await client.query(
          `UPDATE bidding_notifications SET attempts = $2, last_error = $3, delivery_status = $4, next_attempt_at = now() + make_interval(secs => $5) WHERE notification_id = $1`,
          [row.notification_id, attempts, message, final ? 'failed' : 'pending', BACKOFF_S[Math.min(attempts - 1, BACKOFF_S.length - 1)]]);
        if (final) result.failed++; else result.retried++;
      }
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
  return result;
}

/** Фоновая отправка раз в intervalMs. Без таблиц (миграция 004 не применена) молчит и проверяет раз в минуту. */
export function startNotificationDispatcher(transport: Transport, options: { intervalMs?: number; log?: (m: string) => void } = {}) {
  const interval = options.intervalMs ?? 10_000;
  const log = options.log ?? ((m: string) => console.log(`[notify] ${m}`));
  let stopped = false;
  let timer: NodeJS.Timeout | undefined;
  let warned = false;
  const loop = async () => {
    let delay = interval;
    try {
      const r = await dispatchOnce(transport);
      warned = false;
      if (r.sent || r.failed || r.expired) log(`отправлено ${r.sent}, окончательно не удалось ${r.failed}, устарело ${r.expired}`);
    } catch (error: any) {
      if (error?.code === '42P01') {
        if (!warned) log('таблица уведомлений не найдена — примените миграции (npm run migrate); проверка раз в минуту');
        warned = true;
        delay = 60_000;
      } else {
        console.error('[notify] сбой отправки:', error?.message);
        delay = Math.max(interval, 30_000);
      }
    }
    if (!stopped) { timer = setTimeout(loop, delay); timer.unref?.(); }
  };
  timer = setTimeout(loop, interval);
  timer.unref?.();
  return { stop() { stopped = true; if (timer) clearTimeout(timer); } };
}
