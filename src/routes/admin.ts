import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/clear-uploads', async (_req: Request, res: Response) => {
  try {
    const dir = path.join(__dirname, '../../public/uploads');
    const files = fs.readdirSync(dir);
    files.forEach(f => {
      if (f !== '.gitkeep') fs.unlinkSync(path.join(dir, f));
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/uploads-info', async (_req: Request, res: Response) => {
  try {
    const dir = path.join(__dirname, '../../public/uploads');
    const files = fs.readdirSync(dir).filter(f => f !== '.gitkeep');
    res.json({ success: true, count: files.length });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export = router;
