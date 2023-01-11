import { AuthResponse } from "../shared/auth.iterfaces";

export const authFeatureKey = 'user';

export const initialAuthState: AuthResponse = {
    user: {
      id: NaN,
      firstName: '',
      lastName: '',
      email: '',
    },
    accessToken: ''
}
