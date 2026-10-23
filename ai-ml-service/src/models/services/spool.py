"""
Каталог временных PDF: файл лежит от загрузки до конца обработки задачи.

Имя файла — случайный идентификатор, который выдаёт ядро; из запроса в путь ничего не попадает
(проверка по шаблону отсекает `../` и подмену пути).
"""

import re
import time
import uuid
from pathlib import Path

from ..config import settings

NAME = re.compile(r"^[0-9a-f]{32}\.pdf$")
MAX_AGE_SECONDS = 24 * 3600


def _dir() -> Path:
    path = Path(settings.upload_spool_dir)
    path.mkdir(parents=True, exist_ok=True)
    return path


def save(data: bytes) -> str:
    name = f"{uuid.uuid4().hex}.pdf"
    target = _dir() / name
    target.write_bytes(data)
    return name


def read(name: str) -> bytes:
    if not NAME.match(name or ""):
        raise ValueError("Недопустимое имя файла")
    return (_dir() / name).read_bytes()


def remove(name: str) -> None:
    if NAME.match(name or ""):
        (_dir() / name).unlink(missing_ok=True)


def purge_old(max_age: int = MAX_AGE_SECONDS) -> int:
    """Удалить файлы старше суток (задача давно упала или была отменена)."""
    removed = 0
    now = time.time()
    for path in _dir().iterdir():
        if NAME.match(path.name) and now - path.stat().st_mtime > max_age:
            path.unlink(missing_ok=True)
            removed += 1
    return removed
