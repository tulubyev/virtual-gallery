"""
Сравнение моделей на размеченных работах: какая модель лучше читает оборот и описывает лицо.

Запуск (из каталога ai-ml-service, нужен LLM_API_KEY и INTERNAL_API_TOKEN/DATABASE_URL в окружении):

    python -m tools.model_bakeoff --cases cases.jsonl \
        --models anthropic/claude-sonnet-5.5,google/gemini-2.5-flash,qwen/qwen3-vl-30b-a3b-instruct \
        --out report.md [--mode global]

Файл cases.jsonl — по одной работе в строке:
    {"id": "w1", "task": "back", "image": "/путь/к/фото.jpg",
     "expected": {"raw_text": "...", "signatures": ["..."], "stamps": [], "labels": [], "inventory_numbers": [], "dates": []}}
    {"id": "w2", "task": "front", "image": "/путь/к/фото.jpg",
     "expected": {"style": "...", "period": "...", "technique": "...", "genre": "...", "suggested_artist": null,
                  "color_palette": ["..."]}}
В expected оставляйте только то, в чём куратор уверен. Для лица `null` означает «автор не установлен»:
любое названное моделью имя считается выдуманной атрибуцией.

Метрики (все считаются автоматически, итог решает человек):
* оборот: CER дословной транскрипции, полнота и точность по категориям надписей (точность = доля найденного,
  что есть в эталоне; найденное сверх эталона — возможная выдумка), доля «нечитаемого» на пустых местах не учитывается;
* лицо: доля совпавших полей (стиль, эпоха, техника, жанр), пересечение палитры, число выдуманных атрибуций;
* общее: доля ответов, прошедших схему, задержка, токены, стоимость в ₽ по ценам каталога.
"""

import argparse
import asyncio
import json
import re
import statistics
import sys
import urllib.request
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple

BACK_CATEGORIES = ("signatures", "stamps", "labels", "inventory_numbers", "dates")
FRONT_FIELDS = ("style", "period", "technique", "genre")


# ---------- метрики (без сети; покрыты тестами) ----------

def normalize(text: Optional[str]) -> str:
    return re.sub(r"\s+", " ", (text or "").lower().replace("ё", "е")).strip()


def levenshtein(a: str, b: str) -> int:
    if a == b:
        return 0
    if not a or not b:
        return max(len(a), len(b))
    previous = list(range(len(b) + 1))
    for i, char_a in enumerate(a, 1):
        current = [i]
        for j, char_b in enumerate(b, 1):
            current.append(min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (char_a != char_b)))
        previous = current
    return previous[-1]


def cer(reference: str, hypothesis: str) -> float:
    """Доля ошибочных символов относительно эталона (0 — идеально; может быть больше 1)."""
    ref, hyp = normalize(reference), normalize(hypothesis)
    if not ref:
        return 0.0 if not hyp else 1.0
    return levenshtein(ref, hyp) / len(ref)


def items_match(expected: str, got: str) -> bool:
    e, g = normalize(expected), normalize(got)
    return bool(e) and (e == g or cer(e, g) <= 0.2)


def recall_precision(expected: Iterable[str], got: Iterable[str]) -> Tuple[Optional[float], Optional[float]]:
    expected, got = list(expected), list(got)
    found = sum(1 for e in expected if any(items_match(e, g) for g in got))
    correct = sum(1 for g in got if any(items_match(e, g) for e in expected))
    recall = found / len(expected) if expected else None
    precision = correct / len(got) if got else (1.0 if not expected else None)
    return recall, precision


def tokens(text: Optional[str]) -> set:
    """Слова, усечённые до первых пяти букв: грубо, но сглаживает падежи («холст» и «холсту»)."""
    return {word[:5] for word in re.findall(r"\w+", normalize(text))}


def field_match(expected: Optional[str], got: Optional[str]) -> bool:
    te, tg = tokens(expected), tokens(got)
    if not te:
        return not tg
    return bool(tg) and len(te & tg) / len(te | tg) >= 0.34


def score_back(expected: Dict[str, Any], got: Dict[str, Any]) -> Dict[str, Optional[float]]:
    result: Dict[str, Optional[float]] = {}
    if "raw_text" in expected:
        result["cer"] = cer(expected["raw_text"], got.get("raw_text", ""))
    for category in BACK_CATEGORIES:
        if category in expected:
            recall, precision = recall_precision(expected[category], got.get(category, []))
            result[f"{category}_recall"], result[f"{category}_precision"] = recall, precision
    return result


def score_front(expected: Dict[str, Any], got: Dict[str, Any]) -> Dict[str, Optional[float]]:
    result: Dict[str, Optional[float]] = {}
    present = [f for f in FRONT_FIELDS if f in expected]
    if present:
        result["fields_match"] = sum(field_match(expected[f], got.get(f)) for f in present) / len(present)
    if expected.get("color_palette"):
        te, tg = tokens(" ".join(expected["color_palette"])), tokens(" ".join(got.get("color_palette", [])))
        result["palette_overlap"] = len(te & tg) / len(te | tg) if te | tg else None
    if "suggested_artist" in expected:
        named = bool(got.get("suggested_artist"))
        if expected["suggested_artist"] is None:
            result["invented_attribution"] = 1.0 if named else 0.0
        else:
            result["artist_match"] = 1.0 if named and field_match(expected["suggested_artist"], got["suggested_artist"]) else 0.0
    return result


def rub_cost(usage: Dict[str, int], prices: Optional[Tuple[float, float]]) -> Optional[float]:
    """Стоимость в ₽: prices — (цена входа, цена выхода) за 1 млн токенов."""
    if not prices or "prompt_tokens" not in usage:
        return None
    return (usage["prompt_tokens"] * prices[0] + usage.get("completion_tokens", 0) * prices[1]) / 1e6


def summarize(rows: List[Dict[str, Any]]) -> Dict[str, Any]:
    def mean(key):
        values = [r[key] for r in rows if r.get(key) is not None]
        return statistics.mean(values) if values else None
    metric_keys = sorted({k for r in rows for k in r["metrics"]})
    summary = {
        "cases": len(rows),
        "schema_ok": sum(1 for r in rows if r["ok"]) / len(rows) if rows else 0.0,
        "latency_s": mean("latency_s"),
        "cost_rub": mean("cost_rub"),
    }
    for key in metric_keys:
        values = [r["metrics"][key] for r in rows if r["metrics"].get(key) is not None]
        summary[key] = statistics.mean(values) if values else None
    return summary


def render_report(summaries: Dict[str, Dict[str, Any]]) -> str:
    keys = sorted({k for s in summaries.values() for k in s if k not in ("cases", "schema_ok", "latency_s", "cost_rub")})
    header = ["Модель", "Работ", "Схема ок", "Задержка, с", "₽/работу"] + keys
    lines = ["| " + " | ".join(header) + " |", "|" + "---|" * len(header)]

    def fmt(value, digits=3):
        return "—" if value is None else (f"{value:.{digits}f}" if isinstance(value, float) else str(value))
    for model, s in summaries.items():
        row = [model, fmt(s["cases"]), fmt(s["schema_ok"], 2), fmt(s["latency_s"], 1), fmt(s["cost_rub"], 2)]
        row += [fmt(s.get(k), 2) for k in keys]
        lines.append("| " + " | ".join(row) + " |")
    lines.append("\nCER — чем меньше, тем лучше; *_recall, *_precision, fields_match, palette_overlap, artist_match — чем больше, "
                 "тем лучше; invented_attribution — доля выдуманных авторов (меньше лучше).")
    return "\n".join(lines)


# ---------- запуск (сеть) ----------

def load_prices(base_url: str) -> Dict[str, Tuple[float, float]]:
    with urllib.request.urlopen(base_url.rstrip("/") + "/models", timeout=30) as response:  # каталог открыт без ключа
        data = json.load(response)["data"]
    return {m["id"]: (float(m["pricing"]["prompt"]) * 1e6, float(m["pricing"].get("completion", 0)) * 1e6) for m in data}


async def run(args) -> str:
    from src.models.config import settings
    from src.models.services.ai_service import ai_service
    from src.models.services.artwork_schemas import (
        BACK_SCHEMA, BACK_SYSTEM_PROMPT, BACK_USER_TEXT, FRONT_SCHEMA, FRONT_SYSTEM_PROMPT, FRONT_USER_TEXT)
    from src.models.services.safe_fetch import sniff_image_mime

    cases = [json.loads(line) for line in Path(args.cases).read_text(encoding="utf-8").splitlines() if line.strip()]
    prices = load_prices(settings.llm_base_url)
    summaries: Dict[str, Dict[str, Any]] = {}
    for model in args.models.split(","):
        rows = []
        for case in cases:
            data = Path(case["image"]).read_bytes()
            mime = sniff_image_mime(data)
            if mime is None:
                raise SystemExit(f"{case['id']}: не jpeg/png/webp")
            front = case["task"] == "front"
            messages = ai_service._vision_messages(
                FRONT_SYSTEM_PROMPT if front else BACK_SYSTEM_PROMPT, FRONT_USER_TEXT if front else BACK_USER_TEXT, [(data, mime)])
            row: Dict[str, Any] = {"id": case["id"], "ok": False, "metrics": {}, "latency_s": None, "cost_rub": None}
            try:
                result = await ai_service.llm.complete(
                    "vision_front" if front else "vision_back", messages, schema=FRONT_SCHEMA if front else BACK_SCHEMA,
                    schema_name="front" if front else "back", max_tokens=3000, mode=args.mode, model=model)
                row.update(ok=True, latency_s=result.latency_ms / 1000, cost_rub=rub_cost(result.usage, prices.get(model)))
                row["metrics"] = (score_front if front else score_back)(case["expected"], result.parsed)
            except Exception as error:  # модель может не поддерживать картинки/схему — это тоже результат сравнения
                print(f"{model} {case['id']}: {error}", file=sys.stderr)
            rows.append(row)
        summaries[model] = summarize(rows)
    return render_report(summaries)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--cases", required=True)
    parser.add_argument("--models", required=True, help="идентификаторы из каталога через запятую")
    parser.add_argument("--out", default="bakeoff_report.md")
    parser.add_argument("--mode", default="global", choices=["global", "ru-only"])
    args = parser.parse_args()
    report = asyncio.run(run(args))
    Path(args.out).write_text(report + "\n", encoding="utf-8")
    print(report)


if __name__ == "__main__":
    main()
