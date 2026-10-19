"""
Диалог с ИИ-помощником по искусству (POST /chat).

Восстановлено по тестам tests/test_chat.py: в присланных исходниках ядра этого файла не было.
Контракт: {"message": str, "history": [{"role": "user"|"assistant", "content": str}]} → {"reply": str, "model": str}.
Сообщения для модели: системный промпт + история в исходном порядке + текущая реплика пользователя.
"""

import logging
from typing import List, Literal, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ..exceptions import AIMLException
from ..services.ai_service import ai_service

router = APIRouter()
logger = logging.getLogger(__name__)

MAX_MESSAGE_CHARS = 4000
MAX_HISTORY_MESSAGES = 20

SYSTEM_PROMPT = (
    "Ты — помощник виртуальной арт-галереи. Отвечай на языке пользователя, по существу и дружелюбно. "
    "Помогай понять стили, эпохи, техники и контекст произведений. "
    "Если не уверен или не знаешь, так и скажи, не выдумывай факты, имена и даты. "
    "Не выноси вердиктов о подлинности произведений, не называй цену или оценочную стоимость и не давай "
    "юридических советов — для этого нужен эксперт; можно объяснить, на что обычно смотрят специалисты."
)


class ChatTurn(BaseModel):
    # Только реплики пользователя и ассистента: «system» из клиентской истории не принимается,
    # иначе клиент мог бы переопределить системный промпт.
    role: Literal["user", "assistant"]
    content: str = Field(max_length=MAX_MESSAGE_CHARS)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=MAX_MESSAGE_CHARS)
    history: Optional[List[ChatTurn]] = Field(default=None, max_length=MAX_HISTORY_MESSAGES)


class ChatResponse(BaseModel):
    reply: str
    model: Optional[str] = None


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    """Ответ ассистента с учётом предыдущих реплик диалога."""
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend({"role": turn.role, "content": turn.content} for turn in (request.history or []))
    messages.append({"role": "user", "content": request.message})

    try:
        result = await ai_service.llm.complete("chat", messages)
    except AIMLException as error:
        logger.error("Chat completion failed: %s", error.message)
        raise HTTPException(status_code=502, detail="AI provider error")

    return ChatResponse(reply=result.text, model=result.model)
