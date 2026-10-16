import { buildSlots, MAX_SLOTS, ROOM_W, ROOM_D } from '../../frontend/src/lib/gallery/slots';
import { fitInside } from '../../frontend/src/lib/gallery/fit';
import { textureSource, LEVEL_PX } from '../../frontend/src/lib/gallery/imageUrls';

describe('buildSlots', () => {
  it.each([0, 1, 8, 9, 10, 24, 32, 36, 40, 72])('для %i картин возвращает столько же мест', n => {
    expect(buildSlots(n)).toHaveLength(n);
  });

  it('больше вместимости не размещает и не падает (раньше зал на 33+ ронял страницу)', () => {
    expect(buildSlots(500)).toHaveLength(MAX_SLOTS);
    expect(buildSlots(-3)).toHaveLength(0);
    expect(buildSlots(NaN as unknown as number)).toHaveLength(0);
  });

  it('все места уникальны и внутри зала', () => {
    const slots = buildSlots(MAX_SLOTS);
    const keys = new Set(slots.map(s => `${s.x.toFixed(2)}|${s.y}|${s.z.toFixed(2)}`));
    expect(keys.size).toBe(MAX_SLOTS);
    for (const s of slots) {
      expect(Math.abs(s.x)).toBeLessThanOrEqual(ROOM_W / 2);
      expect(Math.abs(s.z)).toBeLessThanOrEqual(ROOM_D / 2);
      expect(Number.isFinite(s.rotY)).toBe(true);
    }
  });

  it('картины повёрнуты внутрь зала', () => {
    for (const s of buildSlots(MAX_SLOTS)) {
      // нормаль плоскости (0,0,1), повёрнутая на rotY вокруг Y: (sin, 0, cos)
      const nx = Math.sin(s.rotY), nz = Math.cos(s.rotY);
      // направление «от стены к центру»
      const toCenterX = -Math.sign(s.x) * (Math.abs(s.x) > Math.abs(s.z) ? 1 : 0);
      const toCenterZ = -Math.sign(s.z) * (Math.abs(s.z) >= Math.abs(s.x) ? 1 : 0);
      expect(nx * toCenterX + nz * toCenterZ).toBeGreaterThan(0.99);
    }
  });

  it('малое число картин висит на нижнем ряду и центрировано', () => {
    const slots = buildSlots(8);
    expect(new Set(slots.map(s => s.y)).size).toBe(1);
    const xs = slots.map(s => s.x);
    expect(Math.min(...xs)).toBeCloseTo(-Math.max(...xs));
  });
});

describe('fitInside', () => {
  it('сохраняет пропорции', () => {
    expect(fitInside(2, 2)).toEqual({ w: 2, h: 1 });
    expect(fitInside(0.5, 2)).toEqual({ w: 1, h: 2 });
    expect(fitInside(1, 2)).toEqual({ w: 2, h: 2 });
  });
  it('некорректная пропорция → квадрат', () => {
    for (const a of [0, -1, NaN, Infinity]) expect(fitInside(a, 3)).toEqual({ w: 3, h: 3 });
  });
});

describe('textureSource', () => {
  it('локальные загрузки идут через миниатюры нужного размера', () => {
    expect(textureSource('/uploads/artwork-1.jpg', 'thumb')).toEqual({ url: '/uploads/t/256/artwork-1.jpg', clientMaxSize: null });
    expect(textureSource('/uploads/artwork-1.jpg', 'detail').url).toBe('/uploads/t/1024/artwork-1.jpg');
    expect(textureSource('/uploads/artwork-1.jpg', 'zoom').url).toBe('/uploads/t/2048/artwork-1.jpg');
  });
  it('внешние URL остаются как есть и уменьшаются на клиенте', () => {
    expect(textureSource('https://cdn.example/x.jpg', 'detail')).toEqual({ url: 'https://cdn.example/x.jpg', clientMaxSize: LEVEL_PX.detail });
  });
  it('подозрительные пути не превращаются в миниатюры', () => {
    for (const u of ['/uploads/../secret.jpg', '/uploads/a/b.jpg', '/uploads/.env']) {
      expect(textureSource(u, 'thumb').url).toBe(u);
    }
  });
});
