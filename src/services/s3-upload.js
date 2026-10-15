const fs = require('fs');
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client, S3_BUCKET } = require('../config/s3');

class StorageUnavailableError extends Error {
  constructor(cause) {
    super('Storage is unavailable, please try again', { cause });
    this.name = 'StorageUnavailableError';
    this.code = 'STORAGE_UNAVAILABLE';
    this.statusCode = 503;
  }
}

async function putObject(key, body, contentType) {
  try {
    // Bound the whole operation, including SDK retries, when storage is unreachable.
    await s3Client.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      ACL: 'public-read'
    }), { abortSignal: AbortSignal.timeout(15000) });
  } catch (error) {
    // Log diagnostic fields only, never credentials, request bodies or signed URLs.
    console.error('[S3] Upload failed', {
      operation: 'PutObject',
      bucket: S3_BUCKET,
      key,
      name: error?.name,
      code: error?.code,
      causeCode: error?.cause?.code,
      networkErrors: error?.errors?.map(e => ({ code: e.code, syscall: e.syscall })),
      statusCode: error?.$metadata?.httpStatusCode ?? error?.statusCode,
      requestId: error?.$metadata?.requestId,
      attempts: error?.$metadata?.attempts,
      totalRetryDelay: error?.$metadata?.totalRetryDelay,
    });
    throw new StorageUnavailableError(error);
  }
}

function buildPublicUrl(key) {
  const endpoint = process.env.S3_ENDPOINT.replace('https://', '').replace('http://', '');
  return `https://${S3_BUCKET}.${endpoint}/${key}`;
}

async function uploadWithKey(filePath, key, contentType) {
  const fileContent = fs.readFileSync(filePath);
  await putObject(key, fileContent, contentType);
  return buildPublicUrl(key);
}

async function uploadToS3(filePath, fileName, contentType) {
  return uploadWithKey(filePath, `artworks/${fileName}`, contentType);
}

async function deleteFromS3(key) {
  await s3Client.send(new DeleteObjectCommand({
    Bucket: S3_BUCKET,
    Key: key
  }));
}

async function uploadBufferToS3(buffer, fileName, contentType) {
  const key = `textures/${fileName}`;
  await putObject(key, buffer, contentType);
  return buildPublicUrl(key);
}

module.exports = { uploadToS3, uploadWithKey, deleteFromS3, uploadBufferToS3, StorageUnavailableError };
