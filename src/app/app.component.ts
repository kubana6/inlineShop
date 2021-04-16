import {AfterViewInit, Component, OnInit} from '@angular/core';
import {combineLatest} from 'rxjs';
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

  constructor(public modalAuth: ModalWindowService, private uploadService: UploadService,
              private crudService: CrudService,
              private storageService: StorageService,
              private auth: AuthserviceService
  ) {

  }

  public isActive = this.modalAuth.isActiveWindow;

  ngOnInit() {
    this.storageService.authData$.pipe(
    ).subscribe(value => this.authValue = value);
    this.crudService.getData('smartphones')
      .subscribe(value => this.storageService.books = value);


    this.auth.user$.pipe(
      map(value => value ? value.providerData : []),
    ).subscribe(value => {
      if (value.length > 0) {
        this.storageService.authData = value[0];
        this.getUserData()
      }
    });


    // this.crudService.findField('users', 'uid', value.uid)
    //   .subscribe(
    //     value => {
    //       this.storageService.user = value[0];
    //     }
    //   );
    // .pipe(
    //     map(userValue => {
    //       if (userValue.length < 1) {
    //         const data = {
    //           name: value.displayName,
    //           uid: value.uid,
    //           cart: [],
    //           address:[]
    //         };
    //         this.crudService.createEntity('users', data);
    //         return data;
    //       } else {
    //         return userValue;
    //       }
    //     }),
    //   )
    // BqHCjzZ1xVM7oRQmc5elhtvhBcN2
  }


  private getUserData() {
    if(this.authValue) {

      console.log(this.authValue)
      this.crudService.findField('users', 'uid', this.authValue['uid']).pipe(
        map(userValue => {
                if (userValue.length < 1) {
                  const data = {
                    name: this.authValue['displayName'],
                    uid: this.authValue['uid'],
                    cart: [],
                    address:[],
                    email: this.authValue['email'],
                    photo:this.authValue['photoURL'],
                    orders:[],
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
            this.storageService.user = value[0];
          }
        );
    }
  }

}
