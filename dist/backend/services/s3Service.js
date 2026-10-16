"use strict";
// src/backend/services/s3Service.js
const AWS = require('aws-sdk');
const s3Config = require('../config/s3Config');
// Настройка AWS SDK для работы с S3-совместимым хранилищем beget
const s3 = new AWS.S3({
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
    region: s3Config.region,
    endpoint: s3Config.endpoint, // Для beget S3
    s3ForcePathStyle: true, // Необходимо для некоторых S3-совместимых сервисов
});
class S3Service {
    constructor() {
        this.bucket = s3Config.bucket;
    }
    // Загрузка файла в S3
    async uploadFile(localFilePath, s3Key, options = {}) {
        try {
            const fileContent = require('fs').readFileSync(localFilePath);
            const params = {
                Bucket: this.bucket,
                Key: s3Key,
                Body: fileContent,
                ContentType: options.contentType || 'application/octet-stream',
                Metadata: {
                    'uploaded-at': new Date().toISOString(),
                    'original-filename': options.originalFilename || ''
                }
            };
            const result = await s3.upload(params).promise();
            return {
                success: true,
                url: result.Location,
                key: result.Key,
                etag: result.ETag
            };
        }
        catch (error) {
            console.error('Ошибка при загрузке файла в S3:', error);
            throw error;
        }
    }
    // Загрузка буфера в S3
    async uploadBuffer(buffer, s3Key, contentType = 'application/octet-stream', originalFilename = '') {
        try {
            const params = {
                Bucket: this.bucket,
                Key: s3Key,
                Body: buffer,
                ContentType: contentType,
                Metadata: {
                    'uploaded-at': new Date().toISOString(),
                    'original-filename': originalFilename
                }
            };
            const result = await s3.upload(params).promise();
            return {
                success: true,
                url: result.Location,
                key: result.Key,
                etag: result.ETag
            };
        }
        catch (error) {
            console.error('Ошибка при загрузке буфера в S3:', error);
            throw error;
        }
    }
    // Загрузка потока в S3
    async uploadStream(stream, s3Key, contentType = 'application/octet-stream', originalFilename = '') {
        try {
            const params = {
                Bucket: this.bucket,
                Key: s3Key,
                Body: stream,
                ContentType: contentType,
                Metadata: {
                    'uploaded-at': new Date().toISOString(),
                    'original-filename': originalFilename
                }
            };
            const result = await s3.upload(params).promise();
            return {
                success: true,
                url: result.Location,
                key: result.Key,
                etag: result.ETag
            };
        }
        catch (error) {
            console.error('Ошибка при загрузке потока в S3:', error);
            throw error;
        }
    }
    // Получение файла из S3
    async getFile(s3Key) {
        try {
            const params = {
                Bucket: this.bucket,
                Key: s3Key
            };
            return await s3.getObject(params).promise();
        }
        catch (error) {
            console.error('Ошибка при получении файла из S3:', error);
            throw error;
        }
    }
    // Получение URL файла из S3 (подписанный URL для ограниченного доступа)
    async getFileUrl(s3Key, expiresIn = 3600) {
        try {
            const params = {
                Bucket: this.bucket,
                Key: s3Key,
                Expires: expiresIn
            };
            return s3.getSignedUrlPromise('getObject', params);
        }
        catch (error) {
            console.error('Ошибка при получении URL файла из S3:', error);
            throw error;
        }
    }
    // Удаление файла из S3
    async deleteFile(s3Key) {
        try {
            const params = {
                Bucket: this.bucket,
                Key: s3Key
            };
            await s3.deleteObject(params).promise();
            return { success: true };
        }
        catch (error) {
            console.error('Ошибка при удалении файла из S3:', error);
            throw error;
        }
    }
    // Проверка существования файла в S3
    async fileExists(s3Key) {
        try {
            const params = {
                Bucket: this.bucket,
                Key: s3Key
            };
            await s3.headObject(params).promise();
            return true;
        }
        catch (error) {
            if (error.code === 'NotFound') {
                return false;
            }
            throw error;
        }
    }
    // Создание уникального ключа для файла в S3
    generateS3Key(originalFilename, userId, artworkId, prefix = 'artworks') {
        const timestamp = Date.now();
        const extension = originalFilename.split('.').pop();
        const filenameWithoutExt = originalFilename.substring(0, originalFilename.lastIndexOf('.'));
        // Формат: artworks/userId/artworkId/filename_timestamp.extension
        return `${prefix}/${userId}/${artworkId}/${filenameWithoutExt}_${timestamp}.${extension}`;
    }
    // Создание ключа для миниатюры
    generateThumbnailS3Key(originalS3Key, size) {
        const parts = originalS3Key.split('/');
        const filename = parts.pop();
        const extension = filename.split('.').pop();
        const filenameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
        // Вставляем размер в название файла
        return `${parts.join('/')}/${filenameWithoutExt}_thumb_${size}.${extension}`;
    }
}
module.exports = new S3Service();
//# sourceMappingURL=s3Service.js.map