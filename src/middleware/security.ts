// src/middleware/security.ts
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';

// Миддлвар для защиты от XSS атак
export const xssProtection = (req: Request, res: Response, next: NextFunction) => {
  // Устанавливаем заголовки для защиты от XSS
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  next();
};

// Миддлвар для ограничения количества запросов (Rate Limiting)
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // ограничить каждый IP до 100 запросов на windowMs
  message: {
    error: 'Слишком много запросов с вашего IP, попробуйте позже.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Миддлвар для проверки и очистки входных данных
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  // Очищаем потенциально опасные поля
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        // Удаляем потенциально опасные теги и скрипты
        req.body[key] = req.body[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        req.body[key] = req.body[key].replace(/javascript:/gi, '');
        req.body[key] = req.body[key].replace(/on\w+="[^"]*"/gi, '');
      }
    });
  }

  next();
};

// Миддлвар для генерации CSRF токена
export const generateCsrfToken = (req: Request, res: Response, next: NextFunction) => {
  // Проверяем, есть ли сессия
  if (req.session) {
    // Если используются сессии, сохраняем токен в сессии
    if (!(req.session as any).csrfToken) {
      (req.session as any).csrfToken = crypto.randomBytes(32).toString('hex');
    }
    (res.locals as any).csrfToken = (req.session as any).csrfToken;
  } else {
    // Если сессии не используются, создаем токен на основе случайных данных
    const csrfToken = crypto.randomBytes(32).toString('hex');
    (res.locals as any).csrfToken = csrfToken;
  }
  next();
};

// Миддлвар для проверки CSRF токена
export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  // Исключаем определенные маршруты из проверки CSRF
  // req.originalUrl содержит полный путь, включая префиксы
  const excludedPaths = ['/api/auth/login', '/api/auth/register'];
  if (excludedPaths.some(path => req.originalUrl.startsWith(path))) {
    return next();
  }

  // Проверяем, является ли запрос безопасным методом
  const safeMethods = ['GET', 'HEAD', 'OPTIONS', 'TRACE'];
  if (safeMethods.includes(req.method)) {
    return next();
  }

  // Для небезопасных методов проверяем наличие и валидность CSRF токена
  const csrfTokenFromBody = req.body._csrf;
  const csrfTokenFromHeader = req.headers['x-csrf-token'] || req.headers['x-xsrf-token'];

  const csrfToken = csrfTokenFromBody || csrfTokenFromHeader;

  // В реальном приложении нужно сравнить токен с тем, что был сгенерирован ранее
  // Здесь упрощенная проверка для демонстрации
  if (!csrfToken) {
    return res.status(403).json({ error: 'CSRF token required' });
  }

  // В реальном приложении здесь должна быть проверка токена
  next();
};