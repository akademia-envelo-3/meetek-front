import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";

import { API_URL } from "@core/env.token";
import { ENDPOINTS } from "@shared/api/endpoints";
import { UserApiActions } from "./user.actions";
import { UserResponse } from "./user.interfaces";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private base_url = inject(API_URL);
  private cookieService = inject(CookieService);
  private store = inject(Store);

  getUser() {
    this.getMe().subscribe(response => {
      this.store.dispatch(UserApiActions.getUserSuccess({ user: response }));
    });
  }

  getMe() {
    return this.http.get<UserResponse>(`${this.base_url}${ENDPOINTS.LOGGED_USER}`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`,
      },
    });
  }
}