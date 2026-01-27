/**
 * PDF processing routes
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { pdfProcessingQueue } = require('../../services/queue');

/**
 * POST /api/v1/pdfs/process
 * Process PDF document
 */
router.post('/process', [
  body('pdf_url').isURL().withMessage('Valid PDF URL is required'),
  body('document_id').isString().notEmpty().withMessage('Document ID is required')
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

    const { pdf_url, document_id, processing_options = {} } = req.body;

    try {
      // Add job to queue
      const job = await pdfProcessingQueue.add({
        pdf_url,
        document_id,
        perform_ocr: processing_options.perform_ocr || false
      }, {
        priority: 3, // Normal priority
        delay: 0
      });

      // Return job information
      res.status(202).json({
        task_id: `pdf_${job.id}`,
        job_id: job.id,
        status: 'queued',
        document_id,
        estimated_time: 120, // 2 minutes
        created_at: new Date().toISOString()
      });

    } catch (queueError) {
      console.error('PDF Queue error:', queueError);

      res.status(500).json({
        error: {
          code: 'QUEUE_ERROR',
          message: 'Failed to queue PDF processing',
          details: queueError.message
        }
      });
    }

  } catch (error) {
    console.error('PDF processing error:', error);
    res.status(500).json({
      error: {
        code: 'PROCESSING_ERROR',
        message: 'Failed to start PDF processing'
      }
    });
  }
});

/**
 * GET /api/v1/pdfs/processing/:taskId
 * Get PDF processing results
 */
router.get('/processing/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;

    // Extract job ID from task ID (format: pdf_{jobId})
    const jobIdMatch = taskId.match(/^pdf_(\d+)$/);
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
    const job = await pdfProcessingQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({
        error: {
          code: 'JOB_NOT_FOUND',
          message: 'PDF processing job not found'
        }
      });
    }

    const state = await job.getState();
    const jobData = {
      task_id: taskId,
      job_id: jobId,
      status: state,
      document_id: job.data.document_id,
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
    console.error('Get PDF processing error:', error);
    res.status(500).json({
      error: {
        code: 'FETCH_ERROR',
        message: 'Failed to fetch PDF processing results'
      }
    });
  }
});

module.exports = router;