import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

import { NgbModule, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyCQ7OQk8gLkCgiqh2KGefTgOa4O5oZCvo4',
  authDomain: 'stocks-f03e1.firebaseapp.com',
  databaseURL: 'https://stocks-f03e1.firebaseio.com',
  storageBucket: 'stocks-f03e1.appspot.com'
};

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavbarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgbModule.forRoot(),
    routing
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
