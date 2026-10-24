// API торгов (/api/bidding) целиком: настоящая политика доступа (JWT), маршруты и PostgreSQL.
import { randomUUID } from 'crypto';
import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { describeDb, createHarness, Harness } from './biddingHarness';

const mockDb: { pool: any } = { pool: null };
jest.mock('../../config/database', () => ({
  __esModule: true,
  default: { query: (...args: any[]) => mockDb.pool.query(...args), connect: () => mockDb.pool.connect() },
}));

const SECRET = 'bidding_api_test_secret_0123456789abcdef0123';
process.env.JWT_SECRET = SECRET;

import { accessControl } from '../../middleware/accessPolicy';
import biddingRouter from '../../routes/bidding';
import { tick } from '../../services/bidding';
import { getLegalDoc } from '../../services/legalDocs';

describeDb('API торгов (PostgreSQL)', () => {
  let h: Harness;
  let app: express.Application;
  let curator: number, alice: number, bob: number, stranger: number, plain: number;
  const token = (id: number) => `Bearer ${jwt.sign({ userId: id }, SECRET, { expiresIn: '1h' })}`;
  const as = (id: number | null) => (id === null ? {} : { Authorization: token(id) });
  const api = {
    get: (path: string, who: number | null = null) => request(app).get(`/api/bidding${path}`).set(as(who)),
    post: (path: string, body: object, who: number | null = null) => request(app).post(`/api/bidding${path}`).set(as(who)).send(body),
    patch: (path: string, body: object, who: number | null = null) => request(app).patch(`/api/bidding${path}`).set(as(who)).send(body),
  };

  beforeAll(async () => {
    h = await createHarness();
    mockDb.pool = h.pool;
    await h.reset();
    app = express();
    app.use(express.json());
    app.use('/api', accessControl);
    app.use('/api/bidding', biddingRouter);
    curator = await h.user('curator', 'curator');
    [alice, bob, stranger, plain] = [await h.user('alice'), await h.user('bob'), await h.user('stranger'), await h.user('plain')];
    process.env.BIDDING_ALLOW_DRAFT_RULES = 'true';
    jest.spyOn(console, 'error').mockImplementation((...a) => { if (process.env.DEBUG_BIDDING) process.stderr.write(a.join(' ') + '\n'); });
  });
  afterAll(async () => { await h.close(); });

  // Заявка с актуальными версиями документов; черновики разрешены флагом (в проде без него заявки не принимаются)
  const profile = {
    kind: 'person', full_name: 'Иван Иванов', phone: '+7 900 000-00-00',
    rules_accepted: true, rules_version: getLegalDoc('auction-rules')!.ref, pd_consent: true, pd_version: getLegalDoc('pd-consent')!.ref,
  };
  const inFuture = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString();

  /** Аукцион, созданный через API куратора: объявлен, торги открыты (время сдвинуто напрямую в БД). */
  async function liveAuction(opts: { lots?: object[]; patch?: object; registrationClosesAt?: string } = {}) {
    const slug = `api-${randomUUID().slice(0, 8)}`;
    const created = await api.post('/admin/auctions', {
      slug, title: 'Весенний аукцион', description: 'Описание', notice_days: 0, bidding_opens_at: inFuture(1), first_close_at: inFuture(2),
      hard_close_at: inFuture(3), min_bidders: 2, ...(opts.registrationClosesAt ? { registration_closes_at: opts.registrationClosesAt } : {}), ...(opts.patch ?? {}),
    }, curator);
    expect(created.status).toBe(201);
    const auctionId: number = created.body.auction_id;
    const lotIds: number[] = [];
    for (const lot of opts.lots ?? [{ title: 'Пейзаж', artist_name: 'Автор', start_price_rub: 10000, estimate_high_rub: 60000, seller_user_id: stranger }]) {
      const res = await api.post(`/admin/auctions/${auctionId}/lots`, lot, curator);
      expect(res.status).toBe(201);
      lotIds.push(res.body.lot_id);
    }
    const announced = await api.post(`/admin/auctions/${auctionId}/announce`, {}, curator);
    expect(announced.status).toBe(200);
    await h.q(`UPDATE bidding_auctions SET bidding_opens_at = now() - interval '1 minute' WHERE auction_id = $1`, [auctionId]);
    await tick();
    return { slug, auctionId, lotIds };
  }

  /** Допустить участника: заявка → проверка личности → решение куратора. */
  async function admit(slug: string, auctionId: number, userId: number, limitRub = 500000) {
    expect((await api.post(`/auctions/${slug}/apply`, profile, userId)).status).toBe(201);
    expect((await api.post(`/admin/participants/${userId}/kyc`, { status: 'approved' }, curator)).status).toBe(200);
    const decision = await api.post(`/admin/auctions/${auctionId}/registrations/${userId}/decision`, { approve: true, limit_rub: limitRub }, curator);
    expect(decision.status).toBe(200);
    return decision.body;
  }
  const bid = (lotId: number, who: number | null, amount: number | string, extra: object = {}) =>
    api.post(`/lots/${lotId}/bids`, { max_rub: amount, request_id: randomUUID(), ...extra }, who);

  describe('доступ', () => {
    it('управление — только куратору и администратору; ставки и заявки — только вошедшим; чтение открыто', async () => {
      expect((await api.get('/admin/auctions', null)).status).toBe(401);
      expect((await api.get('/admin/auctions', alice)).status).toBe(403);
      expect((await api.get('/admin/auctions', curator)).status).toBe(200);
      expect((await api.post('/admin/auctions', { title: 'x', slug: 'xx' }, alice)).status).toBe(403);
      expect((await api.post('/lots/1/bids', { max_rub: 1, request_id: randomUUID() }, null)).status).toBe(401);
      expect((await api.post('/auctions/some-slug/apply', profile, null)).status).toBe(401);
      expect((await api.get('/me/registrations', null)).status).toBe(401);
      expect((await api.get('/auctions', null)).status).toBe(200);
      expect((await api.get('/unknown-path', null)).status).toBe(401);                      // неописанное — после входа
    });
  });

  describe('создание и объявление', () => {
    it('куратор создаёт аукцион, лоты (по описанию и по произведению), объявляет; плохие данные отклоняются', async () => {
      const [{ artwork_id }] = await h.q(`INSERT INTO artworks (title) VALUES ('Из каталога') RETURNING artwork_id`);
      const slug = `draft-${randomUUID().slice(0, 6)}`;
      expect((await api.post('/admin/auctions', { slug: 'Плохой', title: 't' }, curator)).status).toBe(400);
      expect((await api.post('/admin/auctions', { title: 'без адреса' }, curator)).status).toBe(400);
      expect((await api.post('/admin/auctions', { slug, title: 't', bidding_opens_at: '2026-12-01 18:00' }, curator)).status).toBe(400);   // нет смещения
      expect((await api.post('/admin/auctions', { slug, title: 't', min_bidders: 0 }, curator)).status).toBe(400);
      const created = await api.post('/admin/auctions', { slug, title: 'Черновик', bidding_opens_at: '2026-12-01T18:00:00+03:00', notice_days: 0 }, curator);   // смещение допустимо
      expect(created.status).toBe(201);
      const id = created.body.auction_id;
      expect((await api.patch(`/admin/auctions/${id}`, { bidding_opens_at: inFuture(9), first_close_at: inFuture(10), hard_close_at: inFuture(11), title: 'Новое название' }, curator)).status).toBe(200);
      expect((await api.get(`/admin/auctions/${id}`, curator)).body.auction).toMatchObject({ title: 'Новое название', slug });

      expect((await api.post(`/admin/auctions/${id}/lots`, { start_price_rub: 100 }, curator)).status).toBe(400);              // нет названия
      expect((await api.post(`/admin/auctions/${id}/lots`, { title: 'x', start_price_rub: 100, reserve_rub: 50 }, curator)).status).toBe(400);
      expect((await api.post(`/admin/auctions/${id}/lots`, { title: 'x', start_price_rub: 'много' }, curator)).status).toBe(400);
      expect((await api.post(`/admin/auctions/${id}/lots`, { artwork_id: 999999, start_price_rub: 100 }, curator)).status).toBe(404);
      const byArtwork = await api.post(`/admin/auctions/${id}/lots`, { artwork_id, start_price_rub: 1500.5 }, curator);
      expect(byArtwork.status).toBe(201);
      const full = (await api.get(`/admin/auctions/${id}`, curator)).body;
      expect(full.lots[0]).toMatchObject({ snapshot: { title: 'Из каталога' }, start_price_kop: 150050 });

      // черновик не виден публике
      expect((await api.get(`/auctions/${slug}`, null)).status).toBe(404);
      expect((await api.get('/auctions', null)).body.auctions.map((a: any) => a.slug)).not.toContain(slug);

      const announced = await api.post(`/admin/auctions/${id}/announce`, {}, curator);
      expect(announced.status).toBe(200);
      expect((await api.post(`/admin/auctions/${id}/announce`, {}, curator)).body).toMatchObject({ code: 'not_draft' });
      expect((await api.patch(`/admin/auctions/${id}`, { title: 'после объявления' }, curator)).status).toBe(409);
      expect((await api.post(`/admin/auctions/${id}/lots`, { title: 'поздно', start_price_rub: 100 }, curator)).status).toBe(409);
      expect((await api.get(`/auctions/${slug}`, null)).status).toBe(200);
    });

    it('срок извещения короче notice_days — понятный отказ', async () => {
      const slug = `short-${randomUUID().slice(0, 6)}`;
      const created = await api.post('/admin/auctions', { slug, title: 't', bidding_opens_at: inFuture(5), first_close_at: inFuture(6), hard_close_at: inFuture(7) }, curator);
      await api.post(`/admin/auctions/${created.body.auction_id}/lots`, { title: 'x', start_price_rub: 100 }, curator);
      const res = await api.post(`/admin/auctions/${created.body.auction_id}/announce`, {}, curator);
      expect(res.status).toBe(409);
      expect(res.body).toMatchObject({ code: 'notice_too_short', notice_days: 30 });
      expect(res.body.error).toMatch(/извещени/);
    });
  });

  describe('публичные данные', () => {
    it('в ответах нет резерва, максимумов, идентификаторов пользователей и продавца; участники — под номерами', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      await admit(slug, auctionId, bob);
      await bid(lotIds[0], alice, 40000);
      await bid(lotIds[0], bob, 20000);
      const responses = [await api.get(`/auctions/${slug}`, null), await api.get(`/lots/${lotIds[0]}`, null), await api.get(`/lots/${lotIds[0]}/state`, null),
        await api.get('/auctions', null)];
      for (const res of responses) {
        expect(res.status).toBe(200);
        const body = JSON.stringify(res.body);
        for (const secret of ['reserve', 'leader_max', 'seller_user_id', 'leader_user_id', 'winner_user_id', 'email', 'full_name', 'phone', 'max_kop']) {
          expect(body).not.toContain(secret);
        }
      }
      const lot = responses[1].body.lot;
      expect(lot).toMatchObject({ bid_count: 2, leader_pseudonym: 1, state: 'open', start_price_kop: 1_000_000, current_price_kop: 2_200_000, min_next_bid_kop: 2_400_000 });
      expect(responses[1].body.history.map((b: any) => b.pseudonym)).toEqual([2, 1]);              // новые сверху, номера, а не пользователи
      expect(typeof responses[1].body.server_time).toBe('string');
    });

    it('вошедший видит своё положение на лоте; гость — нет', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      await admit(slug, auctionId, bob);
      await bid(lotIds[0], alice, 30000);
      await bid(lotIds[0], bob, 15000);
      expect((await api.get(`/lots/${lotIds[0]}`, alice)).body.lot.mine).toEqual({ leading: true, my_max_kop: 3_000_000 });
      expect((await api.get(`/lots/${lotIds[0]}`, bob)).body.lot.mine).toEqual({ leading: false, my_max_kop: 1_500_000 });
      expect((await api.get(`/lots/${lotIds[0]}`, null)).body.lot.mine).toBeUndefined();
    });

    it('опрос состояния: без изменений — короткий ответ, после ставки — новое состояние', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      const first = (await api.get(`/lots/${lotIds[0]}/state`, null)).body;
      expect(first.changed).toBe(true);
      const same = await api.get(`/lots/${lotIds[0]}/state?since=${first.lot.version}`, null);
      expect(same.body).toMatchObject({ changed: false, version: first.lot.version });
      expect(same.body.lot).toBeUndefined();
      await bid(lotIds[0], alice, 20000);
      const after = await api.get(`/lots/${lotIds[0]}/state?since=${first.lot.version}`, null);
      expect(after.body).toMatchObject({ changed: true, lot: { bid_count: 1 } });
    });

    it('несуществующие и неверные идентификаторы дают 404', async () => {
      expect((await api.get('/lots/999999', null)).status).toBe(404);
      expect((await api.get('/lots/abc', alice)).status).toBe(404);
      expect((await api.get('/auctions/net-takogo', null)).status).toBe(404);
      expect((await api.get('/auctions/BAD SLUG', null)).status).toBe(404);
    });
  });

  describe('заявка и допуск', () => {
    it('заявка → проверка личности → решение куратора; участник видит своё положение и номер', async () => {
      const { slug, auctionId } = await liveAuction();
      const applied = await api.post(`/auctions/${slug}/apply`, profile, plain);
      expect(applied.status).toBe(201);
      expect(applied.body).toMatchObject({ status: 'applied', pseudonym_no: null });
      expect((await api.get('/admin/participants/pending', curator)).body.participants.map((p: any) => p.user_id)).toContain(plain);
      const premature = await api.post(`/admin/auctions/${auctionId}/registrations/${plain}/decision`, { approve: true, limit_rub: 100000 }, curator);
      expect(premature.status).toBe(409);
      expect(premature.body.code).toBe('kyc_not_approved');
      await api.post(`/admin/participants/${plain}/kyc`, { status: 'approved', note: 'паспорт проверен' }, curator);
      const noLimit = await api.post(`/admin/auctions/${auctionId}/registrations/${plain}/decision`, { approve: true }, curator);
      expect(noLimit.status).toBe(400);
      const ok = await api.post(`/admin/auctions/${auctionId}/registrations/${plain}/decision`, { approve: true, limit_rub: 100000 }, curator);
      expect(ok.body).toMatchObject({ status: 'approved', pseudonym_no: 1, limit_kop: 10_000_000 });
      const mine = (await api.get('/me/registrations', plain)).body.registrations;
      expect(mine[0]).toMatchObject({ slug, status: 'active', pseudonym_no: 1, kyc_status: 'approved', limit_kop: 10_000_000 });
      const list = (await api.get(`/admin/auctions/${auctionId}/registrations`, curator)).body.registrations;
      expect(list[0]).toMatchObject({ user_id: plain, full_name: 'Иван Иванов', status: 'active' });
    });

    it('заявка: нужны правила и корректные данные; закрытый приём и отклонённый участник — отказ; повторная заявка безвредна', async () => {
      const { slug } = await liveAuction();
      expect((await api.post(`/auctions/${slug}/apply`, { ...profile, rules_accepted: false }, bob)).status).toBe(400);
      expect((await api.post(`/auctions/${slug}/apply`, { ...profile, phone: 'не телефон' }, bob)).status).toBe(400);
      expect((await api.post(`/auctions/${slug}/apply`, { ...profile, kind: 'robot' }, bob)).status).toBe(400);
      expect((await api.post(`/auctions/no-such/apply`, profile, bob)).status).toBe(404);
      expect((await api.post(`/auctions/${slug}/apply`, profile, bob)).status).toBe(201);
      expect((await api.post(`/auctions/${slug}/apply`, profile, bob)).status).toBe(201);
      expect(Number((await h.q('SELECT count(*) AS n FROM bidding_registrations WHERE user_id = $1', [bob]))[0].n)).toBeGreaterThanOrEqual(1);

      const closed = await liveAuction({ registrationClosesAt: undefined });
      await h.q(`UPDATE bidding_auctions SET registration_closes_at = now() - interval '1 hour' WHERE auction_id = $1`, [closed.auctionId]);
      expect((await api.post(`/auctions/${closed.slug}/apply`, profile, alice)).status).toBe(409);

      await api.post(`/admin/participants/${bob}/kyc`, { status: 'rejected', note: 'документы не читаются' }, curator);
      const another = await liveAuction();
      expect((await api.post(`/auctions/${another.slug}/apply`, profile, bob)).status).toBe(403);
      await h.q(`UPDATE bidding_participants SET kyc_status = 'approved' WHERE user_id = $1`, [bob]);     // вернуть для следующих тестов
    });

    it('версии документов: заявка принимается только с актуальными версиями, утверждёнными в проде; принятые версии записываются', async () => {
      const { slug, auctionId } = await liveAuction();
      const stale = await api.post(`/auctions/${slug}/apply`, { ...profile, rules_version: '0.0#deadbeef' }, alice);
      expect(stale.status).toBe(409);
      expect(stale.body.code).toBe('rules_changed');
      expect((await api.post(`/auctions/${slug}/apply`, { ...profile, pd_version: 'x' }, alice)).body.code).toBe('pd_changed');
      expect((await api.post(`/auctions/${slug}/apply`, { ...profile, pd_consent: false }, alice)).body.code).toBe('pd_consent_required');
      expect((await api.post(`/auctions/${slug}/apply`, { ...profile, pd_consent: undefined }, alice)).status).toBe(400);
      expect((await api.post(`/auctions/${slug}/apply`, { ...profile, rules_accepted: false }, alice)).body.code).toBe('rules_required');

      // без флага черновики не принимаются: запуск с каркасом вместо правил невозможен
      delete process.env.BIDDING_ALLOW_DRAFT_RULES;
      try {
        const blocked = await api.post(`/auctions/${slug}/apply`, profile, alice);
        expect(blocked.status).toBe(503);
        expect(blocked.body.code).toBe('rules_not_approved');
      } finally { process.env.BIDDING_ALLOW_DRAFT_RULES = 'true'; }

      expect((await api.post(`/auctions/${slug}/apply`, profile, alice)).status).toBe(201);
      await api.post('/admin/participants/' + alice + '/kyc', { status: 'approved' }, curator);
      const row = (await api.get(`/admin/auctions/${auctionId}/registrations`, curator)).body.registrations[0];
      expect(row.rules_version).toBe(profile.rules_version);
      expect(row.pd_consent_version).toBe(profile.pd_version);
      expect(row.pd_consent_at).not.toBeNull();
    });

    it('отклонение заявки куратором: участник не может ставить', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      const rejected = await api.post(`/admin/auctions/${auctionId}/registrations/${alice}/decision`, { approve: false, reason: 'нет подтверждения' }, curator);
      expect(rejected.body).toMatchObject({ status: 'rejected_registration' });
      const res = await bid(lotIds[0], alice, 20000);
      expect(res.status).toBe(403);
      expect(res.body.code).toBe('not_admitted');
    });
  });

  describe('ставки', () => {
    it('принятая ставка: ответ с ценой, версией и минимальной следующей ставкой', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      const res = await bid(lotIds[0], alice, 30000);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ status: 'accepted', leader: true, price_kop: 1_000_000, min_next_bid_kop: 1_100_000 });
      expect(res.body.version).toBeGreaterThan(0);
    });

    it('проверка входа: сумма, request_id, версия', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      for (const amount of [0, -5, 'abc', '1e9', 1.234, 2_000_000_000, null, '']) {
        const res = await api.post(`/lots/${lotIds[0]}/bids`, { max_rub: amount, request_id: randomUUID() }, alice);
        expect(res.status).toBe(400);
      }
      expect((await api.post(`/lots/${lotIds[0]}/bids`, { max_rub: 20000 }, alice)).status).toBe(400);
      expect((await api.post(`/lots/${lotIds[0]}/bids`, { max_rub: 20000, request_id: 'не uuid' }, alice)).status).toBe(400);
      expect((await api.post(`/lots/${lotIds[0]}/bids`, { max_rub: 20000, request_id: randomUUID(), expected_version: 'x' }, alice)).status).toBe(400);
      expect((await api.post(`/lots/abc/bids`, { max_rub: 20000, request_id: randomUUID() }, alice)).status).toBe(403);   // не лот: политика доступа
      expect((await api.post(`/lots/999999/bids`, { max_rub: 20000, request_id: randomUUID() }, alice)).status).toBe(404);
      expect((await bid(lotIds[0], alice, '20 000,50')).status).toBe(400);
      expect((await bid(lotIds[0], alice, '20000,50')).status).toBe(200);                    // запятая как десятичный разделитель допустима
    });

    it('отказы с кодами: ниже минимума, сверх лимита, чужой/закрытый лот, продавец, устаревшая версия, слишком большая сумма', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice, 50000);
      await admit(slug, auctionId, bob, 2_000_000);
      const low = await bid(lotIds[0], alice, 9000);
      expect(low.status).toBe(422);
      expect(low.body).toMatchObject({ code: 'below_minimum', min_bid_kop: 1_000_000 });
      expect(low.body.error).toMatch(/ниже/);
      const over = await bid(lotIds[0], alice, 60000);
      expect(over.body).toMatchObject({ code: 'over_limit' });
      const high = await bid(lotIds[0], bob, 700000);                                   // > 10 × верхней оценки 60 000
      expect(high.body.code).toBe('suspiciously_high');
      await admit(slug, auctionId, stranger);                                           // продавец лота
      expect((await bid(lotIds[0], stranger, 20000)).body.code).toBe('seller_cannot_bid');
      const outsider = await bid(lotIds[0], plain, 20000);
      expect(outsider.status).toBe(403);
      const version = (await api.get(`/lots/${lotIds[0]}`, null)).body.lot.version;
      await bid(lotIds[0], alice, 20000);
      const stale = await bid(lotIds[0], bob, 40000, { expected_version: version });
      expect(stale.status).toBe(409);
      expect(stale.body).toMatchObject({ code: 'stale' });
      await h.q(`UPDATE bidding_lots SET ends_at = now() - interval '1 second' WHERE lot_id = $1`, [lotIds[0]]);
      expect((await bid(lotIds[0], bob, 40000)).status).toBe(409);
    });

    it('повтор запроса с тем же request_id возвращает тот же результат без новой ставки', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      const request_id = randomUUID();
      const first = await api.post(`/lots/${lotIds[0]}/bids`, { max_rub: 20000, request_id }, alice);
      const again = await api.post(`/lots/${lotIds[0]}/bids`, { max_rub: 20000, request_id }, alice);
      expect(first.body.status).toBe('accepted');
      expect(again.body).toMatchObject({ status: 'duplicate', accepted: true, bid_id: first.body.bid_id });
      expect((await api.get(`/lots/${lotIds[0]}`, null)).body.lot.bid_count).toBe(1);
    });

    it('ставит тот, кто вошёл: user_id из тела игнорируется', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      await admit(slug, auctionId, bob);
      await bid(lotIds[0], alice, 20000, { user_id: bob });
      expect((await api.get(`/lots/${lotIds[0]}`, alice)).body.lot.mine.leading).toBe(true);
      expect((await api.get(`/lots/${lotIds[0]}`, bob)).body.lot.mine.leading).toBe(false);
    });
  });

  describe('закрытие и журнал', () => {
    it('воркер закрывает лот; победитель известен под номером, молоток публичен; куратор видит все ставки и проверяет журнал', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      await admit(slug, auctionId, bob);
      await bid(lotIds[0], alice, 40000);
      await bid(lotIds[0], bob, 20000);
      await bid(lotIds[0], bob, 100);                                                   // отказ попадёт в журнал
      await h.q(`UPDATE bidding_lots SET ends_at = now() - interval '1 second' WHERE lot_id = $1`, [lotIds[0]]);
      const result = await tick();
      expect(result.closed).toEqual([{ lot_id: lotIds[0], outcome: 'sold' }]);
      const lot = (await api.get(`/lots/${lotIds[0]}`, null)).body.lot;
      expect(lot).toMatchObject({ state: 'sold_awaiting_payment', close_outcome: 'sold', hammer_kop: 2_200_000, winner_pseudonym: 1 });
      expect((await api.get(`/auctions/${slug}`, null)).body.auction.status).toBe('closed');

      const bids = (await api.get(`/admin/lots/${lotIds[0]}/bids`, curator)).body.bids;
      expect(bids.map((b: any) => [b.accepted, b.reject_reason])).toEqual([[true, null], [true, null], [false, 'below_minimum']]);
      expect(bids[0]).toMatchObject({ user_id: alice, max_kop: 4_000_000 });
      expect((await api.get(`/admin/chains/${lotIds[0]}/verify`, curator)).body).toMatchObject({ ok: true });
      expect((await api.get(`/admin/chains/${-auctionId}/verify`, curator)).body).toMatchObject({ ok: true });
      expect((await api.get('/admin/chains/0/verify', curator)).status).toBe(400);
      expect((await api.get('/admin/chains/abc/verify', curator)).status).toBe(400);
      expect((await api.get(`/admin/lots/${lotIds[0]}/bids`, alice)).status).toBe(403);
    });

    it('снятие лота: причина обязательна, ставки прекращаются', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      expect((await api.post(`/admin/lots/${lotIds[0]}/withdraw`, {}, curator)).status).toBe(400);
      expect((await api.post(`/admin/lots/${lotIds[0]}/withdraw`, { reason: 'владелец отозвал работу' }, curator)).status).toBe(200);
      expect((await bid(lotIds[0], alice, 20000)).status).toBe(409);
      expect((await api.post(`/admin/lots/${lotIds[0]}/withdraw`, { reason: 'ещё раз' }, curator)).status).toBe(409);
      expect((await api.post(`/admin/lots/999999/withdraw`, { reason: 'нет такого' }, curator)).status).toBe(404);
    });
  });

  describe('уведомления', () => {
    it('лента только для вошедшего и только своя; «перебили» приходит прежнему лидеру; отметка прочитанным', async () => {
      const [alice, bob] = [await h.user('na'), await h.user('nb')];                                 // свежие пользователи: лента общая на весь набор
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      await admit(slug, auctionId, bob);
      expect((await api.get('/me/notifications', null)).status).toBe(401);
      expect((await api.post('/me/notifications/read', {}, null)).status).toBe(401);

      const own = (await api.get('/me/notifications', alice)).body;
      expect(own.notifications.map((n: any) => n.kind)).toEqual(['registration_approved']);           // допуск
      await bid(lotIds[0], alice, 30000);
      await bid(lotIds[0], bob, 50000);
      const aliceFeed = (await api.get('/me/notifications', alice)).body;
      expect(aliceFeed.notifications[0]).toMatchObject({ kind: 'outbid', read: false, path: `/torgi/lot/${lotIds[0]}` });
      expect(aliceFeed.unread).toBe(2);
      expect(JSON.stringify(aliceFeed)).not.toMatch(/max_kop|reserve|user_id/);
      expect((await api.get('/me/notifications', bob)).body.notifications.map((n: any) => n.kind)).toEqual(['registration_approved']);
      expect((await api.get('/me/notifications?unread=1&limit=1', alice)).body.notifications).toHaveLength(1);

      expect((await api.post('/me/notifications/read', { ids: 'все' }, alice)).status).toBe(400);
      expect((await api.post('/me/notifications/read', { ids: [] }, alice)).status).toBe(400);
      expect((await api.post('/me/notifications/read', { ids: [aliceFeed.notifications[0].notification_id] }, bob)).body).toEqual({ marked: 0 });   // чужое
      expect((await api.post('/me/notifications/read', { ids: [aliceFeed.notifications[0].notification_id] }, alice)).body).toEqual({ marked: 1 });
      expect((await api.post('/me/notifications/read', {}, alice)).body).toEqual({ marked: 1 });
      expect((await api.get('/me/notifications', alice)).body.unread).toBe(0);
    });
  });

  describe('аннулирование ставки', () => {
    it('куратор аннулирует ставку с причиной: цена и лидер пересчитаны, публика ставку не видит, журнал цел', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      await admit(slug, auctionId, bob);
      const first = await bid(lotIds[0], alice, 30000);
      const second = await bid(lotIds[0], bob, 50000);
      expect(second.body.price_kop).toBe(3_200_000);

      expect((await api.post(`/admin/bids/${second.body.bid_id}/annul`, { reason: 'опечатка в сумме' }, null)).status).toBe(401);
      expect((await api.post(`/admin/bids/${second.body.bid_id}/annul`, { reason: 'опечатка в сумме' }, alice)).status).toBe(403);
      expect((await api.post(`/admin/bids/${second.body.bid_id}/annul`, {}, curator)).status).toBe(400);                       // нет причины
      expect((await api.post(`/admin/bids/abc/annul`, { reason: 'x' }, curator)).status).toBe(404);
      expect((await api.post(`/admin/bids/999999999/annul`, { reason: 'нет такой' }, curator)).status).toBe(404);

      const done = await api.post(`/admin/bids/${second.body.bid_id}/annul`, { reason: 'опечатка в сумме' }, curator);
      expect(done.status).toBe(200);
      expect(done.body).toMatchObject({ status: 'annulled', price_kop: 1_000_000, bid_count: 1 });
      expect((await api.post(`/admin/bids/${second.body.bid_id}/annul`, { reason: 'ещё раз' }, curator)).status).toBe(409);

      const lot = (await api.get(`/lots/${lotIds[0]}`, null)).body.lot;
      expect(lot).toMatchObject({ bid_count: 1, current_price_kop: 1_000_000, leader_pseudonym: 1 });
      expect(JSON.stringify(lot)).not.toContain('опечатка');                                                                      // причина — только организатору
      expect((await api.get(`/lots/${lotIds[0]}`, bob)).body.lot.mine).toMatchObject({ leading: false, my_max_kop: null });       // его максимум не учитывается
      const history = (await api.get(`/lots/${lotIds[0]}`, null)).body.history;
      expect(history.map((b: any) => b.bid_id)).toEqual([first.body.bid_id]);                                                   // аннулированной ставки в истории нет

      const admin = (await api.get(`/admin/lots/${lotIds[0]}/bids`, curator)).body.bids;
      expect(admin.map((b: any) => [b.bid_id, b.annulled, b.annul_reason])).toEqual([[first.body.bid_id, false, null], [second.body.bid_id, true, 'опечатка в сумме']]);
      expect((await api.get(`/admin/chains/${lotIds[0]}/verify`, curator)).body).toMatchObject({ ok: true });
    });

    it('после закрытия лота ставку аннулировать нельзя', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      await admit(slug, auctionId, bob);
      const a = await bid(lotIds[0], alice, 30000);
      await bid(lotIds[0], bob, 20000);
      await h.q(`UPDATE bidding_lots SET ends_at = now() - interval '1 second' WHERE lot_id = $1`, [lotIds[0]]);
      await tick();
      const res = await api.post(`/admin/bids/${a.body.bid_id}/annul`, { reason: 'поздно' }, curator);
      expect(res.status).toBe(409);
      expect(res.body.code).toBe('lot_not_open');
    });
  });

  describe('ограничение частоты', () => {
    it('слишком частые ставки одного пользователя получают 429 с Retry-After', async () => {
      const { slug, auctionId, lotIds } = await liveAuction();
      await admit(slug, auctionId, alice);
      let limited: request.Response | undefined;
      for (let i = 0; i < 40 && !limited; i++) {
        const res = await bid(lotIds[0], alice, 10000 + i);                             // кроме первой все отклоняются, но считаются
        if (res.status === 429) limited = res;
      }
      expect(limited).toBeDefined();
      expect(limited!.headers['retry-after']).toBeDefined();
      expect(limited!.body.code).toBe('BID_RATE');
    }, 30_000);
  });
});
