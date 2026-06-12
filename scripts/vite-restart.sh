#!/usr/bin/env bash
# Restart loop for Vite with exponential backoff.
# Delay doubles on each quick crash (< 10s runtime): 3 → 6 → 12 → 24 → 30s max.
# Delay resets to 3s whenever Vite runs cleanly for at least 10 seconds.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
delay=3

while true; do
  echo "[vite] starting..."
  start=$(date +%s)
  (cd "$ROOT_DIR/src/frontend" && npx vite --port 5000 --host)
  end=$(date +%s)
  runtime=$((end - start))

  if [ "$runtime" -ge 10 ]; then
    delay=3
  else
    delay=$((delay * 2))
    if [ "$delay" -gt 30 ]; then
      delay=30
    fi
  fi

  echo "[vite] crashed or exited — restarting in ${delay}s..."
  sleep "$delay"
done
