import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './home.component';
import { SectionEffects, sectionReducer, sectionDetailsReducer, SectionMembersComponent } from '../section';
import { HOME_PATHS } from './home-paths';
import { TestComponent } from '@shared/test/test.component';
import { TestWithRouterComponent } from '@shared/test/test-router.component';

@NgModule({
  imports: [
    StoreModule.forFeature('sections', sectionReducer),
    StoreModule.forFeature('sectionDetails', sectionDetailsReducer),
    EffectsModule.forFeature([SectionEffects]),
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
            ],
          },
          { path: HOME_PATHS.SECTIONS.ALL, component: TestComponent },
          { path: HOME_PATHS.SECTIONS.MY, component: TestComponent },
          { path: HOME_PATHS.SECTIONS.OWNED, component: TestComponent },
          { path: HOME_PATHS.SECTIONS.ADD, component: TestComponent },
          { path: HOME_PATHS.CATEGORIES, component: TestComponent },
          { path: HOME_PATHS.HASHTAGS, component: TestComponent },
          { path: HOME_PATHS.NOTIFICATIONS, component: TestComponent },
          { path: HOME_PATHS.REQUEST_BOX, component: TestComponent },
          { path: HOME_PATHS.MEENDER, component: TestComponent },
        ],
      },
      {
        path: HOME_PATHS.SECTIONS.SINGLE.CORE,
        component: HomeComponent, //todo: zmienić, jak już będziemy mieli komponent dla sekcji task FT017 https://github.com/akademia-envelo-3/meetek-front/issues/18
        children: [
          {
            path: HOME_PATHS.SECTIONS.SINGLE.SUBPAGES.MEMBERS,
            component: SectionMembersComponent,
          },
        ],
      },
    ]),
  ],
})
export default class HomeModule {}
