// Правила карточки произведения без БД: разбор входа, фильтр суждений, переходы, готовность к утверждению.
import {
  allowedTransitions, cardProblems, judgmentViolations, parseFragmentInput, parsePassportInput, parseSources, transitionAllowed, transitionRoleOk,
} from '../../services/artworkCardRules';

describe('фильтр суждений о подлинности, экспертизе и цене', () => {
  it.each([
    ['Рисунок подлинный, признан экспертами', 'authenticity'],
    ['Работа оказалась подделкой', 'authenticity'],
    ['This is a genuine work', 'authenticity'],
    ['Проведена экспертиза', 'expertise'],
    ['Стоимость листа высока', 'price'],
    ['Лист был продан за 12 000 руб.', 'price'],
    ['Оценка около 5 000 000 ₽', 'amount'],
    ['Valued at $40,000', 'price'],
  ])('ловит «%s»', (value, code) => {
    expect(judgmentViolations('about_work', value).map(v => v.code)).toContain(code);
  });

  it('нейтральный искусствоведческий текст проходит', () => {
    expect(judgmentViolations('about_work', 'Точная дата исполнения рисунка неизвестна; сюжет — вид дворца со стороны парадного двора.')).toEqual([]);
    expect(judgmentViolations('about_artist', 'Родился в 1800 году в Санкт-Петербурге, акварелист.')).toEqual([]);
  });

  it('в провенансе, надписях и выставках фильтр не применяется (там бывают суммы и слова «подлинник»)', () => {
    expect(judgmentViolations('provenance', 'Куплено в 1919 за 300 руб.')).toEqual([]);
    expect(judgmentViolations('inscriptions', 'Справа внизу: «Подлинник»')).toEqual([]);
    expect(judgmentViolations('acquisition', 'Поступило в дар')).toEqual([]);
  });
});

describe('разбор фрагмента', () => {
  const ok = { block: 'about_work', language: 'ru', text: ' Сюжет ' };

  it('значения по умолчанию и обрезка текста', () => {
    const r = parseFragmentInput(ok);
    expect(r).toEqual({ ok: true, value: { block: 'about_work', language: 'ru', text: 'Сюжет', status: 'catalogued', confidence: 'established', position: 0, sources: [] } });
  });

  it.each([
    [{ ...ok, block: 'price' }, /block/],
    [{ ...ok, language: 'de' }, /language/],
    [{ ...ok, text: '   ' }, /text/],
    [{ ...ok, text: 'я'.repeat(5001) }, /text/],
    [{ ...ok, status: 'guess' }, /status/],
    [{ ...ok, status: 'from_document' }, /from_document/],
    [{ ...ok, confidence: 'sure' }, /confidence/],
    [{ ...ok, position: -1 }, /position/],
    [{ ...ok, sources: 'x' }, /sources/],
    [null, /JSON/],
  ])('отклоняет %j', (body, re) => {
    const r = parseFragmentInput(body);
    expect(r.ok).toBe(false);
    expect((r as any).error).toMatch(re);
  });

  it('частичный разбор не требует обязательных полей', () => {
    expect(parseFragmentInput({ text: 'Новый' }, { partial: true })).toEqual({ ok: true, value: { text: 'Новый' } });
    expect(parseFragmentInput({ text: '' }, { partial: true }).ok).toBe(false);
  });
});

describe('источники', () => {
  it('документ требует access; цитата не длиннее 25 слов; адрес только http(s)', () => {
    expect(parseSources([{ kind: 'document', id: 'doc-1' }]).ok).toBe(false);
    expect(parseSources([{ kind: 'document', id: 'doc-1', access: 'public', quote: 'слово '.repeat(26).trim() }]).ok).toBe(false);
    expect(parseSources([{ kind: 'external', url: 'javascript:alert(1)' }]).ok).toBe(false);
    expect(parseSources([{ kind: 'external', url: 'https://example.org/a', title: 'Каталог', license: 'CC0' }]).ok).toBe(true);
    expect(parseSources([{ kind: 'document', id: 'doc-1', access: 'public', quote: 'короткая цитата', page: 4 }]).ok).toBe(true);
    expect(parseSources([{ kind: 'magic' }]).ok).toBe(false);
    expect(parseSources(Array.from({ length: 11 }, () => ({ kind: 'curator' }))).ok).toBe(false);
  });
});

describe('разбор паспорта', () => {
  it('принимает известные поля, null очищает', () => {
    expect(parsePassportInput({ inventory_number: ' Р-1308 ', year_from: 1750, year_to: 1757, dating_certainty: 'approx', provenance: null }))
      .toEqual({ ok: true, value: { inventory_number: 'Р-1308', year_from: 1750, year_to: 1757, dating_certainty: 'approx', provenance: null } });
  });
  it.each([
    [{ title: 'Нельзя' }, /Неизвестное поле/],
    [{ year_from: 1757, year_to: 1750 }, /year_from/],
    [{ dating_certainty: 'maybe' }, /dating_certainty/],
    [{ inventory_number: 'x'.repeat(101) }, /inventory_number/],
    [{}, /Нет полей/],
    [[], /JSON/],
  ])('отклоняет %j', (body, re) => {
    const r = parsePassportInput(body);
    expect(r.ok).toBe(false);
    expect((r as any).error).toMatch(re);
  });
});

describe('жизненный цикл', () => {
  it('допустимые переходы и роли', () => {
    expect(transitionAllowed('draft', 'published')).toBe(false);
    expect(transitionAllowed('needs_review', 'approved')).toBe(true);
    expect(transitionRoleOk('draft', 'needs_review', 'staff')).toBe(true);
    expect(transitionRoleOk('needs_review', 'approved', 'staff')).toBe(false);
    expect(transitionRoleOk('needs_review', 'approved', 'curator')).toBe(true);
    expect(transitionRoleOk('approved', 'published', 'admin')).toBe(true);
    expect(transitionRoleOk('approved', 'published', 'user')).toBe(false);
  });
  it('какие переходы доступны роли', () => {
    expect(allowedTransitions('draft', 'staff')).toEqual(['needs_review']);
    expect(allowedTransitions('draft', 'curator').sort()).toEqual(['archived', 'needs_review']);
    expect(allowedTransitions('published', 'staff')).toEqual([]);
  });
});

describe('готовность карточки', () => {
  const art = { title: 'Лист', artist_name: 'Неизвестный автор', medium: 'бумага, тушь', dimensions: '42 × 68', year_created: 1750, image_url: null, image_rights_holder: null };
  const frag = (over = {}) => ({ fragment_id: 1, block: 'about_work', language: 'ru', text: 'Сюжет', status: 'catalogued', approved_at: '2026-10-27', ...over });

  it('полная карточка готова', () => {
    expect(cardProblems({ artwork: art, fragments: [frag()] }, 'published')).toEqual([]);
  });
  it('пустой паспорт, изображение без правообладателя, непроверенный и ai_inferred фрагменты, суждения', () => {
    const codes = cardProblems({
      artwork: { ...art, title: '', medium: ' ', year_created: null, image_url: '/img.jpg' },
      fragments: [frag({ approved_at: null }), frag({ fragment_id: 2, status: 'ai_inferred', approved_at: null }), frag({ fragment_id: 3, text: 'Работа подлинная' })],
    }, 'approved').map(p => `${p.code}${p.fragment_id ?? ''}`);
    expect(codes).toEqual(expect.arrayContaining([
      'passport_title', 'passport_medium', 'passport_dating', 'image_rights', 'fragment_not_approved1', 'fragment_ai_inferred2', 'fragment_authenticity3']));
  });
  it('датировка «неизвестна» допустима вместо даты', () => {
    const codes = cardProblems({ artwork: { ...art, year_created: null, dating_certainty: 'unknown' }, fragments: [] }, 'approved').map(p => p.code);
    expect(codes).not.toContain('passport_dating');
  });
});
