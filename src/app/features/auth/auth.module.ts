import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { AuthComponent } from './auth.component';
import { AuthEffects } from './store/auth.effects';

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
