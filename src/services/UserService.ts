// src/services/UserService.ts
import { Pool } from 'pg';
import { BaseService } from './BaseService';
import {
  IUserService,
  User,
  CreateUserDto,
  UpdateUserDto
} from '../types/artwork';
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

  async deleteUser(id: string): Promise<void> {
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

  async initialize(): Promise<void> {
    await super.initialize();
    this.logger.info('UserService initialized');
  }

  async dispose(): Promise<void> {
    this.logger.info('UserService disposed');
    await super.dispose();
  }
}