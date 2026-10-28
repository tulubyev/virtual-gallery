// lib/artworkCards.ts — кабинет карточек произведений (/api/artwork-cards): запросы, подписи, разбор форм.
// Правила (кто что может, какие переходы допустимы, что считается суждением о подлинности и цене) решает сервер;
// здесь — только отображение и подготовка данных формы. Описание — docs/ARTWORK-CARD.md.
import { fetchWithAuth } from '../services/api';

export type CardStatus = 'draft' | 'needs_review' | 'approved' | 'published' | 'archived';
export type FragmentStatus = 'catalogued' | 'from_document' | 'visible' | 'ai_inferred';
export type Language = 'ru' | 'en';
export const BLOCKS = ['about_work', 'about_artist', 'provenance', 'exhibitions', 'acquisition', 'inscriptions'] as const;
export type Block = typeof BLOCKS[number];

export interface CardSource {
  kind: 'db' | 'document' | 'curator' | 'external';
  id?: string | number; title?: string; quote?: string; page?: number | string; url?: string; license?: string; access?: 'public' | 'staff';
}

export interface Fragment {
  fragment_id: number; artwork_id: number; block: Block; position: number; language: Language; text: string; status: FragmentStatus;
  confidence: 'established' | 'uncertain'; sources: CardSource[]; approved_by: number | null; approved_at: string | null; version: number;
}

export interface CardArtwork {
  artwork_id: number; title: string; artist_name: string; year_created: number | null; medium: string | null; dimensions: string | null;
  image_url: string | null; thumbnail_url: string | null;
  title_en: string | null; medium_en: string | null; attribution_note: string | null; attribution_note_en: string | null; inventory_number: string | null;
  dating_text: string | null; year_from: number | null; year_to: number | null; dating_certainty: 'exact' | 'approx' | 'unknown' | null;
  provenance: string | null; inscriptions: string | null; image_rights_holder: string | null; image_rights_note: string | null;
  card_status: CardStatus; card_reviewed_by: number | null; card_reviewed_at: string | null;
}

export interface Problem { code: string; message: string; fragment_id?: number }
export interface Violation { code: string; match: string }
export interface FullCard { artwork: CardArtwork; fragments: Fragment[]; problems: Problem[]; allowed_transitions: CardStatus[] }
export interface QueueItem {
  artwork_id: number; title: string; artist_name: string; card_status: CardStatus; card_reviewed_at: string | null;
  fragments: number; pending: number; ai_inferred: number;
}

/** Ошибка API карточек: сообщение для человека плюс подробности (проблемы готовности, найденные суждения). */
export class CardApiError extends Error {
  constructor(message: string, readonly status: number, readonly problems: Problem[] = [], readonly violations: Violation[] = []) { super(message); }
}

async function call<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const res = await fetchWithAuth(`/api/artwork-cards${path}`,
    body === undefined ? { method } : { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) {
    let data: any = null;
    try { data = await res.json(); } catch { /* тела нет */ }
    const message = res.status === 401 ? 'Войдите в аккаунт.' : res.status === 403 ? (data?.error || 'Недостаточно прав.')
      : res.status >= 500 ? 'Не удалось выполнить действие.' : (data?.error || 'Не удалось выполнить действие.');
    throw new CardApiError(message, res.status, data?.problems ?? [], data?.violations ?? []);
  }
  return res.json();
}

export const queue = (status?: CardStatus | '') => call<{ cards: QueueItem[] }>(status ? `?status=${status}` : '');
export const getCard = (id: number) => call<{ card: FullCard }>(`/${id}`);
export const savePassport = (id: number, fields: Record<string, string | number | null>) => call<{ artwork: CardArtwork }>(`/${id}/passport`, 'PUT', fields);
export const createFragment = (id: number, fragment: object) => call<{ fragment: Fragment }>(`/${id}/fragments`, 'POST', fragment);
export const updateFragment = (id: number, fid: number, patch: object) => call<{ fragment: Fragment }>(`/${id}/fragments/${fid}`, 'PATCH', patch);
export const deleteFragment = (id: number, fid: number) => call<{}>(`/${id}/fragments/${fid}`, 'DELETE');
export const approveFragment = (id: number, fid: number) => call<{ fragment: Fragment; warnings: string[] }>(`/${id}/fragments/${fid}/approve`, 'POST', {});
export const changeStatus = (id: number, to: CardStatus, approveFragments = false) =>
  call<{ artwork: CardArtwork; warnings: string[] }>(`/${id}/status`, 'POST', { to, approve_fragments: approveFragments });

// ── Подписи ────────────────────────────────────────────────────────────────────────────────────

export const STATUS_LABEL: Record<CardStatus, string> = {
  draft: 'Черновик', needs_review: 'На проверке', approved: 'Утверждена', published: 'Опубликована', archived: 'В архиве',
};
export const STATUS_TONE: Record<CardStatus, 'gray' | 'amber' | 'indigo' | 'green' | 'red'> = {
  draft: 'gray', needs_review: 'amber', approved: 'indigo', published: 'green', archived: 'gray',
};
export const BLOCK_LABEL: Record<Block, string> = {
  about_work: 'О произведении', about_artist: 'Об авторе', provenance: 'Происхождение', exhibitions: 'Выставки', acquisition: 'Поступление', inscriptions: 'Надписи',
};
export const FRAGMENT_STATUS_LABEL: Record<FragmentStatus, string> = {
  catalogued: 'Внесено куратором', from_document: 'Из документа', visible: 'Описание изображения', ai_inferred: 'Вывод ИИ без источника',
};
export const FRAGMENT_STATUS_HINT: Record<FragmentStatus, string> = {
  catalogued: 'Факт с источником (по умолчанию источник — вы).',
  from_document: 'Создаётся только конвейером после проверки цитаты по документу; вручную не правится.',
  visible: 'Описание того, что видно на изображении, без атрибуции и датировки.',
  ai_inferred: 'Предположение без источника: не публикуется и блокирует утверждение карточки, пока не подтверждено источником или удалено.',
};

export function transitionLabel(from: CardStatus, to: CardStatus): string {
  if (from === 'draft' && to === 'needs_review') return 'Отправить на проверку';
  if (from === 'needs_review' && to === 'draft') return 'Вернуть в черновик';
  if (to === 'approved') return 'Утвердить';
  if (to === 'published') return 'Опубликовать';
  if (from === 'published' && to === 'needs_review') return 'Снять с публикации (на проверку)';
  if (from === 'approved' && to === 'needs_review') return 'Вернуть на проверку';
  if (to === 'archived') return 'В архив';
  if (from === 'archived' && to === 'draft') return 'Вернуть из архива';
  return STATUS_LABEL[to];
}

export const DATING_LABEL: Record<string, string> = { exact: 'Точная', approx: 'Приблизительная', unknown: 'Неизвестна' };

// ── Работа с данными ───────────────────────────────────────────────────────────────────────────

/** Фрагменты выбранного языка по блокам в порядке шаблона; пустые блоки тоже есть (в них можно добавлять). */
export function groupFragments(fragments: Fragment[], language: Language): Record<Block, Fragment[]> {
  const out = Object.fromEntries(BLOCKS.map(b => [b, [] as Fragment[]])) as Record<Block, Fragment[]>;
  for (const f of fragments) if (f.language === language && out[f.block]) out[f.block].push(f);
  for (const b of BLOCKS) out[b].sort((a, c) => a.position - c.position || a.fragment_id - c.fragment_id);
  return out;
}

export function sourceLine(s: CardSource): string {
  const name = s.kind === 'curator' ? 'куратор' : s.kind === 'db' ? 'запись базы' : (s.title || (s.kind === 'document' ? 'документ' : 'источник'));
  const extra = [s.page !== undefined ? `с. ${s.page}` : '', s.license ?? '', s.kind === 'document' && s.access === 'staff' ? 'внутренний' : ''].filter(Boolean);
  return extra.length ? `${name} (${extra.join(', ')})` : name;
}

/** Фрагмент по внутреннему документу посетителям не показывается (решение владельца). */
export const hiddenFromVisitors = (f: Fragment) => f.sources.some(s => s.kind === 'document' && s.access !== 'public');

export interface SourceForm { kind: CardSource['kind']; title: string; url: string; page: string; license: string; quote: string; access: '' | 'public' | 'staff' }
export const emptySourceForm = (): SourceForm => ({ kind: 'external', title: '', url: '', page: '', license: '', quote: '', access: '' });

/** Поля формы источника → источник для сервера; null и сообщение, если заполнено неверно. */
export function sourceFromForm(f: SourceForm): { source?: CardSource; error?: string } {
  const s: CardSource = { kind: f.kind };
  if (f.title.trim()) s.title = f.title.trim();
  if (f.url.trim()) {
    if (!/^https?:\/\//i.test(f.url.trim())) return { error: 'Адрес источника должен начинаться с http:// или https://' };
    s.url = f.url.trim();
  }
  if (f.page.trim()) s.page = /^\d+$/.test(f.page.trim()) ? Number(f.page.trim()) : f.page.trim();
  if (f.license.trim()) s.license = f.license.trim();
  if (f.quote.trim()) {
    if (f.quote.trim().split(/\s+/).length > 25) return { error: 'Цитата не длиннее 25 слов.' };
    s.quote = f.quote.trim();
  }
  if (f.kind === 'document') {
    if (!f.access) return { error: 'Для документа укажите доступ: публичный или внутренний.' };
    s.access = f.access;
  }
  if (f.kind === 'external' && !s.title && !s.url) return { error: 'Для внешнего источника укажите название или адрес.' };
  return { source: s };
}

export const PASSPORT_FIELDS = [
  'title_en', 'medium_en', 'attribution_note', 'attribution_note_en', 'inventory_number', 'dating_text', 'year_from', 'year_to', 'dating_certainty',
  'provenance', 'inscriptions', 'image_rights_holder', 'image_rights_note',
] as const;
export type PassportKey = typeof PASSPORT_FIELDS[number];
export type PassportForm = Record<PassportKey, string>;

export function passportToForm(a: CardArtwork): PassportForm {
  return Object.fromEntries(PASSPORT_FIELDS.map(k => [k, a[k] === null || a[k] === undefined ? '' : String(a[k])])) as PassportForm;
}

/** Только изменённые поля: пустая строка очищает значение (null), годы — числа. Неверный год — сообщение об ошибке. */
export function passportChanges(form: PassportForm, original: CardArtwork): { changes?: Record<string, string | number | null>; error?: string } {
  const before = passportToForm(original);
  const changes: Record<string, string | number | null> = {};
  for (const k of PASSPORT_FIELDS) {
    if (form[k].trim() === before[k]) continue;
    const v = form[k].trim();
    if (k === 'year_from' || k === 'year_to') {
      if (v === '') { changes[k] = null; continue; }
      if (!/^\d{1,4}$/.test(v)) return { error: 'Год — целое число до четырёх знаков.' };
      changes[k] = Number(v);
    } else changes[k] = v === '' ? null : v;
  }
  if (typeof changes.year_from === 'number' && typeof changes.year_to === 'number' && changes.year_from > changes.year_to) return { error: 'Год «с» не может быть позже года «по».' };
  return { changes };
}

export function errorText(e: unknown): string {
  if (e instanceof CardApiError && e.violations.length) {
    return `${e.message}: ${e.violations.map(v => `«${v.match}»`).join(', ')}. Уберите такие формулировки: помощник не высказывается о подлинности и цене.`;
  }
  return e instanceof Error ? e.message : 'Не удалось выполнить действие.';
}
