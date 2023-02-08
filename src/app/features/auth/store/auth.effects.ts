import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { HOME_PATHS } from '../../home';
import { AuthActions, AuthApiActions, AuthService } from '../../auth';
import { UserApiActions } from '@core/store/user.actions';
import { ToastFacadeService } from '@shared/services';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private cookieService = inject(CookieService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastFacadeService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ loginData }) => {
        const { email, password } = loginData;
        return this.authService.login(email, password).pipe(
          tap(({ accessToken }) => {
            this.cookieService.set('token', accessToken, 1, '/');
          }),
          map(({ user }) => {
            this.router.navigate([HOME_PATHS.DEFAULT]);
            return UserApiActions.getUserSuccess({ user });
          }),
          catchError(() => {
            this.toastService.showError('Niepoprawny login lub hasło', 'Błąd');
            return of(AuthApiActions.loginFailure());
          })
        );
      })
    );
  });
}
