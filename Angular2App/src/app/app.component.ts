import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  unauthorisedUrls = ['/login', '/landing', '/pagenotfound'];

  constructor(router: Router, private route: ActivatedRoute) {
    router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          if (!this.isUnauthorised(val.urlAfterRedirects) && localStorage.getItem('currentUser') === null) {
            router.navigate(['landing'], {replaceUrl: true});
          }
        }
      }
    );
  }

  isUnauthorised(url: String) {
    for (const unauthUrl of this.unauthorisedUrls) {
      if (url === unauthUrl) {
        return true;
      }
    }
    return false;
  }
}

