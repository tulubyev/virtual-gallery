"""Безопасная загрузка по URL: SSRF, лимиты размера, редиректы, тип файла."""

import socket

import pytest
import pytest_asyncio
from aiohttp import web
from aiohttp.abc import AbstractResolver
from aiohttp.test_utils import TestServer

from src.models.exceptions import FetchError, public_error
from src.models.services import safe_fetch

PNG = b"\x89PNG\r\n\x1a\n" + b"\x00" * 64
JPEG = b"\xff\xd8\xff" + b"\x00" * 64


# ---------- проверка URL без сети ----------

@pytest.mark.parametrize("url", [
    "file:///etc/passwd",
    "ftp://example.org/a.jpg",
    "http://user:pass@example.org/a.jpg",
    "https://example.org:8443/a.jpg",
    "https://evilexample.org/a.jpg",       # похожее имя, но не поддомен
    "https://example.org.evil.com/a.jpg",
    "https://other.net/a.jpg",
    "http://127.0.0.1/a.jpg",
    "http://[::1]/a.jpg",
    "http://169.254.169.254/latest/meta-data/",
    "http://2130706433/",                   # 127.0.0.1 числом
    "",
    "x" * 3000,
])
def test_validate_url_rejects(url):
    with pytest.raises(FetchError):
        safe_fetch.validate_url(url)


@pytest.mark.parametrize("url", [
    "https://example.org/a.jpg",
    "http://example.org/a.jpg",
    "https://cdn.example.org/a/b.png?x=1",
    "https://s3.beget.com/bucket/key.jpg",   # хост S3 разрешён всегда
])
def test_validate_url_accepts(url):
    assert safe_fetch.validate_url(url)


@pytest.mark.parametrize("address,expected", [
    ("8.8.8.8", True), ("2606:4700:4700::1111", True),
    ("127.0.0.1", False), ("10.1.2.3", False), ("172.16.0.1", False), ("192.168.1.1", False),
    ("169.254.169.254", False), ("100.64.0.1", False), ("0.0.0.0", False), ("224.0.0.1", False),
    ("::1", False), ("fc00::1", False), ("fe80::1", False), ("::ffff:127.0.0.1", False), ("not-an-ip", False),
])
def test_is_public_address(address, expected):
    assert safe_fetch.is_public_address(address) is expected


@pytest.mark.asyncio
async def test_resolver_drops_private_addresses():
    resolver = safe_fetch.PublicOnlyResolver()

    class Inner:
        def __init__(self, hosts):
            self.hosts = hosts

        async def resolve(self, host, port=0, family=socket.AF_INET):
            return [{"hostname": host, "host": h, "port": port, "family": socket.AF_INET, "proto": 0, "flags": 0}
                    for h in self.hosts]

    resolver._inner = Inner(["10.0.0.5", "93.184.216.34"])
    assert [r["host"] for r in await resolver.resolve("example.org", 443)] == ["93.184.216.34"]
    resolver._inner = Inner(["127.0.0.1", "169.254.169.254"])
    with pytest.raises(OSError):
        await resolver.resolve("rebind.example.org", 443)


def test_sniff_image_mime():
    assert safe_fetch.sniff_image_mime(PNG) == "image/png"
    assert safe_fetch.sniff_image_mime(JPEG) == "image/jpeg"
    assert safe_fetch.sniff_image_mime(b"RIFF\x00\x00\x00\x00WEBPVP8 ") == "image/webp"
    assert safe_fetch.sniff_image_mime(b"<svg></svg>") is None
    assert safe_fetch.sniff_image_mime(b"GIF89a") is None


def test_public_error_hides_internal_details():
    assert public_error(FetchError("Файл слишком большой")) == "Файл слишком большой"
    assert public_error(RuntimeError("connect to 10.0.0.5:5432 refused")) == "Internal error"


# ---------- загрузка с локальным сервером ----------

class LocalResolver(AbstractResolver):
    """Тестовый резолвер: любое имя → 127.0.0.1 (настоящий отбрасывает такие адреса)."""

    async def resolve(self, host, port=0, family=socket.AF_INET):
        return [{"hostname": host, "host": "127.0.0.1", "port": port, "family": socket.AF_INET, "proto": 0, "flags": 0}]

    async def close(self):
        pass


@pytest_asyncio.fixture
async def server(monkeypatch):
    async def small(request):
        return web.Response(body=PNG, content_type="image/png")

    async def big_declared(request):
        return web.Response(body=b"\x89PNG\r\n\x1a\n" + b"0" * 5000, content_type="image/png")

    async def big_streamed(request):
        response = web.StreamResponse(headers={"Content-Type": "image/png"})
        await response.prepare(request)
        for _ in range(20):
            await response.write(b"0" * 1024)
        await response.write_eof()
        return response

    async def redirect_out(request):
        raise web.HTTPFound("https://other.net/a.jpg")

    async def redirect_loop(request):
        raise web.HTTPFound("/loop")

    async def redirect_ok(request):
        raise web.HTTPFound("/small")

    async def not_found(request):
        return web.Response(status=404)

    async def html(request):
        return web.Response(body=b"<html></html>", content_type="text/html")

    async def pdf(request):
        return web.Response(body=b"%PDF-1.4 test", content_type="application/pdf")

    app = web.Application()
    app.add_routes([
        web.get("/small", small), web.get("/big", big_declared), web.get("/stream", big_streamed),
        web.get("/out", redirect_out), web.get("/loop", redirect_loop), web.get("/redir", redirect_ok),
        web.get("/404", not_found), web.get("/html", html), web.get("/pdf", pdf),
    ])
    test_server = TestServer(app)
    await test_server.start_server()
    monkeypatch.setattr(safe_fetch, "ALLOWED_PORTS", {test_server.port, 443})
    monkeypatch.setattr(safe_fetch, "allowed_hosts", lambda: ["localhost"])
    monkeypatch.setattr(safe_fetch, "PublicOnlyResolver", LocalResolver)
    yield f"http://localhost:{test_server.port}"
    await test_server.close()


@pytest.mark.asyncio
async def test_fetch_ok_and_follows_allowed_redirect(server):
    data, content_type = await safe_fetch.fetch_bytes(server + "/small", 1024)
    assert data == PNG and content_type == "image/png"
    data, _ = await safe_fetch.fetch_bytes(server + "/redir", 1024)
    assert data == PNG


@pytest.mark.asyncio
async def test_fetch_rejects_oversize_declared_and_streamed(server):
    with pytest.raises(FetchError, match="большой"):
        await safe_fetch.fetch_bytes(server + "/big", 1000)
    with pytest.raises(FetchError, match="большой"):
        await safe_fetch.fetch_bytes(server + "/stream", 4096)


@pytest.mark.asyncio
async def test_fetch_rejects_redirect_to_disallowed_host_and_loops(server):
    with pytest.raises(FetchError, match="список разрешённых"):
        await safe_fetch.fetch_bytes(server + "/out", 1024)
    with pytest.raises(FetchError, match="редиректов"):
        await safe_fetch.fetch_bytes(server + "/loop", 1024)


@pytest.mark.asyncio
async def test_fetch_rejects_error_status_and_wrong_type(server):
    with pytest.raises(FetchError, match="404"):
        await safe_fetch.fetch_bytes(server + "/404", 1024)
    with pytest.raises(FetchError, match="тип"):
        await safe_fetch.fetch_bytes(server + "/html", 1024, accept_prefixes=("image/",))


@pytest.mark.asyncio
async def test_fetch_image_and_pdf_check_content_not_header(server):
    data, mime = await safe_fetch.fetch_image(server + "/small")
    assert mime == "image/png"
    with pytest.raises(FetchError, match="изображением"):
        await safe_fetch.fetch_image(server + "/html")
    assert (await safe_fetch.fetch_pdf(server + "/pdf")).startswith(b"%PDF-")
    with pytest.raises(FetchError, match="PDF"):
        await safe_fetch.fetch_pdf(server + "/small")


@pytest.mark.asyncio
async def test_real_resolver_blocks_localhost_target(monkeypatch):
    """Без подмены резолвера адрес 127.0.0.1 недостижим даже для разрешённого имени."""
    monkeypatch.setattr(safe_fetch, "allowed_hosts", lambda: ["localhost"])
    monkeypatch.setattr(safe_fetch, "ALLOWED_PORTS", {80, 443, 8080})
    with pytest.raises(FetchError, match="скачать"):
        await safe_fetch.fetch_bytes("http://localhost/x", 1024)


def test_request_url_validation_rejects_internal_target():
    from src.models.services.safe_fetch import check_request_url

    with pytest.raises(ValueError):
        check_request_url("http://127.0.0.1:6333/collections")
    assert check_request_url(None) is None
