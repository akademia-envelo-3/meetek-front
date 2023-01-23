import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserInitialsButtonComponent } from '../user-initials-button/user-initials-button.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

export interface UserMenuInputs { 
fullName : string,
initials : string,
email : string
}

@Component({
  selector: 'app-user-menu[userData]',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, UserInitialsButtonComponent, NgIf, AsyncPipe, MatCardModule],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  @Input() userData! : UserMenuInputs
}
