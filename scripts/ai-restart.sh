#!/usr/bin/env bash
# Restart loop for the Python AI/ML service with exponential backoff.
# Delay doubles on each quick crash (< 10s runtime): 3 → 6 → 12 → 24 → 30s max.
# Delay resets to 3s whenever the service runs cleanly for at least 10 seconds.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
delay=3

while true; do
  echo "[ai] starting..."
  start=$(date +%s)
  (cd "$ROOT_DIR/ai-ml-service" && python3 -m uvicorn src.models.main:app --host 0.0.0.0 --port 8001)
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

  echo "[ai] crashed or exited — restarting in ${delay}s..."
  sleep "$delay"
done
