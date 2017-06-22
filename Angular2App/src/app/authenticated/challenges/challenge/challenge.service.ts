import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Challenge} from './challenge.component';

@Injectable()
export class ChallengeService {
  challenge: Challenge = {id: 1, title: 'Reverse a String', question: 'Lorem ipsum'};

  constructor(private http: Http) {}

  getChallenge(id: number): Observable<Challenge> {
    // const route = `api/account/challenge` + id;
    // return this.http
    //   .get(route)
    //   .map(response => response.json().data as Challenge);
    return Observable.create(() => { return this.challenge; } );
  }
}
