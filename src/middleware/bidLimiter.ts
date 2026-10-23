// src/middleware/bidLimiter.ts — частота ставок: не больше N за окно на пользователя (по сессии, а не по IP).
// Счётчики в памяти процесса. Подключается после accessControl: нужен req.user.
import { Request, Response, NextFunction } from 'express';

export function createBidLimiter(options: { limit?: number; windowMs?: number; now?: () => number } = {}) {
  const limit = options.limit ?? 30;
  const windowMs = options.windowMs ?? 60_000;
  const now = options.now ?? Date.now;
  const hits = new Map<number, { count: number; resetAt: number }>();

  return function bidLimiter(req: Request, res: Response, next: NextFunction): void {
    const userId = (req as any).user?.user_id;
    if (!userId) return next();
    const t = now();
    if (hits.size > 10_000) for (const [id, entry] of hits) if (entry.resetAt <= t) hits.delete(id);
    const entry = hits.get(userId);
    if (!entry || entry.resetAt <= t) {
      hits.set(userId, { count: 1, resetAt: t + windowMs });
      return next();
    }
    if (entry.count >= limit) {
      res.setHeader('Retry-After', String(Math.max(1, Math.ceil((entry.resetAt - t) / 1000))));
      res.status(429).json({ error: 'Слишком много ставок подряд. Подождите немного.', code: 'BID_RATE' });
      return;
    }
    entry.count += 1;
    next();
  };
}
