# AI/ML Service for Virtual Art Gallery

Сервис искусственного интеллекта и машинного обучения для виртуальной галереи искусств. Предоставляет функциональность анализа изображений, обработки PDF документов и системы Retrieval-Augmented Generation (RAG).

## 🚀 Быстрый старт

### Вариант 1: Локальная разработка (с локальным Qdrant)

```bash
# 1. Установить Qdrant локально
npm run setup:qdrant-local

# 2. Настроить environment
cp .env.example .env
# QDRANT_URL уже настроен на http://localhost:6333

# 3. Запустить разработку
docker-compose up -d
```

### Вариант 2: Продакшен на beget.com (с Qdrant Cloud)

```bash
# 1. Инициализация БД
npm run db:init-beget-auto

# 2. Настройка environment
cp .env.example .env
# QDRANT_URL и QDRANT_API_KEY уже настроены для Cloud

# 3. Запуск сервиса
docker-compose -f docker-compose.prod.yml up -d
```

## Архитектура

### Компоненты
- **API Gateway** (Node.js/Express) - REST API для взаимодействия с основным приложением
- **AI/ML Core** (Python/FastAPI) - Основная логика обработки изображений и текста
- **Vector Database** (Qdrant/PostgreSQL+pgvector) - Хранение векторных представлений
- **Task Queue** (Redis) - Асинхронная обработка задач
- **External APIs** (OpenAI, Google Vision) - Внешние AI сервисы

### Микросервисная архитектура
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Main App      │    │  AI/ML Service  │    │  Vector DB      │
│                 │◄──►│                 │◄──►│  (Qdrant/PG)    │
│ - Gallery UI    │    │ - Image Analysis│    │                 │
│ - User Mgmt     │    │ - PDF Processing│    │ - Embeddings    │
│ - Basic CRUD    │    │ - RAG System    │    │ - Search        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                    ┌─────────────────┐
                    │   External APIs │
                    │ - OpenAI        │
                    │ - Google Vision │
                    │ - AWS Rekognition│
                    └─────────────────┘
```

## Быстрый старт

### Предварительные требования
- Docker и Docker Compose
- Node.js 18+
- Python 3.9+
- PostgreSQL 14+ с pgvector
- OpenAI API ключ

### Установка

1. **Клонировать репозиторий**
```bash
git clone https://github.com/your-org/ai-ml-service.git
cd ai-ml-service
```

2. **Настроить переменные окружения**
```bash
cp .env.example .env
# Отредактировать .env с вашими API ключами
```

3. **Запуск с Docker Compose**
```bash
docker-compose up -d
```

4. **Инициализация базы данных**
```bash
npm run db:init
```

## API Endpoints

### Анализ изображений
```http
POST /api/v1/images/analyze
Content-Type: application/json

{
  "image_url": "https://example.com/artwork.jpg",
  "artwork_id": 123
}
```

### Обработка PDF
```http
POST /api/v1/pdfs/process
Content-Type: application/json

{
  "pdf_url": "https://example.com/document.pdf",
  "document_id": "doc_123"
}
```

### RAG запросы
```http
POST /api/v1/rag/query
Content-Type: application/json

{
  "query": "Расскажите о стиле импрессионизма",
  "filters": {"style": "impressionism"}
}
```

## Разработка

### Структура проекта
```
ai-ml-service/
├── src/
│   ├── api/           # REST API endpoints
│   ├── services/      # Бизнес логика
│   ├── models/        # AI/ML модели
│   ├── utils/         # Вспомогательные функции
│   ├── config/        # Конфигурация
│   └── database/      # Схемы и миграции БД
├── tests/
│   ├── unit/          # Модульные тесты
│   └── integration/   # Интеграционные тесты
├── docs/              # Документация
├── scripts/           # Скрипты развертывания
├── docker/            # Docker файлы
└── .github/           # CI/CD workflows
```

### Запуск в режиме разработки
```bash
# API Gateway (Node.js)
npm run dev:api

# AI/ML Core (Python)
cd src/models && python -m uvicorn main:app --reload

# Vector Database
docker run -p 6333:6333 qdrant/qdrant
```

## Конфигурация

### Переменные окружения
```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/ai_ml_db

# External APIs
OPENAI_API_KEY=sk-...
GOOGLE_VISION_API_KEY=...

# Vector Database
QDRANT_URL=http://localhost:6333
# или
PGVECTOR_CONNECTION_STRING=postgresql://user:pass@localhost:5432/vectors

# Redis (для очередей)
REDIS_URL=redis://localhost:6379

# Service
PORT=8000
NODE_ENV=development
```

## Тестирование

```bash
# Модульные тесты
npm run test:unit

# Интеграционные тесты
npm run test:integration

# E2E тесты
npm run test:e2e
```

## Развертывание

### На beget.com хостинге

#### 1. Инициализация базы данных
```bash
# Автоматическая инициализация (Windows)
npm run db:init-beget-auto

# Или вручную:
export DATABASE_URL="postgresql://tulubyev:CrossBaikal6times!@quoquuquosijo.beget.app:5432/aimlservice_db"
npm run db:init-beget
```

**🔍 Troubleshooting:**
- Если connection refused: Проверьте доступность beget.com с вашего IP
- Если timeout: База данных может быть недоступна извне
- Если auth error: Проверьте credentials в connection string

#### 2. Production deployment с Docker
```bash
# Скопируйте production environment
cp .env.example .env
# Отредактируйте .env с реальными значениями API ключей

# Запуск в продакшене
docker-compose -f docker-compose.prod.yml up -d

# Проверка здоровья
curl http://your-domain.com:8000/health
```

#### 3. Альтернативный деплой (без Docker)
```bash
# Установка зависимостей
npm install --production

# Запуск сервиса
npm start
```

### Development deployment
```bash
# Локальная разработка
docker-compose up -d

# С полным ребилдом
docker-compose up --build
```

### Мониторинг
- **Health checks**: `/health`
- **Metrics**: `/metrics` (Prometheus)
- **Logs**: ELK stack интеграция

## Безопасность

- JWT аутентификация для API
- Rate limiting
- Input validation и sanitization
- API key ротация
- Audit logging

## Производительность

### Метрики
- **Image analysis**: < 30 сек
- **PDF processing**: < 5 мин на документ
- **RAG queries**: < 500ms
- **API availability**: > 99.5%

### Оптимизации
- Batch processing для bulk операций
- Caching частых запросов
- Connection pooling для БД
- Async processing для тяжелых задач

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Контакты

- **Maintainer**: AI/ML Team
- **Issues**: [GitHub Issues](https://github.com/your-org/ai-ml-service/issues)
- **Documentation**: [Wiki](https://github.com/your-org/ai-ml-service/wiki)