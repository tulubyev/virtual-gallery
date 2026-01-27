// scripts/check-table-structure.ts
import { Pool } from 'pg';
import 'dotenv/config';

async function checkTableStructure() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log('Проверка структуры таблицы users...');
    const client = await pool.connect();
    
    // Получим информацию о столбцах таблицы users
    const columns = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position;
    `);
    
    console.log('Структура таблицы users:');
    columns.rows.forEach(col => {
      console.log(`${col.column_name}: ${col.data_type} (${col.is_nullable})`);
    });
    
    // Проверим структуру таблицы artworks
    console.log('\nПроверка структуры таблицы artworks...');
    const artworkColumns = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'artworks'
      ORDER BY ordinal_position;
    `);
    
    console.log('Структура таблицы artworks:');
    artworkColumns.rows.forEach(col => {
      console.log(`${col.column_name}: ${col.data_type} (${col.is_nullable})`);
    });
    
    client.release();
  } catch (err) {
    console.error('Ошибка при проверке структуры таблиц:', err);
  } finally {
    await pool.end();
    console.log('Подключение закрыто');
  }
}

checkTableStructure();