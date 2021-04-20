import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from '../services/crud.service';
import {Subscription} from 'rxjs';
import {StorageService} from '../services/storage.service';
import {ICart, IUser} from '../types';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';


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
  public typeProduct: string;

  constructor(private service: CrudService, private storage: StorageService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('product'))
    ).subscribe((value: string) => {
      this.typeProduct = value.slice(1);
      this.updateData();
    });
    // this.getData = this.service.getData('smartphones').subscribe((value: IProducts[]) => {
    //   this.products = value;
    // });
    this.storage.user$.subscribe((value: IUser) => {
      this.user = value;
    });

  }

  public updateData(): void {
    console.log(this.typeProduct);
    this.getData = this.service.getData(this.typeProduct).subscribe((value: IProducts[]) => {
      this.products = value;
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
  public trackByFn(index, item) {
    return item.id;
  }
}
