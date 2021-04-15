import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CATEGORIES} from '../mock-category'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  categories = CATEGORIES

  constructor() { }
  popular = 'POPULAR'
  BEST="BEST FEEDBACK"
  ngOnInit(): void {
  }

}
