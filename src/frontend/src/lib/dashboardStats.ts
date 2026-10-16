// lib/dashboardStats.ts — сводка для дашбордов (GET /api/stats/overview) и форматирование.
// Нет данных → «—»: цифры не выдумываем.
import { useEffect, useState, useCallback } from 'react';
import { fetchWithAuth } from '../services/api';

export interface Trend { total: number; last30: number; prev30: number }

export interface Overview {
  generatedAt: string;
  users: (Trend & { byRole: Record<string, number> }) | null;
  artworks: (Trend & { today: number; byStatus: Record<string, number> | null }) | null;
  engagement: { views: Trend; likes: Trend } | null;
  collections: { total: number } | null;
  rooms: { total: number; capacity: number } | null;
  auctions: { active: number; scheduled: number; lots: number; bids: number; volume: number } | null;
  topArtworks: Array<{ id: number; title: string; artist: string; views: number; likes: number }> | null;
  recentActivity: Array<{ type: 'artwork' | 'user' | 'bid'; text: string; at: string }> | null;
}

export const DASH = '—';

/** 1234 → «1 234», 1 200 000 → «1,2 млн»; null → «—». */
export function fmt(n: number | null | undefined): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return DASH;
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.', ',') + ' млн';
  return Math.round(n).toLocaleString('ru-RU');
}

/** Подпись изменения за 30 дней относительно предыдущих 30: «+18% за 30 дней», «+5 за 30 дней», «нет данных». */
export function changeText(t: Trend | null | undefined): { text: string; trend: 'up' | 'down' | 'flat' } {
  if (!t) return { text: 'нет данных', trend: 'flat' };
  const { last30, prev30 } = t;
  if (last30 === 0 && prev30 === 0) return { text: 'за 30 дней без изменений', trend: 'flat' };
  if (prev30 === 0) return { text: `+${fmt(last30)} за 30 дней`, trend: 'up' };
  const pct = Math.round(((last30 - prev30) / prev30) * 100);
  return { text: `${pct > 0 ? '+' : ''}${pct}% за 30 дней`, trend: pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat' };
}

/** «5 минут назад», «вчера», «12.03.2026». */
export function ago(iso: string, now = Date.now()): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return DASH;
  const min = Math.floor((now - t) / 60000);
  if (min < 1) return 'только что';
  if (min < 60) return `${min} мин назад`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} ч назад`;
  const d = Math.floor(h / 24);
  if (d === 1) return 'вчера';
  if (d < 14) return `${d} дн назад`;
  return new Date(t).toLocaleDateString('ru-RU');
}

export function useOverview(): { data: Overview | null; loading: boolean; error: string | null; reload: () => void } {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const reload = useCallback(() => setTick(t => t + 1), []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchWithAuth('/api/stats/overview')
      .then(async r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json() as Promise<Overview>; })
      .then(d => { if (alive) { setData(d); setError(null); } })
      .catch(e => { if (alive) setError(e instanceof Error ? e.message : 'Ошибка'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [tick]);

  return { data, loading, error, reload };
}
