# Инструкция по установке и использованию shadcn/ui

## Установка зависимостей

1. Установите основные зависимости для shadcn/ui:
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

1. Убедитесь, что файл `tailwind.config.js` находится в директории `src/frontend/` и содержит следующие настройки:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

2. Убедитесь, что файл `src/index.css` импортирует глобальные стили:

```css
@import './styles/globals.css';

/* остальные стили */
```

3. Убедитесь, что файл `src/styles/globals.css` содержит CSS-переменные:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --ring: 217.2 32.6% 17.5%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Настройка TypeScript

Убедитесь, что файл `tsconfig.json` содержит настройки для алиасов:

```json
{
  "compilerOptions": {
    // ... другие настройки
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

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

## Темизация

Проект поддерживает светлую и темную темы через CSS-переменные. 
Переключение темы может быть реализовано через добавление класса `dark` к элементу `<html>`.