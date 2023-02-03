import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { selectLoggedUser } from '@core/store/user.selectors';
import { HeaderComponent, MenuComponent, MenuService } from '@shared/ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MenuComponent, AsyncPipe, NgIf],
  template: `
    <div class="wrapper">
      <app-header></app-header>
      <div class="content-container">
        <div *ngIf="userData$ | async as user" [class.active]="isMenuActive$ | async" class="menu-container">
          <app-menu [user]="user"></app-menu>
        </div>
        <router-outlet> </router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private menuService = inject(MenuService);
  private store = inject(Store);

  userData$ = this.store.select(selectLoggedUser).pipe(
    map(user => {
      if (!user) return null;

      return {
        userData: {
          initials: user.role === 'admin' ? 'A' : `${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}`,
          fullName: user.role === 'admin' ? 'Admin' : `${user?.firstName} ${user?.lastName}`,
          email: user.email,
        },
        role: user.role,
      };
    })
  );

  isMenuActive$ = this.menuService.menu$.pipe(map(menu => menu.isActive));
}
