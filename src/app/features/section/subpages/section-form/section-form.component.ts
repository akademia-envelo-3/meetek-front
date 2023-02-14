import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormComponent } from '../section-form';

@Component({
  selector: 'app-section-form',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionFormComponent {}
