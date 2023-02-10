import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of, tap, startWith } from 'rxjs';
import { SectionService } from './section.service';
import { SectionActions, sectionDetailsActions, SectionDetilsApiActions, SectionsApiActions } from './section.actions';
import { ToastFacadeService } from '@shared/services';
import { HOME_PATHS } from '../../home';

@Injectable()
export class SectionEffects {
  private actions$ = inject(Actions);
  private sectionService = inject(SectionService);
  private router = inject(Router);
  private toastService = inject(ToastFacadeService);

  getSections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SectionActions.getSections),
      switchMap(() => this.sectionService.getAll()),
      map(sections => SectionsApiActions.sectionsLoadedSuccess({ sections })),
      catchError(() => {
        this.toastService.showError('Nie udało się pobrać sekcji', 'Błąd');
        return of(SectionsApiActions.sectionsLoadedFailure());
      })
    );
  });

  getSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sectionDetailsActions.getSectionDetails),
      switchMap(({ sectionId }) => this.sectionService.getOne(sectionId)),
      map(section => SectionDetilsApiActions.sectionDetailsSuccess({ section })),
      catchError(() => {
        this.router.navigate([HOME_PATHS.SECTIONS.SINGLE.SUBPAGES.HOME]);
        return of(SectionDetilsApiActions.sectionDetailsFailure());
      })
    );
  });

  addSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SectionActions.addSection),
      switchMap(({ section, isActive }) => this.sectionService.add(section, isActive)),
      map(section => SectionsApiActions.sectionsAddedSuccess({ section })),
      tap(() => this.router.navigate([HOME_PATHS.SECTIONS.ALL])),
      catchError(() => {
        this.toastService.showError('Nie udało się utworzyć sekcji', 'Błąd');
        return of(SectionsApiActions.sectionsAddedFailure());
      })
    );
  });

  editSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SectionActions.editSection),
      switchMap(({ sectionId, section }) => this.sectionService.update(sectionId, section)),
      map(section => {
        this.router.navigate([HOME_PATHS.SECTIONS.SINGLE.SUBPAGES.HOME]);
        return SectionsApiActions.sectionEditedSuccess({ section });
      }),
      catchError(() => {
        this.toastService.showError('Nie udało się edytować sekcji', 'Błąd');
        return of(SectionsApiActions.sectionEditedFailure());
      })
    );
  });

  activateSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SectionActions.activateSection),
      switchMap(({ sectionId }) => this.sectionService.activate(sectionId)),
      map(section => SectionsApiActions.sectionActivatedSuccess({ sectionId: section.id })),
      catchError(() => {
        this.toastService.showError('Nie udało się aktywować sekcji', 'Błąd');
        return of(SectionsApiActions.sectionActivatedFailure());
      })
    );
  });

  deactivateSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SectionActions.deactivateSection),
      switchMap(({ sectionId }) => this.sectionService.deactivate(sectionId)),
      map(section => SectionsApiActions.sectionDeactivatedSuccess({ sectionId: section.id })),
      catchError(() => {
        this.toastService.showError('Nie udało się dezaktywować sekcji', 'Błąd');
        return of(SectionsApiActions.sectionDeactivatedFailure());
      })
    );
  });

  getAllUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SectionActions.getAllUsers),
      startWith(SectionActions.getAllUsers),
      switchMap(() => this.sectionService.getAllUsers()),
      map(users => SectionsApiActions.getAllUsersSuccess({ users })),
      catchError(() => {
        this.toastService.showError('Nie udało się pobrać użytkowników', 'Błąd');
        return of(SectionsApiActions.getAllUsersFailure());
      })
    );
  });
}
