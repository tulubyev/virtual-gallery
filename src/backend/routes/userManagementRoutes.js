// Routes for user management (admin functions)
const express = require('express');
const router = express.Router();
const userManagementController = require('../controllers/userManagementController');
const { requireAdmin } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', requireAdmin, userManagementController.getAllUsers);

// Get users by role (admin only)
router.get('/role/:role', requireAdmin, userManagementController.getUsersByRole);

// Update user role (admin only)
router.put('/:userId/role', requireAdmin, userManagementController.updateUserRole);

// Delete user (admin only)
router.delete('/:userId', requireAdmin, userManagementController.deleteUser);

// Get user statistics (admin only)
router.get('/stats', requireAdmin, userManagementController.getUserStats);

module.exports = router;