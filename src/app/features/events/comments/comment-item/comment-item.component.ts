import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommentItemRequiredInputs } from './comment-item.interface';
import { CommentItemUserFullnamePipe } from './comment-item-user-fullname.pipe';
import { CommentItemUserInitialsPipe } from './comment-item-user-initials.pipe';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-comment-item[commentItem]',
  standalone:true,
  imports:[CommentItemUserFullnamePipe, CommentItemUserInitialsPipe, NgIf, NgClass],
  templateUrl:'./comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentItemComponent {
@Input() commentItem! : CommentItemRequiredInputs

}
