import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SectionCardComponent } from 'src/app/features/section';
import { ExampleDialogComponent } from '@shared/ui/modals/example dialog/example-dialog.component';
@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [SectionCardComponent, NgIf,ExampleDialogComponent],
  styles: ['.element { margin: 10px;}'],
  template: `
    <h1>Storybook-like route</h1>
    <h3>Dialogi</h3>
    <app-example-dialog></app-example-dialog>
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
}
