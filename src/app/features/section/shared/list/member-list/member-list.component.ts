import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NgFor, AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatListModule } from '@angular/material/list';

import { selectSectionDetails, sectionDetailsActions } from '../../../store';
import { MemberListItemComponent } from '../list-item';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [MatListModule, MemberListItemComponent, NgFor, AsyncPipe, JsonPipe, NgIf],
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersListComponent implements OnInit {
  private sectionStore = inject(Store);
  private activeRoute = inject(ActivatedRoute);

  sectionDetails$ = this.sectionStore.select(selectSectionDetails);

  ngOnInit() {
    this.activeRoute.parent?.paramMap
      .pipe(
        map(params => params?.get('id')),
        switchMap(id =>
          id ? of(this.sectionStore.dispatch(sectionDetailsActions.getSectionDetails({ sectionId: +id }))) : of([])
        )
      )
      .subscribe();
  }
}
