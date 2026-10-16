// controllers/AuthController.ts
import { Request, Response } from 'express';
import { getJwtSecret } from '../config/jwt';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserService, CreateUserDto } from '../types/user';
import { ILogger } from '../types/interfaces';

class AuthController {
  constructor(
    private userService: IUserService,
    private logger: ILogger
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, role } = req.body;

      // Валидация входных данных
      if (!username || !email || !password) {
        res.status(400).json({ error: 'Username, email, and password are required' });
        return;
      }

      // Проверка, существует ли пользователь с таким email
      const existingUser = await this.userService.getUserByEmail(email);
      if (existingUser) {
        res.status(409).json({ error: 'User with this email already exists' });
        return;
      }

      // Создание пользователя
      const newUser = await this.userService.createUser({
        username,
        email,
        password,
        role
      });

      // Генерация JWT токена
      const token = jwt.sign(
        { userId: newUser.user_id, username: newUser.username },
        getJwtSecret(),
        { expiresIn: '24h' }
      );

      this.logger.info('User registered', { userId: newUser.user_id, email: newUser.email });
      res.status(201).json({
        user_id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        token
      });
    } catch (error: any) {
      this.logger.error('Failed to register user', error);
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

      // Аутентификация пользователя
      const user = await this.userService.authenticate(email, password);
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      // Генерация JWT токена
      const token = jwt.sign(
        { userId: user.user_id, username: user.username },
        getJwtSecret(),
        { expiresIn: '24h' }
      );

      this.logger.info('User logged in', { userId: user.user_id, email: user.email });
      res.json({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        token
      });
    } catch (error: any) {
      this.logger.error('Failed to login user', error);
      res.status(500).json({ error: error.message });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      // В реальной реализации это будет обновлять JWT токен
      const userId = (req as any).userId; // Предполагается, что userId добавлен в middleware
      const user = await this.userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const token = jwt.sign(
        { userId: user.user_id, username: user.username },
        getJwtSecret(),
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
      this.logger.error('Failed to refresh token', error);
      res.status(500).json({ error: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      // В реальной реализации это может инвалидировать токен на сервере
      this.logger.info('User logged out', { userId: (req as any).userId });
      res.json({ message: 'Logged out successfully' });
    } catch (error: any) {
      this.logger.error('Failed to logout user', error);
      res.status(500).json({ error: error.message });
    }
  }

  async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      // Этот метод будет защищен middleware аутентификации
      // Так что если мы дошли до сюда, токен действителен
      const userId = (req as any).userId; // Предполагается, что userId добавлен в middleware
      const user = await this.userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      this.logger.info('Token verified', { userId: user.user_id });
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
      this.logger.error('Failed to verify token', error);
      res.status(500).json({ error: error.message });
    }
  }
}

export { AuthController };