"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
// routes/authRoutes.ts
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.authRoutes = router;
// Register new user
router.post('/register', controllers_1.AuthController.register);
// User login
router.post('/login', controllers_1.AuthController.login);
// Refresh token (requires valid token)
router.post('/refresh', auth_1.authenticateToken, controllers_1.AuthController.refreshToken);
// Logout
router.post('/logout', auth_1.authenticateToken, controllers_1.AuthController.logout);
// Verify token
router.get('/verify', auth_1.authenticateToken, controllers_1.AuthController.verifyToken);
//# sourceMappingURL=authRoutes.js.map