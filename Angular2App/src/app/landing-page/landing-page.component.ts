import {Component} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {

  isUserSignedIn() {
    if(localStorage.getItem('currentUser') !== null) {
      return true;
    }
    return false;
  }

}
