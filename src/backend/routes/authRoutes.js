// Routes for authentication
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Register new user
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Refresh token (requires valid token)
router.post('/refresh', authenticateToken, authController.refreshToken);

// Logout
router.post('/logout', authenticateToken, authController.logout);

// Verify token
router.get('/verify', authenticateToken, authController.verifyToken);

module.exports = router;