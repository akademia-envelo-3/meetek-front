import { Pipe, PipeTransform } from '@angular/core';
import { CommentItemRequiredInputs } from '../../features/events/comments/comment-item/comment-item.interface';

@Pipe({
  name: 'commentItemUserFullname',
  standalone: true,
})
export class CommentItemUserFullnamePipe implements PipeTransform {
  transform(value: CommentItemRequiredInputs) {
    return `${value.firstName} ${value.lastName}`;
  }
}
