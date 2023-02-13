import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { selectLoggedUser } from '@core/store/user.selectors';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of, take } from 'rxjs';

import { NavigationComponent, NavigationOption } from '@shared/ui';
import { sectionDetailsActions, selectSectionDetails } from '../../store';

@Component({
  selector: 'app-section-details',
  standalone: true,
  imports: [NgIf, AsyncPipe, NavigationComponent, MatButtonModule, MatCardModule],
  templateUrl: './section-details.component.html',
  styleUrls: ['./section-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionDetailsComponent implements OnInit {
  private store = inject(Store);
  private activeRoute = inject(ActivatedRoute);

  sectionDetails$ = this.store.select(selectSectionDetails);
  loggedInUser$ = this.store.select(selectLoggedUser);
  navigationOptions$!: Observable<NavigationOption[]>;

  userStatus$ = combineLatest([this.loggedInUser$, this.sectionDetails$]).pipe(
    map(([loggedInUser, sectionDetails]) => {
      const isSectionOwner$ = of(loggedInUser?.id === sectionDetails.sectionOwner.id);
      const isSectionMember$ = of(sectionDetails.users.some(participant => participant.id === loggedInUser?.id));

      if (isSectionOwner$) {
        return 'Jesteś właścicielem tej sekcji';
      }

      if (isSectionMember$) {
        return 'Jesteś członkiem tej sekcji';
      }

      return 'Nie jesteś członkiem tej sekcji';
    })
  );

  ngOnInit() {
    this.activeRoute.parent?.paramMap
      .pipe(
        take(1),
        map(params => params.get('id')),
        map(id => {
          if (id) {
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
          }

          return [];
        })
      )
      .subscribe(options => (this.navigationOptions$ = of(options)));
  }
}
