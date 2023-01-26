import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './home.component';
import { EditFormComponent } from '../section/subpages/edit-form/edit-form.component';
import { SectionEffects } from '../section/store/section.effects';
import { sectionDetailsReducer, sectionReducer } from '../section/store/section.reducer';
import { SectionMembersComponent } from '../section';

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
        EDIT: 'edit',
      },
    },
    ALL: 'sections',
    MY: 'sections/my',
    OWNED: 'sections/owned',
    ADD: 'section/add',
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
    EffectsModule.forFeature([SectionEffects]),
    RouterModule.forChild([
      {
        path: HOME_PATHS.DEFAULT,
        component: HomeComponent,
        children: [],
      },
      {
        path: HOME_PATHS.EVENT.SINGLE.CORE,
        component: HomeComponent,
        children: [
          {
            path: HOME_PATHS.EVENT.SINGLE.SUBPAGES.PARTICIPANTS,
            component: HomeComponent,
            title: 'Uczestnicy',
          }
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
          {
            path: HOME_PATHS.SECTION.SINGLE.SUBPAGES.EDIT,
            component: EditFormComponent
          }
        ],
      },
    ]),
  ],
})
export default class HomeModule {}
