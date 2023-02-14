import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  template: `<p>Test component</p>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {}
