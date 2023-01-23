import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CdkMenuModule } from '@angular/cdk/menu';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserInitialsButtonComponent } from '../user-initials-button/user-initials-button.component';
import { selectLoggedUser } from '@core/store/user.selectors';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { UserMenuInputs } from '../user-menu/user-menu.component';

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

  user$ = this.store.select(selectLoggedUser).pipe(
    map(user => {
      if (!user) return;

      const { role, firstName, lastName, email } = user;

      const userData: UserMenuInputs = {
        initials: role === 'admin' ? 'A' : `${firstName.charAt(0)}${lastName.charAt(0)}`,
        fullName: role === 'admin' ? 'Admin' : `${firstName} ${lastName}`,
        email,
      };
      return userData;
    })
  );
}
