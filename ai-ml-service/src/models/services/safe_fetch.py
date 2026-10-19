"""
Безопасная загрузка файлов по URL, который пришёл в запросе (SSRF и лимиты).

Что гарантируется:
* только http/https и порты 80/443;
* хост входит в белый список (FETCH_ALLOWED_HOSTS + хост нашего S3); подстановка поддомена
  допускается, точное совпадение — тоже;
* адрес, к которому реально подключается клиент, — публичный (не loopback, не частная сеть,
  не link-local и метаданные облака, не multicast/reserved); проверка идёт в резолвере
  соединения, поэтому подмена DNS между проверкой и подключением (DNS rebinding) не проходит;
* редиректы идут вручную, не больше трёх, и каждый шаг проверяется заново;
* размер ограничен (по Content-Length и по фактически прочитанным байтам), общее время ограничено.
"""

import asyncio
import ipaddress
import logging
import socket
from typing import Iterable, List, Optional, Tuple
from urllib.parse import urljoin, urlsplit

import aiohttp
from aiohttp.abc import AbstractResolver

from ..config import settings
from ..exceptions import FetchError

logger = logging.getLogger(__name__)

ALLOWED_PORTS = {80, 443}
MAX_REDIRECTS = 3
TOTAL_TIMEOUT_SECONDS = 45

IMAGE_MIME_BY_MAGIC = (
    (b"\xff\xd8\xff", "image/jpeg"),
    (b"\x89PNG\r\n\x1a\n", "image/png"),
)


def allowed_hosts() -> List[str]:
    """Хосты, с которых разрешено скачивать: настройка + хост нашего S3."""
    hosts = [h.strip().lower() for h in settings.fetch_allowed_hosts.split(",") if h.strip()]
    s3_host = urlsplit(settings.s3_endpoint).hostname
    if s3_host:
        hosts.append(s3_host.lower())
    return hosts


def _host_allowed(host: str, hosts: Iterable[str]) -> bool:
    host = host.lower().rstrip(".")
    return any(host == allowed or host.endswith("." + allowed) for allowed in hosts)


def validate_url(url: str) -> str:
    """Проверка URL без обращения к сети (схема, порт, белый список). Возвращает нормализованный URL."""
    if not isinstance(url, str) or not url or len(url) > 2048:
        raise FetchError("Некорректный URL")
    parts = urlsplit(url.strip())
    if parts.scheme not in ("http", "https"):
        raise FetchError("Разрешены только http и https")
    if parts.username or parts.password:
        raise FetchError("URL с учётными данными не разрешён")
    host = parts.hostname
    if not host:
        raise FetchError("В URL нет хоста")
    try:
        port = parts.port or (443 if parts.scheme == "https" else 80)
    except ValueError:
        raise FetchError("Некорректный порт")
    if port not in ALLOWED_PORTS:
        raise FetchError("Порт не разрешён")
    try:
        ipaddress.ip_address(host)
    except ValueError:
        pass
    else:
        # IP-адрес вместо имени обходит резолвер соединения, поэтому не принимается вообще
        raise FetchError("Нужно имя хоста, а не IP-адрес")
    if not _host_allowed(host, allowed_hosts()):
        raise FetchError("Хост не входит в список разрешённых")
    return parts.geturl()


def check_request_url(value: Optional[str]) -> Optional[str]:
    """Для валидаторов pydantic: отказ в запросе (422) до постановки задачи, а не через минуты в статусе."""
    if value is None:
        return value
    try:
        return validate_url(value)
    except FetchError as error:
        raise ValueError(error.message)


def is_public_address(address: str) -> bool:
    try:
        ip = ipaddress.ip_address(address)
    except ValueError:
        return False
    if isinstance(ip, ipaddress.IPv6Address) and ip.ipv4_mapped:
        ip = ip.ipv4_mapped
    return ip.is_global and not (ip.is_multicast or ip.is_reserved or ip.is_loopback or ip.is_link_local)


class PublicOnlyResolver(AbstractResolver):
    """Резолвер, который отбрасывает не публичные адреса. Используется самим соединением."""

    def __init__(self) -> None:
        self._inner = aiohttp.ThreadedResolver()

    async def resolve(self, host: str, port: int = 0, family: int = socket.AF_INET) -> List[dict]:
        records = await self._inner.resolve(host, port, family)
        public = [record for record in records if is_public_address(record["host"])]
        if not public:
            raise OSError("Адрес не разрешён")
        return public

    async def close(self) -> None:
        await self._inner.close()


def sniff_image_mime(data: bytes) -> Optional[str]:
    """Тип изображения по первым байтам (заголовку Content-Type не доверяем)."""
    for magic, mime in IMAGE_MIME_BY_MAGIC:
        if data.startswith(magic):
            return mime
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "image/webp"
    return None


async def fetch_bytes(url: str, max_bytes: int, accept_prefixes: Tuple[str, ...] = ()) -> Tuple[bytes, str]:
    """Скачать файл не больше max_bytes. Возвращает (данные, Content-Type)."""
    current = validate_url(url)
    timeout = aiohttp.ClientTimeout(total=TOTAL_TIMEOUT_SECONDS, connect=10)
    connector = aiohttp.TCPConnector(resolver=PublicOnlyResolver(), use_dns_cache=False, limit=4)
    try:
        async with aiohttp.ClientSession(connector=connector, timeout=timeout) as session:
            for _ in range(MAX_REDIRECTS + 1):
                try:
                    response_cm = session.get(current, allow_redirects=False)
                    async with response_cm as response:
                        if response.status in (301, 302, 303, 307, 308):
                            location = response.headers.get("Location")
                            if not location:
                                raise FetchError("Некорректный редирект")
                            current = validate_url(urljoin(current, location))
                            continue
                        if response.status != 200:
                            raise FetchError(f"Источник вернул код {response.status}")
                        content_type = (response.headers.get("Content-Type") or "").split(";")[0].strip().lower()
                        if accept_prefixes and not content_type.startswith(accept_prefixes):
                            raise FetchError("Недопустимый тип файла")
                        declared = response.headers.get("Content-Length")
                        if declared and declared.isdigit() and int(declared) > max_bytes:
                            raise FetchError("Файл слишком большой")
                        chunks = []
                        total = 0
                        async for chunk in response.content.iter_chunked(64 * 1024):
                            total += len(chunk)
                            if total > max_bytes:
                                raise FetchError("Файл слишком большой")
                            chunks.append(chunk)
                        return b"".join(chunks), content_type
                except (aiohttp.ClientError, OSError, asyncio.TimeoutError) as error:
                    logger.warning("Fetch failed for %s: %s", urlsplit(current).hostname, error)
                    raise FetchError("Не удалось скачать файл")
            raise FetchError("Слишком много редиректов")
    finally:
        await connector.close()


async def fetch_image(url: str) -> Tuple[bytes, str]:
    """Скачать изображение (jpeg/png/webp), тип определяется по содержимому."""
    data, _ = await fetch_bytes(url, settings.max_image_size)
    mime = sniff_image_mime(data)
    if mime is None:
        raise FetchError("Файл не является поддерживаемым изображением")
    return data, mime


async def fetch_pdf(url: str) -> bytes:
    data, _ = await fetch_bytes(url, settings.max_pdf_size)
    if not data.startswith(b"%PDF-"):
        raise FetchError("Файл не является PDF")
    return data
