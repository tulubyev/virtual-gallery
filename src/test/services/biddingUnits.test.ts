// Разбор входных данных торгов, ограничение частоты ставок и воркер — без БД.
import { createBidLimiter } from '../../middleware/bidLimiter';
import { bidRejection, intInRange, isSlug, isUuid, parseId, parseInstant, parseRub, text } from '../../services/biddingInput';
import { startBiddingWorker } from '../../services/biddingWorker';

describe('parseRub: рубли → копейки', () => {
  it.each([[100, 10000], ['100', 10000], ['1 234'.replace(' ', ''), 123400], ['20000,50', 2000050], [0.1, 10], ['0.01', 1], [1_000_000_000, 100_000_000_000]])('%p → %p', (input, kop) => {
    expect(parseRub(input)).toBe(kop);
  });
  it.each([[0], [-1], ['abc'], [''], [null], [undefined], [1.005], ['1e3'], [1_000_000_001], ['1 000'], [NaN], [Infinity], [{}], [[5]]])('отклоняет %p', input => {
    expect(parseRub(input)).toBeNull();
  });
});

describe('прочие разборщики', () => {
  it('uuid, slug, id, целые, текст', () => {
    expect(isUuid('123e4567-e89b-42d3-a456-426614174000')).toBe(true);
    expect(isUuid('123e4567-e89b-42d3-a456-42661417400')).toBe(false);
    expect(isUuid(5)).toBe(false);
    expect(['ab', 'spring-2026', 'a-b-c'].every(isSlug)).toBe(true);
    expect(['a', '-ab', 'Ab', 'a b', 'ы', 'x'.repeat(80), '../x'].some(isSlug)).toBe(false);
    expect(parseId('15')).toBe(15);
    expect([parseId('0'), parseId('-1'), parseId('1.5'), parseId('abc'), parseId(null), parseId('9'.repeat(16))]).toEqual([null, null, null, null, null, null]);
    expect(intInRange('5', 1, 10)).toBe(5);
    expect([intInRange(11, 1, 10), intInRange('x', 1, 10), intInRange(1.5, 1, 10), intInRange(null, 1, 10)]).toEqual([null, null, null, null]);
    expect(text('  привет ', 10)).toBe('привет');
    expect([text('', 10), text('   ', 10), text('x'.repeat(11), 10), text(5, 10)]).toEqual([null, null, null, null]);
  });

  it('даты — только со смещением, результат в UTC', () => {
    expect(parseInstant('2026-12-01T18:00:00+03:00')).toBe('2026-12-01T15:00:00.000Z');
    expect(parseInstant('2026-12-01T18:00Z')).toBe('2026-12-01T18:00:00.000Z');
    expect([parseInstant('2026-12-01T18:00:00'), parseInstant('2026-12-01'), parseInstant('вчера'), parseInstant(5), parseInstant('2026-13-45T10:00:00Z')]).toEqual([null, null, null, null, null]);
  });

  it('каждому коду отказа ставки соответствует статус и сообщение; неизвестный — общий отказ', () => {
    expect(bidRejection('below_minimum')[0]).toBe(422);
    expect(bidRejection('stale')[0]).toBe(409);
    expect(bidRejection('not_admitted')[0]).toBe(403);
    expect(bidRejection('что-то новое')).toEqual([422, 'Ставка не принята.']);
  });
});

describe('ограничитель частоты ставок', () => {
  const run = (limiter: any, userId: number | undefined) => {
    const res: any = { headers: {} as Record<string, string>, setHeader(k: string, v: string) { this.headers[k] = v; }, status(c: number) { this.code = c; return this; }, json(b: any) { this.body = b; } };
    const next = jest.fn();
    limiter({ user: userId ? { user_id: userId } : undefined }, res, next);
    return { res, passed: next.mock.calls.length === 1 };
  };

  it('пропускает limit запросов за окно, потом 429 с Retry-After; окно и пользователи независимы', () => {
    let t = 0;
    const limiter = createBidLimiter({ limit: 3, windowMs: 1000, now: () => t });
    expect([1, 2, 3].every(() => run(limiter, 7).passed)).toBe(true);
    const blocked = run(limiter, 7);
    expect(blocked.passed).toBe(false);
    expect(blocked.res).toMatchObject({ code: 429, body: { code: 'BID_RATE' } });
    expect(blocked.res.headers['Retry-After']).toBe('1');
    expect(run(limiter, 8).passed).toBe(true);
    t = 1001;
    expect(run(limiter, 7).passed).toBe(true);
  });

  it('без пользователя не мешает (доступ решает политика)', () => {
    expect(run(createBidLimiter({ limit: 1 }), undefined).passed).toBe(true);
  });
});

describe('воркер торгов', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('вызывает проход раз в интервал, пишет в журнал открытие и закрытие, останавливается', async () => {
    const run = jest.fn(async () => ({ opened: [3], closed: [{ lot_id: 9, outcome: 'sold' }] }));
    const log = jest.fn();
    const worker = startBiddingWorker({ intervalMs: 1000, run, log });
    await jest.advanceTimersByTimeAsync(2100);
    expect(run).toHaveBeenCalledTimes(2);
    expect(log).toHaveBeenCalledWith('торги открыты: аукционы 3');
    expect(log).toHaveBeenCalledWith('лот 9 закрыт: sold');
    worker.stop();
    await jest.advanceTimersByTimeAsync(5000);
    expect(run).toHaveBeenCalledTimes(2);
  });

  it('нет таблиц (миграция не применена): одно сообщение и пауза в минуту; другие сбои не останавливают воркер', async () => {
    const missing = Object.assign(new Error('relation does not exist'), { code: '42P01' });
    const run = jest.fn().mockRejectedValue(missing);
    const log = jest.fn();
    const worker = startBiddingWorker({ intervalMs: 1000, run, log });
    await jest.advanceTimersByTimeAsync(1100);
    await jest.advanceTimersByTimeAsync(30_000);
    expect(run).toHaveBeenCalledTimes(1);
    await jest.advanceTimersByTimeAsync(31_000);
    expect(run).toHaveBeenCalledTimes(2);
    expect(log).toHaveBeenCalledTimes(1);
    worker.stop();

    const errors = jest.spyOn(console, 'error').mockImplementation(() => {});
    const flaky = jest.fn().mockRejectedValueOnce(new Error('connection reset')).mockResolvedValue({ opened: [], closed: [] });
    const second = startBiddingWorker({ intervalMs: 1000, run: flaky, log });
    await jest.advanceTimersByTimeAsync(7000);
    expect(flaky.mock.calls.length).toBeGreaterThanOrEqual(2);
    expect(errors).toHaveBeenCalled();
    second.stop();
    errors.mockRestore();
  });
});
