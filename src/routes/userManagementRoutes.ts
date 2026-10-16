// routes/userManagementRoutes.ts
import { Router } from 'express';
import { UserManagementController } from '../controllers';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Все маршруты — только для администраторов
router.use(authenticateToken, requireAdmin);

router.get('/', UserManagementController.getAllUsers);
router.get('/stats', UserManagementController.getUserStats);
router.get('/role/:role', UserManagementController.getUsersByRole);
router.put('/:userId/role', UserManagementController.updateUserRole);
router.delete('/:userId', UserManagementController.deleteUser);

export { router as userManagementRoutes };
