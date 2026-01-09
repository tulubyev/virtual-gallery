"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseService_1 = __importDefault(require("./DatabaseService"));
class UserService {
    async getAllUsers() {
        const result = await DatabaseService_1.default.query('SELECT user_id, username, email, role, created_at FROM users ORDER BY user_id');
        return result.rows;
    }
    async getUserById(id) {
        const result = await DatabaseService_1.default.query('SELECT user_id, username, email, role, preferences FROM users WHERE user_id = $1', [id]);
        return result.rows[0];
    }
    async getUserByEmail(email) {
        const result = await DatabaseService_1.default.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }
    async createUser(userData) {
        const { username, email, password, role = 'user' } = userData;
        const result = await DatabaseService_1.default.query('INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email, role', [username, email, password, role]);
        return result.rows[0];
    }
    async updateUser(id, updateData) {
        const fields = [];
        const values = [];
        let query = 'UPDATE users SET ';
        let paramCount = 1;
        for (const [key, value] of Object.entries(updateData)) {
            fields.push(`${key} = $${paramCount}`);
            values.push(key === 'preferences' ? JSON.stringify(value) : value);
            paramCount++;
        }
        query += fields.join(', ') + ` WHERE user_id = $${paramCount} RETURNING user_id, username, email, role, preferences`;
        values.push(id);
        const result = await DatabaseService_1.default.query(query, values);
        return result.rows[0] || null;
    }
    async getUsersByRole(role) {
        const result = await DatabaseService_1.default.query('SELECT user_id, username, email, role, created_at FROM users WHERE role = $1', [role]);
        return result.rows;
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map