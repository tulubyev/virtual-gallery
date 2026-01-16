// src/services/__tests__/ArtworkService.test.ts

import { Pool, PoolClient } from 'pg';
import { ArtworkService } from '../ArtworkService';
import { Artwork } from '../../types/artwork';
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

describe('ArtworkService', () => {
  let artworkService: ArtworkService;

  beforeEach(() => {
    artworkService = new ArtworkService(mockPool, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getById', () => {
    it('should return artwork when found', async () => {
      // Arrange
      const mockArtwork: Artwork = {
        artwork_id: '1',
        title: 'Test Artwork',
        artist_name: 'Test Artist',
        tags: ['test', 'art'],
      };

      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [mockArtwork] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await artworkService.getById('1');

      // Assert
      expect(result).toEqual(mockArtwork);
      expect(mockClient.query).toHaveBeenCalledWith(
        'SELECT artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at, gallery_id FROM artworks WHERE artwork_id = $1',
        ['1']
      );
      expect(mockClient.release).toHaveBeenCalled();
    });

    it('should return null when artwork not found', async () => {
      // Arrange
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await artworkService.getById('999');

      // Assert
      expect(result).toBeNull();
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new artwork', async () => {
      // Arrange
      const artworkData = {
        title: 'New Artwork',
        artist_name: 'New Artist',
        tags: ['modern', 'abstract'],
        gallery_id: 'gallery1'
      };

      const createdArtwork: Artwork = {
        artwork_id: '2',
        ...artworkData,
      };

      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [createdArtwork] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await artworkService.create(artworkData);

      // Assert
      expect(result).toEqual(createdArtwork);
      expect(mockClient.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO artworks'),
        expect.arrayContaining([
          artworkData.title,
          artworkData.artist_name,
          expect.anything(), // tags array
          artworkData.gallery_id
        ])
      );
      expect(mockLogger.info).toHaveBeenCalledWith('Artwork created', { artworkId: '2' });
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an existing artwork', async () => {
      // Arrange
      const updateData = {
        title: 'Updated Title',
        artist_name: 'Updated Artist'
      };

      const updatedArtwork: Artwork = {
        artwork_id: '1',
        title: 'Updated Title',
        artist_name: 'Updated Artist',
        tags: ['test', 'art'],
      };

      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [updatedArtwork] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await artworkService.update('1', updateData);

      // Assert
      expect(result).toEqual(updatedArtwork);
      expect(mockClient.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE artworks SET'),
        expect.arrayContaining(['1']) // ID is passed as the last parameter
      );
      expect(mockLogger.info).toHaveBeenCalledWith('Artwork updated', { artworkId: '1' });
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete an artwork', async () => {
      // Arrange
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [{ artwork_id: '1' }] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      await artworkService.delete('1');

      // Assert
      expect(mockClient.query).toHaveBeenCalledWith(
        'DELETE FROM artworks WHERE artwork_id = $1 RETURNING artwork_id',
        ['1']
      );
      expect(mockLogger.info).toHaveBeenCalledWith('Artwork deleted', { artworkId: '1' });
      expect(mockClient.release).toHaveBeenCalled();
    });

    it('should throw error when artwork to delete is not found', async () => {
      // Arrange
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act & Assert
      await expect(artworkService.delete('999')).rejects.toThrow('Artwork with ID 999 not found');
      expect(mockClient.release).toHaveBeenCalled();
    });
  });
});