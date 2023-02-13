import { Pipe, PipeTransform } from '@angular/core';
import { UserResponse } from '@core/store/user.interfaces';

@Pipe({
  name: 'commentItemUserFullname',
  standalone: true,
})
export class CommentItemUserFullnamePipe implements PipeTransform {
  transform(value: UserResponse) {
    return `${value.firstName} ${value.lastName}`;
  }
}
