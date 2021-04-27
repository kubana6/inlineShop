import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  public isActiveWindow = false;

  public isLogin = false;

  public isActiveModalOrder = false;

  public changeAuthWindow(): void {
    this.isActiveWindow = !this.isActiveWindow;
  }

  public changeLogin(value: boolean): void {
    this.isLogin = value;
  }

  public changeModalOrder(): void {
    this.isActiveModalOrder = !this.isActiveModalOrder;
  }
}
