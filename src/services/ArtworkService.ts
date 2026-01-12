// src/services/ArtworkService.ts
import { BaseService } from './BaseService';

export interface Artwork {
  artwork_id?: number;
  title: string;
  artist_name: string;
  year_created?: number;
  medium?: string;
  dimensions?: string;
  style?: string;
  description?: string;
  image_url?: string;
  tags: string[];
  created_at?: Date;
  gallery_id?: string;
}

export interface ArtworkFilters {
  limit?: number;
  offset?: number;
  sortBy?: 'created_at' | 'title' | 'artist_name';
  sortOrder?: 'ASC' | 'DESC';
  tags?: string[];
  searchQuery?: string;
}

export interface ArtworkAnalytics {
  artwork_id: number;
  total_views: number;
  avg_view_duration: number;
  likes: number;
  shares: number;
  related_interactions: number;
}

export class ArtworkService extends BaseService<Artwork> {
  async getAll(): Promise<Artwork[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'SELECT artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at FROM artworks ORDER BY created_at DESC'
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getAllArtworks(filters: ArtworkFilters = {}) {
    const client = await this.pool.connect();
    try {
      // Построение динамического запроса с учетом фильтров
      let query = 'SELECT artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at FROM artworks';
      const params: any[] = [];
      let paramIndex = 1;

      // Добавляем условия поиска
      if (filters.searchQuery) {
        const searchPattern = `%${filters.searchQuery}%`;
        query += ` WHERE title ILIKE $${paramIndex} OR artist_name ILIKE $${paramIndex}`;
        params.push(searchPattern);
        paramIndex++;
      }

      // Добавляем фильтрацию по тегам
      if (filters.tags && filters.tags.length > 0) {
        const tagsCondition = ` AND tags && ARRAY[${filters.tags.map(() => `$${paramIndex++}`).join(',')}]`;
        query += filters.searchQuery ? tagsCondition : ` WHERE tags && ARRAY[${filters.tags.map(() => `$${paramIndex++}`).join(',')}]`;
        params.push(...filters.tags);
      }

      // Добавляем сортировку
      const sortBy = filters.sortBy || 'created_at';
      const sortOrder = filters.sortOrder || 'DESC';
      query += ` ORDER BY ${sortBy} ${sortOrder}`;

      // Добавляем пагинацию
      if (filters.limit) {
        query += ` LIMIT $${paramIndex}`;
        params.push(filters.limit);
        paramIndex++;

        if (filters.offset) {
          query += ` OFFSET $${paramIndex}`;
          params.push(filters.offset);
        }
      }

      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getById(id: string): Promise<Artwork | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'SELECT artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at FROM artworks WHERE artwork_id = $1',
        [id]
      );
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  async create(artworkData: Partial<Artwork>): Promise<Artwork> {
    const client = await this.pool.connect();
    try {
      // Преобразуем массив тегов в формат PostgreSQL
      const tagsArray = artworkData.tags ? `{${artworkData.tags.map(tag => `"${tag}"`).join(',')}}` : '{}';

      const result = await client.query(
        `INSERT INTO artworks
         (title, artist_name, year_created, medium, dimensions, style, description, image_url, tags)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at`,
        [
          artworkData.title,
          artworkData.artist_name,
          artworkData.year_created,
          artworkData.medium,
          artworkData.dimensions,
          artworkData.style,
          artworkData.description,
          artworkData.image_url,
          tagsArray
        ]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async update(id: string, updateData: Partial<Artwork>): Promise<Artwork | null> {
    const client = await this.pool.connect();
    try {
      // Формируем динамический SQL запрос в зависимости от того, какие поля нужно обновить
      const updateFields: string[] = [];
      const values: any[] = [];
      let paramIndex = 2; // Начинаем с 2, потому что 1 - это id

      if (updateData.title !== undefined) {
        updateFields.push(`title = $${paramIndex}`);
        values.push(updateData.title);
        paramIndex++;
      }

      if (updateData.artist_name !== undefined) {
        updateFields.push(`artist_name = $${paramIndex}`);
        values.push(updateData.artist_name);
        paramIndex++;
      }

      if (updateData.year_created !== undefined) {
        updateFields.push(`year_created = $${paramIndex}`);
        values.push(updateData.year_created);
        paramIndex++;
      }

      if (updateData.medium !== undefined) {
        updateFields.push(`medium = $${paramIndex}`);
        values.push(updateData.medium);
        paramIndex++;
      }

      if (updateData.dimensions !== undefined) {
        updateFields.push(`dimensions = $${paramIndex}`);
        values.push(updateData.dimensions);
        paramIndex++;
      }

      if (updateData.style !== undefined) {
        updateFields.push(`style = $${paramIndex}`);
        values.push(updateData.style);
        paramIndex++;
      }

      if (updateData.description !== undefined) {
        updateFields.push(`description = $${paramIndex}`);
        values.push(updateData.description);
        paramIndex++;
      }

      if (updateData.image_url !== undefined) {
        updateFields.push(`image_url = $${paramIndex}`);
        values.push(updateData.image_url);
        paramIndex++;
      }

      if (updateData.tags !== undefined) {
        const tagsArray = `{${updateData.tags.map(tag => `"${tag}"`).join(',')}}`;
        updateFields.push(`tags = $${paramIndex}`);
        values.push(tagsArray);
        paramIndex++;
      }

      // Добавляем id в конец значений
      values.push(id);

      if (updateFields.length === 0) {
        // Если нет полей для обновления, просто возвращаем экспонат
        return await this.getById(id);
      }

      const query = `UPDATE artworks SET ${updateFields.join(', ')} WHERE artwork_id = $${paramIndex} RETURNING artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at`;
      const result = await client.query(query, values);

      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  async delete(id: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'DELETE FROM artworks WHERE artwork_id = $1 RETURNING artwork_id',
        [id]
      );
      return result.rows.length > 0;
    } finally {
      client.release();
    }
  }

  async search(query: string, limit = 20, offset = 0): Promise<Artwork[]> {
    const client = await this.pool.connect();
    try {
      // Поиск по названию и имени художника с использованием полнотекстового поиска
      const searchPattern = `%${query}%`;
      const result = await client.query(
        `SELECT artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at
         FROM artworks
         WHERE title ILIKE $1 OR artist_name ILIKE $1
         ORDER BY
           CASE WHEN title ILIKE $1 THEN 0 ELSE 1 END,
           SIMILARITY(title, $2) DESC,
           created_at DESC
         LIMIT $3 OFFSET $4`,
        [searchPattern, query, limit, offset]
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getRecommended(userId: string): Promise<Artwork[]> {
    // В реальной реализации это будет использовать ИИ для рекомендаций
    // For now, returning some random artworks
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `SELECT * FROM artworks
         ORDER BY RANDOM()
         LIMIT 5`
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getSimilar(artworkId: string): Promise<Artwork[]> {
    // В реальной реализации это будет использовать ИИ для поиска похожих произведений
    // For now, returning some random artworks
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `SELECT * FROM artworks
         WHERE artwork_id != $1
         ORDER BY RANDOM()
         LIMIT 5`,
        [artworkId]
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async filterByTags(tags: string[], limit = 20, offset = 0): Promise<Artwork[]> {
    const client = await this.pool.connect();
    try {
      // Фильтрация по тегам с использованием оператора && (overlap)
      const tagsArrayLiteral = `{${tags.map(tag => `"${tag}"`).join(',')}}`;
      const result = await client.query(
        `SELECT artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at
         FROM artworks
         WHERE tags && $1::text[]
         ORDER BY created_at DESC
         LIMIT $2 OFFSET $3`,
        [tagsArrayLiteral, limit, offset]
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getArtworkCountByFilters(filters: { tags?: string[]; searchQuery?: string } = {}): Promise<number> {
    const client = await this.pool.connect();
    try {
      let query = 'SELECT COUNT(*) as count FROM artworks';
      const params: any[] = [];
      let paramIndex = 1;

      if (filters.searchQuery) {
        const searchPattern = `%${filters.searchQuery}%`;
        query += ` WHERE title ILIKE $${paramIndex} OR artist_name ILIKE $${paramIndex}`;
        params.push(searchPattern);
        paramIndex++;
      }

      if (filters.tags && filters.tags.length > 0) {
        const tagsCondition = ` AND tags && ARRAY[${filters.tags.map(() => `$${paramIndex++}`).join(',')}]`;
        query += filters.searchQuery ? tagsCondition : ` WHERE tags && ARRAY[${filters.tags.map(() => `$${paramIndex++}`).join(',')}]`;
        params.push(...filters.tags);
      }

      const result = await client.query(query, params);
      return parseInt(result.rows[0].count);
    } finally {
      client.release();
    }
  }

  async addToCollection(artworkId: number, collectionId: number): Promise<{ message: string; artworkId: number; collectionId: number }> {
    const client = await this.pool.connect();
    try {
      // Проверяем, существует ли экспонат и коллекция
      const artworkCheck = await client.query(
        'SELECT artwork_id FROM artworks WHERE artwork_id = $1',
        [artworkId]
      );

      if (artworkCheck.rows.length === 0) {
        throw new Error(`Artwork with ID ${artworkId} does not exist`);
      }

      const collectionCheck = await client.query(
        'SELECT collection_id FROM collections WHERE collection_id = $1',
        [collectionId]
      );

      if (collectionCheck.rows.length === 0) {
        throw new Error(`Collection with ID ${collectionId} does not exist`);
      }

      // Проверяем, не добавлен ли уже экспонат в коллекцию
      const existingCheck = await client.query(
        'SELECT artwork_id FROM collection_artworks WHERE artwork_id = $1 AND collection_id = $2',
        [artworkId, collectionId]
      );

      if (existingCheck.rows.length > 0) {
        throw new Error(`Artwork with ID ${artworkId} is already in collection ${collectionId}`);
      }

      // Добавляем экспонат в коллекцию
      await client.query(
        'INSERT INTO collection_artworks (artwork_id, collection_id) VALUES ($1, $2)',
        [artworkId, collectionId]
      );

      return {
        message: 'Artwork added to collection successfully',
        artworkId,
        collectionId
      };
    } finally {
      client.release();
    }
  }

  async getAnalytics(artworkId: number): Promise<ArtworkAnalytics> {
    const client = await this.pool.connect();
    try {
      // В реальной реализации это извлекает аналитические данные для экспоната
      // из специальной таблицы с метриками просмотров и взаимодействий
      // Здесь мы возвращаем симулированные данные

      // Сначала проверим, существует ли экспонат
      const artworkCheck = await client.query(
        'SELECT artwork_id FROM artworks WHERE artwork_id = $1',
        [artworkId]
      );

      if (artworkCheck.rows.length === 0) {
        throw new Error(`Artwork with ID ${artworkId} does not exist`);
      }

      // В реальной системе здесь будет сложный запрос к таблице с метриками
      // который может включать:
      // - количество просмотров
      // - среднюю продолжительность просмотра
      // - количество лайков
      // - количество шеров
      // - количество взаимодействий с экспонатом
      // - популярность среди других экспонатов

      // Для демонстрации возвращаем симулированные данные
      const result = await client.query(
        `SELECT
          $1::int as artwork_id,
          COALESCE((SELECT view_count FROM artwork_metrics WHERE artwork_id = $1), 0) + 1250 as total_views,
          45 as avg_view_duration,
          120 as likes,
          45 as shares,
          320 as related_interactions`,
        [artworkId]
      );

      return result.rows[0] as ArtworkAnalytics;
    } finally {
      client.release();
    }
  }
}