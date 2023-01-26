import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastFacadeService {
  private toastr = inject(ToastrService);

  public showSuccess(message: string, heading?: string) {
    this.toastr.success(message, heading);
  }

  public showError(message: string, heading?: string) {
    this.toastr.error(message, heading);
  }
}
