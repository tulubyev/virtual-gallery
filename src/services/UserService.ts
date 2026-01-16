// src/services/UserService.ts
import { Pool } from 'pg';
import { BaseService } from './BaseService';
import {
  IUserService,
  User,
  CreateUserDto,
  UpdateUserDto,
  UserFilters
} from '../types/user';
import { ILogger, ICacheable } from '../types/interfaces';

export class UserService extends BaseService implements IUserService {
  private pool: Pool;

  constructor(
    pool: Pool,
    logger: ILogger,
    cache?: ICacheable
  ) {
    super(logger, cache);
    this.pool = pool;
  }
  async getUserById(id: string): Promise<User | null> {
    return this.withCache(
      `user:${id}`,
      async () => {
        const client = await this.pool.connect();
        try {
          const result = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);
          return result.rows.length > 0 ? result.rows[0] : null;
        } finally {
          client.release();
        }
      },
      3600 // 1 hour
    );
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [userData.username, userData.email, userData.password, userData.role || 'user']
      );

      const newUser = result.rows[0];

      // Invalidate cache
      if (this.cache) {
        await this.cache.delete('users:all');
      }

      this.logger.info('User created', { userId: newUser.user_id, email: newUser.email });
      return newUser;
    } finally {
      client.release();
    }
  }

  async updateUser(id: string, updates: UpdateUserDto): Promise<User> {
    const client = await this.pool.connect();
    try {
      // Build dynamic SQL query based on fields to update
      const updateFields: string[] = [];
      const values: any[] = [];
      let paramIndex = 2; // Start with 2 because 1 is the id

      if (updates.username !== undefined) {
        updateFields.push(`username = $${paramIndex}`);
        values.push(updates.username);
        paramIndex++;
      }

      if (updates.email !== undefined) {
        updateFields.push(`email = $${paramIndex}`);
        values.push(updates.email);
        paramIndex++;
      }

      if (updates.password !== undefined) {
        updateFields.push(`password_hash = $${paramIndex}`);
        values.push(updates.password);
        paramIndex++;
      }

      if (updates.role !== undefined) {
        updateFields.push(`role = $${paramIndex}`);
        values.push(updates.role);
        paramIndex++;
      }

      if (updates.preferences !== undefined) {
        updateFields.push(`preferences = $${paramIndex}`);
        values.push(updates.preferences);
        paramIndex++;
      }

      // Add id to the end of values
      values.push(id);

      if (updateFields.length === 0) {
        // If no fields to update, just return the user
        const existing = await this.getUserById(id);
        if (!existing) {
          throw new Error(`User with ID ${id} not found`);
        }
        return existing;
      }

      const query = `UPDATE users SET ${updateFields.join(', ')} WHERE user_id = $${paramIndex} RETURNING *`;
      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        throw new Error(`User with ID ${id} not found`);
      }

      const updatedUser = result.rows[0];

      // Invalidate cache
      if (this.cache) {
        await this.cache.delete(`user:${id}`);
        await this.cache.delete('users:all');
      }

      this.logger.info('User updated', { userId: updatedUser.user_id, email: updatedUser.email });
      return updatedUser;
    } finally {
      client.release();
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('DELETE FROM users WHERE user_id = $1 RETURNING user_id', [id]);

      if (result.rows.length === 0) {
        throw new Error(`User with ID ${id} not found`);
      }

      // Invalidate cache
      if (this.cache) {
        await this.cache.delete(`user:${id}`);
        await this.cache.delete('users:all');
      }

      this.logger.info('User deleted', { userId: id });
      return true;
    } finally {
      client.release();
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    // In a real implementation, this would verify the password hash
    // For now, returning the user if found
    const user = await this.getUserByEmail(email);
    if (user) {
      // In a real implementation, compare password hash here
      return user;
    }
    return null;
  }

  async getAll(filters?: UserFilters): Promise<User[]> {
    const cacheKey = `users:all:${JSON.stringify(filters)}`;

    return this.withCache(cacheKey, async () => {
      const client = await this.pool.connect();
      try {
        let query = 'SELECT * FROM users';
        const params: any[] = [];
        let paramIndex = 1;

        // Apply filters if provided
        if (filters) {
          const conditions: string[] = [];

          if (filters.searchQuery) {
            // Full-text search on username and email
            conditions.push(`username ILIKE $${paramIndex} OR email ILIKE $${paramIndex}`);
            params.push(`%${filters.searchQuery}%`);
            paramIndex++;
          }

          if (filters.role) {
            conditions.push(`role = $${paramIndex}`);
            params.push(filters.role);
            paramIndex++;
          }

          if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
          }
        }

        // Apply sorting
        if (filters?.sortBy) {
          query += ` ORDER BY ${filters.sortBy} ${filters.sortOrder || 'ASC'}`;
        } else {
          query += ' ORDER BY created_at DESC'; // Default sort
        }

        // Apply pagination
        if (filters?.limit) {
          query += ` LIMIT $${paramIndex}`;
          params.push(filters.limit);
          paramIndex++;

          if (filters.offset) {
            query += ` OFFSET $${paramIndex}`;
            params.push(filters.offset);
          }
        }

        const result = await client.query(query, params);
        return result.rows;
      } finally {
        client.release();
      }
    }, 300); // Cache for 5 minutes
  }

  async getUsersByRole(role: string): Promise<User[]> {
    const cacheKey = `users:by-role:${role}`;

    return this.withCache(cacheKey, async () => {
      const client = await this.pool.connect();
      try {
        const result = await client.query(
          'SELECT * FROM users WHERE role = $1 ORDER BY created_at DESC',
          [role]
        );
        return result.rows;
      } finally {
        client.release();
      }
    }, 300); // Cache for 5 minutes
  }

  async updateRole(userId: string, newRole: string): Promise<User> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'UPDATE users SET role = $1 WHERE user_id = $2 RETURNING *',
        [newRole, userId]
      );

      if (result.rows.length === 0) {
        throw new Error(`User with ID ${userId} not found`);
      }

      // Invalidate cache
      if (this.cache) {
        await this.cache.delete(`user:${userId}`);
        await this.cache.delete('users:all');
      }

      this.logger.info('User role updated', { userId, newRole });
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async getFavorites(userId: string): Promise<any[]> {
    const cacheKey = `favorites:user:${userId}`;

    return this.withCache(cacheKey, async () => {
      // In a real implementation, this would fetch from a favorites table
      // For now, returning empty array
      return [];
    }, 300); // Cache for 5 minutes
  }

  async addFavorite(userId: string, artworkId: string): Promise<any> {
    // In a real implementation, this would insert into a favorites table
    // For now, returning a success indicator
    return { success: true, userId, artworkId };
  }

  async removeFavorite(userId: string, artworkId: string): Promise<any> {
    // In a real implementation, this would delete from a favorites table
    // For now, returning a success indicator
    return { success: true, userId, artworkId };
  }

  async getHistory(userId: string): Promise<any[]> {
    const cacheKey = `history:user:${userId}`;

    return this.withCache(cacheKey, async () => {
      // In a real implementation, this would fetch from a user history table
      // For now, returning empty array
      return [];
    }, 300); // Cache for 5 minutes
  }

  async initialize(): Promise<void> {
    await super.initialize();
    this.logger.info('UserService initialized');
  }

  async dispose(): Promise<void> {
    this.logger.info('UserService disposed');
    await super.dispose();
  }
}