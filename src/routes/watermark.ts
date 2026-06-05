import express, { Request, Response } from 'express';
import fs from 'fs';
import https from 'https';
import http from 'http';
import multer from 'multer';

const router = express.Router();
const WatermarkService = require('../services/watermark');
const watermarkService = new WatermarkService();
const upload = multer({ dest: 'public/uploads/' });

function fetchImageBuffer(imageUrl: string): Promise<Buffer> {
  const protocol = imageUrl.startsWith('https') ? https : http;
  return new Promise((resolve, reject) => {
    protocol.get(imageUrl, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        fetchImageBuffer(response.headers.location!).then(resolve).catch(reject);
        return;
      }
      const chunks: Buffer[] = [];
      response.on('data', (chunk: Buffer) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

router.post('/apply', async (req: Request, res: Response) => {
  try {
    const { imageUrl, artworkId, type, text, opacity, position, owner, title, artist, metadata: extraMetadata } = req.body;
    if (!imageUrl) return res.status(400).json({ success: false, error: 'No image URL provided' });

    const imageBuffer = await fetchImageBuffer(imageUrl);
    let result: Buffer;
    const protectionMetadata = { artworkId, owner: owner || 'VirtGal.ru', title, artist, extra: extraMetadata || '' };

    switch (type) {
      case 'visible':
        result = await watermarkService.applyVisibleWatermark(imageBuffer, {
          text: text || 'VirtGal.ru',
          opacity: parseFloat(opacity) || 0.3,
          position: position || 'bottom-right',
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
          position: position || 'bottom-right',
        })).buffer;
        break;
      default:
        return res.status(400).json({ success: false, error: 'Invalid protection type' });
    }

    res.json({ success: true, image: `data:image/png;base64,${result.toString('base64')}`, type, artworkId });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/verify', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'No image provided' });
    const imageBuffer = fs.readFileSync(req.file.path);
    const verification = await watermarkService.verifyProtection(imageBuffer);
    fs.unlinkSync(req.file.path);
    res.json({ success: true, ...verification });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export = router;
