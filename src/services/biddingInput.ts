// src/services/biddingInput.ts — разбор и проверка входных данных торгового движка (без обращения к БД).

export const MAX_RUB = 1_000_000_000;                       // потолок суммы: 1 млрд ₽ (в копейках помещается в безопасное целое)
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SLUG = /^[a-z0-9][a-z0-9-]{1,78}$/;
// дата со смещением («Z» или ±hh:mm): без него время неоднозначно (часовой пояс сервера и браузера может отличаться)
const ISO_WITH_OFFSET = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,6})?)?(Z|[+-]\d{2}:\d{2})$/;

/** Рубли (число или строка, не больше двух знаков после запятой) → копейки; всё остальное — null. */
export function parseRub(value: unknown): number | null {
  const text = typeof value === 'number' ? String(value) : typeof value === 'string' ? value.trim().replace(',', '.') : '';
  if (!/^\d{1,10}(\.\d{1,2})?$/.test(text)) return null;
  const rub = Number(text);
  if (!Number.isFinite(rub) || rub <= 0 || rub > MAX_RUB) return null;
  return Math.round(rub * 100);
}

export const isUuid = (value: unknown): value is string => typeof value === 'string' && UUID.test(value);
export const isSlug = (value: unknown): value is string => typeof value === 'string' && SLUG.test(value);

/** Строка даты со смещением → ISO (UTC); иначе null. */
export function parseInstant(value: unknown): string | null {
  if (typeof value !== 'string' || !ISO_WITH_OFFSET.test(value)) return null;
  const ms = Date.parse(value);
  return Number.isNaN(ms) ? null : new Date(ms).toISOString();
}

export function parseId(value: unknown): number | null {
  const n = typeof value === 'string' && /^\d{1,15}$/.test(value) ? Number(value) : typeof value === 'number' ? value : NaN;
  return Number.isSafeInteger(n) && n >= 1 ? n : null;
}

export function intInRange(value: unknown, min: number, max: number): number | null {
  const n = typeof value === 'number' ? value : typeof value === 'string' && /^-?\d+$/.test(value.trim()) ? Number(value) : NaN;
  return Number.isInteger(n) && n >= min && n <= max ? n : null;
}

export function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const t = value.trim();
  return t.length > 0 && t.length <= max ? t : null;
}

/** Причины отказа ставки: код → [HTTP-статус, сообщение для участника]. */
export const BID_REJECTIONS: Record<string, [number, string]> = {
  invalid_amount: [400, 'Укажите сумму ставки.'],
  no_such_lot: [404, 'Лот не найден.'],
  closed: [409, 'Торги по этому лоту завершены или ещё не начались.'],
  not_allowed: [403, 'Вы не можете делать ставки: проверьте профиль участника.'],
  not_admitted: [403, 'Вы не допущены к этому аукциону.'],
  seller_cannot_bid: [403, 'Владелец лота не может делать ставки.'],
  stale: [409, 'Цена изменилась, пока вы вводили ставку. Проверьте новую цену и повторите.'],
  not_higher_than_own_max: [422, 'Новый максимум должен быть выше вашего прежнего.'],
  below_minimum: [422, 'Ставка ниже минимально допустимой.'],
  over_limit: [422, 'Ставка превышает ваш лимит на этом аукционе.'],
  suspiciously_high: [422, 'Сумма слишком велика по сравнению с оценкой лота. Проверьте, нет ли опечатки.'],
};

export function bidRejection(reason: string): [number, string] {
  return BID_REJECTIONS[reason] ?? [422, 'Ставка не принята.'];
}

/** Причины отказа служебных операций (объявление, допуск, снятие лота). */
export const ADMIN_REJECTIONS: Record<string, string> = {
  no_such_auction: 'Аукцион не найден.',
  not_draft: 'Объявить можно только черновик.',
  dates_missing: 'Заполните даты открытия торгов, закрытия первого лота и предельного закрытия.',
  notice_too_short: 'Срок до открытия торгов короче установленного срока извещения.',
  close_before_open: 'Закрытие первого лота должно быть позже открытия торгов.',
  registration_after_open: 'Приём заявок должен заканчиваться до открытия торгов.',
  no_lots: 'В аукционе нет лотов.',
  hard_close_too_early: 'Предельное закрытие раньше закрытия последнего лота.',
  no_application: 'Заявки этого участника нет.',
  auction_over: 'Аукцион уже завершён.',
  kyc_not_approved: 'Сначала нужно одобрить проверку личности участника.',
  limit_required: 'Укажите лимит ставок участника.',
  reason_required: 'Укажите причину.',
  no_such_lot: 'Лот не найден.',
  wrong_state: 'В этом состоянии лот снять нельзя.',
  no_such_bid: 'Ставка не найдена.',
  already_annulled: 'Эта ставка уже аннулирована.',
  bid_not_accepted: 'Отклонённую ставку аннулировать нельзя: она ни на что не повлияла.',
  lot_not_open: 'Ставку можно аннулировать только пока в лоте идут торги.',
};
