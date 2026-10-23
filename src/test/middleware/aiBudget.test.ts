import express from 'express';
import request from 'supertest';
import { createAiBudget, aiBudgetOptionsFromEnv, DEFAULT_OPTIONS, type AiBudgetOptions } from '../../middleware/aiBudget';

beforeEach(() => { jest.spyOn(console, 'warn').mockImplementation(() => {}); });
afterEach(() => { jest.restoreAllMocks(); });

// Часы подменяются, чтобы проверять окна и смену суток без ожидания
function setup(overrides: Partial<AiBudgetOptions> = {}, role?: string) {
  const clock = { t: Date.UTC(2026, 9, 23, 12, 0, 0) };
  const budget = createAiBudget({ ...DEFAULT_OPTIONS, ...overrides, now: () => clock.t });
  const app = express();
  app.set('trust proxy', 1); // как в server.js: адрес клиента — из X-Forwarded-For
  app.use(express.json());
  app.use((req, _res, next) => { if (role) (req as any).user = { role }; next(); });
  app.use('/api/ai', budget);
  app.all('/api/ai/*', (_req, res) => { res.json({ ok: true }); });
  const post = (path: string, ip = '1.1.1.1') => request(app).post(`/api/ai${path}`).set('X-Forwarded-For', ip).send({});
  return { app, post, clock, budget };
}

describe('лимит по IP', () => {
  it('после лимита — 429 с кодом и Retry-After; другой адрес не затронут', async () => {
    const { post } = setup({ lightPerIp: 3, lightDaily: 0 });
    for (let i = 0; i < 3; i++) expect((await post('/chat')).status).toBe(200);
    const blocked = await post('/chat');
    expect(blocked.status).toBe(429);
    expect(blocked.body.code).toBe('AI_BUDGET_IP');
    expect(Number(blocked.headers['retry-after'])).toBeGreaterThan(0);
    expect(Number(blocked.headers['retry-after'])).toBeLessThanOrEqual(600);
    expect((await post('/chat', '2.2.2.2')).status).toBe(200);
  });

  it('окно истекает: через 10 минут счёт идёт заново', async () => {
    const { post, clock } = setup({ lightPerIp: 2, lightDaily: 0 });
    await post('/chat'); await post('/chat');
    expect((await post('/chat')).status).toBe(429);
    clock.t += 10 * 60 * 1000 + 1;
    expect((await post('/chat')).status).toBe(200);
  });

  it('чат и RAG делят одно ведро, тяжёлые считаются отдельно', async () => {
    const { post } = setup({ lightPerIp: 2, heavyPerIp: 2, lightDaily: 0, heavyDaily: 0 });
    await post('/chat'); await post('/rag-query');
    expect((await post('/chat')).status).toBe(429);
    expect((await post('/rag-query')).status).toBe(429);
    expect((await post('/process-pdf')).status).toBe(200);   // тяжёлое ведро не тронуто
    expect((await post('/analyze-image')).status).toBe(200);
    expect((await post('/process-pdf')).status).toBe(429);
  });

  it('лимит 0 — без ограничения по IP', async () => {
    const { post } = setup({ lightPerIp: 0, lightDaily: 0 });
    for (let i = 0; i < 30; i++) expect((await post('/chat')).status).toBe(200);
  });
});

describe('суточный бюджет', () => {
  it('общий потолок для всех адресов вместе', async () => {
    const { post } = setup({ lightDaily: 5, lightPerIp: 0 });
    for (let i = 0; i < 5; i++) expect((await post('/chat', `10.0.0.${i}`)).status).toBe(200);
    const blocked = await post('/chat', '10.0.0.99');
    expect(blocked.status).toBe(429);
    expect(blocked.body.code).toBe('AI_BUDGET_DAILY');
  });

  it('Retry-After — секунды до полуночи UTC', async () => {
    const { post } = setup({ lightDaily: 1, lightPerIp: 0 });   // «сейчас» 12:00:00 UTC
    await post('/chat');
    const blocked = await post('/chat', '3.3.3.3');
    expect(Number(blocked.headers['retry-after'])).toBe(12 * 3600);
  });

  it('со сменой суток (UTC) бюджет обнуляется', async () => {
    const { post, clock, budget } = setup({ lightDaily: 2, lightPerIp: 0 });
    await post('/chat'); await post('/chat');
    expect((await post('/chat')).status).toBe(429);
    clock.t = Date.UTC(2026, 9, 24, 0, 0, 1);
    expect((await post('/chat')).status).toBe(200);
    expect(budget.stats()).toEqual({ day: '2026-10-24', light: 1, heavy: 0 });
  });

  it('отклонённый по IP запрос не расходует суточный бюджет', async () => {
    const { post, budget } = setup({ lightPerIp: 1, lightDaily: 100 });
    await post('/chat');
    for (let i = 0; i < 10; i++) expect((await post('/chat')).status).toBe(429);
    expect(budget.stats().light).toBe(1);
  });

  it('предупреждение в журнал — один раз за сутки', async () => {
    const warn = console.warn as jest.Mock;
    const { post } = setup({ lightDaily: 1, lightPerIp: 0 });
    await post('/chat');
    for (let i = 0; i < 5; i++) await post('/chat', `4.4.4.${i}`);
    expect(warn).toHaveBeenCalledTimes(1);
  });
});

describe('роли и область действия', () => {
  it('сотрудники, кураторы и администраторы тяжёлые запросы делают без ограничений', async () => {
    for (const role of ['staff', 'curator', 'admin']) {
      const { post, budget } = setup({ heavyPerIp: 1, heavyDaily: 1 }, role);
      for (let i = 0; i < 5; i++) expect((await post('/process-pdf')).status).toBe(200);
      expect(budget.stats().heavy).toBe(0);                  // и бюджет не тратят
    }
  });

  it('обычный вошедший пользователь и гость ограничены', async () => {
    for (const role of ['user', 'auction_participant', undefined]) {
      const { post } = setup({ heavyPerIp: 2, heavyDaily: 0 }, role);
      await post('/process-pdf'); await post('/process-pdf');
      expect((await post('/process-pdf')).status).toBe(429);
    }
  });

  it('лёгкие запросы ограничены для всех, в том числе администратора (роль на открытых маршрутах не определяется)', async () => {
    const { post } = setup({ lightPerIp: 1, lightDaily: 0 }, 'admin');
    await post('/chat');
    expect((await post('/chat')).status).toBe(429);
  });

  it('другие маршруты и методы не затрагиваются', async () => {
    const { app, post } = setup({ lightPerIp: 1, heavyPerIp: 1, lightDaily: 1, heavyDaily: 1 });
    await post('/chat');
    expect((await post('/calculate-slots')).status).toBe(200);
    expect((await post('/describe-artwork')).status).toBe(200);
    for (let i = 0; i < 5; i++) {
      expect((await request(app).get('/api/ai/chat').set('X-Forwarded-For', '1.1.1.1')).status).toBe(200);
      expect((await request(app).get('/api/ai/analysis/abc').set('X-Forwarded-For', '1.1.1.1')).status).toBe(200);
    }
  });

  it('косая черта в конце пути не обходит лимит', async () => {
    const { app } = setup({ lightPerIp: 1, lightDaily: 0 });
    await request(app).post('/api/ai/chat').set('X-Forwarded-For', '9.9.9.9').send({});
    expect((await request(app).post('/api/ai/chat/').set('X-Forwarded-For', '9.9.9.9').send({})).status).toBe(429);
  });
});

describe('настройки из окружения', () => {
  it('значения по умолчанию, числа, 0 и мусор', () => {
    expect(aiBudgetOptionsFromEnv({})).toMatchObject({ lightDaily: 2000, heavyDaily: 100, lightPerIp: 20, heavyPerIp: 10 });
    expect(aiBudgetOptionsFromEnv({ AI_CHAT_DAILY_LIMIT: '500', AI_HEAVY_DAILY_LIMIT: '0', AI_CHAT_IP_LIMIT: '5', AI_HEAVY_IP_LIMIT: '2' }))
      .toMatchObject({ lightDaily: 500, heavyDaily: 0, lightPerIp: 5, heavyPerIp: 2 });
    // нечисловое, отрицательное, дробное, пустое — значение по умолчанию, а не «без лимита»
    for (const bad of ['abc', '-5', '1.5', '', '  ']) {
      expect(aiBudgetOptionsFromEnv({ AI_CHAT_DAILY_LIMIT: bad }).lightDaily).toBe(2000);
    }
  });
});

describe('защита памяти', () => {
  it('таблица адресов ограничена 10 000 записей: после предела окна сбрасываются, запросы не ломаются', () => {
    const { budget } = setup({ lightPerIp: 1, lightDaily: 0 });
    const call = (ip: string) => {
      const res: any = { setHeader: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      budget({ method: 'POST', path: '/chat', ip } as any, res, next);
      return { allowed: next.mock.calls.length === 1, blocked: res.status.mock.calls[0]?.[0] === 429 };
    };
    expect(call('victim').allowed).toBe(true);
    expect(call('victim').blocked).toBe(true);                       // лимит на адрес действует
    for (let i = 0; i < 10_050; i++) expect(call(`ip-${i}`).allowed).toBe(true);   // перебор адресов не отклоняется
    // таблица дошла до предела и была сброшена (память не растёт): окно «жертвы» тоже сброшено
    expect(call('victim').allowed).toBe(true);
  });
});
