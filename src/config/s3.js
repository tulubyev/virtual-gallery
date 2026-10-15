const { S3Client } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || process.env.S3_SECRET_KEY
  },
  region: process.env.S3_REGION || 'us-east-1',
  forcePathStyle: true
});

const S3_BUCKET = process.env.S3_BUCKET_NAME || process.env.S3_BUCKET;

module.exports = { s3Client, S3_BUCKET };
