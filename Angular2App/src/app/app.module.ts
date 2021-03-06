import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {NavbarComponent} from './authenticated/navbar/navbar.component';
import {DashboardComponent} from './authenticated/dashboard/dashboard.component';
import {LandingPageNavbarComponent} from './landing-page/navbar/landing-page-navbar.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SignUpFormComponent} from './landing-page/sign-up-form/sign-up-form.component';
import {LoginComponent} from './login/login.component';
import {LoginFormComponent} from './login/login-form/login-form.component';
import {SidebarComponent} from './authenticated/dashboard/sidebar/sidebar.component';
import {ChallengesComponent} from './authenticated/challenges/challenges.component';
import {ChallengeComponent} from './authenticated/challenges/challenge/challenge.component';
import {AccountService} from './services/account.service';
import {ChallengeService} from './services/challenge.service';
import {PageNotFoundComponent} from './404notfound/pagenotfound.component';
import {AppRoutingModule} from './app-routing.module';
import {TestingService} from './services/testing.service';
import {CodemirrorModule} from 'ng2-codemirror';
import {SettlementComponent} from './authenticated/settlement/settlement.component';
import { LeaderboardsComponent } from './authenticated/leaderboards/leaderboards.component';

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
    ChallengeComponent,
    PageNotFoundComponent,
    SettlementComponent,
    LeaderboardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    CodemirrorModule
  ],
  providers: [ChallengeService, AccountService, TestingService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
