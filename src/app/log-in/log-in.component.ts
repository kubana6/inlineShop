import {Component, OnInit} from '@angular/core';
import {AuthserviceService} from '../services/authservice.service';
import {ModalWindowService} from '../services/modal-window.service';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  public photoUrl: string = '';

  constructor(private auth: AuthserviceService, public windowModal: ModalWindowService, private storage: StorageService) {
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((value: any) => {
      this.photoUrl = value ? value.photoURL : '';
    });
  }

  public logOut(): void {
    this.auth.signOut();
    this.windowModal.changeLogin(false);
    this.storage.authData = {};
  }


}
