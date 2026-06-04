require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('./src/config/database');
const { noCacheMiddleware } = require('./src/middleware/cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(noCacheMiddleware);

// API Routes (must be first)
app.use('/api', require('./src/routes/health'));
app.use('/api/ai', require('./src/routes/ai'));
app.use('/api/gallery', require('./src/routes/gallery'));
app.use('/api/artworks', require('./src/routes/artworks'));
app.use('/api/collections', require('./src/routes/collections'));
app.use('/api/admin', require('./src/routes/admin'));
app.use('/api/admin/users', require('./src/routes/users'));
app.use('/api/watermark', require('./src/routes/watermark'));
app.use('/api/archive', require('./src/routes/archive'));
app.use('/api/display-settings', require('./src/routes/display-settings'));
app.use('/api/stats', require('./src/routes/stats'));
app.use('/api/auctions', require('./src/routes/auctions'));

// Static assets
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// React SPA built assets (hashed filenames, served at /assets/...)
app.use(express.static(path.join(__dirname, 'src/frontend/dist')));

// Legacy HTML assets fallback (for /html/* routes)
app.use('/assets', express.static(path.join(__dirname, 'src/frontend/assets')));
app.use(express.static(path.join(__dirname, 'src/frontend')));

// HTML originals accessible at /html/* for design reference
const htmlPages = ['admin', 'curator', 'auction', 'gallery-3d', 'artwiki', 'rag', 'staff', 'user', 'auction-participant', 'about'];
htmlPages.forEach(p => app.get(`/html/${p}`, (req, res) => res.sendFile(path.join(__dirname, `src/frontend/${p}.html`))));
app.get('/html', (req, res) => res.sendFile(path.join(__dirname, 'src/frontend/index.html')));

// Pages not yet in React SPA — temporarily serve HTML until React versions are ready
// artwiki and rag are now handled by React Router
const htmlFallbackPages = ['auction', 'gallery-3d', 'auction-participant'];
htmlFallbackPages.forEach(p => app.get(`/${p}`, (req, res) => res.sendFile(path.join(__dirname, `src/frontend/${p}.html`))));

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
