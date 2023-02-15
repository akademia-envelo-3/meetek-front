import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormComponent } from '../edit-form';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormComponent {}
