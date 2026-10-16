// src/routes/public-config.ts
// Публичные настройки для клиента (без секретов): откуда брать изображения.
import express, { Request, Response } from 'express';
import { publicMediaConfig } from '../services/media';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ media: publicMediaConfig() });
});

export = router;
