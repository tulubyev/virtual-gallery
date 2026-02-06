require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('./src/config/database');
const { noCacheMiddleware } = require('./src/middleware/cors');

const app = express();
const PORT = 5000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(noCacheMiddleware);

app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'src/frontend')));
app.use('/assets', express.static(path.join(__dirname, 'src/frontend/assets')));
app.use('/react', express.static(path.join(__dirname, 'dist/frontend')));

// Routes
app.use('/api', require('./src/routes/health'));
app.use('/api/ai', require('./src/routes/ai'));
app.use('/api/gallery', require('./src/routes/gallery'));
app.use('/api/artworks', require('./src/routes/artworks'));
app.use('/api/collections', require('./src/routes/collections'));
app.use('/api/admin', require('./src/routes/admin'));
app.use('/api/watermark', require('./src/routes/watermark'));
app.use('/api/archive', require('./src/routes/archive'));

// Frontend
const pages = ['admin', 'curator', 'auction', 'gallery-3d', 'knowledge-base', 'staff', 'user'];
pages.forEach(p => app.get(`/${p}`, (req, res) => res.sendFile(path.join(__dirname, `src/frontend/${p}.html`))));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'src/frontend/index.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
