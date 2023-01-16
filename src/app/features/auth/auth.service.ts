import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { API_URL } from '@core/env.token';
import { AuthResponse } from './shared/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private base_url = inject(API_URL);

  login(email: string, password: string) {
    // task FT023 - https://github.com/akademia-envelo-3/meetek-front/issues/32
    return this.http.post<AuthResponse>(`${this.base_url}/login`, { email, password });
  }
}
