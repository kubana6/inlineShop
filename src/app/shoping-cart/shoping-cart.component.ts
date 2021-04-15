import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StorageService} from '../services/storage.service';
import {map} from 'rxjs/operators';
import {ICart, IUser} from '../types';
import {CrudService} from '../services/crud.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent implements OnInit, OnDestroy {
  totalOrders: number;
  private getUserData: Subscription;
  public userData: IUser;
  public cart: ICart[];

  constructor(private storage: StorageService, crud: CrudService) {
  }

  ngOnInit(): void {
    this.getUserData = this.storage.user$
      .subscribe(value => {
        this.userData = value;
        this.totalOrders = value?.cart.length;
        this.cart = value?.cart;
      });
  }

  ngOnDestroy() {
    this.getUserData.unsubscribe();
  }
}
