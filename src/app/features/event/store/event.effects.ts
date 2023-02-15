import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';

import { ToastFacadeService } from '@shared/services';
import { HOME_PATHS } from '../../home';
import { EventActions, EventApiActions } from './event.actions';
import { EventService } from './event.service';

@Injectable()
export class EventEffects {
  private actions$ = inject(Actions);
  private eventService = inject(EventService);
  private router = inject(Router);
  private toastService = inject(ToastFacadeService);

  getEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventActions.getEvents),
      switchMap(() => this.eventService.getAll()),
      map(events => EventApiActions.eventsLoadedSuccess({ events })),
      catchError(() => {
        this.toastService.showError('Nie udało się pobrać eventów', 'Błąd');
        return of(EventApiActions.eventsLoadedFailure());
      })
    );
  });

  getEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventActions.getEvent),
      switchMap(({ eventId }) => this.eventService.getOne(eventId)),
      map(event => EventApiActions.eventLoadedSuccess({ event })),
      catchError(() => {
        this.router.navigate([HOME_PATHS.EVENT.SINGLE.SUBPAGES.HOME]);
        return of(EventApiActions.eventLoadedFailure());
      })
    );
  });
}
