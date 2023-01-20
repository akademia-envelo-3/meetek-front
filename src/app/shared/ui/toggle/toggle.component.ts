import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  template: `
    <div class="rabatCode">
      <label class="toggle">
        <input class="toggle-checkbox" type="checkbox" />
        <div class="toggle-switch"></div>
      </label>
    </div>
  `,
  styles: [
    `
      .toggle {
        cursor: pointer;
        display: inline-block;
      }
      .toggle-switch {
        display: inline-block;
        background: var(--error);
        border-radius: 16px;
        width: 58px;
        height: 32px;
        position: relative;
        vertical-align: middle;
        transition: background 0.25s;
      }
      .toggle-switch:before,
      .toggle-switch:after {
        content: '';
      }
      .toggle-switch:before {
        display: block;
        background: linear-gradient(to bottom, #fff 0%, #eee 100%);
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
        width: 24px;
        height: 24px;
        position: absolute;
        top: 4px;
        left: 4px;
        transition: left 0.25s;
      }
      .toggle:hover .toggle-switch:before {
        background: linear-gradient(to bottom, #fff 0%, #fff 100%);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
      }
      .toggle-checkbox:checked + .toggle-switch {
        background: var(--success);
      }
      .toggle-checkbox:checked + .toggle-switch:before {
        left: 30px;
      }
      .toggle-checkbox {
        position: absolute;
        visibility: hidden;
      }
      .toggle-label {
        margin-left: 5px;
        position: relative;
        top: 2px;
        font-size: 15px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent {}
