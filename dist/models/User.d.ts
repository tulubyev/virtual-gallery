export interface User {
    user_id: number;
    username: string;
    email: string;
    password_hash: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    preferences?: Record<string, any>;
}
export interface CreateUserInput {
    username: string;
    email: string;
    password: string;
    role?: string;
}
export interface UpdateUserInput {
    username?: string;
    email?: string;
    preferences?: Record<string, any>;
    role?: string;
}
//# sourceMappingURL=User.d.ts.map