export interface UserState {
  user: UserResponse;
}

export type UserRole = 'user' | 'admin';

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}
