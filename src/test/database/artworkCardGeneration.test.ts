// Генерация черновика карточки по документам и перевод ru → en: маршруты, настоящая политика доступа и PostgreSQL (миграция 006).
// Ядро ИИ подменено: проверяется то, что делает Express с его ответом (запись неутверждёнными, защита от повторов, суждения, права).
import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import type { Pool } from 'pg';
import { applyMigrations } from '../../database/migrator';
import { describeDb, isolatedPool } from './biddingHarness';

const mockDb: { pool: any } = { pool: null };
jest.mock('../../config/database', () => ({
  __esModule: true,
  default: { query: (...args: any[]) => mockDb.pool.query(...args), connect: () => mockDb.pool.connect() },
}));

const mockCore = jest.fn();
jest.mock('../../services/aiCore', () => {
  class AiCoreUnavailable extends Error {}
  return { __esModule: true, AiCoreUnavailable, callAiCore: (...args: any[]) => mockCore(...args) };
});

const SECRET = 'artwork_card_generation_test_secret_0123456789';
process.env.JWT_SECRET = SECRET;

import { AiCoreUnavailable } from '../../services/aiCore';
import { accessControl } from '../../middleware/accessPolicy';
import artworkCardsRouter from '../../routes/artworkCards';

const fragment = (over: Record<string, any> = {}) => ({
  block: 'about_work', text: 'Лист написан в 1750 году.', confidence: 'established', quote: 'написан в 1750 году',
  source: { document_id: 'doc-1', title: 'Каталог', page: 7, license: null, access: 'public' }, ...over,
});
const draftReply = (fragments: object[], extra: object = {}) => ({
  status: 200,
  data: { outcome: 'drafted', fragments, rejected: [], missing: [], warnings: [], sources_considered: 3, model: 'test/model', prompt_version: 'card-draft-1', ...extra },
});

describeDb('Генерация черновика и перевод карточки (PostgreSQL)', () => {
  let pool: Pool;
  let schema: string;
  let app: express.Application;
  let staff: number, curator: number, plain: number;
  let artworkId: number;

  const token = (id: number) => `Bearer ${jwt.sign({ userId: id }, SECRET, { expiresIn: '1h' })}`;
  const as = (id: number | null) => (id === null ? {} : { Authorization: token(id) });
  const post = (path: string, body: object, who: number | null) => request(app).post(`/api/artwork-cards${path}`).set(as(who)).send(body);
  const q = async (sql: string, params: any[] = []) => (await pool.query(sql, params)).rows;
  const fragments = (language = 'ru') => q('SELECT * FROM artwork_card_fragments WHERE artwork_id = $1 AND language = $2 ORDER BY fragment_id', [artworkId, language]);
  const cardStatus = async () => (await q('SELECT card_status FROM artworks WHERE artwork_id = $1', [artworkId]))[0].card_status;

  beforeAll(async () => {
    ({ pool, schema } = await isolatedPool(7));
    mockDb.pool = pool;
    app = express();
    app.use(express.json());
    app.use('/api', accessControl);
    app.use('/api/artwork-cards', artworkCardsRouter);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });
  afterAll(async () => { await pool.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`).catch(() => undefined); await pool.end(); });

  beforeEach(async () => {
    mockCore.mockReset();
    await pool.query(`DROP SCHEMA "${schema}" CASCADE; CREATE SCHEMA "${schema}";`);
    await pool.query(`
      CREATE TABLE users (user_id SERIAL PRIMARY KEY, username TEXT, email TEXT, role TEXT DEFAULT 'user');
      CREATE TABLE artworks (artwork_id SERIAL PRIMARY KEY, title TEXT, artist_name TEXT, year_created INTEGER, medium TEXT, dimensions TEXT,
                             image_url TEXT, thumbnail_url TEXT, status TEXT DEFAULT 'published');`);
    await applyMigrations(pool as any, undefined, () => undefined);
    const mk = async (name: string, role: string) => (await q('INSERT INTO users (username, email, role) VALUES ($1, $2, $3) RETURNING user_id', [name, `${name}@t.io`, role]))[0].user_id;
    [staff, curator, plain] = [await mk('staff', 'staff'), await mk('curator', 'curator'), await mk('plain', 'user')];
    artworkId = (await q(
      `INSERT INTO artworks (title, artist_name, year_created, medium, dimensions) VALUES ('Лист', 'Неизвестный автор', 1750, 'бумага', '42 × 68') RETURNING artwork_id`))[0].artwork_id;
  });

  describe('черновик', () => {
    it('доступ: гость и обычный пользователь не запускают генерацию', async () => {
      expect((await post(`/${artworkId}/generate`, {}, null)).status).toBe(401);
      expect((await post(`/${artworkId}/generate`, {}, plain)).status).toBe(403);
      expect(mockCore).not.toHaveBeenCalled();
    });

    it('сохраняет фрагменты from_document неутверждёнными с источником, моделью и автором запроса', async () => {
      mockCore.mockResolvedValue(draftReply([
        fragment(),
        fragment({ block: 'exhibitions', text: 'Показан в 1750 году.', quote: 'показан в 1750', confidence: 'uncertain', source: { document_id: 'doc-2', title: 'Очерк', page: null, license: 'CC0', access: 'staff' } }),
      ], { missing: ['provenance'], warnings: ['датировка расходится'] }));
      const r = await post(`/${artworkId}/generate`, { document_ids: ['doc-1', 'doc-2'] }, staff);
      expect(r.status).toBe(200);
      expect(r.body).toMatchObject({ outcome: 'drafted', skipped_duplicates: 0, warnings: ['датировка расходится'], model: 'test/model', sources_considered: 3 });
      expect(r.body.added).toHaveLength(2);
      expect(r.body.missing).toEqual(['provenance']);

      const [first, second] = await fragments();
      expect(first).toMatchObject({ block: 'about_work', status: 'from_document', language: 'ru', confidence: 'established', model: 'test/model', prompt_version: 'card-draft-1', created_by: staff });
      expect(first.approved_at).toBeNull();
      expect(first.sources).toEqual([{ kind: 'document', id: 'doc-1', quote: 'написан в 1750 году', title: 'Каталог', page: 7, access: 'public' }]);
      expect(second.sources[0]).toMatchObject({ id: 'doc-2', access: 'staff', license: 'CC0' });
      expect(second.confidence).toBe('uncertain');

      const [path, method, body] = mockCore.mock.calls[0];
      expect(path).toBe('/api/v1/cards/draft');
      expect(method).toBe('POST');
      expect(body).toMatchObject({ artwork: { title: 'Лист', artist_name: 'Неизвестный автор', year_created: 1750 }, document_ids: ['doc-1', 'doc-2'], access: 'staff' });
      expect(await cardStatus()).toBe('draft');
    });

    it('повторный запуск не плодит те же цитаты; позиции продолжаются', async () => {
      mockCore.mockResolvedValue(draftReply([fragment()]));
      await post(`/${artworkId}/generate`, {}, staff);
      mockCore.mockResolvedValue(draftReply([fragment(), fragment({ text: 'Другое.', quote: 'вид дворца', source: { document_id: 'doc-1', access: 'public' } })]));
      const r = await post(`/${artworkId}/generate`, {}, staff);
      expect(r.body.skipped_duplicates).toBe(1);
      expect(r.body.added).toHaveLength(1);
      const rows = await fragments();
      expect(rows.map(f => f.position)).toEqual([0, 1]);
    });

    it('Express повторно отсеивает суждения о подлинности и цене и неполные ответы ядра', async () => {
      mockCore.mockResolvedValue(draftReply([
        fragment({ text: 'Это подлинная работа 1750 года.' }),
        fragment({ block: 'tour' }),
        fragment({ quote: '' }),
        fragment({ source: undefined }),
        fragment({ text: 'Лист датирован 1750 годом.', quote: 'датирован 1750' }),
      ], { rejected: [{ block: 'about_work', text: 'Отклонено ядром', reasons: ['цитата не найдена'] }] }));
      const r = await post(`/${artworkId}/generate`, {}, staff);
      expect(r.status).toBe(200);
      expect(r.body.added).toHaveLength(1);
      expect(r.body.rejected).toHaveLength(5);
      expect(r.body.rejected.map((x: any) => x.reasons[0])).toEqual(expect.arrayContaining(['цитата не найдена', 'ответ ядра неполный']));
      expect(r.body.rejected.some((x: any) => /подлинности/.test(x.reasons[0]))).toBe(true);
      expect(await fragments()).toHaveLength(1);
    });

    it('источник без отметки доступа считается внутренним', async () => {
      mockCore.mockResolvedValue(draftReply([fragment({ source: { document_id: 'doc-9', title: 'X' } })]));
      await post(`/${artworkId}/generate`, {}, staff);
      expect((await fragments())[0].sources[0].access).toBe('staff');
    });

    it('новый фрагмент возвращает опубликованную карточку на проверку', async () => {
      await q(`UPDATE artworks SET card_status = 'published' WHERE artwork_id = $1`, [artworkId]);
      mockCore.mockResolvedValue(draftReply([fragment()]));
      expect((await post(`/${artworkId}/generate`, {}, staff)).status).toBe(200);
      expect(await cardStatus()).toBe('needs_review');
    });

    it('нет данных в документах — штатный исход без записи', async () => {
      mockCore.mockResolvedValue({ status: 200, data: { outcome: 'no_sources', fragments: [], rejected: [], missing: ['about_work', 'about_artist'], warnings: [], sources_considered: 0, model: null } });
      const r = await post(`/${artworkId}/generate`, {}, staff);
      expect(r.status).toBe(200);
      expect(r.body).toMatchObject({ outcome: 'no_sources', added: [], missing: ['about_work', 'about_artist'] });
      expect(await fragments()).toHaveLength(0);
    });

    it('ошибки: нет произведения, архив, плохой список документов, ядро недоступно или сломано', async () => {
      expect((await post('/999999/generate', {}, staff)).status).toBe(404);
      expect((await post('/abc/generate', {}, staff)).status).toBe(404);
      expect((await post(`/${artworkId}/generate`, { document_ids: ['../x'] }, staff)).status).toBe(400);
      expect((await post(`/${artworkId}/generate`, { document_ids: 'd1' }, staff)).status).toBe(400);

      mockCore.mockRejectedValue(new AiCoreUnavailable('down'));
      const down = await post(`/${artworkId}/generate`, {}, staff);
      expect(down.status).toBe(503);
      expect(down.body.error).toBe('Сервис ИИ недоступен');

      mockCore.mockResolvedValue({ status: 500, data: { detail: 'Traceback: секрет' } });
      const broken = await post(`/${artworkId}/generate`, {}, staff);
      expect(broken.status).toBe(502);
      expect(JSON.stringify(broken.body)).not.toContain('секрет');

      mockCore.mockResolvedValue({ status: 422, data: { detail: 'x' } });
      expect((await post(`/${artworkId}/generate`, {}, staff)).status).toBe(422);

      await q(`UPDATE artworks SET card_status = 'archived' WHERE artwork_id = $1`, [artworkId]);
      mockCore.mockClear();
      expect((await post(`/${artworkId}/generate`, {}, staff)).status).toBe(409);
      expect(mockCore).not.toHaveBeenCalled();
    });

    it('одновременный второй запуск для того же произведения отклоняется', async () => {
      let release: (v: any) => void = () => undefined;
      mockCore.mockReturnValueOnce(new Promise(resolve => { release = resolve; }));
      const first = post(`/${artworkId}/generate`, {}, staff).then(r => r);
      await new Promise(r => setTimeout(r, 150));
      const second = await post(`/${artworkId}/generate`, {}, curator);
      expect(second.status).toBe(409);
      release(draftReply([fragment()]));
      expect((await first).status).toBe(200);
      mockCore.mockResolvedValue(draftReply([]));
      expect((await post(`/${artworkId}/generate`, {}, staff)).status).toBe(200);          // после завершения запуск снова возможен
    });
  });

  describe('перевод', () => {
    const insert = async (text: string, over: Record<string, any> = {}) => Number((await q(
      `INSERT INTO artwork_card_fragments (artwork_id, block, position, language, text, status, confidence, sources, approved_by, approved_at)
       VALUES ($1, $2, $3, 'ru', $4, $5, $6, $7::jsonb, $8, $9) RETURNING fragment_id`,
      [artworkId, over.block ?? 'about_work', over.position ?? 0, text, over.status ?? 'catalogued', over.confidence ?? 'established',
        JSON.stringify(over.sources ?? [{ kind: 'curator', id: curator }]), over.approved === false ? null : curator, over.approved === false ? null : new Date()]))[0].fragment_id);

    it('доступ: только сотрудники', async () => {
      expect((await post(`/${artworkId}/translate`, {}, null)).status).toBe(401);
      expect((await post(`/${artworkId}/translate`, {}, plain)).status).toBe(403);
    });

    it('переводит только утверждённые публичные русские фрагменты без перевода; перевод неутверждён и связан с оригиналом', async () => {
      const ok = await insert('Лист написан в 1750 году.', { confidence: 'uncertain' });
      await insert('Не утверждён.', { approved: false, position: 1 });
      await insert('Из внутреннего документа.', { position: 2, status: 'from_document', sources: [{ kind: 'document', id: 'd', quote: 'цитата', access: 'staff' }] });
      await insert('Вывод ИИ.', { position: 3, status: 'ai_inferred', approved: false });
      mockCore.mockResolvedValue({ status: 200, data: { translations: [{ id: ok, text: 'The sheet was made in 1750.' }], rejected: [], model: 'test/bulk', prompt_version: 'card-translate-1' } });

      const r = await post(`/${artworkId}/translate`, {}, staff);
      expect(r.status).toBe(200);
      expect(r.body).toMatchObject({ nothing_to_translate: false, model: 'test/bulk' });
      expect(r.body.added).toHaveLength(1);

      const [body] = [mockCore.mock.calls[0][2]];
      expect(mockCore.mock.calls[0][0]).toBe('/api/v1/cards/translate');
      expect(body.fragments).toEqual([{ id: ok, text: 'Лист написан в 1750 году.' }]);
      expect(body.artwork).toEqual({ title: 'Лист', artist_name: 'Неизвестный автор' });

      const [en] = await fragments('en');
      expect(en).toMatchObject({ language: 'en', block: 'about_work', text: 'The sheet was made in 1750.', status: 'catalogued', confidence: 'uncertain',
        translated_from: String(ok), model: 'test/bulk', prompt_version: 'card-translate-1', created_by: staff, approved_at: null });
      expect(en.sources).toEqual([{ kind: 'curator', id: curator }]);
    });

    it('повторный перевод ничего не делает и не обращается к ядру', async () => {
      const id = await insert('Лист.');
      mockCore.mockResolvedValue({ status: 200, data: { translations: [{ id, text: 'The sheet.' }], rejected: [], model: 'm', prompt_version: 'p' } });
      await post(`/${artworkId}/translate`, {}, staff);
      mockCore.mockClear();
      const r = await post(`/${artworkId}/translate`, {}, staff);
      expect(r.body).toMatchObject({ nothing_to_translate: true, added: [] });
      expect(mockCore).not.toHaveBeenCalled();
    });

    it('перевод с суждением о цене и отказы ядра не сохраняются', async () => {
      const a = await insert('Один.');
      const b = await insert('Два.', { position: 1 });
      const c = await insert('Три.', { position: 2 });
      mockCore.mockResolvedValue({ status: 200, data: { translations: [{ id: a, text: 'It is an authentic sheet.' }, { id: b, text: 'Two.' }], rejected: [{ id: c, reasons: ['числа не совпадают'] }], model: 'm', prompt_version: 'p' } });
      const r = await post(`/${artworkId}/translate`, {}, staff);
      expect(r.body.added).toHaveLength(1);
      expect(r.body.rejected).toEqual(expect.arrayContaining([
        { fragment_id: c, reasons: ['числа не совпадают'] },
        { fragment_id: a, reasons: [expect.stringMatching(/подлинности/)] },
      ]));
      expect((await fragments('en')).map(f => f.text)).toEqual(['Two.']);
    });

    it('ошибки: нет произведения, архив, ядро недоступно', async () => {
      expect((await post('/999999/translate', {}, staff)).status).toBe(404);
      await insert('Лист.');
      mockCore.mockRejectedValue(new AiCoreUnavailable('down'));
      expect((await post(`/${artworkId}/translate`, {}, staff)).status).toBe(503);
      expect(await fragments('en')).toHaveLength(0);
      await q(`UPDATE artworks SET card_status = 'archived' WHERE artwork_id = $1`, [artworkId]);
      expect((await post(`/${artworkId}/translate`, {}, staff)).status).toBe(409);
    });
  });
});
