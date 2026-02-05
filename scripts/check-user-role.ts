// scripts/check-user-role.ts
import { Pool } from 'pg';
import 'dotenv/config';

async function checkUserRole() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log('Проверка роли пользователя admin@virtgal.ru...');
    const client = await pool.connect();

    const result = await client.query('SELECT user_id, username, email, role FROM users WHERE email = $1', ['admin@virtgal.ru']);
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log('Найден пользователь:', user);
    } else {
      console.log('Пользователь admin@virtgal.ru не найден в базе данных');
    }

    client.release();
  } catch (err) {
    console.error('Ошибка при проверке роли пользователя:', err);
  } finally {
    await pool.end();
    console.log('Подключение закрыто');
  }
}

checkUserRole();