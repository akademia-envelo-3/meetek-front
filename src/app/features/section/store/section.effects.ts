import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, switchMap, of } from 'rxjs';
import { SectionService } from '..';
import { sectionActions, sectionsApiActions } from '..';

@Injectable()
export class SectionEffects {
  private actions$ = inject(Actions);
  private sectionService = inject(SectionService);
  private toast = inject(ToastrService);

  getSections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sectionActions.getSections),
      switchMap(() => this.sectionService.getAll()),
      map(sections => sectionsApiActions.sectionsLoadedSuccess({ sections })),
      catchError(() => {
        this.toast.error('Nie udało się pobrać sekcji');
        return of(sectionsApiActions.sectionsLoadedFailure());
      })
    );
  });

  getSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sectionActions.getSection),
      switchMap(({ sectionId }) => this.sectionService.getOne(sectionId)),
      map(section => {
        return sectionsApiActions.sectionLoadedSuccess({ section });
      }),
      catchError(() => {
        this.toast.error('Nie udało się pobrać danej sekcji');
        return of(sectionsApiActions.sectionLoadedFailure());
      })
    );
  });

  addSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sectionActions.addSection),
      switchMap(newSection => this.sectionService.add(newSection.section)),
      map(section => sectionsApiActions.sectionsAddedSuccess({ section })),
      catchError(() => {
        this.toast.error('Nie udało się utworzyć sekcji');
        return of(sectionsApiActions.sectionsAddedFailure());
      })
    );
  });

  editSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sectionActions.editSection),
      switchMap(editedSection => {
        return this.sectionService.update(editedSection.section).pipe(
          map(section => {
            return sectionsApiActions.sectionEditedSuccess({ section });
          }),
          catchError(() => {
            this.toast.error('Nie udało się zedytować sekcji');
            return of(sectionsApiActions.sectionEditedFailure());
          })
        );
      })
    );
  });

  activateSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sectionActions.activateSection),
      switchMap(({ sectionId }) => {
        return this.sectionService.activate(sectionId).pipe(
          map(section => {
            return sectionsApiActions.sectionActivatedSuccess({ sectionId: section.id });
          }),
          catchError(() => {
            this.toast.error('Nie udało się aktywować sekcji');
            return of(sectionsApiActions.sectionActivatedFailure());
          })
        );
      })
    );
  });

  deactivateSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sectionActions.deactivateSection),
      switchMap(({ sectionId }) => {
        return this.sectionService.deactivate(sectionId).pipe(
          map(section => {
            return sectionsApiActions.sectionDeactivatedSuccess({ sectionId: section.id });
          }),
          catchError(() => {
            this.toast.error('Nie udało się deaktywować sekcji');
            return of(sectionsApiActions.sectionDeactivatedFailure());
          })
        );
      })
    );
  });
}
