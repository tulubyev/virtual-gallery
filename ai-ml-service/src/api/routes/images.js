/**
 * Image analysis routes
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { imageAnalysisQueue } = require('../../services/queue');

// Validation middleware
const validateImageAnalysis = [
  body('image_url').isURL().withMessage('Valid image URL is required'),
  body('artwork_id').isInt({ min: 1 }).withMessage('Valid artwork ID is required'),
  body('analysis_type').optional().isIn(['basic', 'full', 'detailed']).withMessage('Invalid analysis type'),
  body('priority').optional().isIn(['low', 'normal', 'high', 'urgent']).withMessage('Invalid priority')
];

/**
 * POST /api/v1/images/analyze
 * Analyze artwork image
 */
router.post('/analyze', validateImageAnalysis, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          details: errors.array()
        }
      });
    }

    const { image_url, artwork_id, analysis_type = 'full', priority = 'normal' } = req.body;

    try {
      // Add job to queue
      const job = await imageAnalysisQueue.add({
        image_url,
        artwork_id,
        analysis_type
      }, {
        priority: priority === 'urgent' ? 1 : priority === 'high' ? 2 : priority === 'normal' ? 3 : 4,
        delay: 0
      });

      // Return job information
      res.status(202).json({
        task_id: `img_${job.id}`,
        job_id: job.id,
        status: 'queued',
        estimated_time: 30,
        priority,
        created_at: new Date().toISOString()
      });

    } catch (queueError) {
      console.error('Queue error:', queueError);

      res.status(500).json({
        error: {
          code: 'QUEUE_ERROR',
          message: 'Failed to queue image analysis',
          details: queueError.message
        }
      });
    }

  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({
      error: {
        code: 'ANALYSIS_ERROR',
        message: 'Failed to start image analysis'
      }
    });
  }
});

/**
 * GET /api/v1/images/analysis/:taskId
 * Get analysis results
 */
router.get('/analysis/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;

    // Extract job ID from task ID (format: img_{jobId})
    const jobIdMatch = taskId.match(/^img_(\d+)$/);
    if (!jobIdMatch) {
      return res.status(400).json({
        error: {
          code: 'INVALID_TASK_ID',
          message: 'Invalid task ID format'
        }
      });
    }

    const jobId = parseInt(jobIdMatch[1]);

    // Get job status
    const job = await imageAnalysisQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({
        error: {
          code: 'JOB_NOT_FOUND',
          message: 'Analysis job not found'
        }
      });
    }

    const state = await job.getState();
    const jobData = {
      task_id: taskId,
      job_id: jobId,
      status: state,
      created_at: job.timestamp ? new Date(job.timestamp).toISOString() : null,
      started_at: job.processedOn ? new Date(job.processedOn).toISOString() : null,
      finished_at: job.finishedOn ? new Date(job.finishedOn).toISOString() : null
    };

    if (state === 'completed') {
      jobData.result = job.returnvalue;
      jobData.processing_time = job.finishedOn - job.processedOn;
    } else if (state === 'failed') {
      jobData.error = job.failedReason;
    }

    res.json(jobData);

  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({
      error: {
        code: 'FETCH_ERROR',
        message: 'Failed to fetch analysis results'
      }
    });
  }
});

/**
 * POST /api/v1/images/batch-analyze
 * Batch analyze multiple images
 */
router.post('/batch-analyze', [
  body('images').isArray({ min: 1, max: 50 }).withMessage('Images array required (1-50 items)'),
  body('images.*.image_url').isURL().withMessage('Valid image URL required for each item'),
  body('images.*.artwork_id').isInt({ min: 1 }).withMessage('Valid artwork ID required for each item'),
  body('webhook_url').optional().isURL().withMessage('Valid webhook URL required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          details: errors.array()
        }
      });
    }

    const { images, webhook_url } = req.body;

    // TODO: Implement batch processing
    const batchId = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const response = {
      batch_id: batchId,
      total_images: images.length,
      status: 'processing',
      webhook_url: webhook_url || process.env.MAIN_APP_WEBHOOK_URL,
      created_at: new Date().toISOString()
    };

    res.status(202).json(response);

  } catch (error) {
    console.error('Batch analysis error:', error);
    res.status(500).json({
      error: {
        code: 'BATCH_ERROR',
        message: 'Failed to start batch analysis'
      }
    });
  }
});

module.exports = router;