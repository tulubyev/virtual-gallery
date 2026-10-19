"""
Watermark service for artwork protection
Видимая метка и невидимая метка в частотной области (переживает JPEG)
"""

from PIL import Image, ImageDraw, ImageFont
import io
import logging
import hashlib
from typing import Optional, Dict, Any
import base64
from datetime import datetime

from . import dct_watermark
from .safe_fetch import fetch_image

# Защита от «бомб»: слишком большие по числу пикселей изображения Pillow не открывает
Image.MAX_IMAGE_PIXELS = 50_000_000

logger = logging.getLogger(__name__)


class WatermarkService:
    """Видимая метка (текст в углу) и невидимая метка в частотной области (services/dct_watermark.py)."""

    def __init__(self):
        self.default_font_size = 24
        self.watermark_opacity = 0.3

    async def apply_watermarks(
        self,
        image_url: str,
        artwork_id: str,
        owner_id: Optional[str] = None,
        visible_watermark: bool = True,
        invisible_watermark: bool = True,
        watermark_text: str = "Virtual Art Gallery"
    ) -> Dict[str, Any]:
        """Нанести видимую и невидимую метки; хеш выводится из содержимого исходного файла."""
        try:
            image_data, image = await self._download(image_url)
            verification_hash = self._generate_verification_hash(artwork_id, owner_id, image_data)
            return self._render(image, verification_hash, visible_watermark, invisible_watermark, watermark_text)
        except Exception as e:
            logger.error(f"Failed to apply watermarks: {e}")
            raise

    async def apply_watermarks_with_hash(
        self,
        image_url: str,
        verification_hash: str,
        visible_watermark: bool = True,
        invisible_watermark: bool = True,
        watermark_text: str = "Virtual Art Gallery"
    ) -> Dict[str, Any]:
        """То же с готовым хешем (лицо и оборот одной работы получают одну метку)."""
        try:
            _, image = await self._download(image_url)
            return self._render(image, verification_hash, visible_watermark, invisible_watermark, watermark_text)
        except Exception as e:
            logger.error(f"Failed to apply watermarks with hash: {e}")
            raise

    def _render(self, image: Image.Image, verification_hash: str, visible: bool, invisible: bool, text: str) -> Dict[str, Any]:
        """Нанести метки и сохранить в JPEG; невидимая метка считается нанесённой, только если её удалось
        прочитать из уже сохранённого файла (иначе флаг ложный — как было при LSB-метке)."""
        if visible:
            image = self._apply_visible_watermark(image, text)

        invisible_applied = False
        if invisible:
            try:
                image = dct_watermark.embed(image, verification_hash)
            except ValueError as error:
                logger.warning("Invisible watermark skipped: %s", error)

        image_bytes = self._image_to_bytes(image)
        if invisible:
            saved = Image.open(io.BytesIO(image_bytes))
            invisible_applied = dct_watermark.extract(saved) == verification_hash
            if not invisible_applied:
                logger.warning("Invisible watermark not readable after saving; flag set to false")

        return {
            "success": True,
            "watermarked_image_base64": base64.b64encode(image_bytes).decode("utf-8"),
            "verification_hash": verification_hash,
            "visible_watermark_applied": visible,
            "invisible_watermark_applied": invisible_applied,
            "image_size": image.size,
            "timestamp": datetime.utcnow().isoformat()
        }

    async def _download(self, image_url: str):
        """Безопасная загрузка (белый список, лимиты): байты исходника и изображение."""
        image_data, _ = await fetch_image(image_url)
        return image_data, Image.open(io.BytesIO(image_data)).convert('RGB')

    async def _download_image(self, image_url: str) -> Image.Image:
        return (await self._download(image_url))[1]

    def _generate_verification_hash(self, artwork_id: str, owner_id: Optional[str], image_data: bytes) -> str:
        """Хеш метки: воспроизводим по исходному файлу, идентификатору работы и владельцу (без времени)."""
        content = hashlib.sha256(image_data).hexdigest()
        data = f"{artwork_id}:{owner_id or 'gallery'}:{content}"
        return hashlib.sha256(data.encode()).hexdigest()[:32]

    def _apply_visible_watermark(
        self,
        image: Image.Image,
        text: str,
        position: str = "bottom-right"
    ) -> Image.Image:
        """Apply visible text watermark to image"""
        watermarked = image.copy()
        draw = ImageDraw.Draw(watermarked, 'RGBA')
        
        width, height = watermarked.size
        font_size = max(int(min(width, height) * 0.03), 12)
        
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", font_size)
        except:
            font = ImageFont.load_default()
        
        text_bbox = draw.textbbox((0, 0), text, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_height = text_bbox[3] - text_bbox[1]
        
        padding = int(font_size * 0.5)
        
        if position == "bottom-right":
            x = width - text_width - padding
            y = height - text_height - padding
        elif position == "bottom-left":
            x = padding
            y = height - text_height - padding
        elif position == "top-right":
            x = width - text_width - padding
            y = padding
        elif position == "top-left":
            x = padding
            y = padding
        else:
            x = (width - text_width) // 2
            y = height - text_height - padding
        
        shadow_color = (0, 0, 0, int(255 * self.watermark_opacity))
        draw.text((x + 2, y + 2), text, font=font, fill=shadow_color)
        
        text_color = (255, 255, 255, int(255 * self.watermark_opacity * 1.5))
        draw.text((x, y), text, font=font, fill=text_color)
        
        return watermarked
    
    def extract_invisible_watermark(self, image: Image.Image) -> Optional[str]:
        """Прочитать невидимую метку (хеш) или None."""
        return dct_watermark.extract(image)

    def _image_to_bytes(self, image: Image.Image, format: str = 'JPEG') -> bytes:
        """Convert PIL Image to bytes"""
        buffer = io.BytesIO()
        image.save(buffer, format=format, quality=95)
        buffer.seek(0)
        return buffer.read()
    
    def verify_watermark(
        self,
        image: Image.Image,
        expected_hash: str
    ) -> Dict[str, Any]:
        """Verify if image contains the expected invisible watermark"""
        extracted = self.extract_invisible_watermark(image)
        
        if extracted:
            is_valid = extracted == expected_hash
            return {
                "verified": is_valid,
                "extracted_hash": extracted,
                "expected_hash": expected_hash,
                "match": is_valid
            }
        
        return {
            "verified": False,
            "extracted_hash": None,
            "expected_hash": expected_hash,
            "match": False,
            "error": "No watermark found"
        }


watermark_service = WatermarkService()
