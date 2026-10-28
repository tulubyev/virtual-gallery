// src/services/artworkCardGeneration.ts — черновик карточки по документам и перевод ru → en (docs/ARTWORK-CARD.md).
// Предложения даёт Python-ядро (/api/v1/cards/*): оно ищет места документов, проверяет цитаты и числа. Здесь — окончательная проверка
// (суждения о подлинности и цене), защита от повторов и запись фрагментов неутверждёнными: утверждает их куратор.
import type { PoolClient } from 'pg';
import pool from '../config/database';
import { AiCoreUnavailable, callAiCore } from './aiCore';
import { Actor, loadArtwork, loadFragments, Result } from './artworkCard';
import { BLOCKS, judgmentViolations, Source } from './artworkCardRules';

const fail = (status: number, error: string, extra: object = {}): { ok: false; status: number; error: string } => ({ ok: false, status, error, ...extra });
const CORE_TIMEOUT_MS = 150_000;
const MAX_QUOTE = 600;

/** Одновременно для одного произведения идёт одна генерация или один перевод: повторный запрос не должен удвоить расход и фрагменты. */
const running = new Set<number>();
async function exclusive<T>(artworkId: number, work: () => Promise<Result<T>>): Promise<Result<T>> {
  if (running.has(artworkId)) return fail(409, 'Для этого произведения уже идёт генерация или перевод');
  running.add(artworkId);
  try { return await work(); } finally { running.delete(artworkId); }
}

/** Ответ ядра → сообщение для человека; подробности ядра наружу не отдаём. */
async function core(path: string, body: object): Promise<{ ok: boolean; data?: any; status?: number; error?: string }> {
  try {
    const r = await callAiCore(path, 'POST', body, {}, CORE_TIMEOUT_MS);
    if (r.status === 200 && r.data) return { ok: true, data: r.data };
    if (r.status === 422) return { ok: false, status: 422, error: 'Для поиска по документам нужны название или автор произведения' };
    return { ok: false, status: 502, error: 'Сервис ИИ не смог выполнить запрос' };
  } catch (e) {
    if (e instanceof AiCoreUnavailable) return { ok: false, status: 503, error: 'Сервис ИИ недоступен' };
    throw e;
  }
}

const normalizeQuote = (q: string) => q.toLowerCase().replace(/ё/g, 'е').replace(/[^\p{L}\p{N}\s-]/gu, ' ').replace(/\s+/g, ' ').trim();
const isHidden = (sources: Source[]) => sources.some(s => s.kind === 'document' && s.access !== 'public');

async function nextPosition(client: Pick<PoolClient, 'query'>, artworkId: number, block: string, language: string): Promise<number> {
  const { rows } = await client.query(
    'SELECT COALESCE(MAX(position) + 1, 0) AS next FROM artwork_card_fragments WHERE artwork_id = $1 AND block = $2 AND language = $3', [artworkId, block, language]);
  return rows[0].next;
}

export interface Rejected { block?: string; text?: string; reasons: string[] }

// ── Черновик по документам ────────────────────────────────────────────────────────────────────────

export async function generateDraft(artworkId: number, actor: Actor, documentIds: string[] | null) {
  return exclusive(artworkId, async (): Promise<Result<{ outcome: string; added: object[]; skipped_duplicates: number; rejected: Rejected[]; missing: string[]; warnings: string[]; sources_considered: number; model: string | null }>> => {
    const a = await loadArtwork(pool, artworkId);
    if (!a) return fail(404, 'Произведение не найдено');
    if (a.card_status === 'archived') return fail(409, 'Карточка в архиве: верните её из архива');

    const answer = await core('/api/v1/cards/draft', {
      artwork: {
        title: a.title, artist_name: a.artist_name, dating_text: a.dating_text, year_created: a.year_created, year_from: a.year_from, year_to: a.year_to,
        medium: a.medium, dimensions: a.dimensions, inventory_number: a.inventory_number,
      },
      document_ids: documentIds && documentIds.length ? documentIds : null,
      access: 'staff',                                   // генерируют сотрудники; доступ источника записывается во фрагмент и решает, увидит ли его посетитель
    });
    if (!answer.ok) return fail(answer.status ?? 502, answer.error ?? 'Сервис ИИ не смог выполнить запрос');
    const data = answer.data;

    const rejected: Rejected[] = (Array.isArray(data.rejected) ? data.rejected : []).map((r: any) => ({
      block: typeof r?.block === 'string' ? r.block : undefined, text: typeof r?.text === 'string' ? r.text.slice(0, 300) : undefined,
      reasons: Array.isArray(r?.reasons) ? r.reasons.map(String).slice(0, 5) : [],
    }));

    const client = await pool.connect();
    const added: object[] = [];
    let skipped = 0;
    try {
      await client.query('BEGIN');
      const existing = await loadFragments(client, artworkId);
      const known = new Set(existing.filter(f => f.status === 'from_document' && f.language === 'ru')
        .flatMap(f => (f.sources as Source[]).map(s => `${s.id}|${normalizeQuote(s.quote ?? '')}`)));
      for (const f of Array.isArray(data.fragments) ? data.fragments : []) {
        const src = f?.source;
        const text = typeof f?.text === 'string' ? f.text.trim() : '';
        const quote = typeof f?.quote === 'string' ? f.quote.trim() : '';
        if (!(BLOCKS as readonly string[]).includes(f?.block) || !text || !quote || quote.length > MAX_QUOTE || !src?.document_id) {
          rejected.push({ block: f?.block, text: text.slice(0, 300), reasons: ['ответ ядра неполный'] }); continue;
        }
        const violations = judgmentViolations(f.block, text);
        if (violations.length) {
          rejected.push({ block: f.block, text: text.slice(0, 300), reasons: [`суждение о подлинности или цене: «${violations.map(v => v.match).join('», «')}»`] }); continue;
        }
        const key = `${src.document_id}|${normalizeQuote(quote)}`;
        if (known.has(key)) { skipped++; continue; }
        known.add(key);
        const source: Source = {
          kind: 'document', id: String(src.document_id), quote,
          ...(typeof src.title === 'string' && src.title ? { title: src.title.slice(0, 300) } : {}),
          ...(src.page !== null && src.page !== undefined ? { page: src.page } : {}),
          ...(typeof src.license === 'string' && src.license ? { license: src.license.slice(0, 200) } : {}),
          access: src.access === 'public' ? 'public' : 'staff',           // неизвестное считаем внутренним: посетителю такое не покажется
        };
        const confidence = f.confidence === 'uncertain' ? 'uncertain' : 'established';
        const position = await nextPosition(client, artworkId, f.block, 'ru');
        const { rows } = await client.query(
          `INSERT INTO artwork_card_fragments (artwork_id, block, position, language, text, status, confidence, sources, model, prompt_version, created_by)
           VALUES ($1, $2, $3, 'ru', $4, 'from_document', $5, $6::jsonb, $7, $8, $9) RETURNING *`,
          [artworkId, f.block, position, text, confidence, JSON.stringify([source]), typeof data.model === 'string' ? data.model : null,
            typeof data.prompt_version === 'string' ? data.prompt_version : null, actor.user_id]);
        added.push(rows[0]);
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK').catch(() => undefined);
      throw e;
    } finally {
      client.release();
    }
    const covered = new Set(added.map((f: any) => f.block));
    return {
      ok: true, outcome: String(data.outcome ?? 'drafted'), added, skipped_duplicates: skipped, rejected,
      missing: (Array.isArray(data.missing) ? data.missing : [...BLOCKS]).filter((b: unknown) => typeof b === 'string' && !covered.has(b)),
      warnings: (Array.isArray(data.warnings) ? data.warnings : []).filter((w: unknown) => typeof w === 'string').slice(0, 20),
      sources_considered: Number(data.sources_considered) || 0, model: typeof data.model === 'string' ? data.model : null,
    };
  });
}

// ── Перевод ru → en ───────────────────────────────────────────────────────────────────────────────

/** Переводятся утверждённые русские фрагменты, которые увидит посетитель и у которых ещё нет перевода. */
export async function translateApproved(artworkId: number, actor: Actor) {
  return exclusive(artworkId, async (): Promise<Result<{ added: object[]; rejected: Array<{ fragment_id: number; reasons: string[] }>; nothing_to_translate: boolean; model: string | null }>> => {
    const a = await loadArtwork(pool, artworkId);
    if (!a) return fail(404, 'Произведение не найдено');
    if (a.card_status === 'archived') return fail(409, 'Карточка в архиве: верните её из архива');

    const all = await loadFragments(pool, artworkId);
    const translated = new Set(all.filter(f => f.language === 'en' && f.translated_from).map(f => Number(f.translated_from)));
    const todo = all.filter(f => f.language === 'ru' && f.approved_at && f.status !== 'ai_inferred' && !isHidden(f.sources as Source[]) && !translated.has(Number(f.fragment_id)));
    if (!todo.length) return { ok: true, added: [], rejected: [], nothing_to_translate: true, model: null };

    const answer = await core('/api/v1/cards/translate', {
      fragments: todo.map(f => ({ id: Number(f.fragment_id), text: f.text })),
      artwork: { title: a.title, artist_name: a.artist_name },
    });
    if (!answer.ok) return fail(answer.status ?? 502, answer.error ?? 'Сервис ИИ не смог выполнить запрос');
    const data = answer.data;

    const byId = new Map(todo.map(f => [Number(f.fragment_id), f]));
    const rejected: Array<{ fragment_id: number; reasons: string[] }> = (Array.isArray(data.rejected) ? data.rejected : [])
      .filter((r: any) => byId.has(Number(r?.id))).map((r: any) => ({ fragment_id: Number(r.id), reasons: Array.isArray(r.reasons) ? r.reasons.map(String).slice(0, 5) : [] }));

    const client = await pool.connect();
    const added: object[] = [];
    try {
      await client.query('BEGIN');
      for (const t of Array.isArray(data.translations) ? data.translations : []) {
        const source = byId.get(Number(t?.id));
        const text = typeof t?.text === 'string' ? t.text.trim() : '';
        if (!source || !text || text.length > 5000) { if (source) rejected.push({ fragment_id: Number(t.id), reasons: ['перевод пустой или слишком длинный'] }); continue; }
        const violations = judgmentViolations(source.block, text);
        if (violations.length) { rejected.push({ fragment_id: Number(source.fragment_id), reasons: [`суждение о подлинности или цене: «${violations.map(v => v.match).join('», «')}»`] }); continue; }
        const { rows } = await client.query(
          `INSERT INTO artwork_card_fragments (artwork_id, block, position, language, text, status, confidence, sources, translated_from, model, prompt_version, created_by)
           VALUES ($1, $2, $3, 'en', $4, $5, $6, $7::jsonb, $8, $9, $10, $11) RETURNING *`,
          [artworkId, source.block, source.position, text, source.status, source.confidence, JSON.stringify(source.sources), source.fragment_id,
            typeof data.model === 'string' ? data.model : null, typeof data.prompt_version === 'string' ? data.prompt_version : null, actor.user_id]);
        added.push(rows[0]);
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK').catch(() => undefined);
      throw e;
    } finally {
      client.release();
    }
    return { ok: true, added, rejected, nothing_to_translate: false, model: typeof data.model === 'string' ? data.model : null };
  });
}
