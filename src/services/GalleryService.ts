// services/GalleryService.ts
import DatabaseService from './DatabaseService';
import { pickColumns } from './columns';
import { Gallery, CreateGalleryInput, UpdateGalleryInput } from '../models';

const GALLERY_COLUMNS = ['name', 'description', 'three_d_model_path', 'layout_algorithm'] as const;

class GalleryService {
  async getAllGalleries(): Promise<Gallery[]> {
    const result = await DatabaseService.query('SELECT * FROM galleries ORDER BY gallery_id');
    return result.rows;
  }

  async getGalleryById(id: number): Promise<Gallery | undefined> {
    const result = await DatabaseService.query('SELECT * FROM galleries WHERE gallery_id = $1', [id]);
    return result.rows[0];
  }

  // Заглушка, как и в исходной реализации: модель залов в БД пока не используется
  async getGalleryRooms(_id: number): Promise<{ room_id: number; name: string; description: string }[]> {
    return [
      { room_id: 1, name: 'Room A', description: 'North wing' },
      { room_id: 2, name: 'Room B', description: 'South wing' }
    ];
  }

  async createGallery(data: CreateGalleryInput): Promise<Gallery> {
    const { name, description, three_d_model_path, layout_algorithm } = data;
    const result = await DatabaseService.query(
      `INSERT INTO galleries (name, description, three_d_model_path, layout_algorithm)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, three_d_model_path, layout_algorithm]
    );
    return result.rows[0];
  }

  async updateGallery(id: number, data: UpdateGalleryInput): Promise<Gallery | null> {
    const entries = pickColumns(data, GALLERY_COLUMNS);
    if (entries.length === 0) {
      return (await this.getGalleryById(id)) ?? null;
    }

    const setClause = entries.map(([key], i) => `${key} = $${i + 1}`).join(', ');
    const values = [...entries.map(([, value]) => value), id];
    const result = await DatabaseService.query(
      `UPDATE galleries SET ${setClause} WHERE gallery_id = $${values.length} RETURNING *`,
      values
    );
    return result.rows[0] ?? null;
  }

  async deleteGallery(id: number): Promise<boolean> {
    const result = await DatabaseService.query(
      'DELETE FROM galleries WHERE gallery_id = $1 RETURNING gallery_id',
      [id]
    );
    return (result.rowCount ?? 0) > 0;
  }

  // Заглушка, как и в исходной реализации: первые три работы
  async getRecommendedArtworks(_galleryId: number): Promise<any[]> {
    const result = await DatabaseService.query('SELECT * FROM artworks LIMIT 3');
    return result.rows;
  }
}

export default new GalleryService();
