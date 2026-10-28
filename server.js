require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('./src/config/database');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { noCacheMiddleware } = require('./src/middleware/cors');
const { xssProtection } = require('./src/middleware/security');
const { accessControl } = require('./src/middleware/accessPolicy');
const { createAiBudget, aiBudgetOptionsFromEnv } = require('./src/middleware/aiBudget');
const { createMediaHandler } = require('./src/services/media');

// В проде без нормального секрета токены можно подделать (в коде есть запасные значения)
if (process.env.NODE_ENV === 'production' && (process.env.JWT_SECRET || '').length < 32) {
  console.error('JWT_SECRET не задан или короче 32 символов — сервер не запущен');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// За Traefik: корректные req.ip / протокол (rate limit, логи)
app.set('trust proxy', 1);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Сжатие ответов (gzip/deflate): JS-бандлы и JSON
app.use(compression());

// Заголовки безопасности для всех ответов
app.use(xssProtection);

// Лимиты: перебор паролей и платные ИИ-запросы
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false, message: { error: 'Слишком много попыток, попробуйте позже.' } });
const aiLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 60, standardHeaders: true, legacyHeaders: false, message: { error: 'Слишком много запросов, попробуйте позже.' } });
app.use(['/api/auth/login', '/api/auth/register'], authLimiter);
app.use('/api/ai', aiLimiter);

// Единая политика доступа ко всему /api (см. src/middleware/accessPolicy.ts)
app.use('/api', accessControl);

// Бюджет платных ИИ-запросов (по IP и в сутки). После accessControl: нужна роль пользователя, сотрудники не ограничиваются
app.use('/api/ai', createAiBudget(aiBudgetOptionsFromEnv()));

// API Routes — no-cache so clients always get fresh data
app.use('/api/auth', noCacheMiddleware, require('./src/routes/auth'));
app.use('/api', noCacheMiddleware, require('./src/routes/health'));
app.use('/api/ai', noCacheMiddleware, require('./src/routes/ai'));
app.use('/api/legal', noCacheMiddleware, require('./src/routes/legal'));
// Новый торговый движок: выключен, пока не применены миграции и не задан BIDDING_ENABLED=true (docs/DEPLOY.md)
if (process.env.BIDDING_ENABLED === 'true') {
  app.use('/api/bidding', noCacheMiddleware, require('./src/routes/bidding'));
  require('./src/services/biddingWorker').startBiddingWorker();
  // Отправка уведомлений вовне включается NOTIFY_TRANSPORT (пока только «log» для стенда); без неё уведомления видны в кабинете участника
  const notifyTransport = require('./src/services/notificationTransports').transportFromEnv();
  if (notifyTransport) require('./src/services/biddingNotifications').startNotificationDispatcher(notifyTransport);
}
app.use('/api/gallery', noCacheMiddleware, require('./src/routes/gallery'));
app.use('/api/artworks', noCacheMiddleware, require('./src/routes/artworks'));
app.use('/api/artwork-cards', noCacheMiddleware, require('./src/routes/artworkCards'));
app.use('/api/collections', noCacheMiddleware, require('./src/routes/collections'));
app.use('/api/admin', noCacheMiddleware, require('./src/routes/admin'));
app.use('/api/admin/users', noCacheMiddleware, require('./src/routes/users'));
app.use('/api/watermark', noCacheMiddleware, require('./src/routes/watermark'));
app.use('/api/archive', noCacheMiddleware, require('./src/routes/archive'));
app.use('/api/display-settings', noCacheMiddleware, require('./src/routes/display-settings'));
app.use('/api/stats', noCacheMiddleware, require('./src/routes/stats'));
app.use('/api/public-config', noCacheMiddleware, require('./src/routes/public-config'));
app.use('/api/auctions', noCacheMiddleware, require('./src/routes/auctions'));

// Static assets
app.use('/js', express.static(path.join(__dirname, 'public/js')));
// Миниатюры загрузок (WebP) для 3D-галереи и списков
// /media/t/<ширина>/u/<файл> — локальные загрузки, /media/t/<ширина>/s/<ключ> — объекты S3; отдаются и через CDN
app.get('/media/t/:width/:kind(u|s)/*', createMediaHandler({ uploadsDir: path.join(__dirname, 'public/uploads') }));
// Имена загрузок уникальны (метка времени) — длинный кэш безопасен
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'), { maxAge: '30d', immutable: true }));

// React SPA hashed chunks — immutable cache (filename changes on every build)
app.use('/assets', express.static(path.join(__dirname, 'src/frontend/dist/assets'), {
  maxAge: '1y',
  immutable: true,
}));

// React SPA root (index.html — no cache so new deploys are picked up instantly)
app.use(express.static(path.join(__dirname, 'src/frontend/dist'), {
  maxAge: 0,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('index.html')) {
      res.set('Cache-Control', 'no-store');
    }
  },
}));

// Legacy HTML assets fallback (for /html/* routes)
app.use('/assets', express.static(path.join(__dirname, 'src/frontend/assets')));
app.use(express.static(path.join(__dirname, 'src/frontend')));

// HTML originals accessible at /html/* for design reference
const htmlPages = ['admin', 'curator', 'auction', 'gallery-3d', 'artwiki', 'rag', 'staff', 'user', 'auction-participant', 'about'];
htmlPages.forEach(p => app.get(`/html/${p}`, (req, res) => res.sendFile(path.join(__dirname, `src/frontend/${p}.html`))));
app.get('/html', (req, res) => res.sendFile(path.join(__dirname, 'src/frontend/index.html')));

// All pages now handled by React SPA — no HTML fallbacks needed

// React SPA catch-all — serves index.html for all unmatched routes (React Router handles them)
app.get('*', (req, res) => {
  const distIndex = path.join(__dirname, 'src/frontend/dist/index.html');
  res.sendFile(distIndex, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'src/frontend/index.html'));
    }
  });
});

async function startup() {
  try {
    await pool.query('ALTER TABLE archive ADD COLUMN IF NOT EXISTS source_location JSONB DEFAULT NULL');
  } catch (e) {}
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startup();
