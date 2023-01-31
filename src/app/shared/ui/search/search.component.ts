import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search[placeholderValue]',
  standalone: true,
  imports: [MatIconModule, MatInputModule],
  template: `
    <div class="search">
      <input matInput [placeholder]="placeholderValue" />
      <div class="icon">
        <mat-icon>search</mat-icon>
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
        outline: none;
        font-size: var(--S_font-size);
      }
      *:focus {
        outline: none;
        border: solid 2px var(--secondaryDark);
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
        cursor: pointer;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Input() placeholderValue!: string;
}
