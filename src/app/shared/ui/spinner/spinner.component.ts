import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, AsyncPipe } from '@angular/common';

import { LoaderService } from '@shared/services';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinnerModule, NgIf, AsyncPipe],
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  private loaderService = inject(LoaderService);

  isLoading$ = this.loaderService.isLoading$;
}
