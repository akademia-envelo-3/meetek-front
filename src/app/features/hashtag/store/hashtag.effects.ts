import { inject, Injectable } from '@angular/core';
import { switchMap, map, catchError, of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HashtagActions, HashtagApiActions } from './hashtag.actions';
import { HashtagService } from './hashtag.service';
import { ToastFacadeService } from '@shared/services';

@Injectable()
export class HashtagEffects {
  private actions$ = inject(Actions);
  private hashtagService = inject(HashtagService);
  private toastService = inject(ToastFacadeService);

  getHashtags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HashtagActions.getHashtags),
      switchMap(() => {
        return this.hashtagService.getAll();
      }),
      map(hashtags => HashtagApiActions.hashtagsLoadedSuccess({ hashtags })),
      catchError(() => {
        this.toastService.showError('Nie udało się pobrać hasztagów', 'Błąd');
        return of(HashtagApiActions.hashtagActivatedFailure);
      })
    );
  });
}
