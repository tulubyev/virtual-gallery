// lib/gallery/useMediaConfig.ts
import { useEffect, useState } from 'react';
import { MediaConfig, NO_MEDIA } from './imageUrls';

let cached: Promise<MediaConfig> | null = null;

/** Один раз за сессию спрашивает у сервера, откуда брать картинки (CDN, бакет S3). */
export function loadMediaConfig(): Promise<MediaConfig> {
  if (!cached) {
    cached = fetch('/api/public-config')
      .then(r => (r.ok ? r.json() : null))
      .then(d => (d && d.media ? ({ cdnBaseUrl: String(d.media.cdnBaseUrl || ''), s3PublicBase: d.media.s3PublicBase || null }) : NO_MEDIA))
      .catch(() => NO_MEDIA);
  }
  return cached;
}

/** null — пока настройки не получены. */
export function useMediaConfig(): MediaConfig | null {
  const [cfg, setCfg] = useState<MediaConfig | null>(null);
  useEffect(() => { let alive = true; loadMediaConfig().then(c => { if (alive) setCfg(c); }); return () => { alive = false; }; }, []);
  return cfg;
}
