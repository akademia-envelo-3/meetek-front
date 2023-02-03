import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MenuComponent, MenuInputs, MenuService } from '@shared/ui';
import { map } from 'rxjs';
import { NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '@shared/ui/header/header.component';
import { SectionCardComponent } from 'src/app/features/section';
import { CancelConfirmDialogComponent, InputDialogComponent } from '../shared/ui/modals/index';
import { MemberListItemComponent } from '../features/section/shared/list/list-item/member-list-item.component';
import { User } from '../features/section/shared/interfaces';
import { SearchComponent } from '@shared/ui/search/search.component';
import { ToggleComponent } from '@shared/ui/toggle/toggle.component';

@Component({
  selector: 'app-theme',
  standalone: true,
  styles: ['.element { margin: 10px; position: relative;}'],
  imports: [
    SectionCardComponent,
    NgIf,
    MemberListItemComponent,
    MatListModule,
    ToggleComponent,
    SearchComponent,
    MatDialogModule,
    MatButtonModule,
    HeaderComponent,
    MenuComponent,
    CommonModule,
  ],
  styleUrls: ['./theme.component.scss'],
  template: `
    <h1>Storybook-like route</h1>
    <h2>Header</h2>
    <app-header></app-header>
    <h3>Dialogi</h3>
    <button mat-raised-button (click)="openDialog()">Dialog z inputem</button>
    <button mat-raised-button (click)="openDialog2()">Dialog z przyciskami</button>
    <hr />

    <h2>Section card</h2>
    <ng-container *ngIf="sectionCard as card">
      <div class="element">
        <app-section-card
          (modification)="card.handleModification()"
          (activation)="card.handleActivation()"
          (deactivation)="card.handleDeactivation()"
          [name]="'Sekcja szalonych pływaków i pływaczek'"
          [numberOfMembers]="31842"
          [isActive]="card.isActive"></app-section-card>
      </div>
      <div class="element">
        <app-section-card
          (modification)="card.handleModification()"
          [name]="'Piłkarze'"
          [numberOfMembers]="2"
          [isActive]="false"></app-section-card>
      </div>
      <div class="element">
        <app-section-card [name]="'Rowerzyści'" [numberOfMembers]="24" [isActive]="true"></app-section-card>
      </div>
    </ng-container>
    <hr />

    <h2>Menu</h2>
    <div class="element">
      <button (click)="menuService.toggleMenu()" class="warning mediumButton">Toggle menu</button>
      <app-menu [user]="userMockMenu" [class.active]="isMenuActive | async"></app-menu>
    </div>
    <hr />

    <h2>Toggle</h2>
    <div class="element">
      <app-toggle (toggleChange)="onToggleChange($event)"></app-toggle>
    </div>
    <hr />
    <h2>Wyszukiwarka</h2>
    <div class="element">
      <app-search [placeholderValue]="'Wyszukaj'"></app-search>
    </div>
    <hr />
    <h2>List item</h2>
    <mat-list class="list">
      <app-members-list-item [user]="user"></app-members-list-item>
    </mat-list>
    <hr />
    <h2>Przyciski</h2>
    <button class="modification">Modyfikuj</button>
    <button class="deactivation">Dezaktywuj</button>
    <button class="activation">Aktywuj</button>
    <button class="success mediumButton">Zatwierdź</button>
    <button class="error mediumButton">Odrzuć</button>
    <button class="warning mediumButton">Nie wiem</button>
    <button class="success mediumButton" disabled>Nieaktywny</button>
    <hr />
    <button class="success largeButton">Zatwierdź</button>
    <button class="success mediumButton">Zatwierdź</button>
    <button class="success smallButton">Zatwierdź</button>
  `,
})
export default class ThemeComponent {
  sectionCard = {
    isActive: true,
    handleModification: function () {
      // modification action
    },
    handleActivation: function () {
      this.isActive = true;
    },
    handleDeactivation: function () {
      this.isActive = false;
    },
  };

  // -- MENU --
  menuService = inject(MenuService);
  isMenuActive = this.menuService.menu$.pipe(map(menu => menu.isActive));
  userMockMenu: MenuInputs = {
    userData: { fullName: 'test user hahahadsdssdsdsdsddh', email: 'test@gmail.com', initials: 'TU' },
    role: 'admin',
  };

  onToggleChange(isChecked: boolean) {
    console.log(isChecked);
  }

  user: User = {
    id: 1,
    firstName: 'Ewelina',
    lastName: 'Mężyk',
  };

  public dialog = inject(MatDialog);
  importedDialogData!: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      data: {
        title: 'Przykładowy tytuł modala',
        buttonText: 'Wyślij prośbę',
        inputLabelText: 'Example label',
        importedDialogData: this.importedDialogData,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.importedDialogData = result;
    });
  }

  openDialog2() {
    this.dialog.open(CancelConfirmDialogComponent, {
      data: { text: 'Przykładowy tekst przekazany z add-category-component' },
    });
  }
}
