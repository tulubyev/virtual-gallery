/**
 * AI/ML Service API Gateway
 * Main entry point for the REST API
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Import routes
const imageRoutes = require('./routes/images');
const pdfRoutes = require('./routes/pdfs');
const ragRoutes = require('./routes/rag');
const adminRoutes = require('./routes/admin');
const healthRoutes = require('./routes/health');

// Import services
const queueService = require('../services/queue');

// Import middleware
const { errorHandler } = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/logger');
const { authenticate } = require('./middleware/auth');

// Import services
const queueService = require('../services/queue');

const app = express();
const PORT = process.env.PORT || 8000;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutes default
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100, // limit each IP
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
app.use(requestLogger);

// Health check (no auth required)
app.use('/health', healthRoutes);

// API routes (with authentication)
app.use('/api/v1/images', authenticate, imageRoutes);
app.use('/api/v1/pdfs', authenticate, pdfRoutes);
app.use('/api/v1/rag', authenticate, ragRoutes);
app.use('/api/v1/admin', authenticate, adminRoutes);

// API documentation
app.get('/api/v1/docs', (req, res) => {
  res.json({
    message: 'API Documentation',
    version: '1.0.0',
    endpoints: {
      images: '/api/v1/images',
      pdfs: '/api/v1/pdfs',
      rag: '/api/v1/rag',
      admin: '/api/v1/admin',
      health: '/health'
    },
    docs: 'https://github.com/your-org/ai-ml-service/wiki/API-Documentation'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found'
    }
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI/ML Service API Gateway running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/v1/docs`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

module.exports = app;