const fs = require('fs');
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client, S3_BUCKET } = require('../config/s3');

async function uploadToS3(filePath, fileName, contentType) {
  const fileContent = fs.readFileSync(filePath);
  const key = `artworks/${fileName}`;

  await s3Client.send(new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: fileContent,
    ContentType: contentType,
    ACL: 'public-read'
  }));

  const endpoint = process.env.S3_ENDPOINT.replace('https://', '').replace('http://', '');
  return `https://${S3_BUCKET}.${endpoint}/${key}`;
}

async function deleteFromS3(key) {
  await s3Client.send(new DeleteObjectCommand({
    Bucket: S3_BUCKET,
    Key: key
  }));
}

module.exports = { uploadToS3, deleteFromS3 };
