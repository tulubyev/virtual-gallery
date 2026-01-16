// src/types/artwork.ts
import { IService, ILogger, ICacheable } from './interfaces';

export interface Artwork {
  artwork_id?: string;
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

export interface CreateArtworkDto {
  title: string;
  artist_name: string;
  year_created?: number;
  medium?: string;
  dimensions?: string;
  style?: string;
  description?: string;
  image_url?: string;
  tags: string[];
  gallery_id?: string;
}

export interface UpdateArtworkDto {
  title?: string;
  artist_name?: string;
  year_created?: number;
  medium?: string;
  dimensions?: string;
  style?: string;
  description?: string;
  image_url?: string;
  tags?: string[];
  gallery_id?: string;
}

export interface SearchFilters {
  limit?: number;
  offset?: number;
  tags?: string[];
}

export interface IArtworkService extends IService {
  getById(id: string): Promise<Artwork | null>;
  getAll(filters?: ArtworkFilters): Promise<Artwork[]>;
  create(artwork: CreateArtworkDto): Promise<Artwork>;
  update(id: string, updates: UpdateArtworkDto): Promise<Artwork>;
  delete(id: string): Promise<boolean>;
  search(query: string, filters?: SearchFilters): Promise<Artwork[]>;
  getRecommended(userId: string, count?: number): Promise<Artwork[]>;
  getSimilar(artworkId: string, count?: number): Promise<Artwork[]>;
  filterByTags(tags: string[]): Promise<Artwork[]>;
  getAnalytics(artworkId: string): Promise<any>;
}