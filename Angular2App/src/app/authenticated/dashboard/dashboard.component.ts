import {UserData} from '../../models/UserData';
import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import '../../../unity/Build/UnityLoader.js';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';

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
  userDisplayName = '';
  friendDoesntExist = false;
  follows: Array<UserData>;

  constructor(accountService: AccountService, private _ngZone: NgZone, private router: Router ) {
    this.accountService = accountService;
  }

  ngOnDestroy() {
    window.my.dashboard.UnityInitDone = null;
  }


  ngOnInit(): void {
    this.gameInstance = UnityLoader.instantiate('gameContainer', 'http://localhost:5000/bin.json', {
      Module: {TOTAL_MEMORY: 0x20000000},
    });


    this.accountService.getUserData().subscribe(userData => {
      this.userData = userData;
      localStorage.setItem('userData', JSON.stringify(this.userData));
      this.getFollows();
    });

    window.my = window.my || {};
    window.my.dashboard = window.my.dashboard || {};
    window.my.dashboard.UnityInitDone = this.UnityInitDone.bind(this);
    window.my.dashboard.UnityUserIsLoaded = this.UnityUserIsLoaded.bind(this);
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
    this._ngZone.run(() => {
      this.SendUnityMessage();
    });
  }

  public UnityUserIsLoaded() {
    this._ngZone.run(() => {
      this.gameInstance.SendMessage('StartObject', 'ExternalUpdate');
    });
  }

  private SendUnityMessage() {
    this.gameInstance.SendMessage('StartObject', 'StoreUserID', this.decodeUserToken() + '|' + this.getAuthToken());
  }

  isPackUnlocked(name: string) {
    return this.userData.serializeStorage.split('q:')[1].split(',').indexOf(name) !== -1;
  }

  addFollow() {
    this.accountService.getUserDataFromName(this.userDisplayName).subscribe(res => {
      console.log('res:  ' + JSON.stringify(res));
      if (this.userData.serializeStorage.split('f:')[1].split(',').indexOf(res.id.toString()) === -1) {
        this.follows.push(res);
        const split = this.userData.serializeStorage.split('f:');
        split[1] += `${res.id.toString()},`;
        this.userData.serializeStorage = split.join('f:');
        this.accountService.putSerialStorage(this.userData.serializeStorage).subscribe(res => {
          console.log('res:  ' + JSON.stringify(res));
        },
        err => {
          console.log('err:  ' + JSON.stringify(err));
        });

      }
      this.friendDoesntExist = false;
    },
    err => {
      this.friendDoesntExist = true;
    });
  }

  getFollows() {
    console.log('getting follows');
    const followIds = this.userData.serializeStorage.split('f:')[1];
    if (followIds) {
      console.log('follows');
      this.accountService.getUserDataFromIDs(followIds).subscribe(res => {
        console.log('res:  ' + JSON.stringify(res));
        this.follows = res; // ?
      },
      err => {
        console.log('err:  ' + JSON.stringify(err));
      });
    } else {
      console.log('follows empty');
      this.follows = [];
    }
  }

  loadVillage(id) {
    this.gameInstance.SendMessage('StartObject', 'LoadVillage', id);
  }

  goToChallenges() {
    this.router.navigate(['/challenges']);
  }

}


