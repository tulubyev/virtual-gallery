// Раннер миграций приложения на настоящем PostgreSQL.
import fs from 'fs';
import os from 'os';
import path from 'path';
import type { Pool } from 'pg';
import { applyMigrations, migrationFiles, MIGRATIONS_DIR } from '../../database/migrator';
import { describeDb, isolatedPool } from './biddingHarness';

describeDb('раннер миграций (PostgreSQL)', () => {
  let pool: Pool;
  const quiet: string[] = [];
  const log = (m: string) => { quiet.push(m); };

  let schema: string;

  beforeAll(async () => { ({ pool, schema } = await isolatedPool(6)); });
  afterAll(async () => { await pool.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`).catch(() => undefined); await pool.end(); });
  beforeEach(async () => {
    quiet.length = 0;
    await pool.query(`DROP SCHEMA "${schema}" CASCADE; CREATE SCHEMA "${schema}";`);
  });

  const tempDir = (files: Record<string, string>) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mig-'));
    for (const [name, sql] of Object.entries(files)) fs.writeFileSync(path.join(dir, name), sql);
    return dir;
  };

  it('применяет файлы по порядку, второй запуск ничего не делает', async () => {
    const dir = tempDir({ '002_b.sql': 'CREATE TABLE b (id int);', '001_a.sql': 'CREATE TABLE a (id int);', 'notes.txt': 'не миграция', 'bad name.sql': 'SELECT 1/0;' });
    expect(await applyMigrations(pool as any, dir, log)).toEqual(['001_a.sql', '002_b.sql']);
    expect(await applyMigrations(pool as any, dir, log)).toEqual([]);
    expect(quiet).toContain('новых миграций нет');
  });

  it('сбойный файл откатывается целиком и не записывается; предыдущие остаются', async () => {
    const dir = tempDir({ '001_ok.sql': 'CREATE TABLE ok (id int);', '002_bad.sql': 'CREATE TABLE half (id int); SELECT nonexistent_fn();' });
    await expect(applyMigrations(pool as any, dir, log)).rejects.toThrow(/nonexistent_fn/);
    const tables = (await pool.query(`SELECT tablename FROM pg_tables WHERE schemaname = current_schema()`)).rows.map(r => r.tablename);
    expect(tables).toContain('ok');
    expect(tables).not.toContain('half');
    expect((await pool.query('SELECT filename FROM app_migrations')).rows).toEqual([{ filename: '001_ok.sql' }]);
    // исправленный файл применяется со следующего запуска
    fs.writeFileSync(path.join(dir, '002_bad.sql'), 'CREATE TABLE half (id int);');
    expect(await applyMigrations(pool as any, dir, log)).toEqual(['002_bad.sql']);
  });

  it('изменённый применённый файл не применяется повторно, но предупреждение есть', async () => {
    const dir = tempDir({ '001_a.sql': 'CREATE TABLE a (id int);' });
    await applyMigrations(pool as any, dir, log);
    fs.writeFileSync(path.join(dir, '001_a.sql'), 'DROP TABLE a;');
    expect(await applyMigrations(pool as any, dir, log)).toEqual([]);
    expect(quiet.some(m => m.includes('файл изменился'))).toBe(true);
    expect((await pool.query(`SELECT to_regclass('a') AS t`)).rows[0].t).toBe('a');
  });

  it('одновременные запуски применяют каждый файл ровно один раз', async () => {
    const dir = tempDir({ '001_a.sql': 'CREATE TABLE a (id int);', '002_b.sql': 'CREATE TABLE b (id int);' });
    const runs = await Promise.all(Array.from({ length: 5 }, () => applyMigrations(pool as any, dir, log)));
    expect(runs.flat().sort()).toEqual(['001_a.sql', '002_b.sql']);
  });

  it('боевые миграции приложения применяются на пустой БД со справочниками users и artworks', async () => {
    await pool.query('CREATE TABLE users (user_id SERIAL PRIMARY KEY); CREATE TABLE artworks (artwork_id SERIAL PRIMARY KEY);');
    expect(await applyMigrations(pool as any, MIGRATIONS_DIR, log)).toEqual(migrationFiles());
    expect(migrationFiles()[0]).toBe('001_bidding_engine.sql');
  });
});
