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
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LoginFormComponent} from './login/login-form/login-form.component';
import {SidebarComponent} from "./authenticated/dashboard/sidebar/sidebar.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LandingPageComponent,
    LandingPageNavbarComponent,
    SignUpFormComponent,
    LoginComponent,
    LoginFormComponent,
    SidebarComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'landing', pathMatch: 'full'
      },
      {
        path: 'landing',
        component: LandingPageComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ], {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
