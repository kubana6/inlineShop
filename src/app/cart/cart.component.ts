import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, reduce, switchMap, take, tap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { ICart, IUser } from '../types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  private getUserData: Subscription;

  public cartCount = 0;

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.getUserData = this.storage.user$
      .pipe(
        map((value) => {
          // есть ли более простой метод?
          if (value?.cart) {
            return value.cart.reduce((acc, rec) => acc + +rec.amount, 0);
          }
          return 0;
        }),
      )
      .subscribe((value) => {
        this.cartCount = value;
      });
  }

  ngOnDestroy(): void {
    this.getUserData.unsubscribe();
  }
}
