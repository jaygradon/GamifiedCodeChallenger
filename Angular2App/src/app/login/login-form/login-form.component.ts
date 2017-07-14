import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {CGAccount} from '../../models/Account';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [AccountService]
})

export class LoginFormComponent {
  accountService: AccountService;
  router: Router;

  loginEmail = '';
  loginPassword = '';

  errorMsg: string;

  isLoggingIn = false;

  constructor(accountService: AccountService, router: Router) {
    this.accountService = accountService;
    this.router = router;
  }


  submitLoginForm() {
    this.isLoggingIn = true;
    this.errorMsg = null;
    this.accountService
      .login(this.loginEmail, this.loginPassword)
      .subscribe(
        accountTokens => {
          localStorage.setItem('currentUser', JSON.stringify(new CGAccount(this.loginEmail, this.loginPassword, accountTokens)));
          this.isLoggingIn = false;
          this.router.navigate(['dashboard'], {replaceUrl: true});
        },
        error => {
          this.getErrorMessage(error);
          this.isLoggingIn = false;
          console.log(error);
        });
  }

  // helper methods

  isWaitingForResponse() {
    if (this.isLoggingIn === true && localStorage.getItem('currentUser') === null) {
      return true;
    }
    return false;
  }

  getErrorMessage(error) {
    if (error.status === 400 || error.status === 401) {
      this.errorMsg = 'Invalid username or password.';
    } else {
      this.errorMsg = 'An unexpected error occurred.';
    }
  }
}
