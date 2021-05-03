import { AfterViewInit, Component, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { map, switchMap, take, takeWhile, tap } from 'rxjs/operators';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { ModalWindowService } from './services/modal-window.service';
import { UploadService } from './services/upload.service';
import { CrudService } from './services/crud.service';
import { StorageService } from './services/storage.service';
import { AuthserviceService } from './services/authservice.service';
import { IAuthValue, IUser } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'onlineShop';

  private authValue: IAuthValue;

  private getFindFeld: Subscription;

  constructor(
    public modalAuth: ModalWindowService,
    private uploadService: UploadService,
    private crudService: CrudService,
    private storageService: StorageService,
    private auth: AuthserviceService,
  ) {}

  public isActive = this.modalAuth.isActiveWindow;

  ngOnInit(): void {
    this.storageService.authData$.subscribe((value) => {
      this.authValue = value;
    });

    this.auth.user$.pipe(map((value) => (value ? value.providerData : []))).subscribe((value) => {
      if (value.length > 0) {
        [this.storageService.authData] = value;
        this.modalAuth.changeLogin(true);
        this.getUserData();
      }
    });
    console.table([
      [
        '21.04',
        'Добавил удаление/добавление по одному товару',
        'https://github.com/kubana6/onlineShop/commit/cfc5b642fb0084e81df814e53d4dafe28d05eb4f#diff-08d398104897669bd549f066ba27a0a1d45d647c7674d8452ddb76fca26d8e3c',
      ],
      [
        '22.04',
        'Изменил форму доставки, добавил в форму информацию о заказе',
        'https://github.com/kubana6/onlineShop/commit/55f21a6857581b3c9b470a38c21f8c2fdd0034c5',
      ],
      [
        '24.04',
        'Сделал меню, убрал ошибки линтера, добавил stylelint',
        'https://github.com/kubana6/onlineShop/commit/311a9deacace8f752c6af05648d9abeb6ce6ce9b',
      ],
      [
        '25.04',
        'Пофиксил баг в форме заказа',
        'https://github.com/kubana6/onlineShop/commit/d124284b9b6f880d0f3f21b9c4a75211c0416ad6',
      ],
      [
        '26.04',
        'Сделал страницу с характеристиками',
        'https://github.com/kubana6/onlineShop/commit/ff775ae1e7c6a73f4e32efbdace439bb9f06837e',
      ],
      ['27.04', 'Сделал страницу личного кабинета, добавил баланс.'],
    ]);
  }

  private getUserData(): void {
    if (this.authValue) {
      this.getFindFeld = this.crudService
        .findField('users', 'uid', this.authValue.uid)
        .pipe(
          map((userValue: IUser[]) => {
            if (userValue.length < 1) {
              const data = {
                name: this.authValue.displayName,
                uid: this.authValue.uid,
                cart: [],
                address: [],
                email: this.authValue.email,
                photo: this.authValue.photoURL,
                orders: [],
                account_created: new Date().toString(),
                balance: '10000',
              };
              this.crudService.createEntity('users', data);
              return data;
            }
            return userValue;
          }),
        )
        .subscribe((value: IUser[]) => {
          if (!this.authValue.uid) {
            this.storageService.user = {};
          } else {
            [this.storageService.user] = value;
          }
        });
    }
  }
}
