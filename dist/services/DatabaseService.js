"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// services/DatabaseService.ts
const pg_1 = require("pg");
require("dotenv/config");
class DatabaseService {
    constructor() {
        this.pool = new pg_1.Pool({
            connectionString: process.env.DB_STRING,
            // SSL нужен для внешних хостингов БД; PostgreSQL на том же VPS работает без него
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
        });
        // Тест подключения
        this.testConnection();
    }
    async testConnection() {
        try {
            await this.pool.query('SELECT NOW()');
            console.log('Подключено к PostgreSQL базе данных успешно');
        }
        catch (err) {
            console.error('Ошибка подключения к базе данных:', err);
        }
    }
    async query(text, params) {
        const start = Date.now();
        const res = await this.pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    }
    async connect() {
        return await this.pool.connect();
    }
    async end() {
        await this.pool.end();
    }
}
exports.default = new DatabaseService();
//# sourceMappingURL=DatabaseService.js.map