import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-choice-goods',
  templateUrl: './choice-goods.component.html',
  styleUrls: ['./choice-goods.component.scss']
})
export class ChoiceGoodsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() name?: string

}
