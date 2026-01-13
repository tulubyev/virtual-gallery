// src/services/GalleryService.ts
import { Pool } from 'pg';
import { BaseService } from './BaseService';
import {
  IGalleryService,
  Gallery,
  GalleryFilters,
  CreateGalleryDto,
  UpdateGalleryDto
} from '../types/artwork';
import { ILogger, ICacheable } from '../types/interfaces';

export interface Room {
  room_id?: string;
  gallery_id: string;
  name: string;
  description?: string;
  capacity?: number;
  created_at?: Date;
}

export class GalleryService extends BaseService implements IGalleryService {
  private pool: Pool;

  constructor(
    pool: Pool,
    logger: ILogger,
    cache?: ICacheable
  ) {
    super(logger, cache);
    this.pool = pool;
  }
  async getById(id: string): Promise<Gallery | null> {
    return this.withCache(
      `gallery:${id}`,
      async () => {
        const client = await this.pool.connect();
        try {
          const result = await client.query('SELECT * FROM galleries WHERE gallery_id = $1', [id]);
          return result.rows.length > 0 ? result.rows[0] : null;
        } finally {
          client.release();
        }
      },
      3600 // 1 hour
    );
  }

  async getAll(filters?: GalleryFilters): Promise<Gallery[]> {
    const client = await this.pool.connect();
    try {
      let query = 'SELECT * FROM galleries';
      const params: any[] = [];
      let paramIndex = 1;

      if (filters) {
        // Add sorting
        const sortBy = filters.sortBy || 'created_at';
        const sortOrder = filters.sortOrder || 'DESC';
        query += ` ORDER BY ${sortBy} ${sortOrder}`;

        // Add pagination
        if (filters.limit) {
          query += ` LIMIT $${paramIndex}`;
          params.push(filters.limit);
          paramIndex++;

          if (filters.offset) {
            query += ` OFFSET $${paramIndex}`;
            params.push(filters.offset);
          }
        }
      } else {
        query += ' ORDER BY created_at DESC';
      }

      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async create(gallery: CreateGalleryDto): Promise<Gallery> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO galleries
         (name, description, location, opening_hours, image_url)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
          gallery.name,
          gallery.description,
          gallery.location,
          gallery.opening_hours,
          gallery.image_url
        ]
      );

      const newGallery = result.rows[0];

      // Invalidate cache
      if (this.cache) {
        await this.cache.delete('galleries:all');
      }

      this.logger.info('Gallery created', { galleryId: newGallery.gallery_id });
      return newGallery;
    } finally {
      client.release();
    }
  }

  async update(id: string, updates: UpdateGalleryDto): Promise<Gallery> {
    const client = await this.pool.connect();
    try {
      // Build dynamic SQL query based on fields to update
      const updateFields: string[] = [];
      const values: any[] = [];
      let paramIndex = 2; // Start with 2 because 1 is the id

      if (updates.name !== undefined) {
        updateFields.push(`name = $${paramIndex}`);
        values.push(updates.name);
        paramIndex++;
      }

      if (updates.description !== undefined) {
        updateFields.push(`description = $${paramIndex}`);
        values.push(updates.description);
        paramIndex++;
      }

      if (updates.location !== undefined) {
        updateFields.push(`location = $${paramIndex}`);
        values.push(updates.location);
        paramIndex++;
      }

      if (updates.opening_hours !== undefined) {
        updateFields.push(`opening_hours = $${paramIndex}`);
        values.push(updates.opening_hours);
        paramIndex++;
      }

      if (updates.image_url !== undefined) {
        updateFields.push(`image_url = $${paramIndex}`);
        values.push(updates.image_url);
        paramIndex++;
      }

      // Add id to the end of values
      values.push(id);

      if (updateFields.length === 0) {
        // If no fields to update, just return the gallery
        const existing = await this.getById(id);
        if (!existing) {
          throw new Error(`Gallery with ID ${id} not found`);
        }
        return existing;
      }

      const query = `UPDATE galleries SET ${updateFields.join(', ')} WHERE gallery_id = $${paramIndex} RETURNING *`;
      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        throw new Error(`Gallery with ID ${id} not found`);
      }

      const updatedGallery = result.rows[0];

      // Invalidate cache
      if (this.cache) {
        await this.cache.delete(`gallery:${id}`);
        await this.cache.delete('galleries:all');
      }

      this.logger.info('Gallery updated', { galleryId: updatedGallery.gallery_id });
      return updatedGallery;
    } finally {
      client.release();
    }
  }

  async delete(id: string): Promise<void> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('DELETE FROM galleries WHERE gallery_id = $1 RETURNING gallery_id', [id]);

      if (result.rows.length === 0) {
        throw new Error(`Gallery with ID ${id} not found`);
      }

      // Invalidate cache
      if (this.cache) {
        await this.cache.delete(`gallery:${id}`);
        await this.cache.delete('galleries:all');
      }

      this.logger.info('Gallery deleted', { galleryId: id });
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

  async initialize(): Promise<void> {
    await super.initialize();
    this.logger.info('GalleryService initialized');
  }

  async dispose(): Promise<void> {
    this.logger.info('GalleryService disposed');
    await super.dispose();
  }
}