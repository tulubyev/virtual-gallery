// src/backend/utils/ArchiveProcessor.ts
import AdmZip from 'adm-zip';
import path from 'path';
import fs from 'fs';

interface ExtractedImage {
  originalName: string;
  extractedPath: string;
  size: number;
}

interface ArchiveInfo {
  totalFiles: number;
  imageFiles: number;
  totalSize: number;
  imageSize: number;
  files: Array<{
    name: string;
    size: number;
    isImage: boolean;
  }>;
}

class ArchiveProcessor {
  private supportedImageFormats: string[];
  private maxArchiveSize: number;

  constructor() {
    this.supportedImageFormats = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    this.maxArchiveSize = 50 * 1024 * 1024; // 50MB
  }

  // Проверка, является ли файл изображением
  isImageFile(filename: string): boolean {
    const ext = path.extname(filename).toLowerCase();
    return this.supportedImageFormats.includes(ext);
  }

  // Извлечение изображений из архива
  async extractImagesFromArchive(archivePath: string, extractToDir: string): Promise<ExtractedImage[]> {
    const zip = new AdmZip(archivePath);
    const zipEntries = zip.getEntries();

    const extractedImages: ExtractedImage[] = [];

    // Создаем директорию для извлечения
    if (!fs.existsSync(extractToDir)) {
      fs.mkdirSync(extractToDir, { recursive: true });
    }

    for (const zipEntry of zipEntries) {
      // Проверяем, является ли файл изображением
      if (!zipEntry.isDirectory && this.isImageFile(zipEntry.name)) {
        const fileName = path.basename(zipEntry.name); // Получаем имя файла
        const filePath = path.join(extractToDir, fileName);

        // Извлекаем файл
        zip.extractEntryTo(zipEntry, extractToDir, false, true);

        extractedImages.push({
          originalName: zipEntry.name,
          extractedPath: filePath,
          size: zipEntry.header.size
        });
      }
    }

    return extractedImages;
  }

  // Проверка размера архива
  validateArchiveSize(archivePath: string): boolean {
    const stats = fs.statSync(archivePath);
    return stats.size <= this.maxArchiveSize;
  }

  // Получение информации об архиве
  getArchiveInfo(archivePath: string): ArchiveInfo {
    const zip = new AdmZip(archivePath);
    const entries = zip.getEntries();

    const info: ArchiveInfo = {
      totalFiles: entries.length,
      imageFiles: 0,
      totalSize: 0,
      imageSize: 0,
      files: []
    };

    for (const entry of entries) {
      info.totalSize += entry.header.size;

      if (this.isImageFile(entry.name)) {
        info.imageFiles++;
        info.imageSize += entry.header.size;
        info.files.push({
          name: entry.name,
          size: entry.header.size,
          isImage: true
        });
      } else {
        info.files.push({
          name: entry.name,
          size: entry.header.size,
          isImage: false
        });
      }
    }

    return info;
  }
}

export default new ArchiveProcessor();