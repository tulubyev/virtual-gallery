"""Метрики стенда сравнения моделей (tools/model_bakeoff.py) — без сети."""

import pytest

from tools import model_bakeoff as b


def test_cer_and_item_matching():
    assert b.cer("ИНВ-45", "инв-45") == 0.0
    assert b.cer("1954", "1964") == pytest.approx(0.25)
    assert b.cer("", "") == 0.0 and b.cer("", "x") == 1.0
    assert b.items_match("Галерея Н", "галерея н.")        # мелкая опечатка допустима
    assert not b.items_match("Галерея Н", "Галерея М и К")


def test_recall_precision_counts_extras_as_possible_inventions():
    recall, precision = b.recall_precision(["И. Иванов", "1954"], ["И. Иванов", "1954", "Петров"])
    assert recall == 1.0 and precision == pytest.approx(2 / 3)
    assert b.recall_precision([], []) == (None, 1.0)
    assert b.recall_precision(["a"], []) == (0.0, None)


def test_score_back_uses_only_expected_categories():
    expected = {"raw_text": "И. Иванов\n1954", "signatures": ["И. Иванов"], "dates": ["1954"]}
    got = {"raw_text": "И. Иванов 1954", "signatures": ["И. Иванов"], "dates": [], "stamps": ["лишний штамп"]}
    scores = b.score_back(expected, got)
    assert scores["cer"] == 0.0
    assert scores["signatures_recall"] == 1.0 and scores["dates_recall"] == 0.0
    assert "stamps_recall" not in scores


def test_score_front_flags_invented_attribution():
    expected = {"style": "реализм", "period": "XIX век", "technique": "масло, холст", "genre": "пейзаж",
                "suggested_artist": None, "color_palette": ["зелёный", "охра"]}
    good = {"style": "Реализм", "period": "XIX век", "technique": "масло по холсту", "genre": "пейзаж",
            "suggested_artist": None, "color_palette": ["зелёный", "охра", "серый"]}
    bad = dict(good, style="барокко", suggested_artist="Шишкин")
    assert b.score_front(expected, good)["fields_match"] == 1.0
    assert b.score_front(expected, good)["invented_attribution"] == 0.0
    assert b.score_front(expected, bad)["invented_attribution"] == 1.0
    assert b.score_front(expected, bad)["fields_match"] < 1.0
    assert b.score_front({"suggested_artist": "Шишкин"}, {"suggested_artist": "И. Шишкин"})["artist_match"] == 1.0


def test_cost_and_summary_and_report():
    assert b.rub_cost({"prompt_tokens": 8000, "completion_tokens": 2000}, (10.9, 54.4)) == pytest.approx(0.196, abs=1e-3)
    assert b.rub_cost({}, (1, 1)) is None and b.rub_cost({"prompt_tokens": 1}, None) is None
    rows = [
        {"ok": True, "metrics": {"cer": 0.1}, "latency_s": 2.0, "cost_rub": 0.2},
        {"ok": False, "metrics": {}, "latency_s": None, "cost_rub": None},
    ]
    summary = b.summarize(rows)
    assert summary["schema_ok"] == 0.5 and summary["cer"] == pytest.approx(0.1) and summary["latency_s"] == 2.0
    report = b.render_report({"model/a": summary})
    assert "model/a" in report and "0.50" in report and "| Модель |" in report
