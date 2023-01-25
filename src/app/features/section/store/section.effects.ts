import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@core/store/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { SectionService } from '..';
import { SectionActions, SectionsApiActions } from '..';
import { HOME_PATHS } from '../../home';

@Injectable()
export class SectionEffects {
  private actions$ = inject(Actions);
  private sectionService = inject(SectionService);
  private userService = inject(UserService);
  private router = inject(Router);

  getSections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SectionActions.getSections),
      switchMap(() => this.sectionService.getAll()),
      map(sections => SectionsApiActions.sectionsLoadedSuccess({ sections })),
      catchError(() => {
        //to do: tutaj ma się pojawić toast; task nr FT024: https://github.com/akademia-envelo-3/meetek-front/issues/34
        return of(SectionsApiActions.sectionsLoadedFailure());
      })
    );
  });

  getSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SectionActions.getSection),
      switchMap(({ sectionId }) => this.sectionService.getOne(sectionId)),
      map(section => SectionsApiActions.sectionLoadedSuccess({ section })),
      catchError(() => {
        //to do: tutaj ma się pojawić toast; task nr FT024: https://github.com/akademia-envelo-3/meetek-front/issues/34
        return of(SectionsApiActions.sectionLoadedFailure());
      })
    );
  });

  addSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SectionActions.addSection),
      switchMap(newSection => this.sectionService.add(newSection.section)),
      map(section => {
        this.router.navigate([HOME_PATHS.SECTION.ALL])
        return SectionsApiActions.sectionsAddedSuccess({ section });
      }),
      catchError(() => {
        //to do: tutaj ma się pojawić toast; task nr FT024: https://github.com/akademia-envelo-3/meetek-front/issues/34
        return of(SectionsApiActions.sectionsAddedFailure());
      })
    );
  });

  editSection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SectionActions.editSection),
      switchMap(editedSection => this.sectionService.update(editedSection.section)),
      map(section => SectionsApiActions.sectionEditedSuccess({ section })),
      catchError(() => {
        //to do: tutaj ma się pojawić toast; task nr FT024: https://github.com/akademia-envelo-3/meetek-front/issues/34
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
        //to do: tutaj ma się pojawić toast; task nr FT024: https://github.com/akademia-envelo-3/meetek-front/issues/34
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
        //to do: tutaj ma się pojawić toast; task nr FT024: https://github.com/akademia-envelo-3/meetek-front/issues/34
        return of(SectionsApiActions.sectionDeactivatedFailure());
      })
    );
  });

  getAllUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SectionActions.getAllUsers),
      switchMap(() => {
        return this.userService
          .getAllUsers()
          .pipe(map(response => SectionsApiActions.getAllUsersSuccess({ users: response })));
      }),
      catchError(() => {
        return of(SectionsApiActions.getAllUsersFailure());
      })
    );
  });
}
