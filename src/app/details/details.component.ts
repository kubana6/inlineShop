import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ICharacteristic } from '../types';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public charactId: string;

  public characteristic: ICharacteristic;

  constructor(private route: ActivatedRoute, private crud: CrudService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((params) => params.getAll('model'))).subscribe((value: string) => {
      this.charactId = value;
    });
    this.crud.getObjectByRef('characteristics', this.charactId).subscribe((value: ICharacteristic) => {
      this.characteristic = value;
    });
  }
}
