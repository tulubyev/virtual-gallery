// lib/gallery/imageUrls.ts
export type TexLevel = 'thumb' | 'detail' | 'zoom';

/** Максимальная сторона текстуры на каждом уровне (пиксели). */
export const LEVEL_PX: Record<TexLevel, number> = { thumb: 256, detail: 1024, zoom: 2048 };

const LOCAL_UPLOAD = /^\/uploads\/([A-Za-z0-9][A-Za-z0-9._-]*)$/;

export interface TextureSource {
  url: string;
  /** Сторона, до которой нужно уменьшить на клиенте (для внешних URL, где миниатюр нет). */
  clientMaxSize: number | null;
}

/** Локальные загрузки берутся уже уменьшенными (/uploads/t/<px>/<файл>), внешние — как есть. */
export function textureSource(imageUrl: string, level: TexLevel): TextureSource {
  const m = LOCAL_UPLOAD.exec(imageUrl);
  if (m) return { url: `/uploads/t/${LEVEL_PX[level]}/${m[1]}`, clientMaxSize: null };
  return { url: imageUrl, clientMaxSize: LEVEL_PX[level] };
}
