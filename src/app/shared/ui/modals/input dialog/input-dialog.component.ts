import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../example dialog/example-dialog.component';
import { FormsModule } from '@angular/forms';

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
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  closeDialog() {
    this.dialog.closeAll();
  }
}
