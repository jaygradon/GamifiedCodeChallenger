import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
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
import {SidebarComponent} from './authenticated/dashboard/sidebar/sidebar.component';
import {ChallengesComponent} from './authenticated/challenges/challenges.component';
import {ChallengeComponent} from './authenticated/challenges/challenge/challenge.component';
import {ChallengeService} from "./services/challenge.service";
import {AccountService} from "./services/account.service";

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
    SidebarComponent,
    ChallengesComponent,
    ChallengeComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
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
      },
      {
        path: 'challenges',
        component: ChallengesComponent
      },
      {
        path: 'challenge/:id',
        component: ChallengeComponent
      }
    ], {useHash: true})
  ],
  providers: [ChallengeService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
