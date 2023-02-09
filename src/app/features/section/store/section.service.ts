import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '@core/env.token';
import { Section } from '@shared/interfaces';

@Injectable({ providedIn: 'root' })
export class SectionService {
  private http = inject(HttpClient);
  private BASE_URL = inject(API_URL);

  getAll() {
    return this.http.get<Section[]>(`${this.BASE_URL}/sections`);
  }

  getOne(sectionId: number) {
    return this.http.get<Section>(`${this.BASE_URL}/sections/${sectionId}`);
  }

  add(section: Section) {
    return this.http.post<Section>(`${this.BASE_URL}/sections`, section);
  }

  update(section: Partial<Section>) {
    return this.http.patch<Section>(`${this.BASE_URL}/sections/${section.id}`, section);
  }

  activate(sectionId: number) {
    return this.http.patch<Section>(`${this.BASE_URL}/sections/${sectionId}`, {
      isActive: true,
    });
  }

  deactivate(sectionId: number) {
    return this.http.patch<Section>(`${this.BASE_URL}/sections/${sectionId}`, {
      isActive: false,
    });
  }

  //FT025 - https://github.com/akademia-envelo-3/meetek-front/issues/35
  join(sectionId: number, userId: number) {
    return this.http.post<Section>(`${this.BASE_URL}/sections/${sectionId}/users/${userId}`, {});
  }

  leave(sectionId: number, userId: number) {
    return this.http.delete<Section>(`${this.BASE_URL}/sections/${sectionId}/users/${userId}`);
  }
}
