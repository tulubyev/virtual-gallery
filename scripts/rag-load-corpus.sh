#!/usr/bin/env bash
# Загрузка тестового корпуса RAG (ai-ml-service/eval/corpus/manifest.tsv) в работающее приложение.
#
# Файлы скачиваются с сайтов издателей, проверяются по SHA-256 (номера страниц в золотом наборе относятся
# именно к этим файлам) и отправляются через /api/ai/process-pdf от имени сотрудника с доступом `staff`.
# Повторный запуск заменяет документы с теми же id: так корпус перезагружают после смены нарезки.
#
#   VG_EMAIL=curator@example.org scripts/rag-load-corpus.sh [doc-01 doc-05 ...]
#
# Пароль спрашивается в терминале и нигде не сохраняется. VG_URL — адрес сайта (по умолчанию https://virtgal.ru).
# Нужны curl, python3, sha256sum. Лицензии документов не установлены: публиковать их для гостей нельзя.

set -euo pipefail

BASE_URL="${VG_URL:-https://virtgal.ru}"
BASE_URL="${BASE_URL%/}"
MANIFEST="$(cd "$(dirname "$0")/.." && pwd)/ai-ml-service/eval/corpus/manifest.tsv"
: "${VG_EMAIL:?Укажите VG_EMAIL — почту сотрудника, куратора или администратора}"

for tool in curl python3 sha256sum; do
  command -v "$tool" >/dev/null || { echo "Нужен $tool" >&2; exit 2; }
done

read -rsp "Пароль для ${VG_EMAIL}: " VG_PASSWORD; echo
export VG_EMAIL VG_PASSWORD

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
chmod 700 "$WORK"

# Вход: токен кладём в файл заголовка (не в аргументы командной строки, чтобы он не попал в список процессов)
login_json="$(python3 -c 'import json,os;print(json.dumps({"email":os.environ["VG_EMAIL"],"password":os.environ["VG_PASSWORD"]}))' \
  | curl -sS --max-time 30 -X POST -H 'Content-Type: application/json' --data @- "$BASE_URL/api/auth/login")"
unset VG_PASSWORD
if ! printf '%s' "$login_json" | python3 -c 'import json,sys
d = json.load(sys.stdin)
if "token" not in d:
    sys.exit("Вход не удался: " + str(d.get("error", "нет токена")))
open(sys.argv[1], "w").write("Authorization: Bearer " + d["token"] + "\n")
print(d.get("role", ""))' "$WORK/auth" > "$WORK/role"; then
  exit 1
fi
chmod 600 "$WORK/auth"
role="$(cat "$WORK/role")"
case "$role" in admin|curator|staff) ;; *) echo "Роль «$role» не может загружать документы" >&2; exit 1;; esac
echo "Вход выполнен (роль: $role)"

wanted=("$@")
failed=0
uploaded=()
# Состояние базы знаний до загрузки: при повторной загрузке документ уже есть, и «появился с фрагментами» ещё не значит «обработан заново»
curl -sS --max-time 30 -H @"$WORK/auth" "$BASE_URL/api/ai/rag/documents" > "$WORK/before.json" || echo '{}' > "$WORK/before.json"
while IFS=$'\t' read -r id sha url title; do
  [[ -z "$id" || "$id" == \#* ]] && continue
  if ((${#wanted[@]})) && [[ ! " ${wanted[*]} " == *" $id "* ]]; then continue; fi

  file="$WORK/$id.pdf"
  echo "[$id] скачиваю $url"
  if ! curl -fsSL --max-time 600 -A 'virtual-gallery-rag-loader' -o "$file" "$url"; then
    echo "[$id] не скачался" >&2; failed=1; continue
  fi
  actual="$(sha256sum "$file" | cut -d' ' -f1)"
  if [[ "$actual" != "$sha" ]]; then
    echo "[$id] файл изменился на сайте (sha256 $actual, ожидалось $sha) — пропускаю: страницы в золотом наборе могут не совпасть" >&2
    failed=1; continue
  fi

  code="$(curl -sS --max-time 300 -o "$WORK/resp.json" -w '%{http_code}' -H @"$WORK/auth" -X POST "$BASE_URL/api/ai/process-pdf" \
    -F "pdf=@$file;type=application/pdf" -F "documentId=$id" -F "title=$title" -F "access=staff" -F "license=не установлено")" || code=000
  if [[ "$code" =~ ^2 ]]; then
    echo "[$id] принят в очередь"; uploaded+=("$id")
  else
    echo "[$id] ошибка $code: $(head -c 300 "$WORK/resp.json")" >&2; failed=1
  fi
  rm -f "$file"
done < "$MANIFEST"

# Обработка идёт в очереди ядра (страницы → фрагменты → эмбеддинги): ждём, пока документы появятся в базе знаний или обновятся там
if ((${#uploaded[@]})); then
  echo "Жду обработки (до 20 минут)…"
  deadline=$((SECONDS + 1200))
  while :; do
    curl -sS --max-time 30 -H @"$WORK/auth" "$BASE_URL/api/ai/rag/documents" > "$WORK/docs.json" || true
    missing="$(python3 - "$WORK/before.json" "$WORK/docs.json" "${uploaded[@]}" <<'PY'
import json, sys
def load(path):
    try:
        return {d["document_id"]: d for d in json.load(open(path)).get("documents", [])}
    except Exception:
        return {}
before, docs = load(sys.argv[1]), load(sys.argv[2])
def ready(i):
    d = docs.get(i)
    if not d or not d.get("chunks_count"):
        return False
    # документ, который уже был в базе, считается обработанным заново, когда у него сменилась дата обновления
    return i not in before or d.get("updated_at") != before[i].get("updated_at")
print(" ".join(i for i in sys.argv[3:] if not ready(i)))
PY
)"
    [[ -z "$missing" ]] && break
    if ((SECONDS > deadline)); then echo "Не обработаны за 20 минут: $missing (проверьте docker logs virtgal-ai-core)" >&2; failed=1; break; fi
    sleep 10
  done
  python3 - "$WORK/docs.json" "${uploaded[@]}" <<'PY'
import json, sys
try:
    docs = {d["document_id"]: d for d in json.load(open(sys.argv[1])).get("documents", [])}
except Exception:
    docs = {}
for i in sys.argv[2:]:
    d = docs.get(i)
    print(f"{i}: " + (f"{d['pages_count']} стр., {d['chunks_count']} фрагментов, доступ {d['access']}" if d else "нет в базе знаний"))
PY
fi

exit "$failed"
