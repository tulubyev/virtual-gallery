---
name: Navigation and routing structure
description: How the React SPA nav is structured vs HTML originals, and which pages use HTML fallbacks.
---

## Nav structure (React Header)
Public nav: Галерея→/galleries, Аукцион→/auction, ArtWiki→/artwiki, RAG→/rag, О нас→/about
Branding: "Virtual Gallery" + "AI Powered" subtitle (Palette icon, indigo)
Auth: Войти / Регистрация when logged out; Дашборд + Выйти when logged in

## Page status
- React SPA (catch-all): /, /login, /register, /galleries, /artworks, /artwiki, /rag, /about, /virtual-gallery, /tours, /collections, /curator, /admin, /staff, /tour-guide, /auction-participant
- HTML fallbacks in server.js: /auction, /gallery-3d, /auction-participant (these HTML files remain)
- HTML originals at /html/* for design reference always

## Content layout
- HomePage: hero only + quick section links + CTA (no feature cards)
- AboutPage: "Возможности платформы" cards + roles + tech stack
- ArtWiki/RAG: full React pages added by Task #4

**Why:** User wants React pages to gradually match HTML design language. Keep /html/* routes as permanent design reference. Build React pages to match HTML originals page by page.
