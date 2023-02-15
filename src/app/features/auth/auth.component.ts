import { NgOptimizedImage, AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FormComponent } from './form/form.component';
import { LoaderService } from '@shared/services';
import { SpinnerComponent } from '@shared/ui';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatSlideToggleModule, NgOptimizedImage, FormComponent, SpinnerComponent, AsyncPipe],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private loaderService = inject(LoaderService);

  isLoading$ = this.loaderService.isLoading$;
}
