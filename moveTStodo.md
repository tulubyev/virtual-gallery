# План миграции HTML → React/TypeScript

## Текущее состояние проекта

### Общая статистика
| Категория | Файлов | Строк кода |
|-----------|--------|------------|
| HTML-страницы (frontend) | 11 | 5 708 |
| JS/TS скрипты (frontend) | 13 | 5 364 |
| CSS стили (frontend) | 6 | 1 925 |
| React-компоненты (уже готовы) | 11 | 1 275 |
| Backend (routes) | 12 | 1 603 |
| Backend (services) | 10 | 1 177 |
| Backend (controllers) | 7 | 1 321 |
| **Итого** | **~70** | **~18 373** |

### Уже существующая React-инфраструктура
- `main.tsx` — точка входа для React-виджетов
- 3 React-компонента: PDFUploadProcessor, ArtworkAnalysisResult, ArtRAGChat
- 8 UI-компонентов (shadcn/ui): button, card, badge, alert, progress, scroll-area, textarea
- Vite конфиг, Tailwind CSS, TypeScript конфиг
- `aiService.ts` — типизированный сервис для AI API

---

## Самые длинные файлы (требуют разбиения)

### Фронтенд — JavaScript/TypeScript

| # | Файл | Строк | Рекомендация по разбиению |
|---|------|-------|--------------------------|
| 1 | `assets/curator-app.js` | 2 130 | Разбить на 8–10 модулей: управление залами, загрузка работ, 3D-превью, настройки экспозиции, модальные окна, API-сервис куратора, утилиты |
| 2 | `assets/admin-app.js` | 1 043 | Разбить на 5–6 модулей: управление пользователями, модерация работ, статистика, настройки системы, API-сервис админа |
| 3 | `assets/staff-app.js` | 569 | Разбить на 3–4 модуля: список задач, обработка работ, отчёты, API-сервис сотрудника |
| 4 | `assets/main.ts` | 313 | Разбить на 3 модуля: авторизация (auth), слайдшоу (hero), загрузка работ (artworks) |
| 5 | `assets/artwork-detail-component.ts` | 304 | Превратить в React-компонент ArtworkDetail |
| 6 | `assets/admin.ts` | 282 | Объединить с admin-app.js при миграции |
| 7 | `assets/texture-generator.js` | 173 | Оставить как утилиту, добавить типы |
| 8 | `assets/toast.js` | 140 | Заменить на React Toast (shadcn/ui) |

### Фронтенд — HTML-страницы

| # | Файл | Строк | Inline JS | Inline CSS | Рекомендация |
|---|------|-------|-----------|------------|-------------|
| 1 | `curator.html` | 1 000 | 0 | 36 | Самая сложная. Разбить на: Layout, Sidebar, RoomsList, ArtworkUpload, GalleryPreview3D, ExhibitionSettings |
| 2 | `admin.html` | 790 | 0 | 6 | Разбить на: Layout, Sidebar, UsersTab, ArtworksTab, StatsTab, SettingsTab |
| 3 | `artwiki.html` | 766 | 305 | 25 | Разбить на: Layout, SearchBar, ArtworkGrid, ArtworkModal, FilterPanel |
| 4 | `index.html` | 761 | 213 | 82 | Разбить на: Layout, HeroSlideshow, FeaturedArtworks, AuthModals, Navigation |
| 5 | `auction.html` | 583 | 414 | 7 | Разбить на: Layout, AuctionList, AuctionCard, BidPanel, AuctionStats |
| 6 | `auction-participant.html` | 563 | 347 | 8 | Разбить на: Layout, LotsList, BidForm, MyBids, AuctionTimer |
| 7 | `staff.html` | 357 | 0 | 4 | Разбить на: Layout, Sidebar, TasksList, ArtworkProcessing |
| 8 | `rag.html` | 308 | 126 | 25 | Уже частично на React (ArtRAGChat). Добавить: Layout, PDFList |
| 9 | `gallery-3d.html` | 260 | 44 | 147 | Специфичный (Three.js/WebXR). Мигрировать в последнюю очередь |
| 10 | `about.html` | 179 | 3 | 3 | Простая статическая. Быстрая миграция |
| 11 | `user.html` | 141 | 3 | 4 | Простая. Быстрая миграция |

### Бэкенд — самые длинные файлы

| # | Файл | Строк | Рекомендация |
|---|------|-------|-------------|
| 1 | `routes/auctions.js` | 389 | Перевести на TS, разделить на router + validation |
| 2 | `controllers/AiController.ts` | 356 | Уже на TS. Разделить на методы по ответственности |
| 3 | `services/watermark.js` | 341 | Перевести на TS, выделить утилиты |
| 4 | `routes/artworks.js` | 303 | Перевести на TS, разделить на router + validation |
| 5 | `controllers/UserController.ts` | 281 | Уже на TS. Ок |
| 6 | `controllers/ArtworkController.ts` | 250 | Уже на TS. Ок |

---

## Поэтапный план миграции

### Этап 0: Подготовка инфраструктуры
**Оценка: 2–3 часа**

- [ ] Настроить React Router для SPA-режима
- [ ] Создать общий Layout-компонент (Header, Footer, Navigation)
- [ ] Настроить Vite для сборки полного SPA (не только виджетов)
- [ ] Создать общие хуки: useAuth, useFetch, useToast
- [ ] Создать типизированный API-клиент (расширить aiService.ts)
- [ ] Настроить server.js для отдачи SPA с fallback на index.html

### Этап 1: Простые статические страницы
**Оценка: 2–3 часа**

- [ ] `about.html` → `pages/AboutPage.tsx` (179 строк, простая статика)
- [ ] `user.html` → `pages/UserPage.tsx` (141 строка, простая)
- [ ] Общий компонент `Navigation.tsx`
- [ ] Общий компонент `Footer.tsx`
- [ ] Компонент `AuthModals.tsx` (вход/регистрация)

### Этап 2: Главная страница
**Оценка: 4–5 часов**

- [ ] `index.html` → `pages/HomePage.tsx`
- [ ] `HeroSlideshow.tsx` — слайдшоу с автозагрузкой из API
- [ ] `FeaturedArtworks.tsx` — сетка произведений
- [ ] `ArtworkCard.tsx` — карточка произведения (уже есть заготовка)
- [ ] `ArtworkDetailModal.tsx` — модальное окно деталей (из artwork-detail-component.ts)
- [ ] Хук `useArtworks.ts` — загрузка произведений
- [ ] Сервис `artworksApi.ts` — типизированные API-вызовы

### Этап 3: ArtWiki и RAG
**Оценка: 4–5 часов**

- [ ] `artwiki.html` → `pages/ArtWikiPage.tsx`
- [ ] `SearchBar.tsx`, `FilterPanel.tsx`, `ArtworkGrid.tsx`
- [ ] `rag.html` → `pages/RAGPage.tsx` (уже частично на React)
- [ ] Интеграция существующих React-компонентов: ArtRAGChat, PDFUploadProcessor

### Этап 4: Аукционы
**Оценка: 6–8 часов**

- [ ] `auction.html` → `pages/AuctionPage.tsx`
- [ ] `AuctionList.tsx`, `AuctionCard.tsx`, `AuctionStats.tsx`
- [ ] `BidPanel.tsx`, `AuctionTimer.tsx`
- [ ] `auction-participant.html` → `pages/AuctionParticipantPage.tsx`
- [ ] `LotsList.tsx`, `BidForm.tsx`, `MyBids.tsx`
- [ ] Сервис `auctionsApi.ts` — типизированные API-вызовы
- [ ] WebSocket-интеграция для обновлений ставок в реальном времени

### Этап 5: Панель сотрудника
**Оценка: 4–5 часов**

- [ ] `staff.html` + `staff-app.js` → `pages/StaffDashboard.tsx`
- [ ] `StaffLayout.tsx` (sidebar + tabs)
- [ ] `TasksList.tsx`, `ArtworkProcessing.tsx`
- [ ] Сервис `staffApi.ts`

### Этап 6: Панель администратора
**Оценка: 6–8 часов**

- [ ] `admin.html` + `admin-app.js` + `admin.ts` → `pages/AdminDashboard.tsx`
- [ ] `AdminLayout.tsx` (sidebar + tabs)
- [ ] `UsersManagement.tsx` — управление пользователями
- [ ] `ArtworksModeration.tsx` — модерация работ
- [ ] `SystemStats.tsx` — статистика
- [ ] `SystemSettings.tsx` — настройки
- [ ] Сервис `adminApi.ts`

### Этап 7: Панель куратора (самая сложная)
**Оценка: 10–14 часов**

- [ ] `curator.html` + `curator-app.js` + `curator.ts` → `pages/CuratorDashboard.tsx`
- [ ] `CuratorLayout.tsx` (sidebar + tabs + rooms panel)
- [ ] `RoomsList.tsx` — список залов
- [ ] `RoomEditor.tsx` — редактор зала
- [ ] `ArtworkUpload.tsx` — загрузка произведений
- [ ] `ArtworkPlacement.tsx` — размещение работ в залах
- [ ] `GalleryPreview3D.tsx` — 3D-превью галереи
- [ ] `ExhibitionSettings.tsx` — настройки экспозиции
- [ ] `WatermarkSettings.tsx` — настройки водяных знаков
- [ ] `DigitizationPanel.tsx` — панель оцифровки
- [ ] Сервис `curatorApi.ts`

### Этап 8: 3D-галерея
**Оценка: 6–8 часов**

- [ ] `gallery-3d.html` → `pages/Gallery3DPage.tsx`
- [ ] Интеграция Three.js с React (react-three-fiber)
- [ ] `GalleryScene.tsx` — 3D-сцена
- [ ] `GalleryControls.tsx` — управление камерой
- [ ] `ArtworkFrame3D.tsx` — 3D-рамка произведения
- [ ] WebXR-интеграция для VR

### Этап 9: Бэкенд — перевод на TypeScript
**Оценка: 6–8 часов**

- [ ] `routes/auctions.js` → `.ts` (389 строк)
- [ ] `routes/artworks.js` → `.ts` (303 строк)
- [ ] `routes/users.js` → `.ts` (171 строк)
- [ ] `routes/gallery.js` → `.ts` (154 строк)
- [ ] `routes/collections.js` → `.ts` (133 строк)
- [ ] `services/watermark.js` → `.ts` (341 строк)
- [ ] `services/archive.js` → `.ts` (129 строк)
- [ ] `services/gallery-config.js` → `.ts` (74 строк)
- [ ] Остальные мелкие .js файлы → .ts
- [ ] Обновить server.js → server.ts
- [ ] Настроить ts-node или tsx для запуска сервера

---

## Сводная оценка трудозатрат

| Этап | Описание | Часы |
|------|----------|------|
| 0 | Подготовка инфраструктуры | 2–3 |
| 1 | Простые страницы (about, user) | 2–3 |
| 2 | Главная страница | 4–5 |
| 3 | ArtWiki и RAG | 4–5 |
| 4 | Аукционы | 6–8 |
| 5 | Панель сотрудника | 4–5 |
| 6 | Панель администратора | 6–8 |
| 7 | Панель куратора | 10–14 |
| 8 | 3D-галерея | 6–8 |
| 9 | Бэкенд → TypeScript | 6–8 |
| **Итого** | | **50–67 часов** |

---

## Принципы миграции

1. **Постепенность** — каждый этап завершается работающим приложением. Старые HTML-страницы работают параллельно с новыми React-страницами.
2. **Общие компоненты первыми** — Layout, Navigation, Footer, AuthModals создаются один раз и переиспользуются.
3. **API-сервисы с типами** — каждый модуль получает свой типизированный API-сервис.
4. **Тестирование после каждого этапа** — визуальная и функциональная проверка перед переходом к следующему.
5. **Бэкенд в последнюю очередь** — REST API уже работает, фронтенд важнее.

## Порядок приоритетов

```
Этап 0 (инфраструктура)
  └→ Этап 1 (простые страницы) — быстрая победа
      └→ Этап 2 (главная) — основной пользовательский путь
          ├→ Этап 3 (ArtWiki/RAG) — частично готово
          ├→ Этап 4 (аукционы) — важная бизнес-функция
          └→ Этап 5 (сотрудник) — внутренний инструмент
              └→ Этап 6 (админ) — внутренний инструмент
                  └→ Этап 7 (куратор) — самый сложный
                      └→ Этап 8 (3D-галерея) — специализированный
                          └→ Этап 9 (бэкенд TS) — финальная полировка
```
