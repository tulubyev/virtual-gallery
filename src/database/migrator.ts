// src/database/migrator.ts — применение SQL-миграций из src/database/migrations к боевой БД приложения.
//
// Файлы NNN_имя.sql применяются по порядку, каждый — в своей транзакции; применённые записываются в app_migrations.
// Одновременный запуск из нескольких процессов безопасен (advisory-лок). Уже применённый файл не пересоздаётся;
// если его текст изменился, выдаётся предупреждение — правки делаются новой миграцией.
// Запуск вручную: `npm run migrate` (на сервере — `docker exec virtual-gallery npm run migrate`, см. docs/DEPLOY.md).
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import type { PoolClient } from 'pg';

export const MIGRATIONS_DIR = path.join(__dirname, 'migrations');
const LOCK_KEY = 7_270_012;               // отличается от лока миграций ядра (7_270_011)
const FILE_PATTERN = /^\d{3}_[a-z0-9_]+\.sql$/;

export interface MigrationPool {
  connect(): Promise<PoolClient>;
}

export function migrationFiles(dir: string = MIGRATIONS_DIR): string[] {
  return fs.readdirSync(dir).filter(name => FILE_PATTERN.test(name)).sort();
}

const checksum = (sql: string) => createHash('sha256').update(sql).digest('hex');

/** Применить новые миграции; возвращает имена применённых файлов. Ошибка файла откатывает только его и прерывает запуск. */
export async function applyMigrations(
  pool: MigrationPool,
  dir: string = MIGRATIONS_DIR,
  log: (message: string) => void = message => console.log(`[migrate] ${message}`),
): Promise<string[]> {
  const client = await pool.connect();
  const applied: string[] = [];
  try {
    await client.query('SELECT pg_advisory_lock($1)', [LOCK_KEY]);
    await client.query(`
      CREATE TABLE IF NOT EXISTS app_migrations (
        filename   TEXT PRIMARY KEY,
        checksum   TEXT NOT NULL,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`);
    const done = new Map<string, string>(
      (await client.query('SELECT filename, checksum FROM app_migrations')).rows.map((r: any) => [r.filename, r.checksum]));

    for (const name of migrationFiles(dir)) {
      const sql = fs.readFileSync(path.join(dir, name), 'utf8');
      const sum = checksum(sql);
      if (done.has(name)) {
        if (done.get(name) !== sum) log(`${name}: файл изменился после применения — изменения не применены, нужна новая миграция`);
        continue;
      }
      try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('INSERT INTO app_migrations (filename, checksum) VALUES ($1, $2)', [name, sum]);
        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK').catch(() => undefined);
        log(`${name}: ошибка, миграция откатена`);
        throw error;
      }
      applied.push(name);
      log(`${name}: применена`);
    }
    if (applied.length === 0) log('новых миграций нет');
    return applied;
  } finally {
    await client.query('SELECT pg_advisory_unlock($1)', [LOCK_KEY]).catch(() => undefined);
    client.release();
  }
}
