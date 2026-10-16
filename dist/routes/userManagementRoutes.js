"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userManagementRoutes = void 0;
// routes/userManagementRoutes.ts
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.userManagementRoutes = router;
// Все маршруты — только для администраторов
router.use(auth_1.authenticateToken, auth_1.requireAdmin);
router.get('/', controllers_1.UserManagementController.getAllUsers);
router.get('/stats', controllers_1.UserManagementController.getUserStats);
router.get('/role/:role', controllers_1.UserManagementController.getUsersByRole);
router.put('/:userId/role', controllers_1.UserManagementController.updateUserRole);
router.delete('/:userId', controllers_1.UserManagementController.deleteUser);
//# sourceMappingURL=userManagementRoutes.js.map