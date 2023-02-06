import { Pipe, PipeTransform } from '@angular/core';
import { CommentItemRequiredInputs } from './comment-item.interface';

@Pipe({
  name: 'commentItemUserFullname',
  standalone:true,
})
export class CommentItemUserFullnamePipe implements PipeTransform {

  transform(value: CommentItemRequiredInputs) {
    return `${value.firstName} ${value.lastName}`;
  }

}
