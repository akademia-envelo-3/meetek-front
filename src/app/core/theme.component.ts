import { NgIf } from '@angular/common';
import { CategoryHashtagCardComponent } from '../features/category/shared/category-hashtag-card/category-hashtag-card.component';
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
@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [
    CategoryHashtagCardComponent,
    SectionCardComponent,
    NgIf,
    MemberListItemComponent,
    MatListModule,
    ToggleComponent,
    HeaderComponent,
    SearchComponent,
    MatDialogModule,
    MatButtonModule,
  ],
  styles: ['.element { margin: 10px;}'],
  styleUrls: ['./theme.component.scss'],
  template: `
    <h1>Storybook-like route</h1>
    <h2>Header</h2>
    <app-header></app-header>
    <h3>Dialogi</h3>
    <div class="element">
      <button mat-raised-button (click)="openDialog()">Dialog z inputem</button>
      <button mat-raised-button (click)="openDialog2()">Dialog z przyciskami</button>
    </div>
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

    <h2>Category/hashtag card</h2>
    <ng-container *ngIf="categoryCard as card">
      <div class="element">
        <app-category-hashtag-card
          (activityChange)="card.handleActivityChange($event)"
          (modification)="card.handleModification()"
          [name]="'Piwo'"
          [usage]="132"
          [isActive]="card.isActive"></app-category-hashtag-card>
      </div>
      <div class="element">
        <app-category-hashtag-card [name]="'Bardzo ciekawa kategoria'" [usage]="12321" [isActive]="false">
        </app-category-hashtag-card>
      </div>
      <div class="element">
        <app-category-hashtag-card [name]="'#popcorn'" [usage]="328" [isActive]="true"> </app-category-hashtag-card>
      </div>
    </ng-container>
    <hr />

    <h2>Toggle</h2>
    <div class="element">
      <app-toggle [isActive]="false" (toggleChange)="onToggleChange($event)"></app-toggle>
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
  // -- SECTION CARD --
  sectionCard = {
    isActive: true,
    handleModification: function () {
      console.log('modification');
    },
    handleActivation: function () {
      this.isActive = true;
    },
    handleDeactivation: function () {
      this.isActive = false;
    },
  };

  // -- CATEGORY CARD --
  categoryCard = {
    isActive: true,
    handleModification: function () {
      console.log('modification');
    },
    handleActivityChange: function (state: boolean) {
      if (this.isActive !== state) console.log(state ? 'activation' : 'deactivation');
      this.isActive = state;
    },
  };

  // -- TOGGLE --
  onToggleChange(isChecked: boolean) {
    console.log(isChecked);
  }

  // -- LIST ITEM --
  user: User = {
    id: 1,
    firstName: 'Ewelina',
    lastName: 'Mężyk',
  };

  // -- DIALOG --
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
