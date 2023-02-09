import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FormComponent } from '../auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    NgOptimizedImage,
    FormComponent
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
