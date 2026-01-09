// routes/userRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Get user profile
router.get('/profile', authenticateToken, UserController.getUserProfile);

// Update user profile
router.put('/profile', authenticateToken, UserController.updateUserProfile);

// Get user preferences
router.get('/preferences', authenticateToken, UserController.getUserPreferences);

// Update user preferences
router.put('/preferences', authenticateToken, UserController.updateUserPreferences);

// Get user's favorite artworks
router.get('/favorites', authenticateToken, UserController.getUserFavorites);

// Add artwork to favorites
router.post('/favorites/:artworkId', authenticateToken, UserController.addFavorite);

// Remove artwork from favorites
router.delete('/favorites/:artworkId', authenticateToken, UserController.removeFavorite);

// Get user's interaction history
router.get('/history', authenticateToken, UserController.getUserHistory);

export { router as userRoutes };