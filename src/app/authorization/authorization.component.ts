import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { ModalWindowService } from '../services/modal-window.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  constructor(private router: Router, private authService: AuthserviceService, private modal: ModalWindowService) { }
  ngOnInit(): void {
  }
  public goTo() {
    this.authService.googleSing().subscribe(value => {
      this.modal.changeAuthWindow()
    })
  }

  public changeModal(event: MouseEvent) {
    this.modal.changeAuthWindow()
  }

}
