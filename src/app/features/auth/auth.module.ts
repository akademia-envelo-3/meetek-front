import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

export const authPaths = {
  default: '',
};

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: authPaths.default,
        component: AuthComponent,
      },
    ]),
  ],
})
export default class AuthModule {}
