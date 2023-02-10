import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HashtagsService } from '../hashtag/store/hashtag.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    application shell

    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private test = inject(HashtagsService);
}
