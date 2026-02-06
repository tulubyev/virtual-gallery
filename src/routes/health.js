const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { s3Client } = require('../config/s3');
const { ListBucketsCommand } = require('@aws-sdk/client-s3');

const AI_CORE_URL = process.env.AI_CORE_URL || 'http://localhost:8001';

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'virtual-gallery',
    version: '1.0.0',
    ai_service_url: AI_CORE_URL,
    timestamp: new Date().toISOString()
  });
});

router.get('/ai/health', async (req, res) => {
  try {
    const response = await fetch(`${AI_CORE_URL}/health`);
    const data = await response.json();
    res.json({
      status: 'connected',
      ai_service: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'disconnected',
      error: error.message,
      ai_service_url: AI_CORE_URL,
      hint: 'AI/ML service is not running.'
    });
  }
});

function createTimeout(ms) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

router.get('/infra/status', async (req, res) => {
  const results = {
    timestamp: new Date().toISOString(),
    services: {}
  };

  results.services.gallery = { status: 'ok', latency: 0 };

  const startAi = Date.now();
  try {
    const aiResponse = await fetch(`${AI_CORE_URL}/health`, { signal: createTimeout(5000) });
    results.services.aiml = { 
      status: aiResponse.ok ? 'ok' : 'error', 
      latency: Date.now() - startAi,
      url: AI_CORE_URL
    };
  } catch (error) {
    results.services.aiml = { status: 'disconnected', error: error.message, url: AI_CORE_URL };
  }

  const startDb = Date.now();
  try {
    await pool.query('SELECT 1');
    results.services.database = { status: 'ok', latency: Date.now() - startDb };
  } catch (error) {
    results.services.database = { status: 'disconnected', error: error.message };
  }

  const startS3 = Date.now();
  try {
    await s3Client.send(new ListBucketsCommand({}));
    results.services.storage = { status: 'ok', latency: Date.now() - startS3, bucket: process.env.S3_BUCKET };
  } catch (error) {
    results.services.storage = { status: 'disconnected', error: error.message };
  }

  res.json(results);
});

module.exports = router;
