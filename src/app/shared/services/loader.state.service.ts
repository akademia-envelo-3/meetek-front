import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loader$$ = new Subject<boolean>();

  get loader$() {
    return this.loader$$.asObservable();
  }

  showLoader() {
    this.loader$$.next(true);
  }

  hideLoader() {
    this.loader$$.next(false);
  }
}
