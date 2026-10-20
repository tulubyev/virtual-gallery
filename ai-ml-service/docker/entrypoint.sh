#!/bin/sh
# Перед запуском применяет миграции БД ядра (RUN_MIGRATIONS=0 — пропустить), затем запускает переданную команду.
set -e
if [ "${RUN_MIGRATIONS:-1}" = "1" ]; then
    python -m src.models.migrate --wait "${MIGRATE_WAIT_SECONDS:-60}"
fi
exec "$@"
