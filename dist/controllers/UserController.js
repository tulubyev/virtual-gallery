"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class UserController {
    async getUserProfile(req, res) {
        try {
            // userId должен поступать из JWT токена (через middleware аутентификации)
            const userId = req.userId;
            const user = await services_1.UserService.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateUserProfile(req, res) {
        try {
            const userId = req.userId; // From JWT token
            const updateData = req.body;
            // Don't allow updating user ID, password or role through this endpoint
            delete updateData.user_id;
            delete updateData.password;
            delete updateData.role;
            const updatedUser = await services_1.UserService.updateUser(userId, updateData);
            if (!updatedUser) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(updatedUser);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getUserPreferences(req, res) {
        try {
            const userId = req.userId; // From JWT token
            const user = await services_1.UserService.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json({ preferences: user.preferences || {} });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateUserPreferences(req, res) {
        try {
            const userId = req.userId; // From JWT token
            const preferences = req.body;
            const updatedUser = await services_1.UserService.updateUser(userId, { preferences });
            if (!updatedUser) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json({ preferences: updatedUser.preferences });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getUserFavorites(req, res) {
        try {
            const userId = req.userId; // From JWT token
            // В реальной реализации это будет извлекать избранные произведения пользователя
            // For now, returning empty array
            res.json([]);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async addFavorite(req, res) {
        try {
            const userId = req.userId; // From JWT token
            const { artworkId } = req.params;
            // В реальной реализации это будет добавлять произведение в избранное
            // For now, returning success
            res.json({ message: 'Added to favorites' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async removeFavorite(req, res) {
        try {
            const userId = req.userId; // From JWT token
            const { artworkId } = req.params;
            // В реальной реализации это будет удалять произведение из избранного
            // For now, returning success
            res.json({ message: 'Removed from favorites' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getUserHistory(req, res) {
        try {
            const userId = req.userId; // From JWT token
            // В реальной реализации это будет извлекать историю взаимодействий пользователя
            // For now, returning empty array
            res.json([]);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map