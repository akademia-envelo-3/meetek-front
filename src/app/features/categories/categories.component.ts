import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InputDialogComponent, SearchComponent } from '@shared/ui';
import { take } from 'rxjs';

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
  ],
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss'],
  providers: [CategoriesStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  private categoriesStore = inject(CategoriesStore);
  private dialog = inject(MatDialog);

  categories$ = this.categoriesStore.categories$;
  isUserAdmin$ = this.categoriesStore.isAdmin$;

  handleActivate({ active, id }: { active: boolean; id: number }) {
    // brak taska?
    console.log('handleActivate', active, id);
  }

  handleModification(id: number) {
    // FT010 - feat: dodanie edycji kategorii + effect
    console.log('handleModification', id);
  }

  openAddModal() {
    this.isUserAdmin$.pipe(take(1)).subscribe(isAdmin => {
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
      this.isUserAdmin$.pipe(take(1)).subscribe(isAdmin => {
        if (isAdmin && result) {
          // FT005 - feat: formularz dodawania nowych kategorii
          console.log('add category', result);
        }
        if (!isAdmin && result) {
          // brak taska: wysłanie prośby o dodanie kategorii
          console.log('send request', result);
        }
      });
    });
  }
}
