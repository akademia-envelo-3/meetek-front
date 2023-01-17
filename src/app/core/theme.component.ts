import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MemberListItemComponent } from '../features/section/shared/list/list-item/member-list-item.component';
import { MemberListComponent } from '../features/section/shared/list/member-list/member-list.component';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [MatListModule, MemberListItemComponent, MemberListComponent],
  styleUrls: ['./theme.component.scss'],
  template: `
    <h1>Storybook-like route</h1>
    <hr />
    <h2>List of section participants</h2>
    <mat-list class="list">
      <app-members-list-item [name]="name" [initials]="initials"></app-members-list-item>
    </mat-list>
  `,
})
export default class ThemeComponent {
  name = 'Ania Dąbrowska';
  initials = 'AD';
}
