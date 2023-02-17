import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';

import { HashtagActions } from './store/hashtag.actions';
import { selectAllHashtags } from './store/hashtag.selectors';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CategoryHashtagCardComponent, SearchComponent } from '@shared/ui';
import { selectLoggedUser } from '@core/store/user.selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-hashtags-view',
  standalone: true,
  imports: [MatCardModule, CategoryHashtagCardComponent, AsyncPipe, NgFor, NgIf, SearchComponent],
  templateUrl: './hashtags-view.component.html',
  styleUrls: ['./hashtags-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HashtagsViewComponent {
  private store = inject(Store);

  hashtagsCollection$ = this.store.select(selectAllHashtags);
  userRole$ = this.store.select(selectLoggedUser).pipe(map(user => user.role));

  constructor() {
    this.store.dispatch(HashtagActions.getHashtags());
    this.hashtagsCollection$.subscribe(console.log);
  }
}
