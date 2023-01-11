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
    // this.addSection({
    //   id: 7,
    //   name: 'Nowa sekcja',
    //   description: 'nowa sekcja do pilki w kosza',
    //   isActive: true,
    //   joinedUsers: [],
    //   events: [],
    //   recurringEvents: [],
    //   sectionOwner: {
    //     id: 4,
    //     firstName: '',
    //     lastName: '',
    //     mail: '',
    //     password: '',
    //     role: 'user',
    //     ownedEvents: [],
    //     eventsWithResponse: [],
    //     ownedGroups: [],
    //     joinedGroups: [],
    //     notifications: [],
    //   },
    // });
    this.loadSections();

    // this.editSection({
    //   id: 6,
    //   name: 'Szósta sekcja znowuu updatowana',
    //   description: 'nowa sekcja do pilki w kosza',
    //   isActive: true,
    //   joinedUsers: [],
    //   events: [],
    //   recurringEvents: [],
    //   sectionOwner: {
    //     id: 4,
    //     firstName: '',
    //     lastName: '',
    //     mail: '',
    //     password: '',
    //     role: 'user',
    //     ownedEvents: [],
    //     eventsWithResponse: [],
    //     ownedGroups: [],
    //     joinedGroups: [],
    //     notifications: [],
    //   },
    // });

    this.activateSection(6);
    console.log(this.store);

    // this.deactivateSection(6);
  }

  public loadSections(): void {
    this.store.dispatch(sectionActions.sectionActions.getSections());
  }

  public activateSection(sectionId: number): void {
    this.store.dispatch(sectionActions.sectionActions.activateSection({ sectionId }));
  }

  public deactivateSection(sectionId: number): void {
    this.store.dispatch(sectionActions.sectionActions.deactivateSection({ sectionId }));
  }
  // public addSection(section: Section): void {
  //   this.store.dispatch(sectionActions.sectionActions.addSection({ section }));
  // }

  // public editSection(section: Section): void {
  //   this.store.dispatch(sectionActions.sectionActions.editSection({ section }));
  // }
}
