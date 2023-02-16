import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '@core/env.token';
import { Category } from '..';


@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private http = inject(HttpClient);
  private BASE_URL = inject(API_URL);

  getAllCategories() {
    return this.http.get<Category[]>(`${this.BASE_URL}/categories`);
  }

  activateCategory(id: number, active: boolean) {
    return this.http.patch<Category>(`${this.BASE_URL}/categories/${id}`, { active });
  }
}
