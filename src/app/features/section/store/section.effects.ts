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

  addSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sectionActions.addSection),
      switchMap(newSection => this.sectionService.add(newSection.section)),
      map(section => sectionsApiActions.sectionsAddedSuccess({ section })),
      catchError(errorMsg => of(sectionsApiActions.sectionsAddedFailure({ errorMsg })))
    );
  });

  editSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sectionActions.editSection),
      switchMap(editedSection => {
        console.log(editedSection);
        return this.sectionService
          .update(editedSection.section)
          .pipe(map(section => sectionsApiActions.sectionEditedSuccess({ section: editedSection.section })));
      }),
      catchError(errorMsg => of(sectionsApiActions.sectionEditedFailure({ errorMsg })))
    );
  });
}
