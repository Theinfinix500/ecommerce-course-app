import { NgModule, LOCALE_ID, InjectionToken } from '@angular/core';
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
registerLocaleData(localeFR);

export const API_URL = new InjectionToken('API_URL');

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
