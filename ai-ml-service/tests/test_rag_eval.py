"""Метрики и свод оценки RAG (tools/rag_eval.py) — без сети и БД."""

import json
from pathlib import Path

import pytest

from tools import rag_eval as ev


def passage(doc, page, chunk=0):
    return {"document_id": doc, "page_number": page, "chunk_index": chunk}


def test_relevance_is_by_document_and_page_not_chunk():
    relevant = [{"document_id": "a", "page": 3}, {"document_id": "b"}]
    assert ev.is_relevant(passage("a", 3, chunk=99), relevant)
    assert not ev.is_relevant(passage("a", 4), relevant)
    assert ev.is_relevant(passage("b", 17), relevant)             # без page подходит любая страница
    assert not ev.is_relevant(passage("c", 3), relevant)


def test_retrieval_metrics_rank_sensitive():
    relevant = [{"document_id": "a", "page": 1}]
    first = ev.retrieval_metrics([passage("a", 1), passage("x", 1)], relevant)
    third = ev.retrieval_metrics([passage("x", 1), passage("y", 1), passage("a", 1)], relevant)
    late = ev.retrieval_metrics([passage("x", i) for i in range(10)] + [passage("a", 1)], relevant)
    none = ev.retrieval_metrics([passage("x", 1)], relevant)
    assert first["mrr10"] == 1.0 and first["ndcg10"] == pytest.approx(1.0) and first["hit5"] == 1.0
    assert third["mrr10"] == pytest.approx(1 / 3) and third["ndcg10"] == pytest.approx(0.5)
    assert late["hit5"] == 0.0 and late["hit20"] == 1.0 and late["mrr10"] == 0.0
    assert none["hit20"] == 0.0 and none["recall20"] == 0.0


def test_recall_counts_distinct_relevant_places():
    relevant = [{"document_id": "a", "page": 1}, {"document_id": "a", "page": 2}]
    metrics = ev.retrieval_metrics([passage("a", 1, 0), passage("a", 1, 1), passage("z", 0)], relevant)
    assert metrics["recall5"] == 0.5 and metrics["hit5"] == 1.0


def test_load_cases_validates(tmp_path):
    good = tmp_path / "g.jsonl"
    good.write_text('# комментарий\n{"id":"1","question":"q","answerable":true,"relevant":[{"document_id":"a"}]}\n'
                    '{"id":"2","question":"q2","answerable":false}\n', encoding="utf-8")
    cases = ev.load_cases(good)
    assert [c["split"] for c in cases] == ["dev", "dev"] and cases[1]["relevant"] == []

    def bad(text):
        path = tmp_path / "b.jsonl"
        path.write_text(text, encoding="utf-8")
        with pytest.raises(ValueError):
            ev.load_cases(path)

    bad('{"id":"1","question":"q","answerable":true}\n')                                  # нет релевантных мест
    bad('{"id":"1","question":"q","answerable":false,"relevant":[{"document_id":"a"}]}\n')
    bad('{"id":"1","question":"q","answerable":false}\n{"id":"1","question":"q","answerable":false}\n')
    bad('{"id":"1","question":"q"}\n')
    bad('не json\n')
    bad('{"id":"1","question":"q","answerable":false,"split":"prod"}\n')


def test_shipped_example_file_is_valid():
    from pathlib import Path

    cases = ev.load_cases(Path(__file__).resolve().parents[1] / "eval" / "golden_set.example.jsonl")
    assert {c["type"] for c in cases} >= {"fact", "unanswerable", "adversarial"}


def test_bootstrap_helpers():
    assert ev.percentile([1, 2, 3, 4], 0.5) == 2 and ev.percentile([], 0.5) is None
    low, high = ev.bootstrap_ci([1.0] * 50 + [0.0] * 50)
    assert 0.35 < low < 0.5 < high < 0.65
    assert ev.bootstrap_ci([1.0]) is None
    same = ev.paired_bootstrap([1, 0, 1, 0] * 10, [1, 0, 1, 0] * 10)
    assert same["delta"] == 0 and not same["significant"]
    better = ev.paired_bootstrap([0.0] * 40, [1.0] * 40)
    assert better["significant"] and better["improved_share"] == 1.0
    with pytest.raises(ValueError):
        ev.paired_bootstrap([1], [1, 2])


def result(id_, answerable, hit5, outcome=None, violations=None, qtype="fact", split="dev"):
    record = {"id": id_, "question": "q " + id_, "type": qtype, "split": split, "answerable": answerable, "seconds": 1.0}
    if answerable:
        record["metrics"] = {"hit5": hit5, "hit20": hit5, "recall5": hit5, "recall20": hit5, "mrr10": hit5, "ndcg10": hit5}
    if outcome:
        record["outcome"] = outcome
    if violations is not None:
        record["violations"] = violations
    return record


def test_summary_and_report():
    results = [result("a", True, 1.0, "answered", []), result("b", True, 0.0, "insufficient_evidence"),
               result("c", False, 0.0, "insufficient_evidence", qtype="unanswerable"),
               result("d", False, 0.0, "answered", ["цитата не найдена"], qtype="adversarial", split="test")]
    summary = ev.summarize(results)
    assert summary["hit5"] == 0.5 and summary["refusal_precision"] == 0.5 and summary["false_refusal_rate"] == 0.5
    assert summary["citation_violations"] == 1
    report = ev.render_report(results)
    assert "тип=adversarial" in report and "`d`" in report and "цитата не найдена" in report
    assert "`b`" in report                                                    # не найден в первых 20


def test_compare_pairs_by_question_id():
    before = [result("a", True, 0.0), result("b", True, 1.0), result("n", False, 0.0)]
    after = [result("a", True, 1.0), result("b", True, 1.0), result("n", False, 0.0)]
    outcome = ev.compare(before, after)
    assert outcome["questions"] == 2 and outcome["delta"] == 0.5
    with pytest.raises(ValueError):
        ev.compare(before, [result("zzz", True, 1.0)])


@pytest.mark.asyncio
async def test_run_keeps_going_after_single_failure():
    from unittest.mock import AsyncMock, patch

    async def fake_case(case, access, mode, retrieval_only):
        if case["id"] == "bad":
            raise RuntimeError("model_not_found, key sk-abcdef1234567890abcdef at https://user:pw@host/x?token=abc")
        return {"id": case["id"], "seconds": 0.1}

    cases = [{"id": "ok", "question": "q", "type": "fact", "split": "dev", "answerable": True},
             {"id": "bad", "question": "q", "type": "fact", "split": "dev", "answerable": True}]
    with patch.object(ev, "run_case", fake_case):
        out = await ev.run(cases, "staff", "public", True)
    dumped = json.dumps(out)
    assert out[0]["id"] == "ok" and out[1]["error"] == "RuntimeError"
    assert "model_not_found" in out[1]["error_detail"]
    assert "sk-abcdef" not in dumped and "user:pw" not in dumped and "token=abc" not in dumped


def test_ndcg_counts_each_relevant_place_once():
    # три фрагмента одной релевантной страницы не должны давать nDCG > 1
    passages = [{"document_id": "d", "page_number": 1}] * 3
    metrics = ev.retrieval_metrics(passages, [{"document_id": "d", "page": 1}])
    assert metrics["ndcg10"] == pytest.approx(1.0)


def test_bundled_golden_set_matches_corpus_manifest():
    root = Path(ev.__file__).resolve().parent.parent / "eval"
    cases = ev.load_cases(root / "siberia-art.golden.jsonl")
    manifest_ids = {line.split("\t")[0] for line in (root / "corpus" / "manifest.tsv").read_text(encoding="utf-8").splitlines()
                    if line and not line.startswith("#")}
    assert len(cases) == 30 and len(manifest_ids) == 10
    used = {item["document_id"] for case in cases for item in case["relevant"]}
    assert used <= manifest_ids
    assert all(case["relevant"] for case in cases if case["answerable"])
    assert not any(case["relevant"] for case in cases if not case["answerable"])


def test_failures_are_listed_in_report_with_message():
    results = [{"id": "q-1", "question": "?", "type": "fact", "split": "dev", "answerable": True,
                "error": "ExternalAPIError", "error_detail": "model_not_found"},
               {"id": "q-2", "question": "?", "type": "fact", "split": "dev", "answerable": True, "metrics": {}}]
    text = ev.render_failures(results)
    assert "1 из 2" in text and "`q-1`: ExternalAPIError — model_not_found" in text
    assert ev.render_failures([results[1]]) == ""
