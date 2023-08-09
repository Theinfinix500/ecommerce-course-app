import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';
import { ExampleComponent } from './components/example/example.component';
import { ProductModule } from './features/product/product.module';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
registerLocaleData(localeFR);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    ExampleComponent,
    HomeComponent,
    ProductModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
