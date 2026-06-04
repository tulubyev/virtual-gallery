// routes/userManagementRoutes.ts
import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import { UserController } from '../controllers/UserController';

export function createUserManagementRoutes(controller: UserController) {
  const router = Router();

  // Get all users (admin only)
  router.get('/', requireAdmin, (req, res) => controller.getAllUsers(req, res));

  // Get users by role (admin only)
  router.get('/role/:role', requireAdmin, (req, res) => controller.getUsersByRole(req, res));

  // Update user role (admin only)
  router.put('/:userId/role', requireAdmin, (req, res) => controller.updateUserRole(req, res));

  // Delete user (admin only)
  router.delete('/:userId', requireAdmin, (req, res) => controller.deleteUser(req, res));

  // Get user statistics (admin only)
  router.get('/stats', requireAdmin, (req, res) => controller.getUserStats(req, res));

  return router;
}