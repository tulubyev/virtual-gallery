"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../services");
const jwt_1 = require("../config/jwt");
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) {
        res.status(401).json({ error: 'Access token required' });
        return;
    }
    jsonwebtoken_1.default.verify(token, (0, jwt_1.getJwtSecret)(), async (err, decoded) => {
        if (err) {
            res.status(403).json({ error: 'Invalid or expired token' });
            return;
        }
        try {
            // Получаем данные пользователя из базы данных для получения роли
            const user = await services_1.UserService.getUserById(decoded.userId);
            if (!user) {
                res.status(401).json({ error: 'User not found' });
                return;
            }
            req.userId = decoded.userId;
            req.username = decoded.username;
            req.role = user.role;
            next();
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
};
exports.authenticateToken = authenticateToken;
// Middleware для проверки роли пользователя
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.role) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }
        if (typeof roles === 'string') {
            roles = [roles];
        }
        if (roles.includes(req.role)) {
            next();
        }
        else {
            res.status(403).json({ error: `Access denied. Required role(s): ${roles.join(', ')}` });
        }
    };
};
exports.requireRole = requireRole;
// Middleware для проверки, является ли пользователь администратором
const requireAdmin = (req, res, next) => {
    if (req.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ error: 'Admin privileges required' });
    }
};
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=auth.js.map