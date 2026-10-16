import { normalizeRoom, normalizeConfig, roomLayout, spawnPoint, placedArtworks, lightingPlan, artSizeFor, isSafeImageUrl, LIMITS, THEMES } from '../../frontend/src/lib/gallery/roomSpec';

const room = (o: Record<string, unknown> = {}) => ({ id: 'r1', name: 'Зал', theme: 'classic', width: 20, depth: 20, height: 5, wallColor: '#f5f0e6', lighting: 70, slots: 4, connections: [], artworkAssignments: {}, ...o });

describe('normalizeRoom', () => {
  it('приводит мусор к допустимым значениям', () => {
    const r = normalizeRoom({ id: '../x', name: 5, theme: 'gothic', width: 9999, depth: -4, height: 'abc', wallColor: 'red', lighting: 500, slots: 'много', connections: 'x' }, 2);
    expect(r).toMatchObject({ id: 'room_3', name: 'Зал 3', theme: 'classic', width: LIMITS.dimMax, depth: LIMITS.dimMin, height: 4, wallColor: '#f5f0e6', lighting: 100 });
    expect(r.connections).toEqual([]);
    expect(r.slots).toBeGreaterThanOrEqual(1);
  });
  it('не допускает javascript:/data: в адресах картин и чужие поля', () => {
    const r = normalizeRoom(room({ artworkAssignments: {
      slot_1: { id: 1, title: 'A', artist: 'B', image_url: 'javascript:alert(1)', thumbnail_url: 'data:text/html,x', evil: '<script>' },
      slot_2: { id: 2, title: 'C', artist: 'D', image_url: '/uploads/a.jpg', thumbnail_url: 'https://cdn.example/t.jpg' },
      slot_9: { id: 9, title: 'вне зала', artist: '' },
      bogus: { id: 3, title: 'x', artist: 'y' },
      slot_3: 'строка',
    } }));
    expect(r.artworkAssignments.slot_1).toEqual({ id: 1, title: 'A', artist: 'B' });
    expect(r.artworkAssignments.slot_2).toMatchObject({ image_url: '/uploads/a.jpg', thumbnail_url: 'https://cdn.example/t.jpg' });
    expect(Object.keys(r.artworkAssignments).sort()).toEqual(['slot_1', 'slot_2', 'slot_3']);
    expect(r.artworkAssignments.slot_3).toBeNull();
  });
  it('isSafeImageUrl', () => {
    for (const ok of ['/uploads/a.jpg', 'https://a.b/c.jpg', 'http://a.b/c']) expect(isSafeImageUrl(ok)).toBe(true);
    for (const bad of ['', '//evil.com/x', '/../etc/passwd', 'javascript:alert(1)', 'data:image/png;base64,AA', 'ftp://x/y', 'https://a b', 'https:///x', 5, null]) expect(isSafeImageUrl(bad)).toBe(false);
  });
});

describe('normalizeConfig', () => {
  it('не конфигурация → ошибка', () => {
    for (const bad of [null, 5, 'x', {}, { rooms: 'x' }]) expect(() => normalizeConfig(bad)).toThrow();
  });
  it('повторяющиеся id переименовываются, связи только с существующими залами', () => {
    const { config, warnings } = normalizeConfig({ rooms: [room({ id: 'a', connections: ['b', 'zzz', 'a'] }), room({ id: 'a' }), room({ id: 'b' })], currentRoom: 'nope' });
    expect(config.rooms.map(r => r.id)).toEqual(['a', 'a_2', 'b']);
    expect(config.rooms[0].connections).toEqual(['b']);
    expect(config.currentRoom).toBe('a');
    expect(warnings.length).toBeGreaterThan(0);
  });
  it('число мест не больше вместимости, лишние назначения удаляются', () => {
    const { config } = normalizeConfig({ rooms: [room({ width: 3, depth: 3, height: 3, slots: 50, artworkAssignments: { slot_1: { id: 1, title: 'a', artist: 'b' }, slot_30: { id: 2, title: 'c', artist: 'd' } } })] });
    const r = config.rooms[0];
    expect(r.slots).toBe(roomLayout(r).capacity);
    expect(r.artworkAssignments.slot_30).toBeUndefined();
  });
  it('ограничивает число залов', () => {
    const { config, warnings } = normalizeConfig({ rooms: Array.from({ length: 80 }, (_, i) => room({ id: `r${i}` })) });
    expect(config.rooms).toHaveLength(LIMITS.maxRooms);
    expect(warnings.join()).toMatch(/Залов больше/);
  });
  it('идемпотентна', () => {
    const once = normalizeConfig({ rooms: [room({ connections: ['b'] }), room({ id: 'b', connections: ['r1'] })] }).config;
    expect(normalizeConfig(once).config).toEqual(once);
  });
});

describe('roomLayout', () => {
  it('вместимость растёт с размерами зала', () => {
    const small = roomLayout({ width: 6, depth: 6, height: 3, connections: [] }).capacity;
    const mid = roomLayout({ width: 15, depth: 15, height: 4, connections: [] }).capacity;
    const big = roomLayout({ width: 44, depth: 44, height: 9, connections: [] }).capacity;
    expect(small).toBeGreaterThanOrEqual(1);
    expect(small).toBeLessThan(mid);
    expect(mid).toBeLessThan(big);
  });
  it('в низком зале нет верхнего ряда, в высоком есть', () => {
    expect(new Set(roomLayout({ width: 20, depth: 20, height: 4, connections: [] }).placements.map(p => p.row))).toEqual(new Set([0]));
    expect(new Set(roomLayout({ width: 20, depth: 20, height: 9, connections: [] }).placements.map(p => p.row))).toEqual(new Set([0, 1]));
  });
  it.each([[3, 3, 3], [6, 20, 4], [15, 15, 4], [50, 50, 15], [3, 50, 15], [44, 44, 9]])('зал %i×%i×%i: все места внутри стен, не пересекаются, высота допустима', (W, D, H) => {
    const l = roomLayout({ width: W, depth: D, height: H, connections: [] });
    const half = l.artSize / 2;
    for (const p of l.placements) {
      expect(Math.abs(p.x)).toBeLessThanOrEqual(W / 2);
      expect(Math.abs(p.z)).toBeLessThanOrEqual(D / 2);
      expect(p.y - half).toBeGreaterThanOrEqual(0);
      expect(p.y + half).toBeLessThanOrEqual(H);
    }
    const key = (p: { wall: string; row: number }) => `${p.wall}|${p.row}`;
    const groups = new Map<string, number[]>();
    for (const p of l.placements) { const g = groups.get(key(p)) ?? []; g.push(p.wall === 'back' || p.wall === 'front' ? p.x : p.z); groups.set(key(p), g); }
    for (const along of groups.values()) {
      along.sort((a, b) => a - b);
      for (let i = 1; i < along.length; i++) expect(along[i] - along[i - 1]).toBeGreaterThanOrEqual(l.artSize);
    }
  });
  it('картины повёрнуты внутрь зала', () => {
    for (const p of roomLayout({ width: 20, depth: 14, height: 9, connections: [] }).placements) {
      const nx = Math.sin(p.rotY), nz = Math.cos(p.rotY);
      const inward = p.wall === 'back' ? [0, 1] : p.wall === 'front' ? [0, -1] : p.wall === 'left' ? [1, 0] : [-1, 0];
      expect(nx * inward[0] + nz * inward[1]).toBeGreaterThan(0.99);
    }
  });
  it('двери: на передней стене, не пересекаются с картинами, уменьшают вместимость', () => {
    const none = roomLayout({ width: 24, depth: 20, height: 4, connections: [] });
    const withDoors = roomLayout({ width: 24, depth: 20, height: 4, connections: ['a', 'b', 'c'] });
    expect(withDoors.doors).toHaveLength(3);
    expect(withDoors.capacity).toBeLessThan(none.capacity);
    for (const d of withDoors.doors) {
      expect(d.z).toBe(10);
      for (const p of withDoors.placements.filter(p => p.wall === 'front')) expect(Math.abs(p.x - d.x)).toBeGreaterThan(d.width / 2 + withDoors.artSize / 2);
    }
    expect(new Set(withDoors.doors.map(d => d.x)).size).toBe(3);
  });
  it('размер картины: меньше в низком зале и в тесной комнате', () => {
    expect(artSizeFor(44, 44, 9)).toBe(2.2);
    expect(artSizeFor(44, 44, 4)).toBeLessThan(2.2);
    expect(artSizeFor(3, 3, 9)).toBeLessThanOrEqual(2.1);
  });
});

describe('spawnPoint / placedArtworks', () => {
  it('появляется у двери, через которую пришли', () => {
    const spec = room({ connections: ['a', 'b'] });
    const l = roomLayout(spec as any);
    expect(spawnPoint(l, 20, 'b').x).toBe(l.doors[1].x);
    expect(spawnPoint(l, 20, 'zzz').x).toBe(0);
    expect(spawnPoint(l, 20).z).toBeLessThan(10);
  });

  it('в тесном зале посетитель появляется не на пороге двери и не вплотную к картине', () => {
    for (const d of [3, 4, 5, 8]) {
      const l = roomLayout({ width: d, depth: d, height: 3, connections: ['a'] });
      const sp = spawnPoint(l, d, 'a');
      expect(sp.z).toBeLessThan(l.bounds.z - 0.15);                 // не срабатывает дверь
      const back = l.placements.find(p => p.wall === 'back')!;
      expect(sp.z - back.z).toBeGreaterThan(l.artSize * 0.7);       // не упираемся носом в картину
    }
  });
  it('картины ставятся на места по номеру slot_N, пустые пропускаются', () => {
    const spec = normalizeRoom(room({ slots: 4, artworkAssignments: { slot_2: { id: 7, title: 'x', artist: 'y' }, slot_4: { id: 8, title: 'z', artist: 'w' }, slot_3: null } }));
    const l = roomLayout(spec);
    const placed = placedArtworks(spec, l);
    expect(placed.map(p => p.slot)).toEqual([2, 4]);
    expect(placed[0].placement).toBe(l.placements[1]);
  });
});

describe('lightingPlan', () => {
  it('свет масштабируется с настройкой освещения, светлые стены притушаются', () => {
    const base = { theme: 'classic' as const, width: 20, depth: 20, height: 5, wallColor: '#808080', lighting: 70 };
    expect(lightingPlan({ ...base, lighting: 100 }).ambient).toBeGreaterThan(lightingPlan(base).ambient);
    expect(lightingPlan({ ...base, lighting: 0 }).ambient).toBe(0);
    expect(lightingPlan({ ...base, wallColor: '#ffffff' }).ambient).toBeLessThan(lightingPlan({ ...base, wallColor: '#202020' }).ambient);
  });
  it('число ламп зависит от глубины; все лампы внутри зала; для всех тем конечные значения', () => {
    for (const theme of THEMES) for (const [W, D, H] of [[3, 3, 3], [15, 15, 4], [50, 50, 15]]) {
      const p = lightingPlan({ theme, width: W, depth: D, height: H, wallColor: '#f5f0e6', lighting: 70 });
      expect(p.lights.length).toBeGreaterThanOrEqual(1);
      for (const l of p.lights) { expect(Math.abs(l.x)).toBeLessThanOrEqual(W / 2); expect(Math.abs(l.z)).toBeLessThanOrEqual(D / 2); expect(l.y).toBeLessThan(H); expect(Number.isFinite(l.intensity)).toBe(true); }
    }
  });
});
