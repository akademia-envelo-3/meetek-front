import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HomeComponent } from './home.component';

import { SectionEffects, sectionReducer, SectionFormComponent, sectionDetailsReducer } from '../section';
import { UserEffects } from '@core/store/user.effects';
import { SectionMembersComponent } from '../section/subpages/section-members.component';

export const HOME_PATHS = {
  DEFAULT: '',
  EVENT: {
    SINGLE: {
      CORE: 'event/:id',
      SUBPAGES: {
        HOME: '',
        PARTICIPANTS: 'participants',
        CHAT: 'chat',
        ATTACHMENTS: 'attachments',
      },
    },
    ALL: 'events',
    MY: 'events/my',
    OWNED: 'events/owned',
    ADD: 'event/add',
    REDO: 'event/:id/redo',
    EDIT: 'event/:id/edit',
  },
  SECTION: {
    SINGLE: {
      CORE: 'section/:id',
      SUBPAGES: {
        HOME: '',
        MEMBERS: 'members',
      },
    },
    ALL: 'sections',
    MY: 'sections/my',
    OWNED: 'sections/owned',
    ADD: 'section/add',
    EDIT: 'section/:id/edit',
  },
  CATEGORIES: 'categories',
  HASHTAGS: 'hashtags',
  NOTIFICATIONS: 'notifications',
  REQUEST_BOX: 'request-box',
  MEENDER: 'meender',
} as const;

@NgModule({
  imports: [
    StoreModule.forFeature('sections', sectionReducer),
    StoreModule.forFeature('sectionDetails', sectionDetailsReducer),
    EffectsModule.forFeature([SectionEffects, UserEffects]),
    RouterModule.forChild([
      {
        path: HOME_PATHS.DEFAULT,
        component: HomeComponent,
        children: [],
      },
      {
        path: HOME_PATHS.SECTION.ADD,
        component: SectionFormComponent,
      },
      {
        path: HOME_PATHS.EVENT.SINGLE.CORE,
        component: HomeComponent,
        children: [
          {
            path: HOME_PATHS.EVENT.SINGLE.SUBPAGES.PARTICIPANTS,
            component: HomeComponent,
            title: 'Uczestnicy',
          },
        ],
      },
      {
        path: HOME_PATHS.SECTION.SINGLE.CORE,
        component: HomeComponent, //todo: zmienić, jak już będziemy mieli komponent dla sekcji task FT017 https://github.com/akademia-envelo-3/meetek-front/issues/18
        children: [
          {
            path: HOME_PATHS.SECTION.SINGLE.SUBPAGES.MEMBERS,
            component: SectionMembersComponent,
          },
        ],
      },
    ]),
  ],
})
export default class HomeModule {}
