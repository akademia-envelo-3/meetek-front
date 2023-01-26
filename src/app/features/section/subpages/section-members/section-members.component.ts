import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MembersListComponent } from '../../shared/list/member-list/member-list.component';

@Component({
  selector: 'app-section-members',
  standalone: true,
  imports: [MembersListComponent, MatCardModule],
  templateUrl: './section-members.component.html',
  styleUrls: ['./section-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionMembersComponent {}
// to do: dodać wyszukiwarkę oraz menu górne; task nr FT037 https://github.com/akademia-envelo-3/meetek-front/issues/51 oraz task nr FT028 https://github.com/akademia-envelo-3/meetek-front/issues/47
