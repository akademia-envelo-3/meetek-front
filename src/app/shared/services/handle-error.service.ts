import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastFacadeService } from './toast.facade.service';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  private toastService = inject(ToastFacadeService);

  handleError(err: HttpErrorResponse) {
    let errorMsg = '';

    if (err.error instanceof ErrorEvent) {
      errorMsg = `Error: ${err.error.message}`;
    } else {
      switch (err.status) {
        case 400:
          errorMsg = 'Nieprawidłowe żądanie';
          break;
        case 401:
          errorMsg = 'Twój dostęp nie został uwierzytelniony';
          break;
        case 403:
          errorMsg = 'Brak uprawnień dostępu';
          break;
        case 404:
          errorMsg = 'Podana strona nie istnieje';
          break;
        case 500:
          errorMsg = 'Wewnętrzny błąd serwera';
          break;
        case 502:
          errorMsg = 'Niepoprawna odpowiedź z serwera nadrzędnego.';
          break;
        case 503:
          errorMsg = 'Usługa niedostępna';
          break;
        case 504:
          errorMsg = 'Limit czasu na oczekiwanie odpowiedzi od serwera został przekroczony';
          break;
        default:
          errorMsg = 'Coś poszło nie tak!';
      }
    }
    if (errorMsg) {
      this.toastService.showError(errorMsg, 'Błąd');
    }
  }
}
