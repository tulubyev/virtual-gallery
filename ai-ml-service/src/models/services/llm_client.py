"""
Клиент LLM/VLM поверх OpenAI-совместимого API (по умолчанию routerai.ru).

* модель и политика отправки берутся из реестра по задаче (model_registry);
* структурный вывод: response_format=json_schema; если endpoint его не принимает — json_object
  с описанием схемы в промпте; ответ проверяется по схеме, при нарушении — один повтор с замечанием;
* в журнал пишется только метаданные запроса (задача, модель, режим, токены, время) — без содержимого.
"""

import json
import logging
import re
import time
from typing import Any, Callable, Dict, List, Optional

import jsonschema

from ..config import settings
from ..exceptions import ExternalAPIError
from . import model_registry

logger = logging.getLogger(__name__)


class LLMResult:
    def __init__(self, text: str, parsed: Optional[Dict[str, Any]], model: str, usage: Dict[str, int], latency_ms: int):
        self.text = text
        self.parsed = parsed
        self.model = model
        self.usage = usage
        self.latency_ms = latency_ms


def parse_json_text(text: str) -> Optional[Dict[str, Any]]:
    """Достать JSON-объект из ответа модели (чистый JSON, блок ```json или первый {...})."""
    if not text:
        return None
    candidates = [text.strip()]
    block = re.search(r"```(?:json)?\s*(\{[\s\S]*?\})\s*```", text)
    if block:
        candidates.append(block.group(1))
    start = text.find("{")
    if start != -1:
        depth = 0
        for index in range(start, len(text)):
            if text[index] == "{":
                depth += 1
            elif text[index] == "}":
                depth -= 1
                if depth == 0:
                    candidates.append(text[start:index + 1])
                    break
    for candidate in candidates:
        try:
            value = json.loads(candidate)
        except (json.JSONDecodeError, ValueError):
            continue
        if isinstance(value, dict):
            return value
    return None


def _usage(completion: Any) -> Dict[str, int]:
    usage = getattr(completion, "usage", None)
    result = {}
    for key in ("prompt_tokens", "completion_tokens", "total_tokens"):
        value = getattr(usage, key, None)
        if isinstance(value, int):
            result[key] = value
    return result


class LLMClient:
    def __init__(self, client_getter: Callable[[], Any]):
        # Клиент берётся через функцию, чтобы его можно было подменить в тестах и при смене настроек
        self._get_client = client_getter

    def _require_key(self) -> None:
        if not settings.llm_api_key:
            raise ExternalAPIError("llm", "api_key_not_configured")

    async def complete(
        self,
        task: str,
        messages: List[Dict[str, Any]],
        *,
        schema: Optional[Dict[str, Any]] = None,
        schema_name: str = "result",
        max_tokens: Optional[int] = None,
        mode: Optional[str] = None,
        background: bool = False,
        model: Optional[str] = None,
    ) -> LLMResult:
        """model — явный идентификатор вместо модели задачи (для сравнения моделей в tools/model_bakeoff.py)."""
        choice = model_registry.resolve(task, mode)
        if model:
            choice = choice._replace(model=model)
        kwargs: Dict[str, Any] = {
            "model": choice.model,
            "messages": messages,
            "max_tokens": max_tokens or settings.max_tokens,
            "temperature": choice.temperature,
        }
        extra_body: Dict[str, Any] = {}
        if choice.provider:
            extra_body["provider"] = choice.provider
        if background and settings.llm_background_tier:
            extra_body["service_tier"] = settings.llm_background_tier
        if extra_body:
            kwargs["extra_body"] = extra_body

        started = time.monotonic()
        text, completion = await self._call(kwargs, schema, schema_name)
        parsed = None
        if schema is not None:
            parsed = self._validated(text, schema)
            if parsed is None:
                # Один повтор: показываем модели её ответ и просим исправить формат
                retry_messages = list(messages) + [
                    {"role": "assistant", "content": text},
                    {"role": "user", "content": "Ответ не соответствует JSON-схеме. Верни только корректный JSON по схеме, без пояснений."},
                ]
                retry_kwargs = dict(kwargs, messages=retry_messages)
                text, completion = await self._call(retry_kwargs, schema, schema_name)
                parsed = self._validated(text, schema)
                if parsed is None:
                    raise ExternalAPIError("llm", "invalid_output", {"task": task, "model": choice.model})

        latency_ms = int((time.monotonic() - started) * 1000)
        usage = _usage(completion)
        # Содержимое запроса и ответа не журналируется: только метаданные
        logger.info("llm task=%s model=%s mode=%s tokens=%s latency_ms=%s", task, choice.model, choice.mode, usage, latency_ms)
        return LLMResult(text, parsed, getattr(completion, "model", None) or choice.model, usage, latency_ms)

    async def _call(self, kwargs: Dict[str, Any], schema: Optional[Dict[str, Any]], schema_name: str):
        self._require_key()
        client = self._get_client()
        call_kwargs = dict(kwargs)
        if schema is not None:
            call_kwargs["response_format"] = {
                "type": "json_schema",
                "json_schema": {"name": schema_name, "schema": schema, "strict": True},
            }
        try:
            completion = await client.chat.completions.create(**call_kwargs)
        except Exception as error:
            if schema is None or not self._is_format_rejection(error):
                logger.error("LLM request failed: %s", error)
                raise ExternalAPIError("llm", "request", {"model": kwargs["model"]}) from error
            # Endpoint не поддерживает json_schema — просим json_object и описываем схему в промпте
            fallback_kwargs = dict(kwargs)
            fallback_kwargs["response_format"] = {"type": "json_object"}
            fallback_kwargs["messages"] = list(kwargs["messages"]) + [
                {"role": "user", "content": "Верни только JSON-объект, соответствующий схеме:\n" + json.dumps(schema, ensure_ascii=False)}
            ]
            try:
                completion = await client.chat.completions.create(**fallback_kwargs)
            except Exception as second_error:
                logger.error("LLM request failed (json_object): %s", second_error)
                raise ExternalAPIError("llm", "request", {"model": kwargs["model"]}) from second_error
        content = completion.choices[0].message.content or ""
        return content, completion

    @staticmethod
    def _is_format_rejection(error: Exception) -> bool:
        status = getattr(error, "status_code", None)
        message = str(error).lower()
        return status in (400, 422) and any(word in message for word in ("response_format", "json_schema", "structured"))

    @staticmethod
    def _validated(text: str, schema: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        parsed = parse_json_text(text)
        if parsed is None:
            return None
        try:
            jsonschema.validate(parsed, schema)
        except jsonschema.ValidationError:
            return None
        return parsed
