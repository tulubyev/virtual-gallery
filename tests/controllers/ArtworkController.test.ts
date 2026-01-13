// tests/controllers/ArtworkController.test.ts
import { Request, Response } from 'express';
import { ArtworkController } from '../../src/controllers/ArtworkController';
import { IArtworkService } from '../../src/types/artwork';
import { ILogger } from '../../src/types/interfaces';

// Mock the artwork service
const mockArtworkService: jest.Mocked<IArtworkService> = {
  getById: jest.fn(),
  getByGallery: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  search: jest.fn(),
  initialize: jest.fn(),
  dispose: jest.fn(),
};

// Mock the logger
const mockLogger: jest.Mocked<ILogger> = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

describe('ArtworkController - Unit Tests', () => {
  let artworkController: ArtworkController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    artworkController = new ArtworkController(mockArtworkService, mockLogger);
    mockReq = {};
    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getArtworkById', () => {
    it('should return artwork when found', async () => {
      // Arrange
      const artwork = {
        artwork_id: '1',
        title: 'Test Artwork',
        artist_name: 'Test Artist',
        tags: ['test', 'art'],
      };
      
      mockReq.params = { id: '1' };
      mockArtworkService.getById.mockResolvedValue(artwork);

      // Act
      await artworkController.getArtworkById(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockArtworkService.getById).toHaveBeenCalledWith('1');
      expect(mockRes.json).toHaveBeenCalledWith(artwork);
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return 404 when artwork not found', async () => {
      // Arrange
      mockReq.params = { id: '999' };
      mockArtworkService.getById.mockResolvedValue(null);

      // Act
      await artworkController.getArtworkById(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockArtworkService.getById).toHaveBeenCalledWith('999');
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Artwork not found' });
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      mockReq.params = { id: '1' };
      const error = new Error('Database error');
      mockArtworkService.getById.mockRejectedValue(error);

      // Act
      await artworkController.getArtworkById(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockArtworkService.getById).toHaveBeenCalledWith('1');
      expect(mockLogger.error).toHaveBeenCalledWith('Failed to get artwork with id 1', error);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('createArtwork', () => {
    it('should create artwork successfully', async () => {
      // Arrange
      const artworkData = {
        title: 'New Artwork',
        artist_name: 'New Artist',
        tags: ['modern', 'abstract'],
        gallery_id: 'gallery1'
      };
      
      const createdArtwork = {
        artwork_id: '2',
        ...artworkData,
      };
      
      mockReq.body = artworkData;
      mockArtworkService.create.mockResolvedValue(createdArtwork);

      // Act
      await artworkController.createArtwork(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockArtworkService.create).toHaveBeenCalledWith(artworkData);
      expect(mockLogger.info).toHaveBeenCalledWith('Artwork created', { artworkId: '2' });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(createdArtwork);
    });

    it('should handle errors during artwork creation', async () => {
      // Arrange
      const artworkData = {
        title: 'New Artwork',
        artist_name: 'New Artist',
        tags: ['modern', 'abstract'],
        gallery_id: 'gallery1'
      };
      
      mockReq.body = artworkData;
      const error = new Error('Creation failed');
      mockArtworkService.create.mockRejectedValue(error);

      // Act
      await artworkController.createArtwork(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockArtworkService.create).toHaveBeenCalledWith(artworkData);
      expect(mockLogger.error).toHaveBeenCalledWith('Failed to create artwork', error);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Creation failed' });
    });
  });

  describe('updateArtwork', () => {
    it('should update artwork successfully', async () => {
      // Arrange
      const updateData = {
        title: 'Updated Title',
        artist_name: 'Updated Artist'
      };
      
      const updatedArtwork = {
        artwork_id: '1',
        title: 'Updated Title',
        artist_name: 'Updated Artist',
        tags: ['test', 'art'],
      };
      
      mockReq.params = { id: '1' };
      mockReq.body = updateData;
      mockArtworkService.update.mockResolvedValue(updatedArtwork);

      // Act
      await artworkController.updateArtwork(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockArtworkService.update).toHaveBeenCalledWith('1', updateData);
      expect(mockLogger.info).toHaveBeenCalledWith('Artwork updated', { artworkId: '1' });
      expect(mockRes.json).toHaveBeenCalledWith(updatedArtwork);
    });

    it('should handle errors during artwork update', async () => {
      // Arrange
      const updateData = {
        title: 'Updated Title',
        artist_name: 'Updated Artist'
      };
      
      mockReq.params = { id: '1' };
      mockReq.body = updateData;
      const error = new Error('Update failed');
      mockArtworkService.update.mockRejectedValue(error);

      // Act
      await artworkController.updateArtwork(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockArtworkService.update).toHaveBeenCalledWith('1', updateData);
      expect(mockLogger.error).toHaveBeenCalledWith('Failed to update artwork with id 1', error);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Update failed' });
    });
  });

  describe('deleteArtwork', () => {
    it('should delete artwork successfully', async () => {
      // Arrange
      mockReq.params = { id: '1' };
      mockArtworkService.delete.mockResolvedValue(undefined);

      // Act
      await artworkController.deleteArtwork(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockArtworkService.delete).toHaveBeenCalledWith('1');
      expect(mockLogger.info).toHaveBeenCalledWith('Artwork deleted', { artworkId: '1' });
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Artwork deleted successfully' });
    });

    it('should handle errors during artwork deletion', async () => {
      // Arrange
      mockReq.params = { id: '1' };
      const error = new Error('Deletion failed');
      mockArtworkService.delete.mockRejectedValue(error);

      // Act
      await artworkController.deleteArtwork(mockReq as Request, mockRes as Response);

      // Assert
      expect(mockArtworkService.delete).toHaveBeenCalledWith('1');
      expect(mockLogger.error).toHaveBeenCalledWith('Failed to delete artwork with id 1', error);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Deletion failed' });
    });
  });
});

// Integration tests for ArtworkController
describe('ArtworkController - Integration Tests', () => {
  let artworkController: ArtworkController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    artworkController = new ArtworkController(mockArtworkService, mockLogger);
    mockReq = {};
    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle full CRUD cycle for an artwork', async () => {
    // Step 1: Create an artwork
    const artworkData = {
      title: 'Integration Test Artwork',
      artist_name: 'Integration Test Artist',
      tags: ['integration', 'test'],
      gallery_id: 'gallery1'
    };
    
    const createdArtwork = {
      artwork_id: '200',
      ...artworkData,
    };
    
    mockReq.body = artworkData;
    mockArtworkService.create.mockResolvedValue(createdArtwork);
    
    await artworkController.createArtwork(mockReq as Request, mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(createdArtwork);

    // Reset mocks for next operation
    (mockRes.status as jest.Mock).mockClear();
    (mockRes.json as jest.Mock).mockClear();
    
    // Step 2: Retrieve the artwork
    mockReq.params = { id: '200' };
    mockArtworkService.getById.mockResolvedValue(createdArtwork);
    
    await artworkController.getArtworkById(mockReq as Request, mockRes as Response);
    expect(mockRes.json).toHaveBeenCalledWith(createdArtwork);

    // Reset mocks for next operation
    (mockRes.json as jest.Mock).mockClear();
    
    // Step 3: Update the artwork
    const updateData = { title: 'Updated Integration Test Artwork' };
    const updatedArtwork = { ...createdArtwork, ...updateData };
    
    mockReq.body = updateData;
    mockArtworkService.update.mockResolvedValue(updatedArtwork);
    
    await artworkController.updateArtwork(mockReq as Request, mockRes as Response);
    expect(mockRes.json).toHaveBeenCalledWith(updatedArtwork);

    // Reset mocks for next operation
    (mockRes.json as jest.Mock).mockClear();
    
    // Step 4: Delete the artwork
    mockArtworkService.delete.mockResolvedValue(undefined);
    
    await artworkController.deleteArtwork(mockReq as Request, mockRes as Response);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Artwork deleted successfully' });
  });
});