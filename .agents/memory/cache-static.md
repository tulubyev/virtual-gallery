---
name: Cache & static serving
description: How server.js serves static files and sets cache headers for the React SPA.
---

## Rule
Hashed JS/CSS chunks go to `/assets/*` with `Cache-Control: max-age=31536000, immutable`.
`index.html` is served with `Cache-Control: no-store`.
`noCacheMiddleware` is applied only per-route on `/api/*`, NOT globally.

**Why:** Previously `noCacheMiddleware` was global (line 12 of old server.js), so the
browser re-fetched every hashed chunk on every page load, wasting bandwidth and slowing
navigation. Vite puts a content hash in filenames, so immutable caching is safe.

**How to apply:** When adding new static paths in server.js, follow the same pattern —
immutable for hashed assets, no-store for HTML entry points, no-cache for API only.
