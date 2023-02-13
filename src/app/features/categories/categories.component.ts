import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { take } from 'rxjs';

import { InputDialogComponent, SearchComponent } from '@shared/ui';
import { CategoriesStore } from '.';
import { CategoriesCardComponent } from './shared/categories-card/categories-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoriesCardComponent,
    SearchComponent,
    MatButtonModule,
    MatIconModule,
    InputDialogComponent,
    MatDialogModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss'],
  providers: [CategoriesStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  private categoriesStore = inject(CategoriesStore);
  private dialog = inject(MatDialog);

  state$ = this.categoriesStore.state$;

  handleActivate({ active, id }: { active: boolean; id: number }) {
    // brak taska?
  }

  handleModification(id: number) {
    // FT010 - feat: dodanie edycji kategorii + effect
  }

  openAddModal() {
    this.state$.pipe(take(1)).subscribe(({ isAdmin }) => {
      if (isAdmin) {
        this.openDialog('Dodaj kategorię', 'Wpisz nazwę kategorii', 'Dodaj');
      } else {
        this.openDialog('Nazwa kategorii', 'Wpisz nazwę kategorii', 'wyślij prośbę');
      }
    });
  }

  private openDialog(title: string, inputLabelText: string, buttonText: string, importedDialogData?: string) {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      data: {
        title,
        inputLabelText,
        importedDialogData,
        buttonText,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.state$.pipe(take(1)).subscribe(({ isAdmin }) => {
        if (isAdmin && result) {
          // FT005 - feat: formularz dodawania nowych kategorii
        }
        if (!isAdmin && result) {
          // brak taska: wysłanie prośby o dodanie kategorii
        }
      });
    });
  }
}
