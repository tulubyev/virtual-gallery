import { Pool } from 'pg';
import { IGallery, IGalleryService, IRoom } from '../types/gallery';
import { ILogger, ICacheable } from '../types/interfaces';

export class GalleryService implements IGalleryService {
  private pool: Pool;
  private logger: ILogger;
  private cache: ICacheable;

  constructor(pool: Pool, logger: ILogger, cache: ICacheable) {
    this.pool = pool;
    this.logger = logger;
    this.cache = cache;
  }

  async getGallery(id: string): Promise<IGallery | null> {
    return this.getById(id);
  }

  async getById(id: string): Promise<IGallery | null> {
    const cached = await this.cache.get<IGallery>(`gallery:${id}`);
    if (cached) return cached;

    try {
      const result = await this.pool.query('SELECT * FROM galleries WHERE id = $1', [id]);
      if (result.rows.length === 0) return null;
      
      const gallery = result.rows[0];
      await this.cache.set(`gallery:${id}`, gallery, 3600);
      return gallery;
    } catch (error) {
      this.logger.error('Error fetching gallery', error as Error);
      throw error;
    }
  }

  async getAllGalleries(): Promise<IGallery[]> {
    return this.getAll();
  }

  async getAll(): Promise<IGallery[]> {
    try {
      const result = await this.pool.query('SELECT * FROM galleries ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      this.logger.error('Error fetching all galleries', error as Error);
      throw error;
    }
  }

  async createGallery(gallery: Partial<IGallery>): Promise<IGallery> {
    return this.create(gallery);
  }

  async create(gallery: Partial<IGallery>): Promise<IGallery> {
    try {
      const result = await this.pool.query(
        'INSERT INTO galleries (name, description) VALUES ($1, $2) RETURNING *',
        [gallery.name, gallery.description]
      );
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error creating gallery', error as Error);
      throw error;
    }
  }

  async updateGallery(id: string, gallery: Partial<IGallery>): Promise<IGallery | null> {
    return this.update(id, gallery);
  }

  async update(id: string, gallery: Partial<IGallery>): Promise<IGallery | null> {
    try {
      const result = await this.pool.query(
        'UPDATE galleries SET name = COALESCE($1, name), description = COALESCE($2, description) WHERE id = $3 RETURNING *',
        [gallery.name, gallery.description, id]
      );
      if (result.rows.length === 0) return null;
      
      await this.cache.delete(`gallery:${id}`);
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error updating gallery', error as Error);
      throw error;
    }
  }

  async deleteGallery(id: string): Promise<boolean> {
    return this.delete(id);
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.pool.query('DELETE FROM galleries WHERE id = $1', [id]);
      await this.cache.delete(`gallery:${id}`);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      this.logger.error('Error deleting gallery', error as Error);
      throw error;
    }
  }

  async getRooms(galleryId: string): Promise<IRoom[]> {
    try {
      const result = await this.pool.query(
        'SELECT * FROM rooms WHERE gallery_id = $1 ORDER BY created_at DESC',
        [galleryId]
      );
      return result.rows;
    } catch (error) {
      this.logger.error('Error fetching gallery rooms', error as Error);
      throw error;
    }
  }
}
