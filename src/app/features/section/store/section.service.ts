import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section } from '..';
import { environment } from 'src/environment';

const BASE_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class SectionService {
  constructor(private http: HttpClient) {}

  getAll() {
    console.log('i have got');
    return this.http.get<Section[]>(BASE_URL + '/sections');
  }

  add(section: Section) {
    console.log('posted');
    return this.http.post<Section>(BASE_URL + '/sections', section);
  }

  update(section: Section) {
    console.log('updated');
    return this.http.put<Section>(BASE_URL + `/sections/${section.id}`, section);
  }

  activate(id: number) {
    return this.http.put<Section>(BASE_URL + `/sections/${id}`, {
      isActive: true,
    });
  }

  deactivate(id: number) {
    return this.http.put<Section>(BASE_URL + `/sections/${id}`, {
      isActive: false,
    });
  }

  join(id: number, userId: number) {
    return this.http.post<Section>(BASE_URL + `/sections/${id}/users/${userId}`, null);
  }

  leave(id: number, userId: number) {
    return this.http.delete<Section>(BASE_URL + `/sections/${id}/users/${userId}`);
  }

  getUsers(id: number) {
    return this.http.get<Section>(BASE_URL + `/sections/${id}/users`);
  }
}
