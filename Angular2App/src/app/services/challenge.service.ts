import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {Challenge} from '../models/Challenge';

@Injectable()
export class ChallengeService {
  challenge: Challenge = {
    id: 1,
    title: 'Reverse a String',
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus urna vestibulum erat dignissim pretium. Vestibulum tempor feugiat massa in congue. Vivamus vel purus diam. Aenean cursus condimentum aliquet. Integer posuere mi at mauris hendrerit, ut ullamcorper ante cursus. Quisque velit nibh, tincidunt at sapien quis, volutpat suscipit risus. Mauris at tellus nec purus eleifend dignissim. Suspendisse ut commodo libero. Proin vel consequat orci. Aenean ac nibh ultrices lorem pharetra lobortis elementum vel augue. Nunc ut dignissim lacus, vel convallis tellus. Vestibulum placerat diam mi, vitae iaculis arcu commodo eu. Vestibulum elementum commodo enim id vulputate.Aenean dolor erat, convallis vitae mattis luctus, elementum a turpis. Nulla eget ante dignissim, mattis massa aliquet, rutrum est. Duis cursus lorem eget mattis dictum. Duis efficitur placerat mi, vel imperdiet augue ultricies quis. Nulla molestie ornare est, id volutpat purus dignissim in. Nam fermentum euismod quam, vitae laoreet est maximus sit amet. Cras consectetur ligula id dui rutrum, consectetur aliquet nibh bibendum.m',
    templateText: 'some function'
  };

  constructor(private http: Http) {
  }

  getChallenge(id: number): Observable<Challenge> {
    // const route = `api/account/challenge` + id;
    // return this.http
    //   .get(route)
    //   .map(response => response.json().data as Challenge);
    return Observable.of(this.challenge);
  }
}
