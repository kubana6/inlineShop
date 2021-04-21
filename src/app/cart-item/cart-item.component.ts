import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from '../services/crud.service';
import {ICart, IGoods, IUser} from '../types';
import {StorageService} from '../services/storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})

export class CartItemComponent implements OnInit, OnDestroy {
  public product: any;
  private getProductData: Subscription;
  private user: IUser;

  constructor(private crud: CrudService, private storage: StorageService) {
  }

  @Input() item: ICart;

  ngOnInit(): void {
    this.getProductData = this.crud.getObjectByRef('smartphones', this.item.id).subscribe((value:IGoods) => {
      this.storage.cartProduct = {...value, id: this.item.id};
      this.product = value;
    });
    this.storage.user$.subscribe((value: IUser) => this.user = value);
  }

  public delete() {
    const {id, cart} = this.user;
    const newCart = cart.filter(element => element.id !== this.item.id);
    this.crud.updateObject('users', id, {cart: newCart}, true);
  }

  ngOnDestroy() {
    this.getProductData.unsubscribe();
  }

  public updateAmount(targetValue: EventTarget) {
    // как правильно затипизировать евент
    const buttonValue = targetValue['textContent'];
    if (this.item.amount === '1' && buttonValue === 'remove') {
      this.delete();
      return;
    }
    const cart = this.user.cart
      .map(value => {
        if (value.id === this.item.id) {
          switch (buttonValue) {
            case 'remove': {
              value.amount = (+value.amount - 1).toString();
              return value;
            }
            case 'add': {
              value.amount = (+value.amount + 1).toString();
              return value;
            }
          }
        }
        return value;
      });
    this.crud.updateObject('users', this.user.id, {cart}, true).subscribe(value => {
    });
  }
}
