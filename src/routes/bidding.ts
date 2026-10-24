// src/routes/bidding.ts — API торгового движка (/api/bidding). Подключается при BIDDING_ENABLED=true.
// Доступ задаёт src/middleware/accessPolicy.ts: чтение лотов — всем, ставки и заявки — вошедшим, /admin — куратору и администратору.
// Ставка всегда от пользователя из сессии; допуск, лимит и проверку личности решает база (функции bidding_*).
import express, { Request, Response } from 'express';
import { createBidLimiter } from '../middleware/bidLimiter';
import * as bidding from '../services/bidding';
import * as notifications from '../services/biddingNotifications';
import { checkConsents } from '../services/legalDocs';
import {
  ADMIN_REJECTIONS, bidRejection, intInRange, isSlug, isUuid, parseId, parseInstant, parseRub, text,
} from '../services/biddingInput';

const router = express.Router();

const fail = (res: Response, status: number, error: string, extra: object = {}) => res.status(status).json({ error, ...extra });
const userOf = (req: Request) => (req as any).user as { user_id: number; role: string } | undefined;

function serverError(res: Response, scope: string, error: any) {
  console.error(`[bidding] ${scope}:`, error?.message);
  if (error?.code === '23505') return fail(res, 409, 'Такая запись уже есть (например, работа уже участвует в другом активном лоте).');
  return fail(res, 500, 'Не удалось выполнить запрос');
}

// ── Публичное чтение ───────────────────────────────────────────────────────────────────────────

router.get('/auctions', async (_req, res) => {
  try {
    res.json({ server_time: await bidding.serverTime(), auctions: await bidding.listAuctions() });
  } catch (e) { serverError(res, 'list', e); }
});

router.get('/auctions/:slug', async (req, res) => {
  if (!isSlug(req.params.slug)) return fail(res, 404, 'Аукцион не найден');
  try {
    const data = await bidding.getAuction(req.params.slug);
    if (!data) return fail(res, 404, 'Аукцион не найден');
    res.json({ server_time: await bidding.serverTime(), ...data });
  } catch (e) { serverError(res, 'auction', e); }
});

router.get('/lots/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Лот не найден');
  try {
    const lot = await bidding.getLot(id, userOf(req)?.user_id);
    if (!lot) return fail(res, 404, 'Лот не найден');
    res.json({ server_time: await bidding.serverTime(), lot, history: await bidding.getLotHistory(id) });
  } catch (e) { serverError(res, 'lot', e); }
});

/** Лёгкий опрос: `?since=<version>` — если ничего не изменилось, вернётся только {changed:false} и серверное время. */
router.get('/lots/:id/state', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Лот не найден');
  try {
    const lot = await bidding.getLot(id, userOf(req)?.user_id);
    if (!lot) return fail(res, 404, 'Лот не найден');
    const server_time = await bidding.serverTime();
    const since = intInRange(req.query.since, 0, 2_000_000_000);
    if (since !== null && since === lot.version) return res.json({ changed: false, version: lot.version, server_time });
    res.json({ changed: true, server_time, lot });
  } catch (e) { serverError(res, 'state', e); }
});

// ── Участник ───────────────────────────────────────────────────────────────────────────────────

router.post('/lots/:id/bids', createBidLimiter(), async (req, res) => {
  const user = userOf(req);
  if (!user) return fail(res, 401, 'Требуется вход');
  const lotId = parseId(req.params.id);
  const maxKop = parseRub(req.body?.max_rub);
  const requestId = req.body?.request_id;
  if (!lotId) return fail(res, 404, 'Лот не найден');
  if (maxKop === null) return fail(res, 400, 'Укажите сумму в рублях: число не больше 1 000 000 000, не более двух знаков после запятой.', { code: 'invalid_amount' });
  if (!isUuid(requestId)) return fail(res, 400, 'Нужен request_id (UUID): по нему повтор запроса не создаст вторую ставку.', { code: 'invalid_request_id' });
  const expected = req.body?.expected_version === undefined || req.body?.expected_version === null
    ? null : intInRange(req.body.expected_version, 0, 2_000_000_000);
  if (req.body?.expected_version != null && expected === null) return fail(res, 400, 'expected_version должен быть целым числом', { code: 'invalid_version' });

  try {
    const result = await bidding.placeBid({
      lotId, userId: user.user_id, maxKop, requestId, expectedVersion: expected, ip: req.ip, userAgent: req.get('user-agent') ?? undefined,
    });
    if (result.status === 'accepted' || result.status === 'duplicate') {
      if (result.status === 'duplicate' && !result.accepted) {
        const [status, message] = bidRejection(result.reason);
        return fail(res, status, message, { code: result.reason, duplicate: true });
      }
      return res.json(result);
    }
    const [status, message] = bidRejection(result.reason);
    return fail(res, status, message, { code: result.reason, min_bid_kop: result.min_bid_kop, version: result.version });
  } catch (e) { serverError(res, 'bid', e); }
});

router.post('/auctions/:slug/apply', async (req, res) => {
  const user = userOf(req);
  if (!user) return fail(res, 401, 'Требуется вход');
  if (!isSlug(req.params.slug)) return fail(res, 404, 'Аукцион не найден');
  const kind = ['person', 'legal_entity', 'sole_proprietor'].includes(req.body?.kind) ? req.body.kind : null;
  const fullName = text(req.body?.full_name, 200);
  const phone = typeof req.body?.phone === 'string' && /^\+?[0-9 ()-]{10,20}$/.test(req.body.phone.trim()) ? req.body.phone.trim() : null;
  if (!kind || !fullName || !phone) return fail(res, 400, 'Укажите тип участника, ФИО (или название) и телефон.');
  if (req.body?.rules_accepted !== true) return fail(res, 400, 'Нужно принять правила аукциона.', { code: 'rules_required' });
  if (req.body?.pd_consent !== true) return fail(res, 400, 'Нужно дать согласие на обработку персональных данных.', { code: 'pd_consent_required' });
  // Принять можно только актуальные и утверждённые версии документов; принятая версия записывается в заявку
  const consents = checkConsents(req.body?.rules_version, req.body?.pd_version);
  if (!consents.ok) return fail(res, consents.code === 'rules_not_approved' || consents.code === 'docs_missing' ? 503 : 409, consents.message!, { code: consents.code });
  try {
    const result = await bidding.applyForAuction(req.params.slug, user.user_id, { kind, full_name: fullName, phone },
      true, req.body.rules_version, req.body.pd_version);
    if ('registration' in result) return res.status(201).json(result.registration);
    const messages: Record<string, [number, string]> = {
      no_such_auction: [404, 'Аукцион не найден'],
      registration_closed: [409, 'Приём заявок на этот аукцион закрыт.'],
      kyc_rejected: [403, 'Ваша заявка на участие ранее отклонена. Обратитесь к организатору.'],
      standing: [403, 'Участие приостановлено. Обратитесь к организатору.'],
      rules_required: [400, 'Нужно принять правила аукциона.'],
      pd_consent_required: [400, 'Нужно дать согласие на обработку персональных данных.'],
    };
    const [status, message] = messages[result.code];
    return fail(res, status, message, { code: result.code });
  } catch (e) { serverError(res, 'apply', e); }
});

router.get('/me/registrations', async (req, res) => {
  const user = userOf(req);
  if (!user) return fail(res, 401, 'Требуется вход');
  try { res.json({ registrations: await bidding.myRegistrations(user.user_id) }); } catch (e) { serverError(res, 'me', e); }
});

/** Лента уведомлений участника (ставку перебили, лот закрыт, решение по заявке…). `?unread=1` — только непрочитанные. */
router.get('/me/notifications', async (req, res) => {
  const user = userOf(req);
  if (!user) return fail(res, 401, 'Требуется вход');
  const limit = intInRange(req.query.limit, 1, 100) ?? 30;
  try { res.json(await notifications.listMine(user.user_id, { unreadOnly: req.query.unread === '1', limit })); } catch (e) { serverError(res, 'notifications', e); }
});

/** Отметить прочитанными: `{ids: [..]}` или без ids — все свои. */
router.post('/me/notifications/read', async (req, res) => {
  const user = userOf(req);
  if (!user) return fail(res, 401, 'Требуется вход');
  let ids: number[] | null = null;
  if (req.body?.ids !== undefined) {
    const list = Array.isArray(req.body.ids) ? req.body.ids.map(parseId) : null;
    if (!list || list.length === 0 || list.length > 200 || list.some((v: number | null) => v === null)) return fail(res, 400, 'ids: список от 1 до 200 номеров уведомлений');
    ids = list as number[];
  }
  try { res.json({ marked: await notifications.markRead(user.user_id, ids) }); } catch (e) { serverError(res, 'notifications read', e); }
});

// ── Куратор ────────────────────────────────────────────────────────────────────────────────────

/** Поля аукциона из тела запроса; возвращает значения для SQL или текст ошибки. */
function auctionFields(body: any, requireTitle: boolean): { fields: bidding.AuctionFields } | { error: string } {
  const fields: bidding.AuctionFields = {};
  const bad = (name: string) => ({ error: `Некорректное поле «${name}»` });
  if (body.title !== undefined || requireTitle) { const t = text(body.title, 200); if (!t) return bad('title'); fields.title = t; }
  if (body.slug !== undefined) { if (!isSlug(body.slug)) return bad('slug'); fields.slug = body.slug; }
  if (body.description !== undefined) { const t = body.description === null ? null : text(body.description, 5000); if (t === null && body.description !== null) return bad('description'); fields.description = t; }
  for (const name of ['registration_closes_at', 'bidding_opens_at', 'first_close_at', 'hard_close_at']) {
    if (body[name] !== undefined) {
      const iso = body[name] === null ? null : parseInstant(body[name]);
      if (iso === null && body[name] !== null) return { error: `Поле «${name}»: дата в формате ISO со смещением, например 2026-12-01T18:00:00+03:00` };
      fields[name] = iso;
    }
  }
  const ints: Array<[string, number, number]> = [['notice_days', 0, 365], ['soft_close_window_s', 0, 3600], ['soft_close_extend_s', 0, 3600],
    ['lot_close_stagger_s', 0, 3600], ['min_bidders', 1, 100], ['exposure_multiplier', 1, 1000]];
  for (const [name, min, max] of ints) {
    if (body[name] !== undefined) { const v = intInRange(body[name], min, max); if (v === null) return bad(name); fields[name] = v; }
  }
  if (body.deposit_rub !== undefined) {
    const kop = body.deposit_rub === 0 || body.deposit_rub === '0' ? 0 : parseRub(body.deposit_rub);
    if (kop === null) return bad('deposit_rub');
    fields.deposit_kop = kop;
  }
  return { fields };
}

router.get('/admin/auctions', async (_req, res) => {
  try { res.json({ auctions: await bidding.adminListAuctions() }); } catch (e) { serverError(res, 'admin list', e); }
});

router.post('/admin/auctions', async (req, res) => {
  const parsed = auctionFields(req.body ?? {}, true);
  if ('error' in parsed) return fail(res, 400, parsed.error);
  if (!parsed.fields.slug) return fail(res, 400, 'Укажите slug: латиница, цифры и дефис (адрес страницы аукциона).');
  try { res.status(201).json({ auction_id: await bidding.createAuction(parsed.fields, userOf(req)!.user_id) }); } catch (e) { serverError(res, 'create', e); }
});

router.get('/admin/auctions/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Аукцион не найден');
  try {
    const data = await bidding.adminGetAuction(id);
    if (!data) return fail(res, 404, 'Аукцион не найден');
    res.json(data);
  } catch (e) { serverError(res, 'admin get', e); }
});

router.patch('/admin/auctions/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Аукцион не найден');
  const parsed = auctionFields(req.body ?? {}, false);
  if ('error' in parsed) return fail(res, 400, parsed.error);
  try {
    if (!(await bidding.updateDraftAuction(id, parsed.fields))) return fail(res, 409, 'Изменять можно только черновик существующего аукциона.');
    res.json({ ok: true });
  } catch (e) { serverError(res, 'patch', e); }
});

router.post('/admin/auctions/:id/lots', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Аукцион не найден');
  const b = req.body ?? {};
  const startKop = parseRub(b.start_price_rub);
  const reserveKop = b.reserve_rub === undefined || b.reserve_rub === null ? null : parseRub(b.reserve_rub);
  const lowKop = b.estimate_low_rub === undefined || b.estimate_low_rub === null ? null : parseRub(b.estimate_low_rub);
  const highKop = b.estimate_high_rub === undefined || b.estimate_high_rub === null ? null : parseRub(b.estimate_high_rub);
  if (startKop === null) return fail(res, 400, 'Укажите стартовую цену в рублях.');
  if ((b.reserve_rub != null && reserveKop === null) || (b.estimate_low_rub != null && lowKop === null) || (b.estimate_high_rub != null && highKop === null)) {
    return fail(res, 400, 'Некорректная сумма (резерв или оценка).');
  }
  if (reserveKop !== null && reserveKop < startKop) return fail(res, 400, 'Резерв не может быть ниже стартовой цены.');
  if (lowKop !== null && highKop !== null && highKop < lowKop) return fail(res, 400, 'Верхняя оценка ниже нижней.');
  const artworkId = b.artwork_id === undefined || b.artwork_id === null ? null : parseId(b.artwork_id);
  if (b.artwork_id != null && artworkId === null) return fail(res, 400, 'Некорректный artwork_id.');
  const sellerId = b.seller_user_id === undefined || b.seller_user_id === null ? null : parseId(b.seller_user_id);
  if (b.seller_user_id != null && sellerId === null) return fail(res, 400, 'Некорректный seller_user_id.');
  try {
    const snapshot: Record<string, unknown> = artworkId ? (await bidding.artworkSnapshot(artworkId)) ?? {} : {};
    if (artworkId && Object.keys(snapshot).length === 0) return fail(res, 404, 'Произведение не найдено.');
    for (const [key, max] of [['title', 200], ['artist_name', 200], ['description', 5000]] as const) {
      if (b[key] !== undefined) { const t = text(b[key], max); if (!t) return fail(res, 400, `Некорректное поле «${key}»`); snapshot[key] = t; }
    }
    if (!snapshot.title) return fail(res, 400, 'Укажите название лота или произведение (artwork_id).');
    const lotId = await bidding.addLot({
      auctionId: id, artworkId, sellerUserId: sellerId, snapshot, startKop, reserveKop, estimateLowKop: lowKop, estimateHighKop: highKop,
      lotNo: b.lot_no === undefined ? undefined : intInRange(b.lot_no, 1, 100000) ?? undefined,
    });
    if (lotId === null) return fail(res, 409, 'Лоты можно добавлять только в черновик существующего аукциона.');
    res.status(201).json({ lot_id: lotId });
  } catch (e) { serverError(res, 'add lot', e); }
});

router.post('/admin/auctions/:id/announce', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Аукцион не найден');
  try {
    const result = await bidding.announce(id, userOf(req)!.user_id);
    if (result.status === 'announced') return res.json(result);
    return fail(res, result.reason === 'no_such_auction' ? 404 : 409, ADMIN_REJECTIONS[result.reason] ?? 'Объявить аукцион не удалось.', { code: result.reason, notice_days: result.notice_days });
  } catch (e) { serverError(res, 'announce', e); }
});

router.post('/admin/lots/:id/withdraw', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Лот не найден');
  const reason = text(req.body?.reason, 500);
  if (!reason) return fail(res, 400, ADMIN_REJECTIONS.reason_required);
  try {
    const result = await bidding.withdrawLot(id, userOf(req)!.user_id, reason);
    if (result.status === 'withdrawn') return res.json(result);
    return fail(res, result.reason === 'no_such_lot' ? 404 : 409, ADMIN_REJECTIONS[result.reason] ?? 'Снять лот не удалось.', { code: result.reason });
  } catch (e) { serverError(res, 'withdraw', e); }
});

router.get('/admin/auctions/:id/registrations', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Аукцион не найден');
  try { res.json({ registrations: await bidding.listRegistrations(id) }); } catch (e) { serverError(res, 'registrations', e); }
});

router.post('/admin/auctions/:id/registrations/:userId/decision', async (req, res) => {
  const id = parseId(req.params.id);
  const userId = parseId(req.params.userId);
  if (!id || !userId) return fail(res, 404, 'Заявка не найдена');
  if (typeof req.body?.approve !== 'boolean') return fail(res, 400, 'Поле approve должно быть true или false.');
  const limitKop = req.body.approve ? parseRub(req.body.limit_rub) : null;
  if (req.body.approve && limitKop === null) return fail(res, 400, ADMIN_REJECTIONS.limit_required);
  try {
    const result = await bidding.decideRegistration(id, userId, req.body.approve, limitKop, userOf(req)!.user_id, text(req.body?.reason, 500));
    if (result.status === 'approved' || result.status === 'rejected_registration') return res.json(result);
    return fail(res, result.reason === 'no_such_auction' || result.reason === 'no_application' ? 404 : 409,
      ADMIN_REJECTIONS[result.reason] ?? 'Решение не принято.', { code: result.reason });
  } catch (e) { serverError(res, 'decision', e); }
});

router.get('/admin/participants/pending', async (_req, res) => {
  try { res.json({ participants: await bidding.pendingParticipants() }); } catch (e) { serverError(res, 'pending', e); }
});

router.post('/admin/participants/:userId/kyc', async (req, res) => {
  const userId = parseId(req.params.userId);
  if (!userId) return fail(res, 404, 'Участник не найден');
  if (!['approved', 'rejected'].includes(req.body?.status)) return fail(res, 400, 'status: approved или rejected');
  try {
    if (!(await bidding.setKyc(userId, req.body.status, userOf(req)!.user_id, text(req.body?.note, 500)))) return fail(res, 404, 'Участник не найден');
    res.json({ ok: true });
  } catch (e) { serverError(res, 'kyc', e); }
});

router.get('/admin/lots/:id/bids', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Лот не найден');
  try { res.json({ bids: await bidding.adminLotBids(id) }); } catch (e) { serverError(res, 'admin bids', e); }
});

/** Проверка журнала: лот (положительный номер) или аукцион (отрицательный: -auction_id). */
router.get('/admin/chains/:key/verify', async (req, res) => {
  const key = typeof req.params.key === 'string' && /^-?\d{1,15}$/.test(req.params.key) ? Number(req.params.key) : null;
  if (key === null || key === 0) return fail(res, 400, 'Некорректный ключ цепочки');
  try { res.json(await bidding.verifyChain(key)); } catch (e) { serverError(res, 'verify', e); }
});

export = router;
