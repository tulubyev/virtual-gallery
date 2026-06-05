import express, { Request, Response } from 'express';

const router = express.Router();
const AI_CORE_URL = process.env.AI_CORE_URL || 'http://localhost:8001';

async function proxyToAiService(
  endpoint: string,
  method: string,
  body: object | null,
  res: Response
): Promise<void> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${AI_CORE_URL}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
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
    res.status(503).json({ error: 'AI/ML Service unavailable', message: error.message });
  }
}

router.post('/analyze-image', async (req: Request, res: Response) => {
  const { imageUrl, artworkId, userId } = req.body;
  await proxyToAiService('/api/v1/images/analyze', 'POST', {
    image_url: imageUrl, artwork_id: artworkId, user_id: userId,
  }, res);
});

router.post('/process-pdf', async (req: Request, res: Response) => {
  const { pdfUrl, documentId, userId } = req.body;
  await proxyToAiService('/api/v1/pdfs/process', 'POST', {
    pdf_url: pdfUrl, document_id: documentId, user_id: userId,
  }, res);
});

router.post('/rag-query', async (req: Request, res: Response) => {
  const { query, contextLimit, filters, userId } = req.body;
  await proxyToAiService('/api/v1/rag/query', 'POST', {
    query, context_limit: contextLimit || 5, context: { user_id: userId, filters: filters || {} },
  }, res);
});

router.get('/analysis/:taskId', async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { type } = req.query;
  const endpoint = type === 'pdf' ? 'pdfs' : 'images';
  await proxyToAiService(`/api/v1/${endpoint}/analysis/${taskId}`, 'GET', null, res);
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
