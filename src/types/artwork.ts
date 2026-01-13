// src/types/artwork.ts
import { IService } from './interfaces';

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
  getByGallery(galleryId: string, filters?: ArtworkFilters): Promise<Artwork[]>;
  create(artwork: CreateArtworkDto): Promise<Artwork>;
  update(id: string, updates: UpdateArtworkDto): Promise<Artwork>;
  delete(id: string): Promise<void>;
  search(query: string, filters?: SearchFilters): Promise<Artwork[]>;
}

export interface Gallery {
  gallery_id?: string;
  name: string;
  description: string;
  location?: string;
  opening_hours?: string;
  image_url?: string;
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
  delete(id: string): Promise<void>;
  getRooms(galleryId: string): Promise<Room[]>;
}

export interface Room {
  room_id?: string;
  gallery_id: string;
  name: string;
  description?: string;
  capacity?: number;
  created_at?: Date;
}

export interface IUserService extends IService {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(userData: CreateUserDto): Promise<User>;
  updateUser(id: string, updates: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<void>;
  authenticate(email: string, password: string): Promise<User | null>;
}

export interface User {
  user_id?: string;
  username: string;
  email: string;
  password_hash?: string;
  role?: string;
  preferences?: any;
  created_at?: Date;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  preferences?: any;
}