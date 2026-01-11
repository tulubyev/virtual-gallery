# Frontend часть виртуальной галереи

## Структура проекта

```
src/
├── components/           # Переиспользуемые компоненты
│   ├── ui/              # Компоненты shadcn/ui
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── sheet.tsx
│   │   └── sidebar.tsx
│   ├── Header.tsx       # Шапка сайта
│   └── Footer.tsx       # Подвал сайта
├── lib/                 # Вспомогательные функции
│   └── utils.ts         # Утилиты для работы с классами
├── pages/               # Страницы приложения
│   ├── AdminPanel.tsx
│   ├── ArtworkDetailPage.tsx
│   ├── ArtworksPage.tsx
│   ├── CollectionsPage.tsx
│   ├── CuratorPanel.tsx
│   ├── GalleriesListPage.tsx
│   ├── GalleryPage.tsx
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── RoomManagementPage.tsx
│   ├── RoomPage.tsx
│   ├── StaffDashboardPage.tsx
│   ├── StaffPanel.tsx
│   ├── ToursPage.tsx
│   ├── TourGuidePanel.tsx
│   ├── VrGalleryPage.tsx
│   ├── VirtualGalleryPage.tsx
│   └── AuctionParticipantPanel.tsx
├── services/            # Сервисы для работы с API
├── styles/              # Стилевые файлы
│   ├── globals.css      # Глобальные стили и CSS-переменные
│   └── main.css         # Основные стили для 3D-галереи
├── types/               # Типы TypeScript
│   └── index.ts         # Определения типов для всего приложения
├── App.tsx              # Главный компонент приложения
├── index.css            # Основные стили
└── main.tsx             # Точка входа в приложение
```

## Использование компонентов

Все компоненты построены с использованием shadcn/ui и Radix UI, что обеспечивает:
- Высокую доступность
- Адаптивность
- Согласованность интерфейса
- Легкость кастомизации

Пример использования компонентов:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function ExamplePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Заголовок карточки</CardTitle>
        <CardDescription>Описание карточки</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Badge>Тег 1</Badge>
          <Badge variant="secondary">Тег 2</Badge>
        </div>
        <Button className="mt-4">Нажми меня</Button>
      </CardContent>
    </Card>
  );
}
```

## Стилизация

Проект использует:
- Tailwind CSS для утилитарных классов
- CSS-переменные для темизации
- shadcn/ui для компонентов
- Lucide React для иконок

## Адаптивность

Все компоненты и страницы адаптированы под разные размеры экрана:
- Мобильные устройства (320px+)
- Планшеты (768px+)
- Десктопы (1024px+)
- Большие экраны (1400px+)

Для этого используются утилиты Tailwind CSS:
- `sm:` (640px+)
- `md:` (768px+)
- `lg:` (1024px+)
- `xl:` (1280px+)
- `2xl:` (1536px+)

Пример адаптивной сетки:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Карточки */}
</div>
```

## Темизация

Проект поддерживает светлую и темную темы через CSS-переменные. 
Переключение темы может быть реализовано через добавление класса `dark` к элементу `<html>`.

## Пути импорта

Проект использует алиасы для путей:
- `@/*` указывает на `./src/*`
- Это позволяет использовать короткие пути импорта: `import { Component } from "@/components/ui/component"`

## Типизация

Все компоненты строго типизированы с использованием TypeScript. 
Основные типы определены в `src/types/index.ts`.