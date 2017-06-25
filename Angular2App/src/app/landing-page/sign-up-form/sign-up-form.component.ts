import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {CGAccount} from '../../models/Account';

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
  account: CGAccount;

  constructor(private accountService: AccountService) {
    this.accountService = accountService;
  }

  submitSignUpForm() {
    this.accountService
      .createAccount(this.signupEmail, this.signupPassword)
      .subscribe(
        accountTokens => this.account = new CGAccount(this.signupEmail, this.signupPassword, accountTokens),
        error => this.errorMsg = error
      );
  }

  isPasswordMatch() {
    if (this.signupPassword !== this.signupConfirmPassword) {
      return false;
    } else {
      return true;
    }
  }
}
