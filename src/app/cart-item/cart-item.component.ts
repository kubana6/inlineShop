import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from '../services/crud.service';
import {ICart} from '../types';
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

  constructor(private crud: CrudService, private storage: StorageService) {
  }

  @Input() item: ICart;

  ngOnInit(): void {
    this.getProductData = this.crud.getObjectByRef('smartphones', this.item.id).subscribe(value => this.product = value);
  }

  public delete() {
    const {id, cart} = this.storage.user;
    const newCart = cart.filter(element => element.id !== this.item.id);
    this.crud.updateObject('users', id, {cart: newCart}, true);
  }

  ngOnDestroy() {
    this.getProductData.unsubscribe();
  }
}
