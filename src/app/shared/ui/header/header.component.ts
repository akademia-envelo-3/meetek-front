import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CdkMenuModule } from '@angular/cdk/menu';
import { map, filter } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { UserInitialsButtonComponent } from '../user-initials-button/user-initials-button.component';
import { selectLoggedUser } from '@core/store/user.selectors';
import { UserMenuComponent } from '../user-menu/index';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    UserInitialsButtonComponent,
    CdkMenuModule,
    NgIf,
    AsyncPipe,
    UserMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private store = inject(Store);

  user$ = this.store.pipe(
    select(selectLoggedUser),
    filter(user => user !== null),
    map(user => ({
      initials: user?.role === 'admin' ? 'A' : `${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}`,
      fullName: user?.role === 'admin' ? 'Admin' : `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
    }))
  );
}
