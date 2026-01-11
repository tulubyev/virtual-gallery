// scripts/check-db-connection.ts
import { Pool } from 'pg';
import 'dotenv/config';

async function testConnection() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log('Попытка подключения к базе данных...');
    const client = await pool.connect();
    console.log('Подключение успешно установлено!');
    
    // Выполним простой запрос для проверки
    const result = await client.query('SELECT NOW()');
    console.log('Тестовый запрос выполнен успешно:', result.rows[0]);
    
    // Проверим наличие таблицы users
    const usersResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    console.log('Таблица users существует:', usersResult.rows[0].exists);
    
    client.release();
  } catch (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } finally {
    await pool.end();
    console.log('Подключение закрыто');
  }
}

testConnection();