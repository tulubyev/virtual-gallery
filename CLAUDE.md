# CLAUDE.md — Virtual Gallery

Виртуальная арт-галерея с VR и AI-кураторством

## Где что лежит

| | |
|---|---|
| GitHub | https://github.com/tulubyev/virtual-gallery |
| Локально | `~/Dropbox/DEV/Virtgal` |
| VPS | 90.156.168.149, `/var/www/virtual-gallery` (Docker + Traefik, см. `vps-server-infra`) |
| Прод | https://virtgal.ru |
| Стек | Express + TypeScript (бэкенд, `src/`), React + Vite + Three.js (`src/frontend`), PostgreSQL 16 (`virtual_gallery_db` на VPS), S3 Beget |

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

## Команды

```bash
npm ci && npm --prefix src/frontend ci     # зависимости
cp .env.example .env                       # заполнить (в git не попадает)
npm run dev                                # бэкенд :5000 + фронтенд :3000 (прокси /api, /socket.io)
npm run build                              # tsc (→ dist) + vite build (→ src/frontend/dist)
npm start                                  # node dist/server.js (раздаёт ../public, если есть)
docker compose -f docker-compose.prod.yml up -d --build   # прод на VPS
```

Бэкенд — TypeScript (`src/routes`, `controllers`, `services`). На JS остались модули,
подключаемые через `allowJs`: `src/ai-ml`, `src/backend/{utils,services,config}`,
`src/backend/controllers/artworkUploadController.js`; IoT (`src/iot`, `iot*.js`) нигде не подключён.
`JWT_SECRET` обязателен — без него сервер не стартует.

<!-- заполнить: установка, запуск, сборка, тесты, деплой -->
