import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section } from '..';
import { environment } from 'src/environment';

const BASE_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class SectionService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Section[]>(BASE_URL + '/sections');
  }

  add(payload: Section) {
    return this.http.post<Section>(BASE_URL + '/sections', payload);
  }

  update(payload: Section) {
    return this.http.put<Section>(BASE_URL + '/sections', payload);
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
    return this.http.put<Section>(BASE_URL + `/sections/join/${id}/${userId}`, null);
  }

  leave(id: number, userId: number) {
    return this.http.put<Section>(BASE_URL + `/sections/${id}/${userId}`, null);
  }

  getUsers(id: number) {
    return this.http.get<Section>(BASE_URL + `/sections/${id}/users`);
  }
}
