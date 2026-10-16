"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
// routes/userRoutes.ts
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.userRoutes = router;
// Get user profile
router.get('/profile', auth_1.authenticateToken, controllers_1.UserController.getUserProfile);
// Update user profile
router.put('/profile', auth_1.authenticateToken, controllers_1.UserController.updateUserProfile);
// Get user preferences
router.get('/preferences', auth_1.authenticateToken, controllers_1.UserController.getUserPreferences);
// Update user preferences
router.put('/preferences', auth_1.authenticateToken, controllers_1.UserController.updateUserPreferences);
// Get user's favorite artworks
router.get('/favorites', auth_1.authenticateToken, controllers_1.UserController.getUserFavorites);
// Add artwork to favorites
router.post('/favorites/:artworkId', auth_1.authenticateToken, controllers_1.UserController.addFavorite);
// Remove artwork from favorites
router.delete('/favorites/:artworkId', auth_1.authenticateToken, controllers_1.UserController.removeFavorite);
// Get user's interaction history
router.get('/history', auth_1.authenticateToken, controllers_1.UserController.getUserHistory);
//# sourceMappingURL=userRoutes.js.map