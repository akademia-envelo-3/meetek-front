import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryHashtagCardComponent } from '@shared/ui';

import { MatCardModule } from '@angular/material/card';
import { Category } from '../..';

@Component({
  selector: 'app-categories-card',
  standalone: true,
  imports: [MatCardModule, CategoryHashtagCardComponent, NgForOf, NgIf],
  templateUrl: 'categories-card.component.html',
  styleUrls: ['categories-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesCardComponent {
  @Input() categories!: Category[] | null;
  @Input() isAdmin!: boolean | null;

  @Output() activityChange = new EventEmitter<{ active: boolean; id: number }>();
  @Output() modification = new EventEmitter<Category>();

  handleActivityChange(active: boolean, id: number) {
    this.activityChange.emit({ active, id });
  }

  handleModification(category: Category) {
    this.modification.emit(category);
  }
}
