import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserInitialsButtonComponent } from '../user-initials-button/user-initials-button.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { UserResponse } from '@core/store/user.interfaces';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from '@core/store/user.selectors';
import { NgIf, AsyncPipe } from '@angular/common';
import { UserMenuComponent } from '../user-menu/user-menu.component';


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
    UserMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private store = inject(Store);
  user$ = this.store.select(selectLoggedUser);

  getInitials(user: UserResponse): string {
    if(user.role === 'admin'){
      return 'A';
    } else return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
     
    
  }
  getFullName(user: UserResponse): string {
    return `${user.firstName} ${user.lastName}`;
  }
}
