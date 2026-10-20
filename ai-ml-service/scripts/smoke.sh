#!/usr/bin/env bash
# Проверка запущенного стека docker-compose.smoke.yml: миграции применились, ядро здорово, доступ закрыт токеном,
# задачи ставятся в очередь и читаются из БД, выбор модели сохраняется и переживает перезапуск ядра.
set -euo pipefail
BASE="${BASE:-http://127.0.0.1:18001}"
TOKEN="${INTERNAL_API_TOKEN:-smoke-internal-token-0123456789}"
# Набор compose-файлов можно переопределить: COMPOSE_FILE=a.yml:b.yml (по умолчанию — docker-compose.smoke.yml рядом)
if [ -z "${COMPOSE_FILE:-}" ]; then export COMPOSE_FILE="$(dirname "$0")/../docker-compose.smoke.yml"; fi
COMPOSE=(docker compose)
H=(-H "X-Internal-Token: $TOKEN")
fail() { echo "SMOKE FAIL: $*" >&2; "${COMPOSE[@]}" logs --tail=60 ai-core >&2 || true; exit 1; }
code() { curl -s -o /dev/null -w '%{http_code}' "$@"; }

echo "1. /health (БД, Qdrant, Redis)"
curl -fsS "$BASE/health/" | python3 -c 'import sys,json; d=json.load(sys.stdin); assert d["status"]=="healthy", d; s=d["services"]; assert set(s)=={"database","qdrant","redis"} and all(v["healthy"] for v in s.values()), s' || fail "health"

echo "2. доступ без токена закрыт, с токеном открыт"
[ "$(code "$BASE/api/v1/model-settings")" = "401" ] || fail "без токена не 401"
[ "$(code -H 'X-Internal-Token: wrong' "$BASE/api/v1/model-settings")" = "401" ] || fail "чужой токен не 401"
[ "$(code "${H[@]}" "$BASE/api/v1/model-settings")" = "200" ] || fail "с токеном не 200"

echo "3. миграции применены (таблицы есть)"
TABLES=$("${COMPOSE[@]}" exec -T postgres psql -U smoke -d virtgal_ai -Atc "select string_agg(tablename, ',' order by tablename) from pg_tables where schemaname='public'")
for t in ai_jobs ai_model_settings ai_model_settings_log artwork_analysis digitized_artworks external_artworks pdf_documents rag_queries schema_migrations; do
  [[ ",$TABLES," == *",$t,"* ]] || fail "нет таблицы $t (есть: $TABLES)"
done

echo "4. задача ставится в очередь и читается из БД; чужой URL отклоняется до очереди"
RESP=$(curl -fsS "${H[@]}" -H 'Content-Type: application/json' -d '{"image_url":"https://example.org/a.jpg","artwork_id":1}' "$BASE/api/v1/images/analyze") || fail "analyze"
TASK=$(echo "$RESP" | python3 -c 'import sys,json; print(json.load(sys.stdin)["task_id"])')
[[ "$TASK" == img_* ]] || fail "task_id: $TASK"
curl -fsS "${H[@]}" "$BASE/api/v1/images/analysis/$TASK" | python3 -c 'import sys,json; d=json.load(sys.stdin); assert d["status"] in ("queued","processing","failed","completed"), d' || fail "статус задачи"
[ "$(code "${H[@]}" -H 'Content-Type: application/json' -d '{"image_url":"http://127.0.0.1:6333/"}' "$BASE/api/v1/images/analyze")" = "422" ] || fail "SSRF-адрес не отклонён"

echo "5. выбор модели сохраняется в БД и переживает перезапуск ядра"
curl -fsS "${H[@]}" -X PUT -H 'Content-Type: application/json' -H 'X-Actor: smoke' -d '{"model":"google/gemma-4-26b-a4b-it"}' "$BASE/api/v1/model-settings/chat" >/dev/null || fail "PUT model-settings"
"${COMPOSE[@]}" restart ai-core >/dev/null
for i in $(seq 1 40); do [ "$(code "$BASE/health/")" = "200" ] && break; sleep 2; done
curl -fsS "${H[@]}" "$BASE/api/v1/model-settings" | python3 -c '
import sys, json
d = json.load(sys.stdin)
chat = next(t for t in d["tasks"] if t["task"] == "chat")
assert chat["current_model"] == "google/gemma-4-26b-a4b-it" and chat["source"] == "admin" and chat["updated_by"] == "smoke", chat' || fail "выбор модели не пережил перезапуск"
curl -fsS "${H[@]}" -X DELETE "$BASE/api/v1/model-settings/chat" >/dev/null || fail "DELETE model-settings"

echo "6. образ: не root, нет лишних тяжёлых пакетов"
[ "$("${COMPOSE[@]}" exec -T ai-core id -u)" != "0" ] || fail "процесс работает от root"
"${COMPOSE[@]}" exec -T ai-core python -c "import importlib.util as u, sys; sys.exit(1 if any(u.find_spec(m) for m in ('torch','cv2','celery')) else 0)" || fail "в образе остались torch/cv2/celery"

echo "SMOKE OK"
