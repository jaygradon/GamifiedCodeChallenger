import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class TestingService {
  route = `http://localhost:5000/api/challenge`;

  constructor(private http: Http) {
  }

  testChallenge() {
  }
}
