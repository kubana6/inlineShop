import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase';
import { ICharacteristic } from '../types';
import { CrudService } from '../services/crud.service';
import { StorageService } from '../services/storage.service';
import Storage = firebase.storage.Storage;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public charactId: string;

  public characteristic: ICharacteristic;

  constructor(private route: ActivatedRoute, private crud: CrudService, private storage: StorageService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap((params) => params.getAll('model'))).subscribe((value: string) => {
      this.charactId = value;
    });
    this.crud.handleObjectByRef('characteristics', this.charactId).subscribe((value: ICharacteristic) => {
      this.characteristic = value;
      this.storage.currentCharacteristic = value;
    });
  }
}
