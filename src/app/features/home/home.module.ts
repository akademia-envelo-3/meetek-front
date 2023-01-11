import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

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
          },
        ],
      },
    ]),
  ],
})
export default class HomeModule {}
