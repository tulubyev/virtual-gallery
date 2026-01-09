// Authentication middleware for Virtual Art Gallery
const jwt = require('jsonwebtoken');

// Secret key for JWT (should be stored in environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.userId = decoded.userId;
        req.username = decoded.username;
        next();
    });
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
    if (req.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ error: 'Admin privileges required' });
    }
};

// Middleware to check user permissions for specific resources
const requireOwnership = (resourceType) => {
    return (req, res, next) => {
        // In a real implementation, this would check if the user owns the resource
        // For now, we'll just pass through
        next();
    };
};

// Middleware to check if user has a specific role
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.role) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (typeof roles === 'string') {
            roles = [roles];
        }

        if (roles.includes(req.role)) {
            next();
        } else {
            return res.status(403).json({ error: `Access denied. Required role(s): ${roles.join(', ')}` });
        }
    };
};

// Middleware to check if user is authenticated and get their role
const authenticateAndSetRole = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        // Get user details including role from the database
        try {
            const db = require('../models/db');
            const user = await db.getUserById(decoded.userId);

            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }

            req.userId = decoded.userId;
            req.username = decoded.username;
            req.role = user.role;
            next();
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
};

module.exports = {
    authenticateToken,
    requireAdmin,
    requireOwnership,
    requireRole,
    authenticateAndSetRole
};