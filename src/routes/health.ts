import express, { Request, Response } from 'express';
import pool from '../config/database';
import { s3Client } from '../config/s3';
import { ListBucketsCommand } from '@aws-sdk/client-s3';

const router = express.Router();
const AI_CORE_URL = process.env.AI_CORE_URL || 'http://localhost:8001';

router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'virtual-gallery',
    version: '1.0.0',
    ai_service_url: AI_CORE_URL,
    timestamp: new Date().toISOString(),
  });
});

router.get('/ai/health', async (_req: Request, res: Response) => {
  try {
    const response = await fetch(`${AI_CORE_URL}/health`);
    const data = await response.json();
    res.json({ status: 'connected', ai_service: data, timestamp: new Date().toISOString() });
  } catch (error: any) {
    res.status(503).json({
      status: 'disconnected',
      error: error.message,
      ai_service_url: AI_CORE_URL,
      hint: 'AI/ML service is not running.',
    });
  }
});

function createTimeout(ms: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

router.get('/infra/status', async (_req: Request, res: Response) => {
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    services: {},
  };

  results.services.gallery = { status: 'ok', latency: 0 };

  const startAi = Date.now();
  try {
    const aiResponse = await fetch(`${AI_CORE_URL}/health`, { signal: createTimeout(5000) });
    results.services.aiml = {
      status: aiResponse.ok ? 'ok' : 'error',
      latency: Date.now() - startAi,
      url: AI_CORE_URL,
    };
  } catch (error: any) {
    results.services.aiml = { status: 'disconnected', error: error.message, url: AI_CORE_URL };
  }

  const startDb = Date.now();
  try {
    await pool.query('SELECT 1');
    results.services.database = { status: 'ok', latency: Date.now() - startDb };
  } catch (error: any) {
    results.services.database = { status: 'disconnected', error: error.message };
  }

  const startS3 = Date.now();
  try {
    await s3Client.send(new ListBucketsCommand({}));
    results.services.storage = {
      status: 'ok',
      latency: Date.now() - startS3,
      bucket: process.env.S3_BUCKET,
    };
  } catch (error: any) {
    results.services.storage = { status: 'disconnected', error: error.message };
  }

  const qdrantUrl = process.env.QDRANT_URL;
  const qdrantApiKey = process.env.QDRANT_API_KEY;
  if (qdrantUrl) {
    const startQdrant = Date.now();
    try {
      const headers: Record<string, string> = {};
      if (qdrantApiKey) headers['api-key'] = qdrantApiKey;
      const qdrantResponse = await fetch(`${qdrantUrl.replace(/\/$/, '')}/collections`, {
        headers,
        signal: createTimeout(5000),
      });
      results.services.qdrant = {
        status: qdrantResponse.ok ? 'ok' : 'error',
        latency: Date.now() - startQdrant,
      };
    } catch (error: any) {
      results.services.qdrant = { status: 'disconnected', error: error.message };
    }
  } else {
    results.services.qdrant = { status: 'not_configured' };
  }

  const redisUrl = process.env.REDIS_URL || process.env.REDIS_HOST;
  results.services.redis = redisUrl
    ? { status: 'not_configured', note: 'Redis client not initialized in this service' }
    : { status: 'not_configured' };

  res.json(results);
});

export = router;
