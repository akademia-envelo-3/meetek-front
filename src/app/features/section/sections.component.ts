import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';

import { HOME_PATHS } from '../home';
import { SectionCardComponent } from '../section';
import { selectAllSections } from '../section';
import { SectionActions } from '../section';
import { SearchComponent } from '@shared/ui';
import { selectLoggedUser } from '@core/store/user.selectors';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-sections[loggedUserId]',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    SectionCardComponent,
    NgIf,
    NgFor,
    AsyncPipe,
    SearchComponent,
  ],
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent implements OnInit {
  private router = inject(Router);
  private store = inject(Store);

  allSections$ = this.store.select(selectAllSections);
  loggedUserId$ = this.store.select(selectLoggedUser).pipe(
    switchMap(user => {
      if (user) {
        return of(user.id);
      } else {
        return of(null);
      }
    })
  );

  ngOnInit() {
    this.loadSections();
  }

  modification(id: number) {
    this.router.navigate([`section/${id}/edit`]);
  }

  activation(id: number) {
    this.store.dispatch(SectionActions.activateSection({ sectionId: Number(id) }));
  }

  deactivation(id: number) {
    this.store.dispatch(SectionActions.deactivateSection({ sectionId: Number(id) }));
  }

  loadSections() {
    this.store.dispatch(SectionActions.getSections());
  }

  goToSection(id: number) {
    this.router.navigate([`/section/${id}`]);
  }

  goToAddSection() {
    this.router.navigate([HOME_PATHS.SECTIONS.ADD]);
  }
}
