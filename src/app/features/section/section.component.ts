import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  template: ` <p>auth works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {}
