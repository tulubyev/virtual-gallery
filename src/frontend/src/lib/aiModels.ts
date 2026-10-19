// lib/aiModels.ts — выбор модели ИИ по задачам в админ-панели (GET/PUT/DELETE /api/admin/ai-models).
// Цены и возможности моделей приходят с сервера (живой каталог routerai.ru); здесь — разбор и подсчёты.
import { fetchWithAuth } from '../services/api';

export type Mode = 'global' | 'ru-only';
export type Label = 'best' | 'cheap' | 'top';

export interface TaskRow {
  task: string;
  title: string;
  description: string;
  unit: string;
  tokens: { input: number; output: number };
  needs_vision: boolean;
  default_volume: number;
  default_model: string;
  current_model: string;
  source: 'env' | 'admin';
  updated_by: string | null;
  updated_at: string | null;
  current_unit_cost: number | null;
  current_known: boolean;
}

export interface CatalogModel {
  id: string;
  label: string;
  vendor: string;
  tier: 'economy' | 'balanced' | 'top';
  ru_hosted: boolean;
  flex: boolean;
  vision: boolean;
  json_schema: boolean;
  context: number | null;
  price_in: number | null;
  price_out: number | null;
  price_source: 'live' | 'snapshot' | 'ru' | 'unknown';
  note: string;
  cautions: Record<string, string>;
  labels: Record<string, Label[]>;
  cost: Record<string, number | null>;
}

export interface Snapshot {
  llm_mode: Mode;
  mode: Mode;
  tasks: TaskRow[];
  catalog: CatalogModel[];
  catalog_meta: { price_source: 'live' | 'snapshot'; updated_at: number | null; snapshot_date: string };
  provider_only: string | null;
  background_tier: string | null;
  warnings?: string[];
}

export interface HistoryItem {
  task: string;
  mode: Mode;
  old_model: string | null;
  new_model: string | null;
  actor: string | null;
  changed_at: string;
}

export const DASH = '—';

export const LABEL_TEXT: Record<Label, string> = { best: 'Рекомендуем', cheap: 'Дёшево', top: 'Максимум качества' };

/** ₽ с разумной точностью: 0,023 ₽ / 1,35 ₽ / 320 ₽ / 12 800 ₽; нет цены — «—». */
export function rub(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return DASH;
  const abs = Math.abs(value);
  const digits = abs >= 100 ? 0 : abs >= 10 ? 1 : abs >= 1 ? 2 : 3;
  return value.toLocaleString('ru-RU', { minimumFractionDigits: digits, maximumFractionDigits: digits }) + ' ₽';
}

/** Стоимость за месяц: цена за единицу × объём; нет цены — null. */
export function monthlyCost(unitCost: number | null | undefined, volume: number): number | null {
  if (unitCost === null || unitCost === undefined || !Number.isFinite(unitCost)) return null;
  return unitCost * Math.max(0, volume);
}

/** Объём из поля ввода: целое ≥ 0, мусор → 0. */
export function parseVolume(text: string): number {
  const n = Math.floor(Number(String(text).replace(/\s/g, '').replace(',', '.')));
  return Number.isFinite(n) && n > 0 ? Math.min(n, 100_000_000) : 0;
}

/** Почему модель нельзя назначить на задачу (null — можно). */
export function unsuitableReason(model: CatalogModel, task: TaskRow): string | null {
  if (task.needs_vision && !model.vision) return 'не принимает изображения';
  return null;
}

/** Модели для задачи: сначала с метками рекомендаций, затем по возрастанию цены; без цены — в конце. */
export function modelsForTask(catalog: CatalogModel[], task: string): CatalogModel[] {
  const rank = (m: CatalogModel) => (m.labels[task]?.length ? 0 : 1);
  const cost = (m: CatalogModel) => m.cost[task] ?? Number.POSITIVE_INFINITY;
  return [...catalog].sort((a, b) => rank(a) - rank(b) || cost(a) - cost(b) || a.label.localeCompare(b.label, 'ru'));
}

/** Предупреждения о выборе, известные заранее (до сохранения): по задаче и общие. */
export function previewWarnings(model: CatalogModel | undefined, task: string): string[] {
  if (!model) return [];
  return [model.cautions[task], model.cautions['*']].filter((w): w is string => !!w);
}

export interface Plan {
  task: string;
  model: string;           // выбранная (несохранённая или действующая) модель
  volume: number;
}

/** Расходы за месяц по выбранным моделям; unknown — число задач, по которым цену определить нельзя. */
export function planTotal(plans: Plan[], catalog: CatalogModel[]): { total: number; unknown: number } {
  let total = 0;
  let unknown = 0;
  for (const plan of plans) {
    const cost = monthlyCost(catalog.find(m => m.id === plan.model)?.cost[plan.task], plan.volume);
    if (cost === null) unknown += 1;
    else total += cost;
  }
  return { total, unknown };
}

export function priceNote(model: CatalogModel): string | null {
  if (model.price_source === 'snapshot') return 'цена из снимка (каталог недоступен)';
  if (model.price_source === 'ru') return 'цена у российского провайдера';
  if (model.price_source === 'unknown') return 'цена у российского провайдера не публикуется';
  return null;
}

// ── запросы ─────────────────────────────────────────────────────────────────────────────

async function call<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetchWithAuth(url, init);
  let body: any = null;
  try { body = await res.json(); } catch { /* пустой ответ */ }
  if (!res.ok) throw new Error(body?.error || `Ошибка ${res.status}`);
  return body as T;
}

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const loadAiModels = (mode: Mode) => call<Snapshot>(`/api/admin/ai-models?mode=${mode}`);
export const saveAiModel = (task: string, model: string, mode: Mode) =>
  call<Snapshot>(`/api/admin/ai-models/${task}`, { method: 'PUT', headers: JSON_HEADERS, body: JSON.stringify({ model, mode }) });
export const resetAiModel = (task: string, mode: Mode) =>
  call<Snapshot>(`/api/admin/ai-models/${task}?mode=${mode}`, { method: 'DELETE' });
export const refreshAiCatalog = (mode: Mode) => call<Snapshot>(`/api/admin/ai-models/refresh-catalog?mode=${mode}`, { method: 'POST' });
export const loadAiModelsHistory = () => call<{ items: HistoryItem[] }>('/api/admin/ai-models/history?limit=30');
