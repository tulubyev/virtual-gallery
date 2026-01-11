// src/frontend/src/services/ImageCacheService.ts
export interface CachedImage {
  url: string;
  blob: Blob;
  timestamp: number;
  size: number;
}

class ImageCacheService {
  private cache: Map<string, CachedImage> = new Map();
  private maxSize: number; // максимальный размер кэша в байтах
  private currentSize: number = 0;

  constructor(maxSizeMB: number = 100) { // по умолчанию 100MB
    this.maxSize = maxSizeMB * 1024 * 1024;
  }

  // Загрузить и закэшировать изображение
  async loadImage(url: string): Promise<string> {
    // Проверяем, есть ли изображение в кэше
    if (this.cache.has(url)) {
      const cachedImage = this.cache.get(url)!;
      // Обновляем время последнего доступа
      cachedImage.timestamp = Date.now();
      return URL.createObjectURL(cachedImage.blob);
    }

    try {
      // Загружаем изображение
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load image: ${response.statusText}`);
      }

      const blob = await response.blob();
      const blobSize = blob.size;

      // Проверяем, помещается ли изображение в кэш
      if (blobSize > this.maxSize) {
        console.warn(`Image ${url} is too large to cache (${blobSize} bytes)`);
        return url; // возвращаем оригинальный URL, если изображение слишком большое
      }

      // Очищаем кэш, если он переполнен
      this.evictIfNeeded(blobSize);

      // Добавляем изображение в кэш
      const cachedImage: CachedImage = {
        url,
        blob,
        timestamp: Date.now(),
        size: blobSize
      };

      this.cache.set(url, cachedImage);
      this.currentSize += blobSize;

      return URL.createObjectURL(blob);
    } catch (error) {
      console.error(`Error loading image ${url}:`, error);
      throw error;
    }
  }

  // Загрузить несколько изображений параллельно
  async loadImages(urls: string[]): Promise<(string | Error)[]> {
    const promises = urls.map(url => 
      this.loadImage(url).catch(error => error)
    );
    
    return Promise.all(promises);
  }

  // Удалить изображение из кэша
  removeFromCache(url: string): boolean {
    if (this.cache.has(url)) {
      const cachedImage = this.cache.get(url)!;
      this.cache.delete(url);
      this.currentSize -= cachedImage.size;
      return true;
    }
    return false;
  }

  // Очистить весь кэш
  clearCache(): void {
    this.cache.forEach(cachedImage => {
      URL.revokeObjectURL(URL.createObjectURL(cachedImage.blob)); // освобождаем память
    });
    this.cache.clear();
    this.currentSize = 0;
  }

  // Получить информацию о кэше
  getCacheInfo(): { size: number, count: number, maxSize: number } {
    return {
      size: this.currentSize,
      count: this.cache.size,
      maxSize: this.maxSize
    };
  }

  // Удалить старые элементы из кэша, если он переполнен
  private evictIfNeeded(newItemSize: number): void {
    // Если добавление нового элемента превысит лимит, удаляем старые элементы
    while (this.currentSize + newItemSize > this.maxSize && this.cache.size > 0) {
      // Находим самый старый элемент
      let oldestKey: string | null = null;
      let oldestTime = Number.MAX_SAFE_INTEGER;

      for (const [key, value] of this.cache) {
        if (value.timestamp < oldestTime) {
          oldestTime = value.timestamp;
          oldestKey = key;
        }
      }

      if (oldestKey) {
        const cachedImage = this.cache.get(oldestKey)!;
        this.cache.delete(oldestKey);
        this.currentSize -= cachedImage.size;
        // Освобождаем объект URL
        URL.revokeObjectURL(this.getUrlFromBlob(cachedImage.blob));
      } else {
        break; // что-то пошло не так, выходим из цикла
      }
    }
  }

  // Вспомогательный метод для получения URL из blob
  private getUrlFromBlob(blob: Blob): string {
    // Мы не можем получить URL из blob напрямую, но мы можем создать его
    // и сохранить в отдельной карте, если это необходимо
    return ''; // заглушка, так как URL.createObjectURL возвращает уникальный URL каждый раз
  }

  // Предзагрузить изображения (полезно для улучшения UX)
  async preloadImages(urls: string[], callback?: (loaded: number, total: number) => void): Promise<void> {
    const total = urls.length;
    let loaded = 0;

    const promises = urls.map(async url => {
      try {
        await this.loadImage(url);
        loaded++;
        callback?.(loaded, total);
      } catch (error) {
        console.error(`Failed to preload image ${url}:`, error);
        loaded++;
        callback?.(loaded, total);
      }
    });

    await Promise.all(promises);
  }
}

// Создаем глобальный экземпляр сервиса
export const imageCacheService = new ImageCacheService(100); // 100MB кэш

export default ImageCacheService;