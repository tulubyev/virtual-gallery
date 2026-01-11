// scripts/check-db-data.ts
import { Pool } from 'pg';
import 'dotenv/config';

async function checkData() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log('Проверка наличия данных в базе...');
    const client = await pool.connect();
    
    // Проверим количество записей в таблице artworks
    const artworksCount = await client.query('SELECT COUNT(*) FROM artworks');
    console.log('Количество экспонатов в базе:', artworksCount.rows[0].count);
    
    // Если есть экспонаты, получим несколько первых
    if (parseInt(artworksCount.rows[0].count) > 0) {
      const artworks = await client.query('SELECT * FROM artworks LIMIT 5');
      console.log('Первые 5 экспонатов:', artworks.rows);
    } else {
      console.log('Таблица artworks пуста');
    }
    
    // Проверим количество пользователей
    const usersCount = await client.query('SELECT COUNT(*) FROM users');
    console.log('Количество пользователей в базе:', usersCount.rows[0].count);
    
    client.release();
  } catch (err) {
    console.error('Ошибка при проверке данных:', err);
  } finally {
    await pool.end();
    console.log('Подключение закрыто');
  }
}

checkData();