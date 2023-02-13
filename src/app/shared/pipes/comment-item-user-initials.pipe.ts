import { Pipe, PipeTransform } from '@angular/core';
import { UserResponse } from '@core/store/user.interfaces';

@Pipe({
  name: 'commentItemUserInitials',
  standalone: true,
})
export class CommentItemUserInitialsPipe implements PipeTransform {
  transform(value: UserResponse) {
    return `${value.firstName.charAt(0)}${value.lastName.charAt(0)}`;
  }
}
