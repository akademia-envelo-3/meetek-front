import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';

import { environment } from 'src/environment';
import { AuthResponse, User } from './shared/auth.iterfaces';
import { AuthActions } from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private cookieService = inject(CookieService)
  private store = inject<Store<AuthResponse>>(Store)

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${environment.API_URL}/login`, { email, password });
  }

  getMe() {
    return this.http.get<User>(`${environment.API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`
      } 
    })
  }

  getUser() {
    this.getMe().subscribe((response) => {
      this.store.dispatch(AuthActions.getUserSuccess({ userData: response }))
    })
  }
}
