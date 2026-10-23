// src/middleware/aiBudget.ts
// Бюджетные лимиты платных ИИ-запросов. Каждый вызов модели стоит денег, а чат и RAG открыты гостям,
// PDF и анализ изображения — любому вошедшему (регистрация открытая). Поверх общего лимита `/api/ai`
// (server.js) действуют два ограничителя:
//   * на один IP за окно (по умолчанию 10 минут) — не даёт одному клиенту выбрать весь бюджет;
//   * общий за сутки (UTC) — потолок расходов при распределённом переборе с многих адресов.
// Два ведра: «лёгкие» (чат, RAG — копейки) и «тяжёлые» (анализ изображения и PDF — на порядок дороже).
// Сотрудники, кураторы и администраторы тяжёлые запросы делают без ограничений (их рабочие сценарии).
// Счётчики в памяти процесса: при перезапуске приложения обнуляются; приложение одно (один контейнер).
// Подключается ПОСЛЕ accessControl, чтобы знать роль вошедшего пользователя (req.user).
import { Request, Response, NextFunction } from 'express';

export interface AiBudgetOptions {
  /** Чат и RAG: всего запросов за сутки (UTC), 0 — без ограничения. */
  lightDaily: number;
  /** Анализ изображения и PDF: всего запросов за сутки (UTC), 0 — без ограничения. */
  heavyDaily: number;
  /** Чат и RAG: запросов с одного IP за окно, 0 — без ограничения. */
  lightPerIp: number;
  /** Анализ изображения и PDF: запросов с одного IP за окно, 0 — без ограничения. */
  heavyPerIp: number;
  ipWindowMs: number;
  /** Роли, для которых тяжёлые запросы не ограничиваются. */
  exemptRoles: readonly string[];
  now?: () => number;
}

export const DEFAULT_OPTIONS: AiBudgetOptions = {
  lightDaily: 2000,
  heavyDaily: 100,
  lightPerIp: 20,
  heavyPerIp: 10,
  ipWindowMs: 10 * 60 * 1000,
  exemptRoles: ['admin', 'curator', 'staff'],
};

type Bucket = 'light' | 'heavy';
const LIGHT_PATHS = new Set(['/chat', '/rag-query']);
const HEAVY_PATHS = new Set(['/analyze-image', '/process-pdf']);
const MAX_TRACKED_IPS = 10_000;

function intFromEnv(value: string | undefined, fallback: number): number {
  if (value === undefined || value.trim() === '') return fallback;
  const n = Number(value);
  return Number.isInteger(n) && n >= 0 ? n : fallback;
}

/** Настройки из окружения: AI_CHAT_DAILY_LIMIT, AI_HEAVY_DAILY_LIMIT, AI_CHAT_IP_LIMIT, AI_HEAVY_IP_LIMIT (0 — без лимита). */
export function aiBudgetOptionsFromEnv(env: NodeJS.ProcessEnv = process.env): AiBudgetOptions {
  return {
    ...DEFAULT_OPTIONS,
    lightDaily: intFromEnv(env.AI_CHAT_DAILY_LIMIT, DEFAULT_OPTIONS.lightDaily),
    heavyDaily: intFromEnv(env.AI_HEAVY_DAILY_LIMIT, DEFAULT_OPTIONS.heavyDaily),
    lightPerIp: intFromEnv(env.AI_CHAT_IP_LIMIT, DEFAULT_OPTIONS.lightPerIp),
    heavyPerIp: intFromEnv(env.AI_HEAVY_IP_LIMIT, DEFAULT_OPTIONS.heavyPerIp),
  };
}

export interface AiBudgetStats {
  day: string;
  light: number;
  heavy: number;
}

export type AiBudgetMiddleware = ((req: Request, res: Response, next: NextFunction) => void) & { stats: () => AiBudgetStats };

export function createAiBudget(options: AiBudgetOptions = DEFAULT_OPTIONS): AiBudgetMiddleware {
  const now = options.now ?? Date.now;
  const daily = { day: '', light: 0, heavy: 0 };
  const perIp = new Map<string, { count: number; resetAt: number }>();
  let warnedDay = '';

  const dayOf = (ms: number) => new Date(ms).toISOString().slice(0, 10);
  const secondsToUtcMidnight = (ms: number) => {
    const d = new Date(ms);
    return Math.max(1, Math.ceil((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1) - ms) / 1000));
  };

  const limits = (bucket: Bucket) =>
    bucket === 'light'
      ? { daily: options.lightDaily, ip: options.lightPerIp }
      : { daily: options.heavyDaily, ip: options.heavyPerIp };

  const middleware = ((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'POST') return next();
    const path = req.path.length > 1 ? req.path.replace(/\/+$/, '') : req.path;
    const bucket: Bucket | null = LIGHT_PATHS.has(path) ? 'light' : HEAVY_PATHS.has(path) ? 'heavy' : null;
    if (!bucket) return next();

    const role = (req as any).user?.role as string | undefined;
    if (bucket === 'heavy' && role && options.exemptRoles.includes(role)) return next();

    const t = now();
    const today = dayOf(t);
    if (daily.day !== today) {
      daily.day = today;
      daily.light = 0;
      daily.heavy = 0;
    }
    const { daily: dailyLimit, ip: ipLimit } = limits(bucket);

    // Сначала проверки, потом учёт: отклонённый запрос не расходует ни окно IP, ни суточный бюджет
    const key = `${bucket}:${req.ip}`;
    const entry = perIp.get(key);
    const live = entry && entry.resetAt > t ? entry : undefined;
    if (ipLimit > 0 && live && live.count >= ipLimit) {
      res.setHeader('Retry-After', String(Math.max(1, Math.ceil((live.resetAt - t) / 1000))));
      res.status(429).json({ error: 'Слишком много запросов к ИИ с вашего адреса, попробуйте чуть позже.', code: 'AI_BUDGET_IP' });
      return;
    }
    if (dailyLimit > 0 && daily[bucket] >= dailyLimit) {
      if (warnedDay !== today) {
        warnedDay = today;
        console.warn(`[ai-budget] суточный лимит «${bucket}» исчерпан (${dailyLimit}); новые запросы отклоняются до 00:00 UTC`);
      }
      res.setHeader('Retry-After', String(secondsToUtcMidnight(t)));
      res.status(429).json({ error: 'Дневной лимит запросов к ИИ исчерпан, попробуйте завтра.', code: 'AI_BUDGET_DAILY' });
      return;
    }

    daily[bucket] += 1;
    if (ipLimit > 0) {
      if (live) live.count += 1;
      else {
        if (perIp.size >= MAX_TRACKED_IPS) {
          for (const [k, v] of perIp) if (v.resetAt <= t) perIp.delete(k);
          if (perIp.size >= MAX_TRACKED_IPS) perIp.clear(); // защита памяти при переборе адресов: лучше сбросить окна, чем расти
        }
        perIp.set(key, { count: 1, resetAt: t + options.ipWindowMs });
      }
    }
    next();
  }) as AiBudgetMiddleware;

  middleware.stats = () => ({ day: daily.day, light: daily.light, heavy: daily.heavy });
  return middleware;
}
