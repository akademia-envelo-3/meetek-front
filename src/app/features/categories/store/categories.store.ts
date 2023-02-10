import { inject, Injectable } from '@angular/core';
import { selectLoggedUser } from '@core/store/user.selectors';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

import { map } from 'rxjs';
import { CategoriesService, Category } from '../';

export interface CategoriesState {
  categories: Category[]
  isAdmin: boolean
}

@Injectable()
export class CategoriesStore extends ComponentStore<CategoriesState> {
  private categoriesService = inject(CategoriesService);
  private store = inject(Store)

  constructor() {
    super({
      categories: [],
      isAdmin: false
    });
  }

  loggedUser$ = this.store.select(selectLoggedUser)

  readonly categories$ = this.select(state => state.categories);
  readonly isAdmin$ = this.select(state => state.isAdmin)

  readonly getAllCategories = this.effect(() => {
    return this.categoriesService.getAllCategories().pipe(
      map(categories => this.patchState({ categories }))
    );
  })

  readonly getIsAdmin = this.effect(() => {
    return this.loggedUser$.pipe(
      map(user => this.patchState({ isAdmin: user?.role === 'admin' }))
    )
  })
}
