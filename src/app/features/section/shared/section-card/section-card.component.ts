import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-section-card[name][numberOfMembers][isActive]',
  standalone: true,
  imports: [MatCardModule, NgIf],
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionCardComponent implements OnInit {
  @Input() name!: string;
  @Input() numberOfMembers!: number;
  @Input() isActive!: boolean;

  @Output() modification = new EventEmitter();
  @Output() activation = new EventEmitter();
  @Output() deactivation = new EventEmitter();

  isModificationButton = false;
  isActivationButton = false;
  isDeactivationButton = false;

  ngOnInit() {
    if (this.modification.observed) this.isModificationButton = true;
    if (this.activation.observed) this.isDeactivationButton = true;
    if (this.deactivation.observed) this.isActivationButton = true;
  }
}
