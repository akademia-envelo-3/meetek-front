import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects, AuthComponent } from '../auth';
import { AUTH_PATHS } from './auth-paths';

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
