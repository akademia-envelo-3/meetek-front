import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { eventReducer } from '../event';
import { EventEffects } from '../event/store/event.effects';
import { HOME_PATHS } from './home-paths';
import { HomeComponent } from './home.component';
import {
  SectionEffects,
  sectionReducer,
  sectionDetailsReducer,
  SectionFormComponent,
  SectionMembersComponent,
  sectionAllUsersReducer,
  SectionsComponent,
  SectionDetailsComponent,
} from '../section';
import { TestComponent } from '@shared/test/test.component';
import { UserEffects } from '@core/store/user.effects';
import { EditFormComponent } from '../section/subpages/edit-form';
import { CategoriesComponent } from '../categories';
import { EventDetailsComponent } from '../event/subpages/event-details/event-details.component';

@NgModule({
  imports: [
    StoreModule.forFeature('sections', sectionReducer),
    StoreModule.forFeature('sectionDetails', sectionDetailsReducer),
    StoreModule.forFeature('events', eventReducer),
    EffectsModule.forFeature([EventEffects]),
    StoreModule.forFeature('users', sectionAllUsersReducer),
    EffectsModule.forFeature([SectionEffects, UserEffects]),
    RouterModule.forChild([
      {
        path: HOME_PATHS.DEFAULT,
        component: HomeComponent,
        children: [
          { 
            path: HOME_PATHS.EVENTS.SINGLE.CORE, 
            children: [
              {
                path: '',
                component: EventDetailsComponent,
                pathMatch: 'full'
              }
            ] 
          },
          { path: HOME_PATHS.EVENTS.ALL, component: TestComponent },
          { path: HOME_PATHS.EVENTS.MY, component: TestComponent },
          { path: HOME_PATHS.EVENTS.OWNED, component: TestComponent },
          { path: HOME_PATHS.EVENTS.ADD, component: TestComponent },
          {
            path: HOME_PATHS.SECTIONS.SINGLE.CORE,
            children: [
              {
                path: '',
                component: SectionDetailsComponent,
                pathMatch: 'full',
              },
              {
                path: HOME_PATHS.SECTIONS.SINGLE.SUBPAGES.MEMBERS,
                component: SectionMembersComponent,
              },
              {
                path: HOME_PATHS.SECTIONS.SINGLE.SUBPAGES.EDIT,
                component: EditFormComponent,
              },
            ],
          },
          { path: HOME_PATHS.SECTIONS.ALL, component: SectionsComponent },
          { path: HOME_PATHS.SECTIONS.MY, component: TestComponent },
          { path: HOME_PATHS.SECTIONS.OWNED, component: TestComponent },
          { path: HOME_PATHS.SECTIONS.ADD, component: SectionFormComponent },
          { path: HOME_PATHS.CATEGORIES, component: CategoriesComponent },
          { path: HOME_PATHS.HASHTAGS, component: TestComponent },
          { path: HOME_PATHS.NOTIFICATIONS, component: TestComponent },
          { path: HOME_PATHS.REQUEST_BOX, component: TestComponent },
          { path: HOME_PATHS.MEENDER, component: TestComponent },
        ],
      },
      {
        path: HOME_PATHS.CATEGORIES,
        component: CategoriesComponent,
      },
    ]),
  ],
})
export default class HomeModule {}
