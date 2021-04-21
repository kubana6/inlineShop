import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IGoods, IUser} from '../types';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _cartProduct: IGoods[]=[];
  public user$: BehaviorSubject<IUser | null> = new BehaviorSubject<any>(null);
  private _user: IUser | null;

  public authData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _authData: any;

  constructor() {
  }

  public get cartProduct(): any {
    return this._cartProduct;
  }

  public set cartProduct(_cartProduct:any) {
    this._cartProduct.push(_cartProduct)
  }

  public get user(): any {
    return this._user;
  }

  public set user(_user: any) {
    this._user = _user;
    this.user$.next(this._user);
  }

  public get authData(): any {
    return this.authData;
  }

  public set authData(_authData: any) {
    this._authData = _authData;
    this.authData$.next(this._authData);
  }

  public set clearData(obj: {}) {
    this.authData = {};
    this.user = {};
  }
}
