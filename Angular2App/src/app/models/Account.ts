
import {AccountTokens} from './AccountTokens';
export class CGAccount {
  email: string;
  password: string;
  accountTokens: AccountTokens;

  constructor(email: string, password: string, accountTokens: AccountTokens) {
    this.email = email;
    this.password = password;
    this.accountTokens = accountTokens;
  }
}
