import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { Store } from '@ngrx/store';

import { CommentItemUserFullnamePipe } from '@shared/pipes/comment-item-user-fullname.pipe';
import { CommentItemUserInitialsPipe } from '@shared/pipes/comment-item-user-initials.pipe';
import { Comment } from './comment-item.interface';
import { selectLoggedUser } from '@core/store/user.selectors';
import { AsyncPipe } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { UserResponse } from '@core/store/user.interfaces';

@Component({
  selector: 'app-comment-item[commentItem]',
  standalone: true,
  imports: [CommentItemUserFullnamePipe, CommentItemUserInitialsPipe, NgIf, NgClass, AsyncPipe, JsonPipe],
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentItemComponent {
  private store = inject(Store);

  @Input() commentItem!: Comment;

  user$ = this.store.select(selectLoggedUser);

  compareObjects(comentOwner: UserResponse, user: UserResponse) {
    return JSON.stringify(user) === JSON.stringify(comentOwner);
  }
}
