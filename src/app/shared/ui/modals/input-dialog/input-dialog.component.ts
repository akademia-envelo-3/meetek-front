import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogData } from '../index';

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
    NgIf,
  ],
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDialogComponent {
  text = new FormControl('', [Validators.maxLength(50)]);
  private dialog = inject(MatDialog);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  closeDialog() {
    this.dialog.closeAll();
  }
}
