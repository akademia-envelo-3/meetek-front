import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { API_URL, IS_PRODUCTION } from '@core/env.token';
import { environment } from 'src/environment';
import { noProductionGuard } from '@shared/no-production.guard';
import { userReducer } from './core/store/user.reducer';
import { UserEffects } from '@core/store/user.effects';
import { UserState } from '@core/store/user.interfaces';
import { APP_PATHS } from './app-paths';
import { TokenInterceptorProvider } from '@shared/interceptors';
import { HttpErrorInterceptorProvider } from '@shared/interceptors';

export interface AppState {
  user?: UserState;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({
      user: userReducer,
    }),
    EffectsModule.forRoot([UserEffects]),
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
            path: APP_PATHS.AUTH,
            loadChildren: () => import('./features/auth/auth.module'),
          },
          {
            path: APP_PATHS.THEME,
            canMatch: [noProductionGuard],
            loadComponent: () => import('./core/theme.component'),
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
    CookieService,
    TokenInterceptorProvider,
    HttpErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
