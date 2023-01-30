import { Pipe, PipeTransform } from '@angular/core';

import { UserResponse } from '@core/store/user.interfaces';

@Pipe({
  name: 'fullName',
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform(value: UserResponse) {
    if (value.role === 'admin') {
      return 'Admin';
    }
    return `${value.firstName} ${value.lastName}`;
  }
}
