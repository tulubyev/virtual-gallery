// controllers/UserController.ts
import { Request, Response } from 'express';
import { IUserService, CreateUserDto, UpdateUserDto } from '../types/artwork';
import { ILogger } from '../types/interfaces';

class UserController {
  constructor(
    private userService: IUserService,
    private logger: ILogger
  ) {}

  async registerUser(req: Request, res: Response): Promise<void> {
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
      const jwtModule = await import('jsonwebtoken');
      const token = jwtModule.sign(
        { userId: newUser.user_id, username: newUser.username },
        process.env.JWT_SECRET || 'your-super-secret-jwt-key',
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

  async loginUser(req: Request, res: Response): Promise<void> {
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
      const jwtModule = await import('jsonwebtoken');
      const token = jwtModule.sign(
        { userId: user.user_id, username: user.username },
        process.env.JWT_SECRET || 'your-super-secret-jwt-key',
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

  async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      // userId должен поступать из JWT токена (через middleware аутентификации)
      const userId = (req as any).userId;

      const user = await this.userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error: any) {
      this.logger.error('Failed to get user profile', error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token
      const updateData = req.body;

      // Don't allow updating user ID or password through this endpoint
      if ((updateData as any).password) {
        delete (updateData as any).password;
      }

      const updatedUser = await this.userService.updateUser(userId, updateData);

      this.logger.info('User profile updated', { userId: updatedUser.user_id });
      res.json(updatedUser);
    } catch (error: any) {
      this.logger.error(`Failed to update user with id ${userId}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async getUserPreferences(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token

      const user = await this.userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ preferences: user.preferences || {} });
    } catch (error: any) {
      this.logger.error(`Failed to get preferences for user with id ${userId}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateUserPreferences(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token
      const preferences = req.body;

      const updatedUser = await this.userService.updateUser(userId, { preferences });

      this.logger.info('User preferences updated', { userId: updatedUser.user_id });
      res.json({ preferences: updatedUser.preferences });
    } catch (error: any) {
      this.logger.error(`Failed to update preferences for user with id ${userId}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAll();
      res.json(users);
    } catch (error: any) {
      this.logger.error('Failed to get all users', error);
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      await this.userService.deleteUser(userId);

      this.logger.info('User deleted', { userId });
      res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
      this.logger.error(`Failed to delete user with id ${userId}`, error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;