import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { getValidatorErrorMessage } from './validation-handler';

@Component({
  selector: 'app-error-message[control]',
  standalone: true,
  imports: [MatFormFieldModule, NgIf],
  template: ` <mat-error *ngIf="errorMessage">{{ errorMessage }}</mat-error> `,
  styles: [
    `
      ::ng-deep .mat-mdc-form-field-subscript-wrapper {
        display: none !important;
      }

      mat-error {
        margin: 10px 0;
      }
    `,
  ],
})
export class ErrorMessageComponent {
  @Input() control!: AbstractControl;

  get errorMessage() {
    for (const validatorName in this.control?.errors) {
      if (this.control.touched) {
        return getValidatorErrorMessage(validatorName, this.control.errors[validatorName]);
      }
    }
    return null;
  }
}
