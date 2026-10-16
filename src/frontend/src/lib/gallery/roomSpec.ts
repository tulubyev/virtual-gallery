// lib/gallery/roomSpec.ts
// Модель зала и всё, что из неё следует: проверка данных, раскладка картин по реальным стенам,
// двери в связанные залы, освещение по теме. Без React/three — используется и сервером, и клиентом.

// ─── Модель ──────────────────────────────────────────────────────────────────
export const THEMES = ['classic', 'modern', 'minimal', 'dark'] as const;
export type RoomTheme = (typeof THEMES)[number];

export const LIMITS = {
  dimMin: 3, dimMax: 50,          // ширина и глубина, м
  heightMin: 3, heightMax: 15,    // высота, м
  maxRooms: 60,
  maxConnections: 6,
  maxSlots: 120,
} as const;

export interface Assignment {
  id: string | number;
  title: string;
  artist: string;
  image_url?: string;
  thumbnail_url?: string;
  style?: string | null;
}

export interface RoomSpec {
  id: string;
  name: string;
  theme: RoomTheme;
  width: number;
  depth: number;
  height: number;
  wallColor: string;
  /** 0–100: «яркость» освещения; 70 — штатная. */
  lighting: number;
  /** Сколько мест под картины. */
  slots: number;
  /** Идентификаторы залов, в которые ведут двери. */
  connections: string[];
  /** Ключи `slot_1…slot_N` (с единицы, как в редакторе куратора). */
  artworkAssignments: Record<string, Assignment | null>;
}

export interface GalleryConfig {
  rooms: RoomSpec[];
  currentRoom: string;
}

export const DEFAULT_ROOM: Omit<RoomSpec, 'id' | 'name'> = {
  theme: 'classic', width: 15, depth: 15, height: 4, wallColor: '#f5f0e6', lighting: 70, slots: 4,
  connections: [], artworkAssignments: {},
};

// ─── Проверка и нормализация ─────────────────────────────────────────────────
const clamp = (v: unknown, min: number, max: number, fallback: number): number => {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};
const str = (v: unknown, max: number): string => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max) : '');

export const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/;
const HEX = /^#[0-9a-fA-F]{6}$/;

/** Картинка: путь на нашем сервере или http(s)-адрес; никаких javascript:, data: и т. п. */
export function isSafeImageUrl(u: unknown): u is string {
  if (typeof u !== 'string' || u.length === 0 || u.length > 2048 || /[\u0000-\u001f\u007f\s]/.test(u)) return false;
  if (u.startsWith('/')) return !u.startsWith('//') && !u.includes('..');
  return /^https?:\/\/[^/\s]+/i.test(u);
}

function normalizeAssignment(raw: unknown): Assignment | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const id = typeof r.id === 'number' && Number.isFinite(r.id) ? r.id : str(r.id, 64);
  if (id === '' || id === undefined) return null;
  const out: Assignment = { id, title: str(r.title, 200) || 'Без названия', artist: str(r.artist, 200) };
  if (isSafeImageUrl(r.image_url)) out.image_url = r.image_url;
  if (isSafeImageUrl(r.thumbnail_url)) out.thumbnail_url = r.thumbnail_url;
  if (typeof r.style === 'string') out.style = str(r.style, 100);
  return out;
}

export function normalizeRoom(raw: unknown, index = 0): RoomSpec {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const id = typeof r.id === 'string' && ID_PATTERN.test(r.id) ? r.id : `room_${index + 1}`;
  const base: RoomSpec = {
    id,
    name: str(r.name, 120) || `Зал ${index + 1}`,
    theme: (THEMES as readonly string[]).includes(r.theme as string) ? (r.theme as RoomTheme) : DEFAULT_ROOM.theme,
    width: clamp(r.width, LIMITS.dimMin, LIMITS.dimMax, DEFAULT_ROOM.width),
    depth: clamp(r.depth, LIMITS.dimMin, LIMITS.dimMax, DEFAULT_ROOM.depth),
    height: clamp(r.height, LIMITS.heightMin, LIMITS.heightMax, DEFAULT_ROOM.height),
    wallColor: typeof r.wallColor === 'string' && HEX.test(r.wallColor) ? r.wallColor : DEFAULT_ROOM.wallColor,
    lighting: Math.round(clamp(r.lighting, 0, 100, DEFAULT_ROOM.lighting)),
    slots: 1,
    connections: Array.isArray(r.connections)
      ? [...new Set((r.connections as unknown[]).filter((c): c is string => typeof c === 'string' && ID_PATTERN.test(c) && c !== id))].slice(0, LIMITS.maxConnections)
      : [],
    artworkAssignments: {},
  };

  // Число мест не больше вместимости зала; назначения — только на существующие места
  const capacity = roomLayout(base).capacity;
  base.slots = Math.round(clamp(r.slots, 1, Math.max(1, Math.min(capacity, LIMITS.maxSlots)), Math.min(DEFAULT_ROOM.slots, Math.max(1, capacity))));
  const src = (r.artworkAssignments && typeof r.artworkAssignments === 'object' ? r.artworkAssignments : {}) as Record<string, unknown>;
  for (const [key, value] of Object.entries(src)) {
    const m = /^slot_(\d+)$/.exec(key);
    if (!m) continue;
    const n = Number(m[1]);
    if (n < 1 || n > base.slots) continue;
    base.artworkAssignments[key] = normalizeAssignment(value);
  }
  return base;
}

export interface NormalizeResult { config: GalleryConfig; warnings: string[] }

/** Приводит любую конфигурацию к допустимому виду. Бросает Error только если это вообще не конфигурация. */
export function normalizeConfig(raw: unknown): NormalizeResult {
  if (!raw || typeof raw !== 'object' || !Array.isArray((raw as { rooms?: unknown }).rooms)) {
    throw new Error('Ожидается объект с массивом rooms');
  }
  const warnings: string[] = [];
  const input = (raw as { rooms: unknown[]; currentRoom?: unknown }).rooms;
  if (input.length > LIMITS.maxRooms) warnings.push(`Залов больше ${LIMITS.maxRooms} — лишние отброшены`);

  const rooms: RoomSpec[] = [];
  const seen = new Set<string>();
  input.slice(0, LIMITS.maxRooms).forEach((r, i) => {
    const room = normalizeRoom(r, i);
    let id = room.id;
    for (let n = 2; seen.has(id); n++) id = `${room.id}_${n}`;
    if (id !== room.id) warnings.push(`Повторяющийся id зала «${room.id}» заменён на «${id}»`);
    seen.add(id);
    rooms.push({ ...room, id });
  });

  // Двери — только в существующие залы
  const ids = new Set(rooms.map(r => r.id));
  for (const room of rooms) {
    const kept = room.connections.filter(c => ids.has(c) && c !== room.id);
    if (kept.length !== room.connections.length) warnings.push(`Зал «${room.name}»: связи с несуществующими залами удалены`);
    room.connections = kept;
    // Двери занимают место на стене: пересчитываем число мест
    const capacity = roomLayout(room).capacity;
    if (room.slots > capacity) {
      warnings.push(`Зал «${room.name}»: мест ${room.slots}, вмещается ${capacity}`);
      room.slots = Math.max(1, capacity);
      for (const key of Object.keys(room.artworkAssignments)) {
        if (Number(key.slice(5)) > room.slots) delete room.artworkAssignments[key];
      }
    }
  }

  const cur = (raw as { currentRoom?: unknown }).currentRoom;
  const currentRoom = typeof cur === 'string' && ids.has(cur) ? cur : (rooms[0]?.id ?? '');
  return { config: { rooms, currentRoom }, warnings };
}

// ─── Раскладка ───────────────────────────────────────────────────────────────
export type WallName = 'back' | 'left' | 'right' | 'front';

export interface Placement { x: number; y: number; z: number; rotY: number; wall: WallName; row: 0 | 1 }
export interface Door { toId: string; x: number; z: number; width: number; height: number }

export interface RoomLayout {
  artSize: number;
  /** Все возможные места в порядке заполнения (сначала нижний ряд всех стен, затем верхний). */
  placements: Placement[];
  capacity: number;
  doors: Door[];
  /** Допустимая область перемещения камеры: |x| ≤ bounds.x, |z| ≤ bounds.z. */
  bounds: { x: number; z: number };
  eyeY: number;
}

export const EYE_Y = 1.6;
const HANG_OFFSET = 0.6;     // отступ картины от стены
const WALL_MARGIN = 1.5;     // отступ крайней картины от угла
const GAP = 1.3;             // зазор между картинами
const DOOR_W = 1.8;
const DOOR_CLEAR = 0.8;      // свободное место между дверью и ближайшей картиной

/** Размер картины зависит от высоты зала (в низком зале — меньше) и не превышает 70 % меньшей стороны. */
export function artSizeFor(width: number, depth: number, height: number): number {
  const byHeight = Math.min(2.2, Math.max(0.9, 0.38 * height + 0.3));
  return Math.max(0.6, Math.min(byHeight, 0.7 * Math.min(width, depth)));
}

export function roomLayout(spec: Pick<RoomSpec, 'width' | 'depth' | 'height' | 'connections'>): RoomLayout {
  const { width: W, depth: D, height: H } = spec;
  const art = artSizeFor(W, D, H);
  const step = art + GAP;

  // Двери — на передней стене, равномерно
  const doorIds = spec.connections.slice(0, LIMITS.maxConnections);
  const doors: Door[] = doorIds.map((toId, i) => ({
    toId, x: ((i + 1) / (doorIds.length + 1) - 0.5) * W, z: D / 2, width: DOOR_W, height: Math.min(2.6, H - 0.6),
  }));

  const rowY0 = Math.min(2.0, H * 0.5);
  const rowY1 = rowY0 + art + 0.8;
  const hasUpper = rowY1 + art / 2 <= H - 0.4;
  const rows: Array<[0 | 1, number]> = hasUpper ? [[0, rowY0], [1, rowY1]] : [[0, rowY0]];

  const wallLen: Record<WallName, number> = { back: W, left: D, right: D, front: W };
  const order: WallName[] = ['back', 'left', 'right', 'front'];
  const placements: Placement[] = [];

  for (const [row, y] of rows) {
    for (const wall of order) {
      const usable = wallLen[wall] - 2 * WALL_MARGIN;
      const n = usable < 0 ? 1 : Math.floor(usable / step) + 1;
      for (let i = 0; i < n; i++) {
        const along = (i - (n - 1) / 2) * step;
        // На передней стене держим место для дверей
        if (wall === 'front' && doors.some(d => Math.abs(along - d.x) < d.width / 2 + art / 2 + DOOR_CLEAR)) continue;
        const hw = W / 2 - HANG_OFFSET, hd = D / 2 - HANG_OFFSET;
        placements.push(
          wall === 'back' ? { x: along, y, z: -hd, rotY: 0, wall, row }
          : wall === 'front' ? { x: along, y, z: hd, rotY: Math.PI, wall, row }
          : wall === 'left' ? { x: -hw, y, z: along, rotY: Math.PI / 2, wall, row }
          : { x: hw, y, z: along, rotY: -Math.PI / 2, wall, row },
        );
      }
    }
  }

  return {
    artSize: art,
    placements,
    capacity: Math.min(placements.length, LIMITS.maxSlots),
    doors,
    bounds: { x: Math.max(0.5, W / 2 - 0.9), z: Math.max(0.5, D / 2 - 0.9) },
    eyeY: EYE_Y,
  };
}

/** Где появляется посетитель: у двери, через которую пришёл, иначе у передней стены по центру. */
export function spawnPoint(layout: RoomLayout, depth: number, fromRoomId?: string | null): { x: number; z: number; yaw: number } {
  const door = fromRoomId ? layout.doors.find(d => d.toId === fromRoomId) : undefined;
  // В большом зале — в паре метров от двери; в тесном — ближе к центру, но не на пороге
  // (дверь срабатывает у самой стены, иначе посетителя сразу выкинуло бы обратно).
  const z = Math.min(layout.bounds.z - 0.4, Math.max(depth / 2 - 2.2, depth * 0.1));
  return { x: door ? door.x : 0, z, yaw: 0 };
}

/** Картины по номерам мест: slot_1 → место 0 и т. д.; пустые места пропускаются. */
export function placedArtworks(spec: RoomSpec, layout: RoomLayout): Array<{ slot: number; assignment: Assignment; placement: Placement }> {
  const out: Array<{ slot: number; assignment: Assignment; placement: Placement }> = [];
  for (let i = 0; i < Math.min(spec.slots, layout.capacity); i++) {
    const a = spec.artworkAssignments[`slot_${i + 1}`];
    if (a) out.push({ slot: i + 1, assignment: a, placement: layout.placements[i] });
  }
  return out;
}

// ─── Оформление и освещение ──────────────────────────────────────────────────
export interface ThemeStyle {
  floor: string; floorGrid: string | null; ceiling: string; light: string;
  frame: string; frameMetal: number; columns: boolean; lightBoost: number;
}

export const THEME_STYLE: Record<RoomTheme, ThemeStyle> = {
  classic: { floor: '#3a322b', floorGrid: '#4a4036', ceiling: '#2a2a34', light: '#ffe2b8', frame: '#6b4a26', frameMetal: 0.2, columns: true, lightBoost: 1 },
  modern:  { floor: '#6c6c72', floorGrid: null, ceiling: '#e8e8ec', light: '#f4f8ff', frame: '#1c1c1f', frameMetal: 0.5, columns: false, lightBoost: 1 },
  minimal: { floor: '#cfcdc8', floorGrid: null, ceiling: '#f2f2f2', light: '#ffffff', frame: '#f0f0f0', frameMetal: 0.0, columns: false, lightBoost: 0.95 },
  dark:    { floor: '#1c1a16', floorGrid: '#2a2820', ceiling: '#101014', light: '#ffd9a0', frame: '#2b2118', frameMetal: 0.4, columns: true, lightBoost: 1.25 },
};

const luminance = (hex: string): number => {
  const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

export interface LightingPlan {
  ambient: number; hemisphere: number; lightColor: string;
  lights: Array<{ x: number; y: number; z: number; intensity: number }>;
}

/**
 * Свет в физических единицах three (≥ r155). Базовая яркость подобрана для серых стен при lighting = 70;
 * светлые стены притушаются, тёмные — подсвечиваются, чтобы зал не «выгорал» и не чернел.
 */
export function lightingPlan(spec: Pick<RoomSpec, 'theme' | 'width' | 'depth' | 'height' | 'wallColor' | 'lighting'>): LightingPlan {
  const style = THEME_STYLE[spec.theme];
  const f = (spec.lighting / 70) * style.lightBoost;
  const wall = Math.min(0.9, Math.max(0.03, luminance(spec.wallColor)));
  const k = Math.min(1.6, Math.max(0.45, (0.27 / wall) ** 0.55)); // компенсация яркости стен
  const { width: W, depth: D, height: H } = spec;

  const rows = Math.min(6, Math.max(1, Math.ceil(D / 11)));
  const cols = W > 22 ? 2 : 1;
  const lights: LightingPlan['lights'] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      lights.push({
        x: cols === 1 ? 0 : (c === 0 ? -1 : 1) * W / 4,
        y: H - 0.6,
        z: ((r + 0.5) / rows - 0.5) * D,
        // освещённость пола ≈ постоянна при любой высоте; суммарный свет не растёт с числом ламп
        intensity: 1.64 * f * k * (H - 0.6) ** 2 * (3 / (rows * cols)),
      });
    }
  }
  return { ambient: 1.6 * f * k, hemisphere: 1.1 * f * k, lightColor: style.light, lights };
}
