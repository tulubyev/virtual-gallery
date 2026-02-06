const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/clear-uploads', async (req, res) => {
  try {
    const dir = path.join(__dirname, '../../public/uploads');
    const files = fs.readdirSync(dir);
    files.forEach(f => { if(f !== '.gitkeep') fs.unlinkSync(path.join(dir, f)); });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/uploads-info', async (req, res) => {
  try {
    const dir = path.join(__dirname, '../../public/uploads');
    const files = fs.readdirSync(dir).filter(f => f !== '.gitkeep');
    res.json({ success: true, count: files.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
