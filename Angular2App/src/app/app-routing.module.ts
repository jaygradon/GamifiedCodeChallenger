import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {DashboardComponent} from './authenticated/dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {ChallengesComponent} from './authenticated/challenges/challenges.component';
import {PageNotFoundComponent} from './404notfound/pagenotfound.component';
import {NgModule} from '@angular/core';
import {SettlementComponent} from './authenticated/settlement/settlement.component';
import {LeaderboardsComponent} from './authenticated/leaderboards/leaderboards.component';

const appRoutes: Routes = [
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
    path: 'settlement',
    component: SettlementComponent
  },
  {
    path: 'leaderboards',
    component: LeaderboardsComponent
  },
  {
    path: 'pagenotfound',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'pagenotfound'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true, useHash: true} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
