import { NgIf, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { HeaderComponent } from '@shared/ui/header/header.component';
import { SectionCardComponent } from 'src/app/features/section';
import { CancelConfirmDialogComponent, InputDialogComponent } from '../shared/ui/modals/index';
import { MemberListItemComponent } from '../features/section/shared/list/list-item/member-list-item.component';
import { User } from '../features/section/shared/interfaces';
import { SearchComponent } from '@shared/ui/search/search.component';
import { ToggleComponent } from '@shared/ui/toggle/toggle.component';
import { EventCardComponent } from '@shared/ui/event-card/event-card.component';
import { EventSpecs } from '@shared/ui/event-card/event-card.interface';

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
    HeaderComponent,
    EventCardComponent,
    NgFor,
  ],
  styleUrls: ['./theme.component.scss'],
  template: `
    <h1>Storybook-like route</h1>
    <h2>Header</h2>
    <app-header></app-header>
    <h2>Event card</h2>
    <app-event-card *ngFor="let event of Events" [event]="event"></app-event-card>
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

  Events: EventSpecs[] = [
    {
      id: 0,
      title: 'Piłkarzyki',
      type: 'worldwide',
      date: '21.02.2023',
      hour: '21:37',
      address: 'Warszawa, Cybernetyki 9',
      participation: 'past',
      hashtags: '#dupa #dobrazabawa #wokr #envelo #aaaaaaaAAAAA',
      mapCords: [52.2297, 21.0122],
    },
    {
      id: 1,
      title: 'Piwo pod żabką',
      type: 'public',
      date: '02.03.2023',
      hour: '11:59',
      address: 'Kraków, Czerwone Maki 49A',
      participation: 'active',
      hashtags: '#piwo #menel #programista15k',
      mapCords: [50.0647, 19.945],
    },
    {
      id: 2,
      title: 'Wakacje nad morzem',
      type: 'private',
      date: '23.07.2023',
      hour: '16:00',
      address: 'Gdynia, Orłowo',
      participation: 'inactive',
      hashtags: '#słońce #plaża #piwko',
      mapCords: [54.5189, 18.5305],
    },
  ];

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
