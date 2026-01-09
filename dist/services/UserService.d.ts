import { User, CreateUserInput, UpdateUserInput } from '../models';
declare class UserService {
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    createUser(userData: CreateUserInput): Promise<User>;
    updateUser(id: number, updateData: UpdateUserInput): Promise<User | null>;
    getUsersByRole(role: string): Promise<User[]>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=UserService.d.ts.map