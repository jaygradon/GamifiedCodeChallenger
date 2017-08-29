import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AccountTokens} from '../models/AccountTokens';
import {UserData} from '../models/UserData';

@Injectable()
export class AccountService {

  route = `http://localhost:5000/api/account`;
  route_userData = `http://localhost:5000/api/userdata`;
  route_serial = `http://localhost:5000/api/userdata/serial`;
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  createAccount(email: string, password: string): Observable<AccountTokens> {
    const route = this.route + '/register';
    return this.http
      .post(route, {email, password}, this.headers)
      .map(response => response.json() as AccountTokens);
  }

  login(email: string, password: string): Observable<AccountTokens> {
    const route = this.route + '/signin';
    return this.http
      .post(route, JSON.stringify({email, password}), this.options)
      .map(response => response.json() as AccountTokens);
  }

  getUserData(): Observable<UserData> {
    const route = this.route_userData + '/' + this.decodeUserToken();

    const headers = new Headers({ 'Accept': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    headers.append('Authorization', 'Bearer ' + this.getAuthToken());
    return this.http
      .get(route, options)
      .map(response => response.json() as UserData);
  }

  getSerialStorage(): Observable<UserData> {
    const route = this.route_serial + '/' + this.decodeUserToken();

    const headers = new Headers({ 'Accept': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    headers.append('Authorization', 'Bearer ' + this.getAuthToken());
    return this.http
      .get(route, options)
      .map(response => response.json());
  }

  putSerialStorage(serial: string): Observable<UserData> {
    const route = this.route_serial + '/' + this.decodeUserToken() + '?serial=' + serial;

    const headers = new Headers({ 'Accept': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    headers.append('Authorization', 'Bearer ' + this.getAuthToken());
    return this.http
      .put(route, {}, options)
      .map(response => response.json() as UserData);
  }


  postEmptyUserData(email: string): Observable<UserData> {
    // This method is needed to initialise an empty user data object for the user in the backend
    const route = this.route_userData + '/' + this.decodeUserToken() + '?displayName=' + email;

    const headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.getAuthToken());
    const options = new RequestOptions({ headers: headers });
    return this.http
      .post(route, {}, options)
      .map(response => response.json() as UserData);
  }

  incrementGold(gold: number) {
    const route = this.route_userData + '/gold/' + this.decodeUserToken() + '?gold=' + gold;

    const headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.getAuthToken());
    const options = new RequestOptions({ headers: headers });
    return this.http
      .put(route, {}, options)
      .map(response => response.json() as UserData);
  }

  private decodeUserToken() {
    const userToken = JSON.parse(localStorage.getItem('currentUser')).accountTokens.id_token;
    const payload = userToken.split('.');
    return JSON.parse(atob(payload[1])).id;
  }

  private getAuthToken() {
    return JSON.parse(localStorage.getItem('currentUser')).accountTokens.access_token;
  }
}
