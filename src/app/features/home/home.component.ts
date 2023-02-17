import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { selectLoggedUser } from '@core/store/user.selectors';
import { HeaderComponent, MenuComponent, MenuService } from '@shared/ui';
import { LoaderService } from '@shared/services';
import { SpinnerComponent } from '@shared/ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MenuComponent, AsyncPipe, NgIf, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private store = inject(Store);
  private menuService = inject(MenuService);
  private loaderService = inject(LoaderService);

  isLoading$ = this.loaderService.isLoading$;

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
