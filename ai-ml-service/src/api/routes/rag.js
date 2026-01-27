/**
 * RAG (Retrieval-Augmented Generation) routes
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const axios = require('axios');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/**
 * POST /api/v1/rag/query
 * Process RAG query
 */
router.post('/query', [
  body('query').isString().isLength({ min: 3, max: 1000 }).withMessage('Query must be 3-1000 characters'),
  body('context.user_id').optional().isInt().withMessage('Valid user ID required'),
  body('generation_options.max_tokens').optional().isInt({ min: 50, max: 2000 }).withMessage('Max tokens must be 50-2000'),
  body('generation_options.temperature').optional().isFloat({ min: 0, max: 2 }).withMessage('Temperature must be 0-2')
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

    const {
      query,
      context = {},
      generation_options = {}
    } = req.body;

    // Call AI Core service
    const aiCoreUrl = process.env.AI_CORE_URL || 'http://localhost:8001';

    try {
      const response = await axios.post(`${aiCoreUrl}/rag/query`, {
        query,
        context_limit: generation_options.context_limit || 5,
        filters: context.filters || {}
      }, {
        timeout: 30000 // 30 seconds timeout
      });

      // Return the response from AI core
      res.json(response.data);

    } catch (aiError) {
      console.error('AI Core RAG error:', aiError.response?.data || aiError.message);

      res.status(500).json({
        error: {
          code: 'AI_SERVICE_ERROR',
          message: 'Failed to process RAG query',
          details: aiError.response?.data || aiError.message
        }
      });
    }

  } catch (error) {
    console.error('RAG query error:', error);
    res.status(500).json({
      error: {
        code: 'RAG_ERROR',
        message: 'Failed to process RAG query'
      }
    });
  }
});

/**
 * POST /api/v1/rag/feedback
 * Submit feedback for RAG response
 */
router.post('/feedback', [
  body('query_id').isString().notEmpty().withMessage('Query ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
  body('feedback').optional().isString().isLength({ max: 1000 }).withMessage('Feedback too long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid feedback data',
          details: errors.array()
        }
      });
    }

    const { query_id, rating, feedback, suggested_improvement } = req.body;

    // TODO: Store feedback in database for model improvement

    res.json({
      message: 'Feedback submitted successfully',
      query_id,
      rating
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({
      error: {
        code: 'FEEDBACK_ERROR',
        message: 'Failed to submit feedback'
      }
    });
  }
});

/**
 * POST /api/v1/rag/embeddings/batch-upsert
 * Batch upsert embeddings
 */
router.post('/embeddings/batch-upsert', [
  body('collection').isString().notEmpty().withMessage('Collection name required'),
  body('points').isArray().withMessage('Points array required'),
  body('points.*.id').exists().withMessage('Point ID required'),
  body('points.*.vector').isArray().withMessage('Vector array required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid embedding data',
          details: errors.array()
        }
      });
    }

    const { collection, points } = req.body;

    // TODO: Upsert embeddings to vector database

    res.json({
      message: 'Embeddings upserted successfully',
      collection,
      count: points.length
    });

  } catch (error) {
    console.error('Embedding upsert error:', error);
    res.status(500).json({
      error: {
        code: 'EMBEDDING_ERROR',
        message: 'Failed to upsert embeddings'
      }
    });
  }
});

/**
 * GET /api/v1/rag/embeddings/search
 * Search embeddings
 */
router.get('/embeddings/search', [
  // Query validation via query params
], async (req, res) => {
  try {
    const {
      collection = 'artwork_embeddings',
      query_vector,
      limit = 10,
      filters = {}
    } = req.query;

    // Parse query_vector if it's a string
    let vector = query_vector;
    if (typeof vector === 'string') {
      try {
        vector = JSON.parse(vector);
      } catch (e) {
        return res.status(400).json({
          error: {
            code: 'INVALID_VECTOR',
            message: 'Invalid query vector format'
          }
        });
      }
    }

    // TODO: Search vector database

    // Mock search results
    const mockResults = [
      {
        id: 'artwork_123',
        score: 0.95,
        payload: {
          artwork_id: 123,
          type: 'image',
          style: 'impressionism'
        }
      }
    ];

    res.json({
      results: mockResults,
      count: mockResults.length,
      collection
    });

  } catch (error) {
    console.error('Embedding search error:', error);
    res.status(500).json({
      error: {
        code: 'SEARCH_ERROR',
        message: 'Failed to search embeddings'
      }
    });
  }
});

/**
 * POST /api/v1/rag/documents/upload
 * Upload and ingest document for RAG
 */
router.post('/documents/upload', upload.single('document'), [
  body('title').optional().isString().trim(),
  body('description').optional().isString(),
  body('tags').optional().isArray(),
  body('category').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid document data',
          details: errors.array()
        }
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: {
          code: 'NO_FILE',
          message: 'No document file provided'
        }
      });
    }

    const { title, description, tags, category } = req.body;
    const filePath = req.file.path;
    const originalName = req.file.originalname;

    // Call AI Core service for document ingestion
    const aiCoreUrl = process.env.AI_CORE_URL || 'http://localhost:8001';

    const response = await axios.post(`${aiCoreUrl}/rag/ingest`, {
      file_path: filePath,
      filename: originalName,
      title: title || originalName,
      description,
      tags: tags || [],
      category
    }, {
      timeout: 300000 // 5 minutes for document processing
    });

    // Clean up uploaded file
    const fs = require('fs');
    fs.unlinkSync(filePath);

    res.status(200).json(response.data);

  } catch (aiError) {
    console.error('AI Core RAG ingestion error:', aiError.response?.data || aiError.message);

    // Clean up file on error
    if (req.file) {
      const fs = require('fs');
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        // Ignore cleanup errors
      }
    }

    res.status(500).json({
      error: {
        code: 'AI_SERVICE_ERROR',
        message: 'Failed to ingest document',
        details: aiError.response?.data || aiError.message
      }
    });
  }
});

/**
 * POST /api/v1/rag/documents/url
 * Ingest document from URL for RAG
 */
router.post('/documents/url', [
  body('url').isURL().withMessage('Valid document URL required'),
  body('title').optional().isString().trim(),
  body('description').optional().isString(),
  body('tags').optional().isArray(),
  body('category').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid document data',
          details: errors.array()
        }
      });
    }

    const { url, title, description, tags, category } = req.body;

    // Call AI Core service for URL ingestion
    const aiCoreUrl = process.env.AI_CORE_URL || 'http://localhost:8001';

    const response = await axios.post(`${aiCoreUrl}/rag/ingest-url`, {
      url,
      title,
      description,
      tags: tags || [],
      category
    }, {
      timeout: 300000 // 5 minutes for document processing
    });

    res.status(200).json(response.data);

  } catch (aiError) {
    console.error('AI Core RAG URL ingestion error:', aiError.response?.data || aiError.message);

    res.status(500).json({
      error: {
        code: 'AI_SERVICE_ERROR',
        message: 'Failed to ingest document from URL',
        details: aiError.response?.data || aiError.message
      }
    });
  }
});

/**
 * GET /api/v1/rag/documents
 * List ingested documents
 */
router.get('/documents', async (req, res) => {
  try {
    const { limit = 50, offset = 0, category } = req.query;

    // Call AI Core service
    const aiCoreUrl = process.env.AI_CORE_URL || 'http://localhost:8001';

    const response = await axios.get(`${aiCoreUrl}/rag/documents`, {
      params: { limit, offset, category },
      timeout: 30000
    });

    res.json(response.data);

  } catch (aiError) {
    console.error('AI Core documents list error:', aiError.response?.data || aiError.message);

    res.status(500).json({
      error: {
        code: 'AI_SERVICE_ERROR',
        message: 'Failed to retrieve documents',
        details: aiError.response?.data || aiError.message
      }
    });
  }
});

/**
 * DELETE /api/v1/rag/documents/:documentId
 * Remove document from RAG system
 */
router.delete('/documents/:documentId', async (req, res) => {
  try {
    const { documentId } = req.params;

    // Call AI Core service
    const aiCoreUrl = process.env.AI_CORE_URL || 'http://localhost:8001';

    const response = await axios.delete(`${aiCoreUrl}/rag/documents/${documentId}`, {
      timeout: 30000
    });

    res.json(response.data);

  } catch (aiError) {
    console.error('AI Core document deletion error:', aiError.response?.data || aiError.message);

    res.status(500).json({
      error: {
        code: 'AI_SERVICE_ERROR',
        message: 'Failed to delete document',
        details: aiError.response?.data || aiError.message
      }
    });
  }
});

module.exports = router;