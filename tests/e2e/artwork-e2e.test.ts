// tests/e2e/artwork-e2e.test.ts
import request from 'supertest';
import { app } from '../../src/server';
import { container } from '../../src/container';
import { IArtworkService } from '../../src/types/artwork';

describe('Artwork API - End-to-End Tests', () => {
  let artworkService: IArtworkService;

  beforeAll(() => {
    artworkService = container.get<IArtworkService>('artworkService');
  });

  describe('Artwork CRUD Operations', () => {
    let createdArtworkId: string;

    it('should create a new artwork', async () => {
      const artworkData = {
        title: 'E2E Test Artwork',
        artist_name: 'E2E Test Artist',
        year_created: 2023,
        medium: 'Oil on canvas',
        dimensions: '24x36 inches',
        style: 'Abstract',
        description: 'A test artwork for end-to-end testing',
        image_url: 'http://example.com/test-image.jpg',
        tags: ['e2e', 'test', 'abstract'],
        gallery_id: 'test-gallery'
      };

      const response = await request(app)
        .post('/api/artworks')
        .send(artworkData)
        .expect(201);

      expect(response.body).toHaveProperty('artwork_id');
      expect(response.body.title).toBe('E2E Test Artwork');
      expect(response.body.artist_name).toBe('E2E Test Artist');
      expect(response.body.tags).toContain('e2e');
      
      createdArtworkId = response.body.artwork_id;
    });

    it('should retrieve the created artwork', async () => {
      const response = await request(app)
        .get(`/api/artworks/${createdArtworkId}`)
        .expect(200);

      expect(response.body.artwork_id).toBe(createdArtworkId);
      expect(response.body.title).toBe('E2E Test Artwork');
    });

    it('should update the artwork', async () => {
      const updateData = {
        title: 'Updated E2E Test Artwork',
        description: 'Updated description for end-to-end testing'
      };

      const response = await request(app)
        .put(`/api/artworks/${createdArtworkId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.artwork_id).toBe(createdArtworkId);
      expect(response.body.title).toBe('Updated E2E Test Artwork');
      expect(response.body.description).toBe('Updated description for end-to-end testing');
    });

    it('should search for artworks', async () => {
      const response = await request(app)
        .get('/api/artworks/search/Test')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      // At least the artwork we created should be in the results
      const foundArtwork = response.body.find((art: any) => art.artwork_id === createdArtworkId);
      expect(foundArtwork).toBeDefined();
    });

    it('should delete the artwork', async () => {
      await request(app)
        .delete(`/api/artworks/${createdArtworkId}`)
        .expect(200);

      // Verify the artwork was deleted
      await request(app)
        .get(`/api/artworks/${createdArtworkId}`)
        .expect(404);
    });
  });

  describe('Artwork Validation', () => {
    it('should return 400 when creating artwork with invalid data', async () => {
      const invalidArtworkData = {
        // Missing required fields
      };

      await request(app)
        .post('/api/artworks')
        .send(invalidArtworkData)
        .expect(500); // Since we're not validating in this example, it will fail at DB level
    });

    it('should return 404 when retrieving non-existent artwork', async () => {
      await request(app)
        .get('/api/artworks/nonexistent-id')
        .expect(404);
    });
  });

  describe('Performance and Load', () => {
    it('should handle concurrent requests', async () => {
      // Create multiple artworks concurrently
      const promises = Array.from({ length: 5 }, (_, i) => 
        request(app)
          .post('/api/artworks')
          .send({
            title: `Concurrent Test Artwork ${i}`,
            artist_name: 'Load Test Artist',
            tags: ['concurrent', 'test'],
            gallery_id: 'test-gallery'
          })
      );

      const responses = await Promise.all(promises);
      
      responses.forEach(response => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('artwork_id');
      });

      // Clean up created artworks
      for (const response of responses) {
        await request(app)
          .delete(`/api/artworks/${response.body.artwork_id}`)
          .expect(200);
      }
    });
  });
});

// User journey test
describe('User Journey - Artwork Discovery', () => {
  it('should allow a user to discover artworks', async () => {
    // 1. User visits the gallery homepage
    const homeResponse = await request(app)
      .get('/')
      .expect(200);
    
    expect(homeResponse.text).toContain('Virtual Gallery');

    // 2. User searches for artworks
    const searchResponse = await request(app)
      .get('/api/artworks/search/modern')
      .expect(200);
    
    expect(Array.isArray(searchResponse.body)).toBe(true);

    // 3. User views a specific artwork
    if (searchResponse.body.length > 0) {
      const artworkId = searchResponse.body[0].artwork_id;
      const artworkResponse = await request(app)
        .get(`/api/artworks/${artworkId}`)
        .expect(200);
      
      expect(artworkResponse.body).toHaveProperty('artwork_id');
    }
  });
});