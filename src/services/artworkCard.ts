// src/services/artworkCard.ts — карточка произведения (docs/ARTWORK-CARD.md, миграция 006): чтение, правки, утверждение, публикация.
// Правила без БД — в artworkCardRules.ts. Сервис не решает, кто вошёл: роль и пользователя передаёт маршрут (из сессии).
import type { PoolClient } from 'pg';
import pool from '../config/database';
import {
  allowedTransitions, CARD_STATUSES, cardProblems, CardStatus, FragmentInput, judgmentViolations, Problem, Source,
  transitionAllowed, transitionRoleOk,
} from './artworkCardRules';

export interface Actor { user_id: number; role: string }
export type Result<T = {}> = ({ ok: true } & T) | { ok: false; status: number; error: string; problems?: Problem[]; violations?: Array<{ code: string; match: string }> };
const fail = (status: number, error: string, extra: object = {}): { ok: false; status: number; error: string } => ({ ok: false, status, error, ...extra });

const PASSPORT_COLUMNS = `artwork_id, title, artist_name, year_created, medium, dimensions, image_url, thumbnail_url,
  title_en, medium_en, attribution_note, attribution_note_en, inventory_number, dating_text, year_from, year_to, dating_certainty,
  provenance, inscriptions, image_rights_holder, image_rights_note, card_status, card_reviewed_by, card_reviewed_at`;

async function loadArtwork(client: Pick<PoolClient, 'query'>, id: number, lock = false) {
  const { rows } = await client.query(`SELECT ${PASSPORT_COLUMNS} FROM artworks WHERE artwork_id = $1${lock ? ' FOR UPDATE' : ''}`, [id]);
  return rows[0] as Record<string, any> | undefined;
}

async function loadFragments(client: Pick<PoolClient, 'query'>, id: number) {
  const { rows } = await client.query(
    `SELECT fragment_id, artwork_id, block, position, language, text, status, confidence, sources, translated_from, model, prompt_version,
            created_by, approved_by, approved_at, version, created_at, updated_at
       FROM artwork_card_fragments WHERE artwork_id = $1 ORDER BY block, language, position, fragment_id`, [id]);
  return rows as Array<Record<string, any>>;
}

// ── Чтение для сотрудников ────────────────────────────────────────────────────────────────────────

export async function getFullCard(id: number, role: string): Promise<Result<{ card: object }>> {
  const artwork = await loadArtwork(pool, id);
  if (!artwork) return fail(404, 'Произведение не найдено');
  const fragments = await loadFragments(pool, id);
  return {
    ok: true,
    card: {
      artwork, fragments,
      problems: cardProblems({ artwork, fragments: fragments as any }, 'published'),
      allowed_transitions: allowedTransitions(artwork.card_status, role),
    },
  };
}

/** Очередь карточек: по статусу, с числом фрагментов и непроверенных. */
export async function listCards(opts: { status?: string; limit?: number; offset?: number }) {
  const status = opts.status && (CARD_STATUSES as readonly string[]).includes(opts.status) ? opts.status : null;
  const { rows } = await pool.query(
    `SELECT a.artwork_id, a.title, a.artist_name, a.card_status, a.card_reviewed_at,
            count(f.fragment_id)::int AS fragments,
            count(f.fragment_id) FILTER (WHERE f.approved_at IS NULL AND f.status <> 'ai_inferred')::int AS pending,
            count(f.fragment_id) FILTER (WHERE f.status = 'ai_inferred')::int AS ai_inferred
       FROM artworks a LEFT JOIN artwork_card_fragments f ON f.artwork_id = a.artwork_id
      WHERE ($1::text IS NULL OR a.card_status = $1)
      GROUP BY a.artwork_id
      ORDER BY a.artwork_id
      LIMIT $2 OFFSET $3`,
    [status, Math.min(Math.max(opts.limit ?? 50, 1), 100), Math.max(opts.offset ?? 0, 0)]);
  return rows;
}

// ── Чтение для посетителей ────────────────────────────────────────────────────────────────────────

const ORIGIN: Record<string, string> = { catalogued: 'catalogued', from_document: 'document', visible: 'image_description', ai_inferred: 'ai' };

/** Только внешние признаки источника: без цитат, идентификаторов документов и пользователей. */
function publicSource(s: Source) {
  if (s.kind === 'curator') return { kind: 'collection', title: 'Собрание галереи' };
  return { kind: s.kind === 'document' ? 'document' : s.kind, title: s.title ?? null, page: s.page ?? null, url: s.url ?? null, license: s.license ?? null };
}

export async function getPublicCard(id: number, lang: 'ru' | 'en') {
  const a = await loadArtwork(pool, id);
  if (!a || a.card_status !== 'published') return null;
  const { rows } = await pool.query(
    `SELECT block, position, text, status, confidence, sources
       FROM artwork_card_public_fragments WHERE artwork_id = $1 AND language = $2 ORDER BY block, position, fragment_id`, [id, lang]);

  const fallback: string[] = [];
  const pick = (ru: any, en: any, name: string) => {
    if (lang === 'en') { if (en) return en; if (ru) fallback.push(name); }
    return ru ?? null;
  };
  const blocks: Record<string, Array<{ text: string; confidence: string; origin: string }>> = {};
  const bibliography = new Map<string, ReturnType<typeof publicSource>>();
  for (const r of rows) {
    (blocks[r.block] ??= []).push({ text: r.text, confidence: r.confidence, origin: ORIGIN[r.status] ?? r.status });
    for (const s of (r.sources as Source[])) {
      if (s.kind === 'db') continue;                    // служебная ссылка на запись базы: посетителю не нужна
      const ps = publicSource(s);
      bibliography.set(JSON.stringify(ps), ps);
    }
  }
  const dating = {
    text: a.dating_text ?? (a.year_created ? String(a.year_created) : null),
    year_from: a.year_from, year_to: a.year_to, certainty: a.dating_certainty,
  };
  return {
    artwork_id: a.artwork_id,
    lang,
    passport: {
      title: pick(a.title, a.title_en, 'title'),
      artist: a.artist_name,
      attribution_note: pick(a.attribution_note, a.attribution_note_en, 'attribution_note'),
      dating,
      medium: pick(a.medium, a.medium_en, 'medium'),
      dimensions: a.dimensions,
      inventory_number: a.inventory_number,
    },
    // Изображение показывается, только если указан правообладатель (решение владельца 27.10.2026)
    image: a.image_url && a.image_rights_holder
      ? { url: a.image_url, thumbnail_url: a.thumbnail_url, rights_holder: a.image_rights_holder, rights_note: a.image_rights_note }
      : null,
    blocks,
    bibliography: [...bibliography.values()],
    notes: {
      approximate_dating: a.dating_certainty === 'approx' || a.dating_certainty === 'unknown',
      has_uncertain_fragments: rows.some(r => r.confidence === 'uncertain'),
      has_image_description: rows.some(r => r.status === 'visible'),
    },
    translation: { requested: lang, fragments: rows.length, fallback_fields: fallback },
  };
}

// ── Правки паспорта и фрагментов ──────────────────────────────────────────────────────────────────

export async function updatePassport(id: number, fields: Record<string, string | number | null>): Promise<Result<{ artwork: object }>> {
  const keys = Object.keys(fields);
  const sets = keys.map((k, i) => `${k} = $${i + 2}`);
  // Правка паспорта утверждённой или опубликованной карточки возвращает её на проверку
  sets.push(`card_status = CASE WHEN card_status IN ('approved', 'published') THEN 'needs_review' ELSE card_status END`);
  try {
    const { rows } = await pool.query(`UPDATE artworks SET ${sets.join(', ')} WHERE artwork_id = $1 RETURNING ${PASSPORT_COLUMNS}`, [id, ...keys.map(k => fields[k])]);
    if (!rows[0]) return fail(404, 'Произведение не найдено');
    return { ok: true, artwork: rows[0] };
  } catch (e: any) {
    if (e?.code === '23514') return fail(400, 'Значения не прошли проверку (например, год «с» позже года «по»)');
    throw e;
  }
}

/** Фрагмент, внесённый сотрудником (catalogued) без источника, получает источник «куратор» — факт без источника в карточку не попадает. */
function withDefaultSource(status: string, sources: Source[], actor: Actor): Source[] {
  if (status === 'catalogued' && sources.length === 0) return [{ kind: 'curator', id: actor.user_id }];
  return sources;
}

export async function createFragment(artworkId: number, input: FragmentInput, actor: Actor): Promise<Result<{ fragment: object }>> {
  const violations = judgmentViolations(input.block, input.text);
  if (violations.length) return fail(422, 'В тексте суждение о подлинности, экспертизе или цене', { violations });
  if (!(await loadArtwork(pool, artworkId))) return fail(404, 'Произведение не найдено');
  const sources = withDefaultSource(input.status, input.sources, actor);
  const { rows } = await pool.query(
    `INSERT INTO artwork_card_fragments (artwork_id, block, position, language, text, status, confidence, sources, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9) RETURNING *`,
    [artworkId, input.block, input.position, input.language, input.text, input.status, input.confidence, JSON.stringify(sources), actor.user_id]);
  return { ok: true, fragment: rows[0] };
}

export async function updateFragment(artworkId: number, fragmentId: number, patch: Partial<FragmentInput>, actor: Actor): Promise<Result<{ fragment: object }>> {
  const { rows: found } = await pool.query('SELECT * FROM artwork_card_fragments WHERE fragment_id = $1 AND artwork_id = $2', [fragmentId, artworkId]);
  const cur = found[0];
  if (!cur) return fail(404, 'Фрагмент не найден');
  if (cur.status === 'from_document') {
    const touchesContent = patch.text !== undefined || patch.sources !== undefined || patch.status !== undefined || patch.block !== undefined || patch.language !== undefined;
    if (touchesContent) return fail(409, 'Фрагмент из документа с проверенной цитатой не правится: создайте новый фрагмент (catalogued) и удалите этот');
  }
  const next = { ...cur, ...patch } as Record<string, any>;
  const sources = patch.sources !== undefined || patch.status !== undefined
    ? withDefaultSource(next.status, patch.sources ?? cur.sources, actor) : cur.sources;
  const violations = judgmentViolations(next.block, next.text);
  if (violations.length) return fail(422, 'В тексте суждение о подлинности, экспертизе или цене', { violations });
  try {
    const { rows } = await pool.query(
      `UPDATE artwork_card_fragments SET block = $3, position = $4, language = $5, text = $6, status = $7, confidence = $8, sources = $9::jsonb
        WHERE fragment_id = $1 AND artwork_id = $2 RETURNING *`,
      [fragmentId, artworkId, next.block, next.position, next.language, next.text, next.status, next.confidence, JSON.stringify(sources)]);
    return { ok: true, fragment: rows[0] };
  } catch (e: any) {
    if (e?.code === '23514') return fail(400, 'Значения не прошли проверку');
    throw e;
  }
}

export async function deleteFragment(artworkId: number, fragmentId: number): Promise<Result> {
  const { rowCount } = await pool.query('DELETE FROM artwork_card_fragments WHERE fragment_id = $1 AND artwork_id = $2', [fragmentId, artworkId]);
  if (!rowCount) return fail(404, 'Фрагмент не найден');
  // Удаление утверждённого фрагмента тоже меняет опубликованный текст
  await pool.query(`UPDATE artworks SET card_status = 'needs_review' WHERE artwork_id = $1 AND card_status IN ('approved', 'published')`, [artworkId]);
  return { ok: true };
}

export async function approveFragment(artworkId: number, fragmentId: number, actor: Actor): Promise<Result<{ fragment: object; warnings: string[] }>> {
  const { rows: found } = await pool.query('SELECT * FROM artwork_card_fragments WHERE fragment_id = $1 AND artwork_id = $2', [fragmentId, artworkId]);
  const cur = found[0];
  if (!cur) return fail(404, 'Фрагмент не найден');
  if (cur.status === 'ai_inferred') return fail(409, 'Вывод ИИ без источника утвердить нельзя: подтвердите источником (статус catalogued) или удалите');
  const violations = judgmentViolations(cur.block, cur.text);
  if (violations.length) return fail(422, 'В тексте суждение о подлинности, экспертизе или цене', { violations });
  const { rows } = await pool.query(
    'UPDATE artwork_card_fragments SET approved_by = $3, approved_at = now() WHERE fragment_id = $1 AND artwork_id = $2 RETURNING *', [fragmentId, artworkId, actor.user_id]);
  const warnings: string[] = [];
  if ((cur.sources as Source[]).some(s => s.kind === 'document' && s.access !== 'public')) {
    warnings.push('Источник — внутренний документ: посетителям фрагмент показан не будет, пока куратор не подтвердит его собственным источником или не заменит публичным');
  }
  return { ok: true, fragment: rows[0], warnings };
}

// ── Жизненный цикл карточки ───────────────────────────────────────────────────────────────────────

export async function changeStatus(artworkId: number, to: CardStatus, actor: Actor, opts: { approveFragments?: boolean } = {}):
  Promise<Result<{ artwork: object; warnings: string[] }>> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const a = await loadArtwork(client, artworkId, true);
    if (!a) { await client.query('ROLLBACK'); return fail(404, 'Произведение не найдено'); }
    const from = a.card_status as string;
    if (!transitionAllowed(from, to)) { await client.query('ROLLBACK'); return fail(409, `Переход ${from} → ${to} не предусмотрен`); }
    if (!transitionRoleOk(from, to, actor.role)) { await client.query('ROLLBACK'); return fail(403, 'Недостаточно прав для этого перехода'); }

    const warnings: string[] = [];
    if (to === 'approved' || to === 'published') {
      let fragments = await loadFragments(client, artworkId);
      if (to === 'approved' && opts.approveFragments) {
        fragments = fragments.map(f => (f.status !== 'ai_inferred' && !f.approved_at ? { ...f, approved_at: new Date() } : f));
      }
      const problems = cardProblems({ artwork: a as any, fragments: fragments as any }, to);
      if (problems.length) { await client.query('ROLLBACK'); return fail(422, 'Карточка не готова', { problems }); }
      if (to === 'approved' && opts.approveFragments) {
        await client.query(
          `UPDATE artwork_card_fragments SET approved_by = $2, approved_at = now()
            WHERE artwork_id = $1 AND approved_at IS NULL AND status <> 'ai_inferred'`, [artworkId, actor.user_id]);
      }
      if (to === 'published') {
        const hidden = fragments.filter(f => (f.sources as Source[]).some(s => s.kind === 'document' && s.access !== 'public'));
        if (hidden.length) warnings.push(`${hidden.length} фрагм. со внутренними документами не будут показаны посетителям`);
      }
    }
    const review = to === 'approved' || to === 'published';
    const { rows } = await client.query(
      `UPDATE artworks SET card_status = $2, card_reviewed_by = CASE WHEN $3 THEN $4::int ELSE card_reviewed_by END,
                           card_reviewed_at = CASE WHEN $3 THEN now() ELSE card_reviewed_at END
        WHERE artwork_id = $1 RETURNING ${PASSPORT_COLUMNS}`, [artworkId, to, review, actor.user_id]);
    await client.query('COMMIT');
    return { ok: true, artwork: rows[0], warnings };
  } catch (e) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw e;
  } finally {
    client.release();
  }
}
