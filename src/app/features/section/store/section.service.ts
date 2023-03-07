import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@core/env.token';

import { Section, User } from '@shared/interfaces';
import { CreateSection } from '@shared/interfaces/section-form.interface';

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

  add(section: CreateSection, isActive: boolean) {
    return this.http.post<Section>(`${this.BASE_URL}/sections`, {
      ...section,
      isActive,
    });
  }

  update(sectionId: number, section: Partial<Section>) {
    return this.http.patch<Section>(`${this.BASE_URL}/sections/${sectionId}`, section);
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

  joinSection(sectionId: number, userId: number) {
    return this.http.post<Section>(`${this.BASE_URL}/sections/${sectionId}/users/${userId}`, {});
  }

  leaveSection(sectionId: number, userId: number) {
    return this.http.delete<Section>(`${this.BASE_URL}/sections/${sectionId}/users/${userId}`);
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }
}
