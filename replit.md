# Virtual Art Gallery

## Overview

The Virtual Art Gallery is a web application designed to revolutionize art appreciation and management through advanced technology. It offers a comprehensive 3D gallery environment with VR support, AI-powered curation, and IoT integration. The platform enables users to explore artworks, receive personalized recommendations, and interact within a rich digital art space. It supports multiple user roles (admin, curator, staff, tour guide, visitors) with robust role-based access control. The project's vision is to leverage technology to enhance the accessibility and experience of art.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Microservices Architecture

The system employs a microservices architecture, separating the application into a Virtual Gallery service (Node.js) and an AI/ML Service (Python). This design allows for independent scaling, technology optimization (Node.js for web, Python for AI), flexible deployment, and fault isolation. Communication between services primarily uses HTTP APIs, with PostgreSQL for shared data and Redis for task queues. A demo mode is available if the AI/ML service is unavailable, providing pre-defined responses.

### Backend Architecture

The backend is built with Node.js and Express, following a service-oriented architecture with dependency injection. It features RESTful endpoints, JWT-based authentication, and a layered structure of controllers, services, models, and middleware.

### Frontend Architecture

The frontend consists of static HTML pages served by Express, augmented with Vite-built React widgets using shadcn/ui. Three.js with WebXR provides 3D graphics and VR capabilities. Tailwind CSS is used for styling. The frontend supports various user roles with distinct, responsively designed dashboards. Key features include a 3D Gallery Builder for curators, procedural generation of gallery environments, and AI-powered recommendations for artwork slot placement.

### AI/ML Service

A dedicated Python FastAPI microservice provides advanced AI functionalities:
- Image analysis via OpenAI GPT-4 Vision.
- PDF processing with OCR and text chunking for a RAG system.
- Artwork digitization, including dual-sided scanning and AI analysis.
- Visible and invisible (steganographic) watermarking for copyright protection.
- NFT Metadata generation (ERC-721 compliant).
- Integration with external art sources (e.g., WikiArt, MET Museum).
- AI-powered categorization of PDF content.

### Database Design

- **Primary Database**: PostgreSQL for relational data such as users, artworks, and galleries.
- **Vector Database**: Qdrant Cloud for AI embeddings and similarity search across artworks and PDF content.
- **Caching**: Redis is utilized for session management and managing job queues for background processing.

### Authentication & Authorization

The system uses JWT tokens for API authentication and implements role-based access control. `bcrypt` is used for secure password hashing.

## External Dependencies

### Cloud Services

- **PostgreSQL Database**: Hosted on beget.com.
- **S3 Storage**: beget.com S3-compatible storage for artwork images.
- **Qdrant Cloud**: Vector database for AI embeddings.
- **OpenRouter**: AI model gateway for accessing various AI models.

### Key NPM Packages (Virtual Gallery)

- `express`, `pg`, `jsonwebtoken`, `bcrypt`, `aws-sdk`, `socket.io`, `sharp`, `multer`.
- React, Vite, Tailwind CSS, shadcn/ui, Three.js, WebXR.

### Python Dependencies (AI/ML Service)

- `fastapi`, `openai`, `qdrant-client`, `sentence-transformers`, `PyPDF2`, `pytesseract`.

## Recent Changes

- **2026-02-07**: Оптимизация производительности 3D-галереи
  - Тени полностью отключены (`shadowMap.enabled = false`), убраны все `castShadow`/`receiveShadow` — экономия десятков shadow-рендер-проходов
  - Освещение: сетка потолочных PointLight (до 9 на комнату) заменена на 1 центральный PointLight, убраны дублирующие ambient/hemisphere в комнатах
  - Процедурные текстуры кэшируются (parquet, marble, wall, concrete) — каждый тип создаётся один раз, а не на каждую комнату
  - Размер canvas текстур уменьшен: parquet/marble 512→256, wall/concrete 256→128
  - LOD: обновляется раз в 30 кадров вместо каждого кадра, добавлен frustum culling (пропуск невидимых картин)
  - Материалы рам, плинтусов, ламп переиспользуются между слотами (shared geometry/material)
  - Minimap: перерисовка только при движении камеры (delta > 0.1), интервал увеличен с 500мс до 1000мс
  - Файлы: `public/js/gallery/main.js`

- **2026-02-07**: 3D-галерея — Этапы 4-7 улучшений
  - Этап 4: Динамические кнопки залов генерируются из API конфигурации `/api/gallery/config`, а не хардкод; автоматическое обрезание длинных названий (>15 символов); LOD менеджер переподключен к загрузке текстур с защитой от перезаписи
  - Этап 5: Интерактивная мини-карта (клавиша M): 280×280 canvas, отображает залы как скруглённые прямоугольники, коридоры как линии, текущую позицию камеры как красную точку; клик по залу — навигация; обновление каждые 500мс
  - Этап 6: Прогресс-бар загрузки с реальным процентом (5% → 100%) и статусными сообщениями на каждом этапе инициализации ("Загрузка конфигурации...", "Строим залы...", "Загружаем картины...", "Готово!")
  - Этап 7: Замена alert()/prompt() на стильные toast-уведомления внутри 3D-галереи (функция `galleryToast` в main.js)
  - Файлы: `public/js/gallery/main.js`, `src/frontend/gallery-3d.html`

- **2026-02-06**: Обновление статистики куратора
  - Реализованы эндпоинты `/api/stats/dashboard` и `/api/artworks/stats`
  - Добавлена логика подсчета активных коллекций, залов, работ и объектов на модерации
  - Информационные блоки в разделе «Наполнение» теперь отображают актуальные данные вместо прочерков
  - Добавлен бейдж с количеством ожидающих проверки работ в боковом меню

- **2026-02-06**: Система обработки изображений при загрузке
  - При загрузке через дашборд сотрудника автоматически создаются 3 версии: оригинал, среднее (800px, вписанное), миниатюра (300px, обрезанная)
  - Все версии загружаются в S3, thumbnail_url сохраняется в БД
  - Сервис `src/services/image-processor.js` — генерация вариантов через sharp
  - Временные файлы автоматически очищаются после загрузки

- **2026-02-06**: Настройки отображения изображений
  - Таблица `display_settings` — пропорции, режим отображения (cover/contain/fill), макс. высота для каждого раздела
  - API: `GET /api/display-settings`, `PATCH /api/display-settings/:key`
  - `src/frontend/assets/image-display.js` — автозагрузка настроек, генерация CSS по data-атрибутам
  - Раздел «Отображение изображений» в Настройках админ-панели
  - Контейнеры изображений используют CSS aspect-ratio вместо фиксированной высоты
  - Списки/сетки используют thumbnail_url, детальные просмотры — оригинал

- **2026-02-06**: Toast-уведомления вместо alert()
  - `src/frontend/assets/toast.js` — всплывающие уведомления с автоисчезновением (5 сек)
  - 4 типа: успех (зелёный), ошибка (красный), предупреждение (оранжевый), информация (фиолетовый)
  - Заменены все alert() на всех страницах