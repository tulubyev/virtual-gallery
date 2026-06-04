// src/types/gallery.ts
import { IService, ILogger, ICacheable } from './interfaces';
import { Artwork } from './artwork';

export interface Gallery {
  gallery_id?: string;
  name: string;
  description: string;
  location?: string;
  opening_hours?: string;
  image_url?: string;
  created_at?: Date;
}

export interface Room {
  room_id?: string;
  gallery_id: string;
  name: string;
  description?: string;
  capacity?: number;
  created_at?: Date;
}

export interface GalleryFilters {
  limit?: number;
  offset?: number;
  sortBy?: 'created_at' | 'name';
  sortOrder?: 'ASC' | 'DESC';
}

export interface CreateGalleryDto {
  name: string;
  description: string;
  location?: string;
  opening_hours?: string;
  image_url?: string;
}

export interface UpdateGalleryDto {
  name?: string;
  description?: string;
  location?: string;
  opening_hours?: string;
  image_url?: string;
}

export interface IGalleryService extends IService {
  getById(id: string): Promise<Gallery | null>;
  getAll(filters?: GalleryFilters): Promise<Gallery[]>;
  create(gallery: CreateGalleryDto): Promise<Gallery>;
  update(id: string, updates: UpdateGalleryDto): Promise<Gallery>;
  delete(id: string): Promise<boolean>;
  getRooms(galleryId: string): Promise<Room[]>;
  getRecommendedArtworks(galleryId: string, count?: number): Promise<Artwork[]>;
}