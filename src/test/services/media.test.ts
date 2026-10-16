import express from 'express';
import request from 'supertest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { createMediaHandler, isSafeS3Key, s3PublicBase, publicMediaConfig } from '../../services/media';

const sharp = require('sharp');
const bin = (r: any, cb: any) => { const c: Buffer[] = []; r.on('data', (d: Buffer) => c.push(d)); r.on('end', () => cb(null, Buffer.concat(c))); };

describe('медиа-сервис /media/t/:ширина/(u|s)/…', () => {
  let uploads: string, cache: string, app: express.Express, s3Calls: string[], jpeg: Buffer;

  beforeAll(async () => {
    uploads = fs.mkdtempSync(path.join(os.tmpdir(), 'vg-up-'));
    cache = fs.mkdtempSync(path.join(os.tmpdir(), 'vg-cache-'));
    jpeg = await sharp({ create: { width: 1600, height: 800, channels: 3, background: '#c0392b' } }).jpeg().toBuffer();
    fs.writeFileSync(path.join(uploads, 'art-1.jpg'), jpeg);
    fs.writeFileSync(path.join(uploads, 'broken.jpg'), 'это не изображение');
    fs.writeFileSync(path.join(path.dirname(uploads), 'secret.txt'), 'секрет');
    s3Calls = [];
    const fetchS3 = async (key: string) => { s3Calls.push(key); if (key === 'artworks/missing.jpg') throw new Error('NoSuchKey'); return jpeg; };
    app = express();
    app.get('/media/t/:width/:kind(u|s)/*', createMediaHandler({ uploadsDir: uploads, cacheDir: cache, fetchS3 }));
  });

  afterAll(() => {
    fs.rmSync(uploads, { recursive: true, force: true });
    fs.rmSync(cache, { recursive: true, force: true });
    fs.rmSync(path.join(path.dirname(uploads), 'secret.txt'), { force: true });
  });

  it('локальный файл: WebP нужной ширины, пропорции, кэш и заголовки для CDN', async () => {
    const res = await request(app).get('/media/t/256/u/art-1.jpg').buffer(true).parse(bin);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/image\/webp/);
    expect(res.headers['cache-control']).toMatch(/immutable/);
    expect(res.headers['access-control-allow-origin']).toBe('*');
    expect(res.headers['cross-origin-resource-policy']).toBe('cross-origin');
    const meta = await sharp(res.body).metadata();
    expect([meta.format, meta.width, meta.height]).toEqual(['webp', 256, 128]);
  });

  it('объект S3: скачивается один раз, дальше из дискового кэша', async () => {
    const before = s3Calls.length;
    const a = await request(app).get('/media/t/512/s/artworks/art-9.jpg').buffer(true).parse(bin);
    expect(a.status).toBe(200);
    expect((await sharp(a.body).metadata()).width).toBe(512);
    await request(app).get('/media/t/512/s/artworks/art-9.jpg');
    expect(s3Calls.length - before).toBe(1);
    expect(fs.existsSync(path.join(cache, '512', 's', 'artworks', 'art-9.jpg.webp'))).toBe(true);
  });

  it('не увеличивает маленькие изображения', async () => {
    const res = await request(app).get('/media/t/2048/u/art-1.jpg').buffer(true).parse(bin);
    expect((await sharp(res.body).metadata()).width).toBe(1600);
  });

  it.each([
    ['300', 'u', 'art-1.jpg'], ['0', 'u', 'art-1.jpg'], ['abc', 'u', 'art-1.jpg'],
    ['256', 'u', 'missing.jpg'], ['256', 'u', '.hidden'], ['256', 'u', '..%2Fsecret.txt'], ['256', 'u', '%2e%2e%2fsecret.txt'],
    ['256', 's', 'private/x.jpg'], ['256', 's', 'artworks/../private/x.jpg'], ['256', 's', 'artworks/%2e%2e/x.jpg'], ['256', 's', 'artworks'], ['256', 's', 'artworks/'],
  ])('ширина %s, источник %s, путь %s → 404', async (w, k, p) => {
    const before = s3Calls.length;
    const res = await request(app).get(`/media/t/${w}/${k}/${p}`);
    expect(res.status).toBe(404);
    expect(s3Calls.length).toBe(before); // в S3 за такими запросами не ходим
  });

  it('нет объекта в S3 → 502, сервер не падает', async () => {
    expect((await request(app).get('/media/t/256/s/artworks/missing.jpg')).status).toBe(502);
  });

  it('повреждённый локальный файл не роняет сервер — отдаётся оригинал', async () => {
    expect((await request(app).get('/media/t/256/u/broken.jpg')).status).toBe(200);
  });

  it('параллельные запросы одной миниатюры строят её один раз', async () => {
    const before = s3Calls.length;
    const results = await Promise.all(Array.from({ length: 8 }, () => request(app).get('/media/t/1024/s/artworks/parallel.jpg')));
    expect(results.every(r => r.status === 200)).toBe(true);
    expect(s3Calls.length - before).toBe(1);
    const dir = path.join(cache, '1024', 's', 'artworks');
    expect(fs.readdirSync(dir).filter(f => f.endsWith('.tmp'))).toHaveLength(0);
  });
});

describe('isSafeS3Key', () => {
  it.each(['artworks/a.jpg', 'textures/t-1.png', 'artworks/sub/a.jpg'])('%s — можно', k => expect(isSafeS3Key(k)).toBe(true));
  it.each(['private/a.jpg', 'artworks/', 'artworks', 'artworks/../a', 'artworks//a', 'artworks/.hidden', 'artworks/a b.jpg', '/artworks/a.jpg', 'artworks/a%2e.jpg'])('%s — нельзя', k => expect(isSafeS3Key(k)).toBe(false));
});

describe('настройки для клиента', () => {
  it('адрес бакета строится как при загрузке', () => {
    expect(s3PublicBase({ S3_ENDPOINT: 'https://s3.ru1.storage.example.cloud/', S3_BUCKET_NAME: 'my-bucket' } as any)).toBe('https://my-bucket.s3.ru1.storage.example.cloud');
    expect(s3PublicBase({} as any)).toBeNull();
  });
  it('CDN принимается только как https-домен без пути', () => {
    const env = (cdn: string) => ({ CDN_BASE_URL: cdn, S3_ENDPOINT: 'https://s3.x', S3_BUCKET_NAME: 'b' } as any);
    expect(publicMediaConfig(env('https://cdn.virtgal.ru/')).cdnBaseUrl).toBe('https://cdn.virtgal.ru');
    for (const bad of ['', 'http://cdn.virtgal.ru', 'https://cdn.virtgal.ru/media', 'javascript:alert(1)', 'https://a b.ru', '//cdn.virtgal.ru'])
      expect(publicMediaConfig(env(bad)).cdnBaseUrl).toBe('');
  });
});
