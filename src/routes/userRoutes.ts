// routes/userRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { UserController } from '../controllers/UserController';

export function createUserRoutes(controller: UserController) {
  const router = Router();

  // Register new user
  router.post('/register', (req, res) => controller.registerUser(req, res));

  // User login
  router.post('/login', (req, res) => controller.loginUser(req, res));

  // Get user profile
  router.get('/profile', authenticateToken, (req, res) => controller.getUserProfile(req, res));

  // Update user profile
  router.put('/profile', authenticateToken, (req, res) => controller.updateUserProfile(req, res));

  // Get user preferences
  router.get('/preferences', authenticateToken, (req, res) => controller.getUserPreferences(req, res));

  // Update user preferences
  router.put('/preferences', authenticateToken, (req, res) => controller.updateUserPreferences(req, res));

  // Get user's favorite artworks
  router.get('/favorites', authenticateToken, (req, res) => controller.getUserFavorites(req, res));

  // Add artwork to favorites
  router.post('/favorites/:artworkId', authenticateToken, (req, res) => controller.addFavorite(req, res));

  // Remove artwork from favorites
  router.delete('/favorites/:artworkId', authenticateToken, (req, res) => controller.removeFavorite(req, res));

  // Get user's interaction history
  router.get('/history', authenticateToken, (req, res) => controller.getUserHistory(req, res));

  return router;
}