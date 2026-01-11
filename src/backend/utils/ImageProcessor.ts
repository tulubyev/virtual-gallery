// src/backend/utils/ImageProcessor.ts
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Readable } from 'stream';
import archiveProcessor from './archiveProcessor';
import s3Service from '../services/S3Service';

interface ThumbnailUrls {
  [key: string]: string;
}

interface ProcessedImageResult {
  watermarkedImagePath: string;
  thumbnails: ThumbnailUrls;
}

class ImageProcessor {
  private watermarkText: string;
  private watermarkFontSize: number;

  constructor() {
    // Шаблон водяного знака (текст или изображение)
    this.watermarkText = '© Виртуальная галерея искусств';
    this.watermarkFontSize = 16;
  }

  // Генерация миниатюр разных размеров
  async generateThumbnails(imagePath: string, ownerId: string | number, artworkId: string | number): Promise<ThumbnailUrls> {
    // Определяем размеры миниатюр
    const sizes = [
      { name: 'small', width: 150, height: 150 },
      { name: 'medium', width: 300, height: 300 },
      { name: 'large', width: 600, height: 600 }
    ];

    const thumbnailBuffers: { [key: string]: Buffer } = {};

    for (const size of sizes) {
      const buffer = await sharp(imagePath)
        .resize(size.width, size.height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 80 })
        .toBuffer();

      thumbnailBuffers[size.name] = buffer;
    }

    // Загружаем миниатюры в S3
    const thumbnailUrls: ThumbnailUrls = {};
    for (const [size, buffer] of Object.entries(thumbnailBuffers)) {
      const s3Key = s3Service.generateThumbnailS3Key(
        s3Service.generateS3Key(path.basename(imagePath), ownerId, artworkId),
        size
      );

      const result = await s3Service.uploadBuffer(buffer, s3Key, 'image/jpeg', `thumbnail_${size}.jpg`);
      thumbnailUrls[size] = result.url;
    }

    return thumbnailUrls;
  }

  // Добавление водяного знака к изображению
  async addWatermark(imagePath: string, ownerInfo: string, authorInfo: string): Promise<Buffer> {
    // Получаем метаданные изображения
    const metadata = await sharp(imagePath).metadata();

    // Создаем водяной знак как текстовое изображение
    const svgWatermark = `
      <svg width="${metadata.width}" height="${metadata.height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="white" opacity="0"/>
        <text x="50%" y="90%" text-anchor="middle" font-family="Arial" font-size="${this.watermarkFontSize}" fill="rgba(0,0,0,0.5)">
          ${this.watermarkText} | Собственник: ${ownerInfo} | Автор: ${authorInfo}
        </text>
      </svg>
    `;

    // Накладываем водяной знак на изображение и возвращаем буфер
    const watermarkedBuffer = await sharp(imagePath)
      .composite([{
        input: Buffer.from(svgWatermark),
        top: 0,
        left: 0
      }])
      .jpeg({ quality: 90 })
      .toBuffer();

    return watermarkedBuffer;
  }

  // Обработка изображения: генерация миниатюр и добавление водяного знака
  async processImage(imagePath: string, ownerId: string | number, artworkId: string | number, ownerInfo: string, authorInfo: string): Promise<ProcessedImageResult> {
    // Сначала добавляем водяной знак
    const watermarkedBuffer = await this.addWatermark(imagePath, ownerInfo, authorInfo);

    // Загружаем изображение с водяным знаком в S3
    const watermarkedS3Key = s3Service.generateS3Key(path.basename(imagePath), ownerId, artworkId, 'artworks_watermarked');
    const watermarkedResult = await s3Service.uploadBuffer(
      watermarkedBuffer,
      watermarkedS3Key,
      'image/jpeg',
      path.basename(imagePath)
    );

    // Затем генерируем миниатюры из изображения с водяным знаком
    const thumbnails = await this.generateThumbnails(imagePath, ownerId, artworkId);

    return {
      watermarkedImagePath: watermarkedResult.url,
      thumbnails
    };
  }

  // Извлечение изображений из архива
  async extractImagesFromArchive(archivePath: string, extractToDir: string): Promise<string[]> {
    // Используем archiveProcessor для извлечения изображений
    return await archiveProcessor.extractImagesFromArchive(archivePath, extractToDir);
  }

  // Проверка, является ли файл изображением
  isImageFile(fileName: string): boolean {
    return archiveProcessor.isImageFile(fileName);
  }
}

export default new ImageProcessor();