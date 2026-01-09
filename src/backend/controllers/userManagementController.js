// Controller for user management (admin functions)
const db = require('../models/db');

const userManagementController = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await db.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get users by role
    getUsersByRole: async (req, res) => {
        try {
            const { role } = req.params;
            const users = await db.getUsersByRole(role);
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update user role (admin only)
    updateUserRole: async (req, res) => {
        try {
            const { userId } = req.params;
            const { role } = req.body;

            // Validate role
            const validRoles = ['user', 'admin', 'curator', 'staff', 'tour_guide', 'auction_participant'];
            if (!validRoles.includes(role)) {
                return res.status(400).json({ error: 'Invalid role' });
            }

            const updatedUser = await db.updateUser(parseInt(userId), { role });
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({
                message: 'User role updated successfully',
                user: updatedUser
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete user (admin only)
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            // In a real implementation, this would delete the user
            // For now, we'll just return a success message
            res.json({ message: 'User deletion functionality would be implemented here' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get user statistics (admin only)
    getUserStats: async (req, res) => {
        try {
            // In a real implementation, this would gather user statistics
            const stats = {
                total_users: 150,
                active_users: 120,
                new_users_today: 5,
                users_by_role: {
                    user: 100,
                    admin: 5,
                    curator: 10,
                    staff: 20,
                    tour_guide: 10,
                    auction_participant: 5
                }
            };
            res.json(stats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = userManagementController;