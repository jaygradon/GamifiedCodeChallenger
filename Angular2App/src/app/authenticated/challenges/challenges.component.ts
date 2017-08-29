import {Component} from '@angular/core';
import {ChallengeService} from '../../services/challenge.service';
import {Challenge} from '../../models/Challenge';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
  providers: [ChallengeService]
})

export class ChallengesComponent {

  challengeService: ChallengeService;
  challenges: Array<Challenge>;
  displayCertainChallenge = false;
  displayedChallenge: Challenge;
  errorOccurred =  false;

  constructor(challengeService: ChallengeService) {
    this.challengeService = challengeService;
    this.getChallenges();
  }

  private getChallenges() {
    this.challengeService.getChallenges().subscribe(res => this.challenges = res, error => this.errorOccurred = true);
  }

  displayChallenge(challenge: Challenge) {
    this.displayCertainChallenge = true;
    this.displayedChallenge = challenge;
  }

  showChallengesList() {
    this.displayCertainChallenge = false;
  }

  getGoldReward(challenge: Challenge) {
    let gold = 0;
    if (challenge.difficulty.toLowerCase() === 'easy') {
      gold = 10;
    } else if (challenge.difficulty.toLowerCase() === 'medium') {
      gold = 20;
    } else if (challenge.difficulty.toLowerCase() === 'hard')  {
      gold = 30;
    }
    return gold;
  }
}


