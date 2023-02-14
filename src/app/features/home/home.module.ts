import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
} from '../section';
import { TestComponent } from '@shared/test/test.component';
import { TestWithRouterComponent } from '@shared/test/test-router.component';
import { UserEffects } from '@core/store/user.effects';
import { EditFormComponent } from '../section/subpages/edit-form';

@NgModule({
  imports: [
    StoreModule.forFeature('sections', sectionReducer),
    StoreModule.forFeature('sectionDetails', sectionDetailsReducer),
    StoreModule.forFeature('users', sectionAllUsersReducer),
    EffectsModule.forFeature([SectionEffects, UserEffects]),
    RouterModule.forChild([
      {
        path: HOME_PATHS.DEFAULT,
        component: HomeComponent,
        children: [
          { path: HOME_PATHS.EVENTS.SINGLE.CORE, component: TestComponent, children: [] },
          { path: HOME_PATHS.EVENTS.ALL, component: TestComponent },
          { path: HOME_PATHS.EVENTS.MY, component: TestComponent },
          { path: HOME_PATHS.EVENTS.OWNED, component: TestComponent },
          { path: HOME_PATHS.EVENTS.ADD, component: TestComponent },
          {
            path: HOME_PATHS.SECTIONS.SINGLE.CORE,
            component: TestWithRouterComponent, //todo: zmienić, jak już będziemy mieli komponent dla sekcji task FT017 https://github.com/akademia-envelo-3/meetek-front/issues/18
            children: [
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
          { path: HOME_PATHS.CATEGORIES, component: TestComponent },
          { path: HOME_PATHS.HASHTAGS, component: TestComponent },
          { path: HOME_PATHS.NOTIFICATIONS, component: TestComponent },
          { path: HOME_PATHS.REQUEST_BOX, component: TestComponent },
          { path: HOME_PATHS.MEENDER, component: TestComponent },
        ],
      },
    ]),
  ],
})
export default class HomeModule {}
