import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NgFor, AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatListModule } from '@angular/material/list';

import { MemberListItemComponent } from '../list-item/member-list-item.component';
import { sectionDetailsActions } from '../../../store/section.actions';
import { selectSectionDetails } from '../../../store/section.selectors';
import { User } from '../../interfaces';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [MatListModule, MemberListItemComponent, NgFor, AsyncPipe, JsonPipe, NgIf],
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersListComponent implements OnInit {
  usersOfSection$!: Observable<User[] | undefined>;
  listOfMembers: User[] = [];

  private sectionStore = inject(Store);
  private activeRoute = inject(ActivatedRoute);
  sectionDetails$ = this.sectionStore.select(selectSectionDetails);

  ngOnInit() {
    this.activeRoute.parent?.paramMap.subscribe(params => {
      const id = params.get('id');

      this.sectionStore.dispatch(sectionDetailsActions.getSectionDetails({ sectionId: +id! }));
    });
  }

  getFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  getInitials(user: User): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }
}
