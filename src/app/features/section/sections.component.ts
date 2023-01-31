import { NgIf, AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private router = inject(Router);
  private store = inject(Store);
  private activeRoute = inject(ActivatedRoute);

  allSections$ = this.store.select(selectAllSections);

  public loadSections() {
    this.store.dispatch(SectionActions.getSections());
  }

  ngOnInit() {
    this.activeRoute.parent?.paramMap.subscribe(params => {
      const id = params.get('id');

      const active = this.store.dispatch(SectionActions.activateSection({ sectionId: +id! }));
      const deactive = this.store.dispatch(SectionActions.deactivateSection({ sectionId: +id! }));
    });

    this.loadSections();
  }

  public modification = () => {
    return this.router.navigate([`/${HOME_PATHS.SECTION.SINGLE.SUBPAGES.EDIT}`]);
  };
  public activation = () => {
    //
  };
  public deactivation = () => {
    //
  };
}
