import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CrudService } from '../services/crud.service';
import { StorageService } from '../services/storage.service';
import { IProducts, IUser } from '../types';

@Component({
  selector: 'app-smartphones',
  templateUrl: './smartphones.component.html',
  styleUrls: ['./smartphones.component.scss'],
})
export class SmartphonesComponent implements OnInit, OnDestroy {
  private getData: Subscription;

  public products: IProducts[];

  public user: IUser;

  public typeProduct: string;

  constructor(private service: CrudService, private storage: StorageService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((params) => params.getAll('product'))).subscribe((value: string) => {
      this.typeProduct = value;
      this.updateData();
    });
    this.storage.user$.subscribe((value: IUser) => {
      this.user = value;
    });
  }

  public updateData(): void {
    this.getData = this.service.getData(this.typeProduct).subscribe((value: IProducts[]) => {
      this.products = value;
    });
  }

  ngOnDestroy(): void {
    this.getData.unsubscribe();
  }

  public buy(product: IProducts): void {
    this.storage.buy(product);
    // const currentBuy = this.user.cart.filter((element) => element.id === product.id);
    // const cart =
    //   currentBuy.length > 0
    //     ? this.user.cart.map((order) => {
    //         if (order.id === product.id) {
    //           order.amount = (+order.amount + 1).toString();
    //           order.totalOrder = (+order.totalOrder + +product.price).toString();
    //         }
    //         return order;
    //       })
    //     : [
    //         ...this.user.cart,
    //         { id: product.id, amount: '1', totalOrder: product.price, price: product.price, name: product.name },
    //       ];
    //
    // this.service.updateObject('users', this.user.id, { cart }, true).subscribe((value) => {});
  }

  public trackByFn(index, item) {
    return item.id;
  }
}
