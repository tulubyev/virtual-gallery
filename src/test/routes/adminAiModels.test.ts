import express from 'express';
import request from 'supertest';

const adminRouter = require('../../routes/admin');

const ENV = { ...process.env };

function appAs(user: object = { email: 'root@virtgal.ru', username: 'root', role: 'admin' }) {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { (req as any).user = user; next(); });
  app.use('/api/admin', adminRouter);
  return app;
}

function coreReplies(status: number, data: any) {
  return jest.fn(async () => ({
    status,
    headers: { get: () => 'application/json' },
    json: async () => data,
  }));
}

beforeEach(() => {
  process.env.AI_CORE_URL = 'http://core.test:8001';
  process.env.INTERNAL_API_TOKEN = 'internal-token-for-tests-123456';
});
afterEach(() => {
  process.env = { ...ENV };
  jest.restoreAllMocks();
});

describe('/api/admin/ai-models', () => {
  it('GET передаёт запрос ядру с внутренним токеном и именем администратора', async () => {
    const fetchMock = coreReplies(200, { tasks: [], catalog: [] });
    (global as any).fetch = fetchMock;
    const res = await request(appAs()).get('/api/admin/ai-models?mode=ru-only');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ tasks: [], catalog: [] });
    const [url, init] = fetchMock.mock.calls[0] as any[];
    expect(url).toBe('http://core.test:8001/api/v1/model-settings?mode=ru-only');
    expect(init.headers['X-Internal-Token']).toBe('internal-token-for-tests-123456');
    expect(init.headers['X-Actor']).toBe('root@virtgal.ru');
  });

  it('режим по умолчанию — global, неизвестный режим отклоняется до обращения к ядру', async () => {
    const fetchMock = coreReplies(200, {});
    (global as any).fetch = fetchMock;
    await request(appAs()).get('/api/admin/ai-models');
    expect((fetchMock.mock.calls[0] as any[])[0]).toContain('mode=global');
    fetchMock.mockClear();
    expect((await request(appAs()).get('/api/admin/ai-models?mode=evil')).status).toBe(400);
    expect((await request(appAs()).delete('/api/admin/ai-models/chat?mode=evil')).status).toBe(400);
    expect((await request(appAs()).post('/api/admin/ai-models/refresh-catalog?mode=x')).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('PUT пересылает модель и режим; ошибки проверки ядра приходят как { error }', async () => {
    const fetchMock = coreReplies(200, { warnings: ['осторожно'] });
    (global as any).fetch = fetchMock;
    const ok = await request(appAs()).put('/api/admin/ai-models/vision_front').send({ model: 'google/gemini-3.8-flash', mode: 'global', junk: 1 });
    expect(ok.status).toBe(200);
    const [url, init] = fetchMock.mock.calls[0] as any[];
    expect(url).toBe('http://core.test:8001/api/v1/model-settings/vision_front');
    expect(init.method).toBe('PUT');
    expect(JSON.parse(init.body)).toEqual({ model: 'google/gemini-3.8-flash', mode: 'global' }); // лишние поля не уходят

    (global as any).fetch = coreReplies(422, { detail: 'Модель не принимает изображения, а задача требует их' });
    const bad = await request(appAs()).put('/api/admin/ai-models/vision_front').send({ model: 'sber/gigachat-3-pro' });
    expect(bad.status).toBe(422);
    expect(bad.body).toEqual({ error: 'Модель не принимает изображения, а задача требует их' });
  });

  it('PUT проверяет ввод и не ходит в ядро с мусором', async () => {
    const fetchMock = coreReplies(200, {});
    (global as any).fetch = fetchMock;
    const app = appAs();
    expect((await request(app).put('/api/admin/ai-models/vision_front').send({})).status).toBe(400);
    expect((await request(app).put('/api/admin/ai-models/vision_front').send({ model: 123 })).status).toBe(400);
    expect((await request(app).put('/api/admin/ai-models/vision_front').send({ model: 'x'.repeat(200) })).status).toBe(400);
    expect((await request(app).put('/api/admin/ai-models/vision_front').send({ model: 'a/b-c', mode: 'bogus' })).status).toBe(400);
    expect((await request(app).put('/api/admin/ai-models/..%2Fsecret').send({ model: 'a/b-c' })).status).toBe(400);
    expect((await request(app).put('/api/admin/ai-models/Chat1').send({ model: 'a/b-c' })).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('DELETE сбрасывает выбор для режима', async () => {
    const fetchMock = coreReplies(200, { tasks: [] });
    (global as any).fetch = fetchMock;
    const res = await request(appAs()).delete('/api/admin/ai-models/chat?mode=ru-only');
    expect(res.status).toBe(200);
    const [url, init] = fetchMock.mock.calls[0] as any[];
    expect(url).toBe('http://core.test:8001/api/v1/model-settings/chat?mode=ru-only');
    expect(init.method).toBe('DELETE');
  });

  it('история и обновление цен идут в ядро; limit ограничен', async () => {
    const fetchMock = coreReplies(200, { items: [] });
    (global as any).fetch = fetchMock;
    await request(appAs()).get('/api/admin/ai-models/history?limit=99999');
    await request(appAs()).get('/api/admin/ai-models/history?limit=abc');
    await request(appAs()).post('/api/admin/ai-models/refresh-catalog');
    const urls = fetchMock.mock.calls.map((c: any[]) => c[0]);
    expect(urls[0]).toContain('history?limit=200');
    expect(urls[1]).toContain('history?limit=50');
    expect(urls[2]).toBe('http://core.test:8001/api/v1/model-settings/refresh-catalog?mode=global');
  });

  it('отказ ядра по токену — 502 с подсказкой о настройке, без деталей', async () => {
    (global as any).fetch = coreReplies(401, { detail: 'Invalid internal token' });
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const res = await request(appAs()).get('/api/admin/ai-models');
    expect(res.status).toBe(502);
    expect(res.body.error).toContain('INTERNAL_API_TOKEN');
    expect(JSON.stringify(res.body)).not.toContain('Invalid internal token');
    spy.mockRestore();
  });

  it('ошибка ядра 500 → 502 без текста ядра; недоступное ядро → 503 без деталей сети', async () => {
    (global as any).fetch = coreReplies(500, { detail: 'Не удалось сохранить выбор' });
    const err = await request(appAs()).get('/api/admin/ai-models');
    expect(err.status).toBe(502);

    (global as any).fetch = jest.fn(async () => { throw new Error('connect ECONNREFUSED 10.0.0.5:8001'); });
    const down = await request(appAs()).get('/api/admin/ai-models');
    expect(down.status).toBe(503);
    expect(JSON.stringify(down.body)).not.toContain('10.0.0.5');
  });
});
