import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';

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

  constructor(private accountService: AccountService) {
    this.accountService = accountService;
  }

  submitSignUpForm() {
    this.accountService.createAccount(this.signupEmail, this.signupPassword).subscribe();
  }

  isPasswordMatch() {
    if (this.signupPassword !== this.signupConfirmPassword) {
      return false;
    } else {
      return true;
    }
  }
}
