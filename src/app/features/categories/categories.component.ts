import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { InputDialogComponent, SearchComponent } from '@shared/ui';
import { CategoriesState, CategoriesStore, Category } from '.';
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

  handleModification(category: Category) {
    const config: MatDialogConfig = {
      data: {
        title: 'Edytuj kategorię',
        inputLabelText: 'Wpisz nazwę kategorii',
        buttonText: 'Zapisz',
        isAdmin: true,
        isEdit: true,
        editId: category.id,
        importedDialogData: category.name,
      },
    };
    this.openDialog(config);
  }

  openAddModal(state: CategoriesState) {
    const { isAdmin } = state;
    const config: MatDialogConfig = {
      data: {
        title: isAdmin ? 'Dodaj kategorię' : 'Nazwa kategorii',
        inputLabelText: 'Wpisz nazwę kategorii',
        buttonText: isAdmin ? 'Dodaj' : 'Wyślij prośbę',
        isAdmin,
      },
    };
    this.openDialog(config);
  }

  private openDialog(config: MatDialogConfig) {
    const dialogRef = this.dialog.open(InputDialogComponent, config);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (config.data.isAdmin && result) {
        // FT005 - feat: formularz dodawania nowych kategorii
        if (config.data.isEdit && config.data.editId) {
          this.categoriesStore.updateCategory({ name: result, id: config.data.editId });
        }
      }
      if (!config.data.isAdmin && result) {
        // brak taska: wysłanie prośby o dodanie kategorii
      }
    });
  }
}
