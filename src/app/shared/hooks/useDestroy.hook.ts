import { ChangeDetectorRef, inject, ViewRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export function useDestroy() {
  const cdr = inject(ChangeDetectorRef) as ViewRef;
  const subject$$ = new ReplaySubject<void>(1);

  cdr.onDestroy(() => {
    subject$$.next();
    subject$$.complete();
  });

  return subject$$.asObservable();
}
