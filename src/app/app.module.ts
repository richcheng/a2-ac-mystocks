import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

import { HttpModule, Http, RequestOptions } from '@angular/http';

// import { AUTH_PROVIDERS } from 'angular2-jwt';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

import { NgbModule, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

// 3rd party imports
//import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule} from 'angular2-moment';

// Service imports
import { HelperService } from './common/helpers.service';
import { AuthGuard } from './auth.guard';
import { Auth } from './services/auth.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

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
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgbModule.forRoot(),
    routing,
    ToastrModule.forRoot(), // ToastrModule added
    MomentModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },    
    ToastrModule,
    HelperService,
    appRoutingProviders,
    Auth,
    AuthGuard    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
