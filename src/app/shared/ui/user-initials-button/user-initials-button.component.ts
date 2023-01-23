import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-initials-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,],
  templateUrl: './user-initials-button.component.html',
  styleUrls: ['./user-initials-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInitialsButtonComponent {
    @Input() name!: string;
    @Input() initials!: string;
}
