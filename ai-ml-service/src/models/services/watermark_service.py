"""
Watermark service for artwork protection
Implements visible watermarks and invisible steganographic marks
"""

from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import io
import logging
import hashlib
import struct
from typing import Tuple, Optional, Dict, Any
import base64
from datetime import datetime

from .safe_fetch import fetch_image

# Защита от «бомб»: слишком большие по числу пикселей изображения Pillow не открывает
Image.MAX_IMAGE_PIXELS = 50_000_000

logger = logging.getLogger(__name__)


class WatermarkService:
    """Service for applying visible and invisible watermarks to artwork images"""
    
    def __init__(self):
        self.default_font_size = 24
        self.watermark_opacity = 0.3
        self.steganography_bits = 2
    
    async def apply_watermarks(
        self,
        image_url: str,
        artwork_id: str,
        owner_id: Optional[str] = None,
        visible_watermark: bool = True,
        invisible_watermark: bool = True,
        watermark_text: str = "Virtual Art Gallery"
    ) -> Dict[str, Any]:
        """Apply both visible and invisible watermarks to an image"""
        try:
            image = await self._download_image(image_url)
            
            verification_hash = self._generate_verification_hash(artwork_id, owner_id)
            
            if invisible_watermark:
                image = self._apply_invisible_watermark(image, verification_hash)
            
            if visible_watermark:
                image = self._apply_visible_watermark(image, watermark_text)
            
            image_bytes = self._image_to_bytes(image)
            image_base64 = base64.b64encode(image_bytes).decode('utf-8')
            
            return {
                "success": True,
                "watermarked_image_base64": image_base64,
                "verification_hash": verification_hash,
                "visible_watermark_applied": visible_watermark,
                "invisible_watermark_applied": invisible_watermark,
                "image_size": image.size,
                "timestamp": datetime.utcnow().isoformat()
            }
            
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
        """Apply watermarks using provided verification hash (for consistent multi-image watermarking)"""
        try:
            image = await self._download_image(image_url)
            
            if invisible_watermark:
                image = self._apply_invisible_watermark(image, verification_hash)
            
            if visible_watermark:
                image = self._apply_visible_watermark(image, watermark_text)
            
            image_bytes = self._image_to_bytes(image)
            image_base64 = base64.b64encode(image_bytes).decode('utf-8')
            
            return {
                "success": True,
                "watermarked_image_base64": image_base64,
                "verification_hash": verification_hash,
                "visible_watermark_applied": visible_watermark,
                "invisible_watermark_applied": invisible_watermark,
                "image_size": image.size,
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Failed to apply watermarks with hash: {e}")
            raise
    
    async def _download_image(self, image_url: str) -> Image.Image:
        """Download image from URL (безопасная загрузка: белый список, лимиты)"""
        image_data, _ = await fetch_image(image_url)
        return Image.open(io.BytesIO(image_data)).convert('RGB')

    def _generate_verification_hash(self, artwork_id: str, owner_id: Optional[str]) -> str:
        """Generate unique verification hash for the artwork"""
        data = f"{artwork_id}:{owner_id or 'gallery'}:{datetime.utcnow().isoformat()}"
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
    
    def _apply_invisible_watermark(
        self,
        image: Image.Image,
        data: str
    ) -> Image.Image:
        """Apply invisible steganographic watermark using LSB technique"""
        watermarked = image.copy()
        pixels = watermarked.load()
        width, height = watermarked.size
        
        binary_data = self._string_to_binary(data) + '11111111'
        
        max_rows = min(height, 100)
        max_capacity = width * max_rows * 3
        
        if len(binary_data) > max_capacity:
            truncated_chars = max_capacity // 8 - 1
            logger.warning(f"Watermark data too long ({len(data)} chars), truncating to {truncated_chars}")
            data = data[:truncated_chars]
            binary_data = self._string_to_binary(data) + '11111111'
        
        data_index = 0
        data_length = len(binary_data)
        
        for y in range(0, min(height, 100)):
            for x in range(width):
                if data_index >= data_length:
                    break
                
                r, g, b = pixels[x, y][:3]
                
                if data_index < data_length:
                    r = (r & ~1) | int(binary_data[data_index])
                    data_index += 1
                
                if data_index < data_length:
                    g = (g & ~1) | int(binary_data[data_index])
                    data_index += 1
                
                if data_index < data_length:
                    b = (b & ~1) | int(binary_data[data_index])
                    data_index += 1
                
                pixels[x, y] = (r, g, b)
            
            if data_index >= data_length:
                break
        
        return watermarked
    
    def extract_invisible_watermark(self, image: Image.Image) -> Optional[str]:
        """Extract invisible watermark from image"""
        try:
            pixels = image.load()
            width, height = image.size
            
            binary_data = ""
            
            for y in range(0, min(height, 100)):
                for x in range(width):
                    r, g, b = pixels[x, y][:3]
                    
                    binary_data += str(r & 1)
                    binary_data += str(g & 1)
                    binary_data += str(b & 1)
                    
                    if binary_data.endswith('11111111'):
                        binary_data = binary_data[:-8]
                        return self._binary_to_string(binary_data)
            
            return None
            
        except Exception as e:
            logger.error(f"Failed to extract watermark: {e}")
            return None
    
    def _string_to_binary(self, text: str) -> str:
        """Convert string to binary representation"""
        return ''.join(format(ord(char), '08b') for char in text)
    
    def _binary_to_string(self, binary: str) -> str:
        """Convert binary representation back to string"""
        chars = [binary[i:i+8] for i in range(0, len(binary), 8)]
        return ''.join(chr(int(char, 2)) for char in chars if len(char) == 8)
    
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
