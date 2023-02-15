import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { BehaviorSubject, debounceTime, distinctUntilChanged, skip, takeUntil } from 'rxjs';

import { ToggleComponent } from '@shared/ui/toggle/toggle.component';
import { useDestroy } from '@shared/hooks';

@Component({
  selector: 'app-category-hashtag-card[name][isActive]',
  standalone: true,
  imports: [ToggleComponent, MatCardModule, MatIconModule, NgIf, NgClass],
  templateUrl: './category-hashtag-card.component.html',
  styleUrls: ['./category-hashtag-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryHashtagCardComponent implements OnInit {
  @Input() name!: string;
  @Input() usage?: number;
  @Input() isActive!: boolean;

  @Output() activityChange = new EventEmitter<boolean>();
  @Output() modification = new EventEmitter();

  private toggleActivity$$ = new BehaviorSubject<boolean>(this.isActive);
  private destroy$ = useDestroy();

  isActivityToggle = false;
  isModification = false;

  ngOnInit() {
    if (this.activityChange.observed) this.isActivityToggle = true;
    if (this.modification.observed) this.isModification = true;

    this.toggleActivity$$
      .pipe(skip(1), debounceTime(1500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(state => this.activityChange.emit(state));
  }

  handleToggleChange(state: boolean) {
    this.toggleActivity$$.next(state);
  }
}
