import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading$$ = new Subject<boolean>();

  get isLoading$() {
    return this.isLoading$$.asObservable();
  }

  showLoader() {
    this.isLoading$$.next(true);
  }

  hideLoader() {
    this.isLoading$$.next(false);
  }
}
