// src/test/middleware/accessPolicy.test.ts
import express, { Application } from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';

const SECRET = 'access_policy_test_secret_0123456789abcdef';
process.env.JWT_SECRET = SECRET;

jest.mock('../../config/database', () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));

import pool from '../../config/database';
import { accessControl, findRule } from '../../middleware/accessPolicy';

// Пользователи «в БД»: id → роль
const DB: Record<number, string> = { 1: 'admin', 2: 'curator', 3: 'staff', 4: 'user', 5: 'auction_participant', 6: 'auction_participant' };

beforeEach(() => {
  (pool.query as jest.Mock).mockImplementation(async (_sql: string, params: number[]) => {
    const role = DB[params[0]];
    return { rows: role ? [{ user_id: params[0], email: `u${params[0]}@x.io`, username: `u${params[0]}`, role }] : [] };
  });
});

const tokenFor = (userId: number, secret = SECRET, opts: jwt.SignOptions = {}) =>
  jwt.sign({ userId, role: 'admin' /* роль в токене не должна учитываться */ }, secret, { expiresIn: '1h', ...opts });

function buildApp(): Application {
  const app = express();
  app.use(express.json());
  app.use('/api', accessControl);
  app.all('/api/*', (req, res) => res.json({ ok: true, user: (req as any).user ?? null }));
  return app;
}

type Who = 'anon' | 'admin' | 'curator' | 'staff' | 'user' | 'bidder';
const TOKENS: Record<Who, string | null> = {
  anon: null, admin: tokenFor(1), curator: tokenFor(2), staff: tokenFor(3), user: tokenFor(4), bidder: tokenFor(5),
};

// [метод, путь, кто → ожидаемый статус]
const CASES: Array<[string, string, Partial<Record<Who, number>>]> = [
  // публичное чтение
  ['GET', '/api/health', { anon: 200 }],
  ['GET', '/api/public-config', { anon: 200 }],
  ['GET', '/api/artworks', { anon: 200 }],
  ['GET', '/api/artworks/42', { anon: 200 }],
  ['GET', '/api/artworks/random', { anon: 200 }],
  ['GET', '/api/collections', { anon: 200 }],
  ['GET', '/api/collections/modern-art', { anon: 200 }],
  ['GET', '/api/gallery/config', { anon: 200 }],
  ['GET', '/api/gallery/rooms/5/artworks', { anon: 200 }],
  ['GET', '/api/display-settings', { anon: 200 }],
  ['GET', '/api/auctions', { anon: 200 }],
  ['GET', '/api/auctions/7', { anon: 200 }],
  ['GET', '/api/auctions/7/lots', { anon: 200 }],
  ['POST', '/api/auth/login', { anon: 200 }],
  ['POST', '/api/auth/register', { anon: 200 }],
  ['POST', '/api/ai/rag-query', { anon: 200 }],
  // вход обязателен
  ['GET', '/api/auth/me', { anon: 401, user: 200 }],
  ['GET', '/api/unknown-endpoint', { anon: 401, user: 200 }],
  ['POST', '/api/unknown-endpoint', { anon: 401, user: 403, curator: 403, admin: 200 }],
  ['POST', '/api/ai/analyze-image', { anon: 401, user: 200 }],
  // админка: только admin
  ['GET', '/api/admin/users', { anon: 401, user: 403, curator: 403, staff: 403, admin: 200 }],
  ['PUT', '/api/admin/users/4/role', { anon: 401, user: 403, curator: 403, admin: 200 }],
  ['DELETE', '/api/admin/users/4', { anon: 401, user: 403, admin: 200 }],
  ['POST', '/api/admin/clear-uploads', { anon: 401, user: 403, staff: 403, curator: 403, admin: 200 }],
  // выбор моделей ИИ: только admin
  ['GET', '/api/admin/ai-models', { anon: 401, user: 403, staff: 403, curator: 403, admin: 200 }],
  ['GET', '/api/admin/ai-models/history', { anon: 401, user: 403, curator: 403, admin: 200 }],
  ['PUT', '/api/admin/ai-models/vision_front', { anon: 401, user: 403, staff: 403, curator: 403, admin: 200 }],
  ['DELETE', '/api/admin/ai-models/vision_front', { anon: 401, user: 403, curator: 403, admin: 200 }],
  ['POST', '/api/admin/ai-models/refresh-catalog', { anon: 401, user: 403, curator: 403, admin: 200 }],
  ['PATCH', '/api/display-settings/theme', { anon: 401, curator: 403, admin: 200 }],
  ['GET', '/api/infra/status', { anon: 401, user: 403, admin: 200 }],
  // галерея и произведения
  ['POST', '/api/gallery/config', { anon: 401, user: 403, staff: 403, curator: 200, admin: 200 }],
  ['POST', '/api/gallery/textures', { anon: 401, user: 403, curator: 200 }],
  ['POST', '/api/artworks/upload', { anon: 401, user: 403, staff: 200, curator: 200, admin: 200 }],
  ['PATCH', '/api/artworks/9', { anon: 401, user: 403, staff: 403, curator: 200 }],
  ['PATCH', '/api/artworks/9/status', { anon: 401, staff: 403, curator: 200 }],
  ['DELETE', '/api/artworks/9', { anon: 401, user: 403, staff: 403, curator: 200, admin: 200 }],
  ['POST', '/api/collections', { anon: 401, user: 403, curator: 200 }],
  ['DELETE', '/api/collections/3', { anon: 401, staff: 403, curator: 200 }],
  ['GET', '/api/archive', { anon: 401, user: 403, staff: 403, curator: 200 }],
  ['DELETE', '/api/archive', { anon: 401, curator: 200 }],
  ['GET', '/api/stats/dashboard', { anon: 401, user: 403, bidder: 403, staff: 200, curator: 200, admin: 200 }],
  ['GET', '/api/stats/overview', { anon: 401, user: 403, bidder: 403, staff: 200, curator: 200, admin: 200 }],
  ['POST', '/api/watermark/apply', { anon: 401, user: 403, staff: 200 }],
  // аукционы
  ['POST', '/api/auctions', { anon: 401, user: 403, bidder: 403, curator: 200, admin: 200 }],
  ['POST', '/api/auctions/7/lots', { anon: 401, bidder: 403, curator: 200 }],
  ['POST', '/api/auctions/bids', { anon: 401, user: 403, staff: 403, bidder: 200, admin: 200 }],
  ['GET', '/api/auctions/participant/5', { anon: 401, user: 403, bidder: 200, admin: 200 }],
  ['GET', '/api/auctions/participant/6', { bidder: 403, admin: 200 }], // чужой кабинет
];

describe('политика доступа /api', () => {
  const app = buildApp();

  for (const [method, path, expectations] of CASES) {
    for (const [who, status] of Object.entries(expectations) as [Who, number][]) {
      it(`${method} ${path} — ${who} → ${status}`, async () => {
        const req = (request(app) as any)[method.toLowerCase()](path);
        if (TOKENS[who]) req.set('Authorization', `Bearer ${TOKENS[who]}`);
        const res = await req.send();
        expect(res.status).toBe(status);
      });
    }
  }

  it('роль берётся из БД, а не из токена (в токене admin, в БД user)', async () => {
    const res = await request(app).get('/api/admin/users').set('Authorization', `Bearer ${tokenFor(4)}`);
    expect(res.status).toBe(403);
  });

  it('удалённый пользователь с валидным токеном → 401', async () => {
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${tokenFor(999)}`);
    expect(res.status).toBe(401);
  });

  it('токен, подписанный чужим секретом → 401', async () => {
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${tokenFor(1, 'another_secret_value_that_is_long_enough')}`);
    expect(res.status).toBe(401);
  });

  it('просроченный токен → 401', async () => {
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${tokenFor(1, SECRET, { expiresIn: -10 })}`);
    expect(res.status).toBe(401);
  });

  it('токен вида "none" → 401', async () => {
    const none = Buffer.from('{"alg":"none","typ":"JWT"}').toString('base64url') + '.' + Buffer.from('{"userId":1}').toString('base64url') + '.';
    const res = await request(app).get('/api/admin/users').set('Authorization', `Bearer ${none}`);
    expect(res.status).toBe(401);
  });

  it('в запрос попадает пользователь из БД', async () => {
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${TOKENS.staff}`);
    expect(res.body.user).toMatchObject({ user_id: 3, role: 'staff' });
  });

  it('ошибка БД → 500, а не доступ', async () => {
    (pool.query as jest.Mock).mockRejectedValueOnce(new Error('db down'));
    const res = await request(app).get('/api/admin/users').set('Authorization', `Bearer ${TOKENS.admin}`);
    expect(res.status).toBe(500);
  });

  it('слэш в конце пути не открывает доступ', () => {
    expect(findRule('POST', '/gallery/config/')?.access).toEqual(['admin', 'curator']);
    expect(findRule('DELETE', '/artworks/5/')?.access).toEqual(['admin', 'curator']);
  });
});
