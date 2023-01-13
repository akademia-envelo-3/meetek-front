import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SectionCardComponent } from 'src/app/features/section';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [SectionCardComponent, NgIf],
  styles: ['.element { margin: 10px;}'],
  template: `
    <h1>Storybook-like route</h1>
    <hr />
    <h2>Section card</h2>
    <ng-container *ngIf="sectionCard as card">
      <div class="element">
        <app-section-card
          (modificationEvent)="card.handleModification()"
          (activationEvent)="card.handleActivation()"
          (deactivationEvent)="card.handleDeactivation()"
          [name]="'Sekcja szalonych pływaków i pływaczek'"
          [numberOfMembers]="31842"
          [isActive]="card.isActive"></app-section-card>
      </div>
      <div class="element">
        <app-section-card
          (modificationEvent)="card.handleModification()"
          [name]="'Piłkarze'"
          [numberOfMembers]="2"
          [isActive]="false"></app-section-card>
      </div>
      <div class="element">
        <app-section-card [name]="'Rowerzyści'" [numberOfMembers]="24" [isActive]="true"></app-section-card>
      </div>
    </ng-container>
    <hr />
  `,
})
export default class ThemeComponent {
  sectionCard = {
    isActive: true,
    handleModification: function () {
      console.log('modification...');
    },
    handleActivation: function () {
      console.log('activation...');
      this.isActive = true;
    },
    handleDeactivation: function () {
      console.log('deactivation...');
      this.isActive = false;
    },
  };
}
