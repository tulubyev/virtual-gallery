#!/usr/bin/env bash
# =============================================================
# Virtual Art Gallery — Python AI/ML service setup
# Usage: bash scripts/setup_ai.sh
# =============================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AI_DIR="$ROOT_DIR/ai-ml-service"

GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
RESET="\033[0m"

ok()   { echo -e "${GREEN}[OK]${RESET}  $*"; }
warn() { echo -e "${YELLOW}[WARN]${RESET} $*"; }
fail() { echo -e "${RED}[FAIL]${RESET} $*"; }

echo ""
echo "==========================================="
echo "   Virtual Art Gallery — AI/ML Setup       "
echo "==========================================="
echo ""

# ------------------------------------------------------------------
# 1. Verify the ai-ml-service directory exists
# ------------------------------------------------------------------
if [ ! -d "$AI_DIR" ]; then
  fail "ai-ml-service/ directory not found at $AI_DIR"
  exit 1
fi

# ------------------------------------------------------------------
# 2. Copy .env.example → .env (only when .env doesn't exist yet)
# ------------------------------------------------------------------
ENV_FILE="$AI_DIR/.env"
ENV_EXAMPLE="$AI_DIR/.env.example"

if [ -f "$ENV_FILE" ]; then
  ok "ai-ml-service/.env already exists — skipping copy."
else
  if [ -f "$ENV_EXAMPLE" ]; then
    cp "$ENV_EXAMPLE" "$ENV_FILE"
    ok "Copied ai-ml-service/.env.example → ai-ml-service/.env"
    warn "Open ai-ml-service/.env and fill in your real credentials before starting the service."
  else
    fail "ai-ml-service/.env.example not found. Cannot create .env automatically."
    exit 1
  fi
fi

# ------------------------------------------------------------------
# 3. Check for Python
# ------------------------------------------------------------------
echo ""
echo "Checking Python installation..."

PYTHON_CMD=""
for cmd in python3 python; do
  if command -v "$cmd" &>/dev/null; then
    PYTHON_CMD="$cmd"
    PYTHON_VERSION=$("$cmd" --version 2>&1)
    ok "Found $PYTHON_VERSION (command: $cmd)"
    break
  fi
done

if [ -z "$PYTHON_CMD" ]; then
  fail "Python not found. Install Python 3.9+ before running this script."
  exit 1
fi

# ------------------------------------------------------------------
# 4. Install Python dependencies (skip when requirements.txt unchanged)
# ------------------------------------------------------------------
echo ""

REQUIREMENTS="$AI_DIR/requirements.txt"
if [ ! -f "$REQUIREMENTS" ]; then
  fail "requirements.txt not found at $REQUIREMENTS"
  exit 1
fi

PIP_STAMP="$AI_DIR/.pip-stamp"
CURRENT_HASH=""
STORED_HASH=""

if command -v sha256sum &>/dev/null; then
  CURRENT_HASH=$(sha256sum "$REQUIREMENTS" | awk '{print $1}')
elif command -v shasum &>/dev/null; then
  CURRENT_HASH=$(shasum -a 256 "$REQUIREMENTS" | awk '{print $1}')
fi

if [ -f "$PIP_STAMP" ]; then
  STORED_HASH=$(cat "$PIP_STAMP")
fi

if [ -n "$CURRENT_HASH" ] && [ "$CURRENT_HASH" = "$STORED_HASH" ]; then
  ok "Python dependencies are up to date — skipping pip install."
else
  echo "Installing Python dependencies from ai-ml-service/requirements.txt..."
  if "$PYTHON_CMD" -m pip install -r "$REQUIREMENTS" --quiet; then
    ok "pip install complete."
    if [ -n "$CURRENT_HASH" ]; then
      echo "$CURRENT_HASH" > "$PIP_STAMP"
    fi
  else
    warn "pip install encountered errors (see output above)."
    warn "You may need to install system dependencies or use a virtual environment."
    warn "Try: cd ai-ml-service && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt"
  fi
fi

# ------------------------------------------------------------------
# 5. Required env-var checklist
# ------------------------------------------------------------------
echo ""
echo "--- AI/ML environment variable checklist ---"

MISSING=0
check_var() {
  local var_name="$1"
  local value
  value=$(grep -E "^${var_name}=" "$ENV_FILE" 2>/dev/null | cut -d'=' -f2- | tr -d '"' | tr -d "'")
  if [ -z "$value" ] || echo "$value" | grep -qE "^(your-|change-me|sk-your|sk-or-v1-your|sk-ant-your|org-your|your-)"; then
    warn "${var_name} — NOT set (placeholder detected)"
    MISSING=$((MISSING + 1))
  else
    ok "${var_name}"
  fi
}

check_var "AI_CORE_PORT"
check_var "OPENAI_API_KEY"
check_var "OPENROUTER_API_KEY"
check_var "QDRANT_URL"
check_var "QDRANT_API_KEY"
check_var "JWT_SECRET"

echo ""
if [ "$MISSING" -gt 0 ]; then
  warn "$MISSING variable(s) still have placeholder values."
  warn "Edit ai-ml-service/.env with your real credentials, then start the service."
else
  ok "All checked env vars are set."
fi

# ------------------------------------------------------------------
# 6. Final summary
# ------------------------------------------------------------------
echo ""
echo "==========================================="
echo "   AI/ML Setup summary"
echo "==========================================="
ok "ai-ml-service/.env present"
if [ "$MISSING" -eq 0 ]; then
  ok "All required env vars set"
else
  warn "$MISSING env var(s) need real values — edit ai-ml-service/.env"
fi
echo ""
echo "Next steps:"
echo "  1. Edit ai-ml-service/.env if any vars above show [WARN]"
echo "  2. Start everything at once:  npm run dev:all"
echo "     (launches Node.js server, Vite, and the AI service together)"
echo "  3. Or start the AI service alone: cd ai-ml-service && $PYTHON_CMD -m uvicorn src.models.main:app --host 0.0.0.0 --port 8001"
echo "  4. The main app expects the AI service at: http://localhost:8001"
echo ""
