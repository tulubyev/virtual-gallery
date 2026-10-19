"""
Проверка внутреннего токена.

Python-сервис не публикуется наружу: его вызывает только основное приложение (Express),
которое само проверяет вход и роль пользователя (accessPolicy.ts). Токен защищает от
случайного доступа из соседних контейнеров и из сети хоста.
"""

import hmac

from fastapi import Header, HTTPException

from .config import settings


async def require_internal_token(x_internal_token: str = Header(default="")) -> None:
    if not hmac.compare_digest(x_internal_token.encode("utf-8"), settings.internal_api_token.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Invalid internal token")
