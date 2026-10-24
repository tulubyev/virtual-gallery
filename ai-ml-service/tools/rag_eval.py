"""
Оценка RAG на золотом наборе вопросов (docs/AI-RAG-RESEARCH.md, разд. 5).

Запуск (из каталога ai-ml-service; нужны DATABASE_URL, QDRANT_URL, LLM_API_KEY, INTERNAL_API_TOKEN в окружении):

    python -m tools.rag_eval run --cases eval/golden_set.jsonl --out eval/run-2026-10-23.json [--split dev] [--access staff] [--retrieval-only]
    python -m tools.rag_eval compare eval/run-before.json eval/run-after.json [--metric hit5]

Файл вопросов — по одному в строке (формат и правила разметки — eval/README.md):
    {"id": "q1", "question": "...", "type": "fact", "split": "dev",
     "answerable": true, "relevant": [{"document_id": "catalog-1", "page": 7, "phrase": "родился в 1879 году"}]}
    {"id": "q2", "question": "Сколько стоит картина X?", "type": "adversarial", "split": "dev",
     "answerable": false, "relevant": []}

Релевантность проверяется по паре (документ, страница), а не по номеру фрагмента: набор переживает смену нарезки.
Если в записи нет `page`, подходит любая страница документа. Необязательное `phrase` — дословный кусок текста, где лежит ответ:
по нему считаются «Ответ в тексте@5» и «Ответ в контексте» (есть ли ответ в самих фрагментах, а не только на нужной странице).

Метрики:
* поиск: Hit@5 / Hit@20 (есть ли в первых k хоть один релевантный), Recall@5 / Recall@20 (доля найденных релевантных мест),
  MRR@10, nDCG@10 — только по отвечаемым вопросам; «Ответ в тексте@5» — есть ли фраза-ответ в первых 5 фрагментах,
  «Ответ в контексте» — в том, что реально получила модель (находки и соседние фрагменты);
* ответ: доля отказов на неотвечаемых (цель ≥ 0,9), доля ложных отказов на отвечаемых, нарушения цитат
  (ответ перепроверяется тем же кодом, что в продакшене; цель — 0), задержка P50/P95.
Разницу меньше 2–3 п. на 150 вопросах считайте шумом: `compare` даёт парный бутстрэп по вопросам.
"""

import argparse
import asyncio
import json
import math
import random
import re
import statistics
import sys
import time
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Sequence, Tuple

QUESTION_TYPES = ("fact", "bio", "topic", "alias", "catalog", "unanswerable", "adversarial")
SPLITS = ("dev", "test", "fresh")           # fresh — вопросы, написанные после того, как test использовали для разбора ошибок


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
            raise ValueError(f"строка {number}: split должен быть один из: " + ", ".join(SPLITS))
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

def holds_answer(passages: Sequence[Dict[str, Any]], relevant: Sequence[Dict[str, Any]]) -> float:
    """1.0, если в этих фрагментах есть ответ. Место с `phrase` засчитывается, когда фраза встречается в тексте фрагмента
    того же документа (после той же нормализации, что у проверки цитат; страница не важна: ответ бывает в соседнем
    фрагменте на стыке страниц). Место без `phrase` — по документу и странице, как в остальных метриках."""
    from src.models.services.rag_answer import normalize
    texts: Dict[int, str] = {}
    for item in relevant:
        phrase = item.get("phrase")
        for number, passage in enumerate(passages):
            if passage["document_id"] != item["document_id"]:
                continue
            if phrase:
                texts.setdefault(number, normalize(passage.get("content") or ""))
                if normalize(phrase) in texts[number]:
                    return 1.0
            elif item.get("page") is None or item["page"] == passage.get("page_number"):
                return 1.0
    return 0.0


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
    # каждое релевантное место (документ, страница) считается один раз — на первой позиции, где оно встретилось:
    # иначе несколько фрагментов одной страницы раздувают nDCG выше 1
    matched: set = set()
    dcg = 0.0
    for i, passage in enumerate(passages[:10], start=1):
        new_places = {n for n, item in enumerate(relevant) if n not in matched
                      and item["document_id"] == passage["document_id"]
                      and (item.get("page") is None or item["page"] == passage.get("page_number"))}
        if new_places:
            matched |= new_places
            dcg += 1.0 / math.log2(i + 1)
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
    for key in ("hit5", "hit20", "recall5", "recall20", "mrr10", "ndcg10", "text_hit5", "context_hit"):
        values = [r["metrics"][key] for r in answerable if r.get("metrics") and key in r["metrics"]]
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


def _yes_no(value: Optional[float]) -> str:
    return "—" if value is None else ("да" if value else "нет")


def _fmt(value: Optional[float], digits: int = 3) -> str:
    return "—" if value is None else f"{value:.{digits}f}"


_SECRET_LIKE = re.compile(r"(?i)(bearer\s+\S+|sk-[\w-]{8,}|[A-Za-z0-9_\-]{32,}|://[^\s/]*@|\?\S+)")


def safe_message(error: BaseException, limit: int = 240) -> str:
    """Текст ошибки для отчёта без ключей, токенов, паролей в адресах и строк запроса: файл прогона не должен их хранить."""
    return _SECRET_LIKE.sub("[скрыто]", " ".join(str(error).split()))[:limit]


def render_failures(results: Sequence[Dict[str, Any]]) -> str:
    """Вопросы, на которых прогон упал: без них отчёт молча считался бы по меньшему числу вопросов."""
    failed = [r for r in results if "error" in r]
    if not failed:
        return ""
    lines = ["", f"## Сбои при прогоне ({len(failed)} из {len(results)}) — в таблицу не вошли", ""]
    lines += [f"- `{r['id']}`: {r['error']}" + (f" — {r['error_detail']}" if r.get("error_detail") else "")
              for r in failed[:20]]
    if len(failed) > 20:
        lines.append(f"- … и ещё {len(failed) - 20}")
    return "\n".join(lines) + "\n"


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

    lines += ["| Группа | N | Hit@5 | Recall@5 | Recall@20 | MRR@10 | nDCG@10 | Ответ в тексте@5 | Ответ в контексте "
              "| Отказ на неотв. | Ложный отказ | Нарушения цитат | P95, с |",
              "|---|---|---|---|---|---|---|---|---|---|---|---|---|"]
    for name, part in groups:
        s = summarize(part)
        ci = s["hit5_ci"]
        hit5 = _fmt(s["hit5"]) + (f" ({ci[0]:.2f}–{ci[1]:.2f})" if ci else "")
        lines.append(f"| {name} | {s['questions']} | {hit5} | {_fmt(s['recall5'])} | {_fmt(s['recall20'])} | {_fmt(s['mrr10'])} "
                     f"| {_fmt(s['ndcg10'])} | {_fmt(s['text_hit5'])} | {_fmt(s['context_hit'])} | {_fmt(s.get('refusal_precision'))} | {_fmt(s.get('false_refusal_rate'))} "
                     f"| {s.get('citation_violations', '—')} | {_fmt(s['latency_p95'], 1)} |")

    misses = [r for r in results if r["answerable"] and r.get("metrics") and r["metrics"]["hit20"] == 0.0]
    wrong = [r for r in results if r.get("outcome") and ((not r["answerable"] and r["outcome"] == "answered")
                                                          or (r.get("violations")))]
    lines += ["", f"## Не найдено в первых 20 ({len(misses)})", ""]
    lines += [f"- `{r['id']}` ({r['type']}): {r['question']}" for r in misses] or ["—"]
    lines += ["", f"## Ответили там, где нужен был отказ, или нарушены цитаты ({len(wrong)})", ""]
    lines += [f"- `{r['id']}` ({r['type']}): {r['question']} → {r['outcome']}" +
              (f"; нарушения: {'; '.join(r['violations'])}" if r.get("violations") else "") for r in wrong] or ["—"]
    refused = [r for r in results if r["answerable"] and r.get("outcome") in ("insufficient_evidence", "no_sources")]
    if refused:
        lines += ["", f"## Отказ на вопросе с ответом ({len(refused)})", ""]
        lines += [f"- `{r['id']}` ({r['type']}): {r['question']} → {r['outcome']}; ответ в контексте: "
                  + _yes_no((r.get("metrics") or {}).get("context_hit")) for r in refused]
    no_context = [r for r in results if r["answerable"] and (r.get("metrics") or {}).get("context_hit") == 0.0]
    if no_context:
        lines += ["", f"## Ответа нет в контексте модели ({len(no_context)})", ""]
        lines += [f"- `{r['id']}` ({r['type']}): {r['question']} → {r.get('outcome', 'без ответа модели')}; "
                  f"в первых 20: {_yes_no((r.get('metrics') or {}).get('hit20'))}" for r in no_context]
    unconfirmed = [r for r in results if r.get("outcome") == "citations_failed"]
    if unconfirmed:
        lines += ["", f"## Ответ не прошёл проверку цитат, показан отказ ({len(unconfirmed)})", ""]
        lines += [f"- `{r['id']}` ({r['type']}, {'ответ есть' if r['answerable'] else 'ответа нет'}): {r['question']}"
                  + (f"; причины: {'; '.join(r['problems'])}" if r.get("problems") else "") for r in unconfirmed]
    return "\n".join(lines) + "\n"


# ---------- прогон ----------

async def run_case(case: Dict[str, Any], access: str, mode: str, retrieval_only: bool,
                   model: Optional[str] = None, rerank_mode: Optional[str] = None,
                   rerank_model: Optional[str] = None) -> Dict[str, Any]:
    from src.models.services import rag_answer
    from src.models.services.rerank import configured_mode, rerank
    from src.models.services.retrieval import expand_context, hybrid_search

    started = time.monotonic()
    record: Dict[str, Any] = {k: case[k] for k in ("id", "question", "type", "split", "answerable")}
    found = await hybrid_search(case["question"], access=access, top=20)
    record["degraded"] = found.degraded
    # Тот же порядок, что в продакшене: после поиска — реранк (если включён), затем сбор контекста
    record["rerank"] = rerank_mode or configured_mode()
    found.passages = await rerank(case["question"], found.passages, mode=record["rerank"], model=rerank_model)
    record["retrieved"] = [{"document_id": p["document_id"], "page": p["page_number"], "chunk": p["chunk_index"],
                            **({"rerank_score": p["rerank_score"]} if "rerank_score" in p else {})}
                           for p in found.passages]
    # Контекст собирается тем же кодом, что в продакшене: находки и соседние фрагменты
    sources = await expand_context(found.passages, access=access)
    record["context"] = [{"document_id": p["document_id"], "page": p["page_number"], "chunk": p["chunk_index"],
                          "neighbor": p.get("neighbor", False)} for p in sources]
    if case["answerable"]:
        record["metrics"] = {**retrieval_metrics(found.passages, case["relevant"]),
                             "text_hit5": holds_answer(found.passages[:5], case["relevant"]),
                             "context_hit": holds_answer(sources, case["relevant"])}
    if not retrieval_only:
        result = await rag_answer.answer(case["question"], sources, mode, model=model)
        record["model"] = result.get("model")
        record["outcome"] = result["outcome"]
        record["answer"] = result["answer"]
        # Повторная проверка тем же кодом, что в продакшене: ловит расхождение между проверкой и показом
        if result.get("problems"):
            record["problems"] = result["problems"]
        if result["outcome"] == "answered":
            record["violations"] = rag_answer.violations(
                {"insufficient_evidence": False, "blocks": result["blocks"]}, sources, mode)
    record["seconds"] = round(time.monotonic() - started, 2)
    return record


async def run(cases: List[Dict[str, Any]], access: str, mode: str, retrieval_only: bool,
              concurrency: int = 3, model: Optional[str] = None, rerank_mode: Optional[str] = None,
              rerank_model: Optional[str] = None) -> List[Dict[str, Any]]:
    semaphore = asyncio.Semaphore(concurrency)

    async def one(case: Dict[str, Any]) -> Dict[str, Any]:
        async with semaphore:
            try:
                return await run_case(case, access, mode, retrieval_only, model, rerank_mode, rerank_model)
            except Exception as error:               # один сбой не должен терять весь прогон
                return {**{k: case[k] for k in ("id", "question", "type", "split", "answerable")},
                        "error": type(error).__name__, "error_detail": safe_message(error), "seconds": None}

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
    run_parser.add_argument("--model", help="модель для ответа вместо выбранной в админ-панели (например, z-ai/glm-5.3-flash)")
    run_parser.add_argument("--retrieval-only", action="store_true", help="только поиск, без вызова модели (бесплатно)")
    run_parser.add_argument("--rerank", choices=("off", "llm"), help="переранжирование: off | llm (по умолчанию как RAG_RERANK в окружении)")
    run_parser.add_argument("--rerank-model", help="модель реранкера вместо выбранной для задачи judge в админ-панели")
    cmp_parser = sub.add_parser("compare")
    cmp_parser.add_argument("before", type=Path)
    cmp_parser.add_argument("after", type=Path)
    cmp_parser.add_argument("--metric", default="hit5", choices=("hit5", "hit20", "recall5", "recall20", "mrr10", "ndcg10", "text_hit5", "context_hit"))
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
    from src.models.services.model_settings import model_settings

    async def go() -> List[Dict[str, Any]]:
        await db_service.connect()
        init_qdrant()
        try:
            await model_settings.load()     # как в ядре: модель, выбранная администратором, иначе значения из окружения
        except Exception:
            pass
        try:
            return await run(cases, args.access, args.mode, args.retrieval_only, model=args.model,
                             rerank_mode=args.rerank, rerank_model=args.rerank_model)
        finally:
            await db_service.disconnect()

    results = asyncio.run(go())
    args.out.write_text(json.dumps(results, ensure_ascii=False, indent=1), encoding="utf-8")
    title = f"Оценка RAG, модель {args.model}" if args.model else "Оценка RAG"
    if results and results[0].get("rerank") == "llm":
        title += ", реранк llm"
    report = render_report([r for r in results if "error" not in r], title) + render_failures(results)
    args.out.with_suffix(".md").write_text(report, encoding="utf-8")
    failed = [r for r in results if "error" in r]
    print(report)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
