// routes/userManagementRoutes.ts
import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// Import user management controller
const userManagementController = require('../backend/controllers/userManagementController');

// Get all users (admin only)
router.get('/', requireAdmin, userManagementController.getAllUsers);

// Get users by role (admin only)
router.get('/role/:role', requireAdmin, userManagementController.getUsersByRole);

// Update user role (admin only)
router.put('/:userId/role', requireAdmin, userManagementController.updateUserRole);

// Delete user (admin only)
router.delete('/:userId', requireAdmin, userManagementController.deleteUser);

// Get user statistics (admin only)
router.get('/stats', requireAdmin, userManagementController.getUserStats);

export { router as userManagementRoutes };