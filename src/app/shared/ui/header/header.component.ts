import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserInitialsButtonComponent } from '../user-initials-button/user-initials-button.component';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { CdkMenuModule } from '@angular/cdk/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    UserInitialsButtonComponent,
    LogoutModalComponent,
    CdkMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  title = 'Meetek';
}
