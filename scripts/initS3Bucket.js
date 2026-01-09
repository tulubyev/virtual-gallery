// scripts/initS3Bucket.js
const AWS = require('aws-sdk');
const s3Config = require('../src/backend/config/s3Config');

// Настройка AWS SDK для работы с S3-совместимым хранилищем beget
const s3 = new AWS.S3({
  accessKeyId: s3Config.accessKeyId,
  secretAccessKey: s3Config.secretAccessKey,
  region: s3Config.region,
  endpoint: s3Config.endpoint,
  s3ForcePathStyle: true,
});

async function createBucketIfNotExists() {
  try {
    // Проверяем, существует ли бакет
    await s3.headBucket({ Bucket: s3Config.bucket }).promise();
    console.log(`Бакет ${s3Config.bucket} уже существует`);
  } catch (error) {
    if (error.code === 'NotFound') {
      // Создаем бакет, если он не существует
      console.log(`Создание бакета ${s3Config.bucket}...`);
      
      await s3.createBucket({
        Bucket: s3Config.bucket,
      }).promise();
      
      console.log(`Бакет ${s3Config.bucket} успешно создан`);
    } else {
      console.error('Ошибка при проверке существования бакета:', error);
      throw error;
    }
  }
}

// Запуск скрипта
createBucketIfNotExists()
  .then(() => {
    console.log('Инициализация S3-бакета завершена');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Ошибка при инициализации S3-бакета:', error);
    process.exit(1);
  });