import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {DashboardComponent} from './authenticated/dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {ChallengesComponent} from './authenticated/challenges/challenges.component';
import {ChallengeComponent} from './authenticated/challenges/challenge/challenge.component';
import {PageNotFoundComponent} from './404notfound/pagenotfound.component';
import {NgModule} from '@angular/core';

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
    path: 'challenge/:id',
    component: ChallengeComponent
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
