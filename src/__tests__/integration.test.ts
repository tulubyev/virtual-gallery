// src/__tests__/integration.test.ts
import request from 'supertest';
import { app } from '../server'; // Assuming we have an exported app from server.ts
import { container } from '../container';
import { IArtworkService, IGalleryService, IUserService } from '../types/artwork';

describe('Integration Tests', () => {
  let artworkService: IArtworkService;
  let galleryService: IGalleryService;
  let userService: IUserService;

  beforeAll(() => {
    artworkService = container.get<IArtworkService>('artworkService');
    galleryService = container.get<IGalleryService>('galleryService');
    userService = container.get<IUserService>('userService');
  });

  describe('Artwork API Integration', () => {
    it('should create and retrieve an artwork', async () => {
      // First, create a gallery to associate with the artwork
      const gallery = await galleryService.create({
        name: 'Test Gallery',
        description: 'A gallery for testing',
      });

      // Create an artwork
      const newArtwork = {
        title: 'Test Artwork',
        artist_name: 'Test Artist',
        tags: ['test', 'integration'],
        gallery_id: gallery.gallery_id,
      };

      const createdArtwork = await artworkService.create(newArtwork);

      // Retrieve the artwork
      const retrievedArtwork = await artworkService.getById(createdArtwork.artwork_id!);

      expect(retrievedArtwork).toBeDefined();
      expect(retrievedArtwork?.title).toBe('Test Artwork');
      expect(retrievedArtwork?.artist_name).toBe('Test Artist');
      expect(retrievedArtwork?.gallery_id).toBe(gallery.gallery_id);
    });

    it('should return all artworks', async () => {
      const artworks = await artworkService.getAll();
      expect(Array.isArray(artworks)).toBe(true);
    });
  });

  describe('Gallery API Integration', () => {
    it('should create and retrieve a gallery', async () => {
      const newGallery = {
        name: 'Integration Test Gallery',
        description: 'A gallery created for integration testing',
      };

      const createdGallery = await galleryService.create(newGallery);

      const retrievedGallery = await galleryService.getById(createdGallery.gallery_id!);

      expect(retrievedGallery).toBeDefined();
      expect(retrievedGallery?.name).toBe('Integration Test Gallery');
      expect(retrievedGallery?.description).toBe('A gallery created for integration testing');
    });
  });

  describe('User API Integration', () => {
    it('should create and retrieve a user', async () => {
      const newUser = {
        username: 'integration_test_user',
        email: 'integration_test@example.com',
        password: 'secure_password',
        role: 'user',
      };

      const createdUser = await userService.createUser(newUser);

      const retrievedUser = await userService.getUserById(createdUser.user_id!);

      expect(retrievedUser).toBeDefined();
      expect(retrievedUser?.username).toBe('integration_test_user');
      expect(retrievedUser?.email).toBe('integration_test@example.com');
      expect(retrievedUser?.role).toBe('user');
    });
  });

  describe('HTTP API Integration', () => {
    it('should respond to health check endpoint', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });

    it('should respond to artwork endpoints', async () => {
      const response = await request(app).get('/api/artworks');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should respond to gallery endpoints', async () => {
      const response = await request(app).get('/api/galleries');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});