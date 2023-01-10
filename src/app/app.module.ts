import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { API_URL, IS_PRODUCTION } from '@core/env.token';
import { environment } from 'src/environment';
import { RouterModule } from '@angular/router';
import { noProductionGuard } from '@shared/no-production.guard';
import { sectionReducer } from './features/section/store/section.reducer';
import { TestComponent } from './features/section/store/test.component';
import { SectionEffects } from './features/section/store/section.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TestComponent,
    StoreModule.forRoot({ sections: sectionReducer }),
    EffectsModule.forRoot([SectionEffects]),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () => import('./features/home/home.module'),
          },
          {
            path: 'auth',
            loadChildren: () => import('./features/auth/auth.module'),
          },
          {
            path: 'theme',
            canMatch: [noProductionGuard],
            loadComponent: () => import('./core/theme.component'),
          },
          {
            path: 'test',
            component: TestComponent,
          },
          {
            path: '**',
            redirectTo: '',
          },
        ],
      },
    ]),
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
    {
      provide: IS_PRODUCTION,
      useValue: environment.production,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
