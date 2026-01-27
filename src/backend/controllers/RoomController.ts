import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { RoomService } from '../services/RoomService';
import { ILogger } from '../../types/interfaces';

@injectable()
export class RoomController {
  constructor(
    @inject('RoomService') private roomService: RoomService,
    @inject('ILogger') private logger: ILogger
  ) {}

  /**
   * Get all room types
   */
  async getRoomTypes(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.query;
      const roomTypes = await this.roomService.getRoomTypes(category as string);
      res.json({
        success: true,
        data: roomTypes
      });
    } catch (error) {
      this.logger.error('Error in getRoomTypes:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch room types'
      });
    }
  }

  /**
   * Get room type by ID
   */
  async getRoomTypeById(req: Request, res: Response): Promise<void> {
    try {
      const { typeId } = req.params;
      const roomType = await this.roomService.getRoomTypeById(parseInt(typeId));

      if (!roomType) {
        res.status(404).json({
          success: false,
          error: 'Room type not found'
        });
        return;
      }

      res.json({
        success: true,
        data: roomType
      });
    } catch (error) {
      this.logger.error('Error in getRoomTypeById:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch room type'
      });
    }
  }

  /**
   * Create a new room instance
   */
  async createRoomInstance(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
        return;
      }

      const roomData = {
        ...req.body,
        createdBy: userId
      };

      // Validate required fields
      if (!roomData.typeId || !roomData.galleryId || !roomData.name) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: typeId, galleryId, name'
        });
        return;
      }

      // Validate room configuration
      const validation = await this.roomService.validateRoomConfiguration(
        roomData.typeId,
        roomData.customizations || []
      );

      if (!validation.valid) {
        res.status(400).json({
          success: false,
          error: 'Invalid room configuration',
          details: validation.errors
        });
        return;
      }

      const roomInstance = await this.roomService.createRoomInstance(roomData);
      res.status(201).json({
        success: true,
        data: roomInstance
      });
    } catch (error) {
      this.logger.error('Error in createRoomInstance:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create room instance'
      });
    }
  }

  /**
   * Get room instances for a gallery
   */
  async getRoomInstancesByGallery(req: Request, res: Response): Promise<void> {
    try {
      const { galleryId } = req.params;
      const roomInstances = await this.roomService.getRoomInstancesByGallery(parseInt(galleryId));
      res.json({
        success: true,
        data: roomInstances
      });
    } catch (error) {
      this.logger.error('Error in getRoomInstancesByGallery:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch room instances'
      });
    }
  }

  /**
   * Get room instance by ID
   */
  async getRoomInstanceById(req: Request, res: Response): Promise<void> {
    try {
      const { instanceId } = req.params;
      const roomInstance = await this.roomService.getRoomInstanceById(parseInt(instanceId));

      if (!roomInstance) {
        res.status(404).json({
          success: false,
          error: 'Room instance not found'
        });
        return;
      }

      res.json({
        success: true,
        data: roomInstance
      });
    } catch (error) {
      this.logger.error('Error in getRoomInstanceById:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch room instance'
      });
    }
  }

  /**
   * Update room instance
   */
  async updateRoomInstance(req: Request, res: Response): Promise<void> {
    try {
      const { instanceId } = req.params;
      const updates = req.body;

      const roomInstance = await this.roomService.updateRoomInstance(parseInt(instanceId), updates);

      if (!roomInstance) {
        res.status(404).json({
          success: false,
          error: 'Room instance not found'
        });
        return;
      }

      res.json({
        success: true,
        data: roomInstance
      });
    } catch (error) {
      this.logger.error('Error in updateRoomInstance:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update room instance'
      });
    }
  }

  /**
   * Delete room instance
   */
  async deleteRoomInstance(req: Request, res: Response): Promise<void> {
    try {
      const { instanceId } = req.params;
      const deleted = await this.roomService.deleteRoomInstance(parseInt(instanceId));

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Room instance not found'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Room instance deleted successfully'
      });
    } catch (error) {
      this.logger.error('Error in deleteRoomInstance:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete room instance'
      });
    }
  }

  /**
   * Update visitor count for a room
   */
  async updateVisitorCount(req: Request, res: Response): Promise<void> {
    try {
      const { instanceId } = req.params;
      const { count } = req.body;

      if (typeof count !== 'number' || count < 0) {
        res.status(400).json({
          success: false,
          error: 'Invalid visitor count'
        });
        return;
      }

      await this.roomService.updateVisitorCount(parseInt(instanceId), count);
      res.json({
        success: true,
        message: 'Visitor count updated successfully'
      });
    } catch (error) {
      this.logger.error('Error in updateVisitorCount:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update visitor count'
      });
    }
  }

  /**
   * Get room analytics
   */
  async getRoomAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const { instanceId } = req.params;
      const { startDate, endDate } = req.query;

      const analytics = await this.roomService.getRoomAnalytics(
        parseInt(instanceId),
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined
      );

      res.json({
        success: true,
        data: analytics
      });
    } catch (error) {
      this.logger.error('Error in getRoomAnalytics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch room analytics'
      });
    }
  }

  /**
   * Validate room configuration
   */
  async validateRoomConfiguration(req: Request, res: Response): Promise<void> {
    try {
      const { typeId, customizations } = req.body;

      if (!typeId) {
        res.status(400).json({
          success: false,
          error: 'Room type ID is required'
        });
        return;
      }

      const validation = await this.roomService.validateRoomConfiguration(
        typeId,
        customizations || []
      );

      res.json({
        success: true,
        data: validation
      });
    } catch (error) {
      this.logger.error('Error in validateRoomConfiguration:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to validate room configuration'
      });
    }
  }
}import { inject, injectable } from 'inversify';
import { RoomService } from '../services/RoomService';
import { ILogger } from '../../types/interfaces';

@injectable()
export class RoomController {
  constructor(
    @inject('RoomService') private roomService: RoomService,
    @inject('ILogger') private logger: ILogger
  ) {}

  /**
   * Get all room types
   */
  async getRoomTypes(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.query;
      const roomTypes = await this.roomService.getRoomTypes(category as string);
      res.json({
        success: true,
        data: roomTypes
      });
    } catch (error) {
      this.logger.error('Error in getRoomTypes:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch room types'
      });
    }
  }

  /**
   * Get room type by ID
   */
  async getRoomTypeById(req: Request, res: Response): Promise<void> {
    try {
      const { typeId } = req.params;
      const roomType = await this.roomService.getRoomTypeById(parseInt(typeId));

      if (!roomType) {
        res.status(404).json({
          success: false,
          error: 'Room type not found'
        });
        return;
      }

      res.json({
        success: true,
        data: roomType
      });
    } catch (error) {
      this.logger.error('Error in getRoomTypeById:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch room type'
      });
    }
  }

  /**
   * Create a new room instance
   */
  async createRoomInstance(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
        return;
      }

      const roomData = {
        ...req.body,
        createdBy: userId
      };

      // Validate required fields
      if (!roomData.typeId || !roomData.galleryId || !roomData.name) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: typeId, galleryId, name'
        });
        return;
      }

      // Validate room configuration
      const validation = await this.roomService.validateRoomConfiguration(
        roomData.typeId,
        roomData.customizations || []
      );

      if (!validation.valid) {
        res.status(400).json({
          success: false,
          error: 'Invalid room configuration',
          details: validation.errors
        });
        return;
      }

      const roomInstance = await this.roomService.createRoomInstance(roomData);
      res.status(201).json({
        success: true,
        data: roomInstance
      });
    } catch (error) {
      this.logger.error('Error in createRoomInstance:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create room instance'
      });
    }
  }

  /**
   * Get room instances for a gallery
   */
  async getRoomInstancesByGallery(req: Request, res: Response): Promise<void> {
    try {
      const { galleryId } = req.params;
      const roomInstances = await this.roomService.getRoomInstancesByGallery(parseInt(galleryId));
      res.json({
        success: true,
        data: roomInstances
      });
    } catch (error) {
      this.logger.error('Error in getRoomInstancesByGallery:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch room instances'
      });
    }
  }

  /**
   * Get room instance by ID
   */
  async getRoomInstanceById(req: Request, res: Response): Promise<void> {
    try {
      const { instanceId } = req.params;
      const roomInstance = await this.roomService.getRoomInstanceById(parseInt(instanceId));

      if (!roomInstance) {
        res.status(404).json({
          success: false,
          error: 'Room instance not found'
        });
        return;
      }

      res.json({
        success: true,
        data: roomInstance
      });
    } catch (error) {
      this.logger.error('Error in getRoomInstanceById:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch room instance'
      });
    }
  }

  /**
   * Update room instance
   */
  async updateRoomInstance(req: Request, res: Response): Promise<void> {
    try {
      const { instanceId } = req.params;
      const updates = req.body;

      const roomInstance = await this.roomService.updateRoomInstance(parseInt(instanceId), updates);

      if (!roomInstance) {
        res.status(404).json({
          success: false,
          error: 'Room instance not found'
        });
        return;
      }

      res.json({
        success: true,
        data: roomInstance
      });
    } catch (error) {
      this.logger.error('Error in updateRoomInstance:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update room instance'
      });
    }
  }

  /**
   * Delete room instance
   */
  async deleteRoomInstance(req: Request, res: Response): Promise<void> {
    try {
      const { instanceId } = req.params;
      const deleted = await this.roomService.deleteRoomInstance(parseInt(instanceId));

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Room instance not found'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Room instance deleted successfully'
      });
    } catch (error) {
      this.logger.error('Error in deleteRoomInstance:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete room instance'
      });
    }
  }

  /**
   * Update visitor count for a room
   */
  async updateVisitorCount(req: Request, res: Response): Promise<void> {
    try {
      const { instanceId } = req.params;
      const { count } = req.body;

      if (typeof count !== 'number' || count < 0) {
        res.status(400).json({
          success: false,
          error: 'Invalid visitor count'
        });
        return;
      }

      await this.roomService.updateVisitorCount(parseInt(instanceId), count);
      res.json({
        success: true,
        message: 'Visitor count updated successfully'
      });
    } catch (error) {
      this.logger.error('Error in updateVisitorCount:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update visitor count'
      });
    }
  }

  /**
   * Get room analytics
   */
  async getRoomAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const { instanceId } = req.params;
      const { startDate, endDate } = req.query;

      const analytics = await this.roomService.getRoomAnalytics(
        parseInt(instanceId),
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined
      );

      res.json({
        success: true,
        data: analytics
      });
    } catch (error) {
      this.logger.error('Error in getRoomAnalytics:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch room analytics'
      });
    }
  }

  /**
   * Validate room configuration
   */
  async validateRoomConfiguration(req: Request, res: Response): Promise<void> {
    try {
      const { typeId, customizations } = req.body;

      if (!typeId) {
        res.status(400).json({
          success: false,
          error: 'Room type ID is required'
        });
        return;
      }

      const validation = await this.roomService.validateRoomConfiguration(
        typeId,
        customizations || []
      );

      res.json({
        success: true,
        data: validation
      });
    } catch (error) {
      this.logger.error('Error in validateRoomConfiguration:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to validate room configuration'
      });
    }
  }
}
