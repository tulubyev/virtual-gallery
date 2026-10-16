"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/UserService.ts
const DatabaseService_1 = __importDefault(require("./DatabaseService"));
const columns_1 = require("./columns");
const USER_COLUMNS = ['username', 'email', 'preferences', 'role'];
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
        const entries = (0, columns_1.pickColumns)(updateData, USER_COLUMNS);
        if (entries.length === 0) {
            return (await this.getUserById(id)) ?? null;
        }
        const setClause = entries.map(([key], i) => `${key} = $${i + 1}`).join(', ');
        const values = [...entries.map(([key, value]) => (key === 'preferences' ? JSON.stringify(value) : value)), id];
        const query = `UPDATE users SET ${setClause} WHERE user_id = $${values.length} RETURNING user_id, username, email, role, preferences`;
        const result = await DatabaseService_1.default.query(query, values);
        return result.rows[0] || null;
    }
    async getUsersByRole(role) {
        const result = await DatabaseService_1.default.query('SELECT user_id, username, email, role, created_at FROM users WHERE role = $1', [role]);
        return result.rows;
    }
    async deleteUser(id) {
        const result = await DatabaseService_1.default.query('DELETE FROM users WHERE user_id = $1 RETURNING user_id', [id]);
        return (result.rowCount ?? 0) > 0;
    }
    async getUserStats() {
        const byRole = await DatabaseService_1.default.query('SELECT role, COUNT(*)::int AS count FROM users GROUP BY role');
        const today = await DatabaseService_1.default.query('SELECT COUNT(*)::int AS count FROM users WHERE created_at >= CURRENT_DATE');
        const users_by_role = {};
        let total_users = 0;
        for (const row of byRole.rows) {
            users_by_role[row.role] = row.count;
            total_users += row.count;
        }
        return { total_users, new_users_today: today.rows[0].count, users_by_role };
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map