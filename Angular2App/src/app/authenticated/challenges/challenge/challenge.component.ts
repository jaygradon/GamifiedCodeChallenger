/**
 * Created by helen on 19/06/2017.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChallengeService} from './challenge.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
  providers: [ChallengeService]
})

export class ChallengeComponent implements OnInit {
  challengeID: number;
  challenge: Challenge;
  errorMessage: string;

  ngOnInit(): void {
  }

  constructor(route: ActivatedRoute, private challengeService: ChallengeService) {
    this.challengeID = route.snapshot.params['id'];
    this.challengeService = challengeService;
    this.fetchChallengeData();
  }

  fetchChallengeData() {
    this.challengeService.getChallenge(this.challengeID)
      .subscribe(
        challenge => this.challenge = challenge,
        error => this.errorMessage = <any>error);
  }

}

export class Challenge {
  id: number;
  title: string;
  question: string;
}
