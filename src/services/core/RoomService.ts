import { Pool } from 'pg';
import { ILogger } from '../../types/interfaces';
import {
  RoomType,
  RoomInstance,
  RoomAnalytics,
  RoomTemplate,
  ArtworkPlacement,
  RoomCustomization
} from '../../models/Room';

export class RoomService {
  constructor(
    private db: Pool,
    private logger: ILogger
  ) {}

  /**
   * Get all available room types
   */
  async getRoomTypes(category?: string): Promise<RoomType[]> {
    try {
      let query = 'SELECT * FROM room_types';
      const params: any[] = [];

      if (category) {
        query += ' WHERE category = $1';
        params.push(category);
      }

      query += ' ORDER BY name';

      const result = await this.db.query(query, params);
      return result.rows.map(row => this.mapRoomTypeRow(row));
    } catch (error) {
      this.logger.error('Error fetching room types:', error as Error);
      throw error;
    }
  }

  /**
   * Get room type by ID
   */
  async getRoomTypeById(typeId: number): Promise<RoomType | null> {
    try {
      const result = await this.db.query('SELECT * FROM room_types WHERE type_id = $1', [typeId]);
      if (result.rows.length === 0) return null;
      return this.mapRoomTypeRow(result.rows[0]);
    } catch (error) {
      this.logger.error('Error fetching room type:', error as Error);
      throw error;
    }
  }

  /**
   * Create a new room instance
   */
  async createRoomInstance(roomData: {
    typeId: number;
    galleryId: number;
    name: string;
    description?: string;
    customizations?: RoomCustomization[];
    artworks?: ArtworkPlacement[];
    maxVisitors?: number;
    createdBy: number;
  }): Promise<RoomInstance> {
    try {
      const result = await this.db.query(`
        INSERT INTO room_instances (
          type_id, gallery_id, name, description, customizations,
          artworks, max_visitors, created_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `, [
        roomData.typeId,
        roomData.galleryId,
        roomData.name,
        roomData.description || '',
        JSON.stringify(roomData.customizations || []),
        JSON.stringify(roomData.artworks || []),
        roomData.maxVisitors || 50,
        roomData.createdBy
      ]);

      return this.mapRoomInstanceRow(result.rows[0]);
    } catch (error) {
      this.logger.error('Error creating room instance:', error as Error);
      throw error;
    }
  }

  /**
   * Get room instances for a gallery
   */
  async getRoomInstancesByGallery(galleryId: number): Promise<RoomInstance[]> {
    try {
      const result = await this.db.query(`
        SELECT ri.*, rt.name as type_name, rt.category
        FROM room_instances ri
        JOIN room_types rt ON ri.type_id = rt.type_id
        WHERE ri.gallery_id = $1
        ORDER BY ri.created_at DESC
      `, [galleryId]);

      return result.rows.map(row => this.mapRoomInstanceRow(row));
    } catch (error) {
      this.logger.error('Error fetching room instances:', error as Error);
      throw error;
    }
  }

  /**
   * Get room instance by ID with full details
   */
  async getRoomInstanceById(instanceId: number): Promise<RoomInstance | null> {
    try {
      const result = await this.db.query(`
        SELECT ri.*, rt.name as type_name, rt.category, rt.base_template,
               rt.lighting_preset, rt.audio_preset
        FROM room_instances ri
        JOIN room_types rt ON ri.type_id = rt.type_id
        WHERE ri.instance_id = $1
      `, [instanceId]);

      if (result.rows.length === 0) return null;
      return this.mapRoomInstanceRow(result.rows[0]);
    } catch (error) {
      this.logger.error('Error fetching room instance:', error as Error);
      throw error;
    }
  }

  /**
   * Update room instance
   */
  async updateRoomInstance(instanceId: number, updates: Partial<RoomInstance>): Promise<RoomInstance | null> {
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      if (updates.name !== undefined) {
        fields.push(`name = $${paramCount++}`);
        values.push(updates.name);
      }
      if (updates.description !== undefined) {
        fields.push(`description = $${paramCount++}`);
        values.push(updates.description);
      }
      if (updates.customizations !== undefined) {
        fields.push(`customizations = $${paramCount++}`);
        values.push(JSON.stringify(updates.customizations));
      }
      if (updates.artworks !== undefined) {
        fields.push(`artworks = $${paramCount++}`);
        values.push(JSON.stringify(updates.artworks));
      }
      if (updates.maxVisitors !== undefined) {
        fields.push(`max_visitors = $${paramCount++}`);
        values.push(updates.maxVisitors);
      }
      if (updates.status !== undefined) {
        fields.push(`status = $${paramCount++}`);
        values.push(updates.status);
      }

      if (fields.length === 0) return null;

      fields.push(`updated_at = CURRENT_TIMESTAMP`);

      const query = `
        UPDATE room_instances
        SET ${fields.join(', ')}
        WHERE instance_id = $${paramCount}
        RETURNING *
      `;
      values.push(instanceId);

      const result = await this.db.query(query, values);
      if (result.rows.length === 0) return null;
      return this.mapRoomInstanceRow(result.rows[0]);
    } catch (error) {
      this.logger.error('Error updating room instance:', error as Error);
      throw error;
    }
  }

  /**
   * Delete room instance
   */
  async deleteRoomInstance(instanceId: number): Promise<boolean> {
    try {
      const result = await this.db.query('DELETE FROM room_instances WHERE instance_id = $1', [instanceId]);
      return result.rowCount! > 0;
    } catch (error) {
      this.logger.error('Error deleting room instance:', error as Error);
      throw error;
    }
  }

  /**
   * Update visitor count for a room
   */
  async updateVisitorCount(instanceId: number, count: number): Promise<void> {
    try {
      await this.db.query(
        'UPDATE room_instances SET current_visitors = $1, updated_at = CURRENT_TIMESTAMP WHERE instance_id = $2',
        [count, instanceId]
      );
    } catch (error) {
      this.logger.error('Error updating visitor count:', error as Error);
      throw error;
    }
  }

  /**
   * Get room analytics
   */
  async getRoomAnalytics(instanceId: number, startDate?: Date, endDate?: Date): Promise<RoomAnalytics[]> {
    try {
      let query = 'SELECT * FROM room_analytics WHERE room_instance_id = $1';
      const params: any[] = [instanceId];

      if (startDate) {
        query += ' AND date_range_start >= $2';
        params.push(startDate);
      }
      if (endDate) {
        query += ` AND date_range_end <= $${params.length + 1}`;
        params.push(endDate);
      }

      query += ' ORDER BY recorded_at DESC';

      const result = await this.db.query(query, params);
      return result.rows.map(row => this.mapRoomAnalyticsRow(row));
    } catch (error) {
      this.logger.error('Error fetching room analytics:', error as Error);
      throw error;
    }
  }

  /**
   * Record room analytics
   */
  async recordRoomAnalytics(analytics: Omit<RoomAnalytics, 'analyticsId' | 'recordedAt'>): Promise<void> {
    try {
      await this.db.query(`
        INSERT INTO room_analytics (
          room_instance_id, visitor_count, average_session_time,
          popular_artworks, interaction_heatmap, date_range_start, date_range_end
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        analytics.roomId,
        analytics.visitorCount,
        analytics.averageSessionTime,
        analytics.popularArtworks,
        JSON.stringify(analytics.interactionHeatmap),
        analytics.dateRange.start,
        analytics.dateRange.end
      ]);
    } catch (error) {
      this.logger.error('Error recording room analytics:', error as Error);
      throw error;
    }
  }

  /**
   * Validate room configuration
   */
  async validateRoomConfiguration(typeId: number, customizations: RoomCustomization[]): Promise<{
    valid: boolean;
    errors: string[];
  }> {
    try {
      const roomType = await this.getRoomTypeById(typeId);
      if (!roomType) {
        return { valid: false, errors: ['Room type not found'] };
      }

      const errors: string[] = [];

      // Validate customizations against available options
      for (const customization of customizations) {
        const option = roomType.customizationOptions.find(opt => opt.id === customization.optionId);
        if (!option) {
          errors.push(`Unknown customization option: ${customization.optionId}`);
          continue;
        }

        if (!option.values.includes(customization.value)) {
          errors.push(`Invalid value for ${option.name}: ${customization.value}`);
        }
      }

      return { valid: errors.length === 0, errors };
    } catch (error) {
      this.logger.error('Error validating room configuration:', error as Error);
      return { valid: false, errors: ['Validation failed due to internal error'] };
    }
  }

  // Helper methods for mapping database rows to TypeScript interfaces
  private mapRoomTypeRow(row: any): RoomType {
    return {
      id: row.type_id,
      name: row.name,
      description: row.description,
      category: row.category,
      baseTemplate: row.base_template,
      customizationOptions: row.customization_options || [],
      lightingPreset: row.lighting_preset,
      audioPreset: row.audio_preset,
      supportedArtworkTypes: row.supported_artwork_types || [],
      visitorCapacity: row.visitor_capacity,
      accessibilityFeatures: row.accessibility_features || [],
      thumbnail: row.thumbnail_url,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }

  private mapRoomInstanceRow(row: any): RoomInstance {
    return {
      id: row.instance_id,
      typeId: row.type_id,
      galleryId: row.gallery_id,
      name: row.name,
      description: row.description,
      customizations: row.customizations || [],
      artworks: row.artworks || [],
      currentVisitors: row.current_visitors,
      maxVisitors: row.max_visitors,
      status: row.status,
      createdBy: row.created_by,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }

  private mapRoomAnalyticsRow(row: any): RoomAnalytics {
    return {
      analyticsId: row.analytics_id,
      roomId: row.room_instance_id,
      visitorCount: row.visitor_count,
      averageSessionTime: row.average_session_time,
      popularArtworks: row.popular_artworks || [],
      interactionHeatmap: row.interaction_heatmap,
      dateRange: {
        start: new Date(row.date_range_start),
        end: new Date(row.date_range_end)
      },
      recordedAt: new Date(row.recorded_at)
    };
  }
}