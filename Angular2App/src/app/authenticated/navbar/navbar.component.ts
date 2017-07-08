import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CGAccount} from "../../models/Account";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  router: Router;
  constructor(router: Router) {
    this.router = router;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['landing'], {replaceUrl: true});
  }

  getUserEmail() {
    const account = JSON.parse(localStorage.getItem('currentUser')) as CGAccount;
    return account.email;
  }
}
