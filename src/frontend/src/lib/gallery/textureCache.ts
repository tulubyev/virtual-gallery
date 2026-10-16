// lib/gallery/textureCache.ts
// Многоуровневый кэш текстур с лимитом видеопамяти: миниатюры живут всегда, детальные уровни —
// только для ближайших картин, лишние освобождаются. Не зависит от three (загрузка внедряется).
import type { TexLevel } from './imageUrls';

export interface TextureCacheConfig<T> {
  /** Сколько текстур каждого уровня держим одновременно. */
  caps: Record<TexLevel, number>;
  maxConcurrent: number;
  load(id: string, level: TexLevel): Promise<T>;
  dispose(texture: T): void;
  onReady(id: string, level: TexLevel, texture: T): void;
  onEvict(id: string, level: TexLevel): void;
  /** Через сколько мс повторять загрузку, которая завершилась ошибкой. */
  retryAfterMs?: number;
  now?: () => number;
}

const LEVELS: readonly TexLevel[] = ['thumb', 'detail', 'zoom'];

interface Entry<T> { texture: T; lastWanted: number }

export class TieredTextureCache<T> {
  private resident: Record<TexLevel, Map<string, Entry<T>>> = { thumb: new Map(), detail: new Map(), zoom: new Map() };
  private wanted: Record<TexLevel, string[]> = { thumb: [], detail: [], zoom: [] };
  private inflight = new Set<string>();
  private failedAt = new Map<string, number>();
  private running = 0;
  private disposed = false;

  constructor(private cfg: TextureCacheConfig<T>) {}

  private now(): number { return (this.cfg.now ?? Date.now)(); }
  private key(id: string, level: TexLevel): string { return `${level}:${id}`; }

  /** Какие картины нужны на этом уровне (по убыванию важности). Вызывать можно часто. */
  setWanted(level: TexLevel, ids: readonly string[]): void {
    if (this.disposed) return;
    const cap = this.cfg.caps[level];
    const list = ids.slice(0, Math.max(0, cap));
    this.wanted[level] = list;
    const t = this.now();
    const wantedSet = new Set(list);
    const store = this.resident[level];

    for (const id of list) {
      const e = store.get(id);
      if (e) e.lastWanted = t;
    }

    // Освобождаем лишнее: сначала невостребованные, самые давние
    const pending = list.filter(id => !store.has(id)).length;
    let overflow = store.size + pending - cap;
    if (overflow > 0) {
      const victims = [...store.entries()]
        .filter(([id]) => !wantedSet.has(id))
        .sort((a, b) => a[1].lastWanted - b[1].lastWanted);
      for (const [id, entry] of victims) {
        if (overflow <= 0) break;
        store.delete(id);
        this.cfg.dispose(entry.texture);
        this.cfg.onEvict(id, level);
        overflow--;
      }
    }
    this.pump();
  }

  private nextToLoad(): { id: string; level: TexLevel } | null {
    const t = this.now();
    const retry = this.cfg.retryAfterMs ?? 30000;
    for (const level of LEVELS) {
      for (const id of this.wanted[level]) {
        const k = this.key(id, level);
        if (this.resident[level].has(id) || this.inflight.has(k)) continue;
        const failed = this.failedAt.get(k);
        if (failed !== undefined && t - failed < retry) continue;
        return { id, level };
      }
    }
    return null;
  }

  private pump(): void {
    while (!this.disposed && this.running < this.cfg.maxConcurrent) {
      const next = this.nextToLoad();
      if (!next) return;
      const { id, level } = next;
      const k = this.key(id, level);
      this.inflight.add(k);
      this.running++;
      this.cfg.load(id, level).then(
        texture => {
          this.running--; this.inflight.delete(k);
          this.accept(id, level, texture);
          this.pump();
        },
        () => {
          this.running--; this.inflight.delete(k);
          this.failedAt.set(k, this.now());
          this.pump();
        },
      );
    }
  }

  private accept(id: string, level: TexLevel, texture: T): void {
    const store = this.resident[level];
    const stillWanted = this.wanted[level].includes(id);
    // Место в лимите занимают и уже загруженные, и ещё ожидаемые текстуры
    const pendingWanted = this.wanted[level].filter(w => !store.has(w)).length;
    if (this.disposed || (!stillWanted && store.size + pendingWanted >= this.cfg.caps[level])) {
      this.cfg.dispose(texture);
      return;
    }
    store.set(id, { texture, lastWanted: this.now() });
    this.cfg.onReady(id, level, texture);
  }

  has(id: string, level: TexLevel): boolean { return this.resident[level].has(id); }
  count(level: TexLevel): number { return this.resident[level].size; }

  dispose(): void {
    this.disposed = true;
    for (const level of LEVELS) {
      for (const { texture } of this.resident[level].values()) this.cfg.dispose(texture);
      this.resident[level].clear();
      this.wanted[level] = [];
    }
  }
}
