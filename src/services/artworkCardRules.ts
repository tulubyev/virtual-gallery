// src/services/artworkCardRules.ts — правила карточки произведения без обращения к БД (docs/ARTWORK-CARD.md):
// разбор входных данных, фильтр суждений о подлинности и цене, допустимые переходы жизненного цикла.
import { intInRange, text } from './biddingInput';

export const BLOCKS = ['about_work', 'about_artist', 'provenance', 'exhibitions', 'acquisition', 'inscriptions'] as const;
export const LANGUAGES = ['ru', 'en'] as const;
export const CARD_STATUSES = ['draft', 'needs_review', 'approved', 'published', 'archived'] as const;
/** Статусы, которые можно создать вручную. from_document создаёт только конвейер генерации после проверки цитаты по тексту документа. */
export const MANUAL_STATUSES = ['catalogued', 'visible', 'ai_inferred'] as const;
export const CONFIDENCES = ['established', 'uncertain'] as const;
export const SOURCE_KINDS = ['db', 'document', 'curator', 'external'] as const;
/** Блоки с повествовательным текстом: к ним применяется фильтр суждений о подлинности и цене. */
export const NARRATIVE_BLOCKS: readonly string[] = ['about_work', 'about_artist'];

export type Block = typeof BLOCKS[number];
export type Language = typeof LANGUAGES[number];
export type CardStatus = typeof CARD_STATUSES[number];

export interface Source {
  kind: typeof SOURCE_KINDS[number];
  id?: string | number;
  title?: string;
  quote?: string;
  page?: number | string;
  url?: string;
  license?: string;
  access?: 'public' | 'staff';
}

export interface FragmentInput {
  block: Block;
  language: Language;
  text: string;
  status: typeof MANUAL_STATUSES[number];
  confidence: typeof CONFIDENCES[number];
  position: number;
  sources: Source[];
}

// error/value описаны в обеих ветках: сужение по ok в проекте без strict не работает, поэтому читаем parsed.error напрямую
type Parsed<T> = { ok: true; value: T; error?: undefined } | { ok: false; value?: undefined; error: string };
const bad = (error: string): { ok: false; value?: undefined; error: string } => ({ ok: false, error });
const isOneOf = <T extends readonly string[]>(list: T, v: unknown): v is T[number] => typeof v === 'string' && (list as readonly string[]).includes(v);

export const MAX_FRAGMENT_TEXT = 5000;
const MAX_QUOTE_WORDS = 25;

function httpUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > 500) return null;
  try { const u = new URL(value); return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : null; } catch { return null; }
}

export function parseSources(value: unknown): Parsed<Source[]> {
  if (value === undefined || value === null) return { ok: true, value: [] };
  if (!Array.isArray(value) || value.length > 10) return bad('sources: ожидается массив не длиннее 10');
  const out: Source[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== 'object') return bad('sources: элемент должен быть объектом');
    const r = raw as Record<string, unknown>;
    if (!isOneOf(SOURCE_KINDS, r.kind)) return bad(`sources.kind: одно из ${SOURCE_KINDS.join(', ')}`);
    const s: Source = { kind: r.kind };
    if (r.id !== undefined) {
      if (!(typeof r.id === 'number' || (typeof r.id === 'string' && r.id.length > 0 && r.id.length <= 100))) return bad('sources.id: число или строка до 100 знаков');
      s.id = r.id;
    }
    if (r.title !== undefined) { const t = text(r.title, 300); if (!t) return bad('sources.title: строка до 300 знаков'); s.title = t; }
    if (r.quote !== undefined) {
      const q = text(r.quote, 400);
      if (!q) return bad('sources.quote: непустая строка до 400 знаков');
      if (q.split(/\s+/).length > MAX_QUOTE_WORDS) return bad(`sources.quote: не длиннее ${MAX_QUOTE_WORDS} слов`);
      s.quote = q;
    }
    if (r.page !== undefined) {
      if (!(typeof r.page === 'number' && Number.isInteger(r.page) && r.page >= 0) && !(typeof r.page === 'string' && r.page.length > 0 && r.page.length <= 20)) return bad('sources.page: число или короткая строка');
      s.page = r.page;
    }
    if (r.url !== undefined) { const u = httpUrl(r.url); if (!u) return bad('sources.url: адрес http(s)'); s.url = u; }
    if (r.license !== undefined) { const l = text(r.license, 100); if (!l) return bad('sources.license: строка до 100 знаков'); s.license = l; }
    if (r.access !== undefined) {
      if (r.access !== 'public' && r.access !== 'staff') return bad("sources.access: 'public' или 'staff'");
      s.access = r.access;
    }
    if (s.kind === 'document' && !s.access) return bad("sources.access обязателен для документа ('public' или 'staff')");
    out.push(s);
  }
  return { ok: true, value: out };
}

// ── Фильтр суждений о подлинности, экспертизе и цене ──────────────────────────────────────────────

const JUDGMENT_PATTERNS: Array<{ code: string; re: RegExp }> = [
  { code: 'authenticity', re: /(подлин|аутентичн|фальшив|подделк|поддельн|authentic|genuine|forg(?:ed|ery)|\bfake\b|counterfeit)/i },
  { code: 'expertise', re: /(экспертиз|эксперт\w*\s+(?:признал|подтвердил|счита)|expert\w*\s+(?:confirm|attribut|opinion)|certificate of authenticity)/i },
  { code: 'price', re: /(стоимост|рыночн\w+\s+цен|\bцен[аыуе]\b|стоит\b|оценочн|оценен\w*\s+в|продан\w*\s+за|\bprice\b|\bworth\b|valued at|valuation|appraised|\bsold for\b|\bestimate\b)/i },
  { code: 'amount', re: /\d[\d\s.,]*\s?(?:руб|₽|\bр\.|\$|€|£|долл|евро|\busd\b|\beur\b|\brub\b)/i },
];

export interface Violation { code: string; match: string }

/** Суждения о подлинности, экспертизе и цене в повествовательных блоках (о произведении, об авторе). Для остальных блоков фильтр не применяется. */
export function judgmentViolations(block: string, value: string): Violation[] {
  if (!NARRATIVE_BLOCKS.includes(block)) return [];
  const found: Violation[] = [];
  for (const { code, re } of JUDGMENT_PATTERNS) {
    const m = re.exec(value);
    if (m) found.push({ code, match: m[0].trim() });
  }
  return found;
}

// ── Разбор входных данных ─────────────────────────────────────────────────────────────────────────

export function parseFragmentInput(body: any, { partial = false }: { partial?: boolean } = {}): Parsed<Partial<FragmentInput>> {
  if (!body || typeof body !== 'object') return bad('Ожидается JSON-объект');
  const out: Partial<FragmentInput> = {};

  if (!partial || body.block !== undefined) {
    if (!isOneOf(BLOCKS, body.block)) return bad(`block: одно из ${BLOCKS.join(', ')}`);
    out.block = body.block;
  }
  if (!partial || body.language !== undefined) {
    if (!isOneOf(LANGUAGES, body.language)) return bad('language: ru или en');
    out.language = body.language;
  }
  if (!partial || body.text !== undefined) {
    const t = text(body.text, MAX_FRAGMENT_TEXT);
    if (!t) return bad(`text: непустая строка до ${MAX_FRAGMENT_TEXT} знаков`);
    out.text = t;
  }
  if (body.status !== undefined) {
    if (body.status === 'from_document') return bad('status from_document создаёт только конвейер генерации с проверкой цитаты; вручную используйте catalogued');
    if (!isOneOf(MANUAL_STATUSES, body.status)) return bad(`status: одно из ${MANUAL_STATUSES.join(', ')}`);
    out.status = body.status;
  } else if (!partial) out.status = 'catalogued';
  if (body.confidence !== undefined) {
    if (!isOneOf(CONFIDENCES, body.confidence)) return bad('confidence: established или uncertain');
    out.confidence = body.confidence;
  } else if (!partial) out.confidence = 'established';
  if (body.position !== undefined) {
    const p = intInRange(body.position, 0, 1000);
    if (p === null) return bad('position: целое от 0 до 1000');
    out.position = p;
  } else if (!partial) out.position = 0;
  if (body.sources !== undefined || !partial) {
    const s = parseSources(body.sources);
    if (!s.ok) return bad(s.error);
    out.sources = s.value;
  }
  return { ok: true, value: out };
}

/** Поля паспорта, которые меняются через API карточки (основные поля — название, автор, год, техника, размеры — правятся через /api/artworks). */
const PASSPORT_TEXT_FIELDS: Record<string, number> = {
  title_en: 255, medium_en: 255, attribution_note: 500, attribution_note_en: 500, inventory_number: 100, dating_text: 200,
  provenance: 5000, inscriptions: 5000, image_rights_holder: 255, image_rights_note: 500,
};

export function parsePassportInput(body: any): Parsed<Record<string, string | number | null>> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return bad('Ожидается JSON-объект');
  const out: Record<string, string | number | null> = {};
  for (const [key, value] of Object.entries(body)) {
    if (key in PASSPORT_TEXT_FIELDS) {
      if (value === null || value === '') { out[key] = null; continue; }
      const t = text(value, PASSPORT_TEXT_FIELDS[key]);
      if (!t) return bad(`${key}: строка до ${PASSPORT_TEXT_FIELDS[key]} знаков или null`);
      out[key] = t;
    } else if (key === 'year_from' || key === 'year_to') {
      if (value === null) { out[key] = null; continue; }
      const y = intInRange(value, 0, 2100);
      if (y === null) return bad(`${key}: год от 0 до 2100 или null`);
      out[key] = y;
    } else if (key === 'dating_certainty') {
      if (value === null) { out[key] = null; continue; }
      if (value !== 'exact' && value !== 'approx' && value !== 'unknown') return bad('dating_certainty: exact, approx, unknown или null');
      out[key] = value;
    } else return bad(`Неизвестное поле: ${key}`);
  }
  if (Object.keys(out).length === 0) return bad('Нет полей для изменения');
  if (typeof out.year_from === 'number' && typeof out.year_to === 'number' && out.year_from > out.year_to) return bad('year_from не может быть больше year_to');
  return { ok: true, value: out };
}

// ── Жизненный цикл ────────────────────────────────────────────────────────────────────────────────

const STAFF_ROLES = ['admin', 'curator', 'staff'];
const CURATOR_ROLES = ['admin', 'curator'];

/** Переход → роли, которым он разрешён. Сотрудники ведут черновик и отправляют на проверку; утверждает и публикует куратор. */
const TRANSITIONS: Record<string, readonly string[]> = {
  'draft>needs_review': STAFF_ROLES,
  'needs_review>draft': STAFF_ROLES,
  'needs_review>approved': CURATOR_ROLES,
  'approved>published': CURATOR_ROLES,
  'approved>needs_review': CURATOR_ROLES,
  'published>needs_review': CURATOR_ROLES,
  'published>archived': CURATOR_ROLES,
  'draft>archived': CURATOR_ROLES,
  'archived>draft': CURATOR_ROLES,
};

export function transitionAllowed(from: string, to: string): boolean {
  return `${from}>${to}` in TRANSITIONS;
}

export function transitionRoleOk(from: string, to: string, role: string): boolean {
  return (TRANSITIONS[`${from}>${to}`] ?? []).includes(role);
}

export function allowedTransitions(from: string, role: string): CardStatus[] {
  return CARD_STATUSES.filter(to => transitionRoleOk(from, to, role));
}

// ── Готовность карточки к утверждению и публикации ────────────────────────────────────────────────

export interface CardForCheck {
  artwork: { title?: string | null; artist_name?: string | null; medium?: string | null; dimensions?: string | null; image_url?: string | null;
             year_created?: number | null; dating_text?: string | null; dating_certainty?: string | null; image_rights_holder?: string | null };
  fragments: Array<{ fragment_id: number; block: string; language: string; text: string; status: string; approved_at: string | Date | null }>;
}

export interface Problem { code: string; message: string; fragment_id?: number }

/** Что мешает утвердить (target='approved') или опубликовать карточку. Пустой список — можно. */
export function cardProblems(card: CardForCheck, target: 'approved' | 'published'): Problem[] {
  const a = card.artwork;
  const p: Problem[] = [];
  const blank = (v: unknown) => v === null || v === undefined || String(v).trim() === '';
  if (blank(a.title)) p.push({ code: 'passport_title', message: 'Не указано название' });
  if (blank(a.artist_name)) p.push({ code: 'passport_artist', message: 'Не указан автор (допустимо «неизвестный автор»)' });
  if (blank(a.medium)) p.push({ code: 'passport_medium', message: 'Не указаны материал и техника' });
  if (blank(a.dimensions)) p.push({ code: 'passport_dimensions', message: 'Не указан размер' });
  if (blank(a.dating_text) && blank(a.year_created) && a.dating_certainty !== 'unknown') {
    p.push({ code: 'passport_dating', message: 'Не указана датировка (допустимо dating_certainty = unknown)' });
  }
  if (!blank(a.image_url) && blank(a.image_rights_holder)) {
    p.push({ code: 'image_rights', message: 'Для изображения не указан правообладатель' });
  }
  for (const f of card.fragments) {
    if (f.status === 'ai_inferred') {
      p.push({ code: 'fragment_ai_inferred', message: 'Вывод ИИ без источника: подтвердите источником (catalogued) или удалите', fragment_id: f.fragment_id });
      continue;
    }
    if (!f.approved_at) p.push({ code: 'fragment_not_approved', message: 'Фрагмент не утверждён куратором', fragment_id: f.fragment_id });
    for (const v of judgmentViolations(f.block, f.text)) {
      p.push({ code: `fragment_${v.code}`, message: `Суждение о подлинности, экспертизе или цене («${v.match}»): уберите из текста`, fragment_id: f.fragment_id });
    }
  }
  void target;
  return p;
}
