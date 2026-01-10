// src/services/ArtworkService.ts
import { BaseService } from './BaseService';
import { Artwork } from '../types/Artwork';

export class ArtworkService extends BaseService<Artwork> {
  constructor() {
    super('http://localhost:5000/api/artworks');
  }

  async getAll(): Promise<Artwork[]> {
    return this.request('/');
  }

  async getById(id: string): Promise<Artwork> {
    return this.request(`/${id}`);
  }

  async create(artwork: Partial<Artwork>): Promise<Artwork> {
    const token = localStorage.getItem('authToken');
    return this.request('/', {
      method: 'POST',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(artwork)
    });
  }

  async update(id: string, artwork: Partial<Artwork>): Promise<Artwork> {
    const token = localStorage.getItem('authToken');
    return this.request(`/${id}`, {
      method: 'PUT',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(artwork)
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

  async search(query: string): Promise<Artwork[]> {
    return this.request(`/search/${encodeURIComponent(query)}`);
  }

  async getRecommended(userId: string): Promise<Artwork[]> {
    const token = localStorage.getItem('authToken');
    return this.request('/recommendations', {
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async getSimilar(artworkId: string): Promise<Artwork[]> {
    return this.request(`/${artworkId}/similar`);
  }
}