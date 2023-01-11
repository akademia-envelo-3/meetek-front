import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    FormComponent,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
      },
    ]),
  ],
})
export default class AuthModule {}
