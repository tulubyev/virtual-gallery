export interface IUser {
  id: string;
  user_id: string;
  email: string;
  username: string;
  password?: string;
  role?: string;
  preferences?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  role?: string;
}

export interface UpdateUserDto {
  email?: string;
  username?: string;
  password?: string;
  role?: string;
  preferences?: Record<string, any>;
}

export interface IUserService {
  getUser(id: string): Promise<IUser | null>;
  getUserById(id: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  createUser(user: Partial<IUser>): Promise<IUser>;
  updateUser(id: string, user: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;
  authenticate(email: string, password: string): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
  getFavorites(userId: string): Promise<any[]>;
  addFavorite(userId: string, artworkId: string): Promise<boolean>;
  removeFavorite(userId: string, artworkId: string): Promise<boolean>;
  getHistory(userId: string): Promise<any[]>;
  getUsersByRole(role: string): Promise<IUser[]>;
  updateRole(userId: string, role: string): Promise<IUser | null>;
}

export type User = IUser;
