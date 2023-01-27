import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SectionCardComponent } from 'src/app/features/section';
import { MemberListItemComponent } from '../features/section/shared/list/list-item/member-list-item.component';
import { MatListModule } from '@angular/material/list';
import { User } from '../features/section/shared/interfaces';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [SectionCardComponent, NgIf, MemberListItemComponent, MatListModule],
  styleUrls: ['./theme.component.scss'],
  template: `
    <h1>Storybook-like route</h1>
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

  user: User = {
    id: 1,
    firstName: 'Ewelina',
    lastName: 'Mężyk',
  };
}
