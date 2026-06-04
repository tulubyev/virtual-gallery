// src/frontend/src/services/galleryService.ts
import api from './api';
import { Gallery, Room, Exhibition, VirtualTourRoute } from '../types';

export const galleryService = {
  // Получить все галереи
  async getAllGalleries(): Promise<Gallery[]> {
    const response = await api.get('/galleries');
    return response.data;
  },

  // Получить галерею по ID
  async getGalleryById(id: number): Promise<Gallery> {
    const response = await api.get(`/galleries/${id}`);
    return response.data;
  },

  // Создать новую галерею
  async createGallery(galleryData: Partial<Gallery>): Promise<Gallery> {
    const response = await api.post('/galleries', galleryData);
    return response.data;
  },

  // Обновить галерею
  async updateGallery(id: number, galleryData: Partial<Gallery>): Promise<Gallery> {
    const response = await api.put(`/galleries/${id}`, galleryData);
    return response.data;
  },

  // Удалить галерею
  async deleteGallery(id: number): Promise<void> {
    await api.delete(`/galleries/${id}`);
  },

  // Получить все залы галереи
  async getRooms(galleryId: number): Promise<Room[]> {
    const response = await api.get(`/galleries/${galleryId}/rooms`);
    return response.data;
  },

  // Получить зал по ID
  async getRoomById(roomId: number): Promise<Room> {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  },

  // Создать новый зал
  async createRoom(galleryId: number, roomData: Partial<Room>): Promise<Room> {
    const response = await api.post(`/galleries/${galleryId}/rooms`, roomData);
    return response.data;
  },

  // Обновить зал
  async updateRoom(roomId: number, roomData: Partial<Room>): Promise<Room> {
    const response = await api.put(`/rooms/${roomId}`, roomData);
    return response.data;
  },

  // Удалить зал
  async deleteRoom(roomId: number): Promise<void> {
    await api.delete(`/rooms/${roomId}`);
  },

  // Получить все выставки
  async getExhibitions(galleryId: number): Promise<Exhibition[]> {
    const response = await api.get(`/galleries/${galleryId}/exhibitions`);
    return response.data;
  },

  // Получить выставку по ID
  async getExhibitionById(exhibitionId: number): Promise<Exhibition> {
    const response = await api.get(`/exhibitions/${exhibitionId}`);
    return response.data;
  },

  // Создать новую выставку
  async createExhibition(galleryId: number, exhibitionData: Partial<Exhibition>): Promise<Exhibition> {
    const response = await api.post(`/galleries/${galleryId}/exhibitions`, exhibitionData);
    return response.data;
  },

  // Обновить выставку
  async updateExhibition(exhibitionId: number, exhibitionData: Partial<Exhibition>): Promise<Exhibition> {
    const response = await api.put(`/exhibitions/${exhibitionId}`, exhibitionData);
    return response.data;
  },

  // Удалить выставку
  async deleteExhibition(exhibitionId: number): Promise<void> {
    await api.delete(`/exhibitions/${exhibitionId}`);
  },

  // Получить все виртуальные туры
  async getVirtualTours(galleryId: number): Promise<VirtualTourRoute[]> {
    const response = await api.get(`/galleries/${galleryId}/virtual-tours`);
    return response.data;
  },

  // Получить виртуальный тур по ID
  async getVirtualTourById(tourId: number): Promise<VirtualTourRoute> {
    const response = await api.get(`/virtual-tours/${tourId}`);
    return response.data;
  },

  // Создать новый виртуальный тур
  async createVirtualTour(galleryId: number, tourData: Partial<VirtualTourRoute>): Promise<VirtualTourRoute> {
    const response = await api.post(`/galleries/${galleryId}/virtual-tours`, tourData);
    return response.data;
  },

  // Обновить виртуальный тур
  async updateVirtualTour(tourId: number, tourData: Partial<VirtualTourRoute>): Promise<VirtualTourRoute> {
    const response = await api.put(`/virtual-tours/${tourId}`, tourData);
    return response.data;
  },

  // Удалить виртуальный тур
  async deleteVirtualTour(tourId: number): Promise<void> {
    await api.delete(`/virtual-tours/${tourId}`);
  }
};