import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SectionCardComponent } from 'src/app/features/section';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HOME_PATHS } from '../home';
import { Store } from '@ngrx/store';
// import { selectSectionDetails } from '../section/store/section.selectors';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, SectionCardComponent, NgIf],
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent {
  private sectionStore = inject(Store);

  // sectionDetails$ = this.sectionStore.select(selectSectionDetails);

  constructor(private router: Router) {}

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
