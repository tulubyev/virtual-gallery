# Интеграция shadcn/ui в проект виртуальной галереи

## Установка зависимостей

Для завершения интеграции shadcn/ui в проект выполните следующие шаги:

1. Установите необходимые зависимости:
```bash
npm install class-variance-authority clsx tailwind-merge lucide-react tailwindcss-animate
```

2. Установите Radix UI primitives:
```bash
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-dropdown-menu
```

3. Установите TypeScript типы (если они еще не установлены):
```bash
npm install -D @types/react @types/react-dom
```

## Настройка Tailwind CSS

1. Убедитесь, что файл `tailwind.config.js` находится в корне frontend части проекта и содержит необходимые настройки (уже создан)

2. Убедитесь, что файл `src/index.css` импортирует глобальные стили (уже обновлен)

## Использование компонентов

Теперь вы можете использовать компоненты shadcn/ui в своих React компонентах:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Заголовок карточки</CardTitle>
        <CardDescription>Описание карточки</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Нажми меня</Button>
      </CardContent>
    </Card>
  );
}
```

## Доступные компоненты

В проекте уже созданы следующие компоненты:
- Button
- Card (Card, CardContent, CardDescription, CardHeader, CardTitle)
- Table (Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow)
- Input
- Label
- Dialog (Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger)
- Sheet (Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger)
- Sidebar (Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton)
- Select (Select, SelectContent, SelectItem, SelectTrigger, SelectValue)

## Добавление новых компонентов

Для добавления новых компонентов из shadcn/ui используйте команду:

```bash
npx shadcn-ui@latest add [component-name]
```

Например:
```bash
npx shadcn-ui@latest add alert-dialog
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add toast
```

## Пользовательские иконки

В проекте используется библиотека `lucide-react` для иконок. Вы можете использовать любые иконки из этой библиотеки:

```tsx
import { Heart, Star, Search } from 'lucide-react';

function MyComponent() {
  return (
    <div>
      <Heart />
      <Star />
      <Search />
    </div>
  );
}
```

## Адаптивность

Все компоненты автоматически адаптируются под разные размеры экрана благодаря встроенным классам Tailwind CSS. Для создания адаптивных сеток используйте классы:

- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` - для создания сетки с разным количеством столбцов на разных размерах экрана
- `flex flex-col md:flex-row` - для изменения направления флекс-контейнера
- `hidden md:block` - для скрытия/показа элементов на определенных размерах экрана