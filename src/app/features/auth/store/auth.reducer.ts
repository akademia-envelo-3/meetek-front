import { createReducer, on } from '@ngrx/store';

import { AuthResponse } from '../shared/auth.iterfaces';
import { AuthActions } from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { loginResponse }): AuthResponse => ({
    ...state,
    user: loginResponse.user
  })),
  on(AuthActions.getUserSuccess, (state, { userData }): AuthResponse => ({
    ...state,
    user: userData
  }))
)
