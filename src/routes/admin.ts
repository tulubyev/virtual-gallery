import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { callAiCore, AiCoreUnavailable } from '../services/aiCore';

const router = express.Router();

router.post('/clear-uploads', async (_req: Request, res: Response) => {
  try {
    const dir = path.join(__dirname, '../../public/uploads');
    const files = fs.readdirSync(dir);
    files.forEach(f => {
      if (f !== '.gitkeep') fs.unlinkSync(path.join(dir, f));
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/uploads-info', async (_req: Request, res: Response) => {
  try {
    const dir = path.join(__dirname, '../../public/uploads');
    const files = fs.readdirSync(dir).filter(f => f !== '.gitkeep');
    res.json({ success: true, count: files.length });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ── Выбор модели ИИ по задачам (хранит и применяет Python-ядро) ────────────────────────────
const TASK_RE = /^[a-z_]{1,32}$/;
const MODEL_MODES = ['global', 'ru-only'];

function actorOf(req: Request): string {
  const user = (req as any).user;
  return String(user?.email || user?.username || '').slice(0, 100);
}

async function forwardToCore(req: Request, res: Response, endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: object): Promise<void> {
  try {
    const actor = actorOf(req);
    const core = await callAiCore(endpoint, method, body, actor ? { 'X-Actor': actor } : {});
    if (core.status === 401 || core.status === 403) {
      // токен между приложением и ядром не совпал — это ошибка настройки, а не прав пользователя
      console.error('[admin] AI core rejected the internal token');
      res.status(502).json({ error: 'ИИ-ядро отклонило запрос: проверьте INTERNAL_API_TOKEN' });
      return;
    }
    if (core.status >= 400) {
      const detail = core.data && typeof core.data.detail === 'string' ? core.data.detail : 'Ошибка ИИ-ядра';
      res.status(core.status >= 500 ? 502 : core.status).json({ error: detail });
      return;
    }
    res.json(core.data);
  } catch (error) {
    if (!(error instanceof AiCoreUnavailable)) console.error('[admin] ai-models failed:', (error as Error).message);
    res.status(503).json({ error: 'ИИ-ядро недоступно. Выбор моделей работает только при запущенном ядре.' });
  }
}

function modeOf(value: unknown): string | null {
  if (value === undefined || value === '') return 'global';
  return typeof value === 'string' && MODEL_MODES.includes(value) ? value : null;
}

router.get('/ai-models', async (req: Request, res: Response) => {
  const mode = modeOf(req.query.mode);
  if (!mode) { res.status(400).json({ error: 'Неизвестный режим' }); return; }
  await forwardToCore(req, res, `/api/v1/model-settings?mode=${mode}`, 'GET');
});

router.get('/ai-models/history', async (req: Request, res: Response) => {
  const limit = Math.min(200, Math.max(1, parseInt(String(req.query.limit ?? '50'), 10) || 50));
  await forwardToCore(req, res, `/api/v1/model-settings/history?limit=${limit}`, 'GET');
});

router.post('/ai-models/refresh-catalog', async (req: Request, res: Response) => {
  const mode = modeOf(req.query.mode);
  if (!mode) { res.status(400).json({ error: 'Неизвестный режим' }); return; }
  await forwardToCore(req, res, `/api/v1/model-settings/refresh-catalog?mode=${mode}`, 'POST');
});

router.put('/ai-models/:task', async (req: Request, res: Response) => {
  const { task } = req.params;
  const model = req.body?.model;
  const mode = modeOf(req.body?.mode);
  if (!TASK_RE.test(task)) { res.status(400).json({ error: 'Некорректная задача' }); return; }
  if (!mode) { res.status(400).json({ error: 'Неизвестный режим' }); return; }
  if (typeof model !== 'string' || model.length < 3 || model.length > 160) { res.status(400).json({ error: 'Укажите идентификатор модели' }); return; }
  await forwardToCore(req, res, `/api/v1/model-settings/${task}`, 'PUT', { model, mode });
});

router.delete('/ai-models/:task', async (req: Request, res: Response) => {
  const { task } = req.params;
  const mode = modeOf(req.query.mode);
  if (!TASK_RE.test(task)) { res.status(400).json({ error: 'Некорректная задача' }); return; }
  if (!mode) { res.status(400).json({ error: 'Неизвестный режим' }); return; }
  await forwardToCore(req, res, `/api/v1/model-settings/${task}?mode=${mode}`, 'DELETE');
});

export = router;
