/**
 * Health check routes
 */

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const { createClient } = require('redis');

// Health check endpoint
router.get('/', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime(),
    services: {}
  };

  // Check database
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
    await pool.query('SELECT 1');
    await pool.end();
    health.services.database = 'up';
  } catch (error) {
    health.services.database = 'down';
    health.status = 'degraded';
  }

  // Check Redis
  try {
    const redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();
    await redis.ping();
    await redis.disconnect();
    health.services.redis = 'up';
  } catch (error) {
    health.services.redis = 'down';
    health.status = 'degraded';
  }

  // Check Qdrant
  try {
    const response = await fetch(`${process.env.QDRANT_URL}/health`, {
      timeout: 5000
    });
    if (response.ok) {
      health.services.qdrant = 'up';
    } else {
      health.services.qdrant = 'down';
      health.status = 'degraded';
    }
  } catch (error) {
    health.services.qdrant = 'down';
    health.status = 'degraded';
  }

  // Check external APIs
  try {
    // OpenAI check (simple ping)
    health.services.openai = process.env.OPENAI_API_KEY ? 'configured' : 'not_configured';
  } catch (error) {
    health.services.openai = 'error';
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});

// Detailed health check
router.get('/detailed', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    system: {
      platform: process.platform,
      arch: process.arch,
      node_version: process.version,
      memory: process.memoryUsage(),
      uptime: process.uptime()
    },
    services: {},
    metrics: {
      active_tasks: 0, // Would be populated from actual metrics
      queue_size: 0,
      avg_response_time: 0
    }
  };

  // Add more detailed checks here

  res.json(health);
});

module.exports = router;