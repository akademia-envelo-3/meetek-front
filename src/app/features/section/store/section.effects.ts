import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { SectionService } from '..';
import { Section } from '..';
import { sectionActions, sectionsApiActions } from '..';

@Injectable()
export class SectionEffects {
  private actions$ = inject(Actions);
  private sectionService = inject(SectionService);

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

  activateSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sectionActions.activateSection),
      switchMap(({ sectionId }) => {
        return this.sectionService.activate(sectionId).pipe(
          map(section => {
            return sectionsApiActions.sectionActivatedSuccess({ sectionId: section.id });
          })
        );
      }),
      catchError(errorMsg => of(sectionsApiActions.sectionActivatedFailure({ errorMsg })))
    );
  });

  deactivateSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sectionActions.deactivateSection),
      switchMap(({ sectionId }) => {
        return this.sectionService.deactivate(sectionId).pipe(
          map(section => {
            return sectionsApiActions.sectionDeactivatedSuccess({ sectionId: section.id });
          })
        );
      }),
      catchError(errorMsg => of(sectionsApiActions.sectionDeactivatedFailure({ errorMsg })))
    );
  });
}
