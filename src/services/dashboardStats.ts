// src/services/dashboardStats.ts
// Реальные цифры для дашбордов. Каждый блок считается отдельно: если таблицы/колонки нет
// (старая или неполная схема БД) — блок равен null, и интерфейс показывает «—», а не выдуманное число.
import pool from '../config/database';
import { normalizeConfig, roomLayout } from '../frontend/src/lib/gallery/roomSpec';
import { getActiveConfig } from './gallery-config';

type Q = (sql: string, params?: unknown[]) => Promise<any[]>;
const defaultQuery: Q = async (sql, params) => (await pool.query(sql, params as any[])).rows;

/** Выполнить блок; любая ошибка (нет таблицы/колонки) → null, остальные блоки не страдают. */
async function safe<T>(label: string, fn: () => Promise<T>): Promise<T | null> {
  try { return await fn(); } catch (e) {
    console.warn(`[stats] ${label}: ${(e as Error).message}`);
    return null;
  }
}

export interface Trend { total: number; last30: number; prev30: number }

export interface Overview {
  generatedAt: string;
  /** Только для администратора. */
  users: (Trend & { byRole: Record<string, number> }) | null;
  artworks: (Trend & { today: number; byStatus: Record<string, number> | null }) | null;
  engagement: { views: Trend; likes: Trend } | null;
  collections: { total: number } | null;
  rooms: { total: number; capacity: number } | null;
  auctions: { active: number; scheduled: number; lots: number; bids: number; volume: number } | null;
  topArtworks: Array<{ id: number; title: string; artist: string; views: number; likes: number }> | null;
  recentActivity: Array<{ type: 'artwork' | 'user' | 'bid'; text: string; at: string }> | null;
}

const num = (v: unknown): number => { const n = Number(v); return Number.isFinite(n) ? n : 0; };

async function hasColumn(q: Q, table: string, column: string): Promise<boolean> {
  const r = await q(
    'SELECT 1 FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = $1 AND column_name = $2',
    [table, column],
  );
  return r.length > 0;
}

export async function getOverview(opts: { includeUsers: boolean; query?: Q }): Promise<Overview> {
  const q = opts.query ?? defaultQuery;

  const trend = (r: any): Trend => ({ total: num(r?.total), last30: num(r?.last30), prev30: num(r?.prev30) });
  const trendSql = (table: string, col: string, where = 'TRUE') => `
    SELECT COUNT(*)::int AS total,
           COUNT(*) FILTER (WHERE ${col} >= NOW() - INTERVAL '30 days')::int AS last30,
           COUNT(*) FILTER (WHERE ${col} >= NOW() - INTERVAL '60 days' AND ${col} < NOW() - INTERVAL '30 days')::int AS prev30
    FROM ${table} WHERE ${where}`;

  const [users, artworks, engagement, collections, rooms, auctions, topArtworks, recentActivity] = await Promise.all([
    opts.includeUsers ? safe('users', async () => {
      const [t] = await q(trendSql('users', 'created_at'));
      const roles = await q('SELECT role, COUNT(*)::int AS n FROM users GROUP BY role');
      return { ...trend(t), byRole: Object.fromEntries(roles.map(r => [String(r.role), num(r.n)])) };
    }) : Promise.resolve(null),

    safe('artworks', async () => {
      const [t] = await q(trendSql('artworks', 'created_at'));
      const [today] = await q("SELECT COUNT(*)::int AS n FROM artworks WHERE created_at >= NOW() - INTERVAL '1 day'");
      const byStatus = (await hasColumn(q, 'artworks', 'status'))
        ? Object.fromEntries((await q('SELECT status, COUNT(*)::int AS n FROM artworks GROUP BY status')).map(r => [String(r.status ?? 'unknown'), num(r.n)]))
        : null;
      return { ...trend(t), today: num(today?.n), byStatus };
    }),

    safe('engagement', async () => {
      const row = (type: string) => q(trendSql('user_interactions', 'timestamp', `interaction_type = '${type}'`)).then(r => trend(r[0]));
      return { views: await row('view'), likes: await row('like') };
    }),

    safe('collections', async () => ({ total: num((await q('SELECT COUNT(*)::int AS n FROM collections'))[0]?.n) })),

    safe('rooms', async () => {
      const row = await getActiveConfig();
      const { config } = normalizeConfig(row?.config);
      return { total: config.rooms.length, capacity: config.rooms.reduce((s: number, r: any) => s + roomLayout(r).capacity, 0) };
    }),

    safe('auctions', async () => {
      const [a] = await q(`SELECT COUNT(*) FILTER (WHERE status = 'active')::int AS active,
                                  COUNT(*) FILTER (WHERE status = 'scheduled')::int AS scheduled FROM auctions`);
      const [l] = await q('SELECT COUNT(*)::int AS n FROM auction_lots');
      const [b] = await q('SELECT COUNT(*)::int AS n, COALESCE(SUM(amount), 0) AS volume FROM bids');
      return { active: num(a?.active), scheduled: num(a?.scheduled), lots: num(l?.n), bids: num(b?.n), volume: num(b?.volume) };
    }),

    safe('topArtworks', async () => (await q(`
      SELECT a.artwork_id AS id, a.title, a.artist_name AS artist,
             COUNT(*) FILTER (WHERE i.interaction_type = 'view')::int AS views,
             COUNT(*) FILTER (WHERE i.interaction_type = 'like')::int AS likes
      FROM artworks a JOIN user_interactions i ON i.artwork_id = a.artwork_id
      GROUP BY a.artwork_id, a.title, a.artist_name
      ORDER BY likes DESC, views DESC LIMIT 5`)).map(r => ({ id: num(r.id), title: String(r.title), artist: String(r.artist), views: num(r.views), likes: num(r.likes) }))),

    safe('recentActivity', async () => {
      const parts: string[] = [
        `(SELECT 'artwork' AS type, 'Добавлено произведение «' || title || '»' AS text, created_at AS at FROM artworks ORDER BY created_at DESC LIMIT 6)`,
        `(SELECT 'bid' AS type, 'Ставка ' || amount::text || ' на лот №' || lot_id::text AS text, timestamp AS at FROM bids ORDER BY timestamp DESC LIMIT 6)`,
      ];
      if (opts.includeUsers) parts.push(`(SELECT 'user' AS type, 'Новый пользователь ' || username AS text, created_at AS at FROM users ORDER BY created_at DESC LIMIT 6)`);
      const rows = await q(`SELECT * FROM (${parts.join(' UNION ALL ')}) t WHERE at IS NOT NULL ORDER BY at DESC LIMIT 8`);
      return rows.map(r => ({ type: r.type, text: String(r.text), at: new Date(r.at).toISOString() }));
    }),
  ]);

  return { generatedAt: new Date().toISOString(), users, artworks, engagement, collections, rooms, auctions, topArtworks, recentActivity };
}
