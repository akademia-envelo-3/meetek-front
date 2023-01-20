import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { SectionActions } from '../section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    application shell

    <router-outlet></router-outlet>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private sectionStore = inject(Store);

  ngOnInit() {
    this.loadSections();
  }

  public loadSections() {
    this.sectionStore.dispatch(SectionActions.getSections());
  }
}
