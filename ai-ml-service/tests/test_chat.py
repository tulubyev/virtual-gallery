"""
End-to-end tests for POST /chat

These tests verify that:
1. A first message (empty history) is forwarded to the LLM correctly.
2. A follow-up message includes all prior conversation turns in the outgoing
   LLM request so the model has full context.

The OpenAI client on the shared ai_service singleton is mocked so no real
HTTP calls are made.  We use a minimal FastAPI app (from conftest) that
includes only the /chat router — the heavy optional deps (PyMuPDF, OpenCV,
Torch, etc.) required by other routes are never imported.
"""

import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from fastapi.testclient import TestClient


def _make_completion(text="Mocked reply from the assistant.", model="mock-model"):
    choice = MagicMock()
    choice.message.content = text
    completion = MagicMock()
    completion.choices = [choice]
    completion.model = model
    return completion


@pytest.fixture()
def test_client(minimal_app):
    """
    Wrap the session-scoped minimal_app in a TestClient, with the AI service's
    OpenAI client patched for the duration of the test.
    """
    create_mock = AsyncMock(return_value=_make_completion())

    with patch(
        "src.models.services.ai_service.ai_service.client"
    ) as mock_openai_client:
        mock_openai_client.chat.completions.create = create_mock
        with TestClient(minimal_app) as tc:
            yield tc, create_mock


def _sent_messages(create_mock):
    """Extract the ``messages`` list from the last call to the LLM mock."""
    call = create_mock.call_args
    return call.kwargs.get("messages") or (call.args[0] if call.args else [])


class TestChatFirstMessage:
    """POST /chat with no prior history (first turn)."""

    def test_returns_200_and_reply(self, test_client):
        tc, _ = test_client
        resp = tc.post("/chat", json={"message": "Tell me about Impressionism."})
        assert resp.status_code == 200
        data = resp.json()
        assert data["reply"] == "Mocked reply from the assistant."

    def test_llm_receives_system_and_user_message_only(self, test_client):
        tc, create_mock = test_client
        tc.post("/chat", json={"message": "Tell me about Impressionism."})

        messages = _sent_messages(create_mock)
        roles = [m["role"] for m in messages]

        assert roles[0] == "system", "First message must be the system prompt"
        assert roles[-1] == "user", "Last message must be the current user turn"
        assert len(roles) == 2, "No history → exactly system + user (2 messages)"

    def test_empty_history_field_accepted(self, test_client):
        tc, _ = test_client
        resp = tc.post("/chat", json={"message": "Hello", "history": []})
        assert resp.status_code == 200

    def test_missing_history_field_accepted(self, test_client):
        tc, _ = test_client
        resp = tc.post("/chat", json={"message": "Hello"})
        assert resp.status_code == 200


class TestChatFollowUpQuestion:
    """POST /chat with prior conversation turns (multi-turn)."""

    def test_history_messages_appear_in_llm_request(self, test_client):
        tc, create_mock = test_client

        history = [
            {"role": "user", "content": "What is the Baroque period?"},
            {"role": "assistant", "content": "Baroque is a style from the 17th century."},
        ]
        tc.post(
            "/chat",
            json={
                "message": "Who were its main painters?",
                "history": history,
            },
        )

        messages = _sent_messages(create_mock)
        contents = [m["content"] for m in messages]

        assert "What is the Baroque period?" in contents
        assert "Baroque is a style from the 17th century." in contents
        assert "Who were its main painters?" in contents

    def test_message_order_is_preserved(self, test_client):
        tc, create_mock = test_client

        history = [
            {"role": "user", "content": "Turn 1 user"},
            {"role": "assistant", "content": "Turn 1 assistant"},
            {"role": "user", "content": "Turn 2 user"},
            {"role": "assistant", "content": "Turn 2 assistant"},
        ]
        tc.post(
            "/chat",
            json={"message": "Turn 3 user", "history": history},
        )

        messages = _sent_messages(create_mock)
        non_system = [m for m in messages if m["role"] != "system"]

        expected = [
            "Turn 1 user",
            "Turn 1 assistant",
            "Turn 2 user",
            "Turn 2 assistant",
            "Turn 3 user",
        ]
        assert [m["content"] for m in non_system] == expected

    def test_current_message_appended_after_history(self, test_client):
        tc, create_mock = test_client

        history = [
            {"role": "user", "content": "Previous question"},
            {"role": "assistant", "content": "Previous answer"},
        ]
        tc.post(
            "/chat",
            json={"message": "New follow-up", "history": history},
        )

        messages = _sent_messages(create_mock)
        assert messages[-1]["role"] == "user"
        assert messages[-1]["content"] == "New follow-up"

    def test_returns_reply_in_multi_turn(self, test_client):
        tc, _ = test_client

        resp = tc.post(
            "/chat",
            json={
                "message": "Follow-up",
                "history": [
                    {"role": "user", "content": "Hi"},
                    {"role": "assistant", "content": "Hello"},
                ],
            },
        )
        assert resp.status_code == 200
        assert resp.json()["reply"] == "Mocked reply from the assistant."
