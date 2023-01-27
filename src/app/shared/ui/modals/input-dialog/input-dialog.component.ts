import { ChangeDetectionStrategy, Component, inject, Inject, Injectable } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { DialogData } from '../index';
import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';

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
  ],
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDialogComponent {
  private dialog = inject(MatDialog);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  closeDialog() {
    this.dialog.closeAll();
  }
}
