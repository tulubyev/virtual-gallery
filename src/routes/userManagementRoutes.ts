// routes/userManagementRoutes.ts
import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import userController from '../controllers/UserController';

const router = Router();

// Get all users (admin only)
router.get('/', requireAdmin, userController.getAllUsers);

// Get users by role (admin only)
router.get('/role/:role', requireAdmin, userController.getUsersByRole);

// Update user role (admin only)
router.put('/:userId/role', requireAdmin, userController.updateUserRole);

// Delete user (admin only)
router.delete('/:userId', requireAdmin, userController.deleteUser);

// Get user statistics (admin only)
router.get('/stats', requireAdmin, userController.getUserStats);

export { router as userManagementRoutes };