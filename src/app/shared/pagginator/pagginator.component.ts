import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagginator',
  templateUrl: './pagginator.component.html',
  styleUrls: ['./pagginator.component.scss'],
})
export class PagginatorComponent implements OnInit {
  @Input() public length: number;

  @Input() public pageSize: number;

  @Input() public pageSizeOptions: number[];

  @Output() page = new EventEmitter<PageEvent>();

  public pageEvent: PageEvent;

  constructor() {}

  ngOnInit(): void {}

  public changePage(event: PageEvent) {
    console.log(event);
    this.page.emit(event);
  }
}
