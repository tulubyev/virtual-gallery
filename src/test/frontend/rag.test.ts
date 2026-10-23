jest.mock('../../frontend/src/services/api', () => ({ fetchWithAuth: jest.fn() }));
import { fetchWithAuth } from '../../frontend/src/services/api';
import {
  askDocuments, loadDocuments, uploadDocument, deleteDocument, pollTask, splitCitations, outcomeNote, retrievalNote,
  sourceLabel, formatDate, pdfProblem, currentRole, isStaff, isCurator,
} from '../../frontend/src/lib/rag';

const mocked = fetchWithAuth as jest.Mock;
const reply = (ok: boolean, status: number, body: any) => ({ ok, status, json: async () => body });
const noSleep = async () => {};

beforeEach(() => mocked.mockReset());

describe('роль и права в интерфейсе', () => {
  afterEach(() => { delete (globalThis as any).localStorage; });

  it('роль читается из сохранённой сессии; мусор и отсутствие хранилища — гость', () => {
    (globalThis as any).localStorage = { getItem: () => JSON.stringify({ role: 'curator' }) };
    expect(currentRole()).toBe('curator');
    (globalThis as any).localStorage = { getItem: () => '{не json' };
    expect(currentRole()).toBeNull();
    (globalThis as any).localStorage = { getItem: () => JSON.stringify({ role: 5 }) };
    expect(currentRole()).toBeNull();
    delete (globalThis as any).localStorage;
    expect(currentRole()).toBeNull();
  });

  it('сотрудник — admin/curator/staff; публиковать для всех — только admin/curator', () => {
    expect(['admin', 'curator', 'staff', 'user', null].map(isStaff)).toEqual([true, true, true, false, false]);
    expect(['admin', 'curator', 'staff', 'user', null].map(isCurator)).toEqual([true, true, false, false, false]);
  });
});

describe('запрос ответа', () => {
  it('отправляет вопрос и режим; режим куратора включается только явно', async () => {
    mocked.mockResolvedValue(reply(true, 200, { outcome: 'answered' }));
    await askDocuments('Кто основал супрематизм?');
    await askDocuments('Подробнее', { curatorMode: true, documentIds: ['a', 'b'] });
    const [first, second] = mocked.mock.calls.map(c => JSON.parse(c[1].body));
    expect(mocked.mock.calls[0][0]).toBe('/api/ai/rag-query');
    expect(first).toMatchObject({ query: 'Кто основал супрематизм?', mode: 'public' });
    expect(second).toMatchObject({ mode: 'curator', filters: { documentIds: ['a', 'b'] } });
  });

  it('ошибки: лимит и проверка показывают текст сервера, сбои ядра — общий текст без подробностей', async () => {
    mocked.mockResolvedValueOnce(reply(false, 429, { error: 'Дневной лимит запросов к ИИ исчерпан, попробуйте завтра.' }));
    await expect(askDocuments('вопрос')).rejects.toThrow('Дневной лимит');
    mocked.mockResolvedValueOnce(reply(false, 503, { error: 'AI/ML Service unavailable' }));
    await expect(askDocuments('вопрос')).rejects.toThrow('ИИ-сервис сейчас недоступен');
    mocked.mockResolvedValueOnce(reply(false, 500, { detail: 'Internal error postgres://u:p@h/db' }));
    const error = await askDocuments('вопрос').catch(e => e as Error);
    expect(error.message).toBe('Не удалось получить ответ. Попробуйте ещё раз.');
    mocked.mockResolvedValueOnce({ ok: false, status: 502, json: async () => { throw new Error('no body'); } });
    await expect(askDocuments('вопрос')).rejects.toThrow('Не удалось получить ответ');
  });
});

describe('документы базы знаний', () => {
  it('список: массив из ответа, иначе пусто', async () => {
    mocked.mockResolvedValueOnce(reply(true, 200, { documents: [{ document_id: 'a' }] }));
    expect(await loadDocuments()).toEqual([{ document_id: 'a' }]);
    mocked.mockResolvedValueOnce(reply(true, 200, {}));
    expect(await loadDocuments()).toEqual([]);
    mocked.mockResolvedValueOnce(reply(false, 403, {}));
    await expect(loadDocuments()).rejects.toThrow('Недостаточно прав');
  });

  it('загрузка отправляет форму с файлом, доступом и необязательными полями', async () => {
    mocked.mockResolvedValue(reply(true, 200, { task_id: 'pdf_1' }));
    const file = new File([new Uint8Array([37, 80, 68, 70])], 'a.pdf', { type: 'application/pdf' });
    const { taskId, documentId } = await uploadDocument({ file, title: ' Каталог ', access: 'public', license: '', category: 'auto' });
    expect(taskId).toBe('pdf_1');
    const [url, init] = mocked.mock.calls[0];
    const form = init.body as FormData;
    expect(url).toBe('/api/ai/process-pdf');
    expect(form.get('documentId')).toBe(documentId);
    expect(form.get('title')).toBe('Каталог');
    expect(form.get('access')).toBe('public');
    expect(form.has('license')).toBe(false);
    expect(form.has('category')).toBe(false);          // «auto» — решает модель
    expect(form.get('pdf')).toBeInstanceOf(File);
    expect(init.headers).toBeUndefined();               // границу multipart ставит браузер
  });

  it('загрузка: сервер не вернул задачу — ошибка; удаление кодирует идентификатор', async () => {
    mocked.mockResolvedValueOnce(reply(true, 200, {}));
    await expect(uploadDocument({ file: new File(['x'], 'a.pdf'), access: 'staff' })).rejects.toThrow('номер задачи');
    mocked.mockResolvedValueOnce(reply(true, 200, {}));
    await deleteDocument('a/b c');
    expect(mocked.mock.calls.at(-1)).toEqual(['/api/ai/rag/documents/a%2Fb%20c', { method: 'DELETE' }]);
  });
});

describe('ожидание обработки PDF', () => {
  it('ждёт завершения и сообщает прогресс', async () => {
    mocked
      .mockResolvedValueOnce(reply(true, 200, { status: 'processing', progress: 40, current_step: 'Эмбеддинги' }))
      .mockResolvedValueOnce(reply(true, 200, { status: 'completed', progress: 100 }));
    const progress: Array<[number, string | null]> = [];
    const outcome = await pollTask('pdf_1', { sleep: noSleep, onProgress: (p, s) => progress.push([p, s]) });
    expect(outcome).toEqual({ status: 'completed' });
    expect(progress[0]).toEqual([40, 'Эмбеддинги']);
    expect(mocked.mock.calls[0][0]).toBe('/api/ai/analysis/pdf_1?type=pdf');
  });

  it('сбой задачи возвращает текст ошибки; сбой сети при опросе не прерывает ожидание', async () => {
    mocked.mockRejectedValueOnce(new Error('network')).mockResolvedValueOnce(reply(true, 200, { status: 'failed', error: 'Файл не является PDF' }));
    expect(await pollTask('pdf_1', { sleep: noSleep })).toEqual({ status: 'failed', error: 'Файл не является PDF' });
  });

  it('по истечении времени — timeout', async () => {
    mocked.mockResolvedValue(reply(true, 200, { status: 'processing' }));
    expect(await pollTask('pdf_1', { sleep: noSleep, intervalMs: 1000, maxMs: 3000 })).toEqual({ status: 'timeout' });
    expect(mocked.mock.calls.length).toBe(4);
  });
});

describe('разбор ответа', () => {
  it('номера источников отделяются от текста', () => {
    expect(splitCitations('Автор — Малевич. [1][2] Год 1915 [3].')).toEqual([
      { type: 'text', text: 'Автор — Малевич. ' }, { type: 'cite', id: 1 }, { type: 'cite', id: 2 },
      { type: 'text', text: ' Год 1915 ' }, { type: 'cite', id: 3 }, { type: 'text', text: '.' },
    ]);
    expect(splitCitations('Без ссылок')).toEqual([{ type: 'text', text: 'Без ссылок' }]);
    expect(splitCitations('')).toEqual([]);
    expect(splitCitations('Массив a[0] и [текст] — не ссылки')).toEqual([
      { type: 'text', text: 'Массив a' }, { type: 'cite', id: 0 }, { type: 'text', text: ' и [текст] — не ссылки' }]);
  });

  it('пояснения к исходам: ответ — без пояснения, отказ — нейтрально, непроверенный — предупреждение', () => {
    expect(outcomeNote('answered')).toBeNull();
    expect(outcomeNote('no_sources')?.tone).toBe('info');
    expect(outcomeNote('insufficient_evidence')?.text).toMatch(/нет ответа/);
    expect(outcomeNote('citations_failed')?.tone).toBe('warn');
  });

  it('деградация поиска объясняется пользователю', () => {
    expect(retrievalNote(undefined)).toBeNull();
    expect(retrievalNote({ dense: 1, lexical: 1, degraded: [] })).toBeNull();
    expect(retrievalNote({ dense: 0, lexical: 1, degraded: ['dense'] })).toMatch(/по смыслу/);
    expect(retrievalNote({ dense: 1, lexical: 0, degraded: ['lexical'] })).toMatch(/по словам/);
  });

  it('подпись источника и дата', () => {
    expect(sourceLabel({ title: 'Каталог', document_id: 'd1', page: 7 })).toBe('Каталог, с. 7');
    expect(sourceLabel({ title: null, document_id: 'd1', page: null })).toBe('d1');
    expect(formatDate(null)).toBe('—');
    expect(formatDate('не дата')).toBe('—');
    expect(formatDate('2026-10-23T12:00:00')).toMatch(/2026/);
  });

  it('проверка файла: только PDF и не больше 50 МБ', () => {
    expect(pdfProblem({ name: 'a.pdf', type: 'application/pdf', size: 10 })).toBeNull();
    expect(pdfProblem({ name: 'A.PDF', type: '', size: 10 })).toBeNull();
    expect(pdfProblem({ name: 'a.docx', type: 'application/msword', size: 10 })).toMatch(/PDF/);
    expect(pdfProblem({ name: 'a.pdf', type: 'application/pdf', size: 60 * 1024 * 1024 })).toMatch(/слишком большой/);
  });
});
