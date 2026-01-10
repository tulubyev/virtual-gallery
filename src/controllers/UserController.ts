// controllers/UserController.ts
import { Request, Response } from 'express';
import { UserService } from '../services';
import { UpdateUserInput } from '../models';

class UserController {
  async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      // userId должен поступать из JWT токена (через middleware аутентификации)
      const userId = (req as any).userId;

      const user = await UserService.getUserById(userId);
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
      delete updateData.user_id;
      delete (updateData as any).password;

      const updatedUser = await UserService.updateUser(userId, updateData);
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

      const user = await UserService.getUserById(userId);
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

      const updatedUser = await UserService.updateUser(userId, { preferences });
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
      res.json([]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async addFavorite(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token
      const { artworkId } = req.params;

      // В реальной реализации это будет добавлять произведение в избранное
      // For now, returning success
      res.json({ message: 'Added to favorites' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async removeFavorite(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token
      const { artworkId } = req.params;

      // В реальной реализации это будет удалять произведение из избранного
      // For now, returning success
      res.json({ message: 'Removed from favorites' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserHistory(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId; // From JWT token

      // В реальной реализации это будет извлекать историю взаимодействий пользователя
      // For now, returning empty array
      res.json([]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();