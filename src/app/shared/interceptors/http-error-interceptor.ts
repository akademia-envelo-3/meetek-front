import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { API_URL } from '@core/env.token';
import { ToastFacadeService } from '@shared/services';

@Injectable()
class HttpErrorInterceptor implements HttpInterceptor {
  private base_url = inject(API_URL);
  private toastService = inject(ToastFacadeService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clone = request.clone({
      url: `${this.base_url}${request.url}`,
    });

    return next.handle(clone).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }

        if (error.status >= 500) {
          //todo: doprecyzować sposob wyswietlania bledow z backendu https://github.com/akademia-envelo-3/meetek-front/issues/80
          this.toastService.showError('Błąd serwera', 'Błąd');
        }
        return throwError(errorMsg);
      })
    );
  }
}

export const HttpErrorInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true };
