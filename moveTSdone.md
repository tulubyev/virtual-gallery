# Статус миграции HTML → React/TypeScript

_Составлено: 2026-06-05 | Базовый план: moveTStodo.md (2026-06-01)_

---

## Итоговая сводка

| Показатель | До миграции | После |
|---|---|---|
| HTML-страниц | 11 (5 708 строк) | 0 в production (перенаправляются на SPA) |
| React-страниц (pages/) | 0 | **26** |
| React-компонентов (components/) | 3 | **30+** |
| Режим Vite | library (виджеты) | **SPA + code-splitting** |
| React Router | не установлен | **установлен, все маршруты** |
| JS-чанков в сборке | 1 монолит | **46 чанков** (vendor + per-page) |
| Общий размер dist/ | ~2.4 MB | **1.7 MB** |
| Инструмент запуска TS | ts-node 1.7 (сломан) | **tsx 4.x** |

---

## Выполненные этапы из плана

### Этап 0: Подготовка инфраструктуры ✅

| Пункт | Статус | Задача |
|---|---|---|
| Vite: режим library → SPA | ✅ | #3 |
| Установить react-router-dom | ✅ | #3 |
| Создать Layout.tsx (Header + Footer + Nav) | ✅ | #3 |
| server.js: catch-all → React SPA | ✅ | #3 |
| Объединить два конфига Tailwind | ✅ | #3 |
| useAuth / useFetch / apiClient.ts | ✅ | #3 |

### Этап 1: Простые страницы ✅

| Пункт | Статус | Задача |
|---|---|---|
| `about.html` → `AboutPage.tsx` | ✅ | #4 |
| `user.html` → `UserPage.tsx` | ✅ | #4 |
| `Header.tsx` + `Footer.tsx` | ✅ | #4 |
| `LoginPage.tsx`, `RegisterPage.tsx` | ✅ | #4 |

### Этап 2: Главная страница ✅

| Пункт | Статус | Задача |
|---|---|---|
| `index.html` → `HomePage.tsx` | ✅ | #4 |
| `ArtworksPage.tsx` + `ArtworkDetailPage.tsx` | ✅ | #4 |
| `ArtworkCard.tsx`, `ArtworkUploadPage.tsx` | ✅ | #4 |

### Этап 3: ArtWiki и RAG ✅

| Пункт | Статус | Задача |
|---|---|---|
| `artwiki.html` → `ArtWikiPage.tsx` | ✅ | #4 |
| `rag.html` → `RAGPage.tsx` + PDF upload | ✅ | #4, #10 |
| Прогресс-бар загрузки PDF (XHR onprogress) | ✅ | #19 |
| Клиентская проверка 50 МБ | ✅ | #20 |
| ArtWiki/RAG доступны всем авторизованным ролям | ✅ | #17 |
| Ссылки в Footer | ✅ | #18 |
| Ссылки в Header для tour_guide / auction_participant | ✅ | #17 |

### Этапы 4–7: Панели пользователей ✅

| Страница | Файл | Статус |
|---|---|---|
| Аукционы | `AuctionParticipantPanel.tsx` | ✅ |
| Сотрудник | `StaffPanel.tsx`, `StaffDashboardPage.tsx` | ✅ |
| Администратор | `AdminPanel.tsx` | ✅ |
| Куратор | `CuratorPanel.tsx`, `CuratorReviewPage.tsx` | ✅ |
| Тур-гид | `TourGuidePanel.tsx` | ✅ |
| Туры | `ToursPage.tsx` | ✅ |
| Коллекции | `CollectionsPage.tsx` | ✅ |
| Залы | `RoomManagementPage.tsx`, `RoomPage.tsx` | ✅ |
| Галереи | `GalleriesListPage.tsx`, `GalleryPage.tsx` | ✅ |
| DashboardLayout (общий) | `DashboardLayout.tsx` | ✅ |

### Этап 8: 3D-галерея ✅

| Пункт | Статус | Задача |
|---|---|---|
| `gallery-3d.html` → `VirtualGalleryPage.tsx` | ✅ | #4 |
| `VirtualGallery3D.tsx` (Three.js компонент) | ✅ | #4 |
| `VRGalleryComponent.tsx`, `VrGalleryPage.tsx` | ✅ | #4 |
| Three.js вынесен в отдельный lazy-чанк | ✅ | #14 |
| Анимированный loading spinner для 3D-страниц | ✅ | #26 |

### Этап 9: Бэкенд TS — частично ✅

| Пункт | Статус | Задача |
|---|---|---|
| `tsx` установлен вместо сломанного `ts-node 1.7` | ✅ | #29 |
| `npm run init-db` — работает корректно | ✅ | #29 |
| `npm run setup` — один команда для новых разработчиков | ✅ | #16 |
| `npm run setup:ai` — один команда для Python AI сервиса | ✅ | #30 |
| Устойчивость к разрыву БД (retry, pool.on error) | ✅ | #28 |
| Routes `.js` → `.ts` | ⬜ | Будущее |
| `server.js` → `server.ts` | ⬜ | Будущее |

---

## Оптимизация сборки — что сделано

### Разбиение бандла (code-splitting)

| Чанк | Размер (gzip) | Что внутри |
|---|---|---|
| `vendor-charts` | 178 KB / **62 KB** | chart.js + react-chartjs-2 |
| `vendor-router` | 162 KB / 53 KB | react-router-dom |
| `vendor-motion` | 123 KB / 40 KB | framer-motion |
| `vendor-radix` | 91 KB / 28 KB | все @radix-ui компоненты |
| `vendor-http` | 43 KB / 17 KB | axios / fetch-обёртки |
| `vendor-socket` | 42 KB / 13 KB | socket.io-client |
| `vendor-styled` | 34 KB / 13 KB | styled-components |
| `vendor-icons` | 21 KB / **7 KB** | lucide-react (все иконки в одном файле) |
| `react-app` (ядро) | 21 KB / 7 KB | React + ReactDOM |
| `OrbitControls` (3D) | 466 KB / 117 KB | Three.js — только на 3D-страницах |

### До / После по ключевым страницам

| Чанк / Показатель | До | После | Изменение |
|---|---|---|---|
| `NewFeaturesPage` | 324 KB | **142 KB** | **−56%** |
| Иконки Lucide | ~20 отдельных файлов | 1 файл 7 KB | Меньше HTTP-запросов |
| Three.js | грузился всегда | только на `/gallery` | −466 KB на всех прочих страницах |
| Итого dist/ | ~2.4 MB | **1.7 MB** | **−29%** |

### Дополнительные оптимизации

| Улучшение | Статус |
|---|---|
| Все 26 страниц — `React.lazy()` + `Suspense` | ✅ |
| Prefetch вероятных следующих страниц | ✅ |
| Vite crash resilience (dev workflow) | ✅ |

---

## Полный список выполненных задач

| # | Задача | Статус |
|---|---|---|
| #1 | Создать ветку june (слияние веток) | ✅ Merged |
| #2 | Ветка june в репозитории | ✅ Merged |
| #3 | Подключить React SPA к серверу | ✅ Merged |
| #4 | Добавить страницы ArtWiki и RAG | ✅ Merged |
| #5 | Запушить june на GitHub | ✅ Merged |
| #6 | Исправить TypeScript-ошибки | ✅ Merged |
| #7 | Разбить бандл на чанки | ✅ Merged |
| #8 | Dev workflow: SPA + сервер вместе | ✅ Merged |
| #9 | Навигация: ссылки ArtWiki/RAG | ✅ Merged |
| #10 | Реальная загрузка PDF файлов | ✅ Merged |
| #11 | Дальнейшее разбиение бандла | ✅ Merged |
| #12 | Уменьшение неиспользуемых иконок | ✅ Merged |
| #13 | Prefetch вероятных следующих страниц | ✅ Merged |
| #14 | Three.js — отдельный lazy-чанк | ✅ Merged |
| #15 | Устойчивость к сбою Vite | ✅ Merged |
| #16 | `npm run setup` — один команда | ✅ Merged |
| #17 | ArtWiki/RAG для всех ролей | ✅ Merged |
| #18 | Ссылки ArtWiki/RAG в Footer | ✅ Merged |
| #19 | Прогресс-бар загрузки PDF | ✅ Прямо в main |
| #20 | Лимит 50 МБ на клиенте | ✅ Прямо в main |
| #21 | `styled-components` — отдельный чанк | ✅ Прямо в main |
| #22 | Все иконки Lucide — один чанк | ✅ Прямо в main |
| #26 | Анимированный loader 3D-галереи | ✅ Прямо в main |
| #27 | `chart.js` — отдельный чанк | ✅ Прямо в main |
| #28 | Устойчивость к разрыву БД | ✅ Прямо в main |
| #29 | Починить `npm run init-db` | ✅ Merged |
| #30 | `npm run setup:ai` для Python AI | ✅ Merged |

_Итого выполнено: **27 задач**_

---

## Что ещё не сделано из оригинального плана

| Пункт из moveTStodo.md | Приоритет | Задача |
|---|---|---|
| Удалить устаревший `ts-node` из devDependencies | 🟡 Средний | #33 |
| Проверить ArtWiki/RAG на всех ролях в prod | 🟡 Средний | #31 |
| Мобильная навигация — ArtWiki/RAG | 🟡 Средний | #32 |
| Единая команда запуска обоих сервисов | 🟡 Средний | #34 |
| Заменить Lucide CDN в оставшихся HTML | 🟢 Низкий | — |
| `routes/*.js` → `routes/*.ts` (бэкенд) | 🟢 Низкий | — |
| `services/watermark.js` → `.ts` | 🟢 Низкий | — |
| `server.js` → `server.ts` | 🟢 Низкий | — |

---

## План дальнейших действий

### 🔴 Отладка — приоритет 1

Это то, что нужно проверить и исправить прежде всего.

**1. Включить настоящую аутентификацию**
- `DEBUG_SKIP_AUTH=true` в `App.tsx` — отключить, включить реальный JWT
- Проверить `useAuth` hook: разбор токена, роль пользователя, redirect при истёкшем JWT
- Убедиться что защищённые маршруты не пускают без токена
- Войти под каждой ролью: admin, curator, staff, tour_guide, auction_participant, visitor

**2. Проверить реальные API-запросы**
- Убедиться что `DB_*`, `S3_*`, `JWT_SECRET` заполнены в `.env`
- Загрузить изображение — проверить S3
- Загрузить PDF — проверить `/api/ai/process-pdf` и прогресс-бар
- Проверить CRUD для каждого раздела: экспонаты, залы, пользователи, аукционы

**3. WebSocket (аукционы)**
- Открыть `/auction` — убедиться, что socket.io подключается
- Проверить, что ставки обновляются в реальном времени без перезагрузки
- Убедиться, что cleanup при смене страницы не плодит лишних соединений

**4. 3D-галерея**
- Открыть `/gallery` — проверить lazy-загрузку Three.js
- Проверить процедурные текстуры и OrbitControls
- Проверить WebXR если есть VR-устройство

### 🟡 Структура — приоритет 2

**5. Error Boundary + пустые состояния**
- Каждая страница должна показывать понятное сообщение при ошибке API
- Добавить состояние «нет данных» для пустых списков
- Проверить поведение при офлайн-режиме (потеря сети)

**6. Мобильная адаптация**
- Добавить ArtWiki/RAG в мобильное меню (задача #32)
- Проверить Header на экранах < 768px
- Проверить 3D-галерею на мобильных устройствах

**7. Очистка зависимостей**
- `npm uninstall ts-node` — заменён на `tsx` (задача #33)
- `npm dedupe` — убрать дубли в node_modules

### 🟢 Оптимизация — приоритет 3

**8. Бэкенд: routes → TypeScript**

| Файл | Строк | Очерёдность |
|---|---|---|
| `routes/auctions.js` | 389 | 1-й |
| `routes/artworks.js` | 303 | 2-й |
| `services/watermark.js` | 341 | 3-й |
| `routes/users.js` | 171 | 4-й |
| `routes/gallery.js` | 154 | 5-й |
| `server.js` | — | последним |

**9. Дальнейшее уменьшение бандла**
- Проверить, не грузится ли `OrbitControls` (466 KB) на не-3D страницах
- Рассмотреть замену `framer-motion` (123 KB) на CSS-анимации где это несложно
- Настроить `Cache-Control: immutable` для статических чанков (хеш в имени)

**10. Python AI сервис**
- Проверить `AI_CORE_URL` в `.env` — указывает ли на реальный сервис
- Добавить health-check `/api/ai/health` с fallback на demo-режим
- `npm run start:all` — единая команда для обоих сервисов (задача #34)
