import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { HOME_PATHS } from '../../home';
import { AuthActions, AuthApiActions, AuthService } from '../../auth';
import { UserApiActions } from '@core/store/user.actions';
import { ToastrFacade } from '@shared/services';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private cookieService = inject(CookieService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastrFacade);

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
            this.toastService.toastr.error('Niepoprawny login lub hasło');
            return of(AuthApiActions.loginFailure());
          })
        );
      })
    );
  });
}
