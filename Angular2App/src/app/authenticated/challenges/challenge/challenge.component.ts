/**
 * Created by helen on 19/06/2017.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Challenge} from '../../../models/Challenge';
import {TestingService} from '../../../services/testing.service';
import {ChallengeService} from '../../../services/challenge.service';
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
  goBack = false;
  testingService: TestingService;
  accountService: AccountService;
  testResponse;
  testPassString = 'Test successfully passed.';
  serialiseResponse;

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
              this.testPassString =  'Test successfully passed. You have earned ' + this.getGoldReward() + ' gold!';
              if (this.challenge.difficulty.toLowerCase() === 'hard') {
                this.completedHardQuestion();
              }
            }
          );
        }
      }
    });
  }

  getGoldReward() {
    let gold = 0;
    if (this.challenge.difficulty.toLowerCase() === 'easy') {
      gold = 10;
    } else if (this.challenge.difficulty.toLowerCase() === 'medium') {
      gold = 20;
    } else if (this.challenge.difficulty.toLowerCase() === 'hard')  {
      gold = 30;
    }
    return gold;
  }


  getTestResult() {
    if (this.testResponse.result === 'FAIL') {
      return 'Test failed. ' + this.testResponse.resultDescription;
    } else if (this.testResponse.result === 'PASS') {
      return this.testPassString; ;
    } else {
      return '';
    }
  }

  private completedHardQuestion() {
    this.accountService.getSerialStorage().subscribe(r => {
      console.log(r);
      this.serialiseResponse = r.serializeStorage;
      const x = this.serialiseResponse.split('q:');
      console.log(x);
      if (!x[1].contains('camp')) {
        x[1] += 'camp,';
        const res = x.join('sq:');
        this.accountService.putSerialStorage(res).subscribe(r => console.log(r));
      }
    });
  }
}
