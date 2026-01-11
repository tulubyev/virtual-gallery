// src/services/UserService.ts
import { BaseService } from './BaseService';
import { User } from '../types/User';

export class UserService extends BaseService<User> {
  constructor() {
    super('http://localhost:5000/api/users');
  }

  async getAll(): Promise<User[]> {
    const token = localStorage.getItem('authToken');
    return this.request('/', {
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async getById(id: string): Promise<User> {
    const token = localStorage.getItem('authToken');
    return this.request(`/${id}`, {
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Метод для получения пользователя по ID (для совместимости с AuthController)
  static async getUserById(id: string): Promise<User> {
    // В реальной реализации этот метод будет использовать бэкенд API
    // Здесь мы возвращаем заглушку, так как в браузере нет доступа к базе данных
    throw new Error('getUserById should be implemented on the backend');
  }

  async create(user: Partial<User>): Promise<User> {
    return this.request('/', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  }

  // Метод для создания пользователя (для совместимости с AuthController)
  static async createUser(userData: Partial<User>): Promise<User> {
    // В реальной реализации этот метод будет использовать бэкенд API
    // Здесь мы возвращаем заглушку, так как в браузере нет доступа к базе данных
    throw new Error('createUser should be implemented on the backend');
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const token = localStorage.getItem('authToken');
    return this.request(`/${id}`, {
      method: 'PUT',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(user)
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

  // Метод для получения пользователя по email (для совместимости с AuthController)
  static async getUserByEmail(email: string): Promise<User | null> {
    // В реальной реализации этот метод будет использовать бэкенд API
    // Здесь мы возвращаем заглушку, так как в браузере нет доступа к базе данных
    throw new Error('getUserByEmail should be implemented on the backend');
  }

  async register(userData: Partial<User>): Promise<User> {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(credentials: { email: string; password: string }): Promise<{ user: User; token: string }> {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async getProfile(): Promise<User> {
    const token = localStorage.getItem('authToken');
    return this.request('/profile', {
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async updateProfile(profileData: Partial<User>): Promise<User> {
    const token = localStorage.getItem('authToken');
    return this.request('/profile', {
      method: 'PUT',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });
  }

  async getPreferences(): Promise<any> {
    const token = localStorage.getItem('authToken');
    return this.request('/preferences', {
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async updatePreferences(preferences: any): Promise<any> {
    const token = localStorage.getItem('authToken');
    return this.request('/preferences', {
      method: 'PUT',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(preferences)
    });
  }

  async getFavorites(): Promise<any[]> {
    const token = localStorage.getItem('authToken');
    return this.request('/favorites', {
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async addFavorite(artworkId: string): Promise<void> {
    const token = localStorage.getItem('authToken');
    await this.request(`/favorites/${artworkId}`, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async removeFavorite(artworkId: string): Promise<void> {
    const token = localStorage.getItem('authToken');
    await this.request(`/favorites/${artworkId}`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async getHistory(): Promise<any[]> {
    const token = localStorage.getItem('authToken');
    return this.request('/history', {
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      }
    });
  }
}