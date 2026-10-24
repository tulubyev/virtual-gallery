"""Реестр моделей, клиент LLM (структурный вывод, повтор, запасной режим) и разбор лица/оборота."""

import json
import logging
from unittest.mock import AsyncMock, MagicMock, patch

import jsonschema
import pytest

from src.models.config import settings
from src.models.exceptions import ConfigurationError, ExternalAPIError
from src.models.services import artwork_schemas, model_registry
from src.models.services.ai_service import ai_service
from src.models.services.llm_client import LLMClient, parse_json_text

FRONT_OK = {
    "suggested_title": None, "description": "Пейзаж с рекой.", "style": "реализм", "period": "XIX век",
    "technique": "масло, холст", "genre": "пейзаж", "composition": "горизонтальная, рекa по диагонали",
    "color_palette": ["зелёный", "охра"], "artistic_elements": ["свет"], "condition_notes": None,
    "visible_text": [], "suggested_artist": None, "attribution_basis": None, "influences": [],
    "uncertainties": ["точная дата неизвестна"],
}
BACK_OK = {
    "signatures": ["И. Иванов"], "stamps": [], "labels": ["Галерея N, № 12"], "inventory_numbers": ["ИНВ-45"],
    "inscriptions": [], "dates": ["1954"], "gallery_marks": [], "auction_marks": [], "provenance": None,
    "conservation_notes": None, "raw_text": "И. Иванов\n1954\nИНВ-45", "illegible": ["нижний угол, не разобрать"],
    "languages": ["ru"], "contains_personal_data": False,
}


def completion(text, model="m", total=10):
    choice = MagicMock()
    choice.message.content = text
    result = MagicMock()
    result.choices = [choice]
    result.model = model
    result.usage = MagicMock(prompt_tokens=7, completion_tokens=3, total_tokens=total)
    return result


class FormatRejected(Exception):
    status_code = 400

    def __init__(self):
        super().__init__("response_format json_schema is not supported by this provider")


def make_client(side_effect):
    client = MagicMock()
    client.chat.completions.create = AsyncMock(side_effect=side_effect)
    return client


# ---------- реестр моделей ----------

def test_registry_defaults_and_per_task_temperature():
    choice = model_registry.resolve("vision_back", "global")
    assert choice.model == settings.model_vision_back
    assert choice.temperature == 0.0 and choice.provider is None
    assert model_registry.resolve("chat", "global").temperature == 0.5


def test_registry_ru_only_pins_country_and_disables_fallbacks():
    text = model_registry.resolve("chat", "ru-only")
    vision = model_registry.resolve("vision_front", "ru-only")
    assert text.model == settings.model_ru_only_text and vision.model == settings.model_ru_only_vision
    for choice in (text, vision):
        assert choice.provider == {"country": "ru", "allow_fallbacks": False}


def test_registry_provider_only_from_settings(monkeypatch):
    monkeypatch.setattr(settings, "llm_provider_only", "anthropic, google-vertex")
    assert model_registry.resolve("rag_answer", "global").provider == {
        "only": ["anthropic", "google-vertex"], "allow_fallbacks": False}


def test_registry_rejects_unknown_task_and_mode():
    with pytest.raises(ConfigurationError):
        model_registry.resolve("nope")
    with pytest.raises(ConfigurationError):
        model_registry.resolve("chat", "moon")


# ---------- клиент ----------

@pytest.mark.asyncio
async def test_complete_sends_schema_policy_and_returns_parsed():
    client = make_client([completion(json.dumps(FRONT_OK, ensure_ascii=False))])
    result = await LLMClient(lambda: client).complete(
        "vision_front", [{"role": "user", "content": "x"}], schema=artwork_schemas.FRONT_SCHEMA, schema_name="front", mode="ru-only")
    kwargs = client.chat.completions.create.call_args.kwargs
    assert kwargs["model"] == settings.model_ru_only_vision
    assert kwargs["temperature"] == 0.3
    assert kwargs["response_format"]["type"] == "json_schema"
    assert kwargs["response_format"]["json_schema"]["strict"] is True
    assert kwargs["extra_body"] == {"provider": {"country": "ru", "allow_fallbacks": False}}
    assert result.parsed == FRONT_OK and result.usage["total_tokens"] == 10


@pytest.mark.asyncio
async def test_complete_retries_once_on_invalid_output_then_succeeds():
    client = make_client([completion("не JSON"), completion(json.dumps(BACK_OK, ensure_ascii=False))])
    result = await LLMClient(lambda: client).complete(
        "vision_back", [{"role": "user", "content": "x"}], schema=artwork_schemas.BACK_SCHEMA)
    assert result.parsed == BACK_OK
    assert client.chat.completions.create.await_count == 2
    retry_messages = client.chat.completions.create.call_args_list[1].kwargs["messages"]
    assert retry_messages[-2] == {"role": "assistant", "content": "не JSON"}
    assert "JSON" in retry_messages[-1]["content"]


@pytest.mark.asyncio
async def test_complete_fails_after_second_invalid_output():
    wrong = dict(FRONT_OK)
    del wrong["description"]  # нарушает required
    client = make_client([completion(json.dumps(wrong)), completion(json.dumps(wrong))])
    with pytest.raises(ExternalAPIError):
        await LLMClient(lambda: client).complete("vision_front", [{"role": "user", "content": "x"}], schema=artwork_schemas.FRONT_SCHEMA)


@pytest.mark.asyncio
async def test_complete_falls_back_to_json_object_when_schema_rejected():
    client = make_client([FormatRejected(), completion(json.dumps(FRONT_OK, ensure_ascii=False))])
    result = await LLMClient(lambda: client).complete("vision_front", [{"role": "user", "content": "x"}], schema=artwork_schemas.FRONT_SCHEMA)
    assert result.parsed == FRONT_OK
    fallback = client.chat.completions.create.call_args_list[1].kwargs
    assert fallback["response_format"] == {"type": "json_object"}
    assert "schema" in fallback["messages"][-1]["content"].lower() or "схем" in fallback["messages"][-1]["content"]


@pytest.mark.asyncio
async def test_complete_wraps_provider_errors_without_details():
    client = make_client(RuntimeError("10.0.0.5 refused"))
    with pytest.raises(ExternalAPIError) as info:
        await LLMClient(lambda: client).complete("chat", [{"role": "user", "content": "x"}])
    assert "10.0.0.5" not in info.value.message


@pytest.mark.asyncio
async def test_complete_requires_api_key(monkeypatch):
    monkeypatch.setattr(settings, "llm_api_key", "")
    client = make_client([completion("x")])
    with pytest.raises(ExternalAPIError):
        await LLMClient(lambda: client).complete("chat", [{"role": "user", "content": "x"}])
    client.chat.completions.create.assert_not_called()


@pytest.mark.asyncio
async def test_background_tier_and_no_content_in_logs(monkeypatch, caplog):
    monkeypatch.setattr(settings, "llm_background_tier", "flex")
    client = make_client([completion("секретный ответ")])
    with caplog.at_level(logging.INFO):
        await LLMClient(lambda: client).complete("bulk", [{"role": "user", "content": "секретный вопрос"}], background=True)
    assert client.chat.completions.create.call_args.kwargs["extra_body"]["service_tier"] == "flex"
    assert "секретн" not in caplog.text and "task=bulk" in caplog.text


def test_parse_json_text_variants():
    assert parse_json_text('{"a": 1}') == {"a": 1}
    assert parse_json_text('Вот ответ:\n```json\n{"a": 2}\n```') == {"a": 2}
    assert parse_json_text('текст до {"a": {"b": 3}} текст после') == {"a": {"b": 3}}
    assert parse_json_text("[1, 2]") is None and parse_json_text("") is None


# ---------- схемы и промпты ----------

def _check_strict(schema):
    assert schema["additionalProperties"] is False
    assert set(schema["required"]) == set(schema["properties"])


def test_schemas_are_strict_and_accept_examples():
    for schema, example in ((artwork_schemas.FRONT_SCHEMA, FRONT_OK), (artwork_schemas.BACK_SCHEMA, BACK_OK)):
        _check_strict(schema)
        jsonschema.validate(example, schema)
    bad = dict(FRONT_OK, confidence=0.9)  # лишнее поле запрещено
    with pytest.raises(jsonschema.ValidationError):
        jsonschema.validate(bad, artwork_schemas.FRONT_SCHEMA)


def test_prompts_forbid_verdicts_and_confidence_numbers():
    for prompt in (artwork_schemas.FRONT_SYSTEM_PROMPT, artwork_schemas.BACK_SYSTEM_PROMPT):
        assert "подлинност" in prompt
        assert "уверенности" in prompt
    assert "confidence" not in json.dumps(artwork_schemas.FRONT_SCHEMA) + json.dumps(artwork_schemas.BACK_SCHEMA)


# ---------- разбор лица и оборота ----------

@pytest.mark.asyncio
async def test_analyze_artwork_front_and_back_use_schema_and_vision_message():
    png = b"\x89PNG\r\n\x1a\n" + b"\x00" * 16
    with patch("src.models.services.ai_service.fetch_image", AsyncMock(return_value=(png, "image/png"))), \
         patch.object(ai_service, "client") as mock_client:
        mock_client.chat.completions.create = AsyncMock(side_effect=[
            completion(json.dumps(FRONT_OK, ensure_ascii=False)), completion(json.dumps(BACK_OK, ensure_ascii=False))])
        front = await ai_service.analyze_artwork_front("https://example.org/f.png")
        back = await ai_service.analyze_artwork_back("https://example.org/b.png")

    assert front == FRONT_OK and back == BACK_OK
    front_call, back_call = mock_client.chat.completions.create.call_args_list
    assert front_call.kwargs["model"] == settings.model_vision_front
    assert back_call.kwargs["model"] == settings.model_vision_back
    user = front_call.kwargs["messages"][1]["content"]
    assert user[1]["image_url"]["url"].startswith("data:image/png;base64,")
    assert front_call.kwargs["messages"][0]["content"] == artwork_schemas.FRONT_SYSTEM_PROMPT
    assert back_call.kwargs["response_format"]["json_schema"]["name"] == "artwork_back"


@pytest.mark.asyncio
async def test_embeddings_unavailable_in_ru_only(monkeypatch):
    monkeypatch.setattr(settings, "llm_mode", "ru-only")
    with pytest.raises(ConfigurationError):
        await ai_service.generate_embeddings(["текст"])


def empty_completion(error=None):
    result = MagicMock(spec=["choices", "model", "usage", "error", "model_extra"])
    result.choices = None
    result.error = error
    result.model_extra = None
    return result


@pytest.mark.asyncio
async def test_empty_choices_on_json_schema_falls_back_to_json_object(caplog):
    gateway_error = {"message": "provider does not support response_format json_schema", "code": 400}
    client = make_client([empty_completion(gateway_error), completion(json.dumps(FRONT_OK, ensure_ascii=False))])
    with caplog.at_level(logging.WARNING):
        result = await LLMClient(lambda: client).complete(
            "vision_front", [{"role": "user", "content": "x"}], schema=artwork_schemas.FRONT_SCHEMA)
    assert result.parsed == FRONT_OK
    assert client.chat.completions.create.call_args_list[1].kwargs["response_format"] == {"type": "json_object"}
    assert "response_format json_schema" in caplog.text


@pytest.mark.asyncio
async def test_empty_choices_everywhere_raises_clear_error(caplog):
    client = make_client([empty_completion({"message": "model not available"}), empty_completion({"message": "model not available"})])
    with caplog.at_level(logging.ERROR), pytest.raises(ExternalAPIError) as info:
        await LLMClient(lambda: client).complete(
            "vision_front", [{"role": "user", "content": "x"}], schema=artwork_schemas.FRONT_SCHEMA)
    assert "empty_response" in str(info.value)
    assert "model not available" in caplog.text


@pytest.mark.asyncio
async def test_empty_choices_without_schema_raises_without_retry():
    client = make_client([empty_completion()])
    with pytest.raises(ExternalAPIError):
        await LLMClient(lambda: client).complete("chat", [{"role": "user", "content": "x"}])
    assert client.chat.completions.create.await_count == 1
