import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Challenge} from '../models/Challenge';

@Injectable()
export class ChallengeService {
  challenge: Challenge = {
    id: 1,
    title: 'Reverse a String',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus urna vestibulum erat dignissim pretium. Vestibulum tempor feugiat massa in congue. Vivamus vel purus diam. Aenean cursus condimentum aliquet. Integer posuere mi at mauris hendrerit, ut ullamcorper ante cursus. Quisque velit nibh, tincidunt at sapien quis, volutpat suscipit risus. Mauris at tellus nec purus eleifend dignissim. Suspendisse ut commodo libero. Proin vel consequat orci. Aenean ac nibh ultrices lorem pharetra lobortis elementum vel augue. Nunc ut dignissim lacus, vel convallis tellus. Vestibulum placerat diam mi, vitae iaculis arcu commodo eu. Vestibulum elementum commodo enim id vulputate.Aenean dolor erat, convallis vitae mattis luctus, elementum a turpis. Nulla eget ante dignissim, mattis massa aliquet, rutrum est. Duis cursus lorem eget mattis dictum. Duis efficitur placerat mi, vel imperdiet augue ultricies quis. Nulla molestie ornare est, id volutpat purus dignissim in. Nam fermentum euismod quam, vitae laoreet est maximus sit amet. Cras consectetur ligula id dui rutrum, consectetur aliquet nibh bibendum.m',
    code: 'some function',
    difficulty: 'easy',
    category: 'c#'
  };

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
