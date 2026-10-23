jest.mock('../../frontend/src/services/api', () => ({ fetchWithAuth: jest.fn() }));
import { fetchWithAuth } from '../../frontend/src/services/api';
import {
  ApiProblem, applyForAuction, bidsCount, clockOffset, describeBid, formatKop, formatMoment, formatRemaining, getLot, listAuctions, lotImage, lotTitle, myStatus,
  newRequestId, parseAmount, placeBid, pollLot, remainingMs,
} from '../../frontend/src/lib/bidding';
import * as admin from '../../frontend/src/lib/biddingAdmin';

const mocked = fetchWithAuth as jest.Mock;
const reply = (ok: boolean, status: number, body: any) => ({ ok, status, json: async () => body });
beforeEach(() => mocked.mockReset());

describe('суммы', () => {
  it('formatKop: рубли с неразрывными пробелами, копейки только если есть, пусто — прочерк', () => {
    expect(formatKop(1_234_500)).toBe('12 345 ₽');
    expect(formatKop(1_234_550)).toBe('12 345,50 ₽');
    expect(formatKop(0)).toBe('0 ₽');
    expect([formatKop(null), formatKop(undefined), formatKop(NaN)]).toEqual(['—', '—', '—']);
  });

  it.each([['20 000', 20000], ['20000,50', 20000.5], ['20000.5', 20000.5], ['  15 ', 15], ['1 000', 1000]])('parseAmount(%p) = %p', (input, rub) => {
    expect(parseAmount(input)).toBe(rub);
  });
  it.each([[''], ['abc'], ['0'], ['-5'], ['1,234'], ['1e5'], ['2000000000'], ['12 3x']])('parseAmount(%p) отклоняется', input => {
    expect(parseAmount(input)).toBeNull();
  });
});

describe('время', () => {
  it('сдвиг серверных часов и остаток времени считаются по серверу, а не по часам клиента', () => {
    const clientNow = Date.parse('2026-10-23T12:00:00Z');
    const offset = clockOffset('2026-10-23T12:05:00Z', clientNow);              // клиентские часы отстают на 5 минут
    expect(offset).toBe(5 * 60_000);
    expect(remainingMs('2026-10-23T12:10:00Z', offset, clientNow)).toBe(5 * 60_000);
    expect(remainingMs('2026-10-23T12:00:00Z', offset, clientNow)).toBe(0);     // уже вышло — не отрицательное
    expect(remainingMs(null, 0)).toBeNull();
    expect(remainingMs('мусор', 0)).toBeNull();
    expect(clockOffset('мусор')).toBe(0);
  });

  it('formatRemaining: сутки, часы, конец', () => {
    expect(formatRemaining(93_784_000)).toBe('1 д 02:03:04');
    expect(formatRemaining(59_000)).toBe('00:00:59');
    expect(formatRemaining(500)).toBe('00:00:01');                                // округление вверх: «00:00:00» до конца не бывает
    expect(formatRemaining(0)).toBe('завершён');
    expect(formatRemaining(null)).toBe('—');
  });

  it('formatMoment: по Москве с пометкой', () => {
    expect(formatMoment('2026-12-01T15:00:00Z')).toMatch(/1 декабря 2026.*18:00 МСК/);
    expect(formatMoment(null)).toBe('—');
    expect(formatMoment('не дата')).toBe('—');
  });

  it('moscowToIso: значение поля даты → ISO со смещением +03:00', () => {
    expect(admin.moscowToIso('2026-12-01T18:00')).toBe('2026-12-01T18:00:00+03:00');
    expect(admin.moscowToIso('')).toBeNull();
    expect(admin.moscowToIso('2026-12-01')).toBeNull();
  });
});

describe('положение участника и подписи', () => {
  const lot = (mine: any) => ({ mine, snapshot: { title: 'Пейзаж', thumbnail_url: 't.jpg', image_url: 'i.jpg' }, lot_no: 3 });
  it('myStatus: нет ставок — null; лидер; перебит', () => {
    expect(myStatus({})).toBeNull();
    expect(myStatus(lot({ leading: false, my_max_kop: null }))).toBeNull();
    expect(myStatus(lot({ leading: true, my_max_kop: 100 }))).toBe('leading');
    expect(myStatus(lot({ leading: false, my_max_kop: 100 }))).toBe('outbid');
  });

  it('названия и картинка с запасными вариантами', () => {
    expect(lotTitle(lot(undefined) as any)).toBe('Пейзаж');
    expect(lotTitle({ snapshot: {}, lot_no: 3 } as any)).toBe('Лот 3');
    expect(lotImage(lot(undefined) as any)).toBe('t.jpg');
    expect(lotImage({ snapshot: {} } as any)).toBeNull();
  });

  it('describeBid: лидер, перебит автоматически, повтор', () => {
    expect(describeBid({ status: 'accepted', leader: true, price_kop: 2_200_000 })).toEqual({ tone: 'good', text: expect.stringMatching(/лидируете.*22 000 ₽/) });
    expect(describeBid({ status: 'accepted', leader: false, price_kop: 2_200_000, extended: true }).text).toMatch(/опередил.*Торги продлены/);
    expect(describeBid({ status: 'duplicate' }).text).toMatch(/уже была принята/);
  });

  it('newRequestId: UUID v4, разные при каждом вызове, работает и без crypto', () => {
    const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    const a = newRequestId(), b = newRequestId();
    expect([a, b].every(x => uuid.test(x))).toBe(true);
    expect(a).not.toBe(b);
    const original = (globalThis as any).crypto;
    Object.defineProperty(globalThis, 'crypto', { value: undefined, configurable: true });
    try { expect(uuid.test(newRequestId())).toBe(true); } finally { Object.defineProperty(globalThis, 'crypto', { value: original, configurable: true }); }
  });
});

describe('склонение', () => {
  it.each([[0, '0 ставок'], [1, '1 ставка'], [2, '2 ставки'], [4, '4 ставки'], [5, '5 ставок'], [11, '11 ставок'], [12, '12 ставок'], [21, '21 ставка'], [22, '22 ставки'], [111, '111 ставок'], [101, '101 ставка']])('%p → %p', (n, text) => {
    expect(bidsCount(n)).toBe(text);
  });
});

describe('запросы', () => {
  it('ставка уходит с максимумом в рублях, request_id и версией; ошибка сервера несёт код и минимум', async () => {
    mocked.mockResolvedValueOnce(reply(true, 200, { status: 'accepted', leader: true }));
    await placeBid(5, 25000.5, 'req-1', 7);
    const [url, init] = mocked.mock.calls[0];
    expect(url).toBe('/api/bidding/lots/5/bids');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({ max_rub: 25000.5, request_id: 'req-1', expected_version: 7 });

    mocked.mockResolvedValueOnce(reply(false, 422, { error: 'Ставка ниже минимально допустимой.', code: 'below_minimum', min_bid_kop: 1_100_000 }));
    const error = await placeBid(5, 1, 'req-2').catch(e => e as ApiProblem);
    expect(error).toBeInstanceOf(ApiProblem);
    expect(error).toMatchObject({ status: 422, code: 'below_minimum', minBidKop: 1_100_000, message: 'Ставка ниже минимально допустимой.' });
    expect(JSON.parse(mocked.mock.calls[1][1].body)).not.toHaveProperty('expected_version');
  });

  it('ошибки: вход, права, сбой сервера без подробностей', async () => {
    mocked.mockResolvedValueOnce(reply(false, 401, { error: 'Access token required' }));
    await expect(placeBid(1, 1, 'r')).rejects.toThrow('Войдите в аккаунт');
    mocked.mockResolvedValueOnce(reply(false, 500, { error: 'relation "x" does not exist' }));
    await expect(listAuctions()).rejects.toThrow('Не удалось загрузить аукционы.');
    mocked.mockResolvedValueOnce({ ok: false, status: 502, json: async () => { throw new Error('нет тела'); } });
    await expect(getLot(1)).rejects.toThrow('Не удалось загрузить лот.');
  });

  it('опрос состояния передаёт версию; заявка — тело; кабинет куратора — свои адреса', async () => {
    mocked.mockResolvedValue(reply(true, 200, { changed: false }));
    await pollLot(9, 4);
    expect(mocked.mock.calls[0][0]).toBe('/api/bidding/lots/9/state?since=4');
    await applyForAuction('spring-2027', { kind: 'person', full_name: 'Иван', phone: '+79000000000', rules_accepted: true });
    expect(mocked.mock.calls[1][0]).toBe('/api/bidding/auctions/spring-2027/apply');
    await admin.decideRegistration(3, 8, true, 50000);
    expect(mocked.mock.calls[2][0]).toBe('/api/bidding/admin/auctions/3/registrations/8/decision');
    expect(JSON.parse(mocked.mock.calls[2][1].body)).toMatchObject({ approve: true, limit_rub: 50000 });
    await admin.verifyChain(-3);
    expect(mocked.mock.calls[3][0]).toBe('/api/bidding/admin/chains/-3/verify');
    await admin.setKyc(8, 'rejected', 'нечитаемо');
    expect(JSON.parse(mocked.mock.calls[4][1].body)).toEqual({ status: 'rejected', note: 'нечитаемо' });
  });

  it('кабинет куратора: права и текст ошибки', async () => {
    mocked.mockResolvedValueOnce(reply(false, 403, {}));
    await expect(admin.adminAuctions()).rejects.toThrow('Недостаточно прав.');
    mocked.mockResolvedValueOnce(reply(false, 409, { error: 'Объявить можно только черновик.', code: 'not_draft' }));
    await expect(admin.announceAuction(1)).rejects.toMatchObject({ message: 'Объявить можно только черновик.', code: 'not_draft' });
  });
});
