import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {CGAccount} from '../../models/Account';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [AccountService]
})

export class LoginFormComponent {
  accountService: AccountService;

  loginEmail = '';
  loginPassword = '';

  errorMsg: string;
  account: CGAccount;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }


  submitLoginForm() {
    this.accountService
      .login(this.loginEmail, this.loginPassword)
      .subscribe(accountTokens => this.account = new CGAccount(this.loginEmail, this.loginPassword, accountTokens),
        error => this.errorMsg = error);
  }
}
