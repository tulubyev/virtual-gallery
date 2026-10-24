"""Чтение PDF через pypdfium2: текст по страницам, страницы для OCR, переход на OCR без текстового слоя."""

import os

import pytest

from src.models.services.pdf_service import pdf_service
from tests.test_rag import FONT, make_pdf

needs_font = pytest.mark.skipif(not os.path.exists(FONT), reason="нет шрифта DejaVu для PDF с кириллицей")


@needs_font
def test_extract_text_returns_cyrillic_text_per_page():
    data = make_pdf(["Казимир Малевич создал «Чёрный квадрат» в 1915 году.", "Вторая страница про супрематизм."])
    result = pdf_service.extract_text(data)
    assert result["total_pages"] == 2 and [p["page_number"] for p in result["pages"]] == [1, 2]
    assert "Малевич" in result["pages"][0]["text"] and "супрематизм" in result["pages"][1]["text"]
    assert result["total_chars"] == sum(p["char_count"] for p in result["pages"])
    assert "\x00" not in "".join(p["text"] for p in result["pages"])


@needs_font
def test_render_pages_yields_one_image_per_page():
    images = list(pdf_service.render_pages(make_pdf(["Первая.", "Вторая."]), dpi=50))
    assert len(images) == 2 and all(image.width > 100 and image.height > 100 for image in images)


@needs_font
def test_ocr_runs_on_rendered_pages(monkeypatch):
    import pytesseract

    seen = []
    monkeypatch.setattr(pytesseract, "image_to_string", lambda image, lang: seen.append(image.size) or "распознанный текст")
    result = pdf_service.perform_ocr(make_pdf(["Первая.", "Вторая."]))
    assert result["total_pages"] == 2 and result["pages"][0]["text"] == "распознанный текст" and len(seen) == 2


@needs_font
@pytest.mark.asyncio
async def test_pdf_with_little_text_falls_back_to_ocr(monkeypatch):
    import pytesseract

    monkeypatch.setattr(pytesseract, "image_to_string", lambda image, lang: "Текст со скана. " * 5)
    processed = await pdf_service.process_pdf_bytes(make_pdf(["Короткая страница."]), "scan-1")
    assert processed["processing_stats"]["ocr_performed"] is True and processed["chunks"]


def test_broken_pdf_raises():
    with pytest.raises(Exception):
        pdf_service.extract_text(b"%PDF-1.4 not really a pdf")
