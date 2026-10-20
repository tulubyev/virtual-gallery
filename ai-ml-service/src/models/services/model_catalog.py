"""
Каталог моделей для админ-таблицы выбора модели по задачам.

* Цены и возможности (картинки на входе, строгая JSON-схема, контекст) берутся из живого каталога
  `GET {LLM_BASE_URL}/models` (routerai.ru) и кэшируются; если каталог недоступен — действует снимок
  цен ниже (CATALOG_SNAPSHOT_DATE) и в ответе указано `price_source: "snapshot"`.
* Рекомендации и предупреждения — это наша оценка по отчёту подбора моделей (docs/AI-ML-DESIGN.md §15,
  docs/AI-MODEL-SELECTION.md). Это гипотезы до прогона tools/model_bakeoff.py на размеченных работах.
* Цена в каталоге routerai — минимум по всем провайдерам модели, а не цена провайдера со строгой схемой:
  реальная цена может быть выше (у `qwen/qwen3.8-27b` — в разы).
"""

import logging
import re
import time
from typing import Any, Dict, List, NamedTuple, Optional, Tuple

import aiohttp

from ..config import settings

logger = logging.getLogger(__name__)

CATALOG_SNAPSHOT_DATE = "2026-10-19"
CATALOG_TTL_SECONDS = 6 * 3600
MODEL_ID_RE = re.compile(r"^[a-z0-9][a-z0-9._:/@-]{2,158}$")

# Средний расход токенов на одну единицу работы (вход, выход) — допущения, без «мышления» модели.
TASK_INFO: Dict[str, Dict[str, Any]] = {
    "vision_front": {
        "title": "Описание лицевой стороны", "unit": "работа", "tokens": (9000, 1500), "needs_vision": True, "default_volume": 1000,
        "description": "Стиль, эпоха, жанр, техника, палитра и состояние по фотографии. Автор — только кандидат, без выдумывания.",
    },
    "vision_back": {
        "title": "Чтение оборота (OCR)", "unit": "работа", "tokens": (8000, 1000), "needs_vision": True, "default_volume": 1000,
        "description": "Дословная транскрипция надписей, штампов и номеров; нечитаемое помечается, а не дописывается.",
    },
    "rag_answer": {
        "title": "Ответ по найденным фрагментам (RAG)", "unit": "ответ", "tokens": (3000, 400), "needs_vision": False, "default_volume": 10000,
        "description": "Ответ посетителю только по найденным источникам, со ссылками; при нехватке данных — отказ.",
    },
    "chat": {
        "title": "Диалог с помощником", "unit": "реплика", "tokens": (1500, 300), "needs_vision": False, "default_volume": 10000,
        "description": "Свободный диалог с ИИ-куратором на сайте.",
    },
    "judge": {
        "title": "Проверка ответов и релевантности", "unit": "проверка", "tokens": (3500, 200), "needs_vision": False, "default_volume": 5000,
        "description": "Оценка верности ответа источникам и отбор фрагментов. Лучше брать модель другого вендора, чем у генератора.",
    },
    "bulk": {
        "title": "Массовые операции", "unit": "операция", "tokens": (1000, 300), "needs_vision": False, "default_volume": 20000,
        "description": "Извлечение полей, категоризация PDF, перевод, синтетические вопросы — много запросов, важна цена.",
    },
}

# Метки рекомендаций: best — «Рекомендуем», cheap — «Дёшево», top — «Максимум качества». Это гипотезы для проверки.
RECOMMENDED: Dict[str, Dict[str, List[str]]] = {
    "vision_front": {"best": ["google/gemini-3.8-flash"], "cheap": ["anthropic/claude-haiku-5.5", "google/gemini-3.5-flash-lite", "z-ai/glm-5.3-flash"], "top": ["google/gemini-4-argon", "anthropic/claude-opus-5.5"]},
    "vision_back": {"best": ["google/gemini-3.8-flash"], "cheap": ["google/gemini-3.5-flash-lite", "qwen/qwen3.6-35b-a3b"], "top": ["google/gemini-4-argon"]},
    "rag_answer": {"best": ["anthropic/claude-haiku-5.5"], "cheap": ["google/gemma-4-26b-a4b-it", "z-ai/glm-5.3-flash"], "top": ["anthropic/claude-sonnet-5.5", "google/gemini-4-argon"]},
    "chat": {"best": ["anthropic/claude-haiku-5.5"], "cheap": ["google/gemma-4-26b-a4b-it", "z-ai/glm-5.3-flash"], "top": ["anthropic/claude-sonnet-5.5"]},
    "judge": {"best": ["google/gemini-3.5-flash-lite"], "cheap": ["z-ai/glm-5.3-flash", "anthropic/claude-haiku-5.5"], "top": ["google/gemini-4-argon"]},
    "bulk": {"best": ["anthropic/claude-haiku-5.5"], "cheap": ["deepseek/deepseek-v4.1-flash", "google/gemma-4-26b-a4b-it", "z-ai/glm-5.3-flash"], "top": []},
}
RU_ONLY_RECOMMENDED = {"vision": "qwen/qwen3.6-35b-a3b", "text": "sber/gigachat-3-pro"}


class Curated(NamedTuple):
    id: str
    label: str
    vendor: str
    tier: str                      # economy | balanced | top
    price: Tuple[float, float]     # снимок цены ₽ за 1 млн токенов (вход, выход) на CATALOG_SNAPSHOT_DATE
    vision: bool
    schema: bool                   # строгая JSON-схема (structured_outputs)
    context: int
    ru_hosted: bool = False
    ru_price: Optional[Tuple[float, float]] = None   # цена на российском провайдере, если отличается от каталожной
    ru_price_known: bool = True                      # False — российская цена в каталоге не публикуется
    flex: bool = False             # есть режим flex (≈ вдвое дешевле, фоновые задачи)
    note: str = ""
    cautions: Optional[Dict[str, str]] = None        # предупреждения по задачам ("*" — для любой)


_PIN = "Строгая JSON-схема есть не у всех провайдеров routerai: закрепите провайдера (LLM_PROVIDER_ONLY=anthropic) без запасных."

CURATED: Tuple[Curated, ...] = (
    Curated("google/gemini-3.8-flash", "Gemini 3.8 Flash", "Google", "balanced", (81.53, 407.64), True, True, 1048576, flex=True,
            note="Кандидат по умолчанию для лица и оборота: высокое воздержание, лидер линейки в тестах по истории искусства.",
            cautions={"*": "Google выпускает новую версию раз в 3–4 недели — фиксируйте полный id и планируйте миграцию."}),
    Curated("google/gemini-3.5-flash-lite", "Gemini 3.5 Flash-Lite", "Google", "economy", (32.61, 271.76), True, True, 1048576, flex=True,
            note="Дёшево, воздержание выше среднего; подходит судье и массовой работе."),
    Curated("google/gemini-3.1-flash-lite", "Gemini 3.1 Flash-Lite", "Google", "economy", (27.18, 163.05), True, True, 1048576, flex=True,
            note="Самый дешёвый из Gemini; для массовых операций."),
    Curated("google/gemini-4-argon", "Gemini 4 Argon", "Google", "top", (217.41, 1087.03), True, True, 1048576, flex=True,
            note="Лучшее воздержание в независимых замерах (не выдумывает при незнании); потолок качества по цене."),
    Curated("anthropic/claude-haiku-5.5", "Claude Haiku 5.5", "Anthropic", "economy", (10.87, 54.35), True, True, 1000000,
            note="Дёшево и быстро; срок поддержки не ранее 2027-10. Независимых данных по зрению и OCR нет.",
            cautions={"*": _PIN + " Схема не должна содержать minimum/maxLength/minItems."}),
    Curated("anthropic/claude-sonnet-5.5", "Claude Sonnet 5.5", "Anthropic", "top", (217.41, 1087.03), True, True, 1000000,
            note="Сильная модель второго вендора; дорогая для массовых задач.",
            cautions={"*": _PIN}),
    Curated("anthropic/claude-opus-5.5", "Claude Opus 5.5", "Anthropic", "top", (434.81, 2174.06), True, True, 1000000,
            note="Для спорных случаев; на тысячи работ дорого.",
            cautions={"*": _PIN}),
    Curated("openai/gpt-6-luna", "GPT-6 Luna", "OpenAI", "economy", (10.87, 54.35), True, True, 1050000, flex=True,
            note="Дёшево, но склонна додумывать (низкое воздержание).",
            cautions={"vision_front": "Низкое воздержание (15–23 %): может назвать автора без оснований.",
                      "vision_back": "Для не-латиницы OCR слабее: переписывает текст в «правдоподобный».",
                      "rag_answer": "Низкое воздержание: рискует отвечать без опоры на источники."}),
    Curated("openai/gpt-6.1-sol", "GPT-6.1 Sol", "OpenAI", "top", (217.41, 1087.03), True, True, 1050000, flex=True,
            cautions={"vision_back": "Для не-латиницы OCR слабее, чем у Gemini и Qwen."}),
    Curated("qwen/qwen3.6-35b-a3b", "Qwen 3.6 35B-A3B", "Alibaba", "economy", (5.44, 76.09), True, True, 262144,
            ru_hosted=True, ru_price=(260.0, 390.0),
            note="Открытая модель (Apache-2.0). Единственная с картинками на серверах в РФ (Яндекс) — для режима «только РФ».",
            cautions={"*": "Цена в РФ (260/390 ₽ за млн токенов) намного выше каталожной минимальной."}),
    Curated("qwen/qwen3.8-27b", "Qwen 3.8 27B", "Alibaba", "economy", (2.17, 54.35), True, True, 1000000,
            note="Открытая модель (Apache-2.0). Воздержание сильно зависит от режима рассуждения.",
            cautions={"*": "Каталожная цена — у провайдера без строгой схемы; у провайдеров со схемой вход 4–16 ₽ за млн токенов."}),
    Curated("z-ai/glm-5.3-flash", "GLM 5.3 Flash", "Z.ai", "economy", (5.74, 23.91), True, True, 1048576,
            note="Очень дёшево, высокое воздержание.",
            cautions={"*": "Русский язык в карточке модели не заявлен (en/zh) — проверить на ваших данных."}),
    Curated("google/gemma-4-31b-it", "Gemma 4 31B", "Google", "economy", (10.87, 36.96), True, True, 262144,
            note="Открытая (Apache-2.0), 35+ языков."),
    Curated("google/gemma-4-26b-a4b-it", "Gemma 4 26B-A4B", "Google", "economy", (4.57, 23.91), True, True, 262144,
            note="Очень дёшево; низкая доля галлюцинаций при пересказе источников (Vectara HHEM)."),
    Curated("deepseek/deepseek-v4.1-flash", "DeepSeek V4.1 Flash", "DeepSeek", "economy", (5.74, 14.35), True, True, 1048576,
            ru_hosted=True, ru_price=(390.0, 650.0),
            note="Самая низкая цена для массовых операций.",
            cautions={"*": "В режиме Max-рассуждения воздержание падает (3,5 %): не включайте без нужды."}),
    Curated("moonshotai/kimi-k3", "Kimi K3", "Moonshot", "top", (179.36, 896.80), True, True, 1048576,
            note="Ориентир по OCR и мультимодальности; отдельная лицензия."),
    Curated("sber/gigachat-3-pro", "GigaChat 3 Pro", "Сбер", "balanced", (87.64, 211.67), False, True, 262144, ru_hosted=True,
            note="Российская модель для режима «только РФ»; картинки не принимает. Качество на русском — по данным Сбера.",
            cautions={"*": "Не принимает изображения."}),
    Curated("sber/gigachat-3.5-ultra", "GigaChat 3.5 Ultra", "Сбер", "top", (115.47, 346.33), False, True, 262144, ru_hosted=True,
            note="Российская модель; всегда рассуждает, поэтому расход токенов в 2–3 раза больше расчётного.",
            cautions={"*": "Не принимает изображения."}),
    Curated("openai/gpt-oss-120b", "gpt-oss 120B", "OpenAI (открытая)", "economy", (3.26, 16.31), False, True, 131072, ru_hosted=True, ru_price_known=False,
            note="Открытая модель, есть размещение в РФ (Яндекс); цена в РФ выше каталожной и в каталоге не публикуется.",
            cautions={"*": "Не принимает изображения. Цена на российском провайдере не известна."}),
)
CURATED_BY_ID: Dict[str, Curated] = {c.id: c for c in CURATED}


# ── живой каталог ─────────────────────────────────────────────────────────────────────

_live: Dict[str, Any] = {"fetched_at": 0.0, "models": None}


async def _fetch_models_json() -> Dict[str, Any]:
    url = settings.llm_base_url.rstrip("/") + "/models"
    headers = {"Authorization": f"Bearer {settings.llm_api_key}"} if settings.llm_api_key else {}
    timeout = aiohttp.ClientTimeout(total=20)
    async with aiohttp.ClientSession(timeout=timeout) as session:
        async with session.get(url, headers=headers) as response:
            if response.status != 200:
                raise RuntimeError(f"catalog status {response.status}")
            return await response.json(content_type=None)


def _parse_live(payload: Dict[str, Any]) -> Dict[str, Dict[str, Any]]:
    result: Dict[str, Dict[str, Any]] = {}
    for item in payload.get("data") or []:
        model_id = item.get("id")
        if not isinstance(model_id, str):
            continue
        architecture = item.get("architecture") or {}
        pricing = item.get("pricing") or {}
        try:
            price_in = round(float(pricing["prompt"]) * 1e6, 2)
            price_out = round(float(pricing["completion"]) * 1e6, 2)
        except (KeyError, TypeError, ValueError):
            price_in = price_out = None
        result[model_id] = {
            "price": (price_in, price_out) if price_in is not None else None,
            "vision": "image" in (architecture.get("input_modalities") or []),
            "text_output": "text" in (architecture.get("output_modalities") or ["text"]),
            "schema": "structured_outputs" in (item.get("supported_parameters") or []),
            "context": item.get("context_length"),
        }
    return result


async def live_catalog(force: bool = False) -> Optional[Dict[str, Dict[str, Any]]]:
    """Каталог моделей routerai (кэш 6 ч). None — каталог не получен и кэша нет."""
    fresh = _live["models"] is not None and (time.time() - _live["fetched_at"]) < CATALOG_TTL_SECONDS
    if fresh and not force:
        return _live["models"]
    try:
        _live["models"] = _parse_live(await _fetch_models_json())
        _live["fetched_at"] = time.time()
    except Exception as error:
        logger.warning("model catalog not refreshed: %s", type(error).__name__)
    return _live["models"]


def catalog_meta() -> Dict[str, Any]:
    live = _live["models"] is not None
    return {"price_source": "live" if live else "snapshot",
            "updated_at": _live["fetched_at"] if live else None, "snapshot_date": CATALOG_SNAPSHOT_DATE}


def reset_live_cache() -> None:
    _live["models"] = None
    _live["fetched_at"] = 0.0


# ── оценка стоимости ──────────────────────────────────────────────────────────────────

def unit_cost(task: str, price: Optional[Tuple[float, float]]) -> Optional[float]:
    """₽ за единицу работы по задаче (без «мышления»). None — цена неизвестна."""
    if not price or price[0] is None or price[1] is None:
        return None
    tokens_in, tokens_out = TASK_INFO[task]["tokens"]
    return round((tokens_in * price[0] + tokens_out * price[1]) / 1e6, 4)


def _effective(model: Curated, live: Optional[Dict[str, Dict[str, Any]]], mode: str) -> Dict[str, Any]:
    """Цена и возможности модели: ru_price в режиме «только РФ», иначе живой каталог, иначе снимок."""
    info = (live or {}).get(model.id)
    if mode == "ru-only" and model.ru_hosted and model.ru_price:
        price, source = model.ru_price, "ru"
    elif mode == "ru-only" and model.ru_hosted and not model.ru_price_known:
        price, source = (None, None), "unknown"
    elif info and info["price"]:
        price, source = info["price"], "live"
    else:
        price, source = model.price, "snapshot"
    return {
        "price": price, "price_source": source,
        "vision": info["vision"] if info else model.vision,
        "schema": info["schema"] if info else model.schema,
        "context": (info or {}).get("context") or model.context,
    }


def catalog_view(live: Optional[Dict[str, Dict[str, Any]]], mode: str = "global") -> List[Dict[str, Any]]:
    """Список моделей для таблицы: в режиме «только РФ» — только размещённые в РФ."""
    rows = []
    for model in CURATED:
        if mode == "ru-only" and not model.ru_hosted:
            continue
        eff = _effective(model, live, mode)
        rows.append({
            "id": model.id, "label": model.label, "vendor": model.vendor, "tier": model.tier,
            "ru_hosted": model.ru_hosted, "flex": model.flex, "vision": eff["vision"], "json_schema": eff["schema"],
            "context": eff["context"], "price_in": eff["price"][0], "price_out": eff["price"][1], "price_source": eff["price_source"],
            "note": model.note, "cautions": model.cautions or {},
            "labels": {task: _labels(task, model.id) for task in TASK_INFO},
            "cost": {task: unit_cost(task, eff["price"]) for task in TASK_INFO},
        })
    return rows


def _labels(task: str, model_id: str) -> List[str]:
    rec = RECOMMENDED.get(task, {})
    return [name for name in ("best", "cheap", "top") if model_id in rec.get(name, [])]


# ── проверка выбора ───────────────────────────────────────────────────────────────────

class Validation(NamedTuple):
    ok: bool
    error: Optional[str]
    warnings: List[str]


async def validate_choice(task: str, mode: str, model: str) -> Validation:
    if task not in TASK_INFO:
        return Validation(False, "Неизвестная задача", [])
    if mode not in ("global", "ru-only"):
        return Validation(False, "Неизвестный режим", [])
    if not isinstance(model, str):
        return Validation(False, "Некорректный идентификатор модели", [])
    if model.startswith("~") or model.endswith("-latest"):
        return Validation(False, "Алиасы «latest» не допускаются: они меняют модель без предупреждения. Укажите полный идентификатор", [])
    if not MODEL_ID_RE.match(model):
        return Validation(False, "Некорректный идентификатор модели", [])

    warnings: List[str] = []
    curated = CURATED_BY_ID.get(model)
    live = await live_catalog()
    if live is not None and model not in live:
        return Validation(False, "Такой модели нет в каталоге routerai", [])
    if live is None and curated is None:
        return Validation(False, "Каталог моделей сейчас недоступен: можно выбрать только модели из списка", [])

    if mode == "ru-only" and not (curated and curated.ru_hosted):
        return Validation(False, "В режиме «только РФ» допустимы лишь модели, размещённые в РФ", [])

    info = (live or {}).get(model)
    vision = info["vision"] if info else bool(curated and curated.vision)
    schema = info["schema"] if info else bool(curated and curated.schema)
    if TASK_INFO[task]["needs_vision"] and not vision:
        return Validation(False, "Модель не принимает изображения, а задача требует их", [])
    if info is not None and not info.get("text_output", True):
        return Validation(False, "Модель не выдаёт текст", [])
    if curated is None:
        warnings.append("Модели нет в нашем списке: качество и риски не оценивались — прогоните её на стенде сравнения перед использованием.")
    if not schema:
        warnings.append("Модель не поддерживает строгую JSON-схему: ответы придётся разбирать по запасному пути (json_object), возможны повторы.")
    if curated and curated.cautions:
        for key in (task, "*"):
            if curated.cautions.get(key):
                warnings.append(curated.cautions[key])
    return Validation(True, None, warnings)
