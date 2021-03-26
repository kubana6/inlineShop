import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthserviceService) { }

  ngOnInit(): void {
  }
  public goTo() {
    this.authService.googleSing().subscribe(value => {
      this.router.navigateByUrl('')
      console.log(value)
    })
  }
}
