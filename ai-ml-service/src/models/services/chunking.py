"""
Нарезка текста на фрагменты для RAG.

Фрагмент не пересекает границу страницы: так у каждого цитируемого места есть точный номер страницы.
Внутри страницы режем по абзацам, затем по предложениям; соседние фрагменты одной страницы
перекрываются на 1–2 предложения (не больше `overlap` символов).
"""

import re
from typing import Any, Dict, Iterable, List

MIN_CHUNK_CHARS = 30          # короче — колонтитул, номер страницы, подпись
_SENTENCE_END = re.compile(r"(?<=[.!?…])\s+(?=[«\"(\[]?[А-ЯЁA-Z0-9])")


def normalize_page_text(text: str) -> str:
    """Склеить переносы PDF: «сло-\\nво» → «слово», одиночный перевод строки → пробел; абзацы остаются."""
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    # мягкий перенос на конце строки: «иконогра\u00ad\nфических» → «иконографических» (иначе строка склеится пробелом)
    text = re.sub(r"\u00ad[ \t]*\n[ \t]*", "", text).replace("\u00ad", "")
    text = re.sub(r"(?<=[A-Za-zА-Яа-яЁё])-\n(?=[a-zа-яё])", "", text)
    paragraphs = [re.sub(r"[ \t\f\v ]+", " ", re.sub(r"\n", " ", p)).strip()
                  for p in re.split(r"\n\s*\n", text)]
    return "\n\n".join(p for p in paragraphs if p)


def _sentences(paragraph: str, limit: int) -> List[str]:
    """Предложения абзаца; слишком длинное предложение режется по пробелам, чтобы не превысить limit."""
    result: List[str] = []
    for sentence in _SENTENCE_END.split(paragraph):
        sentence = sentence.strip()
        while len(sentence) > limit:
            cut = sentence.rfind(" ", 0, limit)
            cut = cut if cut > limit // 2 else limit
            result.append(sentence[:cut].strip())
            sentence = sentence[cut:].strip()
        if sentence:
            result.append(sentence)
    return result


def chunk_page(text: str, page_number: int, target: int = 1000, hard_limit: int = 1800,
               overlap: int = 150) -> List[Dict[str, Any]]:
    """Фрагменты одной страницы: цель ≈ target символов, потолок hard_limit, перекрытие ≤ overlap."""
    text = normalize_page_text(text)
    if len(text) < MIN_CHUNK_CHARS:
        return []

    units: List[str] = []
    for paragraph in text.split("\n\n"):
        units.extend(_sentences(paragraph, hard_limit))

    chunks: List[Dict[str, Any]] = []
    current: List[str] = []
    size = 0

    def flush() -> None:
        content = " ".join(current).strip()
        if len(content) >= MIN_CHUNK_CHARS:
            chunks.append({"content": content, "page_number": page_number,
                           "char_count": len(content), "token_estimate": len(content.split())})

    for unit in units:
        if current and size + len(unit) + 1 > target:
            flush()
            # перекрытие: хвост из последних предложений не длиннее overlap
            tail: List[str] = []
            tail_size = 0
            for previous in reversed(current):
                if tail_size + len(previous) + 1 > overlap or len(tail) >= 2:
                    break
                tail.insert(0, previous)
                tail_size += len(previous) + 1
            current, size = tail, tail_size
        current.append(unit)
        size += len(unit) + 1
    if current:
        flush()
    return chunks


def chunk_pages(pages: Iterable[Dict[str, Any]], target: int = 1000, hard_limit: int = 1800,
                overlap: int = 150) -> List[Dict[str, Any]]:
    """Фрагменты всего документа; `pages` — [{"page_number", "text"}], сквозная нумерация chunk_index с нуля."""
    chunks: List[Dict[str, Any]] = []
    for page in pages:
        chunks.extend(chunk_page(page.get("text") or "", page["page_number"], target, hard_limit, overlap))
    for index, chunk in enumerate(chunks):
        chunk["chunk_index"] = index
    return chunks
