import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {AccountTokens} from "../../models/AccountTokens";

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
  accountTokens: AccountTokens;

  constructor(private accountService: AccountService) {
    this.accountService = accountService;
  }

  submitSignUpForm() {
    console.log('in submit sign up form');
    this.accountService
      .createAccount(this.signupEmail, this.signupPassword)
      .subscribe(accountTokens => this.accountTokens, error => this.errorMsg);
  }

  isPasswordMatch() {
    if (this.signupPassword !== this.signupConfirmPassword) {
      return false;
    } else {
      return true;
    }
  }
}
