import { createActionGroup, props } from '@ngrx/store';

import { AuthResponse, LoginData, User } from '../shared/auth.iterfaces';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ loginData: LoginData }>(),
    'login success': props<{ loginResponse: AuthResponse }>(),
    'get user': props<{ user: AuthResponse }>(),
    'get user success': props<{ userData: User }>()
  },
});
