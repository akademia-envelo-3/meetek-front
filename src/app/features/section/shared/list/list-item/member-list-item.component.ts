import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-members-list-item',
  standalone: true,
  templateUrl: './member-list-item.component.html',
  styleUrls: ['./member-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberListItemComponent {
  @Input() name!: string;
  @Input() initials!: string;
}
