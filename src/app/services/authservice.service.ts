import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

import { tap, take, map } from 'rxjs/operators';

import auth = firebase.auth;

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  public user$: Observable<firebase.User>;

  constructor(private angAuthService: AngularFireAuth) {
    this.user$ = this.angAuthService.authState;
  }

  public googleSing(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.angAuthService.signInWithPopup(provider)).pipe(
      tap((authUser: auth.UserCredential) => {}),
      take(1),
    );
  }

  public signOut(): Observable<void> {
    return from(this.angAuthService.signOut()).pipe(take(1));
  }
}
