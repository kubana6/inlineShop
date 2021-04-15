import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from '../services/crud.service';
import {Subscription} from 'rxjs';
import {StorageService} from '../services/storage.service';
import {ICart, IUser} from '../types';
import {element} from 'protractor';

export interface IProducts {
  img: string;
  name: string;
  model: string;
  id: string;
  price: string;
}

@Component({
  selector: 'app-smartphones',
  templateUrl: './smartphones.component.html',
  styleUrls: ['./smartphones.component.scss']
})
export class SmartphonesComponent implements OnInit, OnDestroy {
  private getData: Subscription;
  public products: IProducts[];
  public user: IUser;

  constructor(private service: CrudService, private storage: StorageService) {
  }

  ngOnInit(): void {
    this.getData = this.service.getData('smartphones').subscribe((value: IProducts[]) => {
      this.products = value;
    });
    this.storage.user$.subscribe((value: IUser) => {
      this.user = value;
    });

  }

  ngOnDestroy(): void {
    this.getData.unsubscribe();
  }

  public buy(id: string): void {
    const currentBuy = this.user.cart.filter(element => element.id === id);
    const cart = currentBuy.length > 0 ? this.user.cart.map(order => {
      if (order.id === id) {
        order.amount = (+order.amount + 1).toString();
      }
      return order;
    }) : [...this.user.cart, {id, amount: '1'}];

    console.log(`old user`, this.user);
    this.service.updateObject('users', this.user.id, {cart}, true).subscribe(value => {
    });

  }

}
