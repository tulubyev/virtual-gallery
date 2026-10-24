// Приватные загрузки в S3 (src/services/s3-upload.js): ACL private, ключи только под private/, подписанные ссылки на короткий срок.
// Подпись считается локально настоящим SDK (без сети); отправка команд подменена.
import fs from 'fs';
import os from 'os';
import path from 'path';

jest.mock('../../config/s3', () => {
  const { S3Client } = require('@aws-sdk/client-s3');
  return {
    s3Client: new S3Client({
      endpoint: 'https://storage.example.test', region: 'us-east-1', forcePathStyle: true,
      credentials: { accessKeyId: 'AKIATESTKEY', secretAccessKey: 'test-secret-value' },
    }),
    S3_BUCKET: 'test-bucket',
  };
});

const { s3Client } = require('../../config/s3');
const {
  PRIVATE_PREFIX, privateKey, uploadPrivateBuffer, uploadPrivateFile, presignGet, uploadBufferToS3, uploadWithKey, StorageUnavailableError,
} = require('../../services/s3-upload');

describe('приватные загрузки в S3', () => {
  let send: jest.SpyInstance;
  const sent = () => send.mock.calls.map(call => call[0]);
  const expires = (url: string) => Number(new URL(url).searchParams.get('X-Amz-Expires'));

  beforeEach(() => {
    send = jest.spyOn(s3Client, 'send').mockResolvedValue({});
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    process.env.S3_ENDPOINT = 'https://storage.example.test';
    delete process.env.S3_PRESIGN_TTL;
  });
  afterEach(() => { jest.restoreAllMocks(); });

  describe('ключи', () => {
    it('privateKey собирает путь под private/ и не пускает выход из него', () => {
      expect(PRIVATE_PREFIX).toBe('private/');
      expect(privateKey('digitization', 'back_1.jpg')).toBe('private/digitization/back_1.jpg');
      for (const bad of [['..', 'x'], ['a/b'], ['a\\b'], [''], ['.'], ['с\u0000ним'], [42 as any], []]) {
        expect(() => privateKey(...(bad as string[]))).toThrow();
      }
    });
  });

  describe('загрузка', () => {
    it('приватный объект получает ACL private; наружу возвращается ключ, а не адрес', async () => {
      const key = privateKey('digitization', 'back_1.jpg');
      expect(await uploadPrivateBuffer(Buffer.from('оборот'), key, 'image/jpeg')).toBe(key);
      expect(sent()).toHaveLength(1);
      expect(sent()[0].input).toMatchObject({ Bucket: 'test-bucket', Key: key, ContentType: 'image/jpeg', ACL: 'private' });
    });

    it('файл читается с диска и тоже грузится приватно', async () => {
      const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 's3-private-')), 'back.jpg');
      fs.writeFileSync(file, 'байты');
      await uploadPrivateFile(file, 'private/originals/a.jpg', 'image/jpeg');
      expect(sent()[0].input).toMatchObject({ Key: 'private/originals/a.jpg', ACL: 'private' });
      expect(Buffer.from(sent()[0].input.Body).toString()).toBe('байты');
    });

    it('в публичное место приватной загрузкой не положить', async () => {
      for (const key of ['artworks/x.jpg', 'textures/y.png', 'private/', 'private/../artworks/x.jpg', 'private//x', '']) {
        await expect(uploadPrivateBuffer(Buffer.from('x'), key, 'image/jpeg')).rejects.toThrow(/private/);
      }
      expect(send).not.toHaveBeenCalled();
    });

    it('прежние загрузки остаются публичными и возвращают адрес', async () => {
      const url = await uploadBufferToS3(Buffer.from('x'), 't.png', 'image/png');
      expect(url).toBe('https://test-bucket.storage.example.test/textures/t.png');
      const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 's3-public-')), 'a.png');
      fs.writeFileSync(file, 'x');
      await uploadWithKey(file, 'avatars/a.png', 'image/png');
      expect(sent().map(c => c.input.ACL)).toEqual(['public-read', 'public-read']);
    });

    it('сбой хранилища при приватной загрузке — та же понятная ошибка 503, ключ в журнале без тела и подписей', async () => {
      send.mockRejectedValue(Object.assign(new Error('connect ECONNREFUSED'), { name: 'Error' }));
      await expect(uploadPrivateBuffer(Buffer.from('x'), 'private/a/b.jpg', 'image/jpeg')).rejects.toBeInstanceOf(StorageUnavailableError);
      expect(JSON.stringify((console.error as jest.Mock).mock.calls)).not.toContain('test-secret-value');
    });
  });

  describe('подписанные ссылки', () => {
    it('ссылка на чтение: путь к объекту, подпись, срок 5 минут по умолчанию', async () => {
      const url = new URL(await presignGet('private/digitization/back_1.jpg'));
      expect(url.origin + url.pathname).toBe('https://storage.example.test/test-bucket/private/digitization/back_1.jpg');
      expect(url.searchParams.get('X-Amz-Algorithm')).toBe('AWS4-HMAC-SHA256');
      expect(url.searchParams.get('X-Amz-Signature')).toMatch(/^[0-9a-f]{64}$/);
      expect(url.searchParams.get('X-Amz-Expires')).toBe('300');
      expect(url.href).not.toContain('test-secret-value');
      expect(send).not.toHaveBeenCalled();                                   // подпись считается локально
    });

    it('срок: S3_PRESIGN_TTL, явный аргумент, потолок 15 минут', async () => {
      process.env.S3_PRESIGN_TTL = '120';
      expect(expires(await presignGet('private/a/b.jpg'))).toBe(120);
      expect(expires(await presignGet('private/a/b.jpg', 60))).toBe(60);
      expect(expires(await presignGet('private/a/b.jpg', 99_999))).toBe(900);
      process.env.S3_PRESIGN_TTL = 'много';
      expect(expires(await presignGet('private/a/b.jpg'))).toBe(300);
      process.env.S3_PRESIGN_TTL = '5000';
      expect(expires(await presignGet('private/a/b.jpg'))).toBe(900);
    });

    it('ссылку на публичное, чужой префикс и выход из private/ не выдаём', async () => {
      for (const key of ['artworks/x.jpg', 'private/', 'private/../x', 'private//x', 'private/a/./b', '', null, undefined, 42]) {
        await expect(presignGet(key as any)).rejects.toThrow(/private/);
      }
    });
  });
});
