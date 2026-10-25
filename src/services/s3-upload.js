const fs = require('fs');
const { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { s3Client, S3_BUCKET } = require('../config/s3');

// Все прежние загрузки (картины, текстуры, аватары) публичные: их адрес строится как bucket.endpoint/key и открыт всем.
// Приватное (оборот работы, оригиналы, документы участников) кладётся только под PRIVATE_PREFIX с ACL private; наружу выдаётся
// не адрес объекта, а его ключ, а читать объект можно по подписанной ссылке на короткий срок (presignGet).
const PRIVATE_PREFIX = 'private/';
const DEFAULT_PRESIGN_TTL_S = 300;
const MAX_PRESIGN_TTL_S = 900;

class StorageUnavailableError extends Error {
  constructor(cause) {
    super('Storage is unavailable, please try again', { cause });
    this.name = 'StorageUnavailableError';
    this.code = 'STORAGE_UNAVAILABLE';
    this.statusCode = 503;
  }
}

async function putObject(key, body, contentType, acl = 'public-read') {
  try {
    // Bound the whole operation, including SDK retries, when storage is unreachable.
    await s3Client.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      ACL: acl
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

/** Ключ приватного объекта: private/<часть>/<часть>…; пустые части, «..», косые черты и управляющие символы в частях недопустимы. */
function privateKey(...parts) {
  if (parts.length === 0) throw new Error('privateKey: нужен хотя бы один элемент пути');
  for (const part of parts) {
    if (typeof part !== 'string' || part === '' || part === '.' || part === '..' || /[\\/\u0000-\u001f]/.test(part)) {
      throw new Error('privateKey: недопустимая часть пути');
    }
  }
  return `${PRIVATE_PREFIX}${parts.join('/')}`;
}

function assertPrivateKey(key) {
  const rest = typeof key === 'string' && key.startsWith(PRIVATE_PREFIX) ? key.slice(PRIVATE_PREFIX.length) : null;
  if (rest === null || rest === '' || /[\u0000-\u001f]/.test(rest) || rest.split('/').some(part => part === '' || part === '.' || part === '..')) {
    throw new Error('Приватный ключ должен начинаться с private/ и не содержать пустых частей, «.» и «..»');
  }
}

/** Положить приватный объект (ACL private). Возвращает ключ, а не адрес: открыть объект можно только по presignGet. */
async function uploadPrivateBuffer(buffer, key, contentType) {
  assertPrivateKey(key);
  await putObject(key, buffer, contentType, 'private');
  return key;
}

async function uploadPrivateFile(filePath, key, contentType) {
  return uploadPrivateBuffer(fs.readFileSync(filePath), key, contentType);
}

/** Подписанная ссылка на чтение приватного объекта. Срок — S3_PRESIGN_TTL (как в ядре ИИ), по умолчанию 5 минут, не более 15. */
async function presignGet(key, ttlSeconds) {
  assertPrivateKey(key);
  const configured = Number.parseInt(process.env.S3_PRESIGN_TTL ?? '', 10);
  const wanted = Number.isFinite(ttlSeconds) && ttlSeconds > 0 ? ttlSeconds : (Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_PRESIGN_TTL_S);
  const expiresIn = Math.min(Math.floor(wanted), MAX_PRESIGN_TTL_S);
  return getSignedUrl(s3Client, new GetObjectCommand({ Bucket: S3_BUCKET, Key: key }), { expiresIn });
}

async function uploadBufferToS3(buffer, fileName, contentType) {
  const key = `textures/${fileName}`;
  await putObject(key, buffer, contentType);
  return buildPublicUrl(key);
}

module.exports = {
  uploadToS3, uploadWithKey, deleteFromS3, uploadBufferToS3, StorageUnavailableError,
  PRIVATE_PREFIX, privateKey, uploadPrivateBuffer, uploadPrivateFile, presignGet,
};
