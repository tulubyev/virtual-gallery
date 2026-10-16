import express from 'express';
import request from 'supertest';

jest.mock('../../services/gallery-config', () => ({
  getActiveConfig: jest.fn(),
  saveConfig: jest.fn().mockResolvedValue({}),
  updateTextureUrls: jest.fn(),
}));
jest.mock('../../services/s3-upload', () => ({ uploadBufferToS3: jest.fn(), StorageUnavailableError: class extends Error {} }));

const { getActiveConfig, saveConfig } = require('../../services/gallery-config');
import galleryRouter from '../../routes/gallery';

function app() {
  const a = express();
  a.use(express.json());
  a.use('/api/gallery', galleryRouter);
  return a;
}

const room = (o: Record<string, unknown> = {}) => ({ id: 'r1', name: 'Зал', theme: 'modern', width: 20, depth: 20, height: 6, wallColor: '#ffffff', lighting: 80, slots: 3, connections: [], artworkAssignments: {}, ...o });

beforeEach(() => { jest.clearAllMocks(); });

describe('GET /api/gallery/config', () => {
  it('в БД пусто → штатная конфигурация, уже приведённая к норме (залы связаны дверями)', async () => {
    getActiveConfig.mockResolvedValue(null);
    const res = await request(app()).get('/api/gallery/config');
    expect(res.status).toBe(200);
    expect(res.body.rooms.map((r: any) => r.id)).toContain('main_hall');
    expect(res.body.rooms.find((r: any) => r.id === 'main_hall').connections).toEqual(['impressionism', 'modern_art']);
    expect(res.body.currentRoom).toBe('main_hall');
  });

  it('в БД лежит пустой объект (после загрузки текстур) → штатная конфигурация, а не {}', async () => {
    getActiveConfig.mockResolvedValue({ config: {}, texture_urls: { floor: '/x.png' } });
    const res = await request(app()).get('/api/gallery/config');
    expect(res.body.rooms.length).toBeGreaterThan(0);
    expect(res.body.texture_urls).toEqual({ floor: '/x.png' });
  });

  it('старые/испорченные данные нормализуются при чтении', async () => {
    getActiveConfig.mockResolvedValue({ config: { rooms: [{ id: 'a', width: 1000, theme: 'zzz', artworkAssignments: { slot_1: { id: 1, title: 'x', artist: 'y', image_url: 'javascript:alert(1)' } }, slots: 2 }] } });
    const res = await request(app()).get('/api/gallery/config');
    expect(res.body.rooms[0]).toMatchObject({ id: 'a', width: 50, theme: 'classic' });
    expect(res.body.rooms[0].artworkAssignments.slot_1.image_url).toBeUndefined();
  });

  it('ошибка БД → штатная конфигурация', async () => {
    getActiveConfig.mockRejectedValue(new Error('db down'));
    const res = await request(app()).get('/api/gallery/config');
    expect(res.status).toBe(200);
    expect(res.body.rooms.length).toBeGreaterThan(0);
  });
});

describe('POST /api/gallery/config', () => {
  it('не конфигурация → 400, в БД ничего не пишется', async () => {
    for (const body of [{}, { rooms: 'x' }, { rooms: null }]) {
      const res = await request(app()).post('/api/gallery/config').send(body);
      expect(res.status).toBe(400);
    }
    expect(saveConfig).not.toHaveBeenCalled();
  });

  it('в БД сохраняется нормализованная конфигурация; предупреждения возвращаются', async () => {
    const res = await request(app()).post('/api/gallery/config').send({
      currentRoom: 'нет такого',
      textureUrls: { floor: '/t.png' },
      rooms: [room({ connections: ['ghost'], artworkAssignments: { slot_1: { id: 1, title: 'a', artist: 'b', image_url: 'javascript:alert(1)', onload: 'x' } } })],
    });
    expect(res.status).toBe(200);
    expect(res.body.warnings.join()).toMatch(/несуществующ/);
    const [saved, textures] = saveConfig.mock.calls[0];
    expect(saved.currentRoom).toBe('r1');
    expect(saved.rooms[0].connections).toEqual([]);
    expect(saved.rooms[0].artworkAssignments.slot_1).toEqual({ id: 1, title: 'a', artist: 'b' });
    expect(textures).toEqual({ floor: '/t.png' });
  });
});
