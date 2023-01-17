import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { LoginData } from '../../auth';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'login': props<{ loginData: LoginData }>(),
  },
});

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    ['login failure']: emptyProps(),
  },
});
