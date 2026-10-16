import express from 'express';
import request from 'supertest';

jest.mock('../../config/database', () => ({ __esModule: true, default: { query: jest.fn() } }));
jest.mock('../../services/dashboardStats', () => ({ getOverview: jest.fn(async (o: any) => ({ includeUsers: o.includeUsers })) }));

const { getOverview } = require('../../services/dashboardStats');
const statsRouter = require('../../routes/stats');

function appAs(role: string) {
  const app = express();
  app.use((req, _res, next) => { (req as any).user = { role }; next(); });
  app.use('/api/stats', statsRouter);
  return app;
}

describe('GET /api/stats/overview', () => {
  it('данные о пользователях только для администратора', async () => {
    expect((await request(appAs('admin')).get('/api/stats/overview')).body).toEqual({ includeUsers: true });
    for (const role of ['curator', 'staff']) {
      expect((await request(appAs(role)).get('/api/stats/overview')).body).toEqual({ includeUsers: false });
    }
  });

  it('ошибка БД → 500 без деталей', async () => {
    getOverview.mockRejectedValueOnce(new Error('secret db detail'));
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const res = await request(appAs('admin')).get('/api/stats/overview');
    spy.mockRestore();
    expect(res.status).toBe(500);
    expect(JSON.stringify(res.body)).not.toContain('secret');
  });
});
