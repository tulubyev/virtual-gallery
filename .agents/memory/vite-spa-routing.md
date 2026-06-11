---
name: Vite MPA vs SPA routing
description: Vite serves every .html file in its root as an MPA entry; without a redirect plugin, /curator hits curator.html instead of the React SPA.
---

## The rule
Vite dev server treats any `.html` file in the project root (`src/frontend/`) as a valid MPA entry point and serves it at the matching route (e.g. `curator.html` → `/curator`). This bypasses React Router entirely.

**Why:** Vite defaults to MPA mode when multiple HTML files exist in the root. There is no built-in "SPA fallback" that overrides this — you must intercept early in the middleware chain.

**How to apply:** Add a `configureServer` plugin in `vite.config.ts` that rewrites the legacy HTML routes to the React SPA entry (`react-app.html`) before Vite's own file-serving middleware:

```ts
{
  name: 'spa-html-redirect',
  configureServer(server) {
    const spaRoutes = ['admin', 'curator', 'auction', 'gallery-3d', ...];
    server.middlewares.use((req, _res, next) => {
      const clean = (req.url ?? '/').split('?')[0].replace(/\/$/, '');
      if (spaRoutes.some(r => clean === `/${r}` || clean === `/${r}.html`)) {
        req.url = '/react-app.html';
      }
      next();
    });
  },
}
```

The raw HTML files remain reachable at `/html/<name>` via the Express server (those routes are explicitly registered in server.js).
