// src/services/UserService.ts
import { BaseService } from './BaseService';

export interface User {
  user_id?: string;
  username: string;
  email: string;
  password_hash?: string;
  role?: string;
  preferences?: any;
  created_at?: Date;
}

export class UserService extends BaseService<User> {
  async getAll(): Promise<User[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM users ORDER BY created_at DESC');
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getById(id: string): Promise<User | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  async create(userData: Partial<User>): Promise<User> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        [userData.username, userData.email, userData.password_hash]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    const client = await this.pool.connect();
    try {
      // Формируем динамический SQL запрос в зависимости от того, какие поля нужно обновить
      const updateFields = [];
      const values = [];
      let paramIndex = 2; // Начинаем с 2, потому что 1 - это id

      if (updateData.username) {
        updateFields.push(`username = $${paramIndex}`);
        values.push(updateData.username);
        paramIndex++;
      }

      if (updateData.email) {
        updateFields.push(`email = $${paramIndex}`);
        values.push(updateData.email);
        paramIndex++;
      }

      if (updateData.password_hash) {
        updateFields.push(`password_hash = $${paramIndex}`);
        values.push(updateData.password_hash);
        paramIndex++;
      }

      if (updateData.role) {
        updateFields.push(`role = $${paramIndex}`);
        values.push(updateData.role);
        paramIndex++;
      }

      if (updateData.preferences) {
        updateFields.push(`preferences = $${paramIndex}`);
        values.push(updateData.preferences);
        paramIndex++;
      }

      // Добавляем id в конец значений
      values.push(id);

      if (updateFields.length === 0) {
        // Если нет полей для обновления, просто возвращаем пользователя
        return await this.getById(id);
      }

      const query = `UPDATE users SET ${updateFields.join(', ')} WHERE user_id = $${paramIndex} RETURNING *`;
      const result = await client.query(query, values);

      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  async delete(id: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('DELETE FROM users WHERE user_id = $1 RETURNING user_id', [id]);
      return result.rows.length > 0;
    } finally {
      client.release();
    }
  }

  async getUsersByRole(role: string): Promise<User[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE role = $1 ORDER BY created_at DESC', [role]);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async updateRole(userId: string, newRole: string): Promise<User | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'UPDATE users SET role = $1 WHERE user_id = $2 RETURNING *',
        [newRole, userId]
      );
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  async getStats(): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(`
        SELECT
          COUNT(*) as total_users,
          COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_count,
          COUNT(CASE WHEN role = 'curator' THEN 1 END) as curator_count,
          COUNT(CASE WHEN role = 'staff' THEN 1 END) as staff_count,
          COUNT(CASE WHEN role = 'tour_guide' THEN 1 END) as tour_guide_count,
          COUNT(CASE WHEN role = 'auction_participant' THEN 1 END) as auction_participant_count
        FROM users
      `);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async getFavorites(userId: string): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      // В реальной реализации это будет извлекать избранные произведения пользователя
      // For now, returning empty array
      return [];
    } finally {
      client.release();
    }
  }

  async addFavorite(userId: string, artworkId: string): Promise<{ message: string; userId: string; artworkId: string }> {
    const client = await this.pool.connect();
    try {
      // В реальной реализации это будет добавлять произведение в избранное пользователя
      // For now, returning success
      return { message: 'Added to favorites', userId, artworkId };
    } finally {
      client.release();
    }
  }

  async removeFavorite(userId: string, artworkId: string): Promise<{ message: string; userId: string; artworkId: string }> {
    const client = await this.pool.connect();
    try {
      // В реальной реализации это будет удалять произведение из избранного пользователя
      // For now, returning success
      return { message: 'Removed from favorites', userId, artworkId };
    } finally {
      client.release();
    }
  }

  async getHistory(userId: string): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      // В реальной реализации это будет извлекать историю взаимодействий пользователя
      // For now, returning empty array
      return [];
    } finally {
      client.release();
    }
  }
}