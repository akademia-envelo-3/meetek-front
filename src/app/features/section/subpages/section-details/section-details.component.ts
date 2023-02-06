import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { selectLoggedUser } from '@core/store/user.selectors';
import { Store } from '@ngrx/store';
import { NavigationComponent, NavigationOption } from '@shared/ui';
import { combineLatest, map } from 'rxjs';
import { sectionDetailsActions } from '../../store/section.actions';
import { selectSectionDetails } from '../../store/section.selectors';

@Component({
  selector: 'app-section-details',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    JsonPipe,
    NavigationComponent,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './section-details.component.html',
  styleUrls: ['./section-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionDetailsComponent implements OnInit {
  private store = inject(Store);
  private activeRoute = inject(ActivatedRoute);

  sectionDetails$ = this.store.select(selectSectionDetails);
  loggedInUser$ = this.store.select(selectLoggedUser);
  navigationOptions!: NavigationOption[];

  userStatus$ = combineLatest([this.loggedInUser$, this.sectionDetails$]).pipe(
    map(([loggedInUser, sectionDetails]) => {
      if (loggedInUser?.id === sectionDetails.sectionOwner.id) {
        return 'Jesteś właścicielem tej sekcji';
      } else if (sectionDetails.users.some(participant => participant.id === loggedInUser?.id)) {
        return 'Jesteś członkiem tej sekcji';
      } else {
        return 'Nie jesteś członkiem tej sekcji';
      }
    })
  );

  ngOnInit() {
    this.activeRoute.parent?.paramMap.subscribe(params => {
      const id = params.get('id');
  
      if (id) {
        this.store.dispatch(sectionDetailsActions.getSectionDetails({ sectionId: +id }));

        this.navigationOptions = [
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
    });
  }
}
