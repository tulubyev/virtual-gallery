// src/services/thumbnails.ts
// Миниатюры загруженных изображений «на лету»: /uploads/t/<ширина>/<файл> → WebP.
// 3D-галерея грузит 256 px сразу и 1024/2048 px только вблизи, а не оригиналы на несколько МБ.
import { Request, Response } from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';

const sharp = require('sharp');

export const THUMB_WIDTHS = [256, 512, 1024, 2048] as const;
const SAFE_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

export interface ThumbnailOptions {
  uploadsDir: string;
  cacheDir?: string;
}

export function createThumbnailHandler({ uploadsDir, cacheDir }: ThumbnailOptions) {
  const cache = cacheDir || process.env.THUMB_CACHE_DIR || path.join(os.tmpdir(), 'vg-thumbs');
  const inflight = new Map<string, Promise<void>>();

  async function build(src: string, out: string, width: number): Promise<void> {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const tmp = `${out}.${process.pid}.${Date.now()}.tmp`;
    try {
      await sharp(src, { failOn: 'none' })
        .rotate() // учесть EXIF-ориентацию
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: width >= 1024 ? 82 : 78 })
        .toFile(tmp);
      fs.renameSync(tmp, out);
    } finally {
      if (fs.existsSync(tmp)) fs.rmSync(tmp, { force: true });
    }
  }

  return async function thumbnail(req: Request, res: Response): Promise<void> {
    const width = Number(req.params.width);
    const file = req.params.file;

    if (!(THUMB_WIDTHS as readonly number[]).includes(width) || !SAFE_NAME.test(file)) {
      res.status(404).end();
      return;
    }

    const src = path.join(uploadsDir, file);
    if (!fs.existsSync(src) || !fs.statSync(src).isFile()) {
      res.status(404).end();
      return;
    }

    const out = path.join(cache, String(width), `${file}.webp`);
    try {
      const fresh = fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;
      if (!fresh) {
        const key = `${width}/${file}`;
        let job = inflight.get(key);
        if (!job) {
          job = build(src, out, width).finally(() => inflight.delete(key));
          inflight.set(key, job);
        }
        await job;
      }
      // Имена загрузок уникальны (метка времени), поэтому кэшировать можно «навсегда»
      res.set('Cache-Control', 'public, max-age=31536000, immutable');
      res.type('image/webp');
      res.sendFile(out);
    } catch (error) {
      // Не удалось уменьшить (повреждённый файл и т. п.) — отдаём оригинал
      console.error('[thumbnails]', file, (error as Error).message);
      res.sendFile(src);
    }
  };
}
