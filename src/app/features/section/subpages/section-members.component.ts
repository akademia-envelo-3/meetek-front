import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MemberListComponent } from '../shared/list/member-list/member-list.component';

@Component({
  selector: 'app-section-members',
  standalone: true,
  imports: [MemberListComponent, MatCardModule],
  templateUrl: './section-members.component.html',
  styleUrls: ['./section-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionMembersComponent {}
// to do: dodać wyszukiwarkę oraz menu górne
