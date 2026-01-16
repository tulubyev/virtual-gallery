// src/services/__tests__/UserService.test.ts

import { Pool, PoolClient } from 'pg';
import { UserService } from '../UserService';
import { User } from '../../types/user';
import { ILogger } from '../../types/interfaces';

// Mock the database pool
const mockPool = {
  connect: jest.fn(),
} as unknown as jest.Mocked<Pool>;

// Mock the logger
const mockLogger: ILogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockPool, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      // Arrange
      const mockUser: User = {
        user_id: '1',
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
      };

      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [mockUser] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await userService.getUserById('1');

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockClient.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE user_id = $1',
        ['1']
      );
      expect(mockClient.release).toHaveBeenCalled();
    });

    it('should return null when user not found', async () => {
      // Arrange
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await userService.getUserById('999');

      // Assert
      expect(result).toBeNull();
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('getUserByEmail', () => {
    it('should return user when found by email', async () => {
      // Arrange
      const mockUser: User = {
        user_id: '1',
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
      };

      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [mockUser] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await userService.getUserByEmail('test@example.com');

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockClient.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE email = $1',
        ['test@example.com']
      );
      expect(mockClient.release).toHaveBeenCalled();
    });

    it('should return null when user not found by email', async () => {
      // Arrange
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await userService.getUserByEmail('nonexistent@example.com');

      // Assert
      expect(result).toBeNull();
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // Arrange
      const newUser = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'hashed_password',
        role: 'user'
      };

      const createdUser: User = {
        user_id: '2',
        ...newUser,
      };

      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [createdUser] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await userService.createUser(newUser);

      // Assert
      expect(result).toEqual(createdUser);
      expect(mockClient.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO users'),
        expect.arrayContaining([
          newUser.username,
          newUser.email,
          newUser.password,
          newUser.role || 'user'
        ])
      );
      expect(mockLogger.info).toHaveBeenCalledWith('User created', { userId: '2', email: 'newuser@example.com' });
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      // Arrange
      const updateData = {
        username: 'updateduser',
        email: 'updated@example.com'
      };

      const updatedUser: User = {
        user_id: '1',
        username: 'updateduser',
        email: 'updated@example.com',
        role: 'user',
      };

      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [updatedUser] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await userService.updateUser('1', updateData);

      // Assert
      expect(result).toEqual(updatedUser);
      expect(mockClient.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE users SET'),
        expect.arrayContaining(['1']) // ID is passed as the last parameter
      );
      expect(mockLogger.info).toHaveBeenCalledWith('User updated', { userId: '1', email: 'updated@example.com' });
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      // Arrange
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [{ user_id: '1' }] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      await userService.deleteUser('1');

      // Assert
      expect(mockClient.query).toHaveBeenCalledWith(
        'DELETE FROM users WHERE user_id = $1 RETURNING user_id',
        ['1']
      );
      expect(mockLogger.info).toHaveBeenCalledWith('User deleted', { userId: '1' });
      expect(mockClient.release).toHaveBeenCalled();
    });

    it('should throw error when user to delete is not found', async () => {
      // Arrange
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act & Assert
      await expect(userService.deleteUser('999')).rejects.toThrow('User with ID 999 not found');
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('authenticate', () => {
    it('should return user if credentials are valid', async () => {
      // Arrange
      const mockUser: User = {
        user_id: '1',
        username: 'testuser',
        email: 'test@example.com',
        password_hash: 'valid_hash',
        role: 'user',
      };

      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [mockUser] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await userService.authenticate('test@example.com', 'valid_password');

      // For this test, we're simulating that the password matches
      // In a real implementation, we'd compare the hash
      expect(result).toEqual(mockUser);
    });

    it('should return null if credentials are invalid', async () => {
      // Arrange
      const mockClient = {
        query: jest.fn().mockResolvedValue({ rows: [] }),
        release: jest.fn(),
      };

      (mockPool.connect as jest.Mock).mockResolvedValue(mockClient as any);

      // Act
      const result = await userService.authenticate('invalid@example.com', 'wrong_password');

      // Assert
      expect(result).toBeNull();
    });
  });
});