// tests/services/ArtworkService.test.ts
import { Pool } from 'pg';
import { ArtworkService } from '../../src/services/ArtworkService';
import { Artwork } from '../../src/types/artwork';
import { ILogger } from '../../src/types/interfaces';

// Mock the database pool
const mockPool = {
  connect: jest.fn(),
} as unknown as Pool;

// Mock the logger
const mockLogger: ILogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

describe('ArtworkService - Unit Tests', () => {
  let artworkService: ArtworkService;

  beforeEach(() => {
    artworkService = new ArtworkService(mockPool, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create artwork with valid data', async () => {
      // Arrange
      const artworkData = { 
        title: 'Test Artwork', 
        artist_name: 'Test Artist',
        tags: ['test', 'art'],
        gallery_id: 'gallery1'
      };
      
      const expectedArtwork = {
        artwork_id: '1',
        ...artworkData,
      };
      
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [expectedArtwork] }),
        release: jest.fn(),
      };
      
      (mockPool.connect as jest.MockedFunction<typeof mockPool.connect>)
        .mockResolvedValue(mockClient as any);

      // Act
      const result = await artworkService.create(artworkData);

      // Assert
      expect(result).toEqual(expectedArtwork);
      expect(mockClient.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO artworks'),
        expect.arrayContaining([
          artworkData.title,
          artworkData.artist_name,
          expect.anything(), // tags array
          artworkData.gallery_id
        ])
      );
      expect(mockLogger.info).toHaveBeenCalledWith('Artwork created', { artworkId: '1' });
      expect(mockClient.release).toHaveBeenCalled();
    });

    it('should handle database errors gracefully', async () => {
      // Arrange
      const artworkData = { 
        title: 'Test Artwork', 
        artist_name: 'Test Artist',
        tags: ['test', 'art'],
        gallery_id: 'gallery1'
      };
      
      const mockClient = {
        query: jest.fn().mockRejectedValue(new Error('Database error')),
        release: jest.fn(),
      };
      
      (mockPool.connect as jest.MockedFunction<typeof mockPool.connect>)
        .mockResolvedValue(mockClient as any);

      // Act & Assert
      await expect(artworkService.create(artworkData)).rejects.toThrow('Database error');
      expect(mockClient.release).toHaveBeenCalled();
    });
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
      
      (mockPool.connect as jest.MockedFunction<typeof mockPool.connect>)
        .mockResolvedValue(mockClient as any);

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
      
      (mockPool.connect as jest.MockedFunction<typeof mockPool.connect>)
        .mockResolvedValue(mockClient as any);

      // Act
      const result = await artworkService.getById('999');

      // Assert
      expect(result).toBeNull();
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
      
      (mockPool.connect as jest.MockedFunction<typeof mockPool.connect>)
        .mockResolvedValue(mockClient as any);

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

    it('should throw error when artwork to update is not found', async () => {
      // Arrange
      const updateData = { title: 'Updated Title' };
      
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [] }),
        release: jest.fn(),
      };
      
      (mockPool.connect as jest.MockedFunction<typeof mockPool.connect>)
        .mockResolvedValue(mockClient as any);

      // Act & Assert
      await expect(artworkService.update('999', updateData)).rejects.toThrow('Artwork with ID 999 not found');
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
      
      (mockPool.connect as jest.MockedFunction<typeof mockPool.connect>)
        .mockResolvedValue(mockClient as any);

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
      
      (mockPool.connect as jest.MockedFunction<typeof mockPool.connect>)
        .mockResolvedValue(mockClient as any);

      // Act & Assert
      await expect(artworkService.delete('999')).rejects.toThrow('Artwork with ID 999 not found');
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('search', () => {
    it('should return artworks matching the search query', async () => {
      // Arrange
      const mockArtworks: Artwork[] = [
        {
          artwork_id: '1',
          title: 'Test Artwork',
          artist_name: 'Test Artist',
          tags: ['test', 'art'],
        }
      ];
      
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: mockArtworks }),
        release: jest.fn(),
      };
      
      (mockPool.connect as jest.MockedFunction<typeof mockPool.connect>)
        .mockResolvedValue(mockClient as any);

      // Act
      const result = await artworkService.search('Test');

      // Assert
      expect(result).toEqual(mockArtworks);
      expect(mockClient.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT artwork_id, title, artist_name, year_created, medium, dimensions, style, description, image_url, tags, created_at, gallery_id FROM artworks'),
        [expect.stringContaining('%Test%'), 'Test', 20, 0]
      );
      expect(mockClient.release).toHaveBeenCalled();
    });
  });
});

// Integration tests for ArtworkService
describe('ArtworkService - Integration Tests', () => {
  let artworkService: ArtworkService;
  let mockClient: any;

  beforeEach(() => {
    artworkService = new ArtworkService(mockPool, mockLogger);
    
    mockClient = {
      query: jest.fn(),
      release: jest.fn(),
    };
    
    (mockPool.connect as jest.MockedFunction<typeof mockPool.connect>)
      .mockResolvedValue(mockClient as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create, retrieve, update, and delete an artwork in sequence', async () => {
    // Step 1: Create an artwork
    const newArtworkData = { 
      title: 'Integration Test Artwork', 
      artist_name: 'Integration Test Artist',
      tags: ['integration', 'test'],
      gallery_id: 'gallery1'
    };
    
    const createdArtwork = {
      artwork_id: '100',
      ...newArtworkData,
    };
    
    mockClient.query.mockResolvedValueOnce({ rows: [createdArtwork] });
    
    const created = await artworkService.create(newArtworkData);
    expect(created).toEqual(createdArtwork);
    expect(mockLogger.info).toHaveBeenCalledWith('Artwork created', { artworkId: '100' });

    // Step 2: Retrieve the artwork
    mockClient.query.mockResolvedValueOnce({ rows: [createdArtwork] });
    
    const retrieved = await artworkService.getById('100');
    expect(retrieved).toEqual(createdArtwork);

    // Step 3: Update the artwork
    const updateData = { title: 'Updated Integration Test Artwork' };
    const updatedArtwork = { ...createdArtwork, ...updateData };
    
    mockClient.query.mockResolvedValueOnce({ rows: [updatedArtwork] });
    
    const updated = await artworkService.update('100', updateData);
    expect(updated).toEqual(updatedArtwork);
    expect(mockLogger.info).toHaveBeenCalledWith('Artwork updated', { artworkId: '100' });

    // Step 4: Delete the artwork
    mockClient.query.mockResolvedValueOnce({ rows: [{ artwork_id: '100' }] });
    
    await artworkService.delete('100');
    expect(mockLogger.info).toHaveBeenCalledWith('Artwork deleted', { artworkId: '100' });
  });
});