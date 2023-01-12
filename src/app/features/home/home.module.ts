import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './home.component';
import { SectionEffects, sectionReducer } from '../section';

@NgModule({
  imports: [
    StoreModule.forFeature('sections', sectionReducer),
    EffectsModule.forFeature([SectionEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [],
      },
    ]),
  ],
})
export default class HomeModule {}
