// lib/userAdmin.ts — управление пользователями администратором (/api/admin/users): запросы, подписи, разбор ответов.
// Правила (кто что может, проверки имени и почты, защита последнего администратора, срок временного пароля) решает сервер;
// здесь — только показ и подготовка данных формы. Описание — docs/DEPLOY.md, «Учётные записи».
import { fetchWithAuth } from '../services/api';

export const ROLE_LABELS: Record<string, string> = {
  admin: 'Администратор', curator: 'Куратор', staff: 'Сотрудник',
  tour_guide: 'Гид', auction_participant: 'Участник аукциона', user: 'Посетитель',
};
export const ROLES = Object.keys(ROLE_LABELS);

export const ROLE_HINTS: Record<string, string> = {
  admin: 'Полный доступ, управление пользователями и настройками.',
  curator: 'Утверждает карточки, ведёт торги и документы.',
  staff: 'Готовит карточки, загружает документы и работы.',
  tour_guide: 'Проводит экскурсии.',
  auction_participant: 'Может подавать заявки и делать ставки (после допуска).',
  user: 'Обычный посетитель.',
};

export interface AdminUser {
  user_id: number; username: string; email: string; role: string; created_at: string;
  must_change_password?: boolean; temp_password_expires_at?: string | null;
}
export interface IssuedPassword { user: AdminUser; temporary_password: string; expires_at: string }

export class UserAdminError extends Error {
  constructor(message: string, readonly status: number, readonly code?: string) { super(message); }
}

async function call<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const res = await fetchWithAuth(`/api/admin/users${path}`,
    body === undefined ? { method } : { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) {
    let data: any = null;
    try { data = await res.json(); } catch { /* тела нет */ }
    const message = res.status === 403 ? 'Недостаточно прав.' : res.status === 401 ? 'Войдите в аккаунт.'
      : res.status >= 500 && res.status !== 503 ? 'Не удалось выполнить действие.' : (data?.error || 'Не удалось выполнить действие.');
    throw new UserAdminError(message, res.status, data?.code);
  }
  return res.json();
}

export const listUsers = (search = '', limit = 50) =>
  call<{ users: AdminUser[]; total: number }>(`?limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}`);
export const createUser = (input: { username: string; email: string; role: string; password?: string }) =>
  call<IssuedPassword>('', 'POST', { ...input, password: input.password?.trim() ? input.password : undefined });
export const resetPassword = (id: number) => call<IssuedPassword>(`/${id}/reset-password`, 'POST', {});
export const setRole = (id: number, role: string) => call<{ user: AdminUser }>(`/${id}/role`, 'PUT', { role });

// ── Показ ──────────────────────────────────────────────────────────────────────────────────────

export type PasswordState = 'none' | 'pending' | 'expired';

/** Ждёт ли пользователь смены временного пароля и не истёк ли он. */
export function passwordState(u: Pick<AdminUser, 'must_change_password' | 'temp_password_expires_at'>, now = Date.now()): PasswordState {
  if (!u.must_change_password) return 'none';
  if (u.temp_password_expires_at && new Date(u.temp_password_expires_at).getTime() < now) return 'expired';
  return 'pending';
}

export const formatDate = (iso: string | null | undefined) =>
  (iso ? new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).replace(/\s?г\.$/, '') : '—');

/** Предупреждение о подтверждении сброса: что именно произойдёт с пользователем. */
export const resetWarning = (u: Pick<AdminUser, 'username'>) =>
  `Выдать «${u.username}» новый временный пароль? Прежний пароль и все открытые сессии пользователя перестанут действовать, при входе потребуется задать свой пароль.`;

export function roleChangeWarning(u: Pick<AdminUser, 'username' | 'role'>, role: string): string {
  const base = `Сменить роль «${u.username}» с «${ROLE_LABELS[u.role] ?? u.role}» на «${ROLE_LABELS[role] ?? role}»?`;
  return role === 'admin' ? `${base} Администратор получит полный доступ, включая управление пользователями.` : base;
}

/** Текст для передачи пользователю: адрес входа, почта и временный пароль. Пароль в чат/почту лучше не отправлять открыто — подсказка рядом в интерфейсе. */
export function handoverText(issued: IssuedPassword, origin: string): string {
  return [`Вход: ${origin}/login`, `E-mail: ${issued.user.email}`, `Временный пароль: ${issued.temporary_password}`,
    `Пароль действует до ${formatDate(issued.expires_at)}; при первом входе задайте свой.`].join('\n');
}

export const MIN_NEW_PASSWORD = 8;

/** Что не так с новым паролем (до обращения к серверу); null — можно отправлять. */
export function newPasswordProblem(current: string, next: string, repeat: string): string | null {
  if (next.length < MIN_NEW_PASSWORD) return `Новый пароль — не короче ${MIN_NEW_PASSWORD} знаков.`;
  if (next === current) return 'Новый пароль должен отличаться от временного.';
  if (next !== repeat) return 'Пароли не совпадают.';
  return null;
}
