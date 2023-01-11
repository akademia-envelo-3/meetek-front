import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { FormComponent } from './form/form.component';

export const AUTH_PATHS = {
  DEFAULT: '',
} as const;

@NgModule({
  imports: [
    FormComponent,
    RouterModule.forChild([
      {
        path: AUTH_PATHS.DEFAULT,
        component: AuthComponent,
      },
    ]),
  ],
})
export default class AuthModule {}
