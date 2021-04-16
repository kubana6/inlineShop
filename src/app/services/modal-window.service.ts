import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalWindowService {
  public isActiveWindow: boolean = false
  public isLogin:boolean = false;
  public changeAuthWindow() {

    this.isActiveWindow = !this.isActiveWindow
  }
  public changeLogin (value: boolean) {
    this.isLogin = value
  }
}
