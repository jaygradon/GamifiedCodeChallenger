import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Challenge} from '../models/Challenge';

@Injectable()
export class TestingService {
  route = `http://localhost:5000/api/test`;

  constructor(private http: Http) {
  }

  testChallenge(challenge: Challenge) {
    const headers = new Headers({'Accept': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const user = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('Authorization', 'Bearer ' + user.accountTokens.access_token);
    const testRoute = this.route + '/run/' + challenge.id;
    return this.http
      .post(testRoute, challenge, options)
      .map(res => res.json());
  }
}
