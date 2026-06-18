"""
Shared pytest fixtures.

We build a minimal FastAPI app that includes only the /chat router so tests
never have to import the heavy optional dependencies (PyMuPDF, OpenCV, Torch,
etc.) that the other routes bring in.

The openai.AsyncOpenAI constructor is patched before ai_service is imported
so the missing-credentials error that would otherwise fire at module-import
time never occurs.
"""

import os
import pytest
from unittest.mock import MagicMock, patch

os.environ.setdefault("OPENAI_API_KEY", "sk-test-dummy-key-for-pytest")
os.environ.setdefault("OPENROUTER_API_KEY", "")


@pytest.fixture(scope="session", autouse=True)
def minimal_app():
    """
    Return a tiny FastAPI app that contains only the /chat router.
    Built once per test session.

    openai.AsyncOpenAI is replaced with a MagicMock before importing
    ai_service (which instantiates the client at module level) so tests
    never need real API credentials.
    """
    with patch("openai.AsyncOpenAI", return_value=MagicMock()):
        from fastapi import FastAPI
        from src.models.routes.chat import router as chat_router

    app = FastAPI()
    app.include_router(chat_router, prefix="/chat")
    return app
