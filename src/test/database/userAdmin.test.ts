// Управление пользователями администратором: создание, временные пароли, принудительная смена, сброс, роли и защита последнего
// администратора — настоящая политика доступа (JWT), маршруты входа и PostgreSQL (миграции 006 и 007).
import express from 'express';
import bcrypt from 'bcrypt';
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
jest.mock('../../services/s3-upload', () => ({ uploadWithKey: jest.fn(), StorageUnavailableError: class extends Error {} }));

const SECRET = 'user_admin_test_secret_0123456789abcdef0123';
process.env.JWT_SECRET = SECRET;

describeDb('Управление пользователями (PostgreSQL)', () => {
  let pool: Pool;
  let schema: string;
  let app: express.Application;
  let admin: number, staff: number;
  let userAdminService: typeof import('../../services/userAdmin');

  const ADMIN_PASSWORD = 'AdminPass123';
  const token = (id: number, extra: object = {}) => jwt.sign({ userId: id, ...extra }, SECRET, { expiresIn: '1h' });
  const bearer = (t: string | null) => (t ? { Authorization: `Bearer ${t}` } : {});
  const q = async (sql: string, params: any[] = []) => (await pool.query(sql, params)).rows;
  const users = {
    post: (path: string, body: object, t: string | null) => request(app).post(`/api/admin/users${path}`).set(bearer(t)).send(body),
    put: (path: string, body: object, t: string | null) => request(app).put(`/api/admin/users${path}`).set(bearer(t)).send(body),
    get: (path: string, t: string | null) => request(app).get(`/api/admin/users${path}`).set(bearer(t)),
    del: (path: string, t: string | null) => request(app).delete(`/api/admin/users${path}`).set(bearer(t)),
  };
  const login = (email: string, password: string) => request(app).post('/api/auth/login').send({ email, password });
  const create = async (over: object = {}) => {
    const r = await users.post('', { username: 'Анна', email: 'anna@example.ru', role: 'staff', ...over }, token(admin));
    expect(r.status).toBe(201);
    return r.body as { user: any; temporary_password: string; expires_at: string };
  };

  beforeAll(async () => {
    ({ pool, schema } = await isolatedPool(8));
    mockDb.pool = pool;
    // маршруты входа при загрузке обращаются к БД, поэтому подключаем их после того, как пул подставлен
    const { accessControl } = require('../../middleware/accessPolicy');
    const authRouter = require('../../routes/auth');
    const usersRouter = require('../../routes/users');
    userAdminService = require('../../services/userAdmin');
    app = express();
    app.use(express.json());
    app.use('/api', accessControl);
    app.use('/api/auth', authRouter);
    app.use('/api/admin/users', usersRouter);
    app.get('/api/stats/overview', (_req, res) => res.json({ ok: true }));          // пример служебной страницы сотрудников
    app.get('/api/collections', (_req, res) => res.json({ ok: true }));              // пример публичной страницы
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });
  afterAll(async () => { await pool.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`).catch(() => undefined); await pool.end(); });

  beforeEach(async () => {
    await pool.query(`DROP SCHEMA "${schema}" CASCADE; CREATE SCHEMA "${schema}";`);
    await pool.query(`
      CREATE TABLE users (user_id SERIAL PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, email VARCHAR(100) UNIQUE NOT NULL,
                          password_hash VARCHAR(255) NOT NULL, role VARCHAR(20) DEFAULT 'user', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, avatar_url TEXT);
      CREATE TABLE artworks (artwork_id SERIAL PRIMARY KEY, title TEXT, artist_name TEXT, year_created INTEGER, medium TEXT, dimensions TEXT,
                             image_url TEXT, thumbnail_url TEXT, status TEXT DEFAULT 'published');`);
    await applyMigrations(pool as any, undefined, () => undefined);
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 4);
    const mk = async (name: string, role: string) => (await q('INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id', [name, `${name}@t.io`, hash, role]))[0].user_id;
    [admin, staff] = [await mk('admin', 'admin'), await mk('staff', 'staff')];
  });

  describe('создание', () => {
    it('доступно только администратору', async () => {
      const body = { username: 'Анна', email: 'anna@example.ru', role: 'staff' };
      expect((await users.post('', body, null)).status).toBe(401);
      expect((await users.post('', body, token(staff))).status).toBe(403);
      expect(await q('SELECT 1 FROM users WHERE email = $1', ['anna@example.ru'])).toHaveLength(0);
    });

    it('без пароля выдаёт случайный временный: хранится хеш, срок 7 дней, требуется смена, в журнале пароля нет', async () => {
      const r = await create();
      expect(r.temporary_password).toMatch(/^[A-Za-z2-9]{12}$/);
      expect(r.user).toMatchObject({ username: 'Анна', email: 'anna@example.ru', role: 'staff', must_change_password: true });
      expect(r.user.password_hash).toBeUndefined();
      const days = (new Date(r.expires_at).getTime() - Date.now()) / 86_400_000;
      expect(days).toBeGreaterThan(6.9);
      expect(days).toBeLessThanOrEqual(7);

      const [row] = await q('SELECT * FROM users WHERE email = $1', ['anna@example.ru']);
      expect(row.password_hash).not.toContain(r.temporary_password);
      expect(await bcrypt.compare(r.temporary_password, row.password_hash)).toBe(true);
      expect(row.must_change_password).toBe(true);

      const log = await q('SELECT * FROM user_admin_log WHERE target_id = $1', [row.user_id]);
      expect(log).toHaveLength(1);
      expect(log[0]).toMatchObject({ action: 'create', actor_id: admin });
      expect(JSON.stringify(log[0])).not.toContain(r.temporary_password);
      expect(JSON.stringify(log[0])).not.toContain(row.password_hash);
    });

    it('пароль, заданный администратором, тоже временный; плохие значения отвергаются', async () => {
      const r = await create({ email: 'boris@example.ru', username: 'Борис', password: 'Zadan1234' });
      expect(r.temporary_password).toBe('Zadan1234');
      expect((await q('SELECT must_change_password FROM users WHERE email = $1', ['boris@example.ru']))[0].must_change_password).toBe(true);

      const bad = (over: object) => users.post('', { username: 'Вера', email: 'vera@example.ru', role: 'user', ...over }, token(admin));
      expect((await bad({ password: 'short' })).status).toBe(400);
      expect((await bad({ role: 'superuser' })).status).toBe(400);
      expect((await bad({ role: undefined })).status).toBe(400);
      expect((await bad({ email: 'vera' })).status).toBe(400);
      expect((await bad({ email: '“vera@example.ru”' })).status).toBe(400);
      expect((await bad({ username: '“Вера' })).status).toBe(400);
      expect((await bad({ username: 'В' })).status).toBe(400);
      expect(await q('SELECT 1 FROM users WHERE email = $1', ['vera@example.ru'])).toHaveLength(0);
    });

    it('повторы по e-mail и имени без учёта регистра дают 409', async () => {
      await create();
      expect((await users.post('', { username: 'Другая', email: 'ANNA@example.ru', role: 'user' }, token(admin))).body.error).toMatch(/e-mail/);
      expect((await users.post('', { username: 'АННА', email: 'other@example.ru', role: 'user' }, token(admin))).body.error).toMatch(/именем/);
      expect((await users.post('', { username: 'Другая', email: 'ANNA@example.ru', role: 'user' }, token(admin))).status).toBe(409);
    });
  });

  describe('вход с временным паролем', () => {
    it('вход проходит и сообщает о необходимости смены; доступны только профиль и смена пароля, публичные страницы открыты', async () => {
      const { temporary_password } = await create();
      const r = await login('anna@example.ru', temporary_password);
      expect(r.status).toBe(200);
      expect(r.body.must_change_password).toBe(true);
      const t = r.body.token;

      expect((await request(app).get('/api/auth/me').set(bearer(t))).body.must_change_password).toBe(true);
      const blocked = await request(app).get('/api/stats/overview').set(bearer(t));
      expect(blocked.status).toBe(403);
      expect(blocked.body.code).toBe('password_change_required');
      expect((await request(app).get('/api/collections').set(bearer(t))).status).toBe(200);
    });

    it('смена пароля: проверки, затем доступ открывается, флаг снят, выдан новый токен', async () => {
      const { temporary_password } = await create();
      const t = (await login('anna@example.ru', temporary_password)).body.token;
      const change = (body: object) => request(app).put('/api/auth/me/password').set(bearer(t)).send(body);

      expect((await change({ currentPassword: temporary_password, newPassword: 'short' })).status).toBe(400);
      expect((await change({ currentPassword: 'Неверный12345', newPassword: 'НовыйПароль123' })).status).toBe(401);
      expect((await change({ currentPassword: temporary_password, newPassword: temporary_password })).body.error).toMatch(/отличаться/);
      expect((await request(app).get('/api/stats/overview').set(bearer(t))).status).toBe(403);

      const ok = await change({ currentPassword: temporary_password, newPassword: 'НовыйПароль123' });
      expect(ok.status).toBe(200);
      expect(ok.body).toMatchObject({ success: true, must_change_password: false });
      const [row] = await q('SELECT must_change_password, temp_password_expires_at, password_changed_at FROM users WHERE email = $1', ['anna@example.ru']);
      expect(row.must_change_password).toBe(false);
      expect(row.temp_password_expires_at).toBeNull();
      expect(row.password_changed_at).not.toBeNull();

      expect((await request(app).get('/api/stats/overview').set(bearer(ok.body.token))).status).toBe(200);     // новый токен действует сразу
      expect((await login('anna@example.ru', temporary_password)).status).toBe(401);
      const again = await login('anna@example.ru', 'НовыйПароль123');
      expect(again.status).toBe(200);
      expect(again.body.must_change_password).toBe(false);
    });

    it('просроченный временный пароль не принимается, понятное сообщение', async () => {
      const { temporary_password } = await create();
      await q(`UPDATE users SET temp_password_expires_at = now() - interval '1 minute' WHERE email = 'anna@example.ru'`);
      const r = await login('anna@example.ru', temporary_password);
      expect(r.status).toBe(401);
      expect(r.body.code).toBe('temp_password_expired');
      // обычная смена пароля после сброса администратором возвращает вход
      await users.post(`/${(await q(`SELECT user_id FROM users WHERE email = 'anna@example.ru'`))[0].user_id}/reset-password`, {}, token(admin));
    });

    it('обычный пользователь без временного пароля входит как раньше и меняет пароль от 6 знаков', async () => {
      const r = await login('staff@t.io', ADMIN_PASSWORD);
      expect(r.status).toBe(200);
      expect(r.body.must_change_password).toBe(false);
      const change = await request(app).put('/api/auth/me/password').set(bearer(r.body.token)).send({ currentPassword: ADMIN_PASSWORD, newPassword: 'abcdef' });
      expect(change.status).toBe(200);
    });
  });

  describe('сброс пароля', () => {
    it('новый временный пароль закрывает прежние сессии и старый пароль', async () => {
      const staffToken = token(staff, { iat: Math.floor(Date.now() / 1000) - 60 });
      expect((await request(app).get('/api/stats/overview').set(bearer(staffToken))).status).toBe(200);

      const r = await users.post(`/${staff}/reset-password`, {}, token(admin));
      expect(r.status).toBe(200);
      expect(r.body.temporary_password).toMatch(/^[A-Za-z2-9]{12}$/);
      expect(r.body.user.must_change_password).toBe(true);

      expect((await request(app).get('/api/stats/overview').set(bearer(staffToken))).status).toBe(401);       // прежняя сессия закрыта
      expect((await request(app).post('/api/auth/refresh').set(bearer(staffToken))).status).toBe(401);
      expect((await request(app).get('/api/auth/verify').set(bearer(staffToken))).status).toBe(401);
      expect((await login('staff@t.io', ADMIN_PASSWORD)).status).toBe(401);
      const fresh = await login('staff@t.io', r.body.temporary_password);
      expect(fresh.status).toBe(200);
      expect(fresh.body.must_change_password).toBe(true);
      expect((await q('SELECT count(*)::int AS n FROM user_admin_log WHERE target_id = $1 AND action = $2', [staff, 'reset_password']))[0].n).toBe(1);
    });

    it('права и границы: только администратор, не себе, несуществующему — 404, свой пароль не пропадает', async () => {
      expect((await users.post(`/${staff}/reset-password`, {}, token(staff))).status).toBe(403);
      expect((await users.post(`/${admin}/reset-password`, {}, token(admin))).status).toBe(400);
      expect((await users.post('/999999/reset-password', {}, token(admin))).status).toBe(404);
      expect((await users.post('/abc/reset-password', {}, token(admin))).status).toBe(404);
      expect((await users.post(`/${staff}/reset-password`, { password: 'коротк' }, token(admin))).status).toBe(400);
      expect((await login('admin@t.io', ADMIN_PASSWORD)).status).toBe(200);
    });

    it('пароль можно задать вручную', async () => {
      const r = await users.post(`/${staff}/reset-password`, { password: 'Vruchnuyu77' }, token(admin));
      expect(r.body.temporary_password).toBe('Vruchnuyu77');
      expect((await login('staff@t.io', 'Vruchnuyu77')).status).toBe(200);
    });
  });

  describe('роли и удаление', () => {
    it('роль меняется; плохая роль и своя роль — нет', async () => {
      const ok = await users.put(`/${staff}/role`, { role: 'curator' }, token(admin));
      expect(ok.status).toBe(200);
      expect(ok.body.user.role).toBe('curator');
      expect((await users.put(`/${staff}/role`, { role: 'root' }, token(admin))).status).toBe(400);
      expect((await users.put(`/${admin}/role`, { role: 'user' }, token(admin))).status).toBe(400);
      expect((await users.put(`/${staff}/role`, { role: 'user' }, token(staff))).status).toBe(403);
      expect((await q('SELECT role FROM users WHERE user_id = $1', [admin]))[0].role).toBe('admin');
      expect((await q(`SELECT action FROM user_admin_log WHERE target_id = $1`, [staff]))[0].action).toBe('role');
    });

    it('правка имени и почты проходит проверки и не допускает повторов', async () => {
      expect((await users.put(`/${staff}`, { email: 'new@example.ru', username: 'Новый' }, token(admin))).status).toBe(200);
      expect((await users.put(`/${staff}`, { email: '“x@y.ru”' }, token(admin))).status).toBe(400);
      expect((await users.put(`/${staff}`, { username: 'admin' }, token(admin))).status).toBe(409);
      expect((await users.put(`/${staff}`, {}, token(admin))).status).toBe(400);
      expect((await users.put('/999999', { username: 'Кто-то' }, token(admin))).status).toBe(404);
    });

    it('последнего администратора нельзя ни понизить, ни удалить (гонка двух администраторов)', async () => {
      const second = (await q(`INSERT INTO users (username, email, password_hash, role) VALUES ('admin2', 'admin2@t.io', 'x', 'admin') RETURNING user_id`))[0].user_id;
      // первый уже понизил второго; второй, чей запрос был принят раньше, пытается понизить и удалить первого
      expect((await users.put(`/${second}/role`, { role: 'user' }, token(admin))).status).toBe(200);
      const demote = await userAdminService.updateUser({ user_id: second }, admin, { role: 'user' });
      expect(demote).toMatchObject({ ok: false, status: 409, code: 'last_admin' });
      const remove = await userAdminService.deleteUser({ user_id: second }, admin);
      expect(remove).toMatchObject({ ok: false, status: 409, code: 'last_admin' });
      expect((await q('SELECT role FROM users WHERE user_id = $1', [admin]))[0].role).toBe('admin');
    });

    it('удаление: себя нельзя, обычного можно, нет такого — 404', async () => {
      expect((await users.del(`/${admin}`, token(admin))).status).toBe(400);
      expect((await users.del(`/${staff}`, token(staff))).status).toBe(403);
      expect((await users.del(`/${staff}`, token(admin))).status).toBe(200);
      expect((await users.del(`/${staff}`, token(admin))).status).toBe(404);
      expect((await q(`SELECT action FROM user_admin_log WHERE target_id = $1`, [staff]))[0].action).toBe('delete');
    });

    it('удаление пользователя со связанными данными отклоняется и ничего не теряет', async () => {
      await q('CREATE TABLE notes (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(user_id))');
      await q('INSERT INTO notes (user_id) VALUES ($1)', [staff]);
      const r = await users.del(`/${staff}`, token(admin));
      expect(r.status).toBe(409);
      expect(r.body.code).toBe('has_data');
      expect(await q('SELECT 1 FROM users WHERE user_id = $1', [staff])).toHaveLength(1);
    });
  });

  describe('список и журнал', () => {
    it('список показывает, кто ждёт смены пароля; журнал — только администратору', async () => {
      await create();
      const list = await users.get('', token(admin));
      expect(list.status).toBe(200);
      const anna = list.body.users.find((u: any) => u.email === 'anna@example.ru');
      expect(anna).toMatchObject({ must_change_password: true });
      expect(anna.temp_password_expires_at).toBeTruthy();
      expect(anna.password_hash).toBeUndefined();
      expect((await users.get('', token(staff))).status).toBe(403);

      const log = await users.get(`/${anna.user_id}/log`, token(admin));
      expect(log.status).toBe(200);
      expect(log.body.log[0]).toMatchObject({ action: 'create', actor_id: admin });
      expect((await users.get(`/${anna.user_id}/log`, token(staff))).status).toBe(403);
    });
  });

  describe('регистрация и профиль', () => {
    it('кавычки в логине и почте не принимаются; обычная регистрация работает', async () => {
      const reg = (body: object) => request(app).post('/api/auth/register').send({ password: 'secret12', ...body });
      expect((await reg({ username: '“tulubyev', email: 'ok@example.ru' })).status).toBe(400);
      expect((await reg({ username: 'tulubyev', email: '“ok@example.ru”' })).status).toBe(400);
      expect((await reg({ username: 'tulubyev', email: 'no-at' })).status).toBe(400);
      const ok = await reg({ username: 'tulubyev', email: 'ok@example.ru' });
      expect(ok.status).toBe(201);
      expect(ok.body.role).toBe('user');
      expect((await reg({ username: 'TULUBYEV', email: 'another@example.ru' })).status).toBe(409);
      expect((await reg({ username: 'other', email: 'OK@example.ru' })).status).toBe(409);
    });
  });

  describe('до применения миграции 007', () => {
    it('вход, проверка прав и список работают без новых столбцов', async () => {
      await q('ALTER TABLE users DROP COLUMN must_change_password, DROP COLUMN temp_password_expires_at, DROP COLUMN password_changed_at');
      const r = await login('admin@t.io', ADMIN_PASSWORD);
      expect(r.status).toBe(200);
      expect(r.body.must_change_password).toBe(false);
      expect((await users.get('', r.body.token)).status).toBe(200);
      expect((await request(app).get('/api/auth/verify').set(bearer(r.body.token))).body.valid).toBe(true);
      const created = await users.post('', { username: 'Анна', email: 'anna@example.ru', role: 'staff' }, r.body.token);
      expect(created.status).toBe(503);
      expect(created.body.error).toMatch(/миграци/);
    });
  });
});
