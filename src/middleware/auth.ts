// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Тип для пользователя
interface User {
  user_id: number;
  username: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  preferences?: Record<string, any>;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
}

// Тип для расширенного запроса с пользователем
export interface AuthenticatedRequest extends Request {
  user?: User;
}

// Функция для генерации JWT токена
export const generateToken = (user: User): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_key';
  // Токен будет действителен 24 часа
  return jwt.sign(
    { userId: user.user_id, email: user.email, role: user.role },
    secret,
    { expiresIn: '24h' }
  );
};

// Миддлвар для аутентификации
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const secret = process.env.JWT_SECRET || 'fallback_secret_key';

  try {
    const decoded = jwt.verify(token, secret) as any;

    // Добавляем информацию о пользователе в запрос
    req.user = {
      user_id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      username: decoded.username || '',
      first_name: decoded.firstName || '',
      last_name: decoded.lastName || '',
      created_at: decoded.createdAt ? new Date(decoded.createdAt) : new Date(),
      updated_at: decoded.updatedAt ? new Date(decoded.updatedAt) : new Date(),
      preferences: decoded.preferences || {},
      is_active: decoded.isActive !== undefined ? decoded.isActive : true
    };

    next();
    return; // Явно возвращаем, чтобы удовлетворить TS7030
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Миддлвар для проверки роли администратора
export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
  return; // Явно возвращаем, чтобы удовлетворить TS7030
};

// Миддлвар для проверки роли куратора или администратора
export const requireCuratorOrAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== 'curator' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Curator or admin access required' });
  }

  next();
  return; // Явно возвращаем, чтобы удовлетворить TS7030
};

// Миддлвар для проверки роли сотрудника, куратора или администратора
export const requireStaffOrHigher = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (!['staff', 'curator', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient privileges' });
  }

  next();
  return; // Явно возвращаем, чтобы удовлетворить TS7030
};

// Миддлвар для проверки конкретной роли
export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Access denied. Required roles: ${roles.join(', ')}` });
    }

    next();
    return; // Явно возвращаем, чтобы удовлетворить TS7030
  };
};