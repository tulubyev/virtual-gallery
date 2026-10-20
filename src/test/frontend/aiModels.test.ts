jest.mock('../../frontend/src/services/api', () => ({ fetchWithAuth: jest.fn() }));
import { fetchWithAuth } from '../../frontend/src/services/api';
import {
  rub, monthlyCost, parseVolume, unsuitableReason, modelsForTask, previewWarnings, planTotal, priceNote,
  loadAiModels, saveAiModel, resetAiModel, refreshAiCatalog, DASH, type CatalogModel, type TaskRow,
} from '../../frontend/src/lib/aiModels';

const model = (id: string, extra: Partial<CatalogModel> = {}): CatalogModel => ({
  id, label: id, vendor: 'v', tier: 'economy', ru_hosted: false, flex: false, vision: true, json_schema: true, context: 1000,
  price_in: 1, price_out: 2, price_source: 'live', note: '', cautions: {}, labels: {}, cost: {}, ...extra,
});
const task = (extra: Partial<TaskRow> = {}): TaskRow => ({
  task: 'vision_front', title: 't', description: 'd', unit: 'работа', tokens: { input: 1, output: 1 }, needs_vision: true,
  default_volume: 1000, default_model: 'a/a', current_model: 'a/a', source: 'env', updated_by: null, updated_at: null,
  current_unit_cost: null, current_known: true, ...extra,
});

describe('форматирование и подсчёты', () => {
  it('rub: точность зависит от величины, нет цены — прочерк', () => {
    expect(rub(null)).toBe(DASH);
    expect(rub(undefined)).toBe(DASH);
    expect(rub(NaN)).toBe(DASH);
    expect(rub(0.0234).replace(/\s/g, '')).toBe('0,023₽');
    expect(rub(1.345).replace(/\s/g, '')).toBe('1,35₽');
    expect(rub(12.34).replace(/\s/g, '')).toBe('12,3₽');
    expect(rub(12800).replace(/\s/g, '')).toBe('12800₽');
  });

  it('monthlyCost: цена × объём, без цены — null, отрицательный объём — 0', () => {
    expect(monthlyCost(1.5, 1000)).toBe(1500);
    expect(monthlyCost(null, 1000)).toBeNull();
    expect(monthlyCost(1.5, -5)).toBe(0);
  });

  it('parseVolume: целое ≥ 0, пробелы и запятая допустимы, мусор → 0', () => {
    expect(parseVolume('10 000')).toBe(10000);
    expect(parseVolume('12,7')).toBe(12);
    expect(parseVolume('abc')).toBe(0);
    expect(parseVolume('-4')).toBe(0);
    expect(parseVolume('')).toBe(0);
    expect(parseVolume('9'.repeat(15))).toBe(100_000_000);
  });
});

describe('подбор моделей под задачу', () => {
  it('модель без картинок не подходит для задач со зрением', () => {
    expect(unsuitableReason(model('x', { vision: false }), task())).toMatch(/изображен/);
    expect(unsuitableReason(model('x', { vision: false }), task({ needs_vision: false }))).toBeNull();
    expect(unsuitableReason(model('x'), task())).toBeNull();
  });

  it('modelsForTask: рекомендованные первыми, затем по цене, без цены — в конце', () => {
    const list = [
      model('cheap', { cost: { vision_front: 0.1 } }),
      model('best', { cost: { vision_front: 2 }, labels: { vision_front: ['best'] } }),
      model('unknown', { cost: { vision_front: null } }),
      model('mid', { cost: { vision_front: 0.5 } }),
    ];
    expect(modelsForTask(list, 'vision_front').map(m => m.id)).toEqual(['best', 'cheap', 'mid', 'unknown']);
  });

  it('previewWarnings: предупреждение по задаче и общее', () => {
    const m = model('x', { cautions: { vision_front: 'по задаче', '*': 'общее' } });
    expect(previewWarnings(m, 'vision_front')).toEqual(['по задаче', 'общее']);
    expect(previewWarnings(m, 'chat')).toEqual(['общее']);
    expect(previewWarnings(undefined, 'chat')).toEqual([]);
  });

  it('planTotal: сумма по выбранным моделям, задачи без цены считаются отдельно', () => {
    const catalog = [model('a', { cost: { vision_front: 1, chat: 0.01 } }), model('b', { cost: { vision_front: null } })];
    const result = planTotal([
      { task: 'vision_front', model: 'a', volume: 1000 },
      { task: 'chat', model: 'a', volume: 10000 },
      { task: 'vision_front', model: 'b', volume: 500 },
      { task: 'bulk', model: 'вне списка', volume: 5 },
    ], catalog);
    expect(result.total).toBeCloseTo(1100);
    expect(result.unknown).toBe(2);
  });

  it('priceNote объясняет нестандартный источник цены', () => {
    expect(priceNote(model('x'))).toBeNull();
    expect(priceNote(model('x', { price_source: 'snapshot' }))).toMatch(/снимк/);
    expect(priceNote(model('x', { price_source: 'ru' }))).toMatch(/россий/);
    expect(priceNote(model('x', { price_source: 'unknown' }))).toMatch(/не публикуется/);
  });
});

describe('запросы к /api/admin/ai-models', () => {
  const reply = (ok: boolean, status: number, body: any) => ({ ok, status, json: async () => body });
  beforeEach(() => (fetchWithAuth as jest.Mock).mockReset());

  it('загрузка, сохранение, сброс и обновление цен используют нужные адреса и методы', async () => {
    (fetchWithAuth as jest.Mock).mockResolvedValue(reply(true, 200, { tasks: [] }));
    await loadAiModels('ru-only');
    await saveAiModel('chat', 'google/gemini-3.8-flash', 'global');
    await resetAiModel('chat', 'global');
    await refreshAiCatalog('global');
    const calls = (fetchWithAuth as jest.Mock).mock.calls;
    expect(calls[0][0]).toBe('/api/admin/ai-models?mode=ru-only');
    expect(calls[1][0]).toBe('/api/admin/ai-models/chat');
    expect(calls[1][1].method).toBe('PUT');
    expect(JSON.parse(calls[1][1].body)).toEqual({ model: 'google/gemini-3.8-flash', mode: 'global' });
    expect(calls[2][0]).toBe('/api/admin/ai-models/chat?mode=global');
    expect(calls[2][1].method).toBe('DELETE');
    expect(calls[3][0]).toBe('/api/admin/ai-models/refresh-catalog?mode=global');
  });

  it('ошибка сервера приходит сообщением из ответа; без тела — код статуса', async () => {
    (fetchWithAuth as jest.Mock).mockResolvedValueOnce(reply(false, 422, { error: 'Алиасы «latest» не допускаются' }));
    await expect(saveAiModel('chat', '~x', 'global')).rejects.toThrow('Алиасы «latest» не допускаются');
    (fetchWithAuth as jest.Mock).mockResolvedValueOnce({ ok: false, status: 503, json: async () => { throw new Error('no body'); } });
    await expect(loadAiModels('global')).rejects.toThrow('Ошибка 503');
  });
});
