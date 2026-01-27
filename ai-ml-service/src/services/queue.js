/**
 * Task Queue Service using Bull and Redis
 */

const Queue = require('bull');
const axios = require('axios');

// Queue configurations
const QUEUES = {
  IMAGE_ANALYSIS: 'image_analysis',
  PDF_PROCESSING: 'pdf_processing',
  RAG_QUERY: 'rag_query'
};

// Create queues
const imageAnalysisQueue = new Queue(QUEUES.IMAGE_ANALYSIS, {
  redis: process.env.REDIS_URL || 'redis://localhost:6379',
  defaultJobOptions: {
    removeOnComplete: 50,
    removeOnFail: 20,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000
    }
  }
});

const pdfProcessingQueue = new Queue(QUEUES.PDF_PROCESSING, {
  redis: process.env.REDIS_URL || 'redis://localhost:6379',
  defaultJobOptions: {
    removeOnComplete: 20,
    removeOnFail: 10,
    attempts: 2,
    backoff: {
      type: 'exponential',
      delay: 10000
    }
  }
});

const ragQueryQueue = new Queue(QUEUES.RAG_QUERY, {
  redis: process.env.REDIS_URL || 'redis://localhost:6379',
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 50,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  }
});

// Process image analysis jobs
imageAnalysisQueue.process(async (job) => {
  const { image_url, artwork_id, analysis_type } = job.data;

  try {
    const aiCoreUrl = process.env.AI_CORE_URL || 'http://localhost:8001';

    const response = await axios.post(`${aiCoreUrl}/analyze/image`, {
      image_url,
      artwork_id,
      analysis_type
    }, {
      timeout: 120000 // 2 minutes
    });

    // Store result in database (TODO)
    // Send webhook notification (TODO)

    return response.data;

  } catch (error) {
    console.error(`Image analysis job ${job.id} failed:`, error.message);
    throw error;
  }
});

// Process PDF processing jobs
pdfProcessingQueue.process(async (job) => {
  const { pdf_url, document_id, perform_ocr } = job.data;

  try {
    const aiCoreUrl = process.env.AI_CORE_URL || 'http://localhost:8001';

    const response = await axios.post(`${aiCoreUrl}/process/pdf`, {
      pdf_url,
      document_id,
      perform_ocr
    }, {
      timeout: 600000 // 10 minutes for PDF processing
    });

    // Store chunks and metadata in database (TODO)
    // Send webhook notification (TODO)

    return response.data;

  } catch (error) {
    console.error(`PDF processing job ${job.id} failed:`, error.message);
    throw error;
  }
});

// Process RAG query jobs
ragQueryQueue.process(async (job) => {
  const { query, context_limit, filters } = job.data;

  try {
    const aiCoreUrl = process.env.AI_CORE_URL || 'http://localhost:8001';

    const response = await axios.post(`${aiCoreUrl}/rag/query`, {
      query,
      context_limit,
      filters
    }, {
      timeout: 30000 // 30 seconds
    });

    return response.data;

  } catch (error) {
    console.error(`RAG query job ${job.id} failed:`, error.message);
    throw error;
  }
});

// Queue event handlers
imageAnalysisQueue.on('completed', (job, result) => {
  console.log(`Image analysis job ${job.id} completed`);
});

imageAnalysisQueue.on('failed', (job, err) => {
  console.error(`Image analysis job ${job.id} failed:`, err.message);
});

pdfProcessingQueue.on('completed', (job, result) => {
  console.log(`PDF processing job ${job.id} completed`);
});

pdfProcessingQueue.on('failed', (job, err) => {
  console.error(`PDF processing job ${job.id} failed:`, err.message);
});

ragQueryQueue.on('completed', (job, result) => {
  console.log(`RAG query job ${job.id} completed`);
});

ragQueryQueue.on('failed', (job, err) => {
  console.error(`RAG query job ${job.id} failed:`, err.message);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Closing queues...');
  await Promise.all([
    imageAnalysisQueue.close(),
    pdfProcessingQueue.close(),
    ragQueryQueue.close()
  ]);
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Closing queues...');
  await Promise.all([
    imageAnalysisQueue.close(),
    pdfProcessingQueue.close(),
    ragQueryQueue.close()
  ]);
  process.exit(0);
});

module.exports = {
  imageAnalysisQueue,
  pdfProcessingQueue,
  ragQueryQueue,
  QUEUES
};