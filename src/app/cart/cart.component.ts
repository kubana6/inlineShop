import {Component, OnDestroy, OnInit} from '@angular/core';
import {StorageService} from '../services/storage.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {IUser} from '../types';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  private getUserData: Subscription;
  public cartCount: number;

  constructor(private storage: StorageService) {
  }

  ngOnInit(): void {
    this.getUserData = this.storage.user$.pipe(
      map(value => value?.cart?.length)
    )
      .subscribe(value => {
        this.cartCount = value;
      });

  }

  ngOnDestroy() {
    this.getUserData.unsubscribe();
  }
}
