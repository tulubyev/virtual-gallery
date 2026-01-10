// routes/authRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controllers';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Register new user
router.post('/register', AuthController.register);

// User login
router.post('/login', AuthController.login);

// Refresh token (requires valid token)
router.post('/refresh', authenticateToken, AuthController.refreshToken);

// Logout
router.post('/logout', authenticateToken, AuthController.logout);

// Verify token
router.get('/verify', authenticateToken, AuthController.verifyToken);

export { router as authRoutes };