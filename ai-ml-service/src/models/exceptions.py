"""
Custom exceptions for AI/ML Core Service
"""

import logging
from typing import Optional, Dict, Any
from fastapi import HTTPException

logger = logging.getLogger(__name__)


class AIMLException(Exception):
    """Base exception for AI/ML operations"""

    def __init__(
        self,
        message: str,
        error_code: str,
        status_code: int = 500,
        details: Optional[Dict[str, Any]] = None
    ):
        self.message = message
        self.error_code = error_code
        self.status_code = status_code
        self.details = details or {}
        super().__init__(self.message)


class ExternalAPIError(AIMLException):
    """Exception for external API failures"""

    def __init__(self, service: str, operation: str, details: Optional[Dict] = None):
        super().__init__(
            f"External API error: {service} - {operation}",
            "EXTERNAL_API_ERROR",
            502,  # Bad Gateway
            details
        )


class ValidationError(AIMLException):
    """Exception for input validation failures"""

    def __init__(self, field: str, value: Any, reason: str):
        super().__init__(
            f"Validation error for {field}: {reason}",
            "VALIDATION_ERROR",
            400,
            {"field": field, "value": str(value), "reason": reason}
        )


class ProcessingError(AIMLException):
    """Exception for processing failures"""

    def __init__(self, operation: str, details: Optional[Dict] = None):
        super().__init__(
            f"Processing error during {operation}",
            "PROCESSING_ERROR",
            500,
            details
        )


class ResourceNotFoundError(AIMLException):
    """Exception for missing resources"""

    def __init__(self, resource_type: str, resource_id: str):
        super().__init__(
            f"{resource_type} not found: {resource_id}",
            "RESOURCE_NOT_FOUND",
            404,
            {"resource_type": resource_type, "resource_id": resource_id}
        )


class FetchError(AIMLException):
    """Ошибка безопасной загрузки по URL. Текст безопасен для показа клиенту (без внутренних адресов)."""

    def __init__(self, message: str):
        super().__init__(message, "FETCH_ERROR", 400)


def public_error(error: Exception) -> str:
    """Текст ошибки, который можно показать клиенту.

    Наши исключения несут безопасное сообщение; всё остальное (драйверы БД, SDK, пути, адреса)
    наружу не отдаётся — подробности остаются в логах.
    """
    if isinstance(error, AIMLException):
        return error.message
    return "Internal error"


class ConfigurationError(AIMLException):
    """Exception for configuration issues"""

    def __init__(self, config_key: str, details: Optional[Dict] = None):
        super().__init__(
            f"Configuration error: {config_key}",
            "CONFIGURATION_ERROR",
            500,
            details
        )


def handle_exceptions(func):
    """Decorator to handle exceptions and convert to HTTP responses"""
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except AIMLException as e:
            raise HTTPException(
                status_code=e.status_code,
                detail={
                    "error": {
                        "code": e.error_code,
                        "message": e.message,
                        "details": e.details
                    }
                }
            )
        except HTTPException:
            # Re-raise FastAPI HTTP exceptions as-is
            raise
        except Exception as e:
            # Catch-all for unexpected errors
            logger.error("Unexpected error: %s", e, exc_info=True)
            raise HTTPException(
                status_code=500,
                detail={
                    "error": {
                        "code": "INTERNAL_ERROR",
                        "message": "An unexpected error occurred",
                        "details": {"error_type": type(e).__name__}
                    }
                }
            )
    return wrapper