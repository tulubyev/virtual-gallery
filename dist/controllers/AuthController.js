"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../services");
class AuthController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400).json({ error: 'Username, email, and password are required' });
                return;
            }
            const existingUser = await services_1.UserService.getUserByEmail(email);
            if (existingUser) {
                res.status(409).json({ error: 'User with this email already exists' });
                return;
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const newUser = await services_1.UserService.createUser({
                username,
                email,
                password: hashedPassword
            });
            const token = jsonwebtoken_1.default.sign({ userId: newUser.user_id, username: newUser.username }, process.env.JWT_SECRET || 'your-super-secret-jwt-key', { expiresIn: '24h' });
            res.status(201).json({
                user_id: newUser.user_id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                token
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: 'Email and password are required' });
                return;
            }
            const user = await services_1.UserService.getUserByEmail(email);
            if (!user) {
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }
            const isValidPassword = await bcrypt_1.default.compare(password, user.password_hash);
            if (!isValidPassword) {
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.user_id, username: user.username }, process.env.JWT_SECRET || 'your-super-secret-jwt-key', { expiresIn: '24h' });
            res.json({
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role,
                token
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async refreshToken(req, res) {
        try {
            const userId = req.userId;
            const user = await services_1.UserService.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.user_id, username: user.username }, process.env.JWT_SECRET || 'your-super-secret-jwt-key', { expiresIn: '24h' });
            res.json({
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role,
                token
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async logout(req, res) {
        try {
            res.json({ message: 'Logged out successfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async verifyToken(req, res) {
        try {
            const userId = req.userId;
            const user = await services_1.UserService.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json({
                valid: true,
                user: {
                    user_id: user.user_id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new AuthController();
//# sourceMappingURL=AuthController.js.map