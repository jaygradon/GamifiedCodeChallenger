import {Component} from '@angular/core';
import {ChallengeService} from '../../services/challenge.service';
import {Challenge} from '../../models/Challenge';
import {AccountService} from '../../services/account.service';
import {UserData} from '../../models/UserData';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
  providers: [ChallengeService, AccountService]
})

export class ChallengesComponent {

  userData: UserData;
  challengeService: ChallengeService;
  accountService: AccountService;
  challenges: Array<Challenge>;
  displayCertainChallenge = false;
  displayedChallenge: Challenge;
  errorOccurred =  false;
  completedChallenges: Array<string>;

  constructor(challengeService: ChallengeService, accountService: AccountService) {
    this.challengeService = challengeService;
    this.accountService = accountService;
    this.getChallenges();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getCompletedChallenges();
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

  isChallengeCompleted(id: number) {
    if (this.completedChallenges.indexOf(id.toString()) === -1) {
      return false;
    }
    return true;
  }

  private getCompletedChallenges() {
    this.completedChallenges = this.userData.serializeStorage.split('c:')[1].split(',');
  }
}


