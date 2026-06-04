// routes/authRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authenticateToken } from '../middleware/auth';

export function createAuthRoutes(controller: AuthController) {
  const router = Router();

  // Register new user
  router.post('/register', (req, res) => controller.register(req, res));

  // User login
  router.post('/login', (req, res) => controller.login(req, res));

  // Refresh token (requires valid token)
  router.post('/refresh', authenticateToken, (req, res) => controller.refreshToken(req, res));

  // Logout
  router.post('/logout', authenticateToken, (req, res) => controller.logout(req, res));

  // Verify token
  router.get('/verify', authenticateToken, (req, res) => controller.verifyToken(req, res));

  return router;
}