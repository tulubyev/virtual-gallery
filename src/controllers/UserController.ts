// controllers/UserController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { UpdateUserInput } from '../models';

class UserController {
  private userService = new UserService();

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      // Валидация входных данных
      if (!username || !email || !password) {
        res.status(400).json({ error: 'Username, email, and password are required' });
        return;
      }

      // Проверка, существует ли пользователь с таким email
      const existingUser = await this.userService.getByEmail(email);
      if (existingUser) {
        res.status(409).json({ error: 'User with this email already exists' });
        return;
      }

      // Хеширование пароля
      const bcrypt = await import('bcrypt');
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создание пользователя
      const newUser = await this.userService.create({
        username,
        email,
        password_hash: hashedPassword
      });

      // Генерация JWT токена
      const jwtModule = await import('jsonwebtoken');
      const token = jwtModule.sign(
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

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Валидация входных данных
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      // Поиск пользователя по email
      const user = await this.userService.getByEmail(email);
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      // Проверка пароля
      const bcrypt = await import('bcrypt');
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
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

  async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      // userId должен поступать из JWT токена (через middleware аутентификации)
      const userId = (req as any).userId;

      const user = await this.userService.getById(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token
      const updateData = req.body as UpdateUserInput;

      // Don't allow updating user ID or password through this endpoint
      if ((updateData as any).password) {
        delete (updateData as any).password;
      }

      const updatedUser = await this.userService.update(userId, updateData);
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserPreferences(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token

      const user = await this.userService.getById(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ preferences: user.preferences || {} });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUserPreferences(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token
      const preferences = req.body;

      const updatedUser = await this.userService.update(userId, { preferences });
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ preferences: updatedUser.preferences });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserFavorites(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token

      // В реальной реализации это будет извлекать избранные произведения пользователя
      // For now, returning empty array
      const favorites = await this.userService.getFavorites(userId);
      res.json(favorites || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async addFavorite(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token
      const { artworkId } = req.params;

      // В реальной реализации это будет добавлять произведение в избранное
      const result = await this.userService.addFavorite(userId, artworkId);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async removeFavorite(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token
      const { artworkId } = req.params;

      // В реальной реализации это будет удалять произведение из избранного
      const result = await this.userService.removeFavorite(userId, artworkId);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserHistory(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token

      // В реальной реализации это будет извлекать историю взаимодействий пользователя
      const history = await this.userService.getHistory(userId);
      res.json(history || []);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAll();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUsersByRole(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.params;
      const users = await this.userService.getUsersByRole(role);
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUserRole(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      const updatedUser = await this.userService.updateRole(userId, role);
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const deleted = await this.userService.delete(userId);

      if (!deleted) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.userService.getStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();