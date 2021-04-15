import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() category: any

}
