import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

export type SectionActions = 'modification' | 'activation' | 'deactivation';

@Component({
  selector: 'app-section-card[name][numberOfMembers][isActive]',
  standalone: true,
  imports: [NgIf],
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionCardComponent implements OnInit {
  @Input() name!: string;
  @Input() numberOfMembers!: number;
  @Input() isActive!: boolean;

  @Output() modificationEvent = new EventEmitter();
  @Output() activationEvent = new EventEmitter();
  @Output() deactivationEvent = new EventEmitter();

  isModificationButton = false;
  isActivationButton = false;
  isDeactivationButton = false;

  ngOnInit() {
    if (this.modificationEvent.observed) this.isModificationButton = true;
    if (this.activationEvent.observed) this.isDeactivationButton = true;
    if (this.deactivationEvent.observed) this.isActivationButton = true;
  }

  handleBtnClick(e: Event) {
    e.stopPropagation();
    const buttonElement = e.target as HTMLButtonElement;

    if (buttonElement) {
      const action = buttonElement.getAttribute('data-action') as SectionActions;
      this[`${action}Event`].emit();
    }
  }
}
