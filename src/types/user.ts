// src/types/user.ts
import { IService, ILogger, ICacheable } from './interfaces';

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
  preferences?: any;
  role?: string;
}

export interface UserFilters {
  limit?: number;
  offset?: number;
  sortBy?: 'created_at' | 'username' | 'email';
  sortOrder?: 'ASC' | 'DESC';
  role?: string;
  searchQuery?: string;
}

export interface IUserService extends IService {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(userData: CreateUserDto): Promise<User>;
  updateUser(id: string, updates: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
  getAll(filters?: UserFilters): Promise<User[]>;
  getUsersByRole(role: string): Promise<User[]>;
  updateRole(userId: string, newRole: string): Promise<User>;
  getFavorites(userId: string): Promise<any[]>;
  addFavorite(userId: string, artworkId: string): Promise<any>;
  removeFavorite(userId: string, artworkId: string): Promise<any>;
  getHistory(userId: string): Promise<any[]>;
  authenticate(email: string, password: string): Promise<User | null>;
}