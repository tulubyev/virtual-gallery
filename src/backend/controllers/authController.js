// Authentication controller for Virtual Art Gallery
const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT (should be stored in environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

const authController = {
    // Register new user
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Validate input
            if (!username || !email || !password) {
                return res.status(400).json({ error: 'Username, email, and password are required' });
            }

            // Check if user already exists
            const existingUser = await db.getUserByEmail(email);
            if (existingUser) {
                return res.status(409).json({ error: 'User with this email already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user in the database with default role
            const newUser = await db.createUser({
                username,
                email,
                password_hash: hashedPassword,
                role: 'user'  // Default role for new users
            });

            // Generate JWT token
            const token = jwt.sign(
                { userId: newUser.user_id, username: newUser.username },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                user_id: newUser.user_id,
                username: newUser.username,
                email: newUser.email,
                token
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // User login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            // Find user by email
            const user = await db.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.user_id, username: user.username },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                token
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Refresh token
    refreshToken: async (req, res) => {
        try {
            // In a real implementation, this would refresh the JWT token
            // For now, we'll just return a new token
            const userId = req.userId;
            const user = await db.getUserById(userId);
            
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const token = jwt.sign(
                { userId: user.user_id, username: user.username },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                token
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Logout (client-side operation, invalidate token on frontend)
    logout: async (req, res) => {
        try {
            // In a real implementation, this might invalidate the token on the server side
            // or store it in a blacklist until expiration
            res.json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Verify token
    verifyToken: async (req, res) => {
        try {
            // This endpoint would be protected by the authenticateToken middleware
            // So if we reach here, the token is valid
            const userId = req.userId;
            const user = await db.getUserById(userId);
            
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({
                valid: true,
                user: {
                    user_id: user.user_id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = authController;