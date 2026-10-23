"""
Гибридный поиск по базе знаний: смысловой (Qdrant, эмбеддинги) + лексический (PostgreSQL, русская морфология),
слияние по взвешенному RRF.

* Источник истины для текста, страниц и прав доступа — PostgreSQL (`kb_chunks`): найденное в Qdrant
  перечитывается оттуда с фильтром `access`, поэтому сведения из Qdrant на права не влияют.
* Каждая «нога» поиска может отказать отдельно (нет эмбеддингов в режиме ru-only, недоступен Qdrant):
  тогда ответ строится по оставшейся, а в результате указано `degraded`.
"""

import asyncio
import logging
import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Sequence, Tuple

from qdrant_client.http.models import FieldCondition, Filter, MatchAny

from ..exceptions import ExternalAPIError
from .ai_service import ai_service
from .database import db_service
from .qdrant_client import qdrant_service

logger = logging.getLogger(__name__)

COLLECTION = "pdf_chunks"
RRF_K = 60                      # стандартная константа сглаживания RRF
MAX_QUERY_TERMS = 12
_WORD = re.compile(r"[A-Za-zА-Яа-яЁё0-9]{2,}")

Key = Tuple[str, int]           # (document_id, chunk_index)


@dataclass
class Retrieval:
    passages: List[Dict[str, Any]] = field(default_factory=list)
    dense_hits: int = 0
    lexical_hits: int = 0
    degraded: List[str] = field(default_factory=list)     # какие ноги поиска не сработали


def access_levels(access: str) -> List[str]:
    """Какие уровни видит запрашивающий: сотрудник — оба, остальные — только публичные."""
    return ["public", "staff"] if access == "staff" else ["public"]


def query_terms(query: str) -> List[str]:
    """Слова запроса для лексического поиска (без повторов, не более MAX_QUERY_TERMS)."""
    seen: List[str] = []
    for word in _WORD.findall(query.lower()):
        if word not in seen:
            seen.append(word)
    return seen[:MAX_QUERY_TERMS]


def rrf_merge(rankings: Sequence[Sequence[Key]], weights: Optional[Sequence[float]] = None,
              k: int = RRF_K) -> List[Tuple[Key, float]]:
    """Reciprocal Rank Fusion: сумма weight / (k + место) по спискам; по убыванию, при равенстве — по ключу."""
    weights = weights or [1.0] * len(rankings)
    scores: Dict[Key, float] = {}
    for ranking, weight in zip(rankings, weights):
        for place, key in enumerate(ranking, start=1):
            scores[key] = scores.get(key, 0.0) + weight / (k + place)
    return sorted(scores.items(), key=lambda item: (-item[1], item[0]))


async def lexical_search(query: str, levels: List[str], limit: int,
                         document_ids: Optional[List[str]] = None) -> List[Key]:
    terms = query_terms(query)
    if not terms:
        return []
    rows = await db_service.fetch_all(
        """
        SELECT c.document_id, c.chunk_index
        FROM kb_chunks c, to_tsquery('russian', $1) q
        WHERE c.search_text @@ q AND c.access = ANY($2::text[])
          AND ($3::text[] IS NULL OR c.document_id = ANY($3::text[]))
        ORDER BY ts_rank_cd(c.search_text, q) DESC, c.document_id, c.chunk_index
        LIMIT $4
        """,
        " | ".join(terms), levels, document_ids, limit)
    return [(r["document_id"], r["chunk_index"]) for r in rows]


def _qdrant_filter(levels: List[str], document_ids: Optional[List[str]]) -> Filter:
    must = [FieldCondition(key="access", match=MatchAny(any=levels))]
    if document_ids:
        must.append(FieldCondition(key="document_id", match=MatchAny(any=list(document_ids))))
    return Filter(must=must)


async def dense_search(query: str, levels: List[str], limit: int,
                       document_ids: Optional[List[str]] = None) -> List[Key]:
    if not await asyncio.to_thread(qdrant_service.collection_exists, COLLECTION):
        return []
    vector = (await ai_service.generate_embeddings([query]))[0]
    hits = await asyncio.to_thread(
        qdrant_service.search_points, COLLECTION, vector, limit, None, _qdrant_filter(levels, document_ids))
    keys: List[Key] = []
    for hit in hits:
        payload = hit.get("payload") or {}
        if payload.get("document_id") is not None and payload.get("chunk_index") is not None:
            keys.append((str(payload["document_id"]), int(payload["chunk_index"])))
    return keys


async def hydrate(keys: Sequence[Key], levels: List[str]) -> Dict[Key, Dict[str, Any]]:
    """Текст, страница, название и доступ найденных фрагментов — из PostgreSQL, с повторной проверкой доступа."""
    if not keys:
        return {}
    rows = await db_service.fetch_all(
        """
        SELECT c.document_id, c.chunk_index, c.page_number, c.content, c.access, d.title, d.license
        FROM unnest($1::text[], $2::int[]) AS k(document_id, chunk_index)
        JOIN kb_chunks c ON c.document_id = k.document_id AND c.chunk_index = k.chunk_index
        LEFT JOIN kb_documents d ON d.document_id = c.document_id
        WHERE c.access = ANY($3::text[])
        """,
        [k[0] for k in keys], [k[1] for k in keys], levels)
    return {(r["document_id"], r["chunk_index"]): r for r in rows}


async def hybrid_search(query: str, access: str = "public", top: int = 20, depth: int = 40,
                        document_ids: Optional[List[str]] = None,
                        dense_weight: float = 1.0, lexical_weight: float = 1.0) -> Retrieval:
    levels = access_levels(access)
    result = Retrieval()
    legs = await asyncio.gather(
        dense_search(query, levels, depth, document_ids),
        lexical_search(query, levels, depth, document_ids),
        return_exceptions=True)

    rankings: List[List[Key]] = []
    weights: List[float] = []
    for name, weight, leg in (("dense", dense_weight, legs[0]), ("lexical", lexical_weight, legs[1])):
        if isinstance(leg, BaseException):
            logger.warning("Поиск %s недоступен: %s", name, type(leg).__name__)
            result.degraded.append(name)
            continue
        setattr(result, f"{name}_hits", len(leg))
        rankings.append(leg)
        weights.append(weight)
    if len(result.degraded) == 2:
        raise ExternalAPIError("retrieval", "unavailable")

    merged = rrf_merge(rankings, weights)[:top]
    rows = await hydrate([key for key, _ in merged], levels)
    for key, score in merged:
        row = rows.get(key)
        if row is None:               # нет в PostgreSQL или недоступен по правам — не показываем
            continue
        result.passages.append({
            "document_id": row["document_id"], "chunk_index": row["chunk_index"],
            "page_number": row["page_number"], "title": row["title"], "license": row["license"],
            "content": row["content"], "access": row["access"], "score": round(score, 5),
        })
    return result
