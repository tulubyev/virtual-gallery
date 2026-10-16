"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../services");
const jwt_1 = require("../config/jwt");
class AuthController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            // Валидация входных данных
            if (!username || !email || !password) {
                res.status(400).json({ error: 'Username, email, and password are required' });
                return;
            }
            // Проверка, существует ли пользователь с таким email
            const existingUser = await services_1.UserService.getUserByEmail(email);
            if (existingUser) {
                res.status(409).json({ error: 'User with this email already exists' });
                return;
            }
            // Хеширование пароля
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            // Создание пользователя
            const newUser = await services_1.UserService.createUser({
                username,
                email,
                password: hashedPassword
            });
            // Генерация JWT токена
            const token = jsonwebtoken_1.default.sign({ userId: newUser.user_id, username: newUser.username }, (0, jwt_1.getJwtSecret)(), { expiresIn: '24h' });
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
            // Валидация входных данных
            if (!email || !password) {
                res.status(400).json({ error: 'Email and password are required' });
                return;
            }
            // Поиск пользователя по email
            const user = await services_1.UserService.getUserByEmail(email);
            if (!user) {
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }
            // Проверка пароля
            const isValidPassword = await bcrypt_1.default.compare(password, user.password_hash);
            if (!isValidPassword) {
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }
            // Генерация JWT токена
            const token = jsonwebtoken_1.default.sign({ userId: user.user_id, username: user.username }, (0, jwt_1.getJwtSecret)(), { expiresIn: '24h' });
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
            // В реальной реализации это будет обновлять JWT токен
            const userId = req.userId; // Предполагается, что userId добавлен в middleware
            const user = await services_1.UserService.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.user_id, username: user.username }, (0, jwt_1.getJwtSecret)(), { expiresIn: '24h' });
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
            // В реальной реализации это может инвалидировать токен на сервере
            res.json({ message: 'Logged out successfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async verifyToken(req, res) {
        try {
            // Этот метод будет защищен middleware аутентификации
            // Так что если мы дошли до сюда, токен действителен
            const userId = req.userId; // Предполагается, что userId добавлен в middleware
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