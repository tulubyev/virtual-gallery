jest.mock('../../frontend/src/services/api', () => ({ fetchWithAuth: jest.fn() }));
import { fmt, changeText, ago, DASH } from '../../frontend/src/lib/dashboardStats';

describe('форматирование для дашбордов', () => {
  it('fmt: нет данных — прочерк, большие числа сокращаются', () => {
    expect(fmt(null)).toBe(DASH);
    expect(fmt(undefined)).toBe(DASH);
    expect(fmt(NaN)).toBe(DASH);
    expect(fmt(0)).toBe('0');
    expect(fmt(1_500_000)).toBe('1,5 млн');
    expect(fmt(1234).replace(/\s/g, '')).toBe('1234');
  });

  it('changeText: процент к предыдущим 30 дням, а не выдуманный рост', () => {
    expect(changeText(null)).toEqual({ text: 'нет данных', trend: 'flat' });
    expect(changeText({ total: 5, last30: 0, prev30: 0 }).trend).toBe('flat');
    expect(changeText({ total: 9, last30: 3, prev30: 0 })).toEqual({ text: '+3 за 30 дней', trend: 'up' });
    expect(changeText({ total: 9, last30: 6, prev30: 4 })).toEqual({ text: '+50% за 30 дней', trend: 'up' });
    expect(changeText({ total: 9, last30: 1, prev30: 4 })).toEqual({ text: '-75% за 30 дней', trend: 'down' });
  });

  it('ago: относительное время', () => {
    const now = Date.parse('2026-06-10T12:00:00Z');
    expect(ago('2026-06-10T11:59:50Z', now)).toBe('только что');
    expect(ago('2026-06-10T11:30:00Z', now)).toBe('30 мин назад');
    expect(ago('2026-06-10T09:00:00Z', now)).toBe('3 ч назад');
    expect(ago('2026-06-09T09:00:00Z', now)).toBe('вчера');
    expect(ago('мусор', now)).toBe(DASH);
  });
});
