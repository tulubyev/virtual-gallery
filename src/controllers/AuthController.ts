// controllers/AuthController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserBackendService from '../backend/services/UserBackendService';
import { CreateUserInput } from '../models';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body as CreateUserInput;

      // Валидация входных данных
      if (!username || !email || !password) {
        res.status(400).json({ error: 'Username, email, and password are required' });
        return;
      }

      // Проверка, существует ли пользователь с таким email
      const existingUser = await UserBackendService.getUserByEmail(email);
      if (existingUser) {
        res.status(409).json({ error: 'User with this email already exists' });
        return;
      }

      // Хеширование пароля
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создание пользователя
      const newUser = await UserBackendService.createUser({
        username,
        email,
        password: hashedPassword
      });

      // Генерация JWT токена
      const token = jwt.sign(
        { userId: newUser.user_id, username: newUser.username },
        process.env.JWT_SECRET || 'your-super-secret-jwt-key',
        { expiresIn: '24h' }
      );

      res.status(201).json({
        user_id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        token
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Валидация входных данных
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      // Поиск пользователя по email
      const user = await UserBackendService.getUserByEmail(email);
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      // Проверка пароля
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      // Генерация JWT токена
      const token = jwt.sign(
        { userId: user.user_id, username: user.username },
        process.env.JWT_SECRET || 'your-super-secret-jwt-key',
        { expiresIn: '24h' }
      );

      res.json({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        token
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      // В реальной реализации это будет обновлять JWT токен
      const userId = (req as any).userId; // Предполагается, что userId добавлен в middleware
      const user = await UserBackendService.getUserById(userId);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const token = jwt.sign(
        { userId: user.user_id, username: user.username },
        process.env.JWT_SECRET || 'your-super-secret-jwt-key',
        { expiresIn: '24h' }
      );

      res.json({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        token
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      // В реальной реализации это может инвалидировать токен на сервере
      res.json({ message: 'Logged out successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      // Этот метод будет защищен middleware аутентификации
      // Так что если мы дошли до сюда, токен действителен
      const userId = (req as any).userId; // Предполагается, что userId добавлен в middleware
      const user = await UserBackendService.getUserById(userId);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({
        valid: true,
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController();