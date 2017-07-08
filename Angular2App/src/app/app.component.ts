import {Component} from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  noAuthReqUrls = ['/login', '/landing', '/pagenotfound'];
  ifAuthThenRedirectUrls = ['/login', '/landing'];


  constructor(router: Router, private route: ActivatedRoute) {
    router.events.subscribe((val) => {
        if (val instanceof RoutesRecognized) {
          // If trying to go to page that needs authentication but no user is signed in
          if (!this.doesNotRequireAuthentication(val.urlAfterRedirects) && localStorage.getItem('currentUser') === null) {
            router.navigate(['landing'], {replaceUrl: true});
          }

          // If trying to go to a login/signup with already signed in
          if(this.authShouldRedirect(val.urlAfterRedirects) && localStorage.getItem('currentUser') !== null) {
            router.navigate(['/dashboard'], {replaceUrl: true});
          }
        }
      }
    );
  }

  doesNotRequireAuthentication(url: string) {
    for (const unauthUrl of this.noAuthReqUrls) {
      if (url === unauthUrl) {
        return true;
      }
    }
    return false;
  }

  authShouldRedirect(url: string) {
    for (const redirUrl of this.ifAuthThenRedirectUrls) {
      if (url === redirUrl) {
        return true;
      }
    }
    return false;
  }
}

