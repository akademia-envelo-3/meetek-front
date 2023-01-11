import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-auth',
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
    <main>
      <div class="dark-mode-toggle">
        <mat-slide-toggle></mat-slide-toggle>
      </div>
      <div class="form-wrapper">
        <div class="logo">
          <img ngSrc="assets/images/logo.svg" alt="logo" width="300" height="150" priority />
        </div>
        <app-form></app-form>
      </div>
    </main>
  `,
  styles: [
    `
      main {
        background-color: #fafafa;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .dark-mode-toggle {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .form-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        background-color: #fff;
        width: 450px;
        height: 550px;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
      }

      .input {
        width: 300px;
        height: 50px;
      }

      @media screen and (max-width: 568px) {
        .form-wrapper {
          width: 100vw;
          height: 100vh;
        }
      }

      @media screen and (max-width: 1024px) {
        .form-wrapper {
          width: 100vw;
          height: 100vh;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
