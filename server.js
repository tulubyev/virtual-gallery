const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.use(express.static(path.join(__dirname, 'src/frontend')));
app.use('/assets', express.static(path.join(__dirname, 'src/frontend/assets')));

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Virtual Gallery server running at http://0.0.0.0:${PORT}`);
});
