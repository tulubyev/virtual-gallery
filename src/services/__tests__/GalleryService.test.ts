// src/services/__tests__/GalleryService.test.ts

import { Pool, PoolClient } from 'pg';
import { GalleryService } from '../GalleryService';
import { Gallery, Room } from '../../types/gallery';
import { ILogger } from '../../types/interfaces';

// Mock the database pool
const mockPool = {
  connect: jest.fn(),
} as unknown as jest.Mocked<Pool>;

// Mock the logger
const mockLogger: ILogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

describe('GalleryService', () => {
  let galleryService: GalleryService;

  beforeEach(() => {
    galleryService = new GalleryService(mockPool, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getById', () => {
    it('should return gallery when found', async () => {
      // Arrange
      const mockGallery: Gallery = {
        gallery_id: '1',
        name: 'Test Gallery',
        description: 'A test gallery',
      };

      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [mockGallery] }),
        release: jest.fn(),
      } as unknown as jest.Mocked<PoolClient>;

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await galleryService.getById('1');

      // Assert
      expect(result).toEqual(mockGallery);
      expect(mockClient.query).toHaveBeenCalledWith(
        'SELECT * FROM galleries WHERE gallery_id = $1',
        ['1']
      );
      expect(mockClient.release).toHaveBeenCalled();
    });

    it('should return null when gallery not found', async () => {
      // Arrange
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [] }),
        release: jest.fn(),
      } as unknown as jest.Mocked<PoolClient>;

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await galleryService.getById('999');

      // Assert
      expect(result).toBeNull();
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('getRooms', () => {
    it('should return rooms for a gallery', async () => {
      // Arrange
      const mockRooms: Room[] = [
        { room_id: '1', gallery_id: '1', name: 'Main Hall', description: 'Main exhibition hall' },
        { room_id: '2', gallery_id: '1', name: 'Contemporary Wing', description: 'Modern art wing' }
      ];

      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: mockRooms }),
        release: jest.fn(),
      } as unknown as jest.Mocked<PoolClient>;

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await galleryService.getRooms('1');

      // Assert
      expect(result).toEqual(mockRooms);
      expect(mockClient.query).toHaveBeenCalledWith(
        'SELECT * FROM rooms WHERE gallery_id = $1 ORDER BY created_at DESC',
        ['1']
      );
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new gallery', async () => {
      // Arrange
      const galleryData = {
        name: 'New Gallery',
        description: 'A new test gallery',
        location: 'Test Location',
        opening_hours: '9AM-5PM',
        image_url: 'http://example.com/image.jpg'
      };

      const createdGallery: Gallery = {
        gallery_id: '2',
        ...galleryData,
      };

      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [createdGallery] }),
        release: jest.fn(),
      } as unknown as jest.Mocked<PoolClient>;

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await galleryService.create(galleryData);

      // Assert
      expect(result).toEqual(createdGallery);
      expect(mockClient.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO galleries'),
        expect.arrayContaining([
          galleryData.name,
          galleryData.description,
          galleryData.opening_hours,
          galleryData.image_url
        ])
      );
      expect(mockLogger.info).toHaveBeenCalledWith('Gallery created', { galleryId: '2' });
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an existing gallery', async () => {
      // Arrange
      const updateData = {
        name: 'Updated Gallery Name',
        description: 'Updated Description'
      };

      const updatedGallery: Gallery = {
        gallery_id: '1',
        name: 'Updated Gallery Name',
        description: 'Updated Description',
      };

      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [updatedGallery] }),
        release: jest.fn(),
      } as unknown as jest.Mocked<PoolClient>;

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await galleryService.update('1', updateData);

      // Assert
      expect(result).toEqual(updatedGallery);
      expect(mockClient.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE galleries SET'),
        expect.arrayContaining(['1']) // ID is passed as the last parameter
      );
      expect(mockLogger.info).toHaveBeenCalledWith('Gallery updated', { galleryId: '1' });
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a gallery', async () => {
      // Arrange
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [{ gallery_id: '1' }] }),
        release: jest.fn(),
      } as unknown as jest.Mocked<PoolClient>;

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      await galleryService.delete('1');

      // Assert
      expect(mockClient.query).toHaveBeenCalledWith(
        'DELETE FROM galleries WHERE gallery_id = $1 RETURNING gallery_id',
        ['1']
      );
      expect(mockLogger.info).toHaveBeenCalledWith('Gallery deleted', { galleryId: '1' });
      expect(mockClient.release).toHaveBeenCalled();
    });

    it('should throw error when gallery to delete is not found', async () => {
      // Arrange
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [] }),
        release: jest.fn(),
      } as unknown as jest.Mocked<PoolClient>;

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act & Assert
      await expect(galleryService.delete('999')).rejects.toThrow('Gallery with ID 999 not found');
      expect(mockClient.release).toHaveBeenCalled();
    });
  });
});