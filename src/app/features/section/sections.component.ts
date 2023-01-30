import { NgIf, AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';

import { HOME_PATHS } from '../home';
import { SectionCardComponent } from 'src/app/features/section';
import { selectAllSections } from '../section/store/section.selectors';
import { SectionActions } from 'src/app/features/section';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, SectionCardComponent, NgIf, NgForOf, AsyncPipe],
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent implements OnInit {
  @Input() placeholderValue!: string;
  private router = inject(Router);
  private store = inject(Store);

  allSections$ = this.store.select(selectAllSections);

  public loadSections() {
    this.store.dispatch(SectionActions.getSections());
  }

  ngOnInit() {
    this.loadSections();
  }

  sectionCard = {
    isActive: true,
    handleModification: () => {
      this.router.navigate([`/${HOME_PATHS.SECTION.SINGLE.SUBPAGES.EDIT}`]);
    },
    handleActivation: function () {
      this.isActive = true;
    },
    handleDeactivation: function () {
      this.isActive = false;
    },
  };
}
