"""Карточка произведения: черновик по документам и перевод (services/card_draft.py, routes/cards.py)."""

from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from fastapi.testclient import TestClient

from src.models.services import card_draft, retrieval

AUTH = {"X-Internal-Token": "test-internal-token-0123456789"}

SOURCES = [
    {"document_id": "d1", "title": "Каталог", "page_number": 7, "license": None, "access": "public",
     "content": "«Чёрный квадрат» написан Казимиром Малевичем в 1915 году. Размер холста — 79,5 × 79,5 см."},
    {"document_id": "d2", "title": "Очерк", "page_number": 2, "license": "CC0", "access": "staff",
     "content": "Малевич основал супрематизм — направление абстрактного искусства. Работа экспонировалась в 1915 году в Петрограде."},
]
PASSPORT = {"title": "Чёрный квадрат", "artist_name": "Казимир Малевич", "year_created": 1915, "dating_text": "1915", "inventory_number": "Ж-1"}


def frag(text="Картину написал Малевич.", block="about_work", ids=(1,), quote="написан Казимиром Малевичем", confidence="established"):
    return {"block": block, "text": text, "confidence": confidence, "source_ids": list(ids), "quote": quote}


def llm_returning(*outputs):
    results = [SimpleNamespace(parsed=o, text="{}", model="test/model", usage={"total_tokens": 10}) for o in outputs]
    return AsyncMock(side_effect=results)


def drafts(fragments, missing=(), warnings=()):
    return {"fragments": list(fragments), "missing": list(missing), "warnings": list(warnings)}


# ---------- проверка фрагмента ----------

def test_good_fragment_passes():
    assert card_draft.fragment_problems(frag(), SOURCES) == []
    assert card_draft.fragment_problems(frag("Работа показывалась в Петрограде в 1915 году.", "exhibitions", (2,), "экспонировалась в 1915 году"), SOURCES) == []


@pytest.mark.parametrize("fragment, expected", [
    (frag(quote="написан Василием Кандинским"), "цитата не найдена"),
    (frag("Картину написал Малевич в 1920 году."), "чисел"),
    (frag("Картину написал Кандинский."), "имён"),
    (frag("Это подлинная работа Малевича."), "подлинности"),
    (frag(ids=(1, 2)), "ровно один источник"),
    (frag(ids=()), "ровно один источник"),
    (frag(ids=(5,)), "нет источника"),
    (frag(quote=""), "нет цитаты"),
    (frag(quote=" ".join(["слово"] * 26)), "длиннее 25 слов"),
    (frag(block="tour"), "неизвестный блок"),
    (frag(text="   "), "пустой текст"),
    (frag(text="а" * 701), "длиннее"),
    (frag(confidence="sure"), "confidence"),
])
def test_bad_fragments_are_rejected_with_reason(fragment, expected):
    problems = card_draft.fragment_problems(fragment, SOURCES)
    assert problems and any(expected in p for p in problems), problems


def test_date_warning_for_year_missing_from_passport():
    accepted = [{"block": "about_work", "text": "Написана в 1920 году."}, {"block": "exhibitions", "text": "Показана в 1930 году."}]
    warnings = card_draft.date_warnings(accepted, PASSPORT)
    assert len(warnings) == 1 and "1920" in warnings[0]
    assert card_draft.date_warnings(accepted, {"title": "Без даты"}) == []


def test_block_queries_use_passport_only():
    queries = card_draft.block_queries(PASSPORT)
    assert set(queries) == set(card_draft.BLOCKS)
    assert all("Малевич" in q for q in queries.values())
    assert card_draft.block_queries({}) == {}


# ---------- черновик ----------

@pytest.mark.asyncio
async def test_draft_returns_checked_fragments_with_source_access():
    out = drafts([frag(), frag("Работа экспонировалась в 1915 году.", "exhibitions", (2,), "экспонировалась в 1915 году", "uncertain")],
                 missing=["provenance"], warnings=["датировка расходится"])
    with patch.object(card_draft, "gather_sources", AsyncMock(return_value=SOURCES)), \
         patch.object(card_draft.ai_service.llm, "complete", llm_returning(out)) as call:
        result = await card_draft.draft(PASSPORT)
    assert result["outcome"] == "drafted" and call.await_count == 1
    assert [f["block"] for f in result["fragments"]] == ["about_work", "exhibitions"]
    assert result["fragments"][0]["source"] == {"document_id": "d1", "title": "Каталог", "page": 7, "license": None, "access": "public"}
    assert result["fragments"][1]["source"]["access"] == "staff" and result["fragments"][1]["confidence"] == "uncertain"
    assert result["missing"] == ["about_artist", "provenance", "acquisition", "inscriptions"]     # блоки без фрагментов пусты, что бы ни заявила модель
    assert result["warnings"] == ["датировка расходится"]
    assert result["prompt_version"] == card_draft.DRAFT_PROMPT_VERSION and result["model"] == "test/model"


@pytest.mark.asyncio
async def test_draft_retries_once_and_keeps_only_checked_fragments():
    bad = frag(quote="написан Василием Кандинским")
    fixed = frag()
    with patch.object(card_draft, "gather_sources", AsyncMock(return_value=SOURCES)), \
         patch.object(card_draft.ai_service.llm, "complete", llm_returning(drafts([bad]), drafts([fixed]))) as call:
        result = await card_draft.draft(PASSPORT)
    assert call.await_count == 2
    assert result["outcome"] == "drafted" and len(result["fragments"]) == 1
    assert result["first_pass_rejected"] == 1 and result["rejected"] == []
    feedback = call.await_args_list[1].args[1][-1]["content"]
    assert "не прошли проверку" in feedback and "цитата не найдена" in feedback


@pytest.mark.asyncio
async def test_draft_refuses_when_nothing_passes_and_never_invents():
    bad = frag("Картину написал Малевич в 1920 году.")
    with patch.object(card_draft, "gather_sources", AsyncMock(return_value=SOURCES)), \
         patch.object(card_draft.ai_service.llm, "complete", llm_returning(drafts([bad]), drafts([bad]))):
        result = await card_draft.draft(PASSPORT)
    assert result["outcome"] == "insufficient_evidence" and result["fragments"] == []
    assert result["rejected"][0]["reasons"] and result["missing"] == list(card_draft.BLOCKS)


@pytest.mark.asyncio
async def test_draft_without_sources_does_not_call_the_model():
    with patch.object(card_draft, "gather_sources", AsyncMock(return_value=[])), \
         patch.object(card_draft.ai_service.llm, "complete", llm_returning()) as call:
        result = await card_draft.draft(PASSPORT)
    assert result["outcome"] == "no_sources" and call.await_count == 0


@pytest.mark.asyncio
async def test_draft_drops_repeated_quote():
    with patch.object(card_draft, "gather_sources", AsyncMock(return_value=SOURCES)), \
         patch.object(card_draft.ai_service.llm, "complete", llm_returning(drafts([frag(), frag("Автор — Малевич.", "about_artist")]))):
        result = await card_draft.draft(PASSPORT)
    assert len(result["fragments"]) == 1 and result["first_pass_rejected"] == 1


@pytest.mark.asyncio
async def test_gather_sources_merges_blocks_and_respects_limits():
    big = {"document_id": "d9", "chunk_index": 0, "page_number": 1, "content": "х" * 9000, "access": "staff", "title": "Т"}
    big2 = {**big, "chunk_index": 1}
    found = retrieval.Retrieval(passages=[{**SOURCES[0], "chunk_index": 0}, big, big2])
    seen = []

    async def fake_expand(passages, access, hits):
        seen.append((len(passages), access))
        return passages

    with patch.object(card_draft, "hybrid_search", AsyncMock(return_value=found)) as search, patch.object(card_draft, "expand_context", fake_expand):
        sources = await card_draft.gather_sources(PASSPORT, ["d1"], "staff")
    assert search.await_count == len(card_draft.BLOCKS)                       # по запросу на блок
    assert search.await_args.kwargs["document_ids"] == ["d1"] and search.await_args.kwargs["access"] == "staff"
    assert seen == [(3, "staff")]                                              # повторы между блоками склеены
    assert len(sources) == 2 and sum(len(s["content"]) for s in sources) <= card_draft.MAX_SOURCE_CHARS   # третий не влез по объёму


# ---------- перевод ----------

def test_translation_checks():
    ru = "Размер холста — 79,5 × 79,5 см, написан в 1915 году."
    assert card_draft.translation_problems(ru, "The canvas measures 79.5 × 79.5 cm and was painted in 1915.") == []
    assert any("числа" in p for p in card_draft.translation_problems(ru, "The canvas was painted in 1925 and measures 79.5 cm."))
    assert any("русские" in p for p in card_draft.translation_problems(ru, "Canvas painted in 1915, 79.5 × 79.5 см."))
    assert any("подлинности" in p for p in card_draft.translation_problems("Работа 1915 года.", "An authentic work of 1915."))
    assert any("длина" in p for p in card_draft.translation_problems("Работа 1915 года из собрания музея.", "x"))
    assert card_draft.translation_problems(ru, "  ") == ["пустой перевод"]


@pytest.mark.asyncio
async def test_translate_returns_checked_and_rejected():
    fragments = [{"id": 1, "text": "Картина написана в 1915 году."}, {"id": 2, "text": "Размер — 79,5 см."}, {"id": 3, "text": "Автор — Малевич."}]
    answer = {"translations": [{"id": 1, "text": "The painting was made in 1915."},
                               {"id": 2, "text": "The size is 80 cm."}]}
    with patch.object(card_draft.ai_service.llm, "complete", llm_returning(answer)) as call:
        result = await card_draft.translate(fragments, {"title": "Квадрат", "artist_name": "Малевич"})
    assert result["translations"] == [{"id": 1, "text": "The painting was made in 1915."}]
    assert {r["id"]: r["reasons"] for r in result["rejected"]}[3] == ["модель не вернула перевод"]
    assert any("числа" in " ".join(r["reasons"]) for r in result["rejected"] if r["id"] == 2)
    assert call.await_args.args[0] == "bulk" and "Малевич" in call.await_args.args[1][1]["content"]


@pytest.mark.asyncio
async def test_translate_splits_into_batches():
    fragments = [{"id": i, "text": f"Текст {i}."} for i in range(1, card_draft.TRANSLATE_BATCH + 6)]

    async def echo(task, messages, **kwargs):
        ids = [int(x) for x in __import__("re").findall(r'<passage id="(\d+)">', messages[1]["content"])]
        return SimpleNamespace(parsed={"translations": [{"id": i, "text": f"Text {i}."} for i in ids]}, text="", model="m", usage={"total_tokens": 5})

    with patch.object(card_draft.ai_service.llm, "complete", AsyncMock(side_effect=echo)) as call:
        result = await card_draft.translate(fragments)
    assert call.await_count == 2 and len(result["translations"]) == len(fragments) and result["usage"] == {"total_tokens": 10}


# ---------- маршруты ----------

@pytest.fixture()
def client():
    from src.models import main

    with patch.object(main, "init_db", AsyncMock()), patch.object(main, "init_qdrant", MagicMock()), \
         patch.object(main, "init_redis", AsyncMock()), patch.object(main, "close_db", AsyncMock()), \
         patch.object(main, "close_redis", AsyncMock()), patch.object(main.worker, "start", AsyncMock()), \
         patch.object(main.worker, "stop", AsyncMock()):
        with TestClient(main.app) as test_client:
            yield test_client


def test_routes_require_internal_token(client):
    assert client.post("/api/v1/cards/draft", json={"artwork": {"title": "A"}}).status_code == 401
    assert client.post("/api/v1/cards/translate", json={"fragments": [{"id": 1, "text": "а"}]}).status_code == 401


def test_draft_route_passes_passport_documents_and_access(client):
    from src.models.routes import cards

    with patch.object(cards.card_draft, "draft", AsyncMock(return_value={"outcome": "drafted", "fragments": []})) as draft:
        response = client.post("/api/v1/cards/draft", headers=AUTH, json={"artwork": {"title": "Квадрат", "year_created": 1915}, "document_ids": ["d1"]})
    assert response.status_code == 200 and response.json()["outcome"] == "drafted"
    passport, document_ids, access = draft.await_args.args
    assert passport["title"] == "Квадрат" and passport["year_created"] == 1915 and document_ids == ["d1"] and access == "staff"


def test_draft_route_validates_input(client):
    assert client.post("/api/v1/cards/draft", headers=AUTH, json={"artwork": {}}).status_code == 422
    assert client.post("/api/v1/cards/draft", headers=AUTH, json={"artwork": {"title": "A"}, "document_ids": ["../x"]}).status_code == 422
    assert client.post("/api/v1/cards/draft", headers=AUTH, json={"artwork": {"title": "A"}, "access": "root"}).status_code == 422
    assert client.post("/api/v1/cards/translate", headers=AUTH, json={"fragments": []}).status_code == 422


def test_translate_route(client):
    from src.models.routes import cards

    with patch.object(cards.card_draft, "translate", AsyncMock(return_value={"translations": [{"id": 1, "text": "x"}], "rejected": []})) as translate:
        response = client.post("/api/v1/cards/translate", headers=AUTH, json={"fragments": [{"id": 1, "text": "а"}], "artwork": {"title": "Квадрат"}})
    assert response.status_code == 200 and response.json()["translations"][0]["id"] == 1
    assert translate.await_args.args[0] == [{"id": 1, "text": "а"}] and translate.await_args.args[1]["title"] == "Квадрат"
