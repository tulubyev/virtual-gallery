import express from 'express';
import request from 'supertest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { createThumbnailHandler } from '../../services/thumbnails';

const sharp = require('sharp');

describe('миниатюры /uploads/t/:width/:file', () => {
  let uploads: string, cache: string, app: express.Express;

  beforeAll(async () => {
    uploads = fs.mkdtempSync(path.join(os.tmpdir(), 'vg-up-'));
    cache = fs.mkdtempSync(path.join(os.tmpdir(), 'vg-cache-'));
    await sharp({ create: { width: 1600, height: 800, channels: 3, background: '#c0392b' } }).jpeg().toFile(path.join(uploads, 'art-1.jpg'));
    fs.writeFileSync(path.join(uploads, 'broken.jpg'), 'это не изображение');
    fs.writeFileSync(path.join(path.dirname(uploads), 'secret.txt'), 'секрет');
    app = express();
    app.get('/uploads/t/:width/:file', createThumbnailHandler({ uploadsDir: uploads, cacheDir: cache }));
  });

  afterAll(() => {
    fs.rmSync(uploads, { recursive: true, force: true });
    fs.rmSync(cache, { recursive: true, force: true });
    fs.rmSync(path.join(path.dirname(uploads), 'secret.txt'), { force: true });
  });

  it('отдаёт WebP нужной ширины с пропорциями и долгим кэшем', async () => {
    const res = await request(app).get('/uploads/t/256/art-1.jpg').buffer(true).parse((r, cb) => {
      const chunks: Buffer[] = []; r.on('data', c => chunks.push(c)); r.on('end', () => cb(null, Buffer.concat(chunks)));
    });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/image\/webp/);
    expect(res.headers['cache-control']).toMatch(/immutable/);
    const meta = await sharp(res.body).metadata();
    expect(meta.format).toBe('webp');
    expect(meta.width).toBe(256);
    expect(meta.height).toBe(128);
  });

  it('не увеличивает маленькие изображения', async () => {
    const res = await request(app).get('/uploads/t/2048/art-1.jpg').buffer(true).parse((r, cb) => {
      const chunks: Buffer[] = []; r.on('data', c => chunks.push(c)); r.on('end', () => cb(null, Buffer.concat(chunks)));
    });
    expect((await sharp(res.body).metadata()).width).toBe(1600);
  });

  it('второй запрос берётся из кэша на диске', async () => {
    await request(app).get('/uploads/t/512/art-1.jpg');
    expect(fs.existsSync(path.join(cache, '512', 'art-1.jpg.webp'))).toBe(true);
    const res = await request(app).get('/uploads/t/512/art-1.jpg');
    expect(res.status).toBe(200);
  });

  it.each([['300', 'art-1.jpg'], ['0', 'art-1.jpg'], ['abc', 'art-1.jpg'], ['256', 'missing.jpg'], ['256', '.hidden'], ['256', '..%2Fsecret.txt'], ['256', '%2e%2e%2fsecret.txt']])(
    'ширина %s, файл %s → 404', async (w, f) => {
      const res = await request(app).get(`/uploads/t/${w}/${f}`);
      expect(res.status).toBe(404);
    });

  it('повреждённый файл не роняет сервер — отдаётся оригинал', async () => {
    const res = await request(app).get('/uploads/t/256/broken.jpg');
    expect(res.status).toBe(200);
  });

  it('параллельные запросы одной миниатюры строят её один раз', async () => {
    const out = path.join(cache, '1024', 'art-1.jpg.webp');
    const results = await Promise.all(Array.from({ length: 6 }, () => request(app).get('/uploads/t/1024/art-1.jpg')));
    expect(results.every(r => r.status === 200)).toBe(true);
    expect(fs.existsSync(out)).toBe(true);
    expect(fs.readdirSync(path.dirname(out)).filter(f => f.endsWith('.tmp'))).toHaveLength(0);
  });
});
