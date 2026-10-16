// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services';
import { getJwtSecret } from '../config/jwt';

// Тип для расширения Request объекта
interface AuthenticatedRequest extends Request {
  userId?: number;
  username?: string;
  role?: string;
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  jwt.verify(token, getJwtSecret(), async (err, decoded: any) => {
    if (err) {
      res.status(403).json({ error: 'Invalid or expired token' });
      return;
    }

    try {
      // Получаем данные пользователя из базы данных для получения роли
      const user = await UserService.getUserById(decoded.userId);
      
      if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      req.userId = decoded.userId;
      req.username = decoded.username;
      req.role = user.role;
      next();
    } catch (error: any) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

// Middleware для проверки роли пользователя
export const requireRole = (roles: string | string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.role) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (typeof roles === 'string') {
      roles = [roles];
    }

    if (roles.includes(req.role)) {
      next();
    } else {
      res.status(403).json({ error: `Access denied. Required role(s): ${roles.join(', ')}` });
    }
  };
};

// Middleware для проверки, является ли пользователь администратором
export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (req.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin privileges required' });
  }
};