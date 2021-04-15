import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service';
import { ModalWindowService } from '../services/modal-window.service'
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  public photoUrl: string = ''
  constructor(private auth: AuthserviceService, public windowModal: ModalWindowService) {
  }
  ngOnInit(): void {
    this.auth.user$.subscribe((value: any) => {
      this.photoUrl = value ? value.photoURL : ''
    })
  }

}
