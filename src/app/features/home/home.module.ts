import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

export const homePaths = {
  default: '',
  event: {
    single: {
      core: 'event/:id',
      subpages: {
        home: '',
        participants: 'participants',
        chat: 'chat',
        attachments: 'attachments',
      },
    },
    all: 'events',
    my: 'events/my',
    owned: 'events/owned',
    add: 'event/add',
    redo: 'event/:id/redo',
    edit: 'event/:id/edit',
  },
  section: {
    single: {
      core: 'section/:id',
      subpages: {
        home: '',
        members: 'members',
      },
    },
    all: 'sections',
    my: 'sections/my',
    owned: 'sections/owned',
    add: 'section/add',
    edit: 'section/:id/edit',
  },
  categories: 'categories',
  hashtags: 'hashtags',
  notifications: 'notifications',
  requestBox: 'request-box',
  meender: 'meender',
};

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: homePaths.default,
        component: HomeComponent,
        children: [],
      },
      {
        path: homePaths.event.single.core,
        component: HomeComponent,
        children: [
          {
            path: homePaths.event.single.subpages.participants,
            component: HomeComponent,
            title: 'Uczestnicy',
          },
        ],
      },
    ]),
  ],
})
export default class HomeModule {}
