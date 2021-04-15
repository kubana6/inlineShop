import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthserviceService} from '../services/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {

  }

}
