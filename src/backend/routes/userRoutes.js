// Routes for user management
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register new user
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user profile
router.get('/profile', userController.getUserProfile);

// Update user profile
router.put('/profile', userController.updateUserProfile);

// Get user preferences
router.get('/preferences', userController.getUserPreferences);

// Update user preferences
router.put('/preferences', userController.updateUserPreferences);

// Get user's favorite artworks
router.get('/favorites', userController.getUserFavorites);

// Add artwork to favorites
router.post('/favorites/:artworkId', userController.addFavorite);

// Remove artwork from favorites
router.delete('/favorites/:artworkId', userController.removeFavorite);

// Get user's interaction history
router.get('/history', userController.getUserHistory);

module.exports = router;