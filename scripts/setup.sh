#!/usr/bin/env bash
# =============================================================
# Virtual Art Gallery — one-command developer setup
# Usage: bash scripts/setup.sh
# =============================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
RESET="\033[0m"

ok()   { echo -e "${GREEN}[OK]${RESET}  $*"; }
warn() { echo -e "${YELLOW}[WARN]${RESET} $*"; }
fail() { echo -e "${RED}[FAIL]${RESET} $*"; }

echo ""
echo "==========================================="
echo "   Virtual Art Gallery — Developer Setup   "
echo "==========================================="
echo ""

# ------------------------------------------------------------------
# 1. Copy .env.example → .env (only when .env doesn't exist yet)
# ------------------------------------------------------------------
ENV_FILE="$ROOT_DIR/.env"
ENV_EXAMPLE="$ROOT_DIR/.env.example"

if [ -f "$ENV_FILE" ]; then
  ok ".env already exists — skipping copy."
else
  if [ -f "$ENV_EXAMPLE" ]; then
    cp "$ENV_EXAMPLE" "$ENV_FILE"
    ok "Copied .env.example → .env"
    warn "Open .env and fill in your real credentials before starting the app."
  else
    fail ".env.example not found. Cannot create .env automatically."
    exit 1
  fi
fi

# ------------------------------------------------------------------
# 2. Install Node.js dependencies (skip when node_modules is current)
# ------------------------------------------------------------------
echo ""
NEEDS_INSTALL=1
NODE_MODULES="$ROOT_DIR/node_modules"
PACKAGE_JSON="$ROOT_DIR/package.json"
PACKAGE_LOCK="$ROOT_DIR/package-lock.json"

if [ -d "$NODE_MODULES" ]; then
  MODULES_MTIME=$(stat -c %Y "$NODE_MODULES" 2>/dev/null || stat -f %m "$NODE_MODULES" 2>/dev/null || echo 0)
  PKG_MTIME=$(stat -c %Y "$PACKAGE_JSON" 2>/dev/null || stat -f %m "$PACKAGE_JSON" 2>/dev/null || echo 1)
  LOCK_MTIME=0
  if [ -f "$PACKAGE_LOCK" ]; then
    LOCK_MTIME=$(stat -c %Y "$PACKAGE_LOCK" 2>/dev/null || stat -f %m "$PACKAGE_LOCK" 2>/dev/null || echo 1)
  fi
  NEWEST_PKG=$PKG_MTIME
  if [ "$LOCK_MTIME" -gt "$NEWEST_PKG" ]; then
    NEWEST_PKG=$LOCK_MTIME
  fi
  if [ "$MODULES_MTIME" -ge "$NEWEST_PKG" ]; then
    NEEDS_INSTALL=0
  fi
fi

if [ "$NEEDS_INSTALL" -eq 1 ]; then
  echo "Installing Node.js dependencies..."
  cd "$ROOT_DIR"
  npm install --silent
  ok "npm install complete."
else
  ok "node_modules is up to date — skipping npm install."
fi

# ------------------------------------------------------------------
# 3. Required env-var checklist
# ------------------------------------------------------------------
echo ""
echo "--- Environment variable checklist ---"

MISSING=0
check_var() {
  local var_name="$1"
  local value
  # Source .env so we can inspect values
  value=$(grep -E "^${var_name}=" "$ENV_FILE" 2>/dev/null | cut -d'=' -f2- | tr -d '"' | tr -d "'")
  if [ -z "$value" ] || echo "$value" | grep -qE "^(your-|change-me)"; then
    warn "${var_name} — NOT set (placeholder detected)"
    MISSING=$((MISSING + 1))
  else
    ok "${var_name}"
  fi
}

check_var "DB_HOST"
check_var "DB_PORT"
check_var "DB_NAME"
check_var "DB_USER"
check_var "DB_PASSWORD"
check_var "DB_STRING"
check_var "JWT_SECRET"
check_var "S3_ACCESS_KEY_ID"
check_var "S3_SECRET_ACCESS_KEY"
check_var "S3_REGION"
check_var "S3_BUCKET_NAME"
check_var "S3_ENDPOINT"

echo ""
if [ "$MISSING" -gt 0 ]; then
  warn "$MISSING variable(s) still have placeholder values."
  warn "Edit .env with your real credentials, then re-run this script"
  warn "or run 'npm run init-db' directly once credentials are ready."
  echo ""
  echo "Skipping database initialization (credentials incomplete)."
else
  # ------------------------------------------------------------------
  # 4. Initialize the database (skip when schema files are unchanged)
  # ------------------------------------------------------------------
  DB_STAMP="$ROOT_DIR/.db-init-stamp"

  # Collect all schema-related source files to watch
  DB_SCHEMA_FILES=(
    "$ROOT_DIR/src/database/init.ts"
    "$ROOT_DIR/src/database/initialize.ts"
    "$ROOT_DIR/src/database/init_db.ts"
    "$ROOT_DIR/src/database/schema.sql"
    "$ROOT_DIR/src/database/reset.sql"
    "$ROOT_DIR/src/database/migration.sql"
    "$ROOT_DIR/src/database/enhanced_schema.sql"
    "$ROOT_DIR/src/database/ai_ml_schema.sql"
  )

  # Find the newest mtime among all schema files that actually exist
  NEWEST_SCHEMA=0
  for f in "${DB_SCHEMA_FILES[@]}"; do
    if [ -f "$f" ]; then
      FMTIME=$(stat -c %Y "$f" 2>/dev/null || stat -f %m "$f" 2>/dev/null || echo 0)
      if [ "$FMTIME" -gt "$NEWEST_SCHEMA" ]; then
        NEWEST_SCHEMA=$FMTIME
      fi
    fi
  done

  # Get the stamp mtime (0 if the stamp doesn't exist yet)
  STAMP_MTIME=0
  if [ -f "$DB_STAMP" ]; then
    STAMP_MTIME=$(stat -c %Y "$DB_STAMP" 2>/dev/null || stat -f %m "$DB_STAMP" 2>/dev/null || echo 0)
  fi

  DB_INIT_OK=0
  if [ "$STAMP_MTIME" -ge "$NEWEST_SCHEMA" ] && [ "$STAMP_MTIME" -gt 0 ]; then
    ok "Database schema unchanged — skipping db init."
    DB_INIT_OK=1
  else
    echo "Initializing database..."
    cd "$ROOT_DIR"
    if npm run init-db 2>&1; then
      ok "Database initialized successfully."
      touch "$DB_STAMP"
      DB_INIT_OK=1
    else
      warn "Database initialization failed (see output above)."
      warn "Once resolved, run: npm run init-db"
    fi
  fi
fi

# ------------------------------------------------------------------
# 5. Final summary
# ------------------------------------------------------------------
echo ""
echo "==========================================="
echo "   Setup summary"
echo "==========================================="
ok ".env present"
if [ "$MISSING" -eq 0 ]; then
  ok "All required env vars set"
  if [ "${DB_INIT_OK:-0}" -eq 1 ]; then
    ok "Database initialized"
  else
    warn "Database init failed — run 'npm run init-db' manually after fixing the error"
  fi
else
  warn "$MISSING env var(s) need real values"
  warn "Database init skipped — fill .env first, then run 'npm run init-db'"
fi
echo ""
echo "Next steps:"
echo "  1. Edit .env if any vars above show [WARN]"
echo "  2. Run: npm run dev"
echo "  3. Open the app at http://localhost:3001"
echo ""
