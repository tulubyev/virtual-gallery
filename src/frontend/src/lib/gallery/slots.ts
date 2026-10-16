// lib/gallery/slots.ts
// Размещение картин по стенам зала. Без React/three — чтобы покрыть тестами.

export const ROOM_W = 44;
export const ROOM_D = 44;
export const WALL_H = 9;
export const HANG_OFFSET = 0.6;            // отступ картины от стены
export const SLOT_STEP = 4;                // шаг между картинами вдоль стены
export const ROW_Y = [2.0, 4.8] as const;  // нижний (центр на уровне глаз+) и верхний ряд
export const SLOTS_PER_WALL_ROW = 9;
export const MAX_SLOTS = SLOTS_PER_WALL_ROW * 4 * ROW_Y.length; // 72

export interface WallSlot { x: number; y: number; z: number; rotY: number }

type WallName = 'back' | 'left' | 'right' | 'front';

// Порядок заполнения: сначала нижние ряды всех стен, потом верхние
const WALL_ORDER: readonly WallName[] = ['back', 'left', 'right', 'front'];

function wallPoint(wall: WallName, along: number, y: number): WallSlot {
  const hw = ROOM_W / 2 - HANG_OFFSET;
  const hd = ROOM_D / 2 - HANG_OFFSET;
  switch (wall) {
    case 'back':  return { x: along, y, z: -hd, rotY: 0 };
    case 'front': return { x: along, y, z: hd,  rotY: Math.PI };
    case 'left':  return { x: -hw,   y, z: along, rotY: Math.PI / 2 };
    case 'right': return { x: hw,    y, z: along, rotY: -Math.PI / 2 };
  }
}

/** Позиции для `count` картин; картины на стене центрируются. Больше MAX_SLOTS не размещается. */
export function buildSlots(count: number): WallSlot[] {
  const total = Number.isFinite(count) ? Math.max(0, Math.min(Math.floor(count), MAX_SLOTS)) : 0;
  const slots: WallSlot[] = [];
  let left = total;

  for (const y of ROW_Y) {
    for (const wall of WALL_ORDER) {
      if (left <= 0) return slots;
      const k = Math.min(left, SLOTS_PER_WALL_ROW);
      for (let i = 0; i < k; i++) {
        slots.push(wallPoint(wall, (i - (k - 1) / 2) * SLOT_STEP, y));
      }
      left -= k;
    }
  }
  return slots;
}
