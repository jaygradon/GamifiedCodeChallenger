import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AccountTokens} from '../models/AccountTokens';

@Injectable()
export class AccountService {

  constructor(private http: Http) {
  }

  createAccount(username: string, password: string): Observable<AccountTokens> {
    const route = `httP://localhost:5000/api/account/register`;
    console.log('got to account service');
    return this.http
      .post(route, {username, password})
      .map(response => response.json().data as AccountTokens);
  }

  login(username: string, password: string): Observable<AccountTokens> {
    const route = `httP://localhost:5000/api/account/signin`;
    console.log('got to account service');
    return this.http
      .post(route, {username, password})
      .map(response => response.json().data as AccountTokens);
  }
}
