import { Pool } from 'pg';

export interface IRoom {
  id: string;
  name: string;
  galleryId: string;
  description?: string;
  capacity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class RoomService {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getRoom(id: string): Promise<IRoom | null> {
    try {
      const result = await this.pool.query('SELECT * FROM rooms WHERE id = $1', [id]);
      if (result.rows.length === 0) return null;
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching room:', error);
      throw error;
    }
  }

  async getAllRooms(): Promise<IRoom[]> {
    try {
      const result = await this.pool.query('SELECT * FROM rooms ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      console.error('Error fetching all rooms:', error);
      throw error;
    }
  }

  async getRoomsByGallery(galleryId: string): Promise<IRoom[]> {
    try {
      const result = await this.pool.query(
        'SELECT * FROM rooms WHERE gallery_id = $1 ORDER BY created_at DESC',
        [galleryId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching rooms by gallery:', error);
      throw error;
    }
  }

  async createRoom(room: Partial<IRoom>): Promise<IRoom> {
    try {
      const result = await this.pool.query(
        'INSERT INTO rooms (name, gallery_id, description, capacity) VALUES ($1, $2, $3, $4) RETURNING *',
        [room.name, room.galleryId, room.description, room.capacity]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  }

  async updateRoom(id: string, room: Partial<IRoom>): Promise<IRoom | null> {
    try {
      const result = await this.pool.query(
        'UPDATE rooms SET name = COALESCE($1, name), description = COALESCE($2, description), capacity = COALESCE($3, capacity) WHERE id = $4 RETURNING *',
        [room.name, room.description, room.capacity, id]
      );
      if (result.rows.length === 0) return null;
      return result.rows[0];
    } catch (error) {
      console.error('Error updating room:', error);
      throw error;
    }
  }

  async deleteRoom(id: string): Promise<boolean> {
    try {
      const result = await this.pool.query('DELETE FROM rooms WHERE id = $1', [id]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error;
    }
  }
}
