import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { ICharacteristic, IProducts } from '../types';
import { StorageService } from '../services/storage.service';
import { SmartphoneCharacteristic } from '../constants';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.scss'],
})
export class CharacteristicsComponent implements OnInit {
  public characteristic: ICharacteristic;

  @Input() public charactId: string;

  public fieldCharacteristic: string[];

  public objCharacteristic: {};

  constructor(private route: ActivatedRoute, private crud: CrudService, private storage: StorageService) {}

  ngOnInit() {
    this.objCharacteristic = SmartphoneCharacteristic;
    this.fieldCharacteristic = Object.keys(SmartphoneCharacteristic);
    this.storage.currentCharacteristics$.subscribe((value: ICharacteristic) => {
      this.characteristic = value;
    });
  }

  public buy(): void {
    this.crud
      .getObjectByRef(`${this.characteristic.type}s`, this.characteristic.productId)
      .subscribe((value: IProducts) => {
        const data = {
          ...value,
          id: this.characteristic.productId,
        };
        this.storage.buy(data);
      });
  }
}
