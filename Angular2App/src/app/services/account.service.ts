import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AccountTokens} from '../models/AccountTokens';

@Injectable()
export class AccountService {

  route = `httP://localhost:5000/api/account`;
  headers: Headers;
  options: RequestOptions;
  redirectUrl: 'dashboard';

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  createAccount(email: string, password: string): Observable<AccountTokens> {
    const route = this.route + '/register';
    return this.http
      .post(route, {email, password}, this.headers)
      .map(response => response.json().data as AccountTokens);
  }

  login(email: string, password: string): Observable<AccountTokens> {
    const route = this.route + '/signin';
    return this.http
      .post(route, JSON.stringify({email, password}), this.options)
      .map(response => response.json().data as AccountTokens);
  }
}
