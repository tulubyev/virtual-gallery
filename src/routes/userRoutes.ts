// routes/userRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import userController from '../controllers/UserController';

const router = Router();

// Register new user
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user profile
router.get('/profile', authenticateToken, userController.getUserProfile);

// Update user profile
router.put('/profile', authenticateToken, userController.updateUserProfile);

// Get user preferences
router.get('/preferences', authenticateToken, userController.getUserPreferences);

// Update user preferences
router.put('/preferences', authenticateToken, userController.updateUserPreferences);

// Get user's favorite artworks
router.get('/favorites', authenticateToken, userController.getUserFavorites);

// Add artwork to favorites
router.post('/favorites/:artworkId', authenticateToken, userController.addFavorite);

// Remove artwork from favorites
router.delete('/favorites/:artworkId', authenticateToken, userController.removeFavorite);

// Get user's interaction history
router.get('/history', authenticateToken, userController.getUserHistory);

export { router as userRoutes };