# Настройка локальной среды разработки

## Установка PostgreSQL

### Windows:
1. Скачайте PostgreSQL с официального сайта: https://www.postgresql.org/download/windows/
2. Запустите установщик и следуйте инструкциям
3. Запомните пароль для пользователя postgres
4. Добавьте PostgreSQL в PATH (обычно делается автоматически)

### Linux (Ubuntu):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### macOS:
```bash
brew install postgresql
```

## Настройка базы данных

1. Запустите PostgreSQL:
   - Windows: Запустите "pgAdmin 4" или используйте команду в терминале
   - Linux/macOS: `sudo systemctl start postgresql` или `brew services start postgresql`

2. Создайте базу данных для проекта:
```sql
CREATE DATABASE virtual_gallery_db;
CREATE USER tulubyev WITH PASSWORD 'CrossBaikal6times!';
GRANT ALL PRIVILEGES ON DATABASE virtual_gallery_db TO tulubyev;
```

## Установка Redis

### Windows:
Redis официально не поддерживает Windows, но вы можете использовать WSL (Windows Subsystem for Linux):
```bash
wsl
sudo apt update
sudo apt install redis-server
```

### Linux (Ubuntu):
```bash
sudo apt update
sudo apt install redis-server
```

### macOS:
```bash
brew install redis
```

## Настройка переменных окружения

Создайте или обновите файл `.env` в корне проекта:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=virtual_gallery_db
DB_USER=tulubyev
DB_PASSWORD=CrossBaikal6times!
DB_STRING=postgres://tulubyev:CrossBaikal6times!@localhost:5432/virtual_gallery_db

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=very_long_secret_key_for_jwt_tokens_that_should_be_at_least_32_characters_long

S3_ACCESS_KEY_ID=Y841PZ8U04P7907MPGFZ
S3_SECRET_ACCESS_KEY=vhAopLf3SNTrY8mdEPJtGlBraCIF3wNUgN7XsLsJ
S3_REGION=ru-msk
S3_BUCKET_NAME=0a011f8d633a-gifted-saul
S3_ENDPOINT=https://s3.ru1.storage.beget.cloud
```

## Запуск приложения в режиме разработки

1. Убедитесь, что PostgreSQL и Redis запущены
2. Установите зависимости: `npm install`
3. Запустите приложение: `npm run dev`