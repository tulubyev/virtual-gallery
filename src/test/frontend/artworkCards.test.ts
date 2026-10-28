jest.mock('../../frontend/src/services/api', () => ({ fetchWithAuth: jest.fn() }));
import { fetchWithAuth } from '../../frontend/src/services/api';
import {
  CardApiError, Fragment, changeStatus, emptySourceForm, errorText, getCard, groupFragments, hiddenFromVisitors, passportChanges, passportToForm,
  sourceFromForm, sourceLine, transitionLabel, draftSummary, generateDraft, translateCard, translateSummary,
} from '../../frontend/src/lib/artworkCards';

const mockFetch = fetchWithAuth as jest.Mock;
const reply = (status: number, body: unknown) => mockFetch.mockResolvedValueOnce({ ok: status < 400, status, json: async () => body });

const frag = (over: Partial<Fragment> = {}): Fragment => ({
  fragment_id: 1, artwork_id: 5, block: 'about_work', position: 0, language: 'ru', text: 'Текст', status: 'catalogued', confidence: 'established',
  sources: [], approved_by: null, approved_at: null, version: 1, ...over,
});
const artwork: any = {
  artwork_id: 5, title: 'Лист', artist_name: 'Автор', year_created: 1750, medium: 'бумага', dimensions: '42', image_url: null, thumbnail_url: null,
  title_en: null, medium_en: null, attribution_note: null, attribution_note_en: null, inventory_number: 'Р-1', dating_text: '1750–1757', year_from: 1750, year_to: 1757,
  dating_certainty: 'approx', provenance: null, inscriptions: null, image_rights_holder: null, image_rights_note: null, card_status: 'draft', card_reviewed_by: null, card_reviewed_at: null,
};

beforeEach(() => mockFetch.mockReset());

describe('запросы кабинета карточек', () => {
  it('успешный ответ разбирается, адрес и метод верные', async () => {
    reply(200, { card: { artwork, fragments: [], problems: [], allowed_transitions: ['needs_review'] } });
    const r = await getCard(5);
    expect(r.card.allowed_transitions).toEqual(['needs_review']);
    expect(mockFetch).toHaveBeenCalledWith('/api/artwork-cards/5', { method: 'GET' });
  });

  it('смена статуса отправляет to и признак утверждения фрагментов', async () => {
    reply(200, { artwork, warnings: [] });
    await changeStatus(5, 'approved', true);
    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('/api/artwork-cards/5/status');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({ to: 'approved', approve_fragments: true });
  });

  it('422 несёт список проблем, суждение — найденные слова; текст ошибки понятен', async () => {
    reply(422, { error: 'Карточка не готова', problems: [{ code: 'image_rights', message: 'Для изображения не указан правообладатель' }] });
    const err = await changeStatus(5, 'approved').catch(e => e);
    expect(err).toBeInstanceOf(CardApiError);
    expect(err.status).toBe(422);
    expect(err.problems[0].code).toBe('image_rights');

    reply(422, { error: 'В тексте суждение о подлинности, экспертизе или цене', violations: [{ code: 'authenticity', match: 'подлинный' }] });
    const v = await changeStatus(5, 'approved').catch(e => e);
    expect(errorText(v)).toContain('«подлинный»');
    expect(errorText(v)).toContain('не высказывается о подлинности');
  });

  it('401, 403 и 500 дают понятные сообщения без технических подробностей', async () => {
    reply(401, {});
    expect((await getCard(5).catch(e => e)).message).toBe('Войдите в аккаунт.');
    reply(403, { error: 'Недостаточно прав для этого перехода' });
    expect((await getCard(5).catch(e => e)).message).toBe('Недостаточно прав для этого перехода');
    reply(500, { error: 'SELECT * FROM secret' });
    expect((await getCard(5).catch(e => e)).message).toBe('Не удалось выполнить действие.');
  });
});

describe('подготовка данных', () => {
  it('фрагменты по блокам и языку, пустые блоки есть, порядок по позиции', () => {
    const g = groupFragments([frag({ fragment_id: 2, position: 1 }), frag({ fragment_id: 1, position: 0 }), frag({ fragment_id: 3, language: 'en' }), frag({ fragment_id: 4, block: 'provenance' })], 'ru');
    expect(g.about_work.map(f => f.fragment_id)).toEqual([1, 2]);
    expect(g.provenance.map(f => f.fragment_id)).toEqual([4]);
    expect(g.inscriptions).toEqual([]);
    expect(groupFragments([frag({ language: 'en' })], 'en').about_work).toHaveLength(1);
  });

  it('внутренний документ скрыт от посетителей, публичный и внешний — нет', () => {
    expect(hiddenFromVisitors(frag({ sources: [{ kind: 'document', id: 'd', access: 'staff' }] }))).toBe(true);
    expect(hiddenFromVisitors(frag({ sources: [{ kind: 'document', id: 'd', access: 'public' }] }))).toBe(false);
    expect(hiddenFromVisitors(frag({ sources: [{ kind: 'external', title: 'Каталог' }] }))).toBe(false);
  });

  it('подписи источников', () => {
    expect(sourceLine({ kind: 'curator', id: 1 })).toBe('куратор');
    expect(sourceLine({ kind: 'external', title: 'Каталог выставки', page: 4, license: 'CC BY' })).toBe('Каталог выставки (с. 4, CC BY)');
    expect(sourceLine({ kind: 'document', id: 'd', access: 'staff' })).toBe('документ (внутренний)');
  });

  it('форма источника: проверки и приведение значений', () => {
    expect(sourceFromForm({ ...emptySourceForm(), kind: 'external' }).error).toMatch(/название или адрес/);
    expect(sourceFromForm({ ...emptySourceForm(), kind: 'external', title: 'Т', url: 'ftp://x' }).error).toMatch(/http/);
    expect(sourceFromForm({ ...emptySourceForm(), kind: 'document', title: 'Док' }).error).toMatch(/доступ/);
    expect(sourceFromForm({ ...emptySourceForm(), kind: 'external', title: 'Т', quote: 'слово '.repeat(26) }).error).toMatch(/25 слов/);
    expect(sourceFromForm({ ...emptySourceForm(), kind: 'document', title: 'Док', access: 'public', page: ' 12 ' }).source)
      .toEqual({ kind: 'document', title: 'Док', page: 12, access: 'public' });
    expect(sourceFromForm({ ...emptySourceForm(), kind: 'curator' }).source).toEqual({ kind: 'curator' });
  });

  it('паспорт: отправляются только изменённые поля, пустое очищает, годы — числа', () => {
    const form = passportToForm(artwork);
    expect(passportChanges(form, artwork)).toEqual({ changes: {} });
    expect(passportChanges({ ...form, inventory_number: ' Р-1308 ', dating_text: '', year_to: '1760' }, artwork))
      .toEqual({ changes: { inventory_number: 'Р-1308', dating_text: null, year_to: 1760 } });
    expect(passportChanges({ ...form, year_from: 'abc' }, artwork).error).toMatch(/Год/);
    expect(passportChanges({ ...form, year_from: '1800', year_to: '1760' }, artwork).error).toMatch(/позже/);
  });

  it('названия действий зависят от перехода', () => {
    expect(transitionLabel('draft', 'needs_review')).toBe('Отправить на проверку');
    expect(transitionLabel('needs_review', 'approved')).toBe('Утвердить');
    expect(transitionLabel('approved', 'published')).toBe('Опубликовать');
    expect(transitionLabel('published', 'needs_review')).toBe('Снять с публикации (на проверку)');
    expect(transitionLabel('archived', 'draft')).toBe('Вернуть из архива');
  });
});

describe('помощник: черновик и перевод', () => {
  const draft = (over: object = {}) => ({ outcome: 'drafted', added: [frag(), frag({ fragment_id: 2 })], skipped_duplicates: 0, rejected: [], missing: [], warnings: [], sources_considered: 3, model: 'm', ...over }) as any;

  it('запросы идут на нужные адреса; список документов передаётся только если он есть', async () => {
    reply(200, draft());
    await generateDraft(5);
    expect(mockFetch).toHaveBeenLastCalledWith('/api/artwork-cards/5/generate', expect.objectContaining({ method: 'POST', body: '{}' }));
    reply(200, draft());
    await generateDraft(5, ['d1', 'd2']);
    expect(JSON.parse(mockFetch.mock.calls[1][1].body)).toEqual({ document_ids: ['d1', 'd2'] });
    reply(200, { added: [], rejected: [], nothing_to_translate: true, model: null });
    await translateCard(5);
    expect(mockFetch).toHaveBeenLastCalledWith('/api/artwork-cards/5/translate', expect.objectContaining({ method: 'POST' }));
  });

  it('недоступность ИИ и конфликт показываются сообщением сервера', async () => {
    reply(503, { error: 'Сервис ИИ недоступен' });
    await expect(generateDraft(5)).rejects.toThrow('Сервис ИИ недоступен');
    reply(409, { error: 'Для этого произведения уже идёт генерация или перевод' });
    await expect(translateCard(5)).rejects.toThrow(/уже идёт/);
  });

  it('итог генерации: добавлено, отклонено, повторы; отказ без выдумок', () => {
    expect(draftSummary(draft())).toBe('Добавлено 2 фрагмента из документов — все ждут проверки куратора.');
    expect(draftSummary(draft({ added: [frag()], rejected: [{ reasons: ['x'] }], skipped_duplicates: 3 })))
      .toBe('Добавлено 1 фрагмент из документов — все ждут проверки куратора; отклонено при проверке: 1; уже были в карточке: 3.');
    expect(draftSummary(draft({ outcome: 'no_sources', added: [] }))).toMatch(/не нашлось/);
    expect(draftSummary(draft({ outcome: 'insufficient_evidence', added: [], rejected: [{ reasons: ['x'] }] }))).toMatch(/Ни один фрагмент не прошёл проверку цитат \(отклонено: 1\)/);
  });

  it('итог перевода', () => {
    expect(translateSummary({ added: [], rejected: [], nothing_to_translate: true, model: null })).toMatch(/Переводить нечего/);
    expect(translateSummary({ added: [frag()], rejected: [{ fragment_id: 2, reasons: ['x'] }], nothing_to_translate: false, model: 'm' }))
      .toBe('Переведено 1 фрагмент — переводы ждут утверждения; отклонено при проверке: 1.');
    expect(translateSummary({ added: [], rejected: [{ fragment_id: 2, reasons: ['x'] }], nothing_to_translate: false, model: 'm' })).toMatch(/Ни один перевод/);
  });
});
