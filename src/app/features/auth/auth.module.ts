import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

export const AUTH_PATHS = {
  DEFAULT: '',
} as const;

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: AUTH_PATHS.DEFAULT,
        component: AuthComponent,
      },
    ]),
  ],
})
export default class AuthModule {}
