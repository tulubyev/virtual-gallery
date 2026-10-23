import express, { Request, Response } from 'express';
import multer from 'multer';

const router = express.Router();
const MAX_PDF_BYTES = 50 * 1024 * 1024;
const pdfUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_PDF_BYTES, files: 1 } });
const STAFF_ROLES = ['admin', 'curator', 'staff'];
const CURATOR_ROLES = ['admin', 'curator'];
const DOCUMENT_ID = /^[A-Za-z0-9_.-]{1,100}$/;
// Категории формы загрузки → категории ядра; «auto» — определит модель
const PDF_CATEGORIES: Record<string, string> = {
  history: 'art_history', technique: 'technique', artist: 'artist_biography', period: 'art_history',
};
const AI_CORE_URL = process.env.AI_CORE_URL || 'http://localhost:8001';
// Внутренний токен Python-ядра (заголовок X-Internal-Token); без него ядро ответит 401
const INTERNAL_API_TOKEN = process.env.INTERNAL_API_TOKEN || '';

async function proxyToAiService(
  endpoint: string,
  method: string,
  body: object | null,
  res: Response,
  options: { timeoutMs?: number; form?: FormData } = {}
): Promise<void> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs ?? 30000);

  try {
    const response = await fetch(`${AI_CORE_URL}${endpoint}`, {
      method,
      headers: {
        // Для multipart заголовок с границей выставляет fetch сам
        ...(options.form ? {} : { 'Content-Type': 'application/json' }),
        ...(INTERNAL_API_TOKEN ? { 'X-Internal-Token': INTERNAL_API_TOKEN } : {}),
      },
      body: options.form ?? (body ? JSON.stringify(body) : undefined),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      const text = await response.text();
      res.status(response.status).json({
        error: 'AI service returned non-JSON response',
        status: response.status,
        body: text.substring(0, 500),
      });
    }
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error(`AI Service proxy error: ${error.message}`);
    res.status(503).json({ error: 'AI/ML Service unavailable' });   // подробности (адреса, порты) — только в журнал
  }
}

router.post('/analyze-image', async (req: Request, res: Response) => {
  const { imageUrl, artworkId, userId } = req.body;
  await proxyToAiService('/api/v1/images/analyze', 'POST', {
    image_url: imageUrl, artwork_id: artworkId, user_id: userId,
  }, res);
});

// Загрузка PDF в базу знаний: файл (multipart, поле `pdf`) или, для старых виджетов, JSON { pdfUrl, documentId }.
// Дальше всё решает роль из сессии, а не поля формы: публиковать документы для гостей может только куратор или администратор.
router.post('/process-pdf', pdfUpload.single('pdf'), async (req: Request, res: Response) => {
  const user = (req as any).user;
  const isCurator = !!user && CURATOR_ROLES.includes(user.role);
  const file = (req as any).file as Express.Multer.File | undefined;
  const { pdfUrl, category, title, license } = req.body;
  const documentId = (typeof req.body.documentId === 'string' && req.body.documentId) || `doc_${Date.now()}`;
  if (!DOCUMENT_ID.test(documentId)) {
    return res.status(400).json({ error: 'documentId: только латиница, цифры, «_», «-», «.» (до 100 знаков)' });
  }
  const access = req.body.access === 'public' && isCurator ? 'public' : 'staff';

  if (file) {
    const form = new FormData();
    const bytes = file.buffer.buffer.slice(file.buffer.byteOffset, file.buffer.byteOffset + file.buffer.byteLength) as ArrayBuffer;
    form.append('file', new Blob([bytes], { type: 'application/pdf' }), 'document.pdf');
    form.append('document_id', documentId);
    // multer читает имя файла как latin1: возвращаем байты и разбираем как UTF-8 (иначе кириллица превращается в «Ð¼»)
    const fileName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    form.append('title', String(title || fileName.replace(/\.pdf$/i, '')).slice(0, 300));
    form.append('access', access);
    if (license) form.append('license', String(license).slice(0, 300));
    const coreCategory = PDF_CATEGORIES[String(category)];
    if (coreCategory) form.append('category', coreCategory);
    if (user?.user_id) form.append('user_id', String(user.user_id));
    return proxyToAiService('/api/v1/pdfs/upload', 'POST', null, res, { form, timeoutMs: 120000 });
  }
  if (typeof pdfUrl === 'string' && pdfUrl) {
    return proxyToAiService('/api/v1/pdfs/process', 'POST', {
      pdf_url: pdfUrl, document_id: documentId, user_id: user?.user_id ?? null,
      title: title ? String(title).slice(0, 300) : null, access,
    }, res);
  }
  return res.status(400).json({ error: 'Нужен PDF-файл (поле pdf) или pdfUrl' });
});

router.post('/rag-query', async (req: Request, res: Response) => {
  const { query, contextLimit, filters, mode } = req.body;
  if (typeof query !== 'string' || query.trim().length < 2 || query.length > 1000) {
    return res.status(400).json({ error: 'Вопрос должен быть от 2 до 1000 знаков' });
  }
  // Права определяет сессия: гостю и посетителю видны только публичные документы
  const user = (req as any).user;
  const isStaff = !!user && STAFF_ROLES.includes(user.role);
  const documentIds = Array.isArray(filters?.documentIds)
    ? filters.documentIds.filter((id: unknown) => typeof id === 'string' && DOCUMENT_ID.test(id)).slice(0, 50)
    : undefined;
  const limit = Number.isInteger(contextLimit) ? Math.min(Math.max(contextLimit, 1), 12) : 8;
  await proxyToAiService('/api/v1/rag/query', 'POST', {
    query: query.trim(),
    context_limit: limit,
    mode: isStaff && mode === 'curator' ? 'curator' : 'public',
    access: isStaff ? 'staff' : 'public',
    document_ids: documentIds && documentIds.length ? documentIds : null,
    user_id: user?.user_id ?? null,
  }, res, { timeoutMs: 60000 });
});

router.get('/rag/documents', async (_req: Request, res: Response) => {
  await proxyToAiService('/api/v1/rag/documents', 'GET', null, res);
});

router.delete('/rag/documents/:id', async (req: Request, res: Response) => {
  if (!DOCUMENT_ID.test(req.params.id)) return res.status(400).json({ error: 'Недопустимый идентификатор документа' });
  await proxyToAiService(`/api/v1/rag/documents/${req.params.id}`, 'DELETE', null, res);
});

router.get('/analysis/:taskId', async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { type } = req.query;
  // Статус PDF читается по /pdfs/processing, у изображений — /images/analysis
  const path = type === 'pdf' ? `/api/v1/pdfs/processing/${taskId}` : `/api/v1/images/analysis/${taskId}`;
  await proxyToAiService(path, 'GET', null, res);
});

router.post('/describe-artwork', async (req: Request, res: Response) => {
  const { artworkId, imageUrl, language } = req.body;
  await proxyToAiService('/api/v1/images/describe', 'POST', {
    artwork_id: artworkId, image_url: imageUrl, language: language || 'ru',
  }, res);
});

router.post('/similar-artworks', async (req: Request, res: Response) => {
  const { artworkId, imageUrl, limit } = req.body;
  await proxyToAiService('/api/v1/vectors/similar', 'POST', {
    artwork_id: artworkId, image_url: imageUrl, limit: limit || 5,
  }, res);
});

router.post('/calculate-slots', async (req: Request, res: Response) => {
  const { roomDimensions } = req.body;
  if (!roomDimensions) return res.status(400).json({ error: 'roomDimensions is required' });

  try {
    await proxyToAiService('/api/v1/gallery/calculate-slots', 'POST', req.body, res);
  } catch {
    const { width, depth, height } = roomDimensions;
    const wallArea = 2 * (width * height) + 2 * (depth * height);
    const recommendedSlots = Math.floor((wallArea * 0.4) / 2.5);
    const optimalSlots = Math.min(Math.max(recommendedSlots, 4), 12);
    res.json({ success: true, demo_mode: true, recommendation: { total_slots: optimalSlots } });
  }
});

export = router;
