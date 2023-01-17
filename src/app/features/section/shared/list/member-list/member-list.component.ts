import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatListModule } from '@angular/material/list';

import * as sectionSelectors from '../../../store/section.selectors';
import { MemberListItemComponent } from '../list-item/member-list-item.component';
import { User } from '../../interfaces';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [MatListModule, MemberListItemComponent, CommonModule],
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberListComponent implements OnInit {
  sectionId!: number;
  usersOfSection$!: Observable<User[] | undefined>;
  listOfMembers: User[] = [];

  private sectionStore = inject(Store);
  private activeRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activeRoute.parent?.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.sectionId = +id;

        this.usersOfSection$ = this.sectionStore.select(sectionSelectors.selectUsersOfSection(this.sectionId));
      } else {
        this.sectionId = NaN;
      }
    });
  }
  getFullName(user: User): string {
    return user.firstName + ' ' + user.lastName;
  }

  getInitials(user: User): string {
    return user.firstName.charAt(0) + user.lastName.charAt(0);
  }
}
