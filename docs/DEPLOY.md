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
