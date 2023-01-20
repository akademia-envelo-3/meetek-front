import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SectionCardComponent } from 'src/app/features/section';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, MatCardModule, SectionCardComponent, NgIf],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
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
}
