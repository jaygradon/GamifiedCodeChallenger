import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {CGAccount} from '../../models/Account';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
  providers: [AccountService]
})
export class SignUpFormComponent {

  signupEmail = '';
  signupPassword = '';
  signupConfirmPassword = '';
  errorMsg: string;
  isSigningUp = false;
  router: Router;

  constructor(private accountService: AccountService, router: Router) {
    this.accountService = accountService;
    this.router = router;
  }

  submitSignUpForm() {
    this.isSigningUp = true;
    this.accountService
      .createAccount(this.signupEmail, this.signupPassword)
      .subscribe(
        accountTokens => {
          this.isSigningUp = false;
          localStorage.setItem('currentUser', JSON.stringify(new CGAccount(this.signupEmail, this.signupPassword, accountTokens)));
          this.accountService.postEmptyUserData(this.signupEmail).subscribe(res => {
            console.log('empty user data posted' + res);
            this.router.navigate(['dashboard'], {replaceUrl: true});
          });
        },
        error => {
          this.errorMsg = error._body;
        }
      );
  }

  isPasswordMatch() {
    if (this.signupPassword !== this.signupConfirmPassword) {
      return false;
    } else {
      return true;
    }
  }

  isWaitingForResponse() {
    if (this.isSigningUp === true && localStorage.getItem('currentUser') === null) {
      return true;
    }
    return false;
  }

  private getErrorMessage(error) {
    if (error.status === 400 || error.status === 401) {
      this.errorMsg = 'Invalid username or password.';
    } else {
      this.errorMsg = 'An unexpected error occurred.';
    }
  }

}
