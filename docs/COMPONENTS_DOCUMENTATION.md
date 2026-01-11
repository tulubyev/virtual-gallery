# Компоненты shadcn/ui в проекте виртуальной галереи

## Список компонентов

### 1. Button
- **Файл**: `src/components/ui/button.tsx`
- **Описание**: Кнопка с различными вариантами оформления
- **Варианты**: default, destructive, outline, secondary, ghost, link
- **Размеры**: default, sm, lg, icon

### 2. Card
- **Файлы**: `src/components/ui/card.tsx`
- **Описание**: Карточка с заголовком, описанием и содержимым
- **Компоненты**: Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent

### 3. Table
- **Файл**: `src/components/ui/table.tsx`
- **Описание**: Таблица с заголовками, строками и ячейками
- **Компоненты**: Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption

### 4. Input
- **Файл**: `src/components/ui/input.tsx`
- **Описание**: Поле ввода с поддержкой различных типов

### 5. Label
- **Файл**: `src/components/ui/label.tsx`
- **Описание**: Метка для элементов формы

### 6. Dialog
- **Файл**: `src/components/ui/dialog.tsx`
- **Описание**: Диалоговое окно для отображения модальных данных
- **Компоненты**: Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription

### 7. Sheet
- **Файл**: `src/components/ui/sheet.tsx`
- **Описание**: Боковая панель (для мобильных устройств)
- **Компоненты**: Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription

### 8. Sidebar
- **Файл**: `src/components/ui/sidebar.tsx`
- **Описание**: Боковая панель навигации
- **Компоненты**: Sidebar, SidebarHeader, SidebarFooter, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton

### 9. Badge
- **Файл**: `src/components/ui/badge.tsx`
- **Описание**: Метка с различными вариантами оформления
- **Варианты**: default, secondary, destructive, outline

### 10. Dropdown Menu
- **Файл**: `src/components/ui/dropdown-menu.tsx`
- **Описание**: Выпадающее меню с различными элементами
- **Компоненты**: DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut

### 11. Select
- **Файл**: `src/components/ui/select.tsx`
- **Описание**: Выпадающий список с поддержкой прокрутки
- **Компоненты**: Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton

### 12. Alert
- **Файл**: `src/components/ui/alert.tsx`
- **Описание**: Компонент для отображения уведомлений
- **Компоненты**: Alert, AlertTitle, AlertDescription
- **Варианты**: default, destructive

## Вспомогательные файлы

### 1. utils.ts
- **Файл**: `src/lib/utils.ts`
- **Описание**: Вспомогательная функция для объединения классов

### 2. globals.css
- **Файл**: `src/styles/globals.css`
- **Описание**: Глобальные стили и CSS-переменные для темизации

## Использование компонентов

Все компоненты экспортируются из соответствующих файлов и могут быть импортированы в любом месте приложения:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
```

## Адаптивность

Все компоненты автоматически адаптируются под разные размеры экрана благодаря встроенным классам Tailwind CSS. Для создания адаптивных интерфейсов используйте утилиты Tailwind CSS:

- `sm:` (640px+)
- `md:` (768px+)
- `lg:` (1024px+)
- `xl:` (1280px+)
- `2xl:` (1536px+)

Пример:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Сетка с разным количеством столбцов на разных размерах экрана */}
</div>
```

## Темизация

Компоненты поддерживают светлую и темную тему через CSS-переменные, определенные в `globals.css`. Для переключения темы добавьте класс `dark` к элементу `<html>`.

## Пути импорта

Проект использует алиасы для путей:
- `@/*` указывает на `./src/*`
- Это позволяет использовать короткие пути импорта: `import { Component } from "@/components/ui/component"`