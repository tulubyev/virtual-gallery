"""
Оценка RAG на золотом наборе вопросов (docs/AI-RAG-RESEARCH.md, разд. 5).

Запуск (из каталога ai-ml-service; нужны DATABASE_URL, QDRANT_URL, LLM_API_KEY, INTERNAL_API_TOKEN в окружении):

    python -m tools.rag_eval run --cases eval/golden_set.jsonl --out eval/run-2026-10-23.json [--split dev] [--access staff] [--retrieval-only]
    python -m tools.rag_eval compare eval/run-before.json eval/run-after.json [--metric hit5]

Файл вопросов — по одному в строке (формат и правила разметки — eval/README.md):
    {"id": "q1", "question": "...", "type": "fact", "split": "dev",
     "answerable": true, "relevant": [{"document_id": "catalog-1", "page": 7}]}
    {"id": "q2", "question": "Сколько стоит картина X?", "type": "adversarial", "split": "dev",
     "answerable": false, "relevant": []}

Релевантность проверяется по паре (документ, страница), а не по номеру фрагмента: набор переживает смену нарезки.
Если в записи нет `page`, подходит любая страница документа.

Метрики:
* поиск: Hit@5 / Hit@20 (есть ли в первых k хоть один релевантный), Recall@5 / Recall@20 (доля найденных релевантных мест),
  MRR@10, nDCG@10 — только по отвечаемым вопросам;
* ответ: доля отказов на неотвечаемых (цель ≥ 0,9), доля ложных отказов на отвечаемых, нарушения цитат
  (ответ перепроверяется тем же кодом, что в продакшене; цель — 0), задержка P50/P95.
Разницу меньше 2–3 п. на 150 вопросах считайте шумом: `compare` даёт парный бутстрэп по вопросам.
"""

import argparse
import asyncio
import json
import math
import random
import statistics
import sys
import time
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Sequence, Tuple

QUESTION_TYPES = ("fact", "bio", "topic", "alias", "catalog", "unanswerable", "adversarial")
SPLITS = ("dev", "test")


# ---------- набор вопросов ----------

def load_cases(path: Path) -> List[Dict[str, Any]]:
    cases: List[Dict[str, Any]] = []
    seen = set()
    for number, line in enumerate(Path(path).read_text(encoding="utf-8").splitlines(), start=1):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        try:
            case = json.loads(line)
        except json.JSONDecodeError as error:
            raise ValueError(f"строка {number}: не JSON ({error.msg})") from error
        for key in ("id", "question", "answerable"):
            if key not in case:
                raise ValueError(f"строка {number}: нет поля «{key}»")
        if case["id"] in seen:
            raise ValueError(f"строка {number}: повторяется id «{case['id']}»")
        seen.add(case["id"])
        case.setdefault("relevant", [])
        case.setdefault("split", "dev")
        case.setdefault("type", "fact")
        if case["split"] not in SPLITS:
            raise ValueError(f"строка {number}: split должен быть dev или test")
        if case["answerable"] and not case["relevant"]:
            raise ValueError(f"строка {number}: у отвечаемого вопроса нет релевантных мест")
        if not case["answerable"] and case["relevant"]:
            raise ValueError(f"строка {number}: у неотвечаемого вопроса не должно быть релевантных мест")
        cases.append(case)
    return cases


def is_relevant(passage: Dict[str, Any], relevant: Sequence[Dict[str, Any]]) -> bool:
    return any(item["document_id"] == passage["document_id"]
               and (item.get("page") is None or item["page"] == passage.get("page_number"))
               for item in relevant)


# ---------- метрики поиска ----------

def retrieval_metrics(passages: Sequence[Dict[str, Any]], relevant: Sequence[Dict[str, Any]]) -> Dict[str, float]:
    flags = [is_relevant(p, relevant) for p in passages]

    def hit(k: int) -> float:
        return 1.0 if any(flags[:k]) else 0.0

    def recall(k: int) -> float:
        found = sum(1 for item in relevant if any(
            p["document_id"] == item["document_id"] and (item.get("page") is None or item["page"] == p.get("page_number"))
            for p in passages[:k]))
        return found / len(relevant)

    first = next((i for i, f in enumerate(flags[:10], start=1) if f), None)
    dcg = sum(1.0 / math.log2(i + 1) for i, f in enumerate(flags[:10], start=1) if f)
    ideal = sum(1.0 / math.log2(i + 1) for i in range(1, min(len(relevant), 10) + 1))
    return {"hit5": hit(5), "hit20": hit(20), "recall5": recall(5), "recall20": recall(20),
            "mrr10": 1.0 / first if first else 0.0, "ndcg10": dcg / ideal if ideal else 0.0}


# ---------- статистика ----------

def percentile(values: Sequence[float], q: float) -> Optional[float]:
    if not values:
        return None
    ordered = sorted(values)
    index = min(len(ordered) - 1, max(0, math.ceil(q * len(ordered)) - 1))
    return ordered[index]


def mean(values: Iterable[float]) -> Optional[float]:
    values = list(values)
    return sum(values) / len(values) if values else None


def bootstrap_ci(values: Sequence[float], rounds: int = 2000, seed: int = 7) -> Optional[Tuple[float, float]]:
    """95 % доверительный интервал среднего (перцентильный бутстрэп по вопросам)."""
    if len(values) < 2:
        return None
    rng = random.Random(seed)
    means = sorted(sum(rng.choices(values, k=len(values))) / len(values) for _ in range(rounds))
    return means[int(0.025 * rounds)], means[int(0.975 * rounds) - 1]


def paired_bootstrap(before: Sequence[float], after: Sequence[float], rounds: int = 5000,
                     seed: int = 7) -> Dict[str, Any]:
    """Разность средних (after − before) по одним и тем же вопросам, 95 % интервал и доля выборок с улучшением."""
    if len(before) != len(after) or not before:
        raise ValueError("нужны списки одинаковой ненулевой длины")
    diffs = [a - b for a, b in zip(after, before)]
    rng = random.Random(seed)
    samples = sorted(sum(rng.choices(diffs, k=len(diffs))) / len(diffs) for _ in range(rounds))
    delta = sum(diffs) / len(diffs)
    low, high = samples[int(0.025 * rounds)], samples[int(0.975 * rounds) - 1]
    return {"delta": delta, "low": low, "high": high, "significant": low > 0 or high < 0,
            "improved_share": sum(1 for s in samples if s > 0) / rounds}


# ---------- свод ----------

def summarize(results: Sequence[Dict[str, Any]]) -> Dict[str, Any]:
    """Метрики по списку результатов (см. run_case): поиск — по отвечаемым, отказы — по обеим группам."""
    answerable = [r for r in results if r["answerable"]]
    unanswerable = [r for r in results if not r["answerable"]]
    summary: Dict[str, Any] = {"questions": len(results), "answerable": len(answerable), "unanswerable": len(unanswerable)}
    for key in ("hit5", "hit20", "recall5", "recall20", "mrr10", "ndcg10"):
        values = [r["metrics"][key] for r in answerable if r.get("metrics")]
        summary[key] = mean(values)
        summary[key + "_ci"] = bootstrap_ci(values)
    answered = [r for r in results if r.get("outcome")]
    if answered:
        summary["refusal_precision"] = mean(1.0 if r["outcome"] != "answered" else 0.0 for r in answered if not r["answerable"])
        summary["false_refusal_rate"] = mean(1.0 if r["outcome"] != "answered" else 0.0 for r in answered if r["answerable"])
        summary["citation_violations"] = sum(len(r.get("violations") or []) > 0 for r in answered)
        summary["answered"] = sum(1 for r in answered if r["outcome"] == "answered")
        summary["unconfirmed"] = sum(1 for r in answered if r["outcome"] == "citations_failed")
    times = [r["seconds"] for r in results if r.get("seconds") is not None]
    summary["latency_p50"], summary["latency_p95"] = percentile(times, 0.5), percentile(times, 0.95)
    return summary


def _fmt(value: Optional[float], digits: int = 3) -> str:
    return "—" if value is None else f"{value:.{digits}f}"


def render_report(results: Sequence[Dict[str, Any]], title: str = "Оценка RAG") -> str:
    lines = [f"# {title}", ""]
    groups = [("все", list(results))]
    for split in SPLITS:
        part = [r for r in results if r["split"] == split]
        if part:
            groups.append((f"split={split}", part))
    for qtype in QUESTION_TYPES:
        part = [r for r in results if r["type"] == qtype]
        if part:
            groups.append((f"тип={qtype}", part))

    lines += ["| Группа | N | Hit@5 | Recall@5 | Recall@20 | MRR@10 | nDCG@10 | Отказ на неотв. | Ложный отказ | Нарушения цитат | P95, с |",
              "|---|---|---|---|---|---|---|---|---|---|---|"]
    for name, part in groups:
        s = summarize(part)
        ci = s["hit5_ci"]
        hit5 = _fmt(s["hit5"]) + (f" ({ci[0]:.2f}–{ci[1]:.2f})" if ci else "")
        lines.append(f"| {name} | {s['questions']} | {hit5} | {_fmt(s['recall5'])} | {_fmt(s['recall20'])} | {_fmt(s['mrr10'])} "
                     f"| {_fmt(s['ndcg10'])} | {_fmt(s.get('refusal_precision'))} | {_fmt(s.get('false_refusal_rate'))} "
                     f"| {s.get('citation_violations', '—')} | {_fmt(s['latency_p95'], 1)} |")

    misses = [r for r in results if r["answerable"] and r.get("metrics") and r["metrics"]["hit20"] == 0.0]
    wrong = [r for r in results if r.get("outcome") and ((not r["answerable"] and r["outcome"] == "answered")
                                                          or (r.get("violations")))]
    lines += ["", f"## Не найдено в первых 20 ({len(misses)})", ""]
    lines += [f"- `{r['id']}` ({r['type']}): {r['question']}" for r in misses] or ["—"]
    lines += ["", f"## Ответили там, где нужен был отказ, или нарушены цитаты ({len(wrong)})", ""]
    lines += [f"- `{r['id']}` ({r['type']}): {r['question']} → {r['outcome']}" +
              (f"; нарушения: {'; '.join(r['violations'])}" if r.get("violations") else "") for r in wrong] or ["—"]
    return "\n".join(lines) + "\n"


# ---------- прогон ----------

async def run_case(case: Dict[str, Any], access: str, mode: str, retrieval_only: bool) -> Dict[str, Any]:
    from src.models.services import rag_answer
    from src.models.services.retrieval import hybrid_search

    started = time.monotonic()
    record: Dict[str, Any] = {k: case[k] for k in ("id", "question", "type", "split", "answerable")}
    found = await hybrid_search(case["question"], access=access, top=20)
    record["degraded"] = found.degraded
    record["retrieved"] = [{"document_id": p["document_id"], "page": p["page_number"], "chunk": p["chunk_index"]}
                           for p in found.passages]
    if case["answerable"]:
        record["metrics"] = retrieval_metrics(found.passages, case["relevant"])
    if not retrieval_only:
        sources = found.passages[:8]
        result = await rag_answer.answer(case["question"], sources, mode)
        record["outcome"] = result["outcome"]
        record["answer"] = result["answer"]
        # Повторная проверка тем же кодом, что в продакшене: ловит расхождение между проверкой и показом
        if result["outcome"] == "answered":
            record["violations"] = rag_answer.violations(
                {"insufficient_evidence": False, "blocks": result["blocks"]}, sources, mode)
    record["seconds"] = round(time.monotonic() - started, 2)
    return record


async def run(cases: List[Dict[str, Any]], access: str, mode: str, retrieval_only: bool,
              concurrency: int = 3) -> List[Dict[str, Any]]:
    semaphore = asyncio.Semaphore(concurrency)

    async def one(case: Dict[str, Any]) -> Dict[str, Any]:
        async with semaphore:
            try:
                return await run_case(case, access, mode, retrieval_only)
            except Exception as error:               # один сбой не должен терять весь прогон
                return {**{k: case[k] for k in ("id", "question", "type", "split", "answerable")},
                        "error": type(error).__name__, "seconds": None}

    return await asyncio.gather(*(one(c) for c in cases))


def compare(before: Sequence[Dict[str, Any]], after: Sequence[Dict[str, Any]], metric: str = "hit5") -> Dict[str, Any]:
    old = {r["id"]: r["metrics"][metric] for r in before if r.get("metrics")}
    new = {r["id"]: r["metrics"][metric] for r in after if r.get("metrics")}
    ids = sorted(set(old) & set(new))
    if not ids:
        raise ValueError("в прогонах нет общих отвечаемых вопросов")
    return {"metric": metric, "questions": len(ids), **paired_bootstrap([old[i] for i in ids], [new[i] for i in ids])}


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(description="Оценка RAG на золотом наборе")
    sub = parser.add_subparsers(dest="command", required=True)
    run_parser = sub.add_parser("run")
    run_parser.add_argument("--cases", required=True, type=Path)
    run_parser.add_argument("--out", required=True, type=Path, help="JSON с результатами; рядом ляжет .md с отчётом")
    run_parser.add_argument("--split", choices=SPLITS)
    run_parser.add_argument("--access", choices=("public", "staff"), default="staff")
    run_parser.add_argument("--mode", choices=("public", "curator"), default="public")
    run_parser.add_argument("--retrieval-only", action="store_true", help="только поиск, без вызова модели (бесплатно)")
    cmp_parser = sub.add_parser("compare")
    cmp_parser.add_argument("before", type=Path)
    cmp_parser.add_argument("after", type=Path)
    cmp_parser.add_argument("--metric", default="hit5", choices=("hit5", "hit20", "recall5", "recall20", "mrr10", "ndcg10"))
    args = parser.parse_args(argv)

    if args.command == "compare":
        outcome = compare(json.loads(args.before.read_text(encoding="utf-8")),
                          json.loads(args.after.read_text(encoding="utf-8")), args.metric)
        verdict = "различие значимо" if outcome["significant"] else "различие в пределах шума"
        print(f"{outcome['metric']}: {outcome['delta']:+.3f} (95 %: {outcome['low']:+.3f}…{outcome['high']:+.3f}), "
              f"вопросов {outcome['questions']} — {verdict}")
        return 0

    cases = load_cases(args.cases)
    if args.split:
        cases = [c for c in cases if c["split"] == args.split]
    from src.models.services.database import db_service
    from src.models.services.qdrant_client import init_qdrant

    async def go() -> List[Dict[str, Any]]:
        await db_service.connect()
        init_qdrant()
        try:
            return await run(cases, args.access, args.mode, args.retrieval_only)
        finally:
            await db_service.disconnect()

    results = asyncio.run(go())
    args.out.write_text(json.dumps(results, ensure_ascii=False, indent=1), encoding="utf-8")
    report = render_report([r for r in results if "error" not in r])
    args.out.with_suffix(".md").write_text(report, encoding="utf-8")
    failed = [r for r in results if "error" in r]
    print(report)
    if failed:
        print(f"Сбоев при прогоне: {len(failed)} ({', '.join(r['id'] for r in failed[:10])})", file=sys.stderr)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
