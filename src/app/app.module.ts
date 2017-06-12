import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import {NavbarComponent} from './authenticated/navbar/navbar.component';
import {DashboardComponent} from './authenticated/dashboard/dashboard.component';
import {LandingPageNavbarComponent} from './landing-page/navbar/landing-page-navbar.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SignUpFormComponent} from './landing-page/sign-up-form/sign-up-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LandingPageComponent,
    LandingPageNavbarComponent,
    SignUpFormComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
