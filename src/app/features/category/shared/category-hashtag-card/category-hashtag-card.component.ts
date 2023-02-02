import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { ToggleComponent } from '@shared/ui/toggle/toggle.component';
import { BehaviorSubject, debounce, skip, timer } from 'rxjs';

@Component({
  selector: 'app-category-hashtag-card[name][usage][isActive]',
  standalone: true,
  imports: [ToggleComponent, MatCardModule, MatIconModule, NgIf],
  templateUrl: './category-hashtag-card.component.html',
  styleUrls: ['./category-hashtag-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryHashtagCardComponent implements OnInit {
  @Input() name!: string;
  @Input() usage!: number;
  @Input() isActive!: boolean;

  @Output() activityChange = new EventEmitter<boolean>();
  @Output() modification = new EventEmitter();

  private toggleActivity$$ = new BehaviorSubject<boolean>(this.isActive);

  isActivityToggle = false;
  isModification = false;

  ngOnInit() {
    if (this.activityChange.observed) this.isActivityToggle = true;
    if (this.modification.observed) this.isModification = true;

    this.toggleActivity$$
      .pipe(
        skip(1),
        debounce(() => timer(1500))
      )
      .subscribe(state => this.activityChange.emit(state));
  }

  handleToggleChange(state: boolean) {
    this.toggleActivity$$.next(state);
  }
}
