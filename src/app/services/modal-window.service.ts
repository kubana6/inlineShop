import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalWindowService {
  public isActiveWindow: boolean = false
  public changeAuthWindow() {

    this.isActiveWindow = !this.isActiveWindow
  }
}
