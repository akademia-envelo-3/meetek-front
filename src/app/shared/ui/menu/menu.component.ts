import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { UserInitialsButtonComponent } from '../user-initials-button/user-initials-button.component';
import { MenuService } from './menu.service';
import { menuItems } from './menu-items';
import { UserMenuComponent } from '../user-menu';
import { MenuInputs } from './menu.interface';

@Component({
  selector: 'app-menu[user]',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    NgClass,
    NgIf,
    NgFor,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatIconModule,
    RouterModule,
    UserInitialsButtonComponent,
    UserMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  @Input() user!: MenuInputs;

  private menuService = inject(MenuService);
  private cookieService = inject(CookieService);

  menuItems = menuItems;

  logout() {
    this.cookieService.delete('token');
    window.location.reload();
  }

  closeMenu() {
    this.menuService.deactivateMenu();
  }
}
