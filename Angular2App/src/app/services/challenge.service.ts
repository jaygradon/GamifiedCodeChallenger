import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Challenge} from '../models/Challenge';

@Injectable()
export class ChallengeService {
  route = `http://localhost:5000/api/challenge`;

  constructor(private http: Http) {
  }

  getChallenges(): Observable<Challenge[]> {
    const headers = new Headers({ 'Accept': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const user =  JSON.parse(localStorage.getItem('currentUser'));
    headers.append('Authorization', 'Bearer ' + user.accountTokens.access_token);
    const challengesRoute = this.route + '?start=0&end=1000';
    return this.http
      .get(challengesRoute, options)
      .map(res => res.json() as Challenge[]);
  }
}
