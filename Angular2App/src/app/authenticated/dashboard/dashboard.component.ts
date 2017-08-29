import {UserData} from '../../models/UserData';
import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import '../../../unity/Build/UnityLoader.js';
import {AccountService} from '../../services/account.service';

declare var UnityLoader: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AccountService]
})

export class DashboardComponent implements OnInit, OnDestroy {
  gameInstance;
  accountService: AccountService;
  userData: UserData;

  constructor(accountService: AccountService, private _ngZone: NgZone) {
    this.accountService = accountService;
  }

  ngOnDestroy() {
    window.my.dashboard.UnityInitDone = null;
  }


  ngOnInit(): void {
    this.gameInstance = UnityLoader.instantiate('gameContainer', 'http://localhost:5000/bin.json', {
      Module: {TOTAL_MEMORY: 0x20000000}
    });
    this.accountService.getUserData().subscribe(userData => this.userData = userData);
    window.my = window.my || {};
    window.my.dashboard = window.my.dashboard || {};
    window.my.dashboard.UnityInitDone = this.UnityInitDone.bind(this);
  }

  private decodeUserToken() {
    const userToken = JSON.parse(localStorage.getItem('currentUser')).accountTokens.id_token;
    const payload = userToken.split('.');
    return JSON.parse(atob(payload[1])).id;
  }

  private getAuthToken() {
    return JSON.parse(localStorage.getItem('currentUser')).accountTokens.access_token;
  }

  public UnityInitDone() {
    this._ngZone.run(() => this.SendUnityMessage());
  };

  private SendUnityMessage() {
    this.gameInstance.SendMessage('StartObject', 'StoreUserID', this.decodeUserToken() + '|' + this.getAuthToken());
    console.log('Sent message to Unity');
  }

}


