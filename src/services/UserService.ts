import { Pool } from 'pg';
import { IUser, IUserService } from '../types/user';
import { ILogger, ICacheable } from '../types/interfaces';

export class UserService implements IUserService {
  private pool: Pool;
  private logger: ILogger;
  private cache: ICacheable;

  constructor(pool: Pool, logger: ILogger, cache: ICacheable) {
    this.pool = pool;
    this.logger = logger;
    this.cache = cache;
  }

  async getUser(id: string): Promise<IUser | null> {
    return this.getUserById(id);
  }

  async getUserById(id: string): Promise<IUser | null> {
    const cached = await this.cache.get<IUser>(`user:${id}`);
    if (cached) return cached;

    try {
      const result = await this.pool.query('SELECT * FROM users WHERE id = $1 OR user_id = $1', [id]);
      if (result.rows.length === 0) return null;
      
      const user = result.rows[0];
      await this.cache.set(`user:${id}`, user, 3600);
      return user;
    } catch (error) {
      this.logger.error('Error fetching user', error as Error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const result = await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length === 0) return null;
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error fetching user by email', error as Error);
      throw error;
    }
  }

  async createUser(user: Partial<IUser>): Promise<IUser> {
    try {
      const result = await this.pool.query(
        'INSERT INTO users (email, username, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [user.email, user.username, user.password, user.role || 'user']
      );
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error creating user', error as Error);
      throw error;
    }
  }

  async updateUser(id: string, user: Partial<IUser>): Promise<IUser | null> {
    try {
      const result = await this.pool.query(
        'UPDATE users SET email = COALESCE($1, email), username = COALESCE($2, username), role = COALESCE($3, role), preferences = COALESCE($4, preferences) WHERE id = $5 OR user_id = $5 RETURNING *',
        [user.email, user.username, user.role, user.preferences ? JSON.stringify(user.preferences) : null, id]
      );
      if (result.rows.length === 0) return null;
      
      await this.cache.delete(`user:${id}`);
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error updating user', error as Error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await this.pool.query('DELETE FROM users WHERE id = $1 OR user_id = $1', [id]);
      await this.cache.delete(`user:${id}`);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      this.logger.error('Error deleting user', error as Error);
      throw error;
    }
  }

  async authenticate(email: string, password: string): Promise<IUser | null> {
    try {
      const result = await this.pool.query(
        'SELECT * FROM users WHERE email = $1 AND password = $2',
        [email, password]
      );
      if (result.rows.length === 0) return null;
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error authenticating user', error as Error);
      throw error;
    }
  }

  async getAll(): Promise<IUser[]> {
    try {
      const result = await this.pool.query('SELECT * FROM users ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      this.logger.error('Error fetching all users', error as Error);
      throw error;
    }
  }

  async getFavorites(userId: string): Promise<any[]> {
    try {
      const result = await this.pool.query(
        'SELECT a.* FROM artworks a INNER JOIN user_favorites uf ON a.id = uf.artwork_id WHERE uf.user_id = $1',
        [userId]
      );
      return result.rows;
    } catch (error) {
      this.logger.error('Error fetching user favorites', error as Error);
      throw error;
    }
  }

  async addFavorite(userId: string, artworkId: string): Promise<boolean> {
    try {
      await this.pool.query(
        'INSERT INTO user_favorites (user_id, artwork_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [userId, artworkId]
      );
      return true;
    } catch (error) {
      this.logger.error('Error adding favorite', error as Error);
      throw error;
    }
  }

  async removeFavorite(userId: string, artworkId: string): Promise<boolean> {
    try {
      const result = await this.pool.query(
        'DELETE FROM user_favorites WHERE user_id = $1 AND artwork_id = $2',
        [userId, artworkId]
      );
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      this.logger.error('Error removing favorite', error as Error);
      throw error;
    }
  }

  async getHistory(userId: string): Promise<any[]> {
    try {
      const result = await this.pool.query(
        'SELECT a.*, uh.viewed_at FROM artworks a INNER JOIN user_history uh ON a.id = uh.artwork_id WHERE uh.user_id = $1 ORDER BY uh.viewed_at DESC',
        [userId]
      );
      return result.rows;
    } catch (error) {
      this.logger.error('Error fetching user history', error as Error);
      throw error;
    }
  }

  async getUsersByRole(role: string): Promise<IUser[]> {
    try {
      const result = await this.pool.query('SELECT * FROM users WHERE role = $1', [role]);
      return result.rows;
    } catch (error) {
      this.logger.error('Error fetching users by role', error as Error);
      throw error;
    }
  }

  async updateRole(userId: string, role: string): Promise<IUser | null> {
    try {
      const result = await this.pool.query(
        'UPDATE users SET role = $1 WHERE id = $2 OR user_id = $2 RETURNING *',
        [role, userId]
      );
      if (result.rows.length === 0) return null;
      
      await this.cache.delete(`user:${userId}`);
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error updating user role', error as Error);
      throw error;
    }
  }
}
