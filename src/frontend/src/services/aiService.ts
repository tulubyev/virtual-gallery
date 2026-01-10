// src/frontend/src/services/aiService.ts
import api from './api';
import { Artwork, Collection } from '../types';

export const aiService = {
  // Получить рекомендации для пользователя
  async getRecommendations(count?: number): Promise<Artwork[]> {
    const response = await api.get(`/ai/recommendations${count ? `?count=${count}` : ''}`);
    return response.data;
  },

  // Сгенерировать коллекцию
  async generateCollection(criteria: { 
    theme: string; 
    style?: string; 
    artist?: string; 
    count?: number;
    public?: boolean;
  }): Promise<Collection> {
    const params = new URLSearchParams();
    params.append('theme', criteria.theme);
    if (criteria.style) params.append('style', criteria.style);
    if (criteria.artist) params.append('artist', criteria.artist);
    if (criteria.count) params.append('count', criteria.count.toString());
    if (criteria.public !== undefined) params.append('public', criteria.public.toString());

    const response = await api.get(`/ai/collections/generate?${params.toString()}`);
    return response.data;
  },

  // Анализировать изображение
  async analyzeImage(imageFile: File): Promise<any> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await api.post('/ai/analyze-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Получить похожие экспонаты
  async getSimilarArtworks(artworkId: number, count?: number): Promise<Artwork[]> {
    const response = await api.get(`/ai/similar/${artworkId}${count ? `?count=${count}` : ''}`);
    return response.data;
  },

  // Переобучить модель
  async trainModel(): Promise<any> {
    const response = await api.post('/ai/train-model');
    return response.data;
  },

  // Персонализировать маршрут по галерее
  async personalizeGalleryRoute(options: { 
    duration?: number; 
    themes?: string[]; 
    exclude?: number[] 
  }): Promise<any> {
    const params = new URLSearchParams();
    if (options.duration) params.append('duration', options.duration.toString());
    if (options.themes) params.append('themes', options.themes.join(','));
    if (options.exclude) params.append('exclude', options.exclude.join(','));

    const response = await api.get(`/ai/personalize-route?${params.toString()}`);
    return response.data;
  },

  // Прогнозировать вовлеченность
  async predictEngagement(artworkIds: number[]): Promise<any[]> {
    const response = await api.post('/ai/predict-engagement', { artworkIds: artworkIds });
    return response.data;
  }
};