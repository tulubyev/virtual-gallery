// lib/publicCard.ts — публичная карточка произведения для посетителей (GET /api/artwork-cards/public/:id).
// Что можно показывать, решает сервер (опубликованная карточка, утверждённые фрагменты, публичные источники); здесь — подписи и разбор ответа.
// Описание — docs/ARTWORK-CARD.md.

export type Lang = 'ru' | 'en';
export const BLOCK_ORDER = ['about_work', 'about_artist', 'provenance', 'exhibitions', 'acquisition', 'inscriptions'] as const;
export type Block = typeof BLOCK_ORDER[number];

export interface PublicFragment { text: string; confidence: 'established' | 'uncertain'; origin: 'catalogued' | 'document' | 'image_description' | 'ai' | string }
export interface PublicSource { kind: string; title: string | null; page?: number | string | null; url?: string | null; license?: string | null }
export interface PublicCard {
  artwork_id: number;
  lang: Lang;
  passport: {
    title: string | null; artist: string | null; attribution_note: string | null; medium: string | null; dimensions: string | null; inventory_number: string | null;
    dating: { text: string | null; year_from: number | null; year_to: number | null; certainty: 'exact' | 'approx' | 'unknown' | null };
  };
  image: { url: string; thumbnail_url: string | null; rights_holder: string; rights_note: string | null } | null;
  blocks: Partial<Record<Block, PublicFragment[]>>;
  bibliography: PublicSource[];
  notes: { approximate_dating: boolean; has_uncertain_fragments: boolean; has_image_description: boolean };
  translation: { requested: Lang; fragments: number; fallback_fields: string[] };
}

/** 404 — карточка не опубликована или не существует (посетителю это одно и то же). */
export class PublicCardError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}

export async function getPublicCard(id: number, lang: Lang): Promise<PublicCard> {
  const res = await fetch(`/api/artwork-cards/public/${id}?lang=${lang}`);
  if (res.status === 404) throw new PublicCardError(TEXT[lang].notFound, 404);
  if (!res.ok) throw new PublicCardError(TEXT[lang].failed, res.status);
  return res.json();
}

export const TEXT = {
  ru: {
    notFound: 'Карточка произведения не найдена или ещё не опубликована.', failed: 'Не удалось загрузить карточку. Попробуйте позже.', loading: 'Загрузка…',
    back: '← К произведению', language: 'Язык', toGallery: 'В галерею',
    passport: 'Паспорт', artist: 'Автор', dating: 'Датировка', medium: 'Материал, техника', dimensions: 'Размер', inventory: 'Инвентарный номер', attribution: 'Атрибуция',
    imageRights: 'Изображение', bibliography: 'Литература и источники', page: 'с.', noImage: 'Изображение не публикуется',
    noText: 'Описание произведения пока не опубликовано.',
    approxDating: 'Датировка приблизительная.', unknownDating: 'Точная датировка неизвестна.',
    uncertain: 'Предположительно', imageDescription: 'Описание изображения', imageNote: 'Фрагменты с пометкой «описание изображения» описывают то, что видно на изображении, и не содержат атрибуции или датировки.',
    uncertainNote: 'Фрагменты с пометкой «предположительно» опираются на источники, которые сами говорят о предположении.',
    untranslated: 'Часть полей не переведена и показана на русском.',
    blocks: { about_work: 'О произведении', about_artist: 'Об авторе', provenance: 'Происхождение', exhibitions: 'Выставки', acquisition: 'Поступление', inscriptions: 'Надписи' } as Record<Block, string>,
  },
  en: {
    notFound: 'This artwork card was not found or has not been published yet.', failed: 'The card could not be loaded. Please try again later.', loading: 'Loading…',
    back: '← Back to the artwork', language: 'Language', toGallery: 'To the gallery',
    passport: 'Details', artist: 'Artist', dating: 'Date', medium: 'Medium', dimensions: 'Dimensions', inventory: 'Inventory number', attribution: 'Attribution',
    imageRights: 'Image', bibliography: 'Literature and sources', page: 'p.', noImage: 'The image is not published',
    noText: 'No description has been published for this artwork yet.',
    approxDating: 'The date is approximate.', unknownDating: 'The exact date is unknown.',
    uncertain: 'Tentative', imageDescription: 'Image description', imageNote: 'Passages marked “image description” describe what is visible in the picture and make no claims about attribution or date.',
    uncertainNote: 'Passages marked “tentative” rely on sources that themselves speak with caution.',
    untranslated: 'Some fields are not translated yet and are shown in Russian.',
    blocks: { about_work: 'About the work', about_artist: 'About the artist', provenance: 'Provenance', exhibitions: 'Exhibitions', acquisition: 'Acquisition', inscriptions: 'Inscriptions' } as Record<Block, string>,
  },
} as const;

/** Язык из адреса: только ru или en, по умолчанию русский. */
export const parseLang = (v: string | null): Lang => (v === 'en' ? 'en' : 'ru');

/** Адрес из источника показываем ссылкой только для http(s): остальное (javascript:, data:) отбрасываем. */
export function safeUrl(u: string | null | undefined): string | null {
  if (!u) return null;
  try { const p = new URL(u); return p.protocol === 'http:' || p.protocol === 'https:' ? p.toString() : null; } catch { return null; }
}

/** Заполненные блоки в порядке шаблона; пустые не показываются. */
export function visibleBlocks(card: PublicCard): Array<{ block: Block; fragments: PublicFragment[] }> {
  return BLOCK_ORDER.flatMap(block => {
    const fragments = (card.blocks[block] ?? []).filter(f => f.text.trim() && f.origin !== 'ai');
    return fragments.length ? [{ block, fragments }] : [];
  });
}

export function datingLine(card: PublicCard, lang: Lang): string | null {
  const d = card.passport.dating;
  const t = TEXT[lang];
  const base = d.text ?? (d.year_from && d.year_to && d.year_from !== d.year_to ? `${d.year_from}–${d.year_to}` : d.year_from ? String(d.year_from) : null);
  if (d.certainty === 'unknown') return base ? `${base}. ${t.unknownDating}` : t.unknownDating;
  if (d.certainty === 'approx') return base ? `${base}. ${t.approxDating}` : t.approxDating;
  return base;
}

export function sourceLine(s: PublicSource, lang: Lang): string {
  const t = TEXT[lang];
  const parts = [s.title ?? '', s.page !== null && s.page !== undefined && s.page !== '' ? `${t.page} ${s.page}` : '', s.license ?? ''].filter(Boolean);
  return parts.join(', ');
}
