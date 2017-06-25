import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {AccountTokens} from '../../models/AccountTokens';

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
  accountTokens: AccountTokens;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }


  submitLoginForm() {
    this.accountService
      .login(this.loginEmail, this.loginPassword)
      .subscribe(accountTokens => this.accountTokens = accountTokens, error => this.errorMsg = error);
  }
}
