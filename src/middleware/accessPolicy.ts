// src/middleware/accessPolicy.ts
// Единая политика доступа к /api: «метод + путь → кто допущен». Первое совпавшее правило побеждает.
// Всё, что не описано: чтение — любой вошедший пользователь, изменение — только администратор.
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { getJwtSecret } from '../config/jwt';

export interface SessionUser {
  user_id: number;
  role: string;
  email: string;
  username: string;
}

// 'public' — без входа; 'auth' — любой вошедший; массив — перечень допустимых ролей
export type Access = 'public' | 'auth' | readonly string[];

export interface Rule {
  methods: readonly string[];
  path: RegExp;
  access: Access;
  /** Группа regex, содержащая id пользователя: доступ только владельцу (админ — исключение). */
  ownerGroup?: number;
}

const GET = ['GET', 'HEAD'] as const;
const WRITE = ['POST', 'PUT', 'PATCH', 'DELETE'] as const;
const ALL = [...GET, ...WRITE] as const;
const ADMIN = ['admin'] as const;
const CURATORS = ['admin', 'curator'] as const;
const STAFF = ['admin', 'curator', 'staff'] as const;
const BIDDERS = ['admin', 'auction_participant'] as const;

export const RULES: readonly Rule[] = [
  // ── служебные и вход ────────────────────────────────────────────────
  { methods: GET, path: /^\/(health|ai\/health|public-config)$/, access: 'public' },
  { methods: ALL, path: /^\/infra\/status$/, access: ADMIN },
  { methods: ['POST'], path: /^\/auth\/(login|register|refresh)$/, access: 'public' },
  { methods: GET, path: /^\/auth\/verify$/, access: 'public' }, // сам проверяет токен
  { methods: ALL, path: /^\/auth\/me(\/.*)?$/, access: 'auth' },

  // ── администрирование ───────────────────────────────────────────────
  { methods: ALL, path: /^\/admin(\/.*)?$/, access: ADMIN },

  // ── галерея ─────────────────────────────────────────────────────────
  { methods: GET, path: /^\/gallery\/(rooms|config)$/, access: 'public' },
  { methods: GET, path: /^\/gallery\/rooms\/[^/]+\/artworks$/, access: 'public' },
  { methods: ALL, path: /^\/gallery(\/.*)?$/, access: CURATORS },

  // ── произведения ────────────────────────────────────────────────────
  { methods: GET, path: /^\/artworks(\/(random|filters|stats|[^/]+))?$/, access: 'public' },
  { methods: ['POST'], path: /^\/artworks\/upload$/, access: STAFF },
  { methods: ALL, path: /^\/artworks(\/.*)?$/, access: CURATORS },

  // ── коллекции, архив, настройки, статистика ─────────────────────────
  { methods: GET, path: /^\/collections(\/[^/]+)?$/, access: 'public' },
  { methods: ALL, path: /^\/collections(\/.*)?$/, access: CURATORS },
  { methods: ALL, path: /^\/archive(\/.*)?$/, access: CURATORS },
  { methods: GET, path: /^\/display-settings$/, access: 'public' },
  { methods: ALL, path: /^\/display-settings(\/.*)?$/, access: ADMIN },
  { methods: GET, path: /^\/stats\/dashboard$/, access: STAFF },
  { methods: ['POST'], path: /^\/watermark\/(apply|verify)$/, access: STAFF },

  // ── аукционы ────────────────────────────────────────────────────────
  { methods: GET, path: /^\/auctions\/participant\/([^/]+)$/, access: BIDDERS, ownerGroup: 1 },
  { methods: ['POST'], path: /^\/auctions\/(bids|lots\/[^/]+\/bid)$/, access: BIDDERS },
  { methods: ['POST'], path: /^\/auctions(\/[^/]+\/lots)?$/, access: CURATORS },
  { methods: GET, path: /^\/auctions\/(transactions)$/, access: BIDDERS },
  { methods: GET, path: /^\/auctions(\/(stats|history|[^/]+(\/(lots|bids))?))?$/, access: 'public' },

  // ── ИИ: лёгкие запросы открыты (с лимитом), тяжёлые — после входа ───
  { methods: ['POST'], path: /^\/ai\/(chat|rag-query|describe-artwork|similar-artworks|calculate-slots)$/, access: 'public' },
  { methods: GET, path: /^\/ai\/analysis\/[^/]+$/, access: 'public' },
  { methods: ['POST'], path: /^\/ai\/(analyze-image|process-pdf)$/, access: 'auth' },
];

export function findRule(method: string, path: string): Rule | undefined {
  const m = method.toUpperCase();
  const p = path.length > 1 ? path.replace(/\/+$/, '') : path;
  return RULES.find(r => r.methods.includes(m) && r.path.test(p));
}

export function defaultAccess(method: string): Access {
  return GET.includes(method.toUpperCase() as 'GET') ? 'auth' : ADMIN;
}

async function authenticate(req: Request): Promise<SessionUser | { error: string }> {
  const header = req.headers['authorization'];
  const token = typeof header === 'string' ? header.split(' ')[1] : undefined;
  if (!token) return { error: 'Access token required' };

  let payload: any;
  try {
    payload = jwt.verify(token, getJwtSecret());
  } catch {
    return { error: 'Invalid or expired token' };
  }

  // Роль берём из БД, а не из токена: смена роли и удаление пользователя действуют сразу
  const result = await pool.query('SELECT user_id, email, username, role FROM users WHERE user_id = $1', [payload.userId]);
  const row = result.rows[0];
  if (!row) return { error: 'User not found' };
  return { user_id: row.user_id, email: row.email, username: row.username, role: row.role };
}

export async function accessControl(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (req.method === 'OPTIONS') return next();

  const rule = findRule(req.method, req.path);
  const access = rule ? rule.access : defaultAccess(req.method);
  if (access === 'public') return next();

  try {
    const session = await authenticate(req);
    if ('error' in session) {
      res.status(401).json({ error: session.error });
      return;
    }

    const isRoleList = Array.isArray(access);
    if (isRoleList && !(access as readonly string[]).includes(session.role)) {
      res.status(403).json({ error: 'Недостаточно прав' });
      return;
    }

    if (rule?.ownerGroup && session.role !== 'admin') {
      const owner = rule.path.exec(req.path.replace(/\/+$/, ''))?.[rule.ownerGroup];
      if (owner !== String(session.user_id)) {
        res.status(403).json({ error: 'Недостаточно прав' });
        return;
      }
    }

    (req as any).user = session;
    next();
  } catch (error) {
    console.error('[access] auth check failed:', (error as Error).message);
    res.status(500).json({ error: 'Authorization check failed' });
  }
}
