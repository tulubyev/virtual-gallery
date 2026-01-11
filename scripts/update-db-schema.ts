// scripts/update-db-schema.ts
import { Pool } from 'pg';
import 'dotenv/config';

async function updateSchema() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log('Обновление структуры базы данных...');
    const client = await pool.connect();

    // Добавляем колонку role в таблицу users, если её нет
    try {
      await client.query(`
        ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';
      `);
      console.log('Колонка role добавлена в таблицу users (если не существовала)');
    } catch (err: any) {
      console.log('Колонка role в таблице users уже существует или произошла другая ошибка:', err.message);
    }

    // Добавляем колонки first_name и last_name в таблицу users
    try {
      await client.query(`
        ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name VARCHAR(100);
        ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name VARCHAR(100);
      `);
      console.log('Колонки first_name и last_name добавлены в таблицу users (если не существовали)');
    } catch (err: any) {
      console.log('Колонки first_name и last_name в таблице users уже существуют или произошла другая ошибка:', err.message);
    }

    // Добавляем колонку status в таблицу artworks
    try {
      await client.query(`
        ALTER TABLE artworks ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'draft';
      `);
      console.log('Колонка status добавлена в таблицу artworks (если не существовала)');
    } catch (err: any) {
      console.log('Колонка status в таблице artworks уже существует или произошла другая ошибка:', err.message);
    }

    // Проверим, существует ли таблица galleries, и создадим, если нет
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS galleries (
          gallery_id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Таблица galleries создана (если не существовала)');
    } catch (err: any) {
      console.log('Таблица galleries уже существует или произошла другая ошибка:', err.message);
    }

    // Проверим, существует ли таблица rooms, и создадим, если нет
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS rooms (
          room_id SERIAL PRIMARY KEY,
          gallery_id INTEGER REFERENCES galleries(gallery_id),
          name VARCHAR(255) NOT NULL,
          description TEXT,
          theme VARCHAR(100),
          layout_settings JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Таблица rooms создана (если не существовала)');
    } catch (err: any) {
      console.log('Таблица rooms уже существует или произошла другая ошибка:', err.message);
    }

    client.release();
    console.log('\nСтруктура базы данных обновлена!');
  } catch (err) {
    console.error('Ошибка при обновлении структуры базы данных:', err);
  } finally {
    await pool.end();
    console.log('Подключение закрыто');
  }
}

updateSchema();