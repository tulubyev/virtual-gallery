// src/services/GalleryService.ts
import { BaseService } from './BaseService';
import { Gallery } from '../types/Gallery';

export class GalleryService extends BaseService<Gallery> {
  constructor() {
    super('http://localhost:5000/api/galleries');
  }

  async getAll(): Promise<Gallery[]> {
    return this.request('/');
  }

  async getById(id: string): Promise<Gallery> {
    return this.request(`/${id}`);
  }

  async create(gallery: Partial<Gallery>): Promise<Gallery> {
    const token = localStorage.getItem('authToken');
    return this.request('/', {
      method: 'POST',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(gallery)
    });
  }

  async update(id: string, gallery: Partial<Gallery>): Promise<Gallery> {
    const token = localStorage.getItem('authToken');
    return this.request(`/${id}`, {
      method: 'PUT',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(gallery)
    });
  }

  async delete(id: string): Promise<void> {
    const token = localStorage.getItem('authToken');
    await this.request(`/${id}`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async getRecommendedArtworks(galleryId: string): Promise<any[]> {
    return this.request(`/${galleryId}/recommended`);
  }

  async getRooms(galleryId: string): Promise<any[]> {
    return this.request(`/${galleryId}/rooms`);
  }
}