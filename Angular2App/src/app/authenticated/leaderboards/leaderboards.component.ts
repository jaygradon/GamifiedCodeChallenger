import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {UserData} from '../../models/UserData';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css'],
  providers: [AccountService]
})
export class LeaderboardsComponent implements OnInit {

  accountService;
  userDatas;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }


  ngOnInit() {
    this.accountService.getAllUserData().subscribe(res => {
      console.log(res);
      this.userDatas = res.sort((n1, n2) => n2.gold - n1.gold );
    });
  }

  getChallengesCompleted(ud: UserData) {
    return ud.serializeStorage.split('c:')[1].split(',').length - 1;
  }

}
