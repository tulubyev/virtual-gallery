"""
AI service for OpenAI API integrations
"""

import openai
import logging
from typing import Dict, Any, List, Optional
import base64
from ..config import settings
from ..exceptions import ExternalAPIError
from .safe_fetch import fetch_image

logger = logging.getLogger(__name__)

class AIService:
    """AI service for OpenRouter/OpenAI API calls"""

    def __init__(self):
        # Use OpenRouter if API key is available, otherwise fallback to OpenAI
        if hasattr(settings, 'openrouter_api_key') and settings.openrouter_api_key:
            self.client = openai.AsyncOpenAI(
                api_key=settings.openrouter_api_key,
                base_url="https://openrouter.ai/api/v1"
            )
            self.use_openrouter = True
        else:
            self.client = openai.AsyncOpenAI(
                api_key=settings.openai_api_key,
                base_url=settings.openai_base_url
            )
            self.use_openrouter = False

    async def analyze_image(self, image_url: str, prompt: Optional[str] = None) -> Dict[str, Any]:
        """Analyze image using OpenAI Vision API"""
        try:
            if prompt is None:
                prompt = """
                Analyze this artwork image and provide detailed information about:
                1. Art style and period
                2. Subject matter and composition
                3. Colors and techniques used
                4. Notable artistic elements
                5. Historical or cultural context if recognizable
                6. Overall artistic quality assessment

                Provide your analysis in a structured JSON format with confidence scores.
                """

            # Скачиваем безопасно (белый список хостов, лимит размера), тип определяем по содержимому
            image_data, image_mime = await fetch_image(image_url)
            base64_image = base64.b64encode(image_data).decode('utf-8')

            # Call Vision API (via OpenRouter or OpenAI)
            vision_model = settings.vision_model if hasattr(settings, 'vision_model') else "openai/gpt-4-vision-preview"
            response = await self.client.chat.completions.create(
                model=vision_model,
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:{image_mime};base64,{base64_image}"
                                }
                            }
                        ]
                    }
                ],
                max_tokens=settings.max_tokens,
                temperature=settings.temperature
            )

            analysis_text = response.choices[0].message.content

            return {
                "analysis": analysis_text,
                "model": response.model,
                "usage": {
                    "prompt_tokens": response.usage.prompt_tokens,
                    "completion_tokens": response.usage.completion_tokens,
                    "total_tokens": response.usage.total_tokens
                }
            }

        except Exception as e:
            logger.error(f"Image analysis failed: {e}")
            raise

    async def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Эмбеддинги текста через OpenAI-совместимый API.

        Запасных («хеш-») векторов нет: при ошибке вызова или несовпадении размерности
        бросается исключение, чтобы в Qdrant не попали векторы без смысла.
        """
        try:
            response = await self.client.embeddings.create(
                input=texts,
                model=settings.default_embedding_model
            )
        except Exception as e:
            logger.error(f"Embedding generation failed: {e}")
            raise ExternalAPIError("embeddings", "create", {"model": settings.default_embedding_model}) from e

        vectors = [item.embedding for item in response.data]
        if len(vectors) != len(texts):
            raise ExternalAPIError("embeddings", "count_mismatch", {"expected": len(texts), "got": len(vectors)})
        for vector in vectors:
            if len(vector) != settings.vector_dimension:
                raise ExternalAPIError(
                    "embeddings", "dimension_mismatch",
                    {"expected": settings.vector_dimension, "got": len(vector), "model": settings.default_embedding_model}
                )
        return vectors

    async def generate_text(self, prompt: str, context: Optional[str] = None,
                          max_tokens: Optional[int] = None) -> Dict[str, Any]:
        """Generate text using OpenAI chat completion"""
        try:
            messages = [{"role": "system", "content": "You are a helpful art expert assistant."}]

            if context:
                messages.append({"role": "system", "content": f"Context: {context}"})

            messages.append({"role": "user", "content": prompt})

            generation_model = settings.default_generation_model
            response = await self.client.chat.completions.create(
                model=generation_model,
                messages=messages,
                max_tokens=max_tokens or settings.max_tokens,
                temperature=settings.temperature
            )

            return {
                "response": response.choices[0].message.content,
                "model": response.model,
                "usage": {
                    "prompt_tokens": response.usage.prompt_tokens,
                    "completion_tokens": response.usage.completion_tokens,
                    "total_tokens": response.usage.total_tokens
                }
            }

        except Exception as e:
            logger.error(f"Text generation failed: {e}")
            raise

    async def analyze_artwork_front(self, image_url: str) -> Dict[str, Any]:
        """Analyze front side of artwork - style, technique, composition, description"""
        try:
            prompt = """
            Проанализируй это изображение произведения искусства и предоставь структурированный анализ.
            
            Ответь строго в формате JSON со следующими полями:
            {
                "suggested_title": "предлагаемое название если не указано",
                "suggested_artist": "предполагаемый автор или школа",
                "style": "художественный стиль (импрессионизм, реализм, барокко и т.д.)",
                "period": "примерный период создания (XIX век, 1880-е и т.д.)",
                "technique": "техника исполнения (масло на холсте, акварель и т.д.)",
                "genre": "жанр (портрет, пейзаж, натюрморт и т.д.)",
                "composition": "описание композиции",
                "color_palette": ["основные цвета"],
                "description": "подробное описание произведения на 2-3 предложения",
                "artistic_elements": ["ключевые художественные элементы"],
                "influences": ["возможные влияния или сходство с другими мастерами"],
                "condition_notes": "заметки о состоянии если видно",
                "confidence": 0.85
            }
            
            Отвечай только JSON без дополнительного текста.
            """
            
            result = await self.analyze_image(image_url, prompt)
            
            analysis_text = result.get("analysis", "")
            parsed = self._parse_json_response(analysis_text)
            
            if parsed:
                return parsed
            
            return {
                "suggested_title": "Без названия",
                "suggested_artist": "Неизвестен",
                "style": "Не определен",
                "period": "Не указан",
                "technique": "Не определена",
                "description": analysis_text,
                "confidence": 0.5
            }
            
        except Exception as e:
            logger.error(f"Front artwork analysis failed: {e}")
            raise

    async def analyze_artwork_back(self, image_url: str) -> Dict[str, Any]:
        """Analyze back side of artwork - OCR for signatures, provenance, stamps"""
        try:
            prompt = """
            Проанализируй обратную сторону произведения искусства.
            Найди и распознай текст (OCR): подписи, штампы, наклейки, инвентарные номера, провенанс.
            
            Ответь строго в формате JSON со следующими полями:
            {
                "signatures": ["найденные подписи"],
                "stamps": ["найденные штампы и печати"],
                "labels": ["наклейки галерей или аукционов"],
                "inventory_numbers": ["инвентарные или каталожные номера"],
                "inscriptions": ["надписи и заметки"],
                "provenance": "восстановленная история владения",
                "dates": ["найденные даты"],
                "gallery_marks": ["отметки галерей"],
                "auction_marks": ["отметки аукционов"],
                "conservation_notes": "заметки о реставрации если есть",
                "authenticity_indicators": ["признаки подлинности"],
                "raw_text": "весь распознанный текст",
                "confidence": 0.8
            }
            
            Отвечай только JSON без дополнительного текста.
            """
            
            result = await self.analyze_image(image_url, prompt)
            
            analysis_text = result.get("analysis", "")
            parsed = self._parse_json_response(analysis_text)
            
            if parsed:
                return parsed
            
            return {
                "signatures": [],
                "stamps": [],
                "labels": [],
                "provenance": None,
                "raw_text": analysis_text,
                "confidence": 0.3
            }
            
        except Exception as e:
            logger.error(f"Back artwork analysis failed: {e}")
            raise

    def _parse_json_response(self, text: str) -> Optional[Dict[str, Any]]:
        """Parse JSON from LLM response with robust handling"""
        import json
        import re
        
        if not text:
            return None
        
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            pass
        
        try:
            start = text.find('{')
            if start == -1:
                return None
            
            depth = 0
            end = start
            for i, char in enumerate(text[start:], start):
                if char == '{':
                    depth += 1
                elif char == '}':
                    depth -= 1
                    if depth == 0:
                        end = i + 1
                        break
            
            json_str = text[start:end]
            return json.loads(json_str)
        except (json.JSONDecodeError, ValueError):
            pass
        
        try:
            code_block = re.search(r'```(?:json)?\s*(\{[\s\S]*?\})\s*```', text)
            if code_block:
                return json.loads(code_block.group(1))
        except (json.JSONDecodeError, ValueError):
            pass
        
        logger.warning(f"Failed to parse JSON from response: {text[:200]}...")
        return None

# Global AI service instance
ai_service = AIService()