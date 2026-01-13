// src/services/DatabaseService.ts
import { Pool, PoolClient } from 'pg';
import 'dotenv/config';

export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DB_STRING,
      ssl: {
        rejectUnauthorized: false // Required for many hosted PostgreSQL services
      }
    });

    // Тест подключения
    this.testConnection();
  }

  private async testConnection(): Promise<void> {
    try {
      await this.pool.query('SELECT NOW()');
      console.log('Подключено к PostgreSQL базе данных успешно');
    } catch (err) {
      console.error('Ошибка подключения к базе данных:', err);
    }
  }

  public async query(text: string, params?: any[]) {
    const start = Date.now();
    const res = await this.pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  }

  public async connect(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  public async end(): Promise<void> {
    await this.pool.end();
  }

  public getPool(): Pool {
    return this.pool;
  }
}

export default new DatabaseService();