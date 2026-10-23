"""
Хранение базы знаний RAG в PostgreSQL: документы (`kb_documents`) и их фрагменты (`kb_chunks`).
Повторная загрузка документа целиком заменяет его фрагменты в одной транзакции.
"""

from typing import Any, Dict, List, Optional

from .database import db_service


async def replace_document(document_id: str, *, title: Optional[str], access: str, license: Optional[str],
                           source_url: Optional[str], content_sha256: Optional[str], pages_count: Optional[int],
                           chunks: List[Dict[str, Any]]) -> None:
    async with db_service.pool.acquire() as conn:
        async with conn.transaction():
            await conn.execute(
                """
                INSERT INTO kb_documents (document_id, title, access, license, source_url, content_sha256,
                                          pages_count, chunks_count, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
                ON CONFLICT (document_id) DO UPDATE SET
                    title = EXCLUDED.title, access = EXCLUDED.access, license = EXCLUDED.license,
                    source_url = EXCLUDED.source_url, content_sha256 = EXCLUDED.content_sha256,
                    pages_count = EXCLUDED.pages_count, chunks_count = EXCLUDED.chunks_count,
                    updated_at = CURRENT_TIMESTAMP
                """,
                document_id, title, access, license, source_url, content_sha256, pages_count, len(chunks))
            await conn.execute("DELETE FROM kb_chunks WHERE document_id = $1", document_id)
            if chunks:
                await conn.executemany(
                    "INSERT INTO kb_chunks (document_id, chunk_index, page_number, content, access) "
                    "VALUES ($1, $2, $3, $4, $5)",
                    [(document_id, c["chunk_index"], c.get("page_number"), c["content"], access) for c in chunks])


async def delete_document(document_id: str) -> bool:
    """Удалить документ и его фрагменты (векторы из Qdrant удаляет вызывающий)."""
    status = await db_service.execute("DELETE FROM kb_documents WHERE document_id = $1", document_id)
    return status.endswith(" 1")
