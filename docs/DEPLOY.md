# Деплой на VPS (virtgal.ru)

Проект живёт в `/var/www/virtual-gallery` на VPS 90.156.168.149 (Docker + Traefik, общая сеть `traefik-public`).
Секреты — только в `.env` на сервере (chmod 600), в git их нет. Общая документация сервера — репозиторий `vps-server-infra`.

## Первый запуск

```bash
# 1. Код. Репозиторий приватный: read-only deploy key (как у других проектов на сервере)
ssh-keygen -t ed25519 -N "" -C "virtgal-deploy" -f ~/.ssh/virtgal_deploy
cat ~/.ssh/virtgal_deploy.pub          # → GitHub: репозиторий → Settings → Deploy keys (без Write)
cat >> ~/.ssh/config <<'CFG'

Host github-virtgal
  HostName github.com
  User git
  IdentityFile ~/.ssh/virtgal_deploy
  IdentitiesOnly yes
CFG
sudo mkdir -p /var/www/virtual-gallery && sudo chown $USER: /var/www/virtual-gallery
cd /var/www/virtual-gallery
git clone -b main git@github-virtgal:tulubyev/virtual-gallery.git .

# 2. База: существующая virtual_gallery_db в системном PostgreSQL 16, отдельная роль приложения
DBPW=$(openssl rand -hex 24)
sudo -u postgres psql -v ON_ERROR_STOP=1 -v pw="$DBPW" -d virtual_gallery_db <<'SQL'
CREATE ROLE virtgal_app LOGIN PASSWORD :'pw';
ALTER DATABASE virtual_gallery_db OWNER TO virtgal_app;
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('ALTER TABLE public.%I OWNER TO virtgal_app', r.tablename);  -- привязанные последовательности переходят сами
  END LOOP;
END $$;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO virtgal_app;
SQL
# Проверка с адреса контейнера (с самого хоста правило pg_hba 172.28.0.0/16 не сработает):
docker run --rm --network traefik-public -e PGPASSWORD="$DBPW" postgres:16-alpine \
  psql -h 172.28.0.1 -U virtgal_app -d virtual_gallery_db -c 'select count(*) from artworks'

# 3. .env
cp .env.example .env && chmod 600 .env
#   DB_STRING=postgres://virtgal_app:<пароль>@172.28.0.1:5432/virtual_gallery_db   (пароль без спецсимволов или URL-кодированный)
#   DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD — те же значения, DB_SSL=false
#   JWT_SECRET, SESSION_SECRET, WATERMARK_SECRET — `openssl rand -hex 48` (JWT_SECRET короче 32 символов — сервер не стартует)
#   S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME, S3_REGION, S3_ENDPOINT — Beget
#   CDN_BASE_URL — см. «CDN» ниже, на первом запуске пусто

# 4. DNS: A virtgal.ru и www.virtgal.ru → 90.156.168.149 (до запуска: Let's Encrypt выпускает сертификат по ним)

# 5. Запуск
mkdir -p public/uploads && sudo chown -R 1000:1000 public/uploads
docker compose -f docker-compose.prod.yml up -d --build virtual-gallery
docker compose -f docker-compose.prod.yml ps                    # через ~30–60 с: Up … (healthy)
curl -s https://virtgal.ru/api/health
```

Traefik подключает контейнер к маршруту только когда он `healthy`: сразу после (пере)создания ответ `404 page not found`
от Traefik — норма на первые секунды.

## Обновление

```bash
cd /var/www/virtual-gallery
git pull origin main
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml logs --tail=30 virtual-gallery
```
Изменения в `.env` подхватываются только при пересоздании контейнера: `up -d --force-recreate virtual-gallery`.

### Миграции БД приложения

Новые таблицы и функции (сейчас — торговый движок `bidding_*`) лежат в `src/database/migrations/NNN_имя.sql` и применяются **вручную**, не при старте:

```bash
# 1. копия БД перед первой миграцией и перед любой, которая меняет существующие таблицы
sudo -u postgres pg_dump -Fc virtual_gallery_db > /var/backups/virtual_gallery_db-$(date +%F).dump
# 2. применить (повторный запуск безопасен; каждый файл — в своей транзакции, учёт в таблице app_migrations)
docker exec virtual-gallery npm run migrate
```

Миграция торгового движка только добавляет таблицы с префиксом `bidding_` и функции `bidding_*`: старые `auctions`, `auction_lots`, `bids` и
пользовательские данные не меняются. Пока администратор не создал аукцион в новой схеме, на сайте ничего не меняется.
Файл уже применённой миграции править нельзя (раннер предупредит) — изменения оформляются новым файлом.

## Python-ядро ИИ (профиль `ai`)

Ядро (`ai-ml-service/`), Qdrant и Redis запускаются отдельным профилем compose: без него сайт работает как раньше, ИИ — в демо-режиме.
Ядро хранит очередь задач, выбор моделей («Админ-панель → Модели ИИ»), оцифровку и журналы RAG в **отдельной БД `virtgal_ai`** — оно не видит
`users` и пароли основного приложения. Qdrant (`v1.9.7`, под `qdrant-client==1.9.0`) и Redis сидят во внутренней сети без выхода в интернет.

Память: в покое ядро ≈170 МБ, Qdrant ≈20 МБ, Redis ≈5 МБ; потолки в compose — 768 / 384 / 128 МБ. Перед включением проверьте `free -h`.

```bash
cd /var/www/virtual-gallery && git pull

# 1. БД и роль ядра в том же системном PostgreSQL 16
AIPW=$(openssl rand -hex 24)
sudo -u postgres psql -v ON_ERROR_STOP=1 -v pw="$AIPW" <<'SQL'
CREATE ROLE virtgal_ai LOGIN PASSWORD :'pw';
CREATE DATABASE virtgal_ai OWNER virtgal_ai;
SQL
# Проверка с адреса контейнера (как для virtgal_app выше). Если подключение отклонено правилом pg_hba —
# добавить строку `host virtgal_ai virtgal_ai 172.28.0.0/16 scram-sha-256` в pg_hba.conf и выполнить
# sudo -u postgres psql -c 'select pg_reload_conf()'
docker run --rm --network traefik-public -e PGPASSWORD="$AIPW" postgres:16-alpine \
  psql -h 172.28.0.1 -U virtgal_ai -d virtgal_ai -c 'select 1'

# 2. Общий с приложением секрет и адрес ядра — в .env
#    INTERNAL_API_TOKEN=$(openssl rand -hex 32)      # один и тот же у приложения и ядра
#    AI_CORE_URL=http://virtgal-ai-core:8001

# 3. Секреты ядра — в отдельный .env.ai (приложение их не получает)
cp .env.ai.example .env.ai && chmod 600 .env.ai
#    DATABASE_URL=postgresql://virtgal_ai:$AIPW@172.28.0.1:5432/virtgal_ai
#    LLM_API_KEY (routerai.ru), S3_* (те же, что у приложения), при необходимости LLM_MODE=ru-only.
#    LLM_PROVIDER_ONLY оставьте пустым: настройка общая для всех задач и ломает модели других вендоров
#    (подробнее — docs/AI-MODEL-SELECTION.md)

# 4. Запуск (миграции БД применяются автоматически при старте ядра; приложение перезапустится с новым .env)
docker compose -f docker-compose.prod.yml --profile ai up -d --build
```

Проверка:

```bash
docker compose -f docker-compose.prod.yml --profile ai ps                  # ai-core, ai-qdrant, ai-redis — healthy
docker logs virtgal-ai-core 2>&1 | grep migrate                            # «применено N» при первом запуске, «новых нет» дальше
docker exec virtual-gallery wget -qO- http://virtgal-ai-core:8001/health/  # {"status":"healthy",...}: БД, Qdrant, Redis
```

Затем «Админ-панель → Модели ИИ»: таблица загружается, если приложение достучалось до ядра по `AI_CORE_URL` с тем же `INTERNAL_API_TOKEN`.
Ошибка «ИИ-ядро отклонило запрос: проверьте INTERNAL_API_TOKEN» — токены в `.env` и у ядра разошлись (после правки `.env` — `up -d` для обоих).

- **Расходы и лимиты.** Каждый вызов модели стоит денег, поэтому у ключа routerai.ru задайте месячный лимит. Дополнительно приложение
  ограничивает платные запросы (`src/middleware/aiBudget.ts`): чат и RAG — 20 запросов за 10 минут с одного IP и 2000 в сутки на весь сайт,
  анализ изображения и PDF — 10 за 10 минут и 100 в сутки (сотрудники, кураторы и администраторы тяжёлые запросы делают без ограничений).
  Значения меняются в `.env` (`AI_CHAT_DAILY_LIMIT`, `AI_CHAT_IP_LIMIT`, `AI_HEAVY_DAILY_LIMIT`, `AI_HEAVY_IP_LIMIT`, `0` — без лимита),
  после правки — `docker compose -f docker-compose.prod.yml up -d`. При исчерпании суточного лимита сайт отвечает 429 до 00:00 UTC
  (в журнале приложения одна строка `[ai-budget] ...`).
- **Обновление:** `git pull && docker compose -f docker-compose.prod.yml --profile ai up -d --build`; новые миграции применятся сами.
- **Отключить ИИ:** `docker compose -f docker-compose.prod.yml --profile ai stop ai-core ai-qdrant ai-redis` и убрать `AI_CORE_URL` из `.env` — сайт вернётся к демо-режиму.
- **Сборка на сервере** занимает несколько минут и до ≈0,5 ГБ памяти (pip). Если памяти не хватает — собрать образ в другом месте (`docker build -f ai-ml-service/docker/Dockerfile.python -t virtgal-ai-core:latest ai-ml-service`)
  и перенести: `docker save virtgal-ai-core:latest | ssh <сервер> docker load`, затем `up -d` без `--build`.
- **Бэкапы:** добавить `virtgal_ai` в ежедневный `pg_dump`. Том `ai-qdrant-data` (векторы) восстанавливается повторной индексацией, но бэкап ускорит возврат.
- **CI** (`.github/workflows/ci.yml`): задание `ai-core` гоняет тесты ядра на PostgreSQL 16, `ai-core-image` собирает образ и проверяет стек из контейнеров (`ai-ml-service/scripts/smoke.sh`).
  Локально: `cd ai-ml-service && docker compose -f docker-compose.smoke.yml up -d --build --wait && scripts/smoke.sh`.

## CDN (cdn.virtgal.ru)

DNS `A cdn.virtgal.ru → 90.156.168.149`, затем `CDN_BASE_URL=https://cdn.virtgal.ru` в `.env` и
`docker compose -f docker-compose.prod.yml up -d --build` (поднимет и сервис `cdn`). Проверка:

```bash
curl -s https://virtgal.ru/api/public-config                    # media.cdnBaseUrl = https://cdn.virtgal.ru
curl -s https://cdn.virtgal.ru/health
```
Без `CDN_BASE_URL` картинки отдаёт само приложение (`/media/t/<ширина>/<u|s>/…`).

## Картины

- Произведения, добавленные через сайт, лежат в S3 Beget (`image_url` — внешний адрес); приложение читает их через `/media/.../s/<ключ>`.
- `public/uploads` (том) нужен только для локальных загрузок; владелец каталога — uid 1000.

## Учётные записи

Пароли хранятся хешами bcrypt (10 раундов). Войти, не зная пароля, нельзя — сбросить можно из контейнера:

```bash
sudo -u postgres psql -d virtual_gallery_db -c "select user_id, username, email, role from users order by user_id"

read -rsp "Новый пароль (не короче 6 символов): " NEWPW; echo
HASH=$(docker exec -e NEWPW="$NEWPW" virtual-gallery node -e "require('bcrypt').hash(process.env.NEWPW,10).then(console.log)")
echo "UPDATE users SET password_hash = :'h' WHERE email = :'e' RETURNING user_id, email, role" \
  | sudo -u postgres psql -d virtual_gallery_db -v h="$HASH" -v e="admin@example.com"
unset NEWPW HASH
```
Сидовые аккаунты (`*@example.com` с паролем `password123`) на боевой базе должны быть удалены или получить новые пароли.

## Не делать

- `npm run init-db` и `scripts/populate-db.ts` на боевой БД — они стирают и пересоздают таблицы.
- Не класть секреты в git и в чат; ключ в `~/.ssh/virtgal_deploy` — только на чтение репозитория.
