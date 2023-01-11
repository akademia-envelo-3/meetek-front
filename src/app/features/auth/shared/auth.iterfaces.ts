export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  id: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserState {
  user: AuthResponse
}

export interface LoginForm {
  email: string;
  password: string;
}
