import { PublicCard, PublicCardError, datingLine, getPublicCard, parseLang, safeUrl, sourceLine, visibleBlocks } from '../../frontend/src/lib/publicCard';

const card = (over: Partial<PublicCard> = {}): PublicCard => ({
  artwork_id: 5, lang: 'ru',
  passport: { title: 'Лист', artist: 'Автор', attribution_note: null, medium: 'бумага', dimensions: '42 × 31', inventory_number: 'Р-1',
    dating: { text: '1750–1757', year_from: 1750, year_to: 1757, certainty: 'approx' } },
  image: null, blocks: {}, bibliography: [],
  notes: { approximate_dating: true, has_uncertain_fragments: false, has_image_description: false },
  translation: { requested: 'ru', fragments: 0, fallback_fields: [] },
  ...over,
});

describe('языки', () => {
  it('поддерживается только ru и en, по умолчанию русский', () => {
    expect(parseLang('en')).toBe('en');
    expect(parseLang('de')).toBe('ru');
    expect(parseLang(null)).toBe('ru');
  });
});

describe('адреса источников', () => {
  it('ссылкой становятся только http и https', () => {
    expect(safeUrl('https://example.org/a?b=1')).toBe('https://example.org/a?b=1');
    expect(safeUrl('javascript:alert(1)')).toBeNull();
    expect(safeUrl('data:text/html,x')).toBeNull();
    expect(safeUrl('не адрес')).toBeNull();
    expect(safeUrl(null)).toBeNull();
  });
});

describe('блоки карточки', () => {
  it('идут в порядке шаблона, пустые и выводы ИИ не показываются', () => {
    const c = card({ blocks: {
      provenance: [{ text: 'Из собрания N', confidence: 'established', origin: 'catalogued' }],
      about_work: [{ text: 'Описание', confidence: 'established', origin: 'document' }, { text: 'Догадка', confidence: 'uncertain', origin: 'ai' }, { text: '  ', confidence: 'established', origin: 'catalogued' }],
      exhibitions: [],
    } });
    const v = visibleBlocks(c);
    expect(v.map(b => b.block)).toEqual(['about_work', 'provenance']);
    expect(v[0].fragments.map(f => f.text)).toEqual(['Описание']);
  });
});

describe('датировка', () => {
  it('приблизительная и неизвестная даты получают пометку на нужном языке', () => {
    expect(datingLine(card(), 'ru')).toBe('1750–1757. Датировка приблизительная.');
    expect(datingLine(card(), 'en')).toBe('1750–1757. The date is approximate.');
    const unknown = card({ passport: { ...card().passport, dating: { text: null, year_from: null, year_to: null, certainty: 'unknown' } } });
    expect(datingLine(unknown, 'ru')).toBe('Точная датировка неизвестна.');
  });
  it('точная дата без пометок, годы из диапазона, если текста нет', () => {
    const exact = card({ passport: { ...card().passport, dating: { text: null, year_from: 1849, year_to: 1849, certainty: 'exact' } } });
    expect(datingLine(exact, 'ru')).toBe('1849');
    const range = card({ passport: { ...card().passport, dating: { text: null, year_from: 1840, year_to: 1850, certainty: 'exact' } } });
    expect(datingLine(range, 'ru')).toBe('1840–1850');
  });
});

describe('литература', () => {
  it('строка: название, страница, лицензия', () => {
    expect(sourceLine({ kind: 'document', title: 'Каталог', page: 12, license: 'CC0' }, 'ru')).toBe('Каталог, с. 12, CC0');
    expect(sourceLine({ kind: 'document', title: 'Catalogue', page: 12 }, 'en')).toBe('Catalogue, p. 12');
    expect(sourceLine({ kind: 'external', title: null, url: 'https://example.org' }, 'ru')).toBe('');
  });
});

describe('запрос карточки', () => {
  const realFetch = global.fetch;
  afterEach(() => { global.fetch = realFetch; });

  it('читает публичный адрес с языком', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, status: 200, json: async () => card() });
    global.fetch = fetchMock as any;
    const r = await getPublicCard(5, 'en');
    expect(r.artwork_id).toBe(5);
    expect(fetchMock).toHaveBeenCalledWith('/api/artwork-cards/public/5?lang=en');
  });

  it('404 — «не найдена» на языке посетителя, сбой — общее сообщение', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404, json: async () => ({}) }) as any;
    await expect(getPublicCard(5, 'ru')).rejects.toThrow(/не найдена/);
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404, json: async () => ({}) }) as any;
    await expect(getPublicCard(5, 'en')).rejects.toThrow(/not found/);
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }) as any;
    const err = await getPublicCard(5, 'ru').catch(e => e);
    expect(err).toBeInstanceOf(PublicCardError);
    expect(err.status).toBe(500);
  });
});
