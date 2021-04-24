import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { ModalWindowService } from '../services/modal-window.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent {
  constructor(private router: Router, private authService: AuthserviceService, private modal: ModalWindowService) {}

  public goTo(): void {
    this.authService.googleSing().subscribe(() => {
      this.modal.changeAuthWindow();
    });
  }

  public changeModal(): void {
    this.modal.changeAuthWindow();
  }
}
