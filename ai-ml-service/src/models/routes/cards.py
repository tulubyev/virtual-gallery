"""
Карточка произведения: черновик по документам и перевод ru → en (services/card_draft.py, docs/ARTWORK-CARD.md).

Ядро только предлагает проверенные фрагменты. Запись в карточку, права и утверждение — в Express (`/api/artwork-cards`).
"""

import logging
import re
from typing import List, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ..exceptions import AIMLException, public_error
from ..services import card_draft

router = APIRouter()
logger = logging.getLogger(__name__)
DOCUMENT_ID_PATTERN = r"^[A-Za-z0-9_.-]{1,100}$"


class PassportIn(BaseModel):
    title: Optional[str] = Field(default=None, max_length=500)
    artist_name: Optional[str] = Field(default=None, max_length=300)
    dating_text: Optional[str] = Field(default=None, max_length=200)
    year_created: Optional[int] = Field(default=None, ge=0, le=2100)
    year_from: Optional[int] = Field(default=None, ge=0, le=2100)
    year_to: Optional[int] = Field(default=None, ge=0, le=2100)
    medium: Optional[str] = Field(default=None, max_length=300)
    dimensions: Optional[str] = Field(default=None, max_length=200)
    inventory_number: Optional[str] = Field(default=None, max_length=100)


class DraftRequest(BaseModel):
    artwork: PassportIn
    document_ids: Optional[List[str]] = Field(default=None, max_length=50)
    access: str = Field(default="staff", pattern="^(public|staff)$")      # какие документы видит запрашивающий


class FragmentIn(BaseModel):
    id: int
    text: str = Field(min_length=1, max_length=5000)


class TranslateRequest(BaseModel):
    fragments: List[FragmentIn] = Field(min_length=1, max_length=60)
    artwork: Optional[PassportIn] = None


@router.post("/draft")
async def make_draft(request: DraftRequest):
    """Черновик карточки: фрагменты с дословными цитатами, отклонённое с причинами, пустые блоки и предупреждения."""
    if request.document_ids:
        for document_id in request.document_ids:
            if not re.match(DOCUMENT_ID_PATTERN, document_id):
                raise HTTPException(status_code=422, detail="Недопустимый идентификатор документа")
    if not (request.artwork.title or request.artwork.artist_name):
        raise HTTPException(status_code=422, detail="Нужны название или автор произведения")
    try:
        return await card_draft.draft(request.artwork.model_dump(), request.document_ids, request.access)
    except AIMLException as e:
        raise HTTPException(status_code=e.status_code, detail=public_error(e))
    except Exception as e:
        logger.error(f"Card draft failed: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))


@router.post("/translate")
async def make_translation(request: TranslateRequest):
    """Перевод русских фрагментов на английский с проверкой чисел, кириллицы и суждений."""
    try:
        return await card_draft.translate([f.model_dump() for f in request.fragments],
                                          request.artwork.model_dump() if request.artwork else None)
    except AIMLException as e:
        raise HTTPException(status_code=e.status_code, detail=public_error(e))
    except Exception as e:
        logger.error(f"Card translation failed: {e}")
        raise HTTPException(status_code=500, detail=public_error(e))
