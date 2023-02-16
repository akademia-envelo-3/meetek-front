import { inject, Injectable } from '@angular/core';
import { selectLoggedUser } from '@core/store/user.selectors';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ToastFacadeService } from '@shared/services';

import { map, Observable, switchMap } from 'rxjs';
import { CategoriesService, Category, updateCategory } from '../';

export interface CategoriesState {
  categories: Category[];
  isAdmin: boolean;
}

@Injectable()
export class CategoriesStore extends ComponentStore<CategoriesState> {
  private categoriesService = inject(CategoriesService);
  private store = inject(Store);
  private toastService = inject(ToastFacadeService);

  constructor() {
    super({
      categories: [],
      isAdmin: false,
    });
  }

  loggedUser$ = this.store.select(selectLoggedUser);

  readonly categories$ = this.select(state => state.categories);
  readonly isAdmin$ = this.select(state => state.isAdmin);

  readonly getAllCategories = this.effect(() => {
    return this.categoriesService.getAllCategories().pipe(map(categories => this.patchState({ categories })));
  });

  readonly getIsAdmin = this.effect(() => {
    return this.loggedUser$.pipe(map(user => this.patchState({ isAdmin: user?.role === 'admin' })));
  });

  readonly updateCategory = this.effect((category$: Observable<updateCategory>) => {
    return category$.pipe(
      switchMap(({ id, name }) => this.categoriesService.updateCategory(id, name)),
      tapResponse(
        res => {
          const categories = this.get().categories.map(category => {
            if (category.id === res.id) {
              return res;
            }
            return category;
          });
          this.patchState({ categories });
          this.toastService.showSuccess('Zaktualizowano kategorię', 'Sukces');
        },
        () => this.toastService.showError('Nie udało się zaktualizować kategorii', 'Błąd')
      )
    );
  });
}
