// controllers/UserController.ts
import { Request, Response } from 'express';
import { IUserService, UpdateUserDto } from '../types/user';
import { ILogger } from '../types/interfaces';
import type { AuthenticatedRequest } from '../middleware/auth';
import { isObjectBody, isNonEmptyString, isEmail, hasOnlyFields } from '../utils/requestValidation';

class UserController {
  constructor(
    private userService: IUserService,
    private logger: ILogger
  ) {}

  async registerUser(req: Request, res: Response): Promise<void> {
    if (!isObjectBody(req.body) || !hasOnlyFields(req.body, ['username', 'email', 'password']) ||
        !isNonEmptyString(req.body.username) || !isEmail(req.body.email) || !isNonEmptyString(req.body.password)) {
      res.status(400).json({ error: 'Valid username, email, and password are required; other fields are not allowed' });
      return;
    }
    try {
      const { username, email, password } = req.body;

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
        password
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
    if (!isObjectBody(req.body) || !isEmail(req.body.email) || !isNonEmptyString(req.body.password)) {
      res.status(400).json({ error: 'Valid email and password are required' });
      return;
    }
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

  async getUserProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      // userId comes from the JWT token via authenticateToken middleware
      const userId = String(req.user.user_id);

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

  async updateUserProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = String(req.user.user_id); // Service IDs are strings; identity comes only from the token.
    if (!isObjectBody(req.body) || !hasOnlyFields(req.body, ['username', 'email', 'preferences', 'password']) ||
        ('username' in req.body && !isNonEmptyString(req.body.username)) ||
        ('email' in req.body && !isEmail(req.body.email)) ||
        ('preferences' in req.body && !isObjectBody(req.body.preferences))) {
      res.status(400).json({ error: 'Invalid profile fields; only username, email, and preferences may be updated' });
      return;
    }
    try {
      const updateData: UpdateUserDto = {};
      // Password changes have a separate endpoint. Never forward identity or role fields.
      for (const field of ['username', 'email', 'preferences'] as const) {
        if (field in req.body) updateData[field] = req.body[field];
      }

      const updatedUser = await this.userService.updateUser(userId, updateData);

      this.logger.info('User profile updated', { userId: updatedUser.user_id });
      res.json(updatedUser);
    } catch (error: any) {
      this.logger.error(`Failed to update user with id ${userId}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async getUserPreferences(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = String(req.user.user_id);
    try {
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

  async updateUserPreferences(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = String(req.user.user_id);
    // Preference keys are extensible, but the stored value must be a JSON object.
    if (!isObjectBody(req.body)) {
      res.status(400).json({ error: 'Preferences must be an object' });
      return;
    }
    try {
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
    const { userId } = req.params;
    try {
      await this.userService.deleteUser(userId);

      this.logger.info('User deleted', { userId });
      res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
      this.logger.error(`Failed to delete user with id ${userId}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async getUserFavorites(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = String(req.user.user_id);
    try {
      const favorites = await this.userService.getFavorites(userId);
      res.json(favorites);
    } catch (error: any) {
      this.logger.error(`Failed to get favorites for user with id ${userId}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async addFavorite(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = String(req.user.user_id);
    const { artworkId } = req.params;
    try {
      const result = await this.userService.addFavorite(userId, artworkId);
      res.json(result);
    } catch (error: any) {
      this.logger.error(`Failed to add artwork ${artworkId} to favorites for user ${userId}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async removeFavorite(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = String(req.user.user_id);
    const { artworkId } = req.params;
    try {
      const result = await this.userService.removeFavorite(userId, artworkId);
      res.json(result);
    } catch (error: any) {
      this.logger.error(`Failed to remove artwork ${artworkId} from favorites for user ${userId}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async getUserHistory(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = String(req.user.user_id);
    try {
      const history = await this.userService.getHistory(userId);
      res.json(history);
    } catch (error: any) {
      this.logger.error(`Failed to get history for user with id ${userId}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async getUsersByRole(req: Request, res: Response): Promise<void> {
    const { role } = req.params;
    try {
      const users = await this.userService.getUsersByRole(role);
      res.json(users);
    } catch (error: any) {
      this.logger.error(`Failed to get users by role ${role}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateUserRole(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const { role } = req.body;
    if (!role) {
      res.status(400).json({ error: 'role is required' });
      return;
    }
    try {
      const updatedUser = await this.userService.updateRole(userId, role);
      res.json(updatedUser);
    } catch (error: any) {
      this.logger.error(`Failed to update role for user with id ${userId}`, error);
      res.status(500).json({ error: error.message });
    }
  }

  async getUserStats(req: Request, res: Response): Promise<void> {
    try {
      // In a real implementation, this would aggregate user statistics
      // For now, returning mock data
      const stats = {
        totalUsers: 100,
        activeUsers: 75,
        newUsersThisMonth: 10,
        mostActiveRoles: ['user', 'curator'],
        engagementMetrics: {
          avgSessionDuration: 1200, // seconds
          pageViewsPerSession: 5.5,
          returnRate: 0.65
        }
      };
      res.json(stats);
    } catch (error: any) {
      this.logger.error('Failed to get user stats', error);
      res.status(500).json({ error: error.message });
    }
  }
}

export { UserController };