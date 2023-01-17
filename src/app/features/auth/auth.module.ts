import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects, AuthComponent } from '../auth';

export const AUTH_PATHS = {
  DEFAULT: '',
} as const;

@NgModule({
  imports: [
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild([
      {
        path: AUTH_PATHS.DEFAULT,
        component: AuthComponent,
      },
    ]),
  ],
})
export default class AuthModule {}
