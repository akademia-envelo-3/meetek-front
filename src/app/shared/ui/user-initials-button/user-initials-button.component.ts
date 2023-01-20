import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { selectLoggedUser } from '@core/store/user.selectors';
import { Observable } from 'rxjs';
import { UserResponse } from '@core/store/user.interfaces';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-initials-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgIf, AsyncPipe],
  templateUrl: './user-initials-button.component.html',
  styleUrls: ['./user-initials-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInitialsButtonComponent implements OnInit {
  private store = inject(Store);
  userSelector$!: Observable<UserResponse | undefined>;

  ngOnInit() {
    this.userSelector$ = this.store.select(selectLoggedUser);
  }
  getInitials(user: UserResponse): string {
    return user.firstName.charAt(0) + user.lastName.charAt(0);
  }
}
