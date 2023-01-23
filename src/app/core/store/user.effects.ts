import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { startWith, filter, switchMap, map, catchError, of } from 'rxjs';

import { APP_PATH } from 'src/app/app.module';
import { UserActions, UserApiActions } from './user.actions';
import { UserService } from './user.service';
import { ToastrFacade } from '@shared/services';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private cookieService = inject(CookieService);
  private userService = inject(UserService);
  private router = inject(Router);
  private toastService = inject(ToastrFacade);

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUser),
      startWith(UserActions.getUser),
      filter(() => this.cookieService.check('token')),
      switchMap(() => {
        return this.userService.getMe().pipe(map(response => UserApiActions.getUserSuccess({ user: response })));
      }),
      catchError(() => {
        this.router.navigate([APP_PATH.AUTH]);
        this.toastService.toastr.error('Nie udało się pobrać użytkownika');
        this.cookieService.delete('token');
        return of(UserApiActions.getUserFailure());
      })
    );
  });
}
