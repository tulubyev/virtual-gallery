// lib/gallery/imageUrls.ts
export type TexLevel = 'thumb' | 'detail' | 'zoom';

/** Максимальная сторона текстуры на каждом уровне (пиксели). */
export const LEVEL_PX: Record<TexLevel, number> = { thumb: 256, detail: 1024, zoom: 2048 };

/** Настройки от сервера (`/api/public-config`): откуда брать картинки. */
export interface MediaConfig {
  /** Домен CDN, например https://cdn.virtgal.ru; пусто — тот же сервер. */
  cdnBaseUrl: string;
  /** Публичный адрес бакета S3, например https://bucket.s3.example.net. */
  s3PublicBase: string | null;
}

export const NO_MEDIA: MediaConfig = { cdnBaseUrl: '', s3PublicBase: null };

const SAFE_PART = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
const LOCAL_UPLOAD = /^\/uploads\/([A-Za-z0-9][A-Za-z0-9._-]*)$/;
const S3_PREFIXES = ['artworks/', 'textures/'];

export interface TextureSource {
  url: string;
  /** Сторона, до которой нужно уменьшить на клиенте (для внешних URL, где миниатюр нет). */
  clientMaxSize: number | null;
}

function s3Key(imageUrl: string, base: string | null): string | null {
  if (!base || !imageUrl.startsWith(base + '/')) return null;
  const key = imageUrl.slice(base.length + 1).split(/[?#]/)[0];
  if (!S3_PREFIXES.some(p => key.startsWith(p))) return null;
  return key.split('/').every(part => SAFE_PART.test(part)) ? key : null;
}

/**
 * Локальные загрузки и объекты нашего S3 берутся уменьшенными с сервера (через CDN, если он задан):
 *   <cdn>/media/t/<px>/u/<файл>  и  <cdn>/media/t/<px>/s/<ключ>.
 * Внешние адреса остаются как есть и уменьшаются на клиенте.
 */
export function textureSource(imageUrl: string, level: TexLevel, media: MediaConfig = NO_MEDIA): TextureSource {
  const px = LEVEL_PX[level];
  const prefix = media.cdnBaseUrl || '';

  const local = LOCAL_UPLOAD.exec(imageUrl);
  if (local) return { url: `${prefix}/media/t/${px}/u/${local[1]}`, clientMaxSize: null };

  const key = s3Key(imageUrl, media.s3PublicBase);
  if (key) return { url: `${prefix}/media/t/${px}/s/${key}`, clientMaxSize: null };

  return { url: imageUrl, clientMaxSize: px };
}
