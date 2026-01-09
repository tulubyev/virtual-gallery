"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class UserController {
    async getUserProfile(req, res) {
        try {
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
            const userId = req.userId;
            const updateData = req.body;
            delete updateData.user_id;
            delete updateData.password;
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
            const userId = req.userId;
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
            const userId = req.userId;
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
            const userId = req.userId;
            res.json([]);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async addFavorite(req, res) {
        try {
            const userId = req.userId;
            const { artworkId } = req.params;
            res.json({ message: 'Added to favorites' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async removeFavorite(req, res) {
        try {
            const userId = req.userId;
            const { artworkId } = req.params;
            res.json({ message: 'Removed from favorites' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getUserHistory(req, res) {
        try {
            const userId = req.userId;
            res.json([]);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map