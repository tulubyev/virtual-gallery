// src/services/legalDocs.ts — юридические документы торгов (src/legal/*.md): правила аукциона, политика и согласие на обработку ПД.
//
// Тексты лежат в репозитории и правятся юристом как обычные файлы; статус `draft` — каркас, `approved` — утверждено.
// У версии есть отпечаток (SHA-256 текста): участник принимает конкретную версию, и она записывается в заявку.
// Пока документ не `approved`, заявки на участие не принимаются (см. src/routes/bidding.ts), чтобы запуск не прошёл с черновиком.
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';

export const LEGAL_DIR = path.join(__dirname, '..', 'legal');
export const LEGAL_SLUGS = ['auction-rules', 'privacy-policy', 'pd-consent'] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export interface LegalDoc {
  slug: LegalSlug;
  title: string;
  version: string;
  status: 'draft' | 'approved';
  effective_from: string | null;
  sha256: string;
  /** Версия для записи в заявку: «1.0-draft#a1b2c3d4» — номер и первые 8 знаков отпечатка. */
  ref: string;
  markdown: string;
}

const FRONT_MATTER = /^---\n([\s\S]*?)\n---\n?/;

export function parseLegalDoc(slug: LegalSlug, raw: string): LegalDoc {
  const text = raw.replace(/\r\n/g, '\n');
  const match = FRONT_MATTER.exec(text);
  if (!match) throw new Error(`Документ ${slug}: нет блока свойств (--- … ---)`);
  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon > 0) meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
  }
  const status = meta.status === 'approved' ? 'approved' : 'draft';
  if (!meta.title || !meta.version) throw new Error(`Документ ${slug}: нужны свойства title и version`);
  if (status === 'approved' && !meta.effective_from) throw new Error(`Документ ${slug}: у утверждённого документа нужна дата effective_from`);
  const sha256 = createHash('sha256').update(text).digest('hex');
  return {
    slug, title: meta.title, version: meta.version, status, effective_from: meta.effective_from || null,
    sha256, ref: `${meta.version}#${sha256.slice(0, 8)}`, markdown: text.slice(match[0].length).trim(),
  };
}

const cache = new Map<LegalSlug, { mtimeMs: number; doc: LegalDoc }>();

/** Документ по имени; null — такого нет. Файл перечитывается при изменении (правка юриста подхватывается без перезапуска). */
export function getLegalDoc(slug: string, dir: string = LEGAL_DIR): LegalDoc | null {
  if (!(LEGAL_SLUGS as readonly string[]).includes(slug)) return null;      // имя из запроса в путь не попадает, пока не проверено по списку
  const file = path.join(dir, `${slug}.md`);
  let stat: fs.Stats;
  try { stat = fs.statSync(file); } catch { return null; }
  const key = slug as LegalSlug;
  const hit = cache.get(key);
  if (hit && hit.mtimeMs === stat.mtimeMs && dir === LEGAL_DIR) return hit.doc;
  const doc = parseLegalDoc(key, fs.readFileSync(file, 'utf8'));
  if (dir === LEGAL_DIR) cache.set(key, { mtimeMs: stat.mtimeMs, doc });
  return doc;
}

export function listLegalDocs(dir: string = LEGAL_DIR): Array<Omit<LegalDoc, 'markdown'>> {
  return LEGAL_SLUGS.flatMap(slug => {
    const doc = getLegalDoc(slug, dir);
    if (!doc) return [];
    const { markdown: _markdown, ...info } = doc;
    return [info];
  });
}

export interface ConsentCheck { ok: boolean; code?: 'rules_not_approved' | 'rules_changed' | 'pd_changed' | 'docs_missing'; message?: string }

/**
 * Можно ли принять заявку с такими версиями документов: версии должны совпадать с текущими, а документы — быть утверждены.
 * Черновики допускаются только явным флагом BIDDING_ALLOW_DRAFT_RULES=true (для проверки куратором до запуска).
 */
export function checkConsents(rulesRef: unknown, pdRef: unknown, env: NodeJS.ProcessEnv = process.env, dir: string = LEGAL_DIR): ConsentCheck {
  const rules = getLegalDoc('auction-rules', dir), policy = getLegalDoc('privacy-policy', dir), consent = getLegalDoc('pd-consent', dir);
  if (!rules || !policy || !consent) return { ok: false, code: 'docs_missing', message: 'Правила аукциона недоступны. Попробуйте позже.' };
  if (env.BIDDING_ALLOW_DRAFT_RULES !== 'true' && [rules, policy, consent].some(d => d.status !== 'approved')) {
    return { ok: false, code: 'rules_not_approved', message: 'Правила аукциона и документы о персональных данных ещё не утверждены: приём заявок не открыт.' };
  }
  if (rulesRef !== rules.ref) return { ok: false, code: 'rules_changed', message: 'Правила аукциона обновились. Откройте их заново и примите актуальную версию.' };
  if (pdRef !== consent.ref) return { ok: false, code: 'pd_changed', message: 'Согласие на обработку персональных данных обновилось. Откройте его заново и примите актуальную версию.' };
  return { ok: true };
}
