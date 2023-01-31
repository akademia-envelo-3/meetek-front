import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-card[name][usage][isActive]',
  standalone: true,
  imports: [MatCardModule, MatIconModule, FormsModule, NgIf],
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent implements OnInit {
  @Input() name!: string;
  @Input() usage!: number;
  @Input() isActive!: boolean;

  @Output() activityChange = new EventEmitter<boolean>();
  @Output() modification = new EventEmitter();

  isActivityToggle = false;
  isModification = false;

  ngOnInit() {
    if (this.activityChange.observed) this.isActivityToggle = true;
    if (this.modification.observed) this.isModification = true;
  }

  handleActivityChange(event: Event) {
    const element = event.target as HTMLInputElement;

    this.activityChange.emit(element.checked);
    element.checked = !element.checked;
  }
}
