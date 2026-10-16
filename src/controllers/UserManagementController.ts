// controllers/UserManagementController.ts
import { Request, Response } from 'express';
import { UserService } from '../services';

const VALID_ROLES = ['user', 'admin', 'curator', 'staff', 'tour_guide', 'auction_participant'];

class UserManagementController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      res.json(await UserService.getAllUsers());
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUsersByRole(req: Request, res: Response): Promise<void> {
    try {
      res.json(await UserService.getUsersByRole(req.params.role));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUserRole(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.body;
      if (!VALID_ROLES.includes(role)) {
        res.status(400).json({ error: 'Invalid role' });
        return;
      }

      const user = await UserService.updateUser(Number(req.params.userId), { role });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ message: 'User role updated successfully', user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      if (userId === (req as any).userId) {
        res.status(400).json({ error: 'You cannot delete your own account' });
        return;
      }

      const deleted = await UserService.deleteUser(userId);
      if (!deleted) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
      // 23503 — foreign_key_violation: у пользователя есть связанные записи
      if (error.code === '23503') {
        res.status(409).json({ error: 'User has related records and cannot be deleted' });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getUserStats(req: Request, res: Response): Promise<void> {
    try {
      res.json(await UserService.getUserStats());
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserManagementController();
