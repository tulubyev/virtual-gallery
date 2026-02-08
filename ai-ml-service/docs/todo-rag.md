# TODO: Задачи для RAG-страницы

Страница RAG — административный инструмент куратора для управления базой знаний,
которая питает AI-ассистента на странице ArtWiki.

Ниже — план задач, сгруппированных по приоритету. Каждая задача привязана
к существующим API-эндпоинтам Python-сервиса (ai-ml-service) и Node.js прокси.

---

## Приоритет 1 — Основной функционал (MVP)

### 1.1 Статистика базы знаний (дашборд)
**Цель:** Показать куратору текущее состояние базы знаний «на одном экране».
- Блок с 4 карточками: PDF-чанки, Внешние произведения, Оцифрованные произведения, Всего векторов
- Статус подключения к AI/ML сервису (зелёный/красный индикатор)
- **API:** `GET /rag/stats` → `stats.pdf_chunks_count`, `stats.artworks_count`, `stats.external_count`, `stats.total_vectors`
- **API:** `GET /health` → статус сервиса

### 1.2 Список загруженных PDF-документов
**Цель:** Показать все обработанные документы с метаданными и статусами.
- Таблица/карточки: название, категория, страниц, статус, дата, резюме
- Фильтры: по категории, статусу обработки
- Иконки статуса: queued → processing → completed / failed
- Отображение AI-категоризации (стили, художники, техники, ключевые слова)
- **API:** нужен новый эндпоинт `GET /pdfs/documents` (список из таблицы `pdf_documents`)
- **Существующий API:** `GET /pdfs/processing/{task_id}` — статус конкретной задачи

### 1.3 Реальная загрузка PDF через FormData
**Цель:** Исправить текущую загрузку — сейчас отправляется `blob:` URL, который недоступен серверу.
- Загрузка файла через `multipart/form-data` на Node.js прокси
- Node.js сохраняет файл → загружает в S3 → отправляет S3 URL в Python-сервис
- Отслеживание прогресса обработки через polling `GET /pdfs/processing/{task_id}`
- Прогресс-бар с этапами: загрузка → OCR → чанкинг → эмбеддинги → категоризация → готово
- **API (Node.js):** `POST /api/v1/rag/documents/upload` — уже существует, принимает `multer`
- **API (Python):** `POST /pdfs/process` → фоновая задача, возвращает `task_id`

### 1.4 Отслеживание задач в реальном времени
**Цель:** Мониторинг активных фоновых задач (PDF, импорт, переиндексация).
- Секция «Активные задачи» с автообновлением (polling каждые 5 сек)
- Карточка задачи: тип, статус, прогресс, время начала
- Статусы: queued, processing, completed, failed
- **API:** `GET /pdfs/processing/{task_id}` — статус PDF
- **API:** `GET /external/fetch/status/{task_id}` — статус импорта внешних источников

---

## Приоритет 2 — Управление коллекциями Qdrant

### 2.1 Просмотр коллекций
**Цель:** Визуализация содержимого векторной БД.
- Список коллекций с количеством точек и статусом
- Детали коллекции: имя, количество точек, размерность, индекс
- **API:** `GET /rag/collections` → список всех коллекций

### 2.2 Поиск внутри коллекции
**Цель:** Тестирование качества поиска для отладки RAG.
- Поле ввода запроса + выбор коллекции
- Результаты: текст чанка, score, metadata
- Полезно для проверки, что документы правильно проиндексированы
- **API:** `POST /rag/collections/{collection_name}/search` → параметры: query, limit

### 2.3 Переиндексация
**Цель:** Пересоздание эмбеддингов из БД (после обновления модели или потери данных в Qdrant).
- Три кнопки: «Переиндексировать PDF», «Переиндексировать внешние», «Переиндексировать оцифрованные»
- Подтверждение перед запуском
- Прогресс выполнения
- **API:** `POST /pdfs/reindex` → переиндексация PDF-чанков
- **API:** `POST /external/reindex` → переиндексация внешних произведений
- **API:** `POST /digitization/artworks/reindex` → переиндексация оцифрованных

---

## Приоритет 3 — Внешние источники

### 3.1 Импорт из внешних музейных API
**Цель:** Обогащение базы знаний данными из мировых музеев.
- Панель с 4 источниками: MET Museum, Rijksmuseum, WikiArt, Harvard Art Museums
- Для каждого: поле поиска, лимит, кнопка «Импортировать»
- Статистика: сколько записей уже импортировано из каждого источника
- Для Rijksmuseum и Harvard — поле для API-ключа
- **API:** `POST /external/fetch/met` → параметры: query, limit, index_to_qdrant
- **API:** `POST /external/fetch/rijks` → параметры: query, limit, api_key
- **API:** `POST /external/fetch/wikiart` → параметры: artist_url, letter, page
- **API:** `POST /external/fetch/harvard` → параметры: query, limit, api_key

### 3.2 Статистика внешних источников
- Количество записей по каждому источнику
- Общее количество проиндексированных
- **API:** `GET /external/sources/stats` → breakdown по source

---

## Приоритет 4 — Оцифровка произведений

### 4.1 Панель оцифровки
**Цель:** Загрузка изображений произведений с AI-анализом и водяными знаками.
- Форма: лицевая сторона (обязательно), обратная сторона (опционально)
- Чекбоксы: видимый водяной знак, невидимый (стеганография), генерация NFT
- Прогресс: загрузка → AI-анализ лицевой → OCR обратной → водяные знаки → готово
- **API:** `POST /digitization/digitize` → фоновая задача с progress
- **API:** `GET /digitization/digitize/{task_id}` → статус с progress/current_step

### 4.2 Список оцифрованных произведений
- Таблица: название, художник, стиль, статус (pending/approved/rejected)
- Фильтр по статусу
- Действия куратора: одобрить, отклонить, редактировать метаданные
- При одобрении — автоматическая индексация в Qdrant
- **API:** `GET /digitization/artworks` → список, фильтр по status
- **API:** `GET /digitization/artworks/{id}` → детали
- **API:** `PATCH /digitization/artworks/{id}/approve` → одобрение + индексация
- **API:** `PATCH /digitization/artworks/{id}/reject` → отклонение
- **API:** `PATCH /digitization/artworks/{id}` → редактирование метаданных

### 4.3 Генерация NFT-метаданных
- Для одобренных произведений — кнопка «Сгенерировать NFT»
- Выбор номера и тиража издания
- Просмотр сгенерированных ERC-721 метаданных (JSON)
- **API:** `POST /digitization/artworks/{id}/generate-nft` → edition_number, edition_total
- **API:** `GET /digitization/artworks/{id}/nft-metadata` → ERC-721 JSON

---

## Приоритет 5 — Аналитика и качество

### 5.1 История RAG-запросов
**Цель:** Анализ того, как используется база знаний на ArtWiki.
- Таблица запросов: текст, ответ, confidence, время обработки, дата
- Фильтры: по дате, по уровню confidence
- Подсветка запросов с низким confidence (< 50%) — требуют внимания
- **API:** нужен новый эндпоинт `GET /rag/queries` (из таблицы `rag_queries`)

### 5.2 Обратная связь по ответам
- Сбор оценок пользователей (1-5 звёзд) из ArtWiki
- Визуализация: средняя оценка, тренд, худшие ответы
- **API (Node.js):** `POST /api/v1/rag/feedback` → уже существует (query_id, rating, feedback)
- Нужна реализация сохранения в БД (сейчас TODO)

---

## Архитектурные заметки

### Взаимодействие компонентов
```
rag.html (frontend)
  ↓ fetch()
Node.js прокси (server.js / src/routes/)
  ↓ axios
Python FastAPI (ai-ml-service, порт 8001)
  ↓
Qdrant Cloud (векторная БД)
PostgreSQL (метаданные, документы, запросы)
Redis (очередь задач, статусы)
S3 (файлы, изображения)
```

### Существующие таблицы БД
- `pdf_documents` — метаданные PDF (document_id, filename, pages_count, category, styles, artists, summary...)
- `pdf_chunks` — чанки текста (document_id, chunk_index, content, embedding)
- `external_artworks` — произведения из внешних музеев (source, external_id, title, artist, metadata)
- `digitized_artworks` — оцифрованные произведения (title, artist, ai_analysis, watermarks, nft_metadata)
- `rag_queries` — история RAG-запросов (query_text, response_text, confidence, processing_time)

### Коллекции Qdrant
- `pdf_chunks` — эмбеддинги текстовых чанков из PDF
- `external_artworks` — эмбеддинги данных из внешних музеев
- `artworks` — эмбеддинги оцифрованных (одобренных) произведений

### Ключевые Python-сервисы
- `ai_service.py` — генерация эмбеддингов, анализ изображений через LLM, генерация текста
- `pdf_service.py` — OCR, извлечение текста, чанкинг PDF
- `qdrant_client.py` — CRUD для Qdrant (create_collection, upsert_points, search_points)
- `external_sources_service.py` — HTTP-клиенты для MET, Rijksmuseum, WikiArt, Harvard
- `watermark_service.py` — видимые + стеганографические водяные знаки
- `nft_service.py` — генерация ERC-721 метаданных
- `s3_service.py` — загрузка/скачивание файлов из S3
- `redis_client.py` — кэш и очередь задач
- `database.py` — PostgreSQL через asyncpg

### Недостающие эндпоинты (нужно добавить)
1. `GET /pdfs/documents` — список PDF из БД (для задачи 1.2)
2. `GET /rag/queries` — история RAG-запросов (для задачи 5.1)
3. Реализация сохранения feedback в БД (Node.js, задача 5.2)
