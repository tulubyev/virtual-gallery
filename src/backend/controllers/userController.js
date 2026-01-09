// Controller for user operations
const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT (should be stored in environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

const userController = {
    // Register new user
    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Create the user in the database
            const newUser = await db.createUser({
                username,
                email,
                password_hash: hashedPassword
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
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            
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

    // Get user profile
    getUserProfile: async (req, res) => {
        try {
            // The user ID should come from the JWT token (decoded in middleware)
            const userId = req.userId; // Assuming this is set by authentication middleware
            
            const user = await db.getUserById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update user profile
    updateUserProfile: async (req, res) => {
        try {
            const userId = req.userId; // From JWT token
            const updateData = req.body;
            
            // Don't allow updating user ID or password through this endpoint
            delete updateData.user_id;
            delete updateData.password;
            
            const updatedUser = await db.updateUser(userId, updateData);
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get user preferences
    getUserPreferences: async (req, res) => {
        try {
            const userId = req.userId; // From JWT token
            
            const user = await db.getUserById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            res.json({ preferences: user.preferences || {} });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update user preferences
    updateUserPreferences: async (req, res) => {
        try {
            const userId = req.userId; // From JWT token
            const preferences = req.body;
            
            const updatedUser = await db.updateUser(userId, { preferences });
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            res.json({ preferences: updatedUser.preferences });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get user's favorite artworks
    getUserFavorites: async (req, res) => {
        try {
            const userId = req.userId; // From JWT token
            
            // In a real implementation, this would fetch favorite artworks
            // For now, returning empty array
            res.json([]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Add artwork to favorites
    addFavorite: async (req, res) => {
        try {
            const userId = req.userId; // From JWT token
            const { artworkId } = req.params;
            
            // In a real implementation, this would add to favorites
            // For now, returning success
            res.json({ message: 'Added to favorites' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Remove artwork from favorites
    removeFavorite: async (req, res) => {
        try {
            const userId = req.userId; // From JWT token
            const { artworkId } = req.params;
            
            // In a real implementation, this would remove from favorites
            // For now, returning success
            res.json({ message: 'Removed from favorites' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get user's interaction history
    getUserHistory: async (req, res) => {
        try {
            const userId = req.userId; // From JWT token
            
            // In a real implementation, this would fetch interaction history
            // For now, returning empty array
            res.json([]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = userController;