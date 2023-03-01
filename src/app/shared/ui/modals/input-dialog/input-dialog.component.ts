import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogData } from '../index';
import { whitespaceValidator } from '../validators/modal.validator';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDialogComponent {
  private dialog = inject(MatDialogRef);
  private formBuilder = inject(NonNullableFormBuilder);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  textForm = this.createTextForm();

  // wyświetlanie błędów w formularzu task FT056 https://github.com/akademia-envelo-3/meetek-front/issues/89

  closeDialog() {
    this.dialog.close();
  }

  submit() {
    this.textForm.markAllAsTouched();

    if (this.textForm.invalid) {
      return;
    }

    this.dialog.close(this.textForm.getRawValue().text);
  }

  private createTextForm() {
    return this.formBuilder.group({
      text: this.formBuilder.control(this.data.importedDialogData, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        whitespaceValidator,
      ]),
    });
  }
}
