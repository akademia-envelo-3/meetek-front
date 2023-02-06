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

@Component({
  selector: 'app-sections',
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

  ngOnInit() {
    this.loadSections();
  }

  modification(id: number) {
    this.router.navigate([`section/${id}/edit`]);
  }

  handleActivation(id: number) {
    this.store.dispatch(SectionActions.activateSection({ sectionId: Number(id) }));
  }

  handleDeactivation(id: number) {
    this.store.dispatch(SectionActions.deactivateSection({ sectionId: Number(id) }));
  }

  loadSections() {
    this.store.dispatch(SectionActions.getSections());
  }

  goToSection(id: number) {
    this.router.navigate([`/section/${id}`]);
  }

  goToAddSection() {
    this.router.navigate([`/${HOME_PATHS.SECTION.ADD}`]);
  }
}