import {
  NgModule,
  LOCALE_ID,
  InjectionToken,
  APP_INITIALIZER,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';
import { ExampleComponent } from './components/example/example.component';
import { ProductModule } from './features/product/product.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
import { AuthModule } from './auth/auth.module';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthService } from './services/auth.service';
import { catchError, of } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { IsLoggedInDirective } from './directives/is-logged-in.directive';
import { CartComponent } from './components/cart/cart.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

registerLocaleData(localeFR);

export const API_URL = new InjectionToken('API_URL');

function initializeAuth(auth: AuthService) {
  return () => {
    return new Promise<void>((resolve, reject) => {
      auth
        .getUserInfos()
        .pipe(
          catchError((err) => {
            reject(err);
            return of(null);
          })
        )
        .subscribe(() => {
          resolve();
        });
    });
  };
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    ExampleComponent,
    HomeComponent,
    ProductModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    MatMenuModule,
    IsLoggedInDirective,
    CartComponent,
    NgxsModule.forRoot([], {
      developmentMode: true,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
    {
      provide: API_URL,
      useValue: 'http://localhost:1337/api',
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
