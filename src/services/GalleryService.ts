// src/services/GalleryService.ts
import { BaseService } from './BaseService';

export interface Gallery {
  gallery_id?: string;
  name: string;
  description: string;
  location?: string;
  opening_hours?: string;
  image_url?: string;
  created_at?: Date;
}

export interface Room {
  room_id?: string;
  gallery_id: string;
  name: string;
  description?: string;
  capacity?: number;
  created_at?: Date;
}

export class GalleryService extends BaseService<Gallery> {
  async getAll(): Promise<Gallery[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM galleries ORDER BY created_at DESC');
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getById(id: string): Promise<Gallery | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM galleries WHERE gallery_id = $1', [id]);
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  async create(galleryData: Partial<Gallery>): Promise<Gallery> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO galleries
         (name, description, location, opening_hours, image_url)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
          galleryData.name,
          galleryData.description,
          galleryData.location,
          galleryData.opening_hours,
          galleryData.image_url
        ]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async update(id: string, updateData: Partial<Gallery>): Promise<Gallery | null> {
    const client = await this.pool.connect();
    try {
      // Формируем динамический SQL запрос в зависимости от того, какие поля нужно обновить
      const updateFields = [];
      const values = [];
      let paramIndex = 2; // Начинаем с 2, потому что 1 - это id

      if (updateData.name) {
        updateFields.push(`name = $${paramIndex}`);
        values.push(updateData.name);
        paramIndex++;
      }

      if (updateData.description) {
        updateFields.push(`description = $${paramIndex}`);
        values.push(updateData.description);
        paramIndex++;
      }

      if (updateData.location !== undefined) {
        updateFields.push(`location = $${paramIndex}`);
        values.push(updateData.location);
        paramIndex++;
      }

      if (updateData.opening_hours !== undefined) {
        updateFields.push(`opening_hours = $${paramIndex}`);
        values.push(updateData.opening_hours);
        paramIndex++;
      }

      if (updateData.image_url !== undefined) {
        updateFields.push(`image_url = $${paramIndex}`);
        values.push(updateData.image_url);
        paramIndex++;
      }

      // Добавляем id в конец значений
      values.push(id);

      if (updateFields.length === 0) {
        // Если нет полей для обновления, просто возвращаем галерею
        return await this.getById(id);
      }

      const query = `UPDATE galleries SET ${updateFields.join(', ')} WHERE gallery_id = $${paramIndex} RETURNING *`;
      const result = await client.query(query, values);

      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  async delete(id: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('DELETE FROM galleries WHERE gallery_id = $1 RETURNING gallery_id', [id]);
      return result.rows.length > 0;
    } finally {
      client.release();
    }
  }

  async getRecommendedArtworks(galleryId: string): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      // В реальной реализации это будет использовать ИИ для рекомендаций
      // For now, returning some random artworks associated with the gallery
      const result = await client.query(
        `SELECT * FROM artworks
         WHERE gallery_id = $1
         ORDER BY RANDOM()
         LIMIT 5`,
        [galleryId]
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getRooms(galleryId: string): Promise<Room[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM rooms WHERE gallery_id = $1 ORDER BY created_at DESC',
        [galleryId]
      );
      return result.rows;
    } finally {
      client.release();
    }
  }
}