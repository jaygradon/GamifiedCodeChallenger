/**
 * Created by helen on 19/06/2017.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Challenge} from '../../../models/Challenge';
import {TestingService} from '../../../services/testing.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
  providers: [TestingService]
})

export class ChallengeComponent {

  @Input() challenge: Challenge;
  @Output() onGoBack = new EventEmitter<boolean>();
  goBack = false;
  testingService: TestingService;
  testResponse;

  constructor(testingService: TestingService) {
    this.testingService = testingService;
  }

  goBackPressed() {
    this.onGoBack.emit(true);
    this.goBack = true;
  }

  runCode() {
    console.log(this.challenge);
    this.testingService.testChallenge(this.challenge).subscribe(res => this.testResponse = res);
  }

  submitCode() {
    console.log('submit code');
  }

  getTestResult() {
    if (this.testResponse.result === 'FAIL') {
      return 'Test failed.';
    } else if (this.testResponse.result === 'PASS') {
      return 'Test successfully passed';
    } else {
      return '';
    }
  }
}
