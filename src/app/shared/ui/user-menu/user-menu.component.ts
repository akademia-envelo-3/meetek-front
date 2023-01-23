import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserInitialsButtonComponent } from '../user-initials-button/user-initials-button.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, UserInitialsButtonComponent, NgIf, AsyncPipe, MatCardModule],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  @Input() fullName!: string;
  @Input() initials!: string;
  @Input() email!: string;
  @Input() userRole!: string;
}
