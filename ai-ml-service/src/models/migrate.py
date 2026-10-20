"""
Применение SQL-миграций из migrations/ к БД ядра (DATABASE_URL).

    python -m src.models.migrate [--dir migrations] [--wait 60]

* файлы применяются по порядку имён, каждый в своей транзакции; применённые записываются в schema_migrations;
* миграции написаны идемпотентно (IF NOT EXISTS), поэтому на БД, где часть таблиц уже создана вручную, запуск безопасен;
* параллельный запуск нескольких экземпляров сериализуется advisory-локом;
* --wait N — ждать доступности БД до N секунд (контейнер ядра стартует раньше PostgreSQL).
Нужна только DATABASE_URL: остальные настройки ядра не требуются.
"""

import argparse
import asyncio
import hashlib
import logging
import os
import sys
import time
from pathlib import Path
from typing import List, Optional

import asyncpg

logger = logging.getLogger("migrate")

DEFAULT_DIR = Path(__file__).resolve().parents[2] / "migrations"
LOCK_KEY = 7_270_011          # произвольная константа: ключ advisory-лока миграций ядра


def migration_files(directory: Path) -> List[Path]:
    return sorted(p for p in directory.glob("*.sql") if p.is_file())


def _checksum(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


async def _connect(dsn: str, wait_seconds: float) -> asyncpg.Connection:
    deadline = time.monotonic() + wait_seconds
    while True:
        try:
            return await asyncpg.connect(dsn, timeout=10)
        except (OSError, asyncpg.PostgresError, asyncio.TimeoutError) as error:
            if time.monotonic() >= deadline:
                raise
            logger.info("БД пока недоступна (%s), повтор через 2 с", type(error).__name__)
            await asyncio.sleep(2)


async def apply_migrations(dsn: str, directory: Path = DEFAULT_DIR, wait_seconds: float = 0) -> List[str]:
    """Применить новые миграции; вернуть имена применённых в этом запуске."""
    files = migration_files(directory)
    if not files:
        raise RuntimeError(f"в {directory} нет миграций")
    conn = await _connect(dsn, wait_seconds)
    applied: List[str] = []
    try:
        await conn.execute("SELECT pg_advisory_lock($1)", LOCK_KEY)
        await conn.execute(
            """CREATE TABLE IF NOT EXISTS schema_migrations (
                   filename   TEXT PRIMARY KEY,
                   checksum   TEXT NOT NULL,
                   applied_at TIMESTAMPTZ NOT NULL DEFAULT now())""")
        done = {r["filename"]: r["checksum"] for r in await conn.fetch("SELECT filename, checksum FROM schema_migrations")}
        for path in files:
            checksum = _checksum(path)
            if path.name in done:
                if done[path.name] != checksum:
                    logger.warning("миграция %s изменилась после применения — повторно не применяется", path.name)
                continue
            logger.info("применяю %s", path.name)
            async with conn.transaction():
                await conn.execute(path.read_text(encoding="utf-8"))
                await conn.execute("INSERT INTO schema_migrations (filename, checksum) VALUES ($1, $2)", path.name, checksum)
            applied.append(path.name)
        await conn.execute("SELECT pg_advisory_unlock($1)", LOCK_KEY)
    finally:
        await conn.close()
    return applied


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(description="Миграции БД ядра ИИ")
    parser.add_argument("--dir", type=Path, default=DEFAULT_DIR)
    parser.add_argument("--wait", type=float, default=0, help="ждать доступности БД, секунд")
    args = parser.parse_args(argv)
    logging.basicConfig(level=logging.INFO, format="%(asctime)s migrate %(message)s")

    dsn = os.environ.get("DATABASE_URL")
    if not dsn:
        logger.error("DATABASE_URL не задан")
        return 2
    try:
        applied = asyncio.run(apply_migrations(dsn, args.dir, args.wait))
    except Exception as error:
        # Строка подключения (с паролем) в журнал не попадает: только тип ошибки и текст без DSN
        logger.error("миграции не применены: %s: %s", type(error).__name__, str(error).replace(dsn, "***"))
        return 1
    logger.info("готово: применено %d (%s)", len(applied), ", ".join(applied) or "новых нет")
    return 0


if __name__ == "__main__":
    sys.exit(main())
