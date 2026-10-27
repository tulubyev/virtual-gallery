// API карточки произведения (/api/artwork-cards) целиком: настоящая политика доступа (JWT), маршруты и PostgreSQL (миграция 006).
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

const SECRET = 'artwork_card_api_test_secret_0123456789abcdef';
process.env.JWT_SECRET = SECRET;

import { accessControl } from '../../middleware/accessPolicy';
import artworkCardsRouter from '../../routes/artworkCards';

describeDb('API карточки произведения (PostgreSQL)', () => {
  let pool: Pool;
  let schema: string;
  let app: express.Application;
  let staff: number, curator: number, plain: number;
  let artworkId: number;

  const token = (id: number) => `Bearer ${jwt.sign({ userId: id }, SECRET, { expiresIn: '1h' })}`;
  const as = (id: number | null) => (id === null ? {} : { Authorization: token(id) });
  const api = {
    get: (path: string, who: number | null) => request(app).get(`/api/artwork-cards${path}`).set(as(who)),
    post: (path: string, body: object, who: number | null) => request(app).post(`/api/artwork-cards${path}`).set(as(who)).send(body),
    put: (path: string, body: object, who: number | null) => request(app).put(`/api/artwork-cards${path}`).set(as(who)).send(body),
    patch: (path: string, body: object, who: number | null) => request(app).patch(`/api/artwork-cards${path}`).set(as(who)).send(body),
    del: (path: string, who: number | null) => request(app).delete(`/api/artwork-cards${path}`).set(as(who)),
  };
  const q = async (sql: string, params: any[] = []) => (await pool.query(sql, params)).rows;
  const cardStatus = async () => (await q('SELECT card_status FROM artworks WHERE artwork_id = $1', [artworkId]))[0].card_status;

  beforeAll(async () => {
    ({ pool, schema } = await isolatedPool(6));
    mockDb.pool = pool;
    app = express();
    app.use(express.json());
    app.use('/api', accessControl);
    app.use('/api/artwork-cards', artworkCardsRouter);
    jest.spyOn(console, 'error').mockImplementation((...a) => { if (process.env.DEBUG_CARDS) process.stderr.write(a.join(' ') + '\n'); });
  });
  afterAll(async () => { await pool.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`).catch(() => undefined); await pool.end(); });

  beforeEach(async () => {
    await pool.query(`DROP SCHEMA "${schema}" CASCADE; CREATE SCHEMA "${schema}";`);
    await pool.query(`
      CREATE TABLE users (user_id SERIAL PRIMARY KEY, username TEXT, email TEXT, role TEXT DEFAULT 'user');
      CREATE TABLE artworks (artwork_id SERIAL PRIMARY KEY, title TEXT, artist_name TEXT, year_created INTEGER, medium TEXT, dimensions TEXT,
                             image_url TEXT, thumbnail_url TEXT, status TEXT DEFAULT 'published');`);
    await applyMigrations(pool as any, undefined, () => undefined);
    const mk = async (name: string, role: string) => (await q('INSERT INTO users (username, email, role) VALUES ($1, $2, $3) RETURNING user_id', [name, `${name}@t.io`, role]))[0].user_id;
    [staff, curator, plain] = [await mk('staff', 'staff'), await mk('curator', 'curator'), await mk('plain', 'user')];
    artworkId = (await q(
      `INSERT INTO artworks (title, artist_name, year_created, medium, dimensions, image_url, thumbnail_url)
       VALUES ('Лист', 'Неизвестный автор', 1750, 'бумага, тушь', '42 × 68', '/uploads/a.jpg', '/uploads/a_t.jpg') RETURNING artwork_id`))[0].artwork_id;
  });

  /** Карточка, доведённая до публикации: правообладатель изображения, фрагмент, утверждение куратором. */
  const publish = async (extra: { fragments?: object[] } = {}) => {
    await api.put(`/${artworkId}/passport`, { image_rights_holder: 'Галерея', title_en: 'Sheet', medium_en: 'paper, ink' }, staff);
    for (const f of extra.fragments ?? [{ block: 'about_work', language: 'ru', text: 'На листе изображён вид дворца.' }]) {
      const r = await api.post(`/${artworkId}/fragments`, f, staff);
      expect(r.status).toBe(201);
    }
    expect((await api.post(`/${artworkId}/status`, { to: 'needs_review' }, staff)).status).toBe(200);
    expect((await api.post(`/${artworkId}/status`, { to: 'approved', approve_fragments: true }, curator)).status).toBe(200);
    expect((await api.post(`/${artworkId}/status`, { to: 'published' }, curator)).status).toBe(200);
  };

  it('доступ: гость и обычный пользователь не видят черновиков; публичное чтение — только опубликованного', async () => {
    expect((await api.get(`/${artworkId}`, null)).status).toBe(401);
    expect((await api.get(`/${artworkId}`, plain)).status).toBe(403);
    expect((await api.get('/', plain)).status).toBe(403);
    expect((await api.get(`/public/${artworkId}`, null)).status).toBe(404);            // ещё draft
    expect((await api.get(`/${artworkId}`, staff)).status).toBe(200);
  });

  it('полная карточка: паспорт, фрагменты, проблемы публикации и доступные переходы по роли', async () => {
    const r = await api.get(`/${artworkId}`, staff);
    expect(r.body.card.artwork.card_status).toBe('draft');
    expect(r.body.card.allowed_transitions).toEqual(['needs_review']);
    expect(r.body.card.problems.map((p: any) => p.code)).toContain('image_rights');
    const c = await api.get(`/${artworkId}`, curator);
    expect(c.body.card.allowed_transitions.sort()).toEqual(['archived', 'needs_review']);
    expect((await api.get('/999999', staff)).status).toBe(404);
    expect((await api.get('/abc', staff)).status).toBe(404);
  });

  it('паспорт: проверка значений; неизвестные и основные поля не принимаются', async () => {
    expect((await api.put(`/${artworkId}/passport`, { title: 'Взлом' }, staff)).status).toBe(400);
    expect((await api.put(`/${artworkId}/passport`, { year_from: 1757, year_to: 1750 }, staff)).status).toBe(400);
    expect((await api.put(`/${artworkId}/passport`, { dating_certainty: 'maybe' }, staff)).status).toBe(400);
    const r = await api.put(`/${artworkId}/passport`, { inventory_number: 'Р-1308', year_from: 1750, year_to: 1757, dating_certainty: 'approx' }, staff);
    expect(r.status).toBe(200);
    expect(r.body.artwork).toMatchObject({ inventory_number: 'Р-1308', year_from: 1750, year_to: 1757, dating_certainty: 'approx' });
    expect((await q('SELECT title FROM artworks WHERE artwork_id = $1', [artworkId]))[0].title).toBe('Лист');
  });

  it('фрагменты: создание получает источник «куратор»; суждения о подлинности и цене отклоняются; from_document вручную нельзя', async () => {
    const ok = await api.post(`/${artworkId}/fragments`, { block: 'about_work', language: 'ru', text: 'Сюжет — вид дворца.' }, staff);
    expect(ok.status).toBe(201);
    expect(ok.body.fragment.sources).toEqual([{ kind: 'curator', id: staff }]);
    expect(ok.body.fragment.approved_at).toBeNull();

    const judged = await api.post(`/${artworkId}/fragments`, { block: 'about_work', language: 'ru', text: 'Рисунок подлинный, цена 100 000 руб.' }, staff);
    expect(judged.status).toBe(422);
    expect(judged.body.violations.map((v: any) => v.code)).toEqual(expect.arrayContaining(['authenticity', 'amount']));

    // в провенансе суммы допустимы
    expect((await api.post(`/${artworkId}/fragments`, { block: 'provenance', language: 'ru', text: 'Куплено в 1919 за 300 руб.' }, staff)).status).toBe(201);

    const doc = await api.post(`/${artworkId}/fragments`, { block: 'about_work', language: 'ru', text: 'Из документа', status: 'from_document' }, staff);
    expect(doc.status).toBe(400);
    expect((await api.post(`/${artworkId}/fragments`, { block: 'about_work', language: 'ru', text: '' }, staff)).status).toBe(400);
    expect((await api.post('/999999/fragments', { block: 'about_work', language: 'ru', text: 'x' }, staff)).status).toBe(404);
  });

  it('правка: версия растёт, утверждение снимается; фрагмент из документа не правится', async () => {
    const f = (await api.post(`/${artworkId}/fragments`, { block: 'about_work', language: 'ru', text: 'Первый вариант' }, staff)).body.fragment;
    expect((await api.post(`/${artworkId}/fragments/${f.fragment_id}/approve`, {}, curator)).status).toBe(200);
    const edit = await api.patch(`/${artworkId}/fragments/${f.fragment_id}`, { text: 'Второй вариант' }, staff);
    expect(edit.status).toBe(200);
    expect(edit.body.fragment).toMatchObject({ text: 'Второй вариант', version: 2, approved_at: null });
    expect((await q('SELECT count(*)::int AS n FROM artwork_card_fragment_history WHERE fragment_id = $1', [f.fragment_id]))[0].n).toBe(1);
    expect((await api.patch(`/${artworkId}/fragments/${f.fragment_id}`, {}, staff)).status).toBe(400);
    expect((await api.patch(`/${artworkId}/fragments/${f.fragment_id}`, { text: 'Работа подлинная' }, staff)).status).toBe(422);

    // фрагмент, созданный конвейером из документа, вручную не правится
    const generated = (await q(
      `INSERT INTO artwork_card_fragments (artwork_id, block, language, text, status, sources)
       VALUES ($1, 'about_work', 'ru', 'Из документа', 'from_document', $2::jsonb) RETURNING fragment_id`,
      [artworkId, JSON.stringify([{ kind: 'document', id: 'd1', quote: 'цитата', access: 'public' }])]))[0];
    const blocked = await api.patch(`/${artworkId}/fragments/${generated.fragment_id}`, { text: 'Правка' }, staff);
    expect(blocked.status).toBe(409);
    expect((await api.patch(`/${artworkId}/fragments/${generated.fragment_id}`, { confidence: 'uncertain' }, staff)).status).toBe(200);
  });

  it('утверждение фрагмента: только куратор; вывод ИИ без источника утвердить нельзя; удаляет тоже куратор', async () => {
    const f = (await api.post(`/${artworkId}/fragments`, { block: 'about_work', language: 'ru', text: 'Описание' }, staff)).body.fragment;
    expect((await api.post(`/${artworkId}/fragments/${f.fragment_id}/approve`, {}, staff)).status).toBe(403);
    const ok = await api.post(`/${artworkId}/fragments/${f.fragment_id}/approve`, {}, curator);
    expect(ok.status).toBe(200);
    expect(ok.body.fragment.approved_by).toBe(curator);

    const ai = (await api.post(`/${artworkId}/fragments`, { block: 'about_work', language: 'ru', text: 'Возможно, это дворец', status: 'ai_inferred' }, staff)).body.fragment;
    expect((await api.post(`/${artworkId}/fragments/${ai.fragment_id}/approve`, {}, curator)).status).toBe(409);

    expect((await api.del(`/${artworkId}/fragments/${ai.fragment_id}`, staff)).status).toBe(403);
    expect((await api.del(`/${artworkId}/fragments/${ai.fragment_id}`, curator)).status).toBe(200);
    expect((await api.del(`/${artworkId}/fragments/${ai.fragment_id}`, curator)).status).toBe(404);
  });

  it('жизненный цикл: недопустимый переход 409, роль 403, неготовая карточка 422 с перечнем проблем', async () => {
    expect((await api.post(`/${artworkId}/status`, { to: 'published' }, curator)).status).toBe(409);        // draft → published нельзя
    expect((await api.post(`/${artworkId}/status`, { to: 'nonsense' }, curator)).status).toBe(400);
    expect((await api.post(`/${artworkId}/status`, { to: 'needs_review' }, staff)).status).toBe(200);
    expect((await api.post(`/${artworkId}/status`, { to: 'approved' }, staff)).status).toBe(403);           // сотрудник утверждать не может

    const notReady = await api.post(`/${artworkId}/status`, { to: 'approved' }, curator);                    // нет правообладателя изображения
    expect(notReady.status).toBe(422);
    expect(notReady.body.problems.map((p: any) => p.code)).toContain('image_rights');
    expect(await cardStatus()).toBe('needs_review');

    await api.put(`/${artworkId}/passport`, { image_rights_holder: 'Галерея' }, staff);
    await api.post(`/${artworkId}/fragments`, { block: 'about_work', language: 'ru', text: 'Описание' }, staff);
    const pending = await api.post(`/${artworkId}/status`, { to: 'approved' }, curator);                     // фрагмент не утверждён
    expect(pending.status).toBe(422);
    expect(pending.body.problems.map((p: any) => p.code)).toContain('fragment_not_approved');
    const approved = await api.post(`/${artworkId}/status`, { to: 'approved', approve_fragments: true }, curator);
    expect(approved.status).toBe(200);
    expect(approved.body.artwork).toMatchObject({ card_status: 'approved', card_reviewed_by: curator });
  });

  it('вывод ИИ без источника блокирует утверждение, пока его не удалят', async () => {
    await api.put(`/${artworkId}/passport`, { image_rights_holder: 'Галерея' }, staff);
    const ai = (await api.post(`/${artworkId}/fragments`, { block: 'about_work', language: 'ru', text: 'Предположение', status: 'ai_inferred' }, staff)).body.fragment;
    await api.post(`/${artworkId}/status`, { to: 'needs_review' }, staff);
    const blocked = await api.post(`/${artworkId}/status`, { to: 'approved', approve_fragments: true }, curator);
    expect(blocked.status).toBe(422);
    expect(blocked.body.problems.map((p: any) => p.code)).toContain('fragment_ai_inferred');
    await api.del(`/${artworkId}/fragments/${ai.fragment_id}`, curator);
    expect((await api.post(`/${artworkId}/status`, { to: 'approved' }, curator)).status).toBe(200);
  });

  it('публичная карточка: язык, источники без цитат и id, внутренние документы скрыты, изображение только с правообладателем', async () => {
    await publish({ fragments: [
      { block: 'about_work', language: 'ru', text: 'Описание на русском', sources: [{ kind: 'external', title: 'Каталог выставки', url: 'https://example.org/c', license: 'CC BY' }] },
      { block: 'about_work', language: 'en', text: 'Description in English' },
      { block: 'provenance', language: 'ru', text: 'Поступило в 1919 в дар.', confidence: 'uncertain' },
    ] });
    // фрагмент по внутреннему документу утверждён, но посетителям не показывается
    await q(`INSERT INTO artwork_card_fragments (artwork_id, block, language, text, status, sources, approved_by, approved_at)
             VALUES ($1, 'about_artist', 'ru', 'Из внутреннего документа', 'from_document', $2::jsonb, $3, now())`,
      [artworkId, JSON.stringify([{ kind: 'document', id: 'secret-1', quote: 'секретная цитата', access: 'staff' }]), curator]);
    // служебная вставка выше вернула карточку на проверку (новый фрагмент без утверждения не вставлялся, но состояние проверим явно)
    await q(`UPDATE artworks SET card_status = 'published' WHERE artwork_id = $1`, [artworkId]);

    const ru = await api.get(`/public/${artworkId}`, null);
    expect(ru.status).toBe(200);
    expect(ru.body.passport).toMatchObject({ title: 'Лист', artist: 'Неизвестный автор', medium: 'бумага, тушь', dimensions: '42 × 68' });
    expect(ru.body.image).toMatchObject({ url: '/uploads/a.jpg', rights_holder: 'Галерея' });
    expect(Object.keys(ru.body.blocks).sort()).toEqual(['about_work', 'provenance']);
    expect(ru.body.blocks.provenance[0]).toMatchObject({ confidence: 'uncertain', origin: 'catalogued' });
    expect(ru.body.notes.has_uncertain_fragments).toBe(true);
    const text = JSON.stringify(ru.body);
    expect(text).not.toContain('secret-1');
    expect(text).not.toContain('секретная цитата');
    expect(text).not.toContain('Из внутреннего документа');
    expect(ru.body.bibliography).toEqual(expect.arrayContaining([
      { kind: 'external', title: 'Каталог выставки', page: null, url: 'https://example.org/c', license: 'CC BY' },
      { kind: 'collection', title: 'Собрание галереи' },
    ]));

    const en = await api.get(`/public/${artworkId}?lang=en`, null);
    expect(en.body.passport).toMatchObject({ title: 'Sheet', medium: 'paper, ink', artist: 'Неизвестный автор' });
    expect(en.body.blocks.about_work).toEqual([{ text: 'Description in English', confidence: 'established', origin: 'catalogued' }]);
    expect(en.body.translation.fallback_fields).toEqual([]);
    expect((await api.get(`/public/${artworkId}?lang=de`, null)).status).toBe(400);

    await q('UPDATE artworks SET image_rights_holder = NULL WHERE artwork_id = $1', [artworkId]);
    expect((await api.get(`/public/${artworkId}`, null)).body.image).toBeNull();
  });

  it('правка опубликованной карточки возвращает её на проверку и скрывает от посетителей', async () => {
    await publish();
    expect((await api.get(`/public/${artworkId}`, null)).status).toBe(200);
    await api.put(`/${artworkId}/passport`, { inventory_number: 'Р-1' }, staff);
    expect(await cardStatus()).toBe('needs_review');
    expect((await api.get(`/public/${artworkId}`, null)).status).toBe(404);
  });

  it('очередь карточек для куратора: фильтр по статусу, число непроверенных', async () => {
    await api.post(`/${artworkId}/fragments`, { block: 'about_work', language: 'ru', text: 'Один' }, staff);
    await api.post(`/${artworkId}/status`, { to: 'needs_review' }, staff);
    const queue = await api.get('?status=needs_review', curator);
    expect(queue.status).toBe(200);
    expect(queue.body.cards).toEqual([expect.objectContaining({ artwork_id: artworkId, card_status: 'needs_review', fragments: 1, pending: 1, ai_inferred: 0 })]);
    expect((await api.get('?status=published', curator)).body.cards).toEqual([]);
    expect((await api.get('?status=zzz', curator)).status).toBe(400);
  });
});
