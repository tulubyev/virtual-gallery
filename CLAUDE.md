# CLAUDE.md — Virtual Gallery

Виртуальная арт-галерея с VR и AI-кураторством

## Где что лежит

| | |
|---|---|
| GitHub | https://github.com/tulubyev/virtual-gallery |
| Локально | `~/Dropbox/DEV/Virtgal` |
| VPS | 90.156.168.149, `/var/www/virtual-gallery` (Docker + Traefik, см. `vps-server-infra`) |
| Прод | https://virtgal.ru |
| Стек | Node/Express (`server.js` + TS-роуты через tsx), React + Vite + Tailwind/shadcn (`src/frontend`), Three.js/WebXR, PostgreSQL 16 (`virtual_gallery_db` на VPS), S3 Beget, Python AI/ML-сервис (`ai-ml-service/`, Qdrant) |

## Как ведётся работа

Проект подключён к общей доске **DEV Control** (реестр — `tulubyev/dev-control`).

- Работа идёт по issues этого репозитория. Перед началом проверь, есть ли задача:
  `gh issue list --label agent:claude` — задачи, назначенные Claude.
- Каждая задача делается в отдельной ветке (`feat/<номер>-кратко`, `fix/<номер>-кратко`)
  и завершается PR с `Closes #<номер>` в описании — тогда карточка на доске сама
  уйдёт в Done после merge.
- Если задача заблокирована (нужен ответ, доступ, решение) — комментарий в issue
  с вопросом и метка `blocked`, не гадать.
- В PR: что сделано, как проверено, что осталось.
- Секреты только в `.env` (в git не попадают), в `.env.example` — имена переменных.
  Пароли и ключи не писать в код, документацию и примеры (значения-«запасные» в коде запрещены).

## Команды

```bash
npm ci && npm --prefix src/frontend ci   # зависимости
cp .env.example .env                     # заполнить (в git не попадает)
npm run dev                              # Express :3001 (nodemon + tsx) + Vite :5000 (прокси /api → :3001)
npm run build                            # Tailwind + виджеты → dist/frontend
npm --prefix src/frontend run build      # React SPA → src/frontend/dist (его раздаёт server.js)
npx tsc --noEmit && npx jest             # типы и тесты (то же гоняет CI)
node --import tsx server.js              # запуск как в проде (PORT, по умолчанию 5000)
docker compose -f docker-compose.prod.yml up -d --build   # прод на VPS
```

## Деплой (VPS)

- Проект: `/var/www/virtual-gallery`, образ собирается `Dockerfile`, маршрут Traefik — labels в
  `docker-compose.prod.yml` (`virtgal.ru`, `www` → 301). Порты наружу не публикуются.
- БД — системный PostgreSQL 16 на хосте, из контейнера `172.28.0.1:5432`, БД `virtual_gallery_db`.
- Загрузки — каталог `public/uploads` (том `./public/uploads`, владелец uid 1000).
- В production `server.js` не стартует, если `JWT_SECRET` короче 32 символов.
- **`npm run init-db` удаляет все таблицы** (нужен `CONFIRM_DB_RESET=yes`) — на боевой БД не запускать.
- Python AI/ML-сервис (`ai-ml-service/`) в деплой пока не включён: без него работает демо-режим
  (`AI_CORE_URL`).

## Безопасность

- Доступ к `/api` задаёт одна таблица — `src/middleware/accessPolicy.ts` (`RULES`), подключена в `server.js`
  перед всеми роутами. **Новый маршрут добавляется в таблицу**, иначе: чтение — любой вошедший, изменение —
  только администратор. Роль берётся из БД, а не из токена. Тесты — `src/test/middleware/accessPolicy.test.ts`.
- Секрет JWT: `getJwtSecret()` (`src/config/jwt.ts`), запасных значений нет.
- Лимиты: вход и регистрация — 20 за 15 минут с IP, `/api/ai` — 60 за 10 минут.
- Сидер (`scripts/populate-db.ts`) берёт пароль из `SEED_PASSWORD` или генерирует случайный; на боевую БД не запускать.

## 3D-галерея

- Подробно — `docs/ARCHITECTURE-gallery.md`. Модель зала и раскладка по размерам — `src/frontend/src/lib/gallery/roomSpec.ts`
  (общая для сервера и клиента: `normalizeConfig`, `roomLayout`, `lightingPlan`), движок — `components/GalleryR3F.tsx`
  (react-three-fiber), кэш текстур и URL — `lib/gallery/`; тесты — `src/test/frontend/`, `src/test/routes/galleryConfig.test.ts`.
- Размеры зала (3–50 × 3–50 × 3–15 м) определяют размер картин, число мест (вместимость) и границы ходьбы; залы связаны
  дверями (`connections`) — подошёл к проёму и перешёл в соседний зал.
- Картины грузятся по уровням: 256 px (все, сразу) → 1024 px (ближе 11 м, в кадре) → 2048 px (ближе 4,5 м, не на слабых
  устройствах); число текстур ограничено, лишние освобождаются. Миниатюры делает сервер:
  `/media/t/<256|512|1024|2048>/<u|s>/<файл|ключ S3>` (`src/services/media.ts`, кэш в `THUMB_CACHE_DIR`, по умолчанию `/tmp/vg-thumbs`).
- CDN: `CDN_BASE_URL` (например `https://cdn.virtgal.ru`) — nginx-кэш перед `/media/*` (`docker/cdn/nginx.conf`, сервис `cdn`
  в `docker-compose.prod.yml`); адрес клиент берёт из `/api/public-config`. Пусто — картинки идут с основного сервера.
- Рендер «по требованию» (в покое кадры не рисуются); `?fps` в адресе показывает FPS.
- Внешние (не `/uploads/`, не S3) изображения миниатюр не имеют: уменьшаются на клиенте, но скачиваются целиком.

## Устройство

- `server.js` — Express: `/api/*` (роуты в `src/routes/*.ts`), статика, SPA-фолбэк на `src/frontend/dist`.
- `src/frontend` — React SPA (свой `package.json`) и legacy HTML-страницы; `vite.config.ts` в корне
  собирает отдельные виджеты.
- `src/test`, `e2e` — Jest и Playwright.
- Replit-файлы (`.replit`, `replit.nix`, `replit.md`) оставлены до окончательного переезда.
