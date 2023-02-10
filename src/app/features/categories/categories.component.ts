import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from '@shared/ui';

import { CategoriesStore } from '.';
import { CategoriesCardComponent } from './shared/categories-card/categories-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoriesCardComponent,
    SearchComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss'],
  providers: [CategoriesStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  private categoriesStore = inject(CategoriesStore);

  categories$ = this.categoriesStore.categories$;
  isUserAdmin$ = this.categoriesStore.isAdmin$;

  handleActivate({ active, id }: { active: boolean, id: number }) {
    // brak taska?
    console.log('handleActivate', active, id);
  }

  handleModification(id: number) {
    // FT010 - feat: dodanie edycji kategorii + effect
    console.log('handleModification', id);
  }
}
