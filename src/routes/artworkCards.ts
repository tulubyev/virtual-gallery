// src/routes/artworkCards.ts — API карточки произведения (/api/artwork-cards), docs/ARTWORK-CARD.md.
// Доступ задаёт src/middleware/accessPolicy.ts: публичное чтение опубликованной карточки — всем; чтение черновиков и правки — сотрудникам;
// утверждение фрагментов и удаление — куратору и администратору. Переходы по жизненному циклу дополнительно проверяют роль в сервисе.
import express, { Request, Response } from 'express';
import * as card from '../services/artworkCard';
import * as generation from '../services/artworkCardGeneration';
import {
  CARD_STATUSES, CardStatus, parseFragmentInput, parsePassportInput, FragmentInput,
} from '../services/artworkCardRules';
import { intInRange, parseId } from '../services/biddingInput';

const router = express.Router();
const DOCUMENT_ID = /^[A-Za-z0-9_.-]{1,100}$/;

const userOf = (req: Request) => (req as any).user as card.Actor;
const fail = (res: Response, status: number, error: string, extra: object = {}) => res.status(status).json({ error, ...extra });
const send = (res: Response, r: card.Result<any>, okStatus = 200) => {
  if (r.ok) { const { ok, ...rest } = r; return res.status(okStatus).json(rest); }
  const { ok, status, ...rest } = r;
  return res.status(status).json(rest);
};

function serverError(res: Response, scope: string, error: any) {
  console.error(`[artwork-cards] ${scope}:`, error?.message);
  return fail(res, 500, 'Не удалось выполнить запрос');
}

// ── Публичное чтение ───────────────────────────────────────────────────────────────────────────

router.get('/public/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Карточка не найдена');
  const lang = req.query.lang === 'en' ? 'en' : req.query.lang === undefined || req.query.lang === 'ru' ? 'ru' : null;
  if (!lang) return fail(res, 400, 'lang: ru или en');
  try {
    const data = await card.getPublicCard(id, lang);
    if (!data) return fail(res, 404, 'Карточка не найдена');
    res.json(data);
  } catch (e) { serverError(res, 'public', e); }
});

// ── Сотрудники ─────────────────────────────────────────────────────────────────────────────────

/** Очередь карточек: ?status=needs_review&limit=50&offset=0 */
router.get('/', async (req, res) => {
  const status = typeof req.query.status === 'string' ? req.query.status : undefined;
  if (status && !(CARD_STATUSES as readonly string[]).includes(status)) return fail(res, 400, `status: одно из ${CARD_STATUSES.join(', ')}`);
  try {
    const cards = await card.listCards({
      status,
      limit: intInRange(req.query.limit, 1, 100) ?? 50,
      offset: intInRange(req.query.offset, 0, 1_000_000) ?? 0,
    });
    res.json({ cards });
  } catch (e) { serverError(res, 'list', e); }
});

// ── Генерация по документам и перевод (сотрудники) ─────────────────────────────────────────────────

/** Черновик по документам базы знаний: фрагменты с проверенными цитатами, неутверждённые. Тело: { document_ids?: string[] } */
router.post('/:id/generate', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Произведение не найдено');
  const ids = req.body?.document_ids;
  if (ids !== undefined && ids !== null && (!Array.isArray(ids) || ids.length > 50 || ids.some((d: unknown) => typeof d !== 'string' || !DOCUMENT_ID.test(d)))) {
    return fail(res, 400, 'document_ids: до 50 идентификаторов документов');
  }
  try { send(res, await generation.generateDraft(id, userOf(req), ids ?? null)); } catch (e) { serverError(res, 'generate', e); }
});

/** Перевод утверждённых русских фрагментов на английский: переводы создаются неутверждёнными. */
router.post('/:id/translate', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Произведение не найдено');
  try { send(res, await generation.translateApproved(id, userOf(req))); } catch (e) { serverError(res, 'translate', e); }
});

router.get('/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Произведение не найдено');
  try { send(res, await card.getFullCard(id, userOf(req).role)); } catch (e) { serverError(res, 'get', e); }
});

router.put('/:id/passport', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Произведение не найдено');
  const parsed = parsePassportInput(req.body);
  if (!parsed.ok) return fail(res, 400, parsed.error);
  try { send(res, await card.updatePassport(id, parsed.value)); } catch (e) { serverError(res, 'passport', e); }
});

router.post('/:id/fragments', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Произведение не найдено');
  const parsed = parseFragmentInput(req.body);
  if (!parsed.ok) return fail(res, 400, parsed.error);
  try { send(res, await card.createFragment(id, parsed.value as FragmentInput, userOf(req)), 201); } catch (e) { serverError(res, 'fragment-create', e); }
});

router.patch('/:id/fragments/:fid', async (req, res) => {
  const [id, fid] = [parseId(req.params.id), parseId(req.params.fid)];
  if (!id || !fid) return fail(res, 404, 'Фрагмент не найден');
  const parsed = parseFragmentInput(req.body, { partial: true });
  if (!parsed.ok) return fail(res, 400, parsed.error);
  if (Object.keys(parsed.value).length === 0) return fail(res, 400, 'Нет полей для изменения');
  try { send(res, await card.updateFragment(id, fid, parsed.value, userOf(req))); } catch (e) { serverError(res, 'fragment-update', e); }
});

router.delete('/:id/fragments/:fid', async (req, res) => {
  const [id, fid] = [parseId(req.params.id), parseId(req.params.fid)];
  if (!id || !fid) return fail(res, 404, 'Фрагмент не найден');
  try { send(res, await card.deleteFragment(id, fid)); } catch (e) { serverError(res, 'fragment-delete', e); }
});

router.post('/:id/fragments/:fid/approve', async (req, res) => {
  const [id, fid] = [parseId(req.params.id), parseId(req.params.fid)];
  if (!id || !fid) return fail(res, 404, 'Фрагмент не найден');
  try { send(res, await card.approveFragment(id, fid, userOf(req))); } catch (e) { serverError(res, 'fragment-approve', e); }
});

/** Переход по жизненному циклу: { to: 'needs_review' | 'approved' | 'published' | ..., approve_fragments?: boolean } */
router.post('/:id/status', async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return fail(res, 404, 'Произведение не найдено');
  const to = req.body?.to;
  if (typeof to !== 'string' || !(CARD_STATUSES as readonly string[]).includes(to)) return fail(res, 400, `to: одно из ${CARD_STATUSES.join(', ')}`);
  try {
    send(res, await card.changeStatus(id, to as CardStatus, userOf(req), { approveFragments: req.body?.approve_fragments === true }));
  } catch (e) { serverError(res, 'status', e); }
});

export = router;
