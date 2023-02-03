import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menu$$ = new BehaviorSubject({ isActive: true });

  get menu$() {
    return this.menu$$.asObservable();
  }

  activateMenu() {
    this.menu$$.next({ isActive: true });
  }

  deactivateMenu() {
    this.menu$$.next({ isActive: false });
  }

  toggleMenu() {
    this.menu$$.next({ isActive: !this.menu$$.value.isActive });
  }
}
