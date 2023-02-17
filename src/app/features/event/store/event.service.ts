import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { API_URL } from '@core/env.token';
import { Event } from '@shared/interfaces';

@Injectable({ providedIn: 'root' })
export class EventService {
  private http = inject(HttpClient);
  private BASE_URL = inject(API_URL);

  getAll() {
    return this.http.get<Event[]>(`${this.BASE_URL}/events`);
  }

  getOne(eventId: number) {
    return this.http.get<Event>(`${this.BASE_URL}/events/${eventId}`);
  }
}
