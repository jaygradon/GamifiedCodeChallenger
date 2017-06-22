import {Component} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  activities: Array<Activity> = [{title: 'Logged in today!', content: 'You have logged in today!'}, {
    title: 'Level up!',
    content: 'You levelled to level 54!'
  }];
  friends: Array<Friend> = [{name: 'JayGradon'}, {name: 'Rashina'}, {name: 'Robert'}];
  weeklyLeaders: Array<WeeklyLeader> = [{name: 'MarkZuckerberg', gold: 134234}, {name: 'BillGates', gold: 124345}];
}

export class Activity {
  title: String;
  content: String;
}

export class Friend {
  name: String;
}

export class WeeklyLeader {
  name: String;
  gold: number;
}
