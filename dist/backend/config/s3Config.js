"use strict";
// src/backend/config/s3Config.js
require('dotenv').config();
// Конфигурация для S3-совместимого хранилища на beget.com
const s3Config = {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    region: process.env.S3_REGION || 'ru-msk',
    bucket: process.env.S3_BUCKET_NAME || 'virtual-gallery-images',
    endpoint: process.env.S3_ENDPOINT || 'https://s3.beget.com', // Стандартный эндпоинт для beget S3
    // Для beget обычно используются следующие параметры:
    // endpoint: 'https://s3.beget.com'
    // region: 'ru-msk' (для Москвы) или 'ru-spb' (для Питера)
};
module.exports = s3Config;
//# sourceMappingURL=s3Config.js.map