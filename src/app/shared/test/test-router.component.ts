import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RouterOutlet],
  template: `<p>Test component</p>
    <router-outlet></router-outlet>>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestWithRouterComponent {}
