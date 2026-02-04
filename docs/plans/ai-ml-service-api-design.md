# REST API дизайн для AI/ML сервиса

## Обзор API

API спроектирован по принципам REST с использованием JSON для обмена данными. Все endpoints используют HTTPS и требуют аутентификации через JWT токены.

**Base URL:** `https://ai-ml-service.gallery.com/api/v1`

## Аутентификация

```http
Authorization: Bearer <jwt_token>
```

## Endpoints

### 1. Анализ изображений

#### POST /images/analyze
Анализ произведения искусства

**Request:**
```json
{
  "image_url": "https://s3.gallery.com/artworks/mona_lisa.jpg",
  "artwork_id": 123,
  "analysis_type": "full",
  "priority": "normal"
}
```

**Response:**
```json
{
  "task_id": "task_123456",
  "status": "processing",
  "estimated_time": 30,
  "webhook_url": "https://main-app.com/webhooks/ai-analysis"
}
```

#### GET /images/analysis/{task_id}
Получение результатов анализа

**Response:**
```json
{
  "task_id": "task_123456",
  "status": "completed",
  "artwork_id": 123,
  "analysis": {
    "style": "renaissance",
    "confidence": 0.95,
    "dominant_colors": ["#8B4513", "#DAA520", "#2F4F4F"],
    "composition_elements": ["rule_of_thirds", "golden_ratio"],
    "detected_objects": [
      {
        "name": "person",
        "confidence": 0.98,
        "bounding_box": {"x": 0.2, "y": 0.1, "width": 0.6, "height": 0.8}
      }
    ],
    "image_quality": {
      "brightness": 0.7,
      "contrast": 0.8,
      "sharpness": 0.9
    }
  },
  "processing_time": 25.3,
  "created_at": "2024-01-18T10:00:00Z"
}
```

#### POST /images/batch-analyze
Пакетный анализ изображений

**Request:**
```json
{
  "images": [
    {
      "image_url": "https://s3.gallery.com/artworks/1.jpg",
      "artwork_id": 1
    },
    {
      "image_url": "https://s3.gallery.com/artworks/2.jpg",
      "artwork_id": 2
    }
  ],
  "webhook_url": "https://main-app.com/webhooks/batch-analysis"
}
```

### 2. Обработка PDF документов

#### POST /pdfs/process
Обработка PDF документа

**Request:**
```json
{
  "pdf_url": "https://s3.gallery.com/documents/catalog.pdf",
  "document_id": "doc_123",
  "processing_options": {
    "ocr": true,
    "extract_metadata": true,
    "chunk_size": 1000,
    "chunk_overlap": 200
  }
}
```

**Response:**
```json
{
  "task_id": "pdf_task_789",
  "status": "processing",
  "pages_count": 45,
  "estimated_time": 120
}
```

#### GET /pdfs/processing/{task_id}
Получение результатов обработки PDF

**Response:**
```json
{
  "task_id": "pdf_task_789",
  "status": "completed",
  "document_id": "doc_123",
  "metadata": {
    "title": "Итальянское искусство эпохи Возрождения",
    "author": "Dr. Maria Rossi",
    "pages": 45,
    "language": "ru",
    "topics": ["renaissance", "italian_art", "painting"]
  },
  "chunks": [
    {
      "chunk_id": "chunk_001",
      "content": "Леонардо да Винчи был одним из величайших художников...",
      "page_number": 12,
      "embedding": [0.123, 0.456, ...]
    }
  ],
  "processing_stats": {
    "total_pages": 45,
    "processed_pages": 45,
    "ocr_confidence": 0.92,
    "processing_time": 95.2
  }
}
```

### 3. RAG система

#### POST /rag/query
Запрос к системе RAG

**Request:**
```json
{
  "query": "Расскажите о стиле импрессионизма в творчестве Моне",
  "context": {
    "user_id": 456,
    "session_id": "session_123",
    "filters": {
      "style": "impressionism",
      "artist": "monet"
    }
  },
  "generation_options": {
    "max_tokens": 500,
    "temperature": 0.7,
    "include_sources": true
  }
}
```

**Response:**
```json
{
  "query_id": "rag_001",
  "answer": "Импрессионизм в творчестве Клода Моне характеризуется...",
  "confidence": 0.89,
  "sources": [
    {
      "document_id": "doc_123",
      "chunk_id": "chunk_045",
      "content": "Моне использовал технику импрессионизма...",
      "relevance_score": 0.95,
      "metadata": {
        "page": 23,
        "section": "Импрессионизм"
      }
    }
  ],
  "processing_time": 0.8,
  "tokens_used": 234
}
```

#### POST /rag/feedback
Обратная связь для улучшения RAG

**Request:**
```json
{
  "query_id": "rag_001",
  "rating": 5,
  "feedback": "Ответ был очень полезным и точным",
  "suggested_improvement": null
}
```

### 4. Управление данными

#### POST /embeddings/batch-upsert
Массовое добавление embeddings

**Request:**
```json
{
  "collection": "artwork_embeddings",
  "points": [
    {
      "id": "artwork_123",
      "vector": [0.123, 0.456, ...],
      "payload": {
        "artwork_id": 123,
        "type": "image",
        "style": "renaissance"
      }
    }
  ]
}
```

#### GET /embeddings/search
Поиск по векторам

**Request:**
```json
{
  "collection": "artwork_embeddings",
  "query_vector": [0.123, 0.456, ...],
  "limit": 10,
  "filters": {
    "style": "renaissance",
    "year_from": 1400,
    "year_to": 1600
  }
}
```

### 5. Административные endpoints

#### GET /health
Проверка здоровья сервиса

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "services": {
    "qdrant": "up",
    "openai": "up",
    "database": "up"
  },
  "metrics": {
    "active_tasks": 3,
    "queue_size": 12,
    "avg_response_time": 0.45
  }
}
```

#### GET /tasks
Список активных задач

**Response:**
```json
{
  "tasks": [
    {
      "task_id": "task_123",
      "type": "image_analysis",
      "status": "processing",
      "progress": 0.6,
      "created_at": "2024-01-18T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

#### POST /webhooks/register
Регистрация webhook

**Request:**
```json
{
  "url": "https://main-app.com/webhooks/ai-results",
  "events": ["task_completed", "task_failed"],
  "secret": "webhook_secret_123"
}
```

## Error Handling

Все ошибки возвращаются в стандартном формате:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid image URL provided",
    "details": {
      "field": "image_url",
      "value": "invalid-url"
    }
  },
  "request_id": "req_123456"
}
```

## Rate Limiting

- **Authenticated requests:** 1000/hour per user
- **Image analysis:** 50/hour per user
- **PDF processing:** 10/hour per user
- **RAG queries:** 500/hour per user

## Versioning

API использует versioning через URL path: `/api/v1/`

## Webhooks

Сервис отправляет webhook уведомления на зарегистрированные URLs:

```json
{
  "event": "task_completed",
  "task_id": "task_123",
  "task_type": "image_analysis",
  "result": { ... },
  "timestamp": "2024-01-18T10:30:00Z"
}
```

## SDK и документация

- **OpenAPI spec:** Доступна по `/api/v1/docs`
- **SDK:** JavaScript/TypeScript SDK для основного приложения
- **Postman collection:** Для тестирования API