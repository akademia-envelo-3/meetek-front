import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SectionCardComponent } from 'src/app/features/section';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, MatCardModule, SectionCardComponent, NgIf],
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent {
  sectionCard = {
    isActive: true,
    handleModification: function () {
      // modification action
    },
    handleActivation: function () {
      this.isActive = true;
    },
    handleDeactivation: function () {
      this.isActive = false;
    },
  };
  goToAddSection() {
    //
  }
  goToSection() {
    //
  }
}
