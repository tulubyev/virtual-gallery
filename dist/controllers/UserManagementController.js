"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const VALID_ROLES = ['user', 'admin', 'curator', 'staff', 'tour_guide', 'auction_participant'];
class UserManagementController {
    async getAllUsers(req, res) {
        try {
            res.json(await services_1.UserService.getAllUsers());
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getUsersByRole(req, res) {
        try {
            res.json(await services_1.UserService.getUsersByRole(req.params.role));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateUserRole(req, res) {
        try {
            const { role } = req.body;
            if (!VALID_ROLES.includes(role)) {
                res.status(400).json({ error: 'Invalid role' });
                return;
            }
            const user = await services_1.UserService.updateUser(Number(req.params.userId), { role });
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json({ message: 'User role updated successfully', user });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = Number(req.params.userId);
            if (userId === req.userId) {
                res.status(400).json({ error: 'You cannot delete your own account' });
                return;
            }
            const deleted = await services_1.UserService.deleteUser(userId);
            if (!deleted) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json({ message: 'User deleted successfully' });
        }
        catch (error) {
            // 23503 — foreign_key_violation: у пользователя есть связанные записи
            if (error.code === '23503') {
                res.status(409).json({ error: 'User has related records and cannot be deleted' });
                return;
            }
            res.status(500).json({ error: error.message });
        }
    }
    async getUserStats(req, res) {
        try {
            res.json(await services_1.UserService.getUserStats());
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new UserManagementController();
//# sourceMappingURL=UserManagementController.js.map