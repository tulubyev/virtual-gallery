import { RoomType, RoomInstance, RoomAnalytics } from '../../models/Room';
import { fetchWithAuth } from './api';

class RoomAPIService {
  private baseURL = '/api/rooms';

  async getRoomTypes(category?: string): Promise<RoomType[]> {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);

      const response = await fetchWithAuth(`${this.baseURL}/types?${params}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch room types');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching room types:', error);
      throw error;
    }
  }

  async getRoomTypeById(typeId: number): Promise<RoomType> {
    try {
      const response = await fetchWithAuth(`${this.baseURL}/types/${typeId}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch room type');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching room type:', error);
      throw error;
    }
  }

  async createRoomInstance(roomData: {
    typeId: number;
    galleryId: number;
    name: string;
    description?: string;
    customizations?: any[];
    artworks?: any[];
    maxVisitors?: number;
  }): Promise<RoomInstance> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetchWithAuth(this.baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create room instance');
      }

      return data.data;
    } catch (error) {
      console.error('Error creating room instance:', error);
      throw error;
    }
  }

  async getRoomInstancesByGallery(galleryId: number): Promise<RoomInstance[]> {
    try {
      const response = await fetchWithAuth(`${this.baseURL}/gallery/${galleryId}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch room instances');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching room instances:', error);
      throw error;
    }
  }

  async getRoomInstanceById(instanceId: number): Promise<RoomInstance> {
    try {
      const response = await fetchWithAuth(`${this.baseURL}/${instanceId}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch room instance');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching room instance:', error);
      throw error;
    }
  }

  async updateRoomInstance(instanceId: number, updates: Partial<RoomInstance>): Promise<RoomInstance> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetchWithAuth(`${this.baseURL}/${instanceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to update room instance');
      }

      return data.data;
    } catch (error) {
      console.error('Error updating room instance:', error);
      throw error;
    }
  }

  async deleteRoomInstance(instanceId: number): Promise<void> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetchWithAuth(`${this.baseURL}/${instanceId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to delete room instance');
      }
    } catch (error) {
      console.error('Error deleting room instance:', error);
      throw error;
    }
  }

  async updateVisitorCount(instanceId: number, count: number): Promise<void> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetchWithAuth(`${this.baseURL}/${instanceId}/visitors`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to update visitor count');
      }
    } catch (error) {
      console.error('Error updating visitor count:', error);
      throw error;
    }
  }

  async getRoomAnalytics(
    instanceId: number,
    startDate?: Date,
    endDate?: Date
  ): Promise<RoomAnalytics[]> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate.toISOString());
      if (endDate) params.append('endDate', endDate.toISOString());

      const response = await fetchWithAuth(`${this.baseURL}/${instanceId}/analytics?${params}`);

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch room analytics');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching room analytics:', error);
      throw error;
    }
  }

  async validateRoomConfiguration(typeId: number, customizations: any[]): Promise<{
    valid: boolean;
    errors: string[];
  }> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetchWithAuth(`${this.baseURL}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ typeId, customizations })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to validate room configuration');
      }

      return data.data;
    } catch (error) {
      console.error('Error validating room configuration:', error);
      throw error;
    }
  }
}

export const roomService = new RoomAPIService();
export default roomService;
