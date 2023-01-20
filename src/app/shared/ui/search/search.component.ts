import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIconModule, MatInputModule],
  template: `
    <div class="search">
      <input matInput placeholder="Wyszukaj" />
      <div class="icon">
        <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="search"></mat-icon>
      </div>
    </div>
  `,
  styles: [
    `
      input {
        border: solid 2px var(--primaryDark);
        border-radius: 20px;
        height: 40px;
        padding-left: 10px;
        width: 100%;
      }
      .search {
        position: relative;
        width: 300px;
      }
      div {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .icon {
        position: absolute;
        right: 5%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {}
