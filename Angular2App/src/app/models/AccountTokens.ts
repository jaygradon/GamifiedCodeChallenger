export class AccountTokens {
  accessToken: string;
  idToken: string;

  constructor(accessToken: string, idToken: string) {
    this.accessToken = accessToken;
    this.idToken = idToken;
  }
}
