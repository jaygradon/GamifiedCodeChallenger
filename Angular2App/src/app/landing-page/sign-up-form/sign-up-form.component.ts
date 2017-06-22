import {Component} from '@angular/core';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
})
export class SignUpFormComponent {

  signupEmail = '';
  signupPassword = '';
  signupConfirmPassword = ''

  submitSignUpForm() {
    console.log('Submitting');
  }

  isPasswordMatch() {
    if (this.signupPassword !== this.signupConfirmPassword) {
      return false;
    } else {
      return true;
    }
  }
}
