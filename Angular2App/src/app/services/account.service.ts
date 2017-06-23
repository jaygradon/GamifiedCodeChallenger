import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AccountService {

  constructor(private http: Http) { }

  createAccount(username: string, password: string ): Observable<Account> {
    // const route = `api/account/challenge` + id;
    // return this.http
    //   .get(route)
    //   .map(response => response.json().data as Challenge);
    return Observable.create(() => { return; } );
  }
}
