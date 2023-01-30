import { Pipe, PipeTransform } from '@angular/core';

import { UserResponse } from '@core/store/user.interfaces';

@Pipe({
  name: 'fullName',
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform(user: UserResponse) {
    if (user.role === 'admin') {
      return 'Admin';
    }
    return `${user.firstName} ${user.lastName}`;
  }
}
