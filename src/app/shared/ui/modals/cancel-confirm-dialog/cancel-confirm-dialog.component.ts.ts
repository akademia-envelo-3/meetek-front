import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cancel-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './cancel-confirm-dialog.component.html',
  styleUrls: ['./cancel-confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelConfirmDialogComponent {
  private dialog = inject(MatDialog);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { text: string }) {}
  closeDialog() {
    this.dialog.closeAll();
  }
}
