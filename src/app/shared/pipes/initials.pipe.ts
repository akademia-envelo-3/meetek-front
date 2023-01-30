import { Pipe, PipeTransform } from '@angular/core';

import { UserResponse } from '@core/store/user.interfaces';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(value: UserResponse) {
    if (value.role === 'admin') {
      return 'A';
    } else return `${value.firstName.charAt(0)}${value.lastName.charAt(0)}`;
  }
}
