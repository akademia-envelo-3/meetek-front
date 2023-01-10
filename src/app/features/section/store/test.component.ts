import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import * as sectionActions from '..';
import * as sectionSelectors from '..';
import { Section } from '..';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Sections:</h1>

    {{ allSections$ | async | json }}
  `,
})
export class TestComponent implements OnInit {
  constructor(private store: Store) {}

  public readonly allSections$: Observable<Section[]> = this.store.select(sectionSelectors.selectAllSections);

  ngOnInit() {
    this.loadSections();
    console.log(this.store);
  }

  loadSections(): void {
    this.store.dispatch(sectionActions.sectionActions.getSections());
  }
}
