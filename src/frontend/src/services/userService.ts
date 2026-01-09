// src/frontend/src/services/userService.ts
import api from './api';
import { User } from '../types';

export const userService = {
  // Получить профиль пользователя
  async getProfile(): Promise<User> {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Обновить профиль пользователя
  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Получить предпочтения пользователя
  async getPreferences(): Promise<Record<string, any>> {
    const response = await api.get('/users/preferences');
    return response.data;
  },

  // Обновить предпочтения пользователя
  async updatePreferences(preferences: Record<string, any>): Promise<Record<string, any>> {
    const response = await api.put('/users/preferences', preferences);
    return response.data;
  },

  // Добавить экспонат в избранное
  async addToFavorites(artworkId: number): Promise<void> {
    await api.post(`/users/favorites/${artworkId}`);
  },

  // Удалить экспонат из избранного
  async removeFromFavorites(artworkId: number): Promise<void> {
    await api.delete(`/users/favorites/${artworkId}`);
  },

  // Получить избранные экспонаты
  async getFavorites(): Promise<any[]> {
    const response = await api.get('/users/favorites');
    return response.data;
  }
};