import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SectionCardComponent } from 'src/app/features/section';
import { CategoryCardComponent } from '../features/category/shared/category-card/category-card.component';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [SectionCardComponent, CategoryCardComponent, NgIf],
  styles: ['.element { margin: 10px;}'],
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

    <ng-container *ngIf="categoryCard as card">
      <div class="element">
        <app-category-card
          (activityChange)="card.handleActivityChange($event)"
          (modification)="card.handleModification()"
          [name]="'Piwo'"
          [usage]="132"
          [isActive]="card.isActive"></app-category-card>
      </div>
      <div class="element">
        <app-category-card [name]="'Bardzo ciekawa kategoria'" [usage]="12321" [isActive]="true"> </app-category-card>
      </div>
    </ng-container>
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

  categoryCard = {
    isActive: true,
    handleModification: function () {
      console.log('modification');
    },
    handleActivityChange: function (state: boolean) {
      this.isActive = state;
    },
  };
}
