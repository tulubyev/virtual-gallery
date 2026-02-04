const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

const AI_CORE_URL = process.env.AI_CORE_URL || 'http://localhost:8001';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

async function proxyToAiService(endpoint, method, body, res) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${AI_CORE_URL}${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
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
        body: text.substring(0, 500)
      });
    }
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`AI Service proxy error: ${error.message}`);
    
    if (error.name === 'AbortError') {
      res.status(504).json({
        error: 'AI/ML Service timeout',
        message: 'Request timed out after 30 seconds',
        hint: 'AI service may be overloaded or unreachable at ' + AI_CORE_URL
      });
    } else {
      res.status(503).json({
        error: 'AI/ML Service unavailable',
        message: error.message,
        hint: 'Ensure AI/ML service is running at ' + AI_CORE_URL
      });
    }
  }
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'virtual-gallery',
    version: '1.0.0',
    ai_service_url: AI_CORE_URL,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/ai/health', async (req, res) => {
  try {
    const response = await fetch(`${AI_CORE_URL}/health`);
    const data = await response.json();
    res.json({
      status: 'connected',
      ai_service: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'disconnected',
      error: error.message,
      ai_service_url: AI_CORE_URL,
      hint: 'AI/ML service is not running. Start it separately or configure AI_CORE_URL environment variable.'
    });
  }
});

app.post('/api/ai/analyze-image', async (req, res) => {
  const { imageUrl, artworkId, userId } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'imageUrl is required' });
  }

  await proxyToAiService('/api/v1/images/analyze', 'POST', {
    image_url: imageUrl,
    artwork_id: artworkId,
    user_id: userId
  }, res);
});

app.post('/api/ai/process-pdf', async (req, res) => {
  const { pdfUrl, documentId, userId } = req.body;

  if (!pdfUrl || !documentId) {
    return res.status(400).json({ error: 'pdfUrl and documentId are required' });
  }

  await proxyToAiService('/api/v1/pdfs/process', 'POST', {
    pdf_url: pdfUrl,
    document_id: documentId,
    user_id: userId
  }, res);
});

app.post('/api/ai/rag-query', async (req, res) => {
  const { query, contextLimit, filters, userId } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'query is required' });
  }

  await proxyToAiService('/api/v1/rag/query', 'POST', {
    query: query,
    context_limit: contextLimit || 5,
    context: {
      user_id: userId,
      filters: filters || {}
    }
  }, res);
});

app.get('/api/ai/analysis/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { type } = req.query;
  const endpoint = type === 'pdf' ? 'pdfs' : 'images';
  await proxyToAiService(`/api/v1/${endpoint}/analysis/${taskId}`, 'GET', null, res);
});

app.get('/api/ai/pdf-status/:taskId', async (req, res) => {
  const { taskId } = req.params;
  await proxyToAiService(`/api/v1/pdfs/processing/${taskId}`, 'GET', null, res);
});

app.post('/api/ai/describe-artwork', async (req, res) => {
  const { artworkId, imageUrl, language } = req.body;

  if (!artworkId && !imageUrl) {
    return res.status(400).json({ error: 'artworkId or imageUrl is required' });
  }

  await proxyToAiService('/api/v1/images/describe', 'POST', {
    artwork_id: artworkId,
    image_url: imageUrl,
    language: language || 'ru'
  }, res);
});

app.post('/api/ai/similar-artworks', async (req, res) => {
  const { artworkId, imageUrl, limit } = req.body;

  if (!artworkId && !imageUrl) {
    return res.status(400).json({ error: 'artworkId or imageUrl is required' });
  }

  await proxyToAiService('/api/v1/vectors/similar', 'POST', {
    artwork_id: artworkId,
    image_url: imageUrl,
    limit: limit || 5
  }, res);
});

app.use(express.static(path.join(__dirname, 'src/frontend')));
app.use('/assets', express.static(path.join(__dirname, 'src/frontend/assets')));
app.use('/react', express.static(path.join(__dirname, 'dist/frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/frontend/index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/frontend/admin.html'));
});

app.get('/curator', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/frontend/curator.html'));
});

app.get('/auction', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/frontend/auction-participant.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/frontend/index.html'));
});

app.get('/knowledge-base', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/frontend/knowledge-base.html'));
});

app.get('/staff', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/frontend/staff.html'));
});

app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/frontend/user.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Virtual Gallery server running at http://0.0.0.0:${PORT}`);
  console.log(`AI/ML Service configured at: ${AI_CORE_URL}`);
  console.log('');
  console.log('API Endpoints:');
  console.log('  GET  /api/health           - Gallery health check');
  console.log('  GET  /api/ai/health        - AI/ML service connection check');
  console.log('  POST /api/ai/analyze-image - Analyze artwork image');
  console.log('  POST /api/ai/process-pdf   - Process PDF document');
  console.log('  POST /api/ai/rag-query     - RAG query for knowledge base');
  console.log('  POST /api/ai/describe-artwork - Generate AI description');
  console.log('  POST /api/ai/similar-artworks - Find similar artworks');
});
