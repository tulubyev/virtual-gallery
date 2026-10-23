// Применить миграции БД приложения (src/database/migrations). Запуск: npm run migrate (файл лежит в src/, чтобы попадать в образ)
import pool from '../config/database';
import { applyMigrations } from './migrator';

applyMigrations(pool)
  .then(() => pool.end())
  .then(() => process.exit(0))
  .catch(async (error: Error) => {
    console.error('[migrate] не удалось:', error.message);
    await pool.end().catch(() => undefined);
    process.exit(1);
  });
