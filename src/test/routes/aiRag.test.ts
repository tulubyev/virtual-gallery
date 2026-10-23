// src/test/routes/aiRag.test.ts — прокси RAG и загрузки PDF в src/routes/ai.ts
import express from 'express';
import request from 'supertest';

process.env.AI_CORE_URL = 'http://core.test';
process.env.INTERNAL_API_TOKEN = 'internal-token-for-tests-0123456789';

// require, а не import: адрес и токен ядра читаются при загрузке модуля, а import поднимается выше присваивания env
// eslint-disable-next-line @typescript-eslint/no-var-requires
const aiRouter = require('../../routes/ai');

type User = { user_id: number; role: string } | null;

function app(user: User) {
  const a = express();
  a.use(express.json());
  a.use((req, _res, next) => { if (user) (req as any).user = user; next(); });
  a.use('/api/ai', aiRouter);
  return a;
}

const STAFF = { user_id: 3, role: 'staff' };
const CURATOR = { user_id: 2, role: 'curator' };
const VISITOR = { user_id: 4, role: 'user' };

let fetchMock: jest.Mock;
const coreCalls = () => fetchMock.mock.calls.map(([url, init]) => ({ url: String(url), init: init as RequestInit }));
const lastBody = () => JSON.parse(String(coreCalls().at(-1)!.init.body));

beforeEach(() => {
  fetchMock = jest.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } }));
  (global as any).fetch = fetchMock;
});

describe('POST /api/ai/rag-query', () => {
  it('гость и посетитель получают только публичные документы и режим «public», даже если просят иначе', async () => {
    for (const user of [null, VISITOR]) {
      const res = await request(app(user)).post('/api/ai/rag-query').send({ query: 'Кто такой Малевич?', mode: 'curator', access: 'staff', user_id: 99 });
      expect(res.status).toBe(200);
      expect(lastBody()).toMatchObject({ access: 'public', mode: 'public', user_id: user?.user_id ?? null });
    }
    expect(coreCalls()[0].url).toBe('http://core.test/api/v1/rag/query');
    expect((coreCalls()[0].init.headers as Record<string, string>)['X-Internal-Token']).toBe(process.env.INTERNAL_API_TOKEN);
  });

  it('сотрудник видит и закрытые документы и может выбрать режим куратора', async () => {
    await request(app(STAFF)).post('/api/ai/rag-query').send({ query: 'Как закупали?', mode: 'curator' });
    expect(lastBody()).toMatchObject({ access: 'staff', mode: 'curator', user_id: 3 });
    await request(app(STAFF)).post('/api/ai/rag-query').send({ query: 'Как закупали?' });
    expect(lastBody().mode).toBe('public');
  });

  it('проверяет вопрос и ограничивает фильтры', async () => {
    expect((await request(app(null)).post('/api/ai/rag-query').send({ query: 'я' })).status).toBe(400);
    expect((await request(app(null)).post('/api/ai/rag-query').send({ query: 'я'.repeat(1001) })).status).toBe(400);
    expect((await request(app(null)).post('/api/ai/rag-query').send({ query: { $ne: 1 } })).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();

    await request(app(null)).post('/api/ai/rag-query').send({
      query: 'вопрос про цвет', contextLimit: 500, filters: { documentIds: ['ok-1', '../x', 5, 'ok_2'] } });
    expect(lastBody()).toMatchObject({ context_limit: 12, document_ids: ['ok-1', 'ok_2'] });
  });

  it('недоступное ядро — 503 без внутренних подробностей, ошибка ядра передаётся как есть', async () => {
    fetchMock.mockRejectedValueOnce(new Error('connect ECONNREFUSED 10.0.0.5:8001'));
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const down = await request(app(null)).post('/api/ai/rag-query').send({ query: 'вопрос' });
    expect(down.status).toBe(503);
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ detail: 'Internal error' }), { status: 500, headers: { 'content-type': 'application/json' } }));
    expect((await request(app(null)).post('/api/ai/rag-query').send({ query: 'вопрос' })).status).toBe(500);
  });
});

describe('POST /api/ai/process-pdf', () => {
  const pdf = Buffer.from('%PDF-1.4\n%%EOF\n');

  it('файл уходит в ядро multipart-формой; роль из сессии, а не из формы', async () => {
    const res = await request(app(STAFF)).post('/api/ai/process-pdf')
      .field('documentId', 'catalog-1').field('title', 'Каталог').field('access', 'public').field('category', 'artist')
      .attach('pdf', pdf, 'catalog.pdf');
    expect(res.status).toBe(200);
    const call = coreCalls().at(-1)!;
    expect(call.url).toBe('http://core.test/api/v1/pdfs/upload');
    const form = call.init.body as FormData;
    expect(form.get('document_id')).toBe('catalog-1');
    expect(form.get('title')).toBe('Каталог');
    expect(form.get('access')).toBe('staff');                  // staff не может публиковать для гостей
    expect(form.get('category')).toBe('artist_biography');
    expect(form.get('user_id')).toBe('3');
    expect(form.get('file')).toBeInstanceOf(Blob);
    expect((call.init.headers as Record<string, string>)['Content-Type']).toBeUndefined();
  });

  it('куратор публикует документ для гостей; название по умолчанию — имя файла; «auto» категорию не задаёт', async () => {
    await request(app(CURATOR)).post('/api/ai/process-pdf').field('access', 'public').field('category', 'auto').attach('pdf', pdf, 'Малевич.pdf');
    const form = coreCalls().at(-1)!.init.body as FormData;
    expect(form.get('access')).toBe('public');
    expect(form.get('title')).toBe('Малевич');
    expect(form.get('category')).toBeNull();
    expect(String(form.get('document_id'))).toMatch(/^doc_\d+$/);
  });

  it('недопустимый documentId и пустой запрос отклоняются до обращения к ядру', async () => {
    expect((await request(app(STAFF)).post('/api/ai/process-pdf').field('documentId', '../etc').attach('pdf', pdf, 'a.pdf')).status).toBe(400);
    expect((await request(app(STAFF)).post('/api/ai/process-pdf').send({})).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('слишком большой файл не доходит до ядра', async () => {
    const big = Buffer.concat([Buffer.from('%PDF-'), Buffer.alloc(51 * 1024 * 1024)]);
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const res = await request(app(STAFF)).post('/api/ai/process-pdf').attach('pdf', big, 'big.pdf');
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('старый JSON-вариант (по адресу) ставит задачу с закрытым доступом по умолчанию', async () => {
    await request(app(STAFF)).post('/api/ai/process-pdf').send({ pdfUrl: 'https://virtgal.ru/a.pdf', documentId: 'old-1', access: 'public' });
    expect(coreCalls().at(-1)!.url).toBe('http://core.test/api/v1/pdfs/process');
    expect(lastBody()).toMatchObject({ pdf_url: 'https://virtgal.ru/a.pdf', document_id: 'old-1', access: 'staff', user_id: 3 });
  });
});

describe('документы базы знаний и статус задач', () => {
  it('список и удаление проксируются; идентификатор проверяется', async () => {
    await request(app(STAFF)).get('/api/ai/rag/documents');
    expect(coreCalls().at(-1)).toMatchObject({ url: 'http://core.test/api/v1/rag/documents', init: { method: 'GET' } });
    await request(app(CURATOR)).delete('/api/ai/rag/documents/doc_1');
    expect(coreCalls().at(-1)).toMatchObject({ url: 'http://core.test/api/v1/rag/documents/doc_1', init: { method: 'DELETE' } });
    fetchMock.mockClear();
    expect((await request(app(CURATOR)).delete('/api/ai/rag/documents/bad%20id')).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('статус PDF читается из /pdfs/processing, изображения — из /images/analysis', async () => {
    await request(app(null)).get('/api/ai/analysis/pdf_abc?type=pdf');
    expect(coreCalls().at(-1)!.url).toBe('http://core.test/api/v1/pdfs/processing/pdf_abc');
    await request(app(null)).get('/api/ai/analysis/img_abc');
    expect(coreCalls().at(-1)!.url).toBe('http://core.test/api/v1/images/analysis/img_abc');
  });
});
