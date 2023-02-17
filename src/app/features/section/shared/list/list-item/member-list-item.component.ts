import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '@shared/interfaces';

@Component({
  selector: 'app-members-list-item[user]',
  standalone: true,
  templateUrl: './member-list-item.component.html',
  styleUrls: ['./member-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberListItemComponent {
  @Input() user!: User;

  getFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  getInitials(user: User): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }

  //todo: https://github.com/akademia-envelo-3/meetek-front/issues/59
}
