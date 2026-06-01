# План миграции HTML → React/TypeScript

_Последнее обновление: 2026-06-01_

---

## Текущее состояние проекта

### Общая статистика
| Категория | Файлов | Строк кода |
|-----------|--------|------------|
| HTML-страницы (frontend) | 11 | 5 708 |
| JS/TS скрипты (frontend) | 13 | 5 364 |
| CSS стили (frontend) | 6 | 1 925 |
| React-компоненты (уже готовы) | 11 | 1 275 |
| Backend routes (JS) | 12 | 1 603 |
| Backend services (JS+TS) | 10 | 1 177 |
| Backend controllers (TS) | 7 | 1 321 |
| **Итого** | **~70** | **~18 373** |

---

## ✅ Уже выполнено (вне плана миграции)

| Задача | Статус |
|--------|--------|
| Tailwind CSS — перенос с CDN на локальную компиляцию | ✅ Выполнено |
| Сборка `npm run build` — Tailwind + Vite | ✅ Работает |
| Очистка: удалены `coverage/`, `dist/src/` | ✅ Выполнено |
| Режим деплоя: `autoscale` → `vm` (для WebSocket) | ✅ Выполнено |
| База данных: перенесена на `62.217.178.173` | ✅ Выполнено |
| `.gitignore` обновлён | ✅ Выполнено |

---

## Существующая React-инфраструктура (до начала миграции)

- `src/frontend/main.tsx` — точка входа, монтирует React-виджеты в HTML-страницы
- **3 React-компонента**: PDFUploadProcessor, ArtworkAnalysisResult, ArtRAGChat
- **8 UI-компонентов** (shadcn/ui): button, card, badge, alert, progress, scroll-area, textarea
- `vite.config.ts` — настроен в режиме **library** (собирает виджеты, не SPA) ⚠️
- `tailwind.config.ts` + `src/frontend/tailwind.config.js` — два конфига Tailwind
- `src/frontend/services/aiService.ts` — типизированный API-сервис
- `src/frontend/lib/utils.ts` — утилита `cn()`
- `tsconfig.json` — TypeScript конфиг
- React Router — **не установлен** ⚠️

---

## Самые длинные файлы — рекомендации по разбиению

### Фронтенд — JavaScript/TypeScript

| # | Файл | Строк | Рекомендация |
|---|------|-------|-------------|
| 1 | `assets/curator-app.js` | 2 130 | Разбить на 8–10 модулей: залы, загрузка работ, 3D-превью, экспозиция, API |
| 2 | `assets/admin-app.js` | 1 043 | Разбить на 5–6 модулей: пользователи, модерация, статистика, настройки |
| 3 | `assets/staff-app.js` | 569 | Разбить на 3–4 модуля: задачи, обработка работ, отчёты |
| 4 | `assets/main.ts` | 313 | Разбить: auth, hero-slideshow, artworks-loader |
| 5 | `assets/artwork-detail-component.ts` | 304 | → React-компонент `ArtworkDetailModal.tsx` |
| 6 | `assets/admin.ts` | 282 | Объединить с admin-app.js при миграции |
| 7 | `assets/texture-generator.js` | 173 | Оставить как утилиту, добавить типы |
| 8 | `assets/toast.js` | 140 | Заменить на shadcn/ui Toast |

### Фронтенд — HTML-страницы

| # | Файл | Строк | Inline JS | Inline CSS | Рекомендация |
|---|------|-------|-----------|------------|-------------|
| 1 | `curator.html` | 1 000 | 0 | 36 | Layout, Sidebar, RoomsList, ArtworkUpload, GalleryPreview3D |
| 2 | `admin.html` | 790 | 0 | 6 | Layout, Sidebar, UsersTab, ArtworksTab, StatsTab |
| 3 | `artwiki.html` | 766 | 305 | 25 | SearchBar, ArtworkGrid, ArtworkModal, FilterPanel |
| 4 | `index.html` | 761 | 213 | 82 | HeroSlideshow, FeaturedArtworks, AuthModals, Navigation |
| 5 | `auction.html` | 583 | 414 | 7 | AuctionList, AuctionCard, BidPanel, AuctionStats |
| 6 | `auction-participant.html` | 563 | 347 | 8 | LotsList, BidForm, MyBids, AuctionTimer |
| 7 | `staff.html` | 357 | 0 | 4 | Layout, Sidebar, TasksList, ArtworkProcessing |
| 8 | `rag.html` | 308 | 126 | 25 | Уже частично React. Добавить Layout, PDFList |
| 9 | `gallery-3d.html` | 260 | 44 | 147 | Three.js/WebXR — мигрировать последним |
| 10 | `about.html` | 179 | 3 | 3 | Простая статическая. Быстрая миграция |
| 11 | `user.html` | 141 | 3 | 4 | Простая. Быстрая миграция |

### Бэкенд — самые длинные файлы

| # | Файл | Строк | Статус | Рекомендация |
|---|------|-------|--------|-------------|
| 1 | `routes/auctions.js` | 389 | ❌ JS | → `.ts`, разделить router + validation |
| 2 | `controllers/AiController.ts` | 356 | ✅ TS | Разделить по ответственности |
| 3 | `services/watermark.js` | 341 | ❌ JS | → `.ts`, выделить утилиты |
| 4 | `routes/artworks.js` | 303 | ❌ JS | → `.ts` |
| 5 | `controllers/UserController.ts` | 281 | ✅ TS | OK |
| 6 | `controllers/ArtworkController.ts` | 250 | ✅ TS | OK |
| 7 | `routes/users.js` | 171 | ❌ JS | → `.ts` |
| 8 | `routes/gallery.js` | 154 | ❌ JS | → `.ts` |
| 9 | `routes/collections.js` | 133 | ❌ JS | → `.ts` |
| 10 | `routes/health.js` | 112 | ❌ JS | → `.ts` |

---

## Поэтапный план миграции

### Этап 0: Подготовка инфраструктуры ⭐ СЛЕДУЮЩИЙ ШАГ
**Оценка: 3–4 часа**

> ⚠️ Важно: Vite сейчас работает в режиме `lib` (виджеты). Для SPA нужна перенастройка.
> Рекомендуемый подход: параллельная конфигурация — отдельный Vite-конфиг для SPA,
> старые HTML продолжают работать пока идёт миграция.

- [ ] Перенастроить `vite.config.ts`: режим SPA + сохранить режим виджетов (два entry point)
- [ ] Установить `react-router-dom`
- [ ] Создать хук `useAuth.ts` — JWT из localStorage, login/logout
- [ ] Создать хук `useFetch.ts` — типизированные API-запросы с обработкой ошибок
- [ ] Создать хук `useToast.ts` — обёртка над shadcn/ui Toast
- [ ] Создать типизированный `apiClient.ts` — базовый fetch с авторизацией (расширить aiService.ts)
- [ ] Создать общий `Layout.tsx` — Header + Footer + Navigation
- [ ] Настроить `server.js`: fallback `/app/*` → React SPA (старые HTML остаются)
- [ ] Объединить два конфига Tailwind в один

### Этап 1: Простые статические страницы
**Оценка: 2–3 часа**

- [ ] `about.html` → `pages/AboutPage.tsx`
- [ ] `user.html` → `pages/UserPage.tsx`
- [ ] Компонент `Navigation.tsx` (header + nav links)
- [ ] Компонент `Footer.tsx`
- [ ] Компонент `AuthModals.tsx` — вход/регистрация (из main.ts)
- [ ] Настроить роуты в React Router: `/app/about`, `/app/user`
- [ ] Проверить на мобильных устройствах

### Этап 2: Главная страница
**Оценка: 4–5 часов**

- [ ] `index.html` → `pages/HomePage.tsx`
- [ ] `HeroSlideshow.tsx` — слайдшоу (API `/api/artworks/random?limit=10`)
- [ ] `FeaturedArtworks.tsx` — сетка произведений
- [ ] `ArtworkCard.tsx` — карточка (есть заготовка `components/ArtworkCard.ts`)
- [ ] `ArtworkDetailModal.tsx` — из `artwork-detail-component.ts` (304 строки)
- [ ] Хук `useArtworks.ts` — загрузка, пагинация, фильтры
- [ ] Сервис `artworksApi.ts` — типизированные API-вызовы
- [ ] Перенести inline CSS в Tailwind-классы

### Этап 3: ArtWiki и RAG-чат
**Оценка: 3–4 часа**

> ArtRAGChat и PDFUploadProcessor уже готовы — нужна только обёртка

- [ ] `artwiki.html` → `pages/ArtWikiPage.tsx`
- [ ] `SearchBar.tsx` + `FilterPanel.tsx` + `ArtworkGrid.tsx`
- [ ] `ArtworkModal.tsx` — детальный просмотр (переиспользовать из Этапа 2)
- [ ] `rag.html` → `pages/RAGPage.tsx`
- [ ] Подключить существующие: `ArtRAGChat`, `PDFUploadProcessor`, `ArtworkAnalysisResult`
- [ ] Убрать `artwiki` inline-JS (305 строк) → переиспользовать хук `useArtworks`

### Этап 4: Аукционы
**Оценка: 6–8 часов**

> Сложный с точки зрения логики: WebSocket + таймеры + ставки в реальном времени

- [ ] `auction.html` → `pages/AuctionPage.tsx`
- [ ] `AuctionList.tsx`, `AuctionCard.tsx`, `AuctionStats.tsx`
- [ ] `BidPanel.tsx` — панель ставок
- [ ] `AuctionTimer.tsx` — обратный отсчёт
- [ ] `auction-participant.html` → `pages/AuctionParticipantPage.tsx`
- [ ] `LotsList.tsx`, `BidForm.tsx`, `MyBids.tsx`
- [ ] Сервис `auctionsApi.ts`
- [ ] Хук `useAuctionSocket.ts` — socket.io с cleanup в useEffect
- [ ] Типы: `Auction`, `Lot`, `Bid`, `AuctionStatus`

### Этап 5: Панель сотрудника
**Оценка: 4–5 часов**

- [ ] `staff.html` + `staff-app.js` (569 строк) → `pages/StaffDashboard.tsx`
- [ ] `DashboardLayout.tsx` — общий layout для dashboard-страниц (переиспользовать в Этапах 6–7)
- [ ] `Sidebar.tsx` — коллапсируемый sidebar (admin, curator, staff)
- [ ] `TabPanel.tsx` — общий компонент табов
- [ ] `TasksList.tsx`, `ArtworkProcessing.tsx`
- [ ] Сервис `staffApi.ts`

### Этап 6: Панель администратора
**Оценка: 5–7 часов**

- [ ] `admin.html` + `admin-app.js` (1 043 строки) + `admin.ts` → `pages/AdminDashboard.tsx`
- [ ] Переиспользовать `DashboardLayout`, `Sidebar`, `TabPanel` из Этапа 5
- [ ] `UsersManagement.tsx` — таблица пользователей + CRUD
- [ ] `ArtworksModeration.tsx` — модерация
- [ ] `SystemStats.tsx` — статистика (дашборд метрик)
- [ ] `SystemSettings.tsx` — настройки системы
- [ ] Сервис `adminApi.ts`

### Этап 7: Панель куратора (самый сложный)
**Оценка: 10–14 часов**

- [ ] `curator.html` + `curator-app.js` (2 130 строк) + `curator.ts` → `pages/CuratorDashboard.tsx`
- [ ] Переиспользовать `DashboardLayout`, `Sidebar`
- [ ] `RoomsList.tsx` — список залов с drag-and-drop
- [ ] `RoomEditor.tsx` — редактор зала
- [ ] `ArtworkUpload.tsx` — загрузка с предпросмотром (S3)
- [ ] `ArtworkPlacement.tsx` — размещение работ в залах
- [ ] `GalleryPreview3D.tsx` — 3D-превью (обёртка над texture-generator.js)
- [ ] `ExhibitionSettings.tsx` — настройки экспозиции
- [ ] `WatermarkSettings.tsx` — настройки водяных знаков
- [ ] `DigitizationPanel.tsx` — панель оцифровки
- [ ] Сервис `curatorApi.ts`

### Этап 8: 3D-галерея
**Оценка: 6–8 часов**

> Three.js + WebXR — специфический раздел, требует react-three-fiber

- [ ] Установить `@react-three/fiber`, `@react-three/drei`
- [ ] `gallery-3d.html` → `pages/Gallery3DPage.tsx`
- [ ] `GalleryScene.tsx` — основная Three.js сцена
- [ ] `GalleryRoom.tsx` — 3D-зал с процедурными текстурами
- [ ] `ArtworkFrame3D.tsx` — рамка + картина в 3D
- [ ] `GalleryControls.tsx` — управление камерой (PointerLockControls)
- [ ] `GalleryMinimap.tsx` — мини-карта галереи
- [ ] WebXR-интеграция для VR/AR

### Этап 9: Бэкенд — перевод на TypeScript
**Оценка: 6–8 часов**

> Бэкенд работает стабильно — делать в последнюю очередь

- [ ] `routes/auctions.js` → `.ts` (389 строк)
- [ ] `routes/artworks.js` → `.ts` (303 строки)
- [ ] `routes/users.js` → `.ts` (171 строка)
- [ ] `routes/gallery.js` → `.ts` (154 строки)
- [ ] `routes/collections.js` → `.ts` (133 строки)
- [ ] `routes/health.js` → `.ts` + остальные мелкие routes
- [ ] `services/watermark.js` → `.ts` (341 строка)
- [ ] `services/archive.js` → `.ts`, `services/gallery-config.js` → `.ts`
- [ ] `server.js` → `server.ts`
- [ ] Настроить `tsx` для запуска
- [ ] Добавить общие типы в `src/types/`: `User`, `Artwork`, `Gallery`, `Room`, `Auction`

---

## Сводная оценка трудозатрат

| Этап | Описание | Часы | Статус |
|------|----------|------|--------|
| 0 | Подготовка инфраструктуры | 3–4 | ⬜ Не начат |
| 1 | Простые страницы (about, user) | 2–3 | ⬜ Не начат |
| 2 | Главная страница | 4–5 | ⬜ Не начат |
| 3 | ArtWiki и RAG | 3–4 | ⬜ Не начат |
| 4 | Аукционы | 6–8 | ⬜ Не начат |
| 5 | Панель сотрудника | 4–5 | ⬜ Не начат |
| 6 | Панель администратора | 5–7 | ⬜ Не начат |
| 7 | Панель куратора | 10–14 | ⬜ Не начат |
| 8 | 3D-галерея | 6–8 | ⬜ Не начат |
| 9 | Бэкенд → TypeScript | 6–8 | ⬜ Не начат |
| **Итого** | | **49–66 часов** | |

---

## Предложения и корректировки

### 🔴 Критично (исправить до начала миграции)

1. **Vite в режиме library** — нужна перенастройка для SPA. Текущий `vite.config.ts` собирает `react-widgets.js` (IIFE-файл), а не полноценное SPA-приложение. Нужен второй entry point или отдельный конфиг для SPA.

2. **Два конфига Tailwind** — есть `tailwind.config.ts` (для React/shadcn) и `src/frontend/tailwind.config.js` (для HTML). При переходе на SPA объединить в один.

3. **React Router не установлен** — нужен для роутинга между страницами в SPA.

### 🟡 Важно (учесть в процессе)

4. **Общий `DashboardLayout`** — страницы admin, curator, staff имеют одинаковый sidebar-layout. Создать один раз в Этапе 5, переиспользовать в 6 и 7. Экономия: 3–5 часов.

5. **WebSocket (socket.io)** — используется в аукционах. В React нужен хук `useAuctionSocket` с `useEffect` + cleanup, чтобы не плодить соединения при ре-рендерах.

6. **Параллельная работа** — старые HTML-страницы можно оставить на `/about.html`, пока React-версии доступны на `/app/about`. Полная замена — в конце каждого этапа.

7. **Этап 3 короче** — ArtWiki и RAG уже частично React. Реальная оценка: 3–4 часа, не 4–5.

### 🟢 Дополнительные задачи (не были в плане)

8. **Удалить Lucide CDN** — все HTML-страницы подключают `https://unpkg.com/lucide@latest`. В React использовать `lucide-react` (уже установлен). В консоли ошибки: иконки `twitter`, `instagram`, `youtube` удалены из Lucide — заменить на SVG или другую библиотеку.

9. **Error Boundary** — добавить React Error Boundary для обработки ошибок компонентов без белого экрана.

10. **Lazy loading страниц** — использовать `React.lazy()` + `Suspense` для curator и gallery-3d, чтобы не грузить Three.js при открытии главной.

11. **Общие типы** — завести `src/frontend/types/` с интерфейсами `Artwork`, `User`, `Gallery`, `Auction` и т.д. Переиспользовать во всех API-сервисах.

---

## Порядок приоритетов

```
✅ Tailwind CDN → локальный
✅ Build pipeline
✅ DB на новый сервер
✅ Деплой vm

⬜ Этап 0 (инфраструктура SPA) ← СЛЕДУЮЩИЙ ШАГ
    └→ ⬜ Этап 1 (простые страницы) — быстрая победа
        └→ ⬜ Этап 2 (главная)
            ├→ ⬜ Этап 3 (ArtWiki/RAG) — частично готово
            ├→ ⬜ Этап 4 (аукционы) — WebSocket
            └→ ⬜ Этап 5 (сотрудник) + DashboardLayout
                ├→ ⬜ Этап 6 (админ)
                └→ ⬜ Этап 7 (куратор) — самый сложный
                    └→ ⬜ Этап 8 (3D-галерея)
                        └→ ⬜ Этап 9 (бэкенд TS)
```

---

## Принципы миграции

1. **Постепенность** — каждый этап завершается работающим приложением
2. **Параллельная работа** — старые HTML работают, пока не готова React-версия
3. **Переиспользование** — DashboardLayout, Sidebar, TabPanel создаются один раз
4. **API-сервисы с типами** — каждый модуль получает свой типизированный API-сервис
5. **Общие типы** — завести `src/frontend/types/` с интерфейсами Artwork, User, Gallery и т.д.
6. **Бэкенд в последнюю очередь** — REST API уже работает, фронтенд важнее
