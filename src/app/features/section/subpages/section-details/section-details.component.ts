import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { selectLoggedUser } from '@core/store/user.selectors';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of, take } from 'rxjs';

import { NavigationComponent, NavigationOption } from '@shared/ui';
import { sectionDetailsActions, selectSectionDetails } from '../../store';
import { UserStatus } from '../..';

@Component({
  selector: 'app-section-details',
  standalone: true,
  imports: [NgIf, AsyncPipe, NavigationComponent, MatButtonModule, MatCardModule, NgClass, RouterLink],
  templateUrl: './section-details.component.html',
  styleUrls: ['./section-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionDetailsComponent {
  private store = inject(Store);
  private activeRoute = inject(ActivatedRoute);

  sectionDetails$ = this.store.select(selectSectionDetails);
  loggedInUser$ = this.store.select(selectLoggedUser);
  navigationOptions$ = this.getNavigationOptions();

  userStatus$: Observable<UserStatus> = combineLatest([this.loggedInUser$, this.sectionDetails$]).pipe(
    map(([loggedInUser, sectionDetails]) => {
      const isSectionOwner = loggedInUser.id === sectionDetails.sectionOwner.id;
      const isSectionMember = sectionDetails.users.includes(loggedInUser.id)

      if (isSectionOwner) {
        return {
          status: 'Jesteś właścicielem tej sekcji',
          button: {
            text: 'Edytuj',
            link: `/section/${sectionDetails.id}/edit`,
            action: 'edit',
            class: 'warning',
          },
          sectionId: sectionDetails.id,
          userId: loggedInUser?.id,
        };
      }

      if (isSectionMember) {
        return {
          status: 'Jesteś członkiem tej sekcji',
          button: {
            text: 'Opuść',
            action: 'leave',
            class: 'error',
          },
          sectionId: sectionDetails.id,
          userId: loggedInUser?.id,
        };
      }

      return {
        status: 'Nie jesteś członkiem tej sekcji',
        button: {
          text: 'Dołącz',
          action: 'join',
          class: 'success',
        },
        sectionId: sectionDetails.id,
        userId: loggedInUser?.id,
      };
    })
  );

  sectionActions(action: string, sectionId: number, userId: number) {
    if (action === 'join') {
      // jak backend bedzie gotowy dodać dispatch
    }

    if (action === 'leave') {
      // jak backend bedzie gotowy dodać dispatch
    }
  }

  getNavigationOptions(): Observable<NavigationOption[]> {
    return (
      this.activeRoute.parent?.paramMap.pipe(
        take(1),
        map(params => params.get('id')),
        map(id => {
          if (!id) {
            return [];
          }
          this.store.dispatch(sectionDetailsActions.getSectionDetails({ sectionId: +id }));

          return [
            {
              icon: 'keyboard_backspace',
              link: '/sections',
            },
            {
              icon: 'info',
              link: `/section/${id}`,
            },
            {
              icon: 'people',
              link: `/section/${id}/members`,
            },
          ];
        })
      ) || of([])
    );
  }
}
