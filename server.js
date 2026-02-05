require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { Pool } = require('pg');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const app = express();
const PORT = 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
  },
  region: process.env.S3_REGION || 'us-east-1',
  forcePathStyle: true
});

const S3_BUCKET = process.env.S3_BUCKET;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'artwork-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

async function uploadToS3(filePath, fileName, contentType) {
  const fileContent = fs.readFileSync(filePath);
  const key = `artworks/${fileName}`;
  
  await s3Client.send(new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: fileContent,
    ContentType: contentType,
    ACL: 'public-read'
  }));
  
  const endpoint = process.env.S3_ENDPOINT.replace('https://', '').replace('http://', '');
  return `https://${S3_BUCKET}.${endpoint}/${key}`;
}

const AI_CORE_URL = process.env.AI_CORE_URL || 'http://localhost:8001';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

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

function createTimeout(ms) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

app.get('/api/infra/status', async (req, res) => {
  const results = {
    timestamp: new Date().toISOString(),
    services: {}
  };

  results.services.gallery = { status: 'ok', latency: 0 };

  const startAi = Date.now();
  try {
    const aiResponse = await fetch(`${AI_CORE_URL}/health`, { signal: createTimeout(5000) });
    results.services.aiml = { 
      status: aiResponse.ok ? 'ok' : 'error', 
      latency: Date.now() - startAi,
      url: AI_CORE_URL
    };
  } catch (error) {
    results.services.aiml = { status: 'disconnected', error: error.message, url: AI_CORE_URL };
  }

  const startDb = Date.now();
  if (process.env.DATABASE_URL) {
    try {
      const { Pool } = require('pg');
      const pool = new Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 5000 });
      await pool.query('SELECT 1');
      await pool.end();
      results.services.database = { status: 'ok', latency: Date.now() - startDb };
    } catch (error) {
      results.services.database = { status: 'disconnected', error: error.message };
    }
  } else {
    results.services.database = { status: 'not_configured' };
  }

  const startS3 = Date.now();
  const s3Endpoint = process.env.S3_ENDPOINT;
  const s3AccessKey = process.env.S3_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY || process.env.AWS_ACCESS_KEY_ID;
  const s3SecretKey = process.env.S3_SECRET_ACCESS_KEY || process.env.S3_SECRET_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  
  if (s3Endpoint && s3AccessKey && s3SecretKey) {
    try {
      const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');
      const s3Client = new S3Client({
        endpoint: s3Endpoint,
        credentials: {
          accessKeyId: s3AccessKey,
          secretAccessKey: s3SecretKey
        },
        forcePathStyle: true,
        region: process.env.S3_REGION || 'us-east-1'
      });
      await s3Client.send(new ListBucketsCommand({}));
      results.services.storage = { status: 'ok', latency: Date.now() - startS3, bucket: process.env.S3_BUCKET_NAME };
    } catch (error) {
      results.services.storage = { status: 'disconnected', error: error.message };
    }
  } else {
    results.services.storage = { status: 'not_configured' };
  }

  const startQdrant = Date.now();
  if (process.env.QDRANT_URL) {
    try {
      const qdrantResponse = await fetch(`${process.env.QDRANT_URL}/collections`, { 
        signal: createTimeout(5000),
        headers: { 'api-key': process.env.QDRANT_API_KEY || '' }
      });
      results.services.qdrant = { status: qdrantResponse.ok ? 'ok' : 'error', latency: Date.now() - startQdrant };
    } catch (error) {
      results.services.qdrant = { status: 'disconnected', error: error.message };
    }
  } else {
    results.services.qdrant = { status: 'not_configured' };
  }

  const startRedis = Date.now();
  if (process.env.REDIS_URL) {
    try {
      const Redis = require('ioredis');
      const redis = new Redis(process.env.REDIS_URL, { connectTimeout: 5000, lazyConnect: true });
      await redis.ping();
      await redis.quit();
      results.services.redis = { status: 'ok', latency: Date.now() - startRedis };
    } catch (error) {
      results.services.redis = { status: 'disconnected', error: error.message };
    }
  } else {
    results.services.redis = { status: 'not_configured' };
  }

  results.services.openrouter = { 
    status: process.env.OPENROUTER_API_KEY ? 'configured' : 'not_configured' 
  };

  res.json(results);
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

app.post('/api/ai/calculate-slots', async (req, res) => {
  const { roomId, roomName, roomDimensions, collectionId, artworks } = req.body;

  if (!roomDimensions) {
    return res.status(400).json({ error: 'roomDimensions is required' });
  }

  try {
    const aiResponse = await fetch(`${AI_CORE_URL}/health`, { signal: createTimeout(3000) });
    
    if (aiResponse.ok) {
      await proxyToAiService('/api/v1/gallery/calculate-slots', 'POST', {
        room_id: roomId,
        room_name: roomName,
        room_dimensions: roomDimensions,
        collection_id: collectionId,
        artworks: artworks || []
      }, res);
    } else {
      throw new Error('AI service unavailable');
    }
  } catch (error) {
    const { width, depth, height } = roomDimensions;
    const wallArea = 2 * (width * height) + 2 * (depth * height);
    const avgArtworkArea = 2.5;
    const usableWallRatio = 0.4;
    const recommendedSlots = Math.floor((wallArea * usableWallRatio) / avgArtworkArea);
    const optimalSlots = Math.min(Math.max(recommendedSlots, 4), 12);
    
    const slotsPerWall = Math.ceil(optimalSlots / 3);
    const layout = {
      leftWall: slotsPerWall,
      rightWall: slotsPerWall,
      backWall: optimalSlots - (slotsPerWall * 2)
    };

    res.json({
      success: true,
      demo_mode: true,
      recommendation: {
        total_slots: optimalSlots,
        layout: layout,
        reasoning: `На основе размеров зала (${width}x${depth}x${height}м) рекомендуется ${optimalSlots} слотов. Расчёт: площадь стен ${wallArea.toFixed(0)}м², используемая площадь 40%, средний размер картины 2.5м².`,
        distribution: [
          { wall: 'left', slots: layout.leftWall, spacing: 'равномерно' },
          { wall: 'right', slots: layout.rightWall, spacing: 'равномерно' },
          { wall: 'back', slots: layout.backWall, spacing: 'по центру' }
        ]
      }
    });
  }
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

app.get('/gallery-3d', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/frontend/gallery-3d.html'));
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

app.get('/api/rooms/:roomId/artworks', async (req, res) => {
  const { roomId } = req.params;
  
  const demoArtworks = {
    main_hall: [],
    impressionism: [
      { id: 'imp_1', slot_id: 'slot_1', title: 'Водяные лилии', artist: 'Клод Моне', year: 1906, style: 'Импрессионизм', medium: 'Масло, холст', description: 'Одна из серии картин Моне, изображающих его сад в Живерни.' },
      { id: 'imp_2', slot_id: 'slot_2', title: 'Звездная ночь', artist: 'Винсент Ван Гог', year: 1889, style: 'Постимпрессионизм', medium: 'Масло, холст', description: 'Знаменитый ночной пейзаж с закручивающимися облаками.' },
      { id: 'imp_3', slot_id: 'slot_3', title: 'Бал в Мулен де ла Галетт', artist: 'Пьер-Огюст Ренуар', year: 1876, style: 'Импрессионизм', medium: 'Масло, холст', description: 'Сцена парижской жизни XIX века.' },
      { id: 'imp_4', slot_id: 'slot_4', title: 'Впечатление. Восходящее солнце', artist: 'Клод Моне', year: 1872, style: 'Импрессионизм', medium: 'Масло, холст', description: 'Картина, давшая название всему движению импрессионизма.' },
      { id: 'imp_5', slot_id: 'slot_5', title: 'Подсолнухи', artist: 'Винсент Ван Гог', year: 1888, style: 'Постимпрессионизм', medium: 'Масло, холст', description: 'Серия натюрмортов с подсолнухами в вазе.' },
      { id: 'imp_6', slot_id: 'slot_6', title: 'Танец в Буживале', artist: 'Пьер-Огюст Ренуар', year: 1883, style: 'Импрессионизм', medium: 'Масло, холст', description: 'Романтическая сцена танца на открытом воздухе.' }
    ],
    modern_art: [
      { id: 'mod_1', slot_id: 'slot_1', title: 'Композиция VIII', artist: 'Василий Кандинский', year: 1923, style: 'Абстракционизм', medium: 'Масло, холст', description: 'Яркий пример геометрической абстракции.' },
      { id: 'mod_2', slot_id: 'slot_2', title: 'Черный квадрат', artist: 'Казимир Малевич', year: 1915, style: 'Супрематизм', medium: 'Масло, холст', description: 'Манифест супрематизма и новой эры в искусстве.' },
      { id: 'mod_3', slot_id: 'slot_3', title: 'Номер 5, 1948', artist: 'Джексон Поллок', year: 1948, style: 'Абстрактный экспрессионизм', medium: 'Масло, оргалит', description: 'Знаменитая работа в технике дриппинга.' },
      { id: 'mod_4', slot_id: 'slot_4', title: 'Желтый, красный, синий', artist: 'Василий Кандинский', year: 1925, style: 'Абстракционизм', medium: 'Масло, холст', description: 'Исследование взаимодействия основных цветов и форм.' },
      { id: 'mod_5', slot_id: 'slot_5', title: 'Красный супрематический квадрат', artist: 'Казимир Малевич', year: 1915, style: 'Супрематизм', medium: 'Масло, холст', description: 'Продолжение исследований чистой формы.' }
    ],
    renaissance: [
      { id: 'ren_1', slot_id: 'slot_1', title: 'Мона Лиза', artist: 'Леонардо да Винчи', year: 1503, style: 'Высокое Возрождение', medium: 'Масло, тополь', description: 'Самый известный портрет в истории искусства.' },
      { id: 'ren_2', slot_id: 'slot_2', title: 'Тайная вечеря', artist: 'Леонардо да Винчи', year: 1498, style: 'Высокое Возрождение', medium: 'Темпера, гипс', description: 'Монументальная фреска в Милане.' },
      { id: 'ren_3', slot_id: 'slot_3', title: 'Рождение Венеры', artist: 'Сандро Боттичелли', year: 1485, style: 'Раннее Возрождение', medium: 'Темпера, холст', description: 'Изображение богини любви, выходящей из моря.' },
      { id: 'ren_4', slot_id: 'slot_4', title: 'Сотворение Адама', artist: 'Микеланджело', year: 1512, style: 'Высокое Возрождение', medium: 'Фреска', description: 'Фрагмент росписи Сикстинской капеллы.' },
      { id: 'ren_5', slot_id: 'slot_5', title: 'Весна', artist: 'Сандро Боттичелли', year: 1482, style: 'Раннее Возрождение', medium: 'Темпера, дерево', description: 'Аллегорическое изображение весны.' },
      { id: 'ren_6', slot_id: 'slot_6', title: 'Давид', artist: 'Микеланджело', year: 1504, style: 'Высокое Возрождение', medium: 'Мрамор', description: 'Шедевр скульптуры, символ Флоренции.' }
    ],
    contemporary: [
      { id: 'con_1', slot_id: 'slot_1', title: 'Девочка с воздушным шаром', artist: 'Бэнкси', year: 2002, style: 'Стрит-арт', medium: 'Трафарет', description: 'Один из самых узнаваемых образов современного искусства.' },
      { id: 'con_2', slot_id: 'slot_2', title: 'Кролик', artist: 'Джефф Кунс', year: 1986, style: 'Неопоп', medium: 'Нержавеющая сталь', description: 'Отражающая скульптура кролика.' },
      { id: 'con_3', slot_id: 'slot_3', title: 'Бесконечная тыквенная комната', artist: 'Яёи Кусама', year: 2016, style: 'Инсталляция', medium: 'Смешанная техника', description: 'Иммерсивная инсталляция с зеркалами и тыквами.' },
      { id: 'con_4', slot_id: 'slot_4', title: 'Физическая невозможность смерти', artist: 'Дэмиен Херст', year: 1991, style: 'Инсталляция', medium: 'Акула, формальдегид', description: 'Провокационная работа с тигровой акулой.' },
      { id: 'con_5', slot_id: 'slot_5', title: 'Love Is in the Bin', artist: 'Бэнкси', year: 2018, style: 'Концептуальное искусство', medium: 'Смешанная техника', description: 'Самоуничтожившаяся картина на аукционе.' }
    ]
  };

  const artworks = demoArtworks[roomId] || [];
  res.json(artworks);
});

app.get('/api/gallery/rooms', (req, res) => {
  const rooms = [
    { id: 'main_hall', name: 'Главный холл', theme: 'neutral', artworks_count: 0 },
    { id: 'impressionism', name: 'Импрессионизм', theme: 'impressionism', artworks_count: 6 },
    { id: 'modern_art', name: 'Современное искусство', theme: 'modern', artworks_count: 5 },
    { id: 'renaissance', name: 'Ренессанс', theme: 'classical', artworks_count: 6 },
    { id: 'contemporary', name: 'Современное искусство XXI века', theme: 'contemporary', artworks_count: 5 }
  ];
  res.json(rooms);
});

let galleryConfiguration = null;

app.post('/api/gallery/config', (req, res) => {
  try {
    galleryConfiguration = req.body;
    console.log('Gallery configuration saved:', JSON.stringify(galleryConfiguration, null, 2));
    res.json({ success: true, message: 'Configuration saved successfully' });
  } catch (error) {
    console.error('Error saving gallery config:', error);
    res.status(500).json({ success: false, error: 'Failed to save configuration' });
  }
});

app.get('/api/gallery/config', (req, res) => {
  if (galleryConfiguration) {
    res.json(galleryConfiguration);
  } else {
    res.json({
      rooms: [
        { id: 'main_hall', name: 'Главный холл', theme: 'classic', width: 20, depth: 25, height: 6, wallColor: '#f5f0e6', lighting: 70, slots: 5, connections: ['impressionism', 'modern_art'] },
        { id: 'impressionism', name: 'Импрессионизм', theme: 'classic', width: 18, depth: 20, height: 5, wallColor: '#faf5f0', lighting: 80, slots: 6, connections: ['main_hall'] },
        { id: 'modern_art', name: 'Современное искусство', theme: 'modern', width: 15, depth: 15, height: 4, wallColor: '#ffffff', lighting: 90, slots: 4, connections: ['main_hall'] },
        { id: 'renaissance', name: 'Ренессанс', theme: 'classic', width: 22, depth: 28, height: 7, wallColor: '#f0e8d8', lighting: 60, slots: 6, connections: ['main_hall'] },
        { id: 'contemporary', name: 'Современность', theme: 'dark', width: 16, depth: 16, height: 4, wallColor: '#2a2a2a', lighting: 50, slots: 5, connections: ['main_hall'] }
      ],
      currentRoom: 'main_hall'
    });
  }
});

// Artworks API - Direct upload without AI service (uploads to S3)
app.post('/api/artworks/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    const { title, artist, year, medium, dimensions, style, country, epoch, description, tags } = req.body;
    
    let imageUrl;
    const localPath = req.file.path;
    
    try {
      imageUrl = await uploadToS3(localPath, req.file.filename, req.file.mimetype);
      console.log('Uploaded to S3:', imageUrl);
    } catch (s3Error) {
      console.error('S3 upload failed, using local storage:', s3Error.message);
      imageUrl = '/uploads/' + req.file.filename;
    }
    
    const result = await pool.query(
      `INSERT INTO artworks (title, artist, year_created, medium, dimensions, style, country, epoch, description, image_url, tags, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'active')
       RETURNING *`,
      [
        title || 'Untitled',
        artist || 'Unknown',
        year ? parseInt(year) : null,
        medium || null,
        dimensions || null,
        style || null,
        country || null,
        epoch || null,
        description || null,
        imageUrl,
        tags ? tags.split(',').map(t => t.trim()) : null
      ]
    );
    
    res.json({
      success: true,
      message: 'Artwork uploaded successfully',
      artwork: result.rows[0],
      storage: imageUrl.startsWith('https://') ? 's3' : 'local'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload artwork', details: error.message });
  }
});

async function getArtworks(req, res) {
  try {
    const { status, style, country, epoch, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM artworks WHERE 1=1';
    const params = [];
    let paramIndex = 1;
    
    if (status) {
      query += ` AND status = $${paramIndex++}`;
      params.push(status);
    }
    if (style) {
      query += ` AND style = $${paramIndex++}`;
      params.push(style);
    }
    if (country) {
      query += ` AND country = $${paramIndex++}`;
      params.push(country);
    }
    if (epoch) {
      query += ` AND epoch = $${paramIndex++}`;
      params.push(epoch);
    }
    
    query += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      artworks: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error('Fetch artworks error:', error);
    res.status(500).json({ error: 'Failed to fetch artworks', details: error.message });
  }
}

app.get('/api/artworks', getArtworks);

app.get('/api/v1/artworks', async (req, res) => {
  try {
    const { status, style, country, epoch, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM artworks WHERE 1=1';
    const params = [];
    let paramIndex = 1;
    
    if (status) {
      query += ` AND status = $${paramIndex++}`;
      params.push(status);
    }
    if (style) {
      query += ` AND style = $${paramIndex++}`;
      params.push(style);
    }
    if (country) {
      query += ` AND country = $${paramIndex++}`;
      params.push(country);
    }
    if (epoch) {
      query += ` AND epoch = $${paramIndex++}`;
      params.push(epoch);
    }
    
    query += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Fetch artworks v1 error:', error);
    res.status(500).json([]);
  }
});

app.get('/api/artworks/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM artworks WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artwork not found' });
    }
    
    res.json({ success: true, artwork: result.rows[0] });
  } catch (error) {
    console.error('Fetch artwork error:', error);
    res.status(500).json({ error: 'Failed to fetch artwork', details: error.message });
  }
});

app.delete('/api/artworks/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM artworks WHERE id = $1 RETURNING *', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artwork not found' });
    }
    
    res.json({ success: true, message: 'Artwork deleted', artwork: result.rows[0] });
  } catch (error) {
    console.error('Delete artwork error:', error);
    res.status(500).json({ error: 'Failed to delete artwork', details: error.message });
  }
});

// Clear local uploads folder (manual cleanup)
app.post('/api/admin/clear-uploads', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, 'public/uploads');
    const files = fs.readdirSync(uploadsDir);
    
    let deleted = 0;
    let skipped = 0;
    
    for (const file of files) {
      if (file === '.gitkeep') {
        skipped++;
        continue;
      }
      
      const filePath = path.join(uploadsDir, file);
      fs.unlinkSync(filePath);
      deleted++;
    }
    
    res.json({
      success: true,
      message: `Cleared ${deleted} files from uploads folder`,
      deleted,
      skipped
    });
  } catch (error) {
    console.error('Clear uploads error:', error);
    res.status(500).json({ error: 'Failed to clear uploads', details: error.message });
  }
});

// Get uploads folder info
app.get('/api/admin/uploads-info', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, 'public/uploads');
    const files = fs.readdirSync(uploadsDir);
    
    let totalSize = 0;
    const fileList = [];
    
    for (const file of files) {
      if (file === '.gitkeep') continue;
      
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      fileList.push({
        name: file,
        size: stats.size,
        created: stats.birthtime
      });
    }
    
    res.json({
      success: true,
      count: fileList.length,
      totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      files: fileList
    });
  } catch (error) {
    console.error('Uploads info error:', error);
    res.status(500).json({ error: 'Failed to get uploads info', details: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Virtual Gallery server running at http://0.0.0.0:${PORT}`);
  console.log(`AI/ML Service configured at: ${AI_CORE_URL}`);
  console.log(`S3 Storage: ${process.env.S3_BUCKET || 'not configured'}`);
  console.log('');
  console.log('API Endpoints:');
  console.log('  GET  /api/health           - Gallery health check');
  console.log('  GET  /api/ai/health        - AI/ML service connection check');
  console.log('  POST /api/ai/analyze-image - Analyze artwork image');
  console.log('  POST /api/ai/process-pdf   - Process PDF document');
  console.log('  POST /api/ai/rag-query     - RAG query for knowledge base');
  console.log('  POST /api/ai/describe-artwork - Generate AI description');
  console.log('  POST /api/ai/similar-artworks - Find similar artworks');
  console.log('  POST /api/artworks/upload  - Direct artwork upload (to S3)');
  console.log('  GET  /api/artworks         - List all artworks');
  console.log('  POST /api/admin/clear-uploads - Clear local uploads folder');
  console.log('  GET  /api/admin/uploads-info  - Get uploads folder info');
});
