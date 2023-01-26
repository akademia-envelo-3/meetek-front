export interface UserState {
  user: UserResponse;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}