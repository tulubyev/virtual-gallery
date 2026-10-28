// src/services/userAdmin.ts — управление пользователями администратором: создание, роли, временные пароли, защита от потери последнего администратора.
// Миграция 007 (must_change_password, temp_password_expires_at, password_changed_at, user_admin_log). Пароли в журнал и ответы не попадают, кроме
// временного пароля в ответе на его выдачу: показывается один раз, хранится только хеш.
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import pool from '../config/database';
import { queryWithFallback } from './userSession';
export { queryWithFallback, issuedBeforePasswordChange } from './userSession';

export const ROLES = ['admin', 'curator', 'staff', 'tour_guide', 'auction_participant', 'user'] as const;
export const TEMP_PASSWORD_DAYS = 7;
export const MIN_ADMIN_PASSWORD = 8;
const MAX_PASSWORD_BYTES = 72;                     // предел bcrypt: остальное он молча отбрасывает
const SALT_ROUNDS = 10;
const ADMIN_LOCK = 7_001;                          // advisory-замок: изменения, затрагивающие администраторов, идут по одному

export interface Actor { user_id: number; role?: string }
export type Result<T = {}> = ({ ok: true } & T) | { ok: false; status: number; error: string; code?: string };
const fail = (status: number, error: string, code?: string): { ok: false; status: number; error: string; code?: string } => ({ ok: false, status, error, ...(code ? { code } : {}) });

const PUBLIC_COLUMNS = 'user_id, username, email, role, created_at';
const ADMIN_COLUMNS = `${PUBLIC_COLUMNS}, must_change_password, temp_password_expires_at`;

// ── Проверка входных данных ───────────────────────────────────────────────────────────────────────

// Кавычки (в том числе типографские), угловые скобки, обратная косая и управляющие знаки в логине и почте не нужны и ломают копирование и поиск
const FORBIDDEN_CHARS = /[\u0000-\u001f\u007f<>"'`\\‘’‚‛“”„‟«»]/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** minLength: администратор создаёт имена от 2 знаков; регистрация и профиль прежних коротких имён не отвергают. */
export function validateUsername(value: unknown, minLength = 2): string | null {
  if (typeof value !== 'string') return 'Укажите имя пользователя';
  const v = value.trim();
  if (v.length < minLength || v.length > 50) return minLength > 1 ? `Имя пользователя — от ${minLength} до 50 знаков` : 'Имя пользователя — до 50 знаков';
  if (FORBIDDEN_CHARS.test(v)) return 'В имени пользователя нельзя использовать кавычки, угловые скобки и служебные знаки';
  return null;
}

export function validateEmail(value: unknown): string | null {
  if (typeof value !== 'string') return 'Укажите e-mail';
  const v = value.trim();
  if (v.length > 100 || !EMAIL.test(v)) return 'Укажите e-mail в формате name@example.com';
  if (FORBIDDEN_CHARS.test(v)) return 'В e-mail нельзя использовать кавычки и служебные знаки';
  return null;
}

export const isRole = (value: unknown): value is typeof ROLES[number] => typeof value === 'string' && (ROLES as readonly string[]).includes(value);

export function validateAdminPassword(value: unknown): string | null {
  if (typeof value !== 'string') return 'Пароль должен быть строкой';
  if (value.length < MIN_ADMIN_PASSWORD) return `Пароль — не короче ${MIN_ADMIN_PASSWORD} знаков`;
  if (Buffer.byteLength(value, 'utf8') > MAX_PASSWORD_BYTES) return `Пароль — не длиннее ${MAX_PASSWORD_BYTES} байт`;
  if (value !== value.trim()) return 'Пароль не должен начинаться или заканчиваться пробелом';
  return null;
}

const UPPER = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const LOWER = 'abcdefghijkmnopqrstuvwxyz';
const DIGITS = '23456789';                          // без 0/O, 1/l/I: пароль диктуют и переписывают
const pick = (alphabet: string) => alphabet[crypto.randomInt(alphabet.length)];

/** Случайный временный пароль: 12 знаков, есть заглавная, строчная и цифра, без похожих знаков. */
export function generateTemporaryPassword(length = 12): string {
  const all = UPPER + LOWER + DIGITS;
  const chars = [pick(UPPER), pick(LOWER), pick(DIGITS)];
  while (chars.length < length) chars.push(pick(all));
  for (let i = chars.length - 1; i > 0; i--) {         // перемешивание Фишера — Йетса
    const j = crypto.randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}

const expiry = () => new Date(Date.now() + TEMP_PASSWORD_DAYS * 24 * 60 * 60 * 1000);

async function log(actor: Actor, targetId: number | null, action: string, details: object) {
  try {
    await pool.query('INSERT INTO user_admin_log (actor_id, target_id, action, details) VALUES ($1, $2, $3, $4::jsonb)', [actor.user_id, targetId, action, JSON.stringify(details)]);
  } catch (e: any) {
    console.error('[user-admin] журнал недоступен:', e?.message);           // действие уже выполнено; отсутствие журнала его не отменяет
  }
}

const NEEDS_MIGRATION = fail(503, 'База не обновлена: примените миграцию 007 (npm run migrate)');
async function duplicate(username: string | null, email: string | null, exceptId = 0): Promise<string | null> {
  const { rows } = await pool.query(
    `SELECT (lower(username) = lower($1)) AS same_username, (lower(email) = lower($2)) AS same_email
       FROM users WHERE user_id <> $3 AND (lower(username) = lower($1) OR lower(email) = lower($2))`, [username, email, exceptId]);
  if (rows.some(r => r.same_email)) return 'Пользователь с таким e-mail уже существует';
  if (rows.some(r => r.same_username)) return 'Пользователь с таким именем уже существует';
  return null;
}

// ── Создание ──────────────────────────────────────────────────────────────────────────────────────

export interface NewUser { username: unknown; email: unknown; role: unknown; password?: unknown }

/** Администратор создаёт пользователя. Пароль не указан — выдаётся случайный временный; в любом случае при первом входе его надо сменить. */
export async function createUser(actor: Actor, input: NewUser): Promise<Result<{ user: object; temporary_password: string; expires_at: string }>> {
  const invalid = validateUsername(input.username) ?? validateEmail(input.email);
  if (invalid) return fail(400, invalid);
  if (!isRole(input.role)) return fail(400, `Недопустимая роль. Допустимые: ${ROLES.join(', ')}`);
  if (input.password !== undefined && input.password !== null && input.password !== '') {
    const bad = validateAdminPassword(input.password);
    if (bad) return fail(400, bad);
  }
  const username = (input.username as string).trim();
  const email = (input.email as string).trim();
  const password = typeof input.password === 'string' && input.password !== '' ? input.password : generateTemporaryPassword();

  const taken = await duplicate(username, email);
  if (taken) return fail(409, taken);

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const until = expiry();
  try {
    const { rows } = await pool.query(
      `INSERT INTO users (username, email, password_hash, role, must_change_password, temp_password_expires_at, password_changed_at)
       VALUES ($1, $2, $3, $4, true, $5, now()) RETURNING ${ADMIN_COLUMNS}`, [username, email, hash, input.role, until]);
    await log(actor, rows[0].user_id, 'create', { username, email, role: input.role });
    return { ok: true, user: rows[0], temporary_password: password, expires_at: until.toISOString() };
  } catch (e: any) {
    if (e?.code === '23505') return fail(409, 'Пользователь с таким именем или e-mail уже существует');
    if (e?.code === '42703') return NEEDS_MIGRATION;
    throw e;
  }
}

// ── Временный пароль ──────────────────────────────────────────────────────────────────────────────

/** Новый временный пароль. Прежние сессии пользователя закрываются (password_changed_at), при входе потребуется смена пароля. */
export async function resetPassword(actor: Actor, id: number, requested?: unknown): Promise<Result<{ user: object; temporary_password: string; expires_at: string }>> {
  if (id === actor.user_id) return fail(400, 'Свой пароль меняйте в профиле: временный пароль выдаётся другим пользователям');
  if (requested !== undefined && requested !== null && requested !== '') {
    const bad = validateAdminPassword(requested);
    if (bad) return fail(400, bad);
  }
  const password = typeof requested === 'string' && requested !== '' ? requested : generateTemporaryPassword();
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const until = expiry();
  try {
    const { rows } = await pool.query(
      `UPDATE users SET password_hash = $2, must_change_password = true, temp_password_expires_at = $3, password_changed_at = now()
        WHERE user_id = $1 RETURNING ${ADMIN_COLUMNS}`, [id, hash, until]);
    if (!rows[0]) return fail(404, 'Пользователь не найден');
    await log(actor, id, 'reset_password', { username: rows[0].username });
    return { ok: true, user: rows[0], temporary_password: password, expires_at: until.toISOString() };
  } catch (e: any) {
    if (e?.code === '42703') return NEEDS_MIGRATION;
    throw e;
  }
}

// ── Роли, правка, удаление ────────────────────────────────────────────────────────────────────────

/** Транзакция под замком администраторов: два одновременных запроса не оставят систему без администратора. */
async function withAdminLock<T>(work: (q: (sql: string, params?: any[]) => Promise<any[]>) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock($1)', [ADMIN_LOCK]);
    const out = await work(async (sql, params = []) => (await client.query(sql, params)).rows);
    await client.query('COMMIT');
    return out;
  } catch (e) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw e;
  } finally {
    client.release();
  }
}

const otherAdmins = async (q: (sql: string, params?: any[]) => Promise<any[]>, id: number) =>
  (await q(`SELECT count(*)::int AS n FROM users WHERE role = 'admin' AND user_id <> $1`, [id]))[0].n as number;

export interface UserPatch { username?: unknown; email?: unknown; role?: unknown }

export async function updateUser(actor: Actor, id: number, patch: UserPatch): Promise<Result<{ user: object }>> {
  if (patch.username === undefined && patch.email === undefined && patch.role === undefined) return fail(400, 'Нужно указать хотя бы одно поле для обновления');
  if (patch.username !== undefined) { const bad = validateUsername(patch.username); if (bad) return fail(400, bad); }
  if (patch.email !== undefined) { const bad = validateEmail(patch.email); if (bad) return fail(400, bad); }
  if (patch.role !== undefined && !isRole(patch.role)) return fail(400, `Недопустимая роль. Допустимые: ${ROLES.join(', ')}`);
  if (patch.role !== undefined && id === actor.user_id) return fail(400, 'Свою роль менять нельзя: это сделает другой администратор');

  const username = typeof patch.username === 'string' ? patch.username.trim() : null;
  const email = typeof patch.email === 'string' ? patch.email.trim() : null;
  const taken = await duplicate(username, email, id);
  if (taken && (username || email)) return fail(409, taken);

  return withAdminLock(async q => {
    const current = (await q('SELECT user_id, username, email, role FROM users WHERE user_id = $1 FOR UPDATE', [id]))[0];
    if (!current) return fail(404, 'Пользователь не найден');
    if (patch.role !== undefined && current.role === 'admin' && patch.role !== 'admin' && (await otherAdmins(q, id)) === 0) {
      return fail(409, 'Это последний администратор: сначала назначьте другого', 'last_admin');
    }
    const rows = await q(
      `UPDATE users SET username = COALESCE($2, username), email = COALESCE($3, email), role = COALESCE($4, role)
        WHERE user_id = $1 RETURNING ${PUBLIC_COLUMNS}`, [id, username, email, typeof patch.role === 'string' ? patch.role : null]);
    const changed: Record<string, unknown> = {};
    if (username && username !== current.username) changed.username = { from: current.username, to: username };
    if (email && email !== current.email) changed.email = { from: current.email, to: email };
    if (typeof patch.role === 'string' && patch.role !== current.role) changed.role = { from: current.role, to: patch.role };
    await log(actor, id, patch.role !== undefined && Object.keys(changed).length === 1 && changed.role ? 'role' : 'update', changed);
    return { ok: true, user: rows[0] };
  });
}

export async function deleteUser(actor: Actor, id: number): Promise<Result> {
  if (id === actor.user_id) return fail(400, 'Свою учётную запись удалить нельзя');
  return withAdminLock(async q => {
    const current = (await q('SELECT user_id, username, email, role FROM users WHERE user_id = $1 FOR UPDATE', [id]))[0];
    if (!current) return fail(404, 'Пользователь не найден');
    if (current.role === 'admin' && (await otherAdmins(q, id)) === 0) return fail(409, 'Это последний администратор: удалить его нельзя', 'last_admin');
    try {
      await q('DELETE FROM users WHERE user_id = $1', [id]);
    } catch (e: any) {
      if (e?.code === '23503') return fail(409, 'У пользователя есть связанные данные (работы, заявки, ставки): удалить его нельзя. Смените ему роль на «Посетитель».', 'has_data');
      throw e;
    }
    await log(actor, id, 'delete', { username: current.username, email: current.email, role: current.role });
    return { ok: true };
  });
}
