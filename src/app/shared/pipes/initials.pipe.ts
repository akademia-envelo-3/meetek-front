import { Pipe, PipeTransform } from '@angular/core';

import { UserResponse } from '@core/store/user.interfaces';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(user: UserResponse) {
    if (user.role === 'admin') {
      return 'A';
    } else return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }
}
