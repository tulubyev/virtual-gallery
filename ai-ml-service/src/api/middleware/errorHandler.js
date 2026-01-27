/**
 * Global error handling middleware
 */

const winston = require('winston');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Get correlation ID
  const correlationId = req.headers['x-correlation-id'] || req.requestId || 'unknown';

  // Structured error logging
  winston.error('Request error', {
    correlation_id: correlationId,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    user_agent: req.get('User-Agent'),
    error_code: error.code || 'INTERNAL_ERROR',
    error_message: error.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString()
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, code: 'INVALID_ID' };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, code: 'DUPLICATE_FIELD' };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, code: 'VALIDATION_ERROR' };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, code: 'INVALID_TOKEN' };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, code: 'TOKEN_EXPIRED' };
  }

  // Default error
  res.status(error.statusCode || 500).json({
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: error.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    },
    correlation_id: correlationId,
    timestamp: new Date().toISOString()
  });
};

module.exports = { errorHandler };