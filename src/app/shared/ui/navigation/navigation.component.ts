import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

import { SectionCardComponent } from 'src/app/features/section';
import { NavigationOption } from './navigation.iinterface';

@Component({
  selector: 'app-navigation[navigationOptions]',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [MatIconModule, MatTabsModule, SectionCardComponent, RouterModule, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input() navigationOptions!: NavigationOption[] | null;
}
