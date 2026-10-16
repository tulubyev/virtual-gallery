import express from 'express';
import request from 'supertest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import jwt from 'jsonwebtoken';

jest.mock('../../config/s3', () => ({
  s3Client: { send: jest.fn() },
  S3_BUCKET: 'test-bucket',
}));
jest.mock('../../config/database', () => ({
  query: jest.fn().mockResolvedValue({ rows: [] }),
}));
jest.mock('../../services/gallery-config', () => ({
  getActiveConfig: jest.fn().mockResolvedValue(null),
  updateTextureUrls: jest.fn(),
}));
jest.mock('../../frontend/src/services/api', () => {
  // Use real Axios HTTP transport with the application's normal 10s default.
  const axios = jest.requireActual('../../frontend/node_modules/axios/dist/node/axios.cjs');
  return { __esModule: true, default: axios.create({ timeout: 10000, proxy: false }) };
});
// Exercise real multipart parsing and disk reads, but keep test files outside public uploads.
jest.mock('multer', () => {
  const multer = jest.requireActual('multer');
  const diskStorage = multer.diskStorage;
  multer.diskStorage = (options: any) => diskStorage({
    ...options,
    destination: require('os').tmpdir(),
  });
  return multer;
});
jest.mock('../../services/image-processor', () => {
  const actual = jest.requireActual('../../services/image-processor');
  return { ...actual, processImage: jest.fn() };
});

const { s3Client } = require('../../config/s3');
const pool = require('../../config/database');
const { processImage, cleanupFiles } = require('../../services/image-processor');
const { updateTextureUrls } = require('../../services/gallery-config');
const api = require('../../frontend/src/services/api').default;
const { imageProcessingService } = require('../../frontend/src/services/imageProcessingService');
const {
  uploadToS3, uploadWithKey, uploadBufferToS3, StorageUnavailableError,
} = require('../../services/s3-upload');
const app = express();
app.use('/api/artworks', require('../../routes/artworks'));
app.use('/api/gallery', require('../../routes/gallery'));
app.use('/api/auth', require('../../routes/auth'));

const unavailableBody = {
  success: false,
  code: 'STORAGE_UNAVAILABLE',
  error: 'Storage is unavailable, please try again',
};
let log: jest.SpyInstance;
let tempDir: string;
let originalEndpoint: string | undefined;
let generatedPaths: string[];

beforeEach(() => {
  jest.clearAllMocks();
  s3Client.send.mockReset();
  s3Client.send.mockResolvedValue({});
  pool.query.mockResolvedValue({ rows: [{ id: 1, title: 'Test artwork' }] });
  log = jest.spyOn(console, 'error').mockImplementation(() => {});
  originalEndpoint = process.env.S3_ENDPOINT;
  process.env.S3_ENDPOINT = 'https://storage.example.test';
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'storage-upload-test-'));
  generatedPaths = [];
  processImage.mockImplementation(async (filePath: string) => {
    generatedPaths.push(filePath);
    const variants: Record<string, any> = {};
    for (const name of ['thumbnail', 'medium']) {
      const variantPath = path.join(tempDir, `${name}.jpg`);
      fs.copyFileSync(filePath, variantPath);
      generatedPaths.push(variantPath);
      variants[name] = { path: variantPath, filename: `${name}.jpg`, contentType: 'image/jpeg' };
    }
    return variants;
  });
});

afterEach(() => {
  cleanupFiles(generatedPaths);
  fs.rmSync(tempDir, { recursive: true, force: true });
  if (originalEndpoint === undefined) delete process.env.S3_ENDPOINT;
  else process.env.S3_ENDPOINT = originalEndpoint;
  log.mockRestore();
});

describe('artwork upload storage failures', () => {
  it('delivers the storage message through the upload client when S3 stalls past 10s', async () => {
    const server = app.listen(0, '127.0.0.1');
    await new Promise<void>(resolve => server.once('listening', resolve));
    const address = server.address() as import('net').AddressInfo;
    api.defaults.baseURL = `http://127.0.0.1:${address.port}/api`;
    const post = jest.spyOn(api, 'post');
    const progress = jest.spyOn(console, 'log').mockImplementation(() => {});
    s3Client.send.mockResolvedValueOnce({}).mockResolvedValueOnce({})
      .mockImplementationOnce((_command: any, options: any) => new Promise((_resolve, reject) => {
        options.abortSignal.addEventListener('abort', () => {
          reject(Object.assign(new Error('S3 stalled'), { name: 'AbortError' }));
        }, { once: true });
      }));
    try {
      const { File } = require('buffer');
      const file = new File([Buffer.from('image')], 'image.jpg', { type: 'image/jpeg' });
      expect(api.defaults.timeout).toBe(10000);
      await expect(imageProcessingService.uploadImage(file, 1))
        .rejects.toThrow('Storage is unavailable, please try again');
      expect(post).toHaveBeenCalledWith('/artworks/upload', expect.any(FormData),
        expect.objectContaining({ timeout: 120000 }));
      expect(s3Client.send).toHaveBeenCalledTimes(3);
      expect(pool.query).not.toHaveBeenCalled();
      expect(generatedPaths.every(p => !fs.existsSync(p))).toBe(true);
    } finally {
      post.mockRestore();
      progress.mockRestore();
      await new Promise<void>(resolve => server.close(() => resolve()));
    }
  }, 25000);

  it.each([1, 2, 3])('returns 503 if S3 fails on upload %i, without saving an artwork', async (failedUpload) => {
    for (let i = 1; i < failedUpload; i++) s3Client.send.mockResolvedValueOnce({});
    s3Client.send.mockRejectedValueOnce(Object.assign(new Error('connect ECONNREFUSED'), {
      code: 'ECONNREFUSED', $metadata: { attempts: 3 },
    }));
    const response = await request(app).post('/api/artworks/upload')
      .field('title', 'Test artwork').attach('image', Buffer.from('image'), 'image.jpg');

    expect(response.status).toBe(503);
    expect(response.body).toEqual(unavailableBody);
    expect(pool.query).not.toHaveBeenCalled();
    expect(s3Client.send).toHaveBeenCalledTimes(failedUpload);
    expect(generatedPaths.every(p => !fs.existsSync(p))).toBe(true);
    expect(log).toHaveBeenCalledWith('[S3] Upload failed', expect.objectContaining({
      operation: 'PutObject', bucket: 'test-bucket', code: 'ECONNREFUSED', attempts: 3,
    }));
  });

  it('returns success only after all three objects have been stored', async () => {
    const response = await request(app).post('/api/artworks/upload')
      .field('title', 'Test artwork').attach('image', Buffer.from('image'), 'image.jpg');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(s3Client.send).toHaveBeenCalledTimes(3);
    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO artworks'),
      expect.arrayContaining([expect.stringMatching(/^https:\/\/test-bucket\.storage\.example\.test\/artworks\//)]));
    expect(generatedPaths.every(p => !fs.existsSync(p))).toBe(true);
  });

  it('still rejects a missing file with 400 and never contacts S3', async () => {
    const response = await request(app).post('/api/artworks/upload');
    expect(response.status).toBe(400);
    expect(s3Client.send).not.toHaveBeenCalled();
  });

  it('does not mislabel image processing failures as storage outages', async () => {
    processImage.mockRejectedValueOnce(new Error('Image processing failed'));
    const response = await request(app).post('/api/artworks/upload')
      .attach('image', Buffer.from('image'), 'image.jpg');
    expect(response.status).toBe(500);
    expect(response.body.code).toBeUndefined();
    expect(s3Client.send).not.toHaveBeenCalled();
  });
});

describe('other S3 upload endpoints', () => {
  it('returns the same actionable error for textures and leaves configuration unchanged', async () => {
    s3Client.send.mockRejectedValueOnce(Object.assign(new Error('DNS failure'), { code: 'ENOTFOUND' }));
    const response = await request(app).post('/api/gallery/textures')
      .attach('wall', Buffer.from('image'), 'texture.png');
    expect(response.status).toBe(503);
    expect(response.body).toEqual(unavailableBody);
    expect(updateTextureUrls).not.toHaveBeenCalled();
  });

  it('returns the same actionable error for avatars without changing the user profile', async () => {
    s3Client.send.mockRejectedValueOnce(Object.assign(new Error('timeout'), { name: 'TimeoutError' }));
    process.env.JWT_SECRET = 'storage_uploads_test_secret_0123456789abcdef';
    const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET);
    const response = await request(app).post('/api/auth/me/avatar')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', Buffer.from('image'), 'avatar.png');
    expect(response.status).toBe(503);
    expect(response.body).toEqual(unavailableBody);
    expect(pool.query).not.toHaveBeenCalled();
  });
});

describe('S3 upload service', () => {
  it.each([
    { code: 'ECONNREFUSED' },
    { code: 'ENOTFOUND' },
    { code: 'ECONNRESET' },
    { name: 'TimeoutError' },
    { name: 'AbortError' },
    { name: 'AccessDenied', $metadata: { httpStatusCode: 403, requestId: 'request-123', attempts: 1 } },
    { name: 'ServiceUnavailable', $metadata: { httpStatusCode: 503 } },
  ])('wraps SDK failure %j in a safe storage error', async (fields) => {
    const cause = Object.assign(new Error('private upstream details'), fields);
    s3Client.send.mockRejectedValueOnce(cause);
    try {
      await uploadBufferToS3(Buffer.from('image'), 'test.png', 'image/png');
      throw new Error('Expected upload to reject');
    } catch (error: any) {
      expect(error).toBeInstanceOf(StorageUnavailableError);
      expect(error.message).toBe(unavailableBody.error);
      expect(error.cause).toBe(cause);
    }
    expect(log).toHaveBeenCalledWith('[S3] Upload failed', expect.objectContaining({
      name: cause.name, statusCode: fields.$metadata?.httpStatusCode,
    }));
    expect(JSON.stringify(log.mock.calls)).not.toContain('private upstream details');
  });

  it('passes a deadline to the SDK and aborts a stalled upload after 15 seconds', async () => {
    jest.useFakeTimers();
    let expire: () => void = () => {};
    const signal = new AbortController();
    const timeout = jest.spyOn(AbortSignal, 'timeout').mockImplementation((milliseconds) => {
      setTimeout(() => { signal.abort(); expire(); }, milliseconds);
      return signal.signal;
    });
    s3Client.send.mockImplementation((_command: any, options: any) => new Promise((_resolve, reject) => {
      expect(options.abortSignal).toBe(signal.signal);
      expire = () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' }));
    }));
    try {
      const result = expect(uploadBufferToS3(Buffer.from('image'), 'test.png', 'image/png'))
        .rejects.toBeInstanceOf(StorageUnavailableError);
      await jest.advanceTimersByTimeAsync(15000);
      await result;
      expect(timeout).toHaveBeenCalledWith(15000);
    } finally {
      timeout.mockRestore();
      jest.useRealTimers();
    }
  });

  it('returns public URLs for artwork, avatar and texture uploads on success', async () => {
    const filePath = path.join(tempDir, 'test.png');
    fs.writeFileSync(filePath, 'image');
    await expect(uploadToS3(filePath, 'test.png', 'image/png'))
      .resolves.toBe('https://test-bucket.storage.example.test/artworks/test.png');
    await expect(uploadWithKey(filePath, 'avatars/test.png', 'image/png'))
      .resolves.toBe('https://test-bucket.storage.example.test/avatars/test.png');
    await expect(uploadBufferToS3(Buffer.from('image'), 'test.png', 'image/png'))
      .resolves.toBe('https://test-bucket.storage.example.test/textures/test.png');
    expect(s3Client.send.mock.calls[0][0].input).toEqual(expect.objectContaining({
      Bucket: 'test-bucket', Key: 'artworks/test.png', ContentType: 'image/png',
    }));
  });
});
