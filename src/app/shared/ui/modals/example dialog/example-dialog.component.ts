// Komponent stworzony na potrzeby wyśietlenia dialogów oraz przekazania do nich danych, w wersji produkcyjnej do usuniecia
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { InputDialogComponent } from '../input dialog/input-dialog.component';
import { CancelConfirmDialogComponent } from '../cancel-confirm dialog/quit-section-dialog.component';

export interface DialogData {
  title: string;
  buttonText: string;
  inputLabelText: string;
  importedDialogData: string;
}

@Component({
  selector: 'app-example-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CancelConfirmDialogComponent],
  templateUrl: './example-dialog.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleDialogComponent {
  constructor(public dialog: MatDialog) {}

  importedDialogData!: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      data: {
        title: 'Przykładowy tytuł modala',
        buttonText: 'Wyślij prośbę',
        inputLabelText: 'Example label',
        importedDialogData: this.importedDialogData,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.importedDialogData = result;
    });
  }

  openDialog2() {
    this.dialog.open(CancelConfirmDialogComponent, {
      data: { text: 'Przykładowy tekst przekazany z add-category-component' },
    });
  }
}
