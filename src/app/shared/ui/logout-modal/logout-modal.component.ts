import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserInitialsButtonComponent } from '../user-initials-button/user-initials-button.component';
import { selectLoggedUser } from '@core/store/user.selectors';
import { Observable } from 'rxjs';
import { UserResponse } from '@core/store/user.interfaces';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, UserInitialsButtonComponent, NgIf, AsyncPipe, MatCardModule, NgClass],
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutModalComponent implements OnInit {
  private store = inject(Store);
  userSelector$!: Observable<UserResponse | undefined>;

  ngOnInit() {
    this.userSelector$ = this.store.select(selectLoggedUser);
  }
  getFullName(user: UserResponse): string {
    return user.firstName + ' ' + user.lastName;
  }
}
