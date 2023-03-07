import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';

import { AuthResponse, AuthActions } from '../../auth';
import { emailValidator, whitespaceValidator } from '@shared/validators';
import { ErrorMessageComponent } from '@shared/validators';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private store = inject<Store<AuthResponse>>(Store);

  visible = false;
  loginForm = this.createLoginForm();

  private createLoginForm() {
    const form = this.formBuilder.group({
      email: this.formBuilder.control('', [
        Validators.required,
        emailValidator,
        whitespaceValidator,
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        whitespaceValidator,
      ]),
    });

    return form;
  }

  togglePasswordVisibility() {
    this.visible = !this.visible;
  }

  login() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(AuthActions.login({ loginData: this.loginForm.getRawValue() }));
  }
}
