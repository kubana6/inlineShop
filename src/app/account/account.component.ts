import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { IUser } from '../types';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public userInformation: IUser;

  constructor(public storage: StorageService) {}

  ngOnInit(): void {
    this.storage.user$.subscribe((value: IUser) => {
      this.userInformation = value;
    });
  }
}
