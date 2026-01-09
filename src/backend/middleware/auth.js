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
    // In a real implementation, this would check if the user has admin privileges
    // For now, we'll just check if the username contains 'admin' as a simple check
    if (req.username && req.username.toLowerCase().includes('admin')) {
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

module.exports = {
    authenticateToken,
    requireAdmin,
    requireOwnership
};