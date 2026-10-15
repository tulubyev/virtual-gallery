// src/frontend/src/services/imageProcessingService.ts
import api from './api';
import { ImageAnalysisResult, ArtworkUpload, ArtworkSubmission } from '../types';
import { imageCacheService } from './ImageCacheService';

export const imageProcessingService = {
  // Загрузить изображение для обработки
  async uploadImage(file: File, userId: number): Promise<ArtworkUpload> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('uploaded_by', userId.toString());

    const response = await api.post('/artworks/upload', formData, {
      // The API's normal 10s timeout is shorter than even one S3 deadline.
      // Allow time for image processing, three sequential 15s uploads and DB work.
      timeout: 120000,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        console.log(`Загрузка: ${progress}%`);
      }
    }).catch((error) => {
      if (error.response?.data?.code === 'STORAGE_UNAVAILABLE') {
        throw new Error(error.response.data.error);
      }
      throw error;
    });

    return response.data;
  },

  // Запустить ИИ-анализ изображения
  async analyzeImage(uploadId: number): Promise<ImageAnalysisResult> {
    const response = await api.post(`/artworks/${uploadId}/analyze`);
    return response.data;
  },

  // Получить результаты анализа изображения
  async getImageAnalysis(uploadId: number): Promise<ImageAnalysisResult> {
    const response = await api.get(`/artworks/${uploadId}/analysis`);
    return response.data;
  },

  // Отправить карточку экспоната на проверку
  async submitArtworkForReview(artworkData: Partial<ArtworkUpload>): Promise<ArtworkSubmission> {
    const response = await api.post('/artworks/submit-for-review', artworkData);
    return response.data;
  },

  // Получить все загруженные изображения пользователя
  async getUserUploads(userId: number): Promise<ArtworkUpload[]> {
    const response = await api.get(`/users/${userId}/uploads`);
    return response.data;
  },

  // Получить все материалы на проверке
  async getSubmissionsForReview(): Promise<ArtworkSubmission[]> {
    const response = await api.get('/artworks/submissions-for-review');
    return response.data;
  },

  // Одобрить карточку экспоната
  async approveSubmission(submissionId: number, artworkData: any): Promise<void> {
    await api.post(`/artworks/submissions/${submissionId}/approve`, artworkData);
  },

  // Отклонить карточку экспоната
  async rejectSubmission(submissionId: number, reason: string): Promise<void> {
    await api.post(`/artworks/submissions/${submissionId}/reject`, { reason });
  },

  // Запросить повторный анализ изображения
  async reanalyzeImage(uploadId: number): Promise<ImageAnalysisResult> {
    const response = await api.post(`/artworks/${uploadId}/reanalyze`);
    return response.data;
  },

  // Сгенерировать NFT для произведения искусства
  async generateNFT(artworkId: number, ownerInfo: any): Promise<any> {
    const response = await api.post('/artworks/generate-nft', {
      artworkId,
      ownerInfo
    });
    return response.data;
  },

  // Загрузить и закэшировать изображение
  async loadAndCacheImage(url: string): Promise<string> {
    return await imageCacheService.loadImage(url);
  },

  // Загрузить и закэшировать несколько изображений
  async loadAndCacheImages(urls: string[]): Promise<(string | Error)[]> {
    return await imageCacheService.loadImages(urls);
  },

  // Предзагрузить изображения для улучшения производительности
  async preloadImages(urls: string[], callback?: (loaded: number, total: number) => void): Promise<void> {
    return await imageCacheService.preloadImages(urls, callback);
  },

  // Получить информацию о состоянии кэша
  getCacheInfo() {
    return imageCacheService.getCacheInfo();
  },

  // Очистить кэш изображений
  clearCache(): void {
    imageCacheService.clearCache();
  }
};