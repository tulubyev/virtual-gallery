"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.userRoutes = router;
router.get('/profile', auth_1.authenticateToken, controllers_1.UserController.getUserProfile);
router.put('/profile', auth_1.authenticateToken, controllers_1.UserController.updateUserProfile);
router.get('/preferences', auth_1.authenticateToken, controllers_1.UserController.getUserPreferences);
router.put('/preferences', auth_1.authenticateToken, controllers_1.UserController.updateUserPreferences);
router.get('/favorites', auth_1.authenticateToken, controllers_1.UserController.getUserFavorites);
router.post('/favorites/:artworkId', auth_1.authenticateToken, controllers_1.UserController.addFavorite);
router.delete('/favorites/:artworkId', auth_1.authenticateToken, controllers_1.UserController.removeFavorite);
router.get('/history', auth_1.authenticateToken, controllers_1.UserController.getUserHistory);
//# sourceMappingURL=userRoutes.js.map