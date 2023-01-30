import { NgIf, AsyncPipe, JsonPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SectionCardComponent, SectionService } from 'src/app/features/section';
import { HOME_PATHS } from '../home';
import { Store, select } from '@ngrx/store';

import { selectAllSections } from '../section/store/section.selectors';
import { Section } from './shared/interfaces';
import { SectionActions } from 'src/app/features/section';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, SectionCardComponent, NgIf, NgForOf, AsyncPipe, JsonPipe],
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent implements OnInit {
  @Input() placeholderValue!: string;
  private router = inject(Router);
  private store = inject(Store);
  private service = inject(SectionService);

  public readonly allSections$: Observable<Section[]> = this.store.select(selectAllSections);

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
  goToAddSection() {
    this.router.navigate([`/${HOME_PATHS.SECTION.ADD}`]);
  }
  goToSection() {
    this.router.navigate([`/${HOME_PATHS.SECTION.SINGLE.CORE}`]);
  }
}
