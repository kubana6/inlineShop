import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  public photoUrl:string =''
  constructor(private auth:AuthserviceService) {
 
   }

  ngOnInit(): void {
    this.auth.user$.subscribe((value:any)=> {
      console.log(value.photoURL)
      this.photoUrl=value.photoURL
    })
  }

}
