import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { SectionCardComponent } from 'src/app/features/section';
import { CancelConfirmDialogComponent, InputDialogComponent } from '../shared/ui/modals/index';
import { MemberListItemComponent } from '../features/section/shared/list/list-item/member-list-item.component';
import { MatListModule } from '@angular/material/list';

import { User } from '../features/section/shared/interfaces';
import { SearchComponent } from '@shared/ui/search/search.component';
import { ToggleComponent } from '@shared/ui/toggle/toggle.component';
@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [
    SectionCardComponent,
    NgIf,
    MemberListItemComponent,
    MatListModule,
    ToggleComponent,
    SearchComponent,
    MatDialogModule,
    MatButtonModule,
  ],
  styleUrls: ['./theme.component.scss'],
  template: `
    <h1>Storybook-like route</h1>
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
    <h2>Przyciski</h2>
    <button class="modification">Modyfikuj</button>
    <button class="deactivation">Dezaktywuj</button>
    <button class="activation">Aktywuj</button>
    <button class="success">Zatwierdź</button>
    <button class="error">Odrzuć</button>
    <button class="warning">Nie wiem</button>
    <button class="formButton">Formularze</button>
    <button class="success" disabled>Nieaktywny</button>
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
