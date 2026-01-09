"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.authRoutes = router;
router.post('/register', controllers_1.AuthController.register);
router.post('/login', controllers_1.AuthController.login);
router.post('/refresh', auth_1.authenticateToken, controllers_1.AuthController.refreshToken);
router.post('/logout', auth_1.authenticateToken, controllers_1.AuthController.logout);
router.get('/verify', auth_1.authenticateToken, controllers_1.AuthController.verifyToken);
//# sourceMappingURL=authRoutes.js.map