import { Pipe, PipeTransform } from '@angular/core';
import { CommentItemRequiredInputs } from '../../features/events/comments/comment-item/comment-item.interface';

@Pipe({
  name: 'commentItemUserInitials',
  standalone: true,
})
export class CommentItemUserInitialsPipe implements PipeTransform {
  transform(value: CommentItemRequiredInputs) {
    return `${value.firstName.charAt(0)}${value.lastName.charAt(0)}`;
  }
}
