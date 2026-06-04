// scripts/update-user-role.ts
import { Pool } from 'pg';
import 'dotenv/config';

async function updateUserRole() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log('Обновление роли пользователя admin@example.com на admin...');
    const client = await pool.connect();

    const result = await client.query(
      'UPDATE users SET role = $1 WHERE email = $2 RETURNING user_id, username, email, role',
      ['admin', 'admin@example.com']
    );

    if (result.rows.length > 0) {
      console.log('Роль пользователя обновлена:', result.rows[0]);
    } else {
      console.log('Пользователь с email admin@example.com не найден');
    }

    client.release();
  } catch (err) {
    console.error('Ошибка при обновлении роли пользователя:', err);
  } finally {
    await pool.end();
    console.log('Подключение закрыто');
  }
}

updateUserRole();