/**
 * Created by helen on 19/06/2017.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChallengeService} from '../../../services/challenge.service';
import {Observable} from 'rxjs/Observable';
import {Challenge} from '../../../models/Challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
  providers: [ChallengeService]
})

export class ChallengeComponent implements OnInit {
  challengeID: number;
  challenge: Observable<Challenge>;

  ngOnInit(): void {
    this.fetchChallengeData();
  }

  constructor(route: ActivatedRoute, private challengeService: ChallengeService) {
    this.challengeID = route.snapshot.params['id'];
    this.challengeService = challengeService;
  }

  fetchChallengeData() {
    this.challenge = this.challengeService.getChallenge(this.challengeID);
  }

  runCode() {
    console.log('run code');
  }

  submitCode() {
    console.log('submit code');
  }
}
