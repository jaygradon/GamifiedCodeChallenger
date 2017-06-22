import {Component} from '@angular/core';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
})

export class ChallengesComponent {
  challenges: Array<ChallengeListItem> = [
    {
      displayName: 'Reverse the string',
      id: 1,
      difficulty: 'Easy'
    },
    {
      displayName: 'Sort the number array',
      id: 2,
      difficulty: 'Easy'
    },
    {
      displayName: 'Count the letters',
      id: 3,
      difficulty: 'Easy'
    }
  ];
}

export class ChallengeListItem {
  displayName: string;
  id: number;
  difficulty: string;
}
