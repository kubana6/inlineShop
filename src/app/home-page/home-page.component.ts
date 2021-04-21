import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {

  }
  getData () {
  }

}
