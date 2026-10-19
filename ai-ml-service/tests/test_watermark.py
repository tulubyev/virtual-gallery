"""Невидимая метка в частотной области: переживает JPEG, честные флаги, воспроизводимый хеш."""

import base64
import io
from unittest.mock import AsyncMock, patch

import numpy as np
import pytest
from PIL import Image

from src.models.services import dct_watermark
from src.models.services.watermark_service import WatermarkService, watermark_service

HASH = "0123456789abcdef0123456789abcdef"
OTHER = "fedcba9876543210fedcba9876543210"


def natural_image(width=512, height=384, seed=0) -> Image.Image:
    """Гладкие градиенты, текстура и лёгкий шум — ближе к фотографии, чем случайный шум."""
    rng = np.random.RandomState(seed)
    x, y = np.meshgrid(np.linspace(0, 6, width), np.linspace(0, 4, height))
    base = 128 + 60 * np.sin(x * 1.3) * np.cos(y * 1.7) + 30 * np.sin(x * 7 + y * 3)
    rgb = np.stack([base + 20 * np.sin(y * 2), base + 10 * np.cos(x), base - 15 * np.sin(x + y)], -1)
    rgb += rng.normal(0, 3, (height, width, 3))
    return Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))


def through_jpeg(image: Image.Image, quality: int) -> Image.Image:
    buffer = io.BytesIO()
    image.save(buffer, "JPEG", quality=quality)
    buffer.seek(0)
    return Image.open(buffer)


def psnr(a: Image.Image, b: Image.Image) -> float:
    diff = np.asarray(a, float) - np.asarray(b, float)
    return 10 * np.log10(255 ** 2 / np.mean(diff ** 2))


def test_embed_is_nearly_invisible_and_readable():
    original = natural_image()
    marked = dct_watermark.embed(original, HASH)
    assert psnr(original, marked) > 38
    assert dct_watermark.extract(marked) == HASH


@pytest.mark.parametrize("quality", [95, 90, 85, 75])
def test_mark_survives_jpeg_recompression(quality):
    marked = dct_watermark.embed(natural_image(), HASH)
    assert dct_watermark.extract(through_jpeg(marked, quality)) == HASH


def test_clean_image_has_no_mark_and_other_hash_is_not_confused():
    original = natural_image()
    assert dct_watermark.extract(original) is None
    assert dct_watermark.extract(dct_watermark.embed(original, OTHER)) == OTHER


def test_odd_sizes_and_tiny_images():
    odd = natural_image(517, 389)
    assert dct_watermark.extract(dct_watermark.embed(odd, HASH)) == HASH
    tiny = natural_image(100, 100)
    assert dct_watermark.capacity_ok(*tiny.size) is False
    with pytest.raises(ValueError):
        dct_watermark.embed(tiny, HASH)
    assert dct_watermark.extract(tiny) is None


def test_bad_hash_rejected():
    with pytest.raises(ValueError):
        dct_watermark.embed(natural_image(), "abc")


def test_render_sets_invisible_flag_only_when_readable_after_saving():
    service = WatermarkService()
    result = service._render(natural_image(), HASH, visible=True, invisible=True, text="Virtual Art Gallery")
    assert result["visible_watermark_applied"] is True and result["invisible_watermark_applied"] is True
    saved = Image.open(io.BytesIO(base64.b64decode(result["watermarked_image_base64"])))
    assert watermark_service.verify_watermark(saved, HASH)["verified"] is True
    assert watermark_service.verify_watermark(saved, OTHER)["verified"] is False

    tiny = service._render(natural_image(100, 100), HASH, visible=False, invisible=True, text="x")
    assert tiny["invisible_watermark_applied"] is False   # метку нанести нельзя — флаг честный

    none = service._render(natural_image(), HASH, visible=True, invisible=False, text="x")
    assert none["invisible_watermark_applied"] is False


@pytest.mark.asyncio
async def test_apply_watermarks_hash_is_reproducible_and_content_based():
    buffer = io.BytesIO()
    natural_image().save(buffer, "PNG")
    png = buffer.getvalue()
    other = io.BytesIO()
    natural_image(seed=5).save(other, "PNG")

    async def run(data, artwork="task1"):
        with patch("src.models.services.watermark_service.fetch_image", AsyncMock(return_value=(data, "image/png"))):
            return await watermark_service.apply_watermarks("https://example.org/a.png", artwork, owner_id="7")

    first, again = await run(png), await run(png)
    assert first["verification_hash"] == again["verification_hash"] and len(first["verification_hash"]) == 32
    assert (await run(other.getvalue()))["verification_hash"] != first["verification_hash"]
    assert (await run(png, artwork="task2"))["verification_hash"] != first["verification_hash"]
    assert first["invisible_watermark_applied"] is True
