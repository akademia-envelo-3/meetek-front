import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

export const paths = {
  default: '',
  event: {
    single: 'event/:id',
    all: 'events',
    my: 'events/my',
    owned: 'events/owned',
    add: 'event/add',
    redo: 'event/:id/redo',
    edit: 'event/:id/edit',
  },
  section: {
    single: 'section/:id',
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
        path: paths.default,
        component: HomeComponent,
        children: [],
      },
    ]),
  ],
})
export default class HomeModule {}
