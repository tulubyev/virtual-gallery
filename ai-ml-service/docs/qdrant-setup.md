# Установка и настройка Qdrant Vector Database

## Варианты развертывания Qdrant

### 1. 🌐 Облачный сервис (Рекомендуемый)

#### Qdrant Cloud (qdrant.tech)
```bash
# Регистрация на https://qdrant.tech/
# Получение API ключа и URL

# Конфигурация в .env
QDRANT_URL=https://your-cluster.qdrant.tech:6333
QDRANT_API_KEY=your-api-key-here
```

**Преимущества:**
- ✅ Управляемый сервис
- ✅ Автоматическое масштабирование
- ✅ Резервное копирование
- ✅ 1GB бесплатного хранилища

**Стоимость:** $25/месяц за 1M векторов

#### Alternative: Pinecone
```bash
# https://www.pinecone.io/
PINECONE_API_KEY=your-key
PINECONE_ENVIRONMENT=your-env
```

### 2. 🐳 Docker на VPS (Если есть VPS)

#### Требования к VPS:
- Ubuntu 20.04+
- 2GB RAM минимум
- 20GB диск
- Docker и Docker Compose

#### Установка:
```bash
# Создать директорию
mkdir qdrant-server && cd qdrant-server

# Создать docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  qdrant:
    image: qdrant/qdrant:v1.7.4
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - ./qdrant_data:/qdrant/storage
    environment:
      - QDRANT__SERVICE__HTTP_PORT=6333
      - QDRANT__SERVICE__GRPC_PORT=6334
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:6333/health"]
      interval: 30s
      timeout: 10s
      retries: 3
EOF

# Запустить
docker-compose up -d

# Проверить
curl http://localhost:6333/health
```

#### Nginx Reverse Proxy (для безопасности):
```bash
# Установить nginx
sudo apt update && sudo apt install nginx

# Создать конфиг
sudo tee /etc/nginx/sites-available/qdrant << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:6333;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Включить сайт
sudo ln -s /etc/nginx/sites-available/qdrant /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 3. 🔧 Локальная разработка

#### Docker Compose для разработки:
```yaml
# docker-compose.yml (уже создан в ai-ml-service)
version: '3.8'
services:
  qdrant:
    image: qdrant/qdrant:v1.7.4
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - qdrant_data:/qdrant/storage
```

#### Запуск:
```bash
cd ai-ml-service
docker-compose up qdrant -d
```

## Конфигурация Qdrant

### Основные настройки:

#### config.yaml:
```yaml
log_level: INFO
storage:
  storage_path: ./qdrant_storage
  snapshots_path: ./qdrant_snapshots
  temp_path: ./qdrant_temp
  wal_path: ./qdrant_wal
  performance:
    max_search_threads: 4
service:
  http_port: 6333
  grpc_port: 6334
  max_request_size_mb: 32
  max_workers: 4
```

### Оптимизации для производительности:

#### Для большого количества векторов:
```yaml
storage:
  optimizers:
    indexing_threshold: 10000
    memmap_threshold: 50000
    max_segment_size: 1000000
```

## Тестирование установки

### Python клиент:
```python
from qdrant_client import QdrantClient

# Подключение
client = QdrantClient("localhost", port=6333)

# Проверка
print("Collections:", client.get_collections())
```

### cURL тесты:
```bash
# Health check
curl http://localhost:6333/health

# Создать коллекцию
curl -X PUT http://localhost:6333/collections/test \
  -H "Content-Type: application/json" \
  -d '{
    "vectors": {
      "size": 1536,
      "distance": "Cosine"
    }
  }'

# Проверить коллекции
curl http://localhost:6333/collections
```

## Миграция данных из PostgreSQL

### Скрипт миграции:
```python
import psycopg2
from qdrant_client import QdrantClient
import json

# Подключения
pg_conn = psycopg2.connect("postgresql://...")
qdrant = QdrantClient("localhost", port=6333)

# Миграция embeddings
cursor = pg_conn.cursor()
cursor.execute("SELECT embedding_id, content_type, content_id, embedding_vector, metadata FROM embeddings")

for row in cursor:
    embedding_id, content_type, content_id, embedding_str, metadata = row

    # Parse embedding from TEXT (JSON array)
    embedding = json.loads(embedding_str)

    # Upsert to Qdrant
    qdrant.upsert(
        collection_name="embeddings",
        points=[{
            "id": embedding_id,
            "vector": embedding,
            "payload": {
                "content_type": content_type,
                "content_id": content_id,
                **(metadata or {})
            }
        }]
    )

print("Migration completed!")
```

## Мониторинг и обслуживание

### Метрики:
```bash
# Prometheus endpoint
curl http://localhost:6333/metrics
```

### Backup:
```bash
# Создать snapshot
curl -X POST http://localhost:6333/collections/{collection_name}/snapshots

# Скачать snapshot
curl http://localhost:6333/collections/{collection_name}/snapshots/{snapshot_name} -o backup.tar
```

### Обновление:
```bash
# Остановить
docker-compose down

# Обновить образ
docker pull qdrant/qdrant:v1.7.4

# Запустить
docker-compose up -d
```

## Рекомендации для продакшена

1. **Qdrant Cloud** - самый простой вариант
2. **VPS с Docker** - для полного контроля
3. **Kubernetes** - для масштабируемости
4. **Мониторинг** - Prometheus + Grafana
5. **Backup** - регулярные snapshots

## Troubleshooting

### Проблема: Недостаточно памяти
```
Решение: Увеличить RAM или использовать memmap_threshold
```

### Проблема: Медленный поиск
```
Решение: Настроить indexing_threshold и max_search_threads
```

### Проблема: Диск заполнен
```
Решение: Настроить snapshots и cleanup политику