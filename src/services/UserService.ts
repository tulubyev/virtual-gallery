// services/UserService.ts
import DatabaseService from './DatabaseService';
import { User, CreateUserInput, UpdateUserInput } from '../models';

class UserService {
  async getAllUsers(): Promise<User[]> {
    const result = await DatabaseService.query(
      'SELECT user_id, username, email, role, created_at FROM users ORDER BY user_id'
    );
    return result.rows;
  }

  async getUserById(id: number): Promise<User | undefined> {
    const result = await DatabaseService.query(
      'SELECT user_id, username, email, role, preferences FROM users WHERE user_id = $1',
      [id]
    );
    return result.rows[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await DatabaseService.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  async createUser(userData: CreateUserInput): Promise<User> {
    const { username, email, password, role = 'user' } = userData;

    const result = await DatabaseService.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email, role',
      [username, email, password, role]
    );
    return result.rows[0];
  }

  async updateUser(id: number, updateData: UpdateUserInput): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let query = 'UPDATE users SET ';

    let paramCount = 1;
    for (const [key, value] of Object.entries(updateData)) {
      fields.push(`${key} = $${paramCount}`);
      values.push(key === 'preferences' ? JSON.stringify(value) : value);
      paramCount++;
    }

    query += fields.join(', ') + ` WHERE user_id = $${paramCount} RETURNING user_id, username, email, role, preferences`;
    values.push(id);

    const result = await DatabaseService.query(query, values);
    return result.rows[0] || null;
  }

  async getUsersByRole(role: string): Promise<User[]> {
    const result = await DatabaseService.query(
      'SELECT user_id, username, email, role, created_at FROM users WHERE role = $1',
      [role]
    );
    return result.rows;
  }
}

export default new UserService();