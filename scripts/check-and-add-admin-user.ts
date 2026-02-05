// scripts/check-and-add-admin-user.ts
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import 'dotenv/config';

async function checkAndAddAdminUser() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log('Проверка наличия администратора в базе данных...');
    const client = await pool.connect();

    // Проверим, существует ли пользователь с email admin@virtgal.ru
    const result = await client.query(
      'SELECT user_id, email, password_hash FROM users WHERE email = $1',
      ['admin@virtgal.ru']
    );

    if (result.rows.length > 0) {
      console.log('Администратор уже существует в базе данных:', result.rows[0]);
    } else {
      console.log('Администратор не найден, создаем нового...');
      
      // Хешируем пароль 'password123'
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      // Создаем нового администратора
      const insertResult = await client.query(
        `INSERT INTO users (username, email, password_hash, role, first_name, last_name) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING user_id, username, email, role`,
        ['admin_user', 'admin@virtgal.ru', hashedPassword, 'admin', 'Админ', 'Главный']
      );
      
      console.log('Новый администратор создан:', insertResult.rows[0]);
    }

    client.release();
  } catch (err) {
    console.error('Ошибка при проверке/создании администратора:', err);
  } finally {
    await pool.end();
    console.log('Подключение к базе данных закрыто');
  }
}

checkAndAddAdminUser();