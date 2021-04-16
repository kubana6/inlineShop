import {AfterViewInit, Component, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {map, switchMap, take, takeWhile, tap} from 'rxjs/operators';
import {ModalWindowService} from './services/modal-window.service';
import {UploadService} from './services/upload.service';
import {CrudService} from './services/crud.service';
import {StorageService} from './services/storage.service';
import {AuthserviceService} from './services/authservice.service';
import {getMatIconFailedToSanitizeUrlError} from '@angular/material/icon';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'onlineShop';
  imageLink: string = '';
  progress: string = '';
  private authValue: {};
  private getFindFeld: Subscription

  constructor(public modalAuth: ModalWindowService, private uploadService: UploadService,
              private crudService: CrudService,
              private storageService: StorageService,
              private auth: AuthserviceService,

  ) {

  }

  public isActive = this.modalAuth.isActiveWindow;

  ngOnInit(): void {
    this.storageService.authData$.pipe(
    ).subscribe(value => this.authValue = value);
    this.crudService.getData('smartphones')
      .subscribe(value => this.storageService.books = value);


    this.auth.user$.pipe(
      map(value => value ? value.providerData : []),
    ).subscribe(value => {

      if (value.length > 0) {
        this.storageService.authData = value[0];
        this.modalAuth.changeLogin(true)
        this.getUserData();
      }
    });
  }


  private getUserData(): void {
    if (this.authValue) {

      this.getFindFeld = this.crudService.findField('users', 'uid', this.authValue['uid']).pipe(
        map(userValue => {
            if (userValue.length < 1) {
              const data = {
                name: this.authValue['displayName'],
                uid: this.authValue['uid'],
                cart: [],
                address: [],
                email: this.authValue['email'],
                photo: this.authValue['photoURL'],
                orders: [],
              };
              this.crudService.createEntity('users', data);
              return data;
            } else {
              return userValue;
            }
          }
        ))
        .subscribe(
          value => {
            if(!this.authValue['uid']) {
              this.storageService.user = {}
            } else {
              this.storageService.user = value[0];
            }

          }
        );
    }
  }

}
