/**
 * Created by helen on 19/06/2017.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Challenge} from '../../../models/Challenge';
import {TestingService} from '../../../services/testing.service';
import {AccountService} from '../../../services/account.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
  providers: [TestingService, AccountService]
})

export class ChallengeComponent {

  @Input() challenge: Challenge;
  @Output() onGoBack = new EventEmitter<boolean>();
  @Output() updateCompletion = new EventEmitter<string>()
  goBack = false;
  testingService: TestingService;
  accountService: AccountService;
  testResponse;
  testPassString = 'Test successfully passed.';
  serialiseResponse;
  justCompletedChallenge = false;

  constructor(testingService: TestingService, accountService: AccountService) {
    this.testingService = testingService;
    this.accountService = accountService;
  }

  goBackPressed() {
    this.onGoBack.emit(true);
    this.goBack = true;
  }

  runCode() {
    this.testingService.testChallenge(this.challenge).subscribe(res => {
      this.testResponse = res;
      this.testPassString = 'Test successfully passed.';
    });
  }

  submitCode() {
    this.testingService.testChallenge(this.challenge).subscribe(res => {
      this.testResponse = res;
      if (this.testResponse.result === 'PASS') {
        const gold = this.getGoldReward();
        if (gold > 0) {
          this.accountService.incrementGold(gold).subscribe(
            () => {
              this.testPassString = 'Test successfully passed. You have earned ' + this.getGoldReward() + ' gold!';
              this.completedQuestion();
            }
          );
        }
      }
    });
  }

  getGoldReward() {
    let gold = 0;
    if (this.challenge.difficulty.toLowerCase() === 'easy') {
      gold = 50;
    } else if (this.challenge.difficulty.toLowerCase() === 'medium') {
      gold = 100;
    } else if (this.challenge.difficulty.toLowerCase() === 'hard') {
      gold = 250;
    }
    return gold;
  }


  getTestResult() {
    if (this.testResponse.result === 'FAIL') {
      return 'Test failed. ' + this.testResponse.resultDescription;
    } else if (this.testResponse.result === 'PASS') {
      return this.testPassString;
    } else {
      return '';
    }
  }

  private completedQuestion() {
    this.justCompletedChallenge = true;
    this.accountService.getSerialStorage().subscribe(r => {
      this.serialiseResponse = r.serializeStorage;
      let res = this.serialiseResponse;
      let hasChanged = false;
      if (this.challenge.difficulty.toLowerCase() === 'hard') {
        const x = res.split('q:');
        if (x[1].split(',').indexOf('camp') === -1) {
          x[1] += 'camp,';
          res = x.join('q:');
          hasChanged = true;
        }
      }
      const y = res.split('c:');
      if (y[1].split(',').indexOf(this.challenge.id.toString()) === -1) {
        y[1] += this.challenge.id + ',';
        res = y.join('c:');
        hasChanged = true;
      }

      if (hasChanged) {
        this.accountService.putSerialStorage(res).subscribe(r => console.log(r));
        this.updateCompletion.emit(res);
      }
    });
  }
}
