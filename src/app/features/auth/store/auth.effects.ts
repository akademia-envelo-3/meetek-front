import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, map, of, startWith, switchMap, tap } from 'rxjs';

import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';

export class AuthEffects {
  private actions$ = inject(Actions);
  private cookieService = inject(CookieService);
  private toast = inject(ToastrService);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ loginData }) => {
        const { email, password } = loginData;
        return this.authService.login(email, password).pipe(
          tap(response => {
            const { accessToken } = response;
            this.cookieService.set('token', accessToken, 1);
          }),
          map(response => {
            const { user, accessToken } = response;
            this.router.navigate(['/']);
            return AuthActions.loginSuccess({ loginResponse: { user, accessToken } });
          }),
          catchError(() => {
            this.toast.error('Niepoprawny login lub hasło');
            return of();
          })
        );
      })
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.getUser),
      startWith(AuthActions.getUser),
      filter(() => this.cookieService.check('token')),
      switchMap(() => {
        return this.authService.getMe().pipe(map(response => AuthActions.getUserSuccess({ userData: response })));
      }),
      catchError(() => {
        this.router.navigate(['/auth']);
        this.toast.error('Sesja logowania wygasła');
        this.cookieService.delete('token');
        return of();
      })
    );
  });
}
