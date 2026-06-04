/// <reference types="vite/client" />

// Определение типов для модулей CSS
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Определение типа для глобальных переменных
declare global {
  interface Window {
    // Добавьте сюда любые специфичные для вашего приложения свойства window
  }
}

export {};