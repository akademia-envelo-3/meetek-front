import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  template: `
    <label class="toggle">
      <input
        #toggleCheckbox
        class="toggle-checkbox"
        type="checkbox"
        (change)="onToggleChange(toggleCheckbox.checked)" />
      <div class="toggle-switch"></div>
    </label>
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
        width: 43px;
        height: 22px;
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
        width: 16px;
        height: 16px;
        position: absolute;
        top: 3px;
        left: 3px;
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
        left: 23px;
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
export class ToggleComponent {
  @Output() toggleChange = new EventEmitter<boolean>();

  onToggleChange(isChecked: boolean) {
    this.toggleChange.emit(isChecked);
  }
}
