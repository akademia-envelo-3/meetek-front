import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, of } from 'rxjs';
import { SectionService } from '..';
import { Section } from '..';
import { sectionActions, sectionsApiActions } from '..';

@Injectable()
export class SectionEffects {
  constructor(private actions$: Actions, private sectionService: SectionService, private store: Store) {}

  getSections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sectionActions.getSections),
      switchMap(() => this.sectionService.getAll()),
      map((sections: Section[]) => sectionsApiActions.sectionsLoadedSuccess({ sections })),
      catchError(errorMsg => of(sectionsApiActions.sectionsLoadedFailure({ errorMsg })))
    );
  });
}
