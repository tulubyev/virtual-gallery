/**
 * Admin routes for monitoring and management
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Pool } = require('pg');

/**
 * GET /api/v1/admin/tasks
 * Get list of active tasks
 */
router.get('/tasks', async (req, res) => {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });

    const { status, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT task_id, task_type, status, priority, created_at, started_at, completed_at
      FROM ai_tasks
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (status) {
      query += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(parseInt(limit), parseInt(offset));

    const result = await pool.query(query, params);
    await pool.end();

    res.json({
      tasks: result.rows,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: result.rows.length // In production, get total count separately
      }
    });

  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      error: {
        code: 'FETCH_ERROR',
        message: 'Failed to fetch tasks'
      }
    });
  }
});

/**
 * GET /api/v1/admin/metrics
 * Get service metrics
 */
router.get('/metrics', async (req, res) => {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });

    // Get task statistics
    const taskStats = await pool.query(`
      SELECT
        status,
        COUNT(*) as count,
        AVG(EXTRACT(EPOCH FROM (completed_at - started_at))) as avg_processing_time
      FROM ai_tasks
      WHERE created_at >= NOW() - INTERVAL '24 hours'
      GROUP BY status
    `);

    // Get API usage statistics
    const apiStats = await pool.query(`
      SELECT
        endpoint,
        COUNT(*) as requests,
        AVG(processing_time) as avg_response_time,
        SUM(estimated_cost) as total_cost
      FROM api_usage
      WHERE created_at >= NOW() - INTERVAL '24 hours'
      GROUP BY endpoint
    `);

    await pool.end();

    const metrics = {
      timestamp: new Date().toISOString(),
      tasks: {
        by_status: taskStats.rows.reduce((acc, row) => {
          acc[row.status] = {
            count: parseInt(row.count),
            avg_processing_time: parseFloat(row.avg_processing_time || 0)
          };
          return acc;
        }, {})
      },
      api: {
        by_endpoint: apiStats.rows.reduce((acc, row) => {
          acc[row.endpoint] = {
            requests: parseInt(row.requests),
            avg_response_time: parseFloat(row.avg_response_time || 0),
            total_cost: parseFloat(row.total_cost || 0)
          };
          return acc;
        }, {})
      },
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        node_version: process.version
      }
    };

    res.json(metrics);

  } catch (error) {
    console.error('Get metrics error:', error);
    res.status(500).json({
      error: {
        code: 'METRICS_ERROR',
        message: 'Failed to fetch metrics'
      }
    });
  }
});

/**
 * POST /api/v1/admin/webhooks/register
 * Register webhook
 */
router.post('/webhooks/register', [
  body('url').isURL().withMessage('Valid URL required'),
  body('events').isArray().withMessage('Events array required'),
  body('secret').optional().isString().withMessage('Secret must be string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid webhook data',
          details: errors.array()
        }
      });
    }

    const { url, events, secret } = req.body;

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });

    const result = await pool.query(`
      INSERT INTO webhooks (url, events, secret)
      VALUES ($1, $2, $3)
      RETURNING webhook_id
    `, [url, JSON.stringify(events), secret]);

    await pool.end();

    res.status(201).json({
      message: 'Webhook registered successfully',
      webhook_id: result.rows[0].webhook_id,
      url,
      events
    });

  } catch (error) {
    console.error('Register webhook error:', error);
    res.status(500).json({
      error: {
        code: 'WEBHOOK_ERROR',
        message: 'Failed to register webhook'
      }
    });
  }
});

module.exports = router;