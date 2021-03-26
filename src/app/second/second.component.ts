import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(value=> console.log(value))
   }

  ngOnInit(): void {
  }

}
