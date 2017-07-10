/**
 * Created by helen on 19/06/2017.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChallengeService} from '../../../services/challenge.service';
import {Challenge} from '../../../models/Challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
  providers: [ChallengeService]
})

export class ChallengeComponent {

  @Input() challenge: Challenge;
  @Output() onGoBack = new EventEmitter<boolean>();
  goBack = false;

  goBackPressed() {
    this.onGoBack.emit(true);
    this.goBack = true;
  }

  runCode() {
    console.log('run code');
  }

  submitCode() {
    console.log('submit code');
  }
}
