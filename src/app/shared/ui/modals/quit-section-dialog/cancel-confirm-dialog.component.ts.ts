import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quit-section-dialog[text]',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './cancel-confirm-dialog.component.html',
  styleUrls: ['./cancel-confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelConfirmDialogComponent {
  constructor( public dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data: { text: string }) {}
  closeDialog() {
    this.dialog.closeAll()
  }
}
