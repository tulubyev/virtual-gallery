# Оценка вычислительных ресурсов и выбор AI/ML технологий

## Текущие требования к обработке

### Изображения
- **Объем**: 50-100 изображений в месяц (стартовый), до 1000+ в пиковые периоды
- **Размер**: 5-50MB на изображение
- **Операции**:
  - OCR текста на изображениях
  - Анализ стиля и композиции
  - Извлечение доминирующих цветов
  - Детекция объектов
  - Генерация миниатюр

### PDF документы
- **Объем**: 10-50 документов в месяц
- **Размер**: 5-100 страниц на документ
- **Операции**:
  - OCR для отсканированных документов
  - Извлечение структурированного текста
  - Парсинг метаданных
  - Chunking для RAG

### RAG система
- **Объем данных**: 1000-10000 текстовых фрагментов
- **Запросы**: 100-1000 запросов в день
- **Операции**:
  - Векторизация текста (embeddings)
  - Семантический поиск
  - Генерация ответов

## Рекомендуемая архитектура: Hybrid Cloud + External APIs

### Почему не чистый self-hosted AI?
- **Время разработки**: 6-12 месяцев vs 2-4 месяца с external APIs
- **Качество**: Предобученные модели лучше кастомных для старта
- **Стоимость**: External APIs дешевле для небольших объемов
- **Поддержка**: Не нужно поддерживать ML инфраструктуру

### Почему не только external APIs?
- **Контроль**: Важные компоненты под нашим контролем
- **Приватность**: Чувствительные данные не покидают инфраструктуру
- **Стоимость**: Масштабируемость для больших объемов
- **Кастомизация**: Возможность fine-tuning для специфических нужд

## Вычислительные ресурсы

### Для external APIs подхода (рекомендуемый для старта):
```
- CPU: 2-4 cores (для API orchestration)
- RAM: 8-16 GB
- Storage: 100-500 GB SSD
- Network: 100 Mbps
- Стоимость: $50-200/месяц
```

### Для hybrid подхода (будущий рост):
```
- CPU: 8-16 cores
- RAM: 32-64 GB
- GPU: NVIDIA T4/A100 (опционально, $1-5/час)
- Storage: 1-2 TB NVMe SSD
- Стоимость: $200-1000/месяц
```

## Выбор технологий

### Computer Vision: External APIs
```python
# OpenAI Vision API (рекомендуемый)
import openai

async def analyze_artwork(image_url: str):
    response = await openai.ChatCompletion.create(
        model="gpt-4-vision-preview",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": "Analyze this artwork: style, colors, composition, objects"},
                {"type": "image_url", "image_url": image_url}
            ]
        }]
    )
    return response.choices[0].message.content

# Google Vision API (для OCR)
from google.cloud import vision

def extract_text_from_image(image_path: str):
    client = vision.ImageAnnotatorClient()
    with open(image_path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)
    response = client.text_detection(image=image)
    return response.text_annotations[0].description
```

### NLP/RAG: External APIs + Local Processing
```python
# OpenAI для embeddings и generation
import openai
from openai.embeddings_utils import get_embedding

def create_embeddings(texts: list[str]):
    embeddings = []
    for text in texts:
        embedding = get_embedding(text, engine="text-embedding-ada-002")
        embeddings.append(embedding)
    return embeddings

# Cohere для эффективных embeddings (альтернатива)
import cohere

def create_cohere_embeddings(texts: list[str]):
    co = cohere.Client(api_key="your-key")
    response = co.embed(
        texts=texts,
        model="embed-english-v3.0",
        input_type="search_document"
    )
    return response.embeddings
```

### Vector Database: Qdrant (self-hosted)
```python
# Qdrant для векторного поиска
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

# Инициализация
client = QdrantClient("localhost", port=6333)

# Создание коллекции
client.create_collection(
    collection_name="artwork_embeddings",
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
)

# Поиск
search_results = client.search(
    collection_name="artwork_embeddings",
    query_vector=query_embedding,
    limit=5
)
```

## Инфраструктурный стек

### Development
```yaml
# docker-compose.yml для разработки
version: '3.8'
services:
  qdrant:
    image: qdrant/qdrant:v1.7.4
    ports:
      - "6333:6333"
    volumes:
      - ./qdrant_data:/qdrant/storage

  ai-service:
    build: .
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - QDRANT_URL=http://qdrant:6333
```

### Production (beget.com)
```
- VPS с 4 CPU cores, 8GB RAM, 100GB SSD
- Docker для контейнеризации
- Nginx для reverse proxy
- SSL сертификаты
- Monitoring (Prometheus + Grafana)
- Backup стратегия
```

## Масштабируемость

### Горизонтальное масштабирование
- **Stateless services**: API сервисы можно масштабировать горизонтально
- **Queue-based processing**: Для асинхронных задач
- **CDN**: Для статических ресурсов (изображения)

### Вертикальное масштабирование
- **Database optimization**: Индексы, партиционирование
- **Caching**: Redis для частых запросов
- **Background processing**: Отдельные workers для тяжелых задач

## Мониторинг и оптимизация

### Метрики для отслеживания
- **Latency**: Время ответа API
- **Throughput**: Количество обработанных изображений/документов
- **Error rate**: Процент неудачных операций
- **Cost**: Расходы на external APIs

### Оптимизации
- **Batch processing**: Групповая обработка для снижения costs
- **Caching**: Кэширование результатов анализа
- **Compression**: Сжатие изображений перед анализом
- **Async processing**: Фоновые задачи для больших файлов

## Рекомендация

**Начать с external APIs подхода:**
1. OpenAI GPT-4 Vision для анализа изображений
2. OpenAI Embeddings для RAG
3. Qdrant для векторной базы
4. Минимальная инфраструктура (2-4 CPU, 8-16GB RAM)

**Перейти на hybrid при росте:**
- Локальные модели для часто используемых операций
- GPU для batch processing
- Расширенная инфраструктура

Это позволит быстро запустить MVP и оптимизировать по мере роста.