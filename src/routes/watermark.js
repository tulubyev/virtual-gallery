const express = require('express');
const router = express.Router();
const fs = require('fs');
const WatermarkService = require('../services/watermark');
const watermarkService = new WatermarkService();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

async function fetchImageBuffer(imageUrl) {
  const https = require('https');
  const http = require('http');
  const protocol = imageUrl.startsWith('https') ? https : http;
  
  return new Promise((resolve, reject) => {
    protocol.get(imageUrl, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        fetchImageBuffer(response.headers.location).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

router.post('/apply', async (req, res) => {
  try {
    const { imageUrl, artworkId, type, text, opacity, position, owner, title, artist, metadata: extraMetadata } = req.body;
    if (!imageUrl) return res.status(400).json({ success: false, error: 'No image URL provided' });
    
    const imageBuffer = await fetchImageBuffer(imageUrl);
    let result;
    let protectionMetadata = { artworkId, owner: owner || 'VirtGal.ru', title, artist, extra: extraMetadata || '' };
    
    switch(type) {
      case 'visible':
        result = await watermarkService.applyVisibleWatermark(imageBuffer, {
          text: text || 'VirtGal.ru',
          opacity: parseFloat(opacity) || 0.3,
          position: position || 'bottom-right'
        });
        break;
      case 'invisible':
        result = await watermarkService.applyInvisibleWatermark(imageBuffer, protectionMetadata);
        break;
      case 'steganography':
        result = (await watermarkService.applySteganography(imageBuffer, protectionMetadata)).buffer;
        break;
      case 'full':
        result = (await watermarkService.applyAllProtection(imageBuffer, protectionMetadata, {
          watermarkText: text || 'VirtGal.ru',
          opacity: parseFloat(opacity) || 0.3,
          position: position || 'bottom-right'
        })).buffer;
        break;
      default:
        return res.status(400).json({ success: false, error: 'Invalid protection type' });
    }
    
    res.json({ success: true, image: `data:image/png;base64,${result.toString('base64')}`, type, artworkId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/verify', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'No image provided' });
    const imageBuffer = fs.readFileSync(req.file.path);
    const verification = await watermarkService.verifyProtection(imageBuffer);
    fs.unlinkSync(req.file.path);
    res.json({ success: true, ...verification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
