// src/frontend/src/services/artworkService.ts
import api from './api';
import { Artwork } from '../types';

export const artworkService = {
  // Получить все экспонаты
  async getAllArtworks(): Promise<Artwork[]> {
    const response = await api.get('/artworks');
    return response.data;
  },

  // Получить экспонат по ID
  async getArtworkById(id: number): Promise<Artwork> {
    const response = await api.get(`/artworks/${id}`);
    return response.data;
  },

  // Поиск экспонатов
  async searchArtworks(query: string): Promise<Artwork[]> {
    const response = await api.get(`/artworks/search/${encodeURIComponent(query)}`);
    return response.data;
  },

  // Фильтровать экспонаты по тегам
  async filterArtworksByTags(tags: string[]): Promise<Artwork[]> {
    const response = await api.get(`/artworks/filter/${tags.join(',')}`);
    return response.data;
  },

  // Создать новый экспонат
  async createArtwork(artworkData: Partial<Artwork>): Promise<Artwork> {
    const response = await api.post('/artworks', artworkData);
    return response.data;
  },

  // Обновить экспонат
  async updateArtwork(id: number, artworkData: Partial<Artwork>): Promise<Artwork> {
    const response = await api.put(`/artworks/${id}`, artworkData);
    return response.data;
  },

  // Удалить экспонат
  async deleteArtwork(id: number): Promise<void> {
    await api.delete(`/artworks/${id}`);
  },

  // Получить рекомендованные экспонаты
  async getRecommendedArtworks(count?: number): Promise<Artwork[]> {
    const response = await api.get(`/artworks/recommendations${count ? `?count=${count}` : ''}`);
    return response.data;
  },

  // Получить похожие экспонаты
  async getSimilarArtworks(id: number, count?: number): Promise<Artwork[]> {
    const response = await api.get(`/artworks/${id}/similar${count ? `?count=${count}` : ''}`);
    return response.data;
  },

  // Получить аналитику по экспонату
  async getArtworkAnalytics(id: number): Promise<any> {
    const response = await api.get(`/artworks/${id}/analytics`);
    return response.data;
  }
};