import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent {
  questText = 'The lions have escaped from the gleyd and are wreaking havoc in your settlement! Defeat them by fortifying your defenses.';
  questHeader = 'Defeat the lions!';
}


