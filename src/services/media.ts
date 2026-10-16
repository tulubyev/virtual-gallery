// src/services/media.ts
// Медиа-сервис: уменьшенные копии изображений для 3D-галереи и списков.
//   /media/t/<ширина>/u/<файл>   — локальная загрузка (public/uploads)
//   /media/t/<ширина>/s/<ключ>   — объект S3 (artworks/…, textures/…)
// Ответ — WebP с вечным кэшем (имена объектов уникальны), готов к раздаче через CDN
// (cdn.<домен> → nginx proxy_cache → этот маршрут).
import { Request, Response } from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';

const sharp = require('sharp');

export const MEDIA_WIDTHS = [256, 512, 1024, 2048] as const;
const SAFE_FILE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
// В S3 отдаём только каталоги с изображениями галереи — не весь бакет
const S3_PREFIXES = ['artworks/', 'textures/'] as const;
const MAX_ORIGINAL_BYTES = 40 * 1024 * 1024;

export function isSafeS3Key(key: string): boolean {
  if (!S3_PREFIXES.some(p => key.startsWith(p))) return false;
  const rest = key.split('/');
  return rest.length >= 2 && rest.every(part => SAFE_FILE.test(part));
}

/** Публичный адрес бакета: https://<бакет>.<хост S3> — по тем же правилам, что и при загрузке. */
export function s3PublicBase(env: NodeJS.ProcessEnv = process.env): string | null {
  const endpoint = env.S3_ENDPOINT;
  const bucket = env.S3_BUCKET_NAME || env.S3_BUCKET;
  if (!endpoint || !bucket) return null;
  return `https://${bucket}.${endpoint.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`;
}

/** Публичные настройки для клиента: откуда брать картинки. */
export function publicMediaConfig(env: NodeJS.ProcessEnv = process.env): { cdnBaseUrl: string; s3PublicBase: string | null } {
  const cdn = (env.CDN_BASE_URL || '').trim().replace(/\/+$/, '');
  return { cdnBaseUrl: /^https:\/\/[A-Za-z0-9.-]+(:\d+)?$/.test(cdn) ? cdn : '', s3PublicBase: s3PublicBase(env) };
}

export interface MediaOptions {
  uploadsDir: string;
  cacheDir?: string;
  /** Загрузка оригинала из S3 по ключу (внедряется для тестов). */
  fetchS3?: (key: string) => Promise<Buffer>;
  /** Сколько миниатюр строится одновременно (защита от лавины запросов мимо кэша). */
  maxConcurrentBuilds?: number;
}

async function defaultFetchS3(key: string): Promise<Buffer> {
  const { GetObjectCommand } = require('@aws-sdk/client-s3');
  const { s3Client, S3_BUCKET } = require('../config/s3');
  const out = await s3Client.send(new GetObjectCommand({ Bucket: S3_BUCKET, Key: key }), { abortSignal: AbortSignal.timeout(20000) });
  if (typeof out.ContentLength === 'number' && out.ContentLength > MAX_ORIGINAL_BYTES) throw new Error('original too large');
  const chunks: Buffer[] = [];
  let total = 0;
  for await (const chunk of out.Body as AsyncIterable<Buffer>) {
    total += chunk.length;
    if (total > MAX_ORIGINAL_BYTES) throw new Error('original too large');
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

class Semaphore {
  private waiting: Array<() => void> = [];
  private active = 0;
  constructor(private max: number) {}
  async run<T>(fn: () => Promise<T>): Promise<T> {
    if (this.active >= this.max) await new Promise<void>(r => this.waiting.push(r));
    this.active++;
    try { return await fn(); } finally { this.active--; this.waiting.shift()?.(); }
  }
}

export function createMediaHandler(opts: MediaOptions) {
  const cache = opts.cacheDir || process.env.THUMB_CACHE_DIR || path.join(os.tmpdir(), 'vg-thumbs');
  const fetchS3 = opts.fetchS3 || defaultFetchS3;
  const inflight = new Map<string, Promise<void>>();
  const builds = new Semaphore(opts.maxConcurrentBuilds ?? 4);

  async function build(input: string | Buffer, out: string, width: number): Promise<void> {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const tmp = `${out}.${process.pid}.${Date.now()}.tmp`;
    try {
      await sharp(input, { failOn: 'none' })
        .rotate() // учесть EXIF-ориентацию
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: width >= 1024 ? 82 : 78 })
        .toFile(tmp);
      fs.renameSync(tmp, out);
    } finally {
      if (fs.existsSync(tmp)) fs.rmSync(tmp, { force: true });
    }
  }

  function send(res: Response, file: string): void {
    // Имена объектов уникальны (метка времени): кэшировать можно «навсегда».
    // CORS и CORP нужны, чтобы WebGL мог брать текстуры с домена CDN.
    res.set({
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    });
    res.type('image/webp');
    res.sendFile(file);
  }

  return async function media(req: Request, res: Response): Promise<void> {
    const width = Number(req.params.width);
    const kind = req.params.kind;
    const name = String(req.params[0] ?? '');

    if (!(MEDIA_WIDTHS as readonly number[]).includes(width)) { res.status(404).end(); return; }

    let srcPath: string | null = null;
    if (kind === 'u') {
      if (!SAFE_FILE.test(name)) { res.status(404).end(); return; }
      srcPath = path.join(opts.uploadsDir, name);
      if (!fs.existsSync(srcPath) || !fs.statSync(srcPath).isFile()) { res.status(404).end(); return; }
    } else if (kind === 's') {
      if (!isSafeS3Key(name)) { res.status(404).end(); return; }
    } else { res.status(404).end(); return; }

    const out = path.join(cache, String(width), kind, `${name}.webp`);
    try {
      // Локальный файл могли заменить — сравниваем время; объекты S3 неизменяемы
      const fresh = fs.existsSync(out) && (!srcPath || fs.statSync(out).mtimeMs >= fs.statSync(srcPath).mtimeMs);
      if (!fresh) {
        const key = `${width}/${kind}/${name}`;
        let job = inflight.get(key);
        if (!job) {
          job = builds.run(async () => build(srcPath ?? await fetchS3(name), out, width)).finally(() => inflight.delete(key));
          inflight.set(key, job);
        }
        await job;
      }
      send(res, out);
    } catch (error) {
      console.error('[media]', kind, name, (error as Error).message);
      if (srcPath) { res.sendFile(srcPath); return; } // локальный оригинал как запасной вариант
      res.status(502).end();
    }
  };
}
