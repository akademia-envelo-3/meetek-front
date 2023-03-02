import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of, take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

import { selectLoggedUser } from '@core/store/user.selectors';
import { NavigationComponent, NavigationOption } from '@shared/ui';
import { EventActions } from '../../store/event.actions';
import { selectEvent } from '../../store/event.selectors';
import { EventMapComponent } from '../../shared/event-map/event-map.component';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    AsyncPipe,
    NavigationComponent,
    EventMapComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: 'event-details.component.html',
  styleUrls: ['event-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsComponent {
  private store = inject(Store);
  private activeRoute = inject(ActivatedRoute);

  eventDetails$ = this.store.select(selectEvent);
  loggedInUser$ = this.store.select(selectLoggedUser);
  navigationOptions$ = this.getNavigationOptions();

  userStatus$ = combineLatest([this.loggedInUser$, this.eventDetails$]).pipe(
    map(([loggedInUser, eventDetails]) => {
      const isEventOwner = loggedInUser?.id === eventDetails.owner.id;
      const isEventMember = eventDetails.users.some(participant => participant.id === loggedInUser?.id);
      const isEventMemberUndecided = eventDetails.users.some(
        participant => participant.id === loggedInUser?.id && participant.undecided === true
      );
      const isEventMemverRejected = eventDetails.users.some(
        participant => participant.id === loggedInUser?.id && participant.rejected === true
      );
      const isEventHasAvailablePlaces = eventDetails.users.length < eventDetails.participantsLimit;

      if (isEventOwner) {
        return {
          status: 'Jesteś właścicielem tego wydarzenia',
          buttons: [
            {
              text: 'Edytuj',
              class: 'warning',
            },
          ],
        };
      }

      if (isEventMember) {
        return {
          status: 'Bierzesz udział',
          buttons: [
            {
              text: 'Rezygnuje',
              class: 'error',
            },
            {
              text: 'Nie wiem',
              class: 'warning',
            },
          ],
        };
      }

      if (isEventMemberUndecided) {
        return {
          status: 'Jesteś niezdecydowany',
          buttons: [
            {
              text: 'Rezygnuje',
              class: 'error',
            },
            {
              text: 'Biorę udział',
              class: 'success',
            },
          ],
        };
      }

      if (isEventMemverRejected) {
        return {
          status: 'Nie bierzesz udziału',
          buttons: [
            {
              text: 'Nie wiem',
              class: 'warning',
            },
            {
              text: 'Dołączam',
              class: 'success',
            },
          ],
        };
      }

      if (isEventHasAvailablePlaces) {
        return {
          status: 'Brak wolnych miejsc',
          buttons: [],
        };
      }

      return {
        status: '',
        buttons: [
          {
            text: 'Rezygnuje',
            class: 'error',
          },
          {
            text: 'Nie wiem',
            class: 'warning',
          },
          {
            text: 'Dołączam',
            class: 'success',
          },
        ],
      };
    })
  );

  getNavigationOptions(): Observable<NavigationOption[]> {
    return (
      this.activeRoute.parent?.paramMap.pipe(
        take(1),
        map(params => {
          return params.get('id');
        }),
        map(id => {
          if (!id) {
            return [];
          }
          this.store.dispatch(EventActions.getEvent({ eventId: +id }));

          return [
            {
              icon: 'keyboard_backspace',
              link: '/events',
            },
            {
              icon: 'info',
              link: `/event/${id}`,
            },
            {
              icon: 'people',
              link: `/event/${id}/participants`,
            },
            {
              icon: 'comment',
              link: `/event/${id}/comments`,
            },
            {
              icon: 'attach_file',
              link: `/event/${id}/attachments`,
            },
          ];
        })
      ) || of([])
    );
  }
}
