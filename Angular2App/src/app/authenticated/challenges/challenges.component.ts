import {Component} from '@angular/core';
import {ChallengeService} from '../../services/challenge.service';
import {Challenge} from "../../models/Challenge";

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
  providers: [ChallengeService]
})

export class ChallengesComponent {

  challengeService: ChallengeService;
  challenges: Array<Challenge>;
  constructor(challengeService: ChallengeService) {
    this.challengeService = challengeService;
    this.getChallenges();
  }

  private getChallenges() {
    this.challengeService.getChallenges().subscribe(res => this.challenges = res);
  }
}


