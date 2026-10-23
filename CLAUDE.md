# CLAUDE.md — Virtual Gallery

Виртуальная арт-галерея с VR и AI-кураторством

## Где что лежит

| | |
|---|---|
| GitHub | https://github.com/tulubyev/virtual-gallery |
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

- Пошаговое описание, обновление, CDN и сброс пароля — `docs/DEPLOY.md`.
- Проект: `/var/www/virtual-gallery`, образ собирается `Dockerfile`, маршрут Traefik — labels в
  `docker-compose.prod.yml` (`virtgal.ru`, `www` → 301). Порты наружу не публикуются.
- БД — системный PostgreSQL 16 на хосте, из контейнера `172.28.0.1:5432`, БД `virtual_gallery_db`, роль приложения `virtgal_app`
  (проверять подключение нужно с адреса контейнера, а не с хоста: правило `pg_hba` — `172.28.0.0/16`).
- Загрузки — каталог `public/uploads` (том `./public/uploads`, владелец uid 1000).
- В production `server.js` не стартует, если `JWT_SECRET` короче 32 символов.
- **`npm run init-db` удаляет все таблицы** (нужен `CONFIRM_DB_RESET=yes`) — на боевой БД не запускать.
- Python AI/ML-сервис (`ai-ml-service/`) запускается профилем `ai` в `docker-compose.prod.yml` вместе с Qdrant и Redis
  (`docs/DEPLOY.md`, «Python-ядро ИИ»; БД — отдельная `virtgal_ai`, секреты — в `.env.ai`); без него работает демо-режим
  (`AI_CORE_URL`). Образ — `ai-ml-service/docker/Dockerfile.python`, зависимости закреплены в `requirements.txt` (Python 3.12),
  миграции применяются при старте (`src/models/migrate.py`), в CI — тесты ядра и дымовой тест стека (`scripts/smoke.sh`).
  Python-ядро — `ai-ml-service/src/models` (получено от владельца). Блокирующие ошибки (P0) исправлены, тесты —
  `ai-ml-service/tests` (`pytest`, внешние сервисы подменены); остальное (P1/P2) и состояние — `docs/AI-ML-CORE-REVIEW.md`,
  проект целиком — `docs/AI-ML-DESIGN.md`. Все ручки ядра, кроме `/health`, требуют заголовок `X-Internal-Token`
  (`INTERNAL_API_TOKEN` в `.env` и у основного приложения); порты ядра и Redis наружу не публикуются.
  Модель по каждой задаче ИИ выбирается в админ-панели (вкладка «Модели ИИ») поверх `MODEL_*` — `docs/AI-MODEL-SELECTION.md`;
  нужна миграция `ai-ml-service/migrations/005_create_ai_model_settings.sql`.

## Безопасность

- Доступ к `/api` задаёт одна таблица — `src/middleware/accessPolicy.ts` (`RULES`), подключена в `server.js`
  перед всеми роутами. **Новый маршрут добавляется в таблицу**, иначе: чтение — любой вошедший, изменение —
  только администратор. Роль берётся из БД, а не из токена. Тесты — `src/test/middleware/accessPolicy.test.ts`.
- Секрет JWT: `getJwtSecret()` (`src/config/jwt.ts`), запасных значений нет.
- Лимиты: вход и регистрация — 20 за 15 минут с IP, `/api/ai` — 60 за 10 минут. Платные ИИ-запросы (чат, RAG, анализ изображения и PDF)
  дополнительно ограничены по IP и в сутки — `src/middleware/aiBudget.ts` (`AI_CHAT_*`, `AI_HEAVY_*` в `.env`); сотрудники, кураторы и
  администраторы тяжёлые запросы делают без ограничений. Счётчики в памяти: при перезапуске приложения обнуляются.
- Сидер (`scripts/populate-db.ts`) берёт пароль из `SEED_PASSWORD` или генерирует случайный; на боевую БД не запускать.

## Торговый движок (аукцион v2)

- Проект — `docs/AUCTION-DESIGN.md`; код: миграция `src/database/migrations/001_bidding_engine.sql` (таблицы и функции `bidding_*`, логика ставки и закрытия — в функциях БД),
  `src/services/bidding.ts`, `src/routes/bidding.ts` (`/api/bidding`, включается `BIDDING_ENABLED=true`), воркер `src/services/biddingWorker.ts`.
  Старые `auctions`/`auction_lots`/`bids` и раздел `/api/auctions` не затронуты.
- Интерфейс: `/torgi` (список), `/torgi/:slug` (аукцион, заявка), `/torgi/lot/:id` (лот: таймер по серверным часам, ввод максимума, опрос по `version`), `/torgi/admin` (кабинет куратора);
  код — `src/frontend/src/pages/Torgi*.tsx`, `lib/bidding.ts`, `lib/biddingAdmin.ts`, `components/torgi/`. Пункт «Торги» в шапке виден, только если `/api/public-config` отдаёт `bidding.enabled`.
- Правовые документы — `src/legal/*.md` (правила аукциона, политика ПДн, отдельное согласие на обработку ПД; сейчас **каркас со статусом `draft`**, места для юриста помечены «[Юрист: …]»;
  правит юрист как обычные файлы, статус `approved` + `effective_from` ставится при утверждении). Читаются через `/api/legal/:slug`, показываются на `/legal/:slug`. Заявка принимается
  только с актуальными версиями (отпечаток SHA-256 пишется в `bidding_registrations`) и только если все три документа утверждены; для проверки до запуска — `BIDDING_ALLOW_DRAFT_RULES=true`.
- Миграции приложения применяются вручную: `npm run migrate` (`docs/DEPLOY.md`). Тесты движка идут на настоящем PostgreSQL (`TEST_DATABASE_URL`, `src/test/database`).
- Публичные ответы не содержат резерв, максимумы, id пользователей и продавца: участники — «№ N». Допуск: заявка → проверка личности (куратор) → решение с лимитом.
- До запуска нужны решения владельца и юриста (раздел 8 проекта): юрлицо, режим торгов и срок извещения (`notice_days`), задаток, шкала шага.

## RAG (вопросы по документам)

- Подробно — `docs/AI-RAG.md`. Гибридный поиск (Qdrant + PostgreSQL FTS `russian`, RRF), ответ по схеме с проверкой цитат и отказом при нехватке данных:
  `ai-ml-service/src/models/services/{chunking,retrieval,rag_answer,knowledge_base}.py`, таблицы `kb_documents`/`kb_chunks` (миграция 007).
- Права: у документа `access` = `public` | `staff` (по умолчанию `staff`); уровень спрашивающего Express берёт из сессии (`/api/ai/rag-query`, правило с `identify` в `accessPolicy.ts`).
  Загрузка PDF — сотрудники, публикация для всех и удаление — куратор/администратор.
- Интерфейс — `/rag` (`src/frontend/src/pages/RAGPage.tsx`, `lib/rag.ts`). Оценка качества — `ai-ml-service/tools/rag_eval.py`, формат набора — `ai-ml-service/eval/README.md`.

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

## Дашборды

- Цифры — только из БД: `GET /api/stats/overview` (`src/services/dashboardStats.ts`, доступ — staff/curator/admin, данные о
  пользователях — только admin), клиент — `src/frontend/src/lib/dashboardStats.ts`. Блок, которого нет в схеме БД, приходит
  как `null` и показывается как «—»; выдуманных значений и «демо»-списков в панелях быть не должно.
- Модулей без серверной части пока нет данных: туры (TourGuidePanel), задачи сотрудника, ИИ-анализ и оцифровка в StaffPanel —
  они помечены в интерфейсе как «не подключено».
- `src/database/schema.sql` отстаёт от боевой БД (нет `artworks.status/country/epoch/collection`, `collections.slug/is_active`, …);
  код, которому нужны эти колонки, на чистой схеме из `schema.sql` не работает.

## Устройство

- `server.js` — Express: `/api/*` (роуты в `src/routes/*.ts`), статика, SPA-фолбэк на `src/frontend/dist`.
- `src/frontend` — React SPA (свой `package.json`) и legacy HTML-страницы; `vite.config.ts` в корне
  собирает отдельные виджеты.
- `src/test`, `e2e` — Jest и Playwright.
- Replit-файлы (`.replit`, `replit.nix`, `replit.md`) оставлены до окончательного переезда.
