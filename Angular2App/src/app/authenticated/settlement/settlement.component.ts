declare var UnityLoader: any;

import {Component, OnInit} from '@angular/core';
import '../../../unity/Build/UnityLoader.js';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css'],
})

export class SettlementComponent implements OnInit {
  gameInstance;

  ngOnInit(): void {
    this.gameInstance = UnityLoader.instantiate('gameContainer', 'http://localhost:5000/bin.json', {
      Module: {TOTAL_MEMORY: 0x20000000}
    });
    this.gameInstance.SendMessage('StartObject', 'StoreUserToken', this.decodeUserToken());
  }

  private decodeUserToken() {
    const userToken = JSON.parse(localStorage.getItem('currentUser')).accountTokens.id_token;
    const payload = userToken.split('.');
    return JSON.parse(atob(payload[1])).id;
  }

}


