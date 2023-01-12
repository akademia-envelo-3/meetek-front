import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { Section } from '..';

const BASE_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class SectionService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Section[]>(`${BASE_URL}/sections`);
  }

  getOne(sectionId: number) {
    return this.http.get<Section>(`${BASE_URL}/sections/${sectionId}`);
  }

  add(section: Section) {
    return this.http.post<Section>(`${BASE_URL}/sections`, section);
  }

  update(section: Partial<Section>) {
    return this.http.patch<Section>(`${BASE_URL}/sections/${section.id}`, section);
  }

  activate(sectionId: number) {
    return this.http.patch<Section>(`${BASE_URL}/sections/${sectionId}`, {
      isActive: true,
    });
  }

  deactivate(sectionId: number) {
    return this.http.patch<Section>(`${BASE_URL}/sections/${sectionId}`, {
      isActive: false,
    });
  }

  join(sectionId: number, userId: number) {
    return this.http.post<Section>(`${BASE_URL}/sections/${sectionId}/users/${userId}`, null);
  }

  leave(sectionId: number, userId: number) {
    return this.http.delete<Section>(`${BASE_URL}/sections/${sectionId}/users/${userId}`);
  }
}
