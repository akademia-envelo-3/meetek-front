import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { HOME_PATHS } from '../../home';
import { AuthActions, AuthApiActions, AuthService } from '../../auth';
import { UserApiActions } from '@core/store/user.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private cookieService = inject(CookieService);
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
            const { user } = response;
            this.router.navigate([HOME_PATHS.DEFAULT]);
            return UserApiActions.getUserSuccess({ user });
          }),
          catchError(() => {
            // TODO dodać toast task nr FT024: https://github.com/akademia-envelo-3/meetek-front/issues/34
            return of(AuthApiActions.loginFailure());
          })
        );
      })
    );
  });
}
