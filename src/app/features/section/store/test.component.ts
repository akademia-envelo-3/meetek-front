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
    this.addSection({
      id: 6,
      name: 'Nowa sekcja',
      description: 'nowa sekcja do pilki w kosza',
      isActive: true,
      joinedUsers: [],
      events: [],
      recurringEvents: [],
      sectionOwner: {
        id: 3,
        firstName: '',
        lastName: '',
        mail: '',
        password: '',
        role: 'user',
        ownedEvents: [],
        eventsWithResponse: [],
        ownedGroups: [],
        joinedGroups: [],
        notifications: [],
      },
    });

    console.log(this.store);
  }

  public loadSections(): void {
    this.store.dispatch(sectionActions.sectionActions.getSections());
  }

  public addSection(section: Section): void {
    this.store.dispatch(sectionActions.sectionActions.addSection({ section }));
  }
}
