import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { InputDialogComponent, SearchComponent } from '@shared/ui';
import { CategoriesState, CategoriesStore } from '.';
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
    NgIf,
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

  openAddModal(state: CategoriesState) {
    const { isAdmin } = state;
    if (isAdmin) {
      this.openDialog('Dodaj kategorię', 'Wpisz nazwę kategorii', 'Dodaj', isAdmin);
    } else {
      this.openDialog('Nazwa kategorii', 'Wpisz nazwę kategorii', 'wyślij prośbę', isAdmin);
    }
  }

  private openDialog(
    title: string,
    inputLabelText: string,
    buttonText: string,
    isAdmin: boolean,
    importedDialogData?: string
  ) {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      data: {
        title,
        inputLabelText,
        importedDialogData,
        buttonText,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (isAdmin && result) {
        this.categoriesStore.addCategory(result);
      }
      if (!isAdmin && result) {
        // brak taska: wysłanie prośby o dodanie kategorii
      }
    });
  }
}
