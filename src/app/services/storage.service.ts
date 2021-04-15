import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../types';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public books$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _books: any;
  public user$: BehaviorSubject<IUser | null> = new BehaviorSubject<any>(null);
  private _user: IUser | null;

  public authData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _authData: any;

  constructor() {
  }

  public get books(): any {
    return this._books;
  }

  public set books(_books: any) {
    this._books = _books;
    this.books$.next(this._books);
  }

  public get user(): any {
    return this._user;
  }

  public set user(_user: any) {
    this._user = _user;
    this.user$.next(this._user);
  }

  public get authData(): any {
    return this._user;
  }

  public set authData(_authData: any) {
    this._authData = _authData;
    this.authData$.next(this._authData);
  }
}
