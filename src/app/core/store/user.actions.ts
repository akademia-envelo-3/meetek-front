import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { UserResponse } from './user.interfaces';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'get user': props<{ user: UserResponse }>(),
  },
});

export const UserApiActions = createActionGroup({
  source: 'User API',
  events: {
    ['get user success']: props<{ user: UserResponse }>(),
    ['get user failure']: emptyProps(),
  },
});
