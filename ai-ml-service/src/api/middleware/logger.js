/**
 * Request logging middleware
 */

const { v4: uuidv4 } = require('uuid');

const requestLogger = (req, res, next) => {
  // Generate request ID
  req.requestId = uuidv4();

  // Start time
  req.startTime = Date.now();

  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Request ID: ${req.requestId}`);

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - req.startTime;
    const statusCode = res.statusCode;
    const statusColor = statusCode >= 400 ? '\x1b[31m' : statusCode >= 300 ? '\x1b[33m' : '\x1b[32m';

    console.log(`${statusColor}[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${statusCode} - ${duration}ms - Request ID: ${req.requestId}\x1b[0m`);
  });

  next();
};

module.exports = { requestLogger };