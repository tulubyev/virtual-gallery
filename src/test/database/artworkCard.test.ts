// Миграция 006_artwork_card на настоящем PostgreSQL: поля, ограничения, триггеры, представление публичных фрагментов.
import type { Pool } from 'pg';
import { applyMigrations } from '../../database/migrator';
import { describeDb, isolatedPool } from './biddingHarness';

describeDb('карточка произведения (миграция 006, PostgreSQL)', () => {
  let pool: Pool;
  let schema: string;
  let userId: number;
  let artworkId: number;

  const q = async (sql: string, params: any[] = []) => (await pool.query(sql, params)).rows;
  const quiet = () => undefined;

  const fragment = async (extra: Partial<Record<string, any>> = {}) => {
    const f = { block: 'about_work', language: 'ru', text: 'На изображении много фигур', status: 'visible', sources: '[]', ...extra };
    return (await q(
      `INSERT INTO artwork_card_fragments (artwork_id, block, language, text, status, sources, approved_by, approved_at)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8) RETURNING *`,
      [artworkId, f.block, f.language, f.text, f.status, f.sources, f.approved_by ?? null, f.approved_at ?? null]))[0];
  };
  const doc = (access?: string, quote = 'цитата') => JSON.stringify([{ kind: 'document', id: 'doc-1', quote, page: 4, ...(access ? { access } : {}) }]);
  const cardStatus = async () => (await q('SELECT card_status FROM artworks WHERE artwork_id = $1', [artworkId]))[0].card_status;

  beforeAll(async () => { ({ pool, schema } = await isolatedPool(4)); });
  afterAll(async () => { await pool.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`).catch(() => undefined); await pool.end(); });
  beforeEach(async () => {
    await pool.query(`DROP SCHEMA "${schema}" CASCADE; CREATE SCHEMA "${schema}";`);
    await pool.query(`
      CREATE TABLE users (user_id SERIAL PRIMARY KEY, username TEXT, email TEXT, role TEXT DEFAULT 'user');
      CREATE TABLE artworks (artwork_id SERIAL PRIMARY KEY, title TEXT, status TEXT DEFAULT 'published');`);
    await applyMigrations(pool as any, undefined, quiet);
    userId = (await q(`INSERT INTO users (username, email, role) VALUES ('cur', 'cur@t.io', 'curator') RETURNING user_id`))[0].user_id;
    artworkId = (await q(`INSERT INTO artworks (title) VALUES ('Тест') RETURNING artwork_id`))[0].artwork_id;
  });

  it('существующие произведения получают card_status=draft, прежние поля не меняются', async () => {
    const row = (await q('SELECT title, status, card_status, dating_certainty, inventory_number FROM artworks WHERE artwork_id = $1', [artworkId]))[0];
    expect(row).toEqual({ title: 'Тест', status: 'published', card_status: 'draft', dating_certainty: null, inventory_number: null });
  });

  it('миграция не ломается, если часть колонок уже есть в боевой таблице', async () => {
    await pool.query(`DROP SCHEMA "${schema}" CASCADE; CREATE SCHEMA "${schema}";`);
    await pool.query(`
      CREATE TABLE users (user_id SERIAL PRIMARY KEY);
      CREATE TABLE artworks (artwork_id SERIAL PRIMARY KEY, title TEXT, inventory_number TEXT, provenance TEXT);
      INSERT INTO artworks (title, inventory_number) VALUES ('Старое', 'Р-1');`);
    await applyMigrations(pool as any, undefined, quiet);
    expect((await q('SELECT inventory_number, card_status FROM artworks'))[0]).toEqual({ inventory_number: 'Р-1', card_status: 'draft' });
  });

  it('ограничения паспорта: допустимые значения и диапазон лет', async () => {
    await expect(q(`UPDATE artworks SET dating_certainty = 'maybe' WHERE artwork_id = $1`, [artworkId])).rejects.toThrow(/check/i);
    await expect(q(`UPDATE artworks SET card_status = 'done' WHERE artwork_id = $1`, [artworkId])).rejects.toThrow(/check/i);
    await expect(q(`UPDATE artworks SET year_from = 1757, year_to = 1750 WHERE artwork_id = $1`, [artworkId])).rejects.toThrow(/artworks_card_year_range/);
    await q(`UPDATE artworks SET year_from = 1750, year_to = 1757, dating_certainty = 'approx' WHERE artwork_id = $1`, [artworkId]);
  });

  it('фрагмент from_document требует цитату в документном источнике', async () => {
    await expect(fragment({ status: 'from_document', sources: '[]' })).rejects.toThrow(/document_quote/);
    await expect(fragment({ status: 'from_document', sources: doc('public', '  ') })).rejects.toThrow(/document_quote/);
    await expect(fragment({ status: 'from_document', sources: JSON.stringify([{ kind: 'curator', id: 1 }]) })).rejects.toThrow(/document_quote/);
    expect((await fragment({ status: 'from_document', sources: doc('public') })).status).toBe('from_document');
  });

  it('значения языка, блока и статуса проверяются; ai_inferred нельзя утвердить', async () => {
    await expect(fragment({ language: 'de' })).rejects.toThrow(/check/i);
    await expect(fragment({ block: 'price' })).rejects.toThrow(/check/i);
    await expect(fragment({ status: 'guess' })).rejects.toThrow(/check/i);
    await expect(fragment({ text: '   ' })).rejects.toThrow(/check/i);
    await expect(fragment({ status: 'ai_inferred', approved_by: userId, approved_at: new Date() })).rejects.toThrow(/inferred_not_approved/);
    expect((await fragment({ status: 'ai_inferred' })).approved_by).toBeNull();
  });

  it('правка утверждённого фрагмента снимает утверждение, поднимает версию, пишет историю и возвращает карточку на проверку', async () => {
    const f = await fragment({ status: 'catalogued', approved_by: userId, approved_at: new Date() });
    await q(`UPDATE artworks SET card_status = 'published' WHERE artwork_id = $1`, [artworkId]);

    await q(`UPDATE artwork_card_fragments SET text = 'Новый текст' WHERE fragment_id = $1`, [f.fragment_id]);

    const after = (await q('SELECT * FROM artwork_card_fragments WHERE fragment_id = $1', [f.fragment_id]))[0];
    expect(after.version).toBe(2);
    expect(after.approved_by).toBeNull();
    expect(after.approved_at).toBeNull();
    expect(await cardStatus()).toBe('needs_review');
    const history = await q('SELECT version, snapshot FROM artwork_card_fragment_history WHERE fragment_id = $1', [f.fragment_id]);
    expect(history).toHaveLength(1);
    expect(history[0].version).toBe(1);
    expect(history[0].snapshot.text).toBe('На изображении много фигур');
  });

  it('правка с одновременным повторным утверждением сохраняет утверждение; изменение несущественных полей версию не меняет', async () => {
    const f = await fragment({ status: 'catalogued', approved_by: userId, approved_at: new Date('2026-01-01') });
    await q(`UPDATE artwork_card_fragments SET model = 'm1' WHERE fragment_id = $1`, [f.fragment_id]);
    let row = (await q('SELECT version, approved_by FROM artwork_card_fragments WHERE fragment_id = $1', [f.fragment_id]))[0];
    expect(row).toEqual({ version: 1, approved_by: userId });

    await q(`UPDATE artwork_card_fragments SET text = 'Правка', approved_by = $2, approved_at = now() WHERE fragment_id = $1`, [f.fragment_id, userId]);
    row = (await q('SELECT version, approved_by FROM artwork_card_fragments WHERE fragment_id = $1', [f.fragment_id]))[0];
    expect(row).toEqual({ version: 2, approved_by: userId });
  });

  it('новый неутверждённый фрагмент возвращает опубликованную карточку на проверку', async () => {
    await q(`UPDATE artworks SET card_status = 'published' WHERE artwork_id = $1`, [artworkId]);
    await fragment({ status: 'catalogued', approved_by: userId, approved_at: new Date() });
    expect(await cardStatus()).toBe('published');
    await fragment({ text: 'Ещё один' });
    expect(await cardStatus()).toBe('needs_review');
  });

  it('публичное представление: только опубликованная карточка, утверждённые фрагменты, не ai_inferred, документы только публичные', async () => {
    const ok = await fragment({ status: 'catalogued', text: 'ok', approved_by: userId, approved_at: new Date() });
    await fragment({ status: 'from_document', text: 'публичный документ', sources: doc('public'), approved_by: userId, approved_at: new Date() });
    await fragment({ status: 'from_document', text: 'документ staff', sources: doc('staff'), approved_by: userId, approved_at: new Date() });
    await fragment({ status: 'from_document', text: 'документ без отметки', sources: doc(undefined), approved_by: userId, approved_at: new Date() });
    await fragment({ status: 'catalogued', text: 'не утверждён' });
    await fragment({ status: 'ai_inferred', text: 'вывод ИИ' });

    const visible = async () => (await q('SELECT text FROM artwork_card_public_fragments ORDER BY fragment_id')).map(r => r.text);
    expect(await visible()).toEqual([]);                 // карточка ещё не опубликована

    await q(`UPDATE artworks SET card_status = 'published' WHERE artwork_id = $1`, [artworkId]);
    expect(await visible()).toEqual(['ok', 'публичный документ']);

    await q(`UPDATE artworks SET card_status = 'archived' WHERE artwork_id = $1`, [artworkId]);
    expect(await visible()).toEqual([]);
    expect(ok.fragment_id).toBeDefined();
  });

  it('перевод ссылается на исходный фрагмент; удаление исходного не удаляет перевод; удаление произведения удаляет фрагменты', async () => {
    const ru = await fragment({ status: 'catalogued', text: 'Текст' });
    const en = (await q(
      `INSERT INTO artwork_card_fragments (artwork_id, block, language, text, status, translated_from)
       VALUES ($1, 'about_work', 'en', 'Text', 'catalogued', $2) RETURNING *`, [artworkId, ru.fragment_id]))[0];
    await q('DELETE FROM artwork_card_fragments WHERE fragment_id = $1', [ru.fragment_id]);
    expect((await q('SELECT translated_from FROM artwork_card_fragments WHERE fragment_id = $1', [en.fragment_id]))[0].translated_from).toBeNull();
    await q('DELETE FROM artworks WHERE artwork_id = $1', [artworkId]);
    expect(await q('SELECT 1 FROM artwork_card_fragments')).toHaveLength(0);
  });

  it('повторный запуск раннера миграций ничего не меняет', async () => {
    expect(await applyMigrations(pool as any, undefined, quiet)).toEqual([]);
  });
});
