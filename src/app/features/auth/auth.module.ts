import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

export const paths = {
  default: '',
};

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: paths.default,
        component: AuthComponent,
      },
    ]),
  ],
})
export default class AuthModule {}
