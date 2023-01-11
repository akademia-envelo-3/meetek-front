import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { AuthResponse, LoginForm } from '../shared/auth.iterfaces';
import { AuthActions } from '../store/auth.actions';
import { noWhitespaceValidator } from './auth.validators';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgOptimizedImage,
    FormComponent
  ],
  template: `
    <div class="form">
          <h2>Zaloguj się</h2>
          <form [formGroup]="loginForm" (ngSubmit)="login()">
            <div class="email-container">
              <mat-form-field appearance="outline">
                <mat-label>E-mail</mat-label>
                <input matInput placeholder="E-mail" formControlName="email" required />
                <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Pole wymagane</mat-error>
                <mat-error *ngIf="loginForm.get('email')?.hasError('whitespace') && loginForm.value.email">
                  Użyto niedozwolonych znaków</mat-error
                >
              </mat-form-field>
            </div>
            <div class="password-container">
              <mat-form-field appearance="outline">
                <mat-label>Hasło</mat-label>
                <input
                  matInput
                  placeholder="Hasło"
                  [type]="visible === true ? 'text' : 'password'"
                  formControlName="password"
                  required />
                <button
                  matSuffix
                  mat-icon-button
                  type="button"
                  (click)="togglePasswordVisibility()"
                  color="primary"
                  [disabled]="!this.loginForm.value.password">
                  <mat-icon>remove_red_eye</mat-icon>
                </button>
                <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Pole wymagane</mat-error>
                <mat-error *ngIf="loginForm.get('password')?.hasError('whitespace') && loginForm.value.password">
                  Użyto niedozwolonych znaków</mat-error
                >
              </mat-form-field>
            </div>
            <button mat-raised-button color="primary" [disabled]="loginForm.invalid">Zaloguj się</button>
          </form>
        </div>
  `,
  styles: [
    `
      .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      h2 {
        padding: 0 24px 24px;
      }

      form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 12px;
      }

      mat-form-field {
        width: 100%;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private store = inject<Store<AuthResponse>>(Store)

  visible = false;
  loginForm = this.createLoginForm();

  private createLoginForm() {
    const form = this.formBuilder.group({
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
        noWhitespaceValidator,
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
      password: this.formBuilder.control('', [Validators.required, noWhitespaceValidator]),
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

    this.store.dispatch(AuthActions.login({ loginData: this.loginForm.value as LoginForm }));
  }
}
